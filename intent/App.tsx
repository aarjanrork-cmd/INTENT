import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import Splash from './components/Splash';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ScenarioHub from './components/ScenarioHub';
import LiveConversation from './components/LiveConversation';
import LessonDetail from './components/LessonDetail';
import VocabVault from './components/VocabVault';

const App: React.FC = () => {
  const [stage, setStage] = useState<'splash' | 'auth' | 'onboarding' | 'dashboard' | 'scenarios' | 'live' | 'lesson' | 'vocab'>('splash');
  const [splashExiting, setSplashExiting] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [splashKey, setSplashKey] = useState(0); 
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('intent_user_profile');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (showSplash) {
      const exitTriggerTimer = setTimeout(() => {
        setSplashExiting(true);
        setStage('auth');
      }, 2900);

      const removeSplashTimer = setTimeout(() => {
        setShowSplash(false);
      }, 3700); // 2900 + 800ms (new duration)

      return () => {
        clearTimeout(exitTriggerTimer);
        clearTimeout(removeSplashTimer);
      };
    }
  }, [showSplash, splashKey]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('intent_user_profile', JSON.stringify(profile));
    setStage('dashboard');
  };

  const handleAuthComplete = (forceOnboarding: boolean = false) => {
    // Smoother transition: handle logic in one task
    if (forceOnboarding) {
      setUser(null);
      setStage('onboarding');
    } else {
      if (user) {
        setStage('dashboard');
      } else {
        setStage('onboarding');
      }
    }
  };

  const handleBackToSplash = () => {
    setSplashExiting(false);
    setSplashKey(prev => prev + 1);
    setShowSplash(true);
    setStage('splash');
  };
  
  const handleBackFromOnboarding = () => setStage('auth');

  // Exact same high-fidelity manual dither that was present in the user's preferred version
  const glowDither = `
    rgba(0, 80, 255, 0.16) 0%, 
    rgba(0, 80, 255, 0.15) 4%, 
    rgba(0, 80, 255, 0.14) 8%, 
    rgba(0, 80, 255, 0.12) 13%, 
    rgba(0, 80, 255, 0.10) 19%, 
    rgba(0, 80, 255, 0.08) 26%, 
    rgba(0, 80, 255, 0.06) 34%, 
    rgba(0, 80, 255, 0.04) 43%, 
    rgba(0, 80, 255, 0.03) 53%, 
    rgba(0, 80, 255, 0.02) 64%, 
    rgba(0, 80, 255, 0.01) 76%, 
    rgba(0, 80, 255, 0) 100%
  `;

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-600/40 selection:text-white overflow-hidden relative hw-accel transform-gpu">
      <div className="fixed inset-0 bg-[#010103] z-[-2]" />
      
      {/* RESTORED: Exact same background depth, 58% center black, rich blue corner glows. */}
      {/* UPDATED: Added more 10% black overlays at top-to-middle left and bottom-to-middle right side. */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-1] transform-gpu" 
        style={{ 
          background: `
            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.58) 0%, transparent 75%),
            radial-gradient(circle at 100% 0%, ${glowDither}),
            radial-gradient(circle at 0% 100%, ${glowDither}),
            radial-gradient(ellipse at 0% 50%, rgba(0, 0, 0, 0.8) 0%, transparent 15%),
            radial-gradient(ellipse at 100% 50%, rgba(0, 0, 0, 0.8) 0%, transparent 15%),
            radial-gradient(ellipse at 0% 25%, rgba(0, 0, 0, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 100% 25%, rgba(0, 0, 0, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 0% 40%, rgba(0, 0, 0, 0.1) 0%, transparent 45%),
            radial-gradient(ellipse at 100% 75%, rgba(0, 0, 0, 0.1) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(0, 20, 80, 0.03) 0%, transparent 100%)
          ` 
        }}
      />
      
      {(stage === 'auth' || stage === 'onboarding') && (
        <div className={splashExiting && stage === 'auth' ? "page-enter-slide fixed inset-0 z-[100]" : "fixed inset-0 z-[100]"}>
          <Auth 
            onComplete={handleAuthComplete} 
            onBack={handleBackToSplash}
          />
        </div>
      )}

      {showSplash && (
        <Splash key={splashKey} isExiting={splashExiting} />
      )}

      {stage === 'onboarding' && (
        <div className="fixed inset-0 z-[200] page-enter-slide hw-accel bg-transparent transform-gpu will-change-transform">
           <Onboarding 
             onComplete={handleOnboardingComplete} 
             onBack={handleBackFromOnboarding}
           />
        </div>
      )}
      
      {stage === 'dashboard' && user && (
        <Dashboard 
          user={user} 
          onStartLesson={(id) => { setSelectedLessonId(id); setStage('lesson'); }}
          onStartConversation={() => setStage('live')}
          onNavigate={(target) => setStage(target as any)}
        />
      )}

      {stage === 'scenarios' && user && (
        <ScenarioHub 
          user={user} 
          onSelectScenario={(id) => { setSelectedScenarioId(id); setStage('live'); }}
          onBack={() => setStage('dashboard')}
        />
      )}

      {stage === 'live' && user && (
        <LiveConversation 
          user={user} 
          scenarioId={selectedScenarioId}
          onClose={() => { setSelectedScenarioId(null); setStage('dashboard'); }} 
        />
      )}

      {stage === 'lesson' && user && selectedLessonId && (
        <LessonDetail 
          lessonId={selectedLessonId} 
          user={user}
          onClose={() => setStage('dashboard')} 
        />
      )}

      {stage === 'vocab' && user && (
        <VocabVault 
          user={user}
          onBack={() => setStage('dashboard')}
        />
      )}
    </div>
  );
};

export default App;