import React, { useState, useEffect, useMemo, useRef } from 'react';
import { UserProfile, IntentType } from '../types';
import { Check, ChevronLeft, Search, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

const LANGUAGES = [
  { id: 'en', label: 'English', native: 'English', flag: '🇺🇸', country: 'USA' },
  { id: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸', country: 'Spain' },
  { id: 'fr', label: 'French', native: 'Français', flag: '🇫🇷', country: 'France' },
  { id: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪', country: 'Germany' },
  { id: 'it', label: 'Italian', native: 'Italiano', flag: '🇮🇹', country: 'Italy' },
  { id: 'jp', label: 'Japanese', native: '日本語', flag: '🇯🇵', country: 'Japan' },
  { id: 'zh', label: 'Mandarin', native: '中文', flag: '🇨🇳', country: 'China' },
  { id: 'ko', label: 'Korean', native: '한국어', flag: '🇰🇷', country: 'South Korea' },
  { id: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦', country: 'Saudi Arabia' },
  { id: 'pt', label: 'Portuguese', native: 'Português', flag: '🇵🇹', country: 'Portugal' },
  { id: 'ru', label: 'Russian', native: 'Русский', flag: '🇷🇺', country: 'Russia' },
  { id: 'tr', label: 'Turkish', native: 'Türkçe', flag: '🇹🇷', country: 'Turkey' },
  { id: 'id', label: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩', country: 'Indonesia' },
  { id: 'nl', label: 'Dutch', native: 'Nederlands', flag: '🇳🇱', country: 'Netherlands' },
  { id: 'sv', label: 'Swedish', native: 'Svenska', flag: '🇸🇪', country: 'Sweden' },
];

const INTENTS: { id: IntentType; label: string }[] = [
  { id: 'Travel', label: 'Travel' },
  { id: 'Career', label: 'Career' },
  { id: 'Exams', label: 'Exams' },
  { id: 'Relationships', label: 'Conversation' },
  { id: 'Culture', label: 'Culture' },
  { id: 'Survival', label: 'Survival' },
];

const TypewriterText = ({ text, delay = 0, speed = 40, onComplete, className = "" }: { text: string, delay?: number, speed?: number, onComplete?: () => void, className?: string }) => {
    const [displayText, setDisplayText] = useState("");
    
    useEffect(() => {
        let timeout: any;
        let charIndex = 0;
        
        const startTyping = () => {
            const interval = setInterval(() => {
                setDisplayText(text.slice(0, charIndex + 1));
                charIndex++;
                if (charIndex >= text.length) {
                    clearInterval(interval);
                    if (onComplete) onComplete();
                }
            }, speed);
        };

        timeout = setTimeout(startTyping, delay);
        return () => {
            clearTimeout(timeout);
        };
    }, [text, delay, speed]);

    return (
        <span className={className}>
            {displayText}
            <span className="inline-block w-[2.5px] h-[0.9em] bg-blue-500 ml-1 animate-pulse align-middle" />
        </span>
    );
};

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onBack }) => {
  const [stage, setStage] = useState<'language_selection' | 'intent_selection' | 'killshot' | 'locked' | 'config'>('language_selection');
  
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    targetLanguage: '',
    nativeLanguage: 'English',
    points: 0,
    fluencyScore: 0,
    level: 'Beginner',
    commitment: '10m',
    intent: 'Travel'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredLanguages = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return LANGUAGES;
    return LANGUAGES.filter(l => 
      l.label.toLowerCase().includes(query) || 
      l.native.toLowerCase().includes(query) || 
      l.country.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleLanguageSelect = (lang: typeof LANGUAGES[0]) => {
    setSelectedLang(lang.id);
    setProfile(prev => ({ ...prev, targetLanguage: lang.label }));
  };

  const goToIntent = () => {
    if (selectedLang) setStage('intent_selection');
  };

  const handleIntentSelect = (id: IntentType) => {
    setProfile(prev => ({ ...prev, intent: id }));
    setStage('killshot');
  };

  const handleCommit = () => {
    setStage('locked');
    setTimeout(() => setStage('config'), 1800);
  };

  return (
    <div className="relative h-screen bg-transparent overflow-hidden w-full pointer-events-auto font-sans selection:bg-blue-500/30 transform-gpu will-change-transform">
      {/* Background is handled globally by App component to maintain consistency */}
      <div className="relative z-[100] max-w-md mx-auto h-full flex flex-col p-0 hw-accel transform-gpu">
        
        {stage !== 'locked' && (
            <nav className="pt-12 relative z-[200] shrink-0 transform-gpu px-6">
              <button 
                onClick={() => {
                  if (stage === 'language_selection') onBack();
                  else if (stage === 'intent_selection') setStage('language_selection');
                  else if (stage === 'killshot') setStage('intent_selection');
                  else onBack();
                }}
                className="flex items-center gap-0.5 group -ml-5 p-5 rounded-2xl transition-transform active:scale-95 cursor-pointer bg-transparent border-none outline-none transform-gpu"
                aria-label="Back"
              >
                <ChevronLeft className="w-[30px] h-[30px] text-white" strokeWidth={3} />
                <span className="text-[22px] font-bold text-white tracking-tight">Back</span>
              </button>
            </nav>
        )}

        <div className="flex-1 relative overflow-hidden flex flex-col transform-gpu px-6">

            {/* STAGE 1: LANGUAGE SELECTION */}
            {stage === 'language_selection' && (
                <div className="h-full flex flex-col pt-1 animate-in fade-in slide-in-from-right-12 duration-700 transform-gpu">
                    <div className="mb-8 text-center px-4 transform-gpu">
                        <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
                            Choose the language<br/>you want to live in.
                        </h2>
                    </div>

                    <div className="sticky top-0 z-50 mb-6 bg-transparent transform-gpu">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-5 h-5 group-focus-within:text-white transition-colors" />
                            <input 
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search languages"
                                className="w-full h-[64px] bg-white/[0.04] border-none rounded-full pl-16 pr-6 text-white text-lg font-medium focus:bg-white/[0.07] outline-none transition-all placeholder:text-zinc-700 focus:ring-0 transform-gpu"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar pb-32 transform-gpu">
                        <div className="grid grid-cols-1 gap-2.5">
                            {filteredLanguages.map((lang, idx) => (
                                <button
                                    key={lang.id}
                                    onClick={() => handleLanguageSelect(lang)}
                                    className={`w-full py-4 px-6 rounded-full flex items-center justify-between transition-all duration-300 active:scale-[0.98] border animate-in fade-in slide-in-from-left-12 group transform-gpu ${
                                        selectedLang === lang.id 
                                        ? 'bg-blue-600 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)]' 
                                        : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-white/10'
                                    }`}
                                    style={{ 
                                        animationDelay: `${idx * 40}ms`,
                                        animationFillMode: 'backwards',
                                        willChange: 'transform, opacity'
                                    }}
                                >
                                    <div className="flex items-center gap-4 transform-gpu">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${selectedLang === lang.id ? 'scale-110' : 'group-hover:scale-105'}`}>
                                            <span className={`text-4xl transition-all duration-500 ${selectedLang === lang.id ? 'scale-100 grayscale-0' : 'grayscale-[0.1]'}`}>
                                                {lang.flag}
                                            </span>
                                        </div>
                                        <div className="text-left transform-gpu">
                                            <p className={`font-bold text-lg leading-none ${selectedLang === lang.id ? 'text-white' : 'text-zinc-300'}`}>
                                                {lang.label} <span className={`text-sm font-medium transition-colors ${selectedLang === lang.id ? 'text-blue-100/70' : 'text-zinc-500'}`}>({lang.native})</span>
                                            </p>
                                        </div>
                                    </div>
                                    {selectedLang === lang.id && (
                                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center animate-in zoom-in duration-300 transform-gpu">
                                            <Check className="w-4 h-4 text-blue-600 stroke-[4px]" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedLang && (
                        <div className="absolute bottom-10 left-6 right-6 flex flex-col items-center gap-6 animate-in slide-in-from-bottom-8 duration-500 transform-gpu">
                            <p className="text-blue-400 text-xs font-bold tracking-widest uppercase text-center animate-pulse">
                                Good choice. Let’s build around this.
                            </p>
                            <button 
                                onClick={goToIntent}
                                className="w-full py-6 rounded-full bg-white text-black font-black text-xl shadow-2xl shadow-black/50 active:scale-95 transition-all flex items-center justify-center gap-3 border-none outline-none transform-gpu shadow-xl"
                            >
                                Continue <ArrowRight className="w-6 h-6" strokeWidth={3} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* STAGE 2: INTENT SELECTION */}
            {stage === 'intent_selection' && (
                <div className="h-full flex flex-col justify-center py-12 animate-in fade-in slide-in-from-right-12 duration-700 transform-gpu">
                    <div className="text-center space-y-4 mb-12 transform-gpu">
                        <h2 className="text-4xl font-bold tracking-tight text-white leading-tight">
                            What are you<br/>learning this for?
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5 w-full transform-gpu">
                        {INTENTS.map((intent, idx) => (
                            <button
                                key={intent.id}
                                onClick={() => handleIntentSelect(intent.id)}
                                className="w-full py-5 px-8 rounded-full text-left text-lg font-bold border border-white/5 bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-blue-500/40 transition-all active:scale-[0.98] flex items-center gap-4 animate-in fade-in slide-in-from-left-8 duration-[700ms] group transform-gpu"
                                style={{ 
                                    animationDelay: `${idx * 50}ms`,
                                    animationFillMode: 'backwards',
                                    willChange: 'transform, opacity'
                                }}
                            >
                                <span className="text-blue-500/50 group-hover:text-blue-500 transition-colors text-xl">•</span>
                                {intent.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STAGE 3: KILLSHOT */}
            {stage === 'killshot' && (
                <div className="flex flex-col items-start justify-center h-full px-2 animate-in fade-in duration-1000 transform-gpu">
                   <div className="space-y-10 mb-20 transform-gpu">
                       <h1 className="text-[44px] md:text-5xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-2xl">
                          <TypewriterText 
                             text={`You’re learning ${profile.targetLanguage} to change how you move through the world.`} 
                             delay={400}
                             speed={30}
                          />
                       </h1>
                       <p className="text-zinc-500 font-bold text-[11px] uppercase tracking-[0.4em] opacity-0 animate-[fade-in_1s_ease-out_1.8s_forwards]">
                          We’ll build everything around this.
                       </p>
                   </div>
                   
                   <button
                      onClick={handleCommit}
                      className="group w-full py-6 rounded-full bg-white text-black font-black text-xl hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-all active:scale-95 opacity-0 animate-[fade-in_1s_ease-out_2.5s_forwards] border-none cursor-pointer outline-none transform-gpu shadow-2xl"
                   >
                      Commit
                   </button>
                </div>
            )}

            {/* STAGE 4: LOCKED */}
            {stage === 'locked' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center transform-gpu">
                   <div className="relative z-10 flex flex-col items-center gap-8 animate-in zoom-in-95 duration-700 fade-in transform-gpu">
                      <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_100px_rgba(37,99,235,0.9)] pulse-locked transform-gpu">
                         <Check className="w-14 h-14 text-white stroke-[4px]" />
                      </div>
                      <h2 className="text-4xl font-bold tracking-tighter text-white">Intent locked.</h2>
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu">
                      <div className="w-[180vw] h-[180vw] rounded-full border border-blue-500/20 animate-[ping_4s_ease-out_infinite] transform-gpu" />
                   </div>
                </div>
            )}

            {/* STAGE 5: FINAL CONFIG */}
            {stage === 'config' && (
                 <div className="h-full flex flex-col justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000 transform-gpu">
                    <h2 className="text-4xl font-bold mb-12 text-white tracking-tight leading-tight transform-gpu">Final configuration.</h2>
                    <div className="space-y-8 transform-gpu">
                        <div>
                            <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em] mb-4">Daily commitment</p>
                            <div className="grid grid-cols-2 gap-3 transform-gpu">
                                {['10m', '30m'].map(t => (
                                    <button 
                                        key={t}
                                        onClick={() => setProfile(p => ({...p, commitment: t as any}))}
                                        className={`py-7 rounded-[2rem] font-bold text-lg border transition-all active:scale-[0.98] transform-gpu ${profile.commitment === t ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/10 text-zinc-500 hover:bg-white/[0.08]'}`}
                                    >
                                        {t === '10m' ? '10 mins' : '30 mins'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => onComplete(profile as UserProfile)}
                            className="w-full py-7 rounded-full bg-blue-600 text-white font-black text-xl shadow-2xl shadow-blue-600/40 active:scale-95 transition-all border-none mt-4 flex items-center justify-center gap-3 outline-none transform-gpu shadow-xl"
                        >
                            Begin Mastery <ArrowRight className="w-6 h-6" strokeWidth={3} />
                        </button>
                    </div>
                 </div>
            )}

        </div>
      </div>
      <style>{`
        .pulse-locked {
            animation: pulse-ring-lock 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes pulse-ring-lock {
            0%, 100% { transform: scale(1); filter: brightness(1); }
            50% { transform: scale(1.03); filter: brightness(1.2); }
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Onboarding;