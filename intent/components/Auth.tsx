import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronLeft, ArrowRight, Mail, Lock } from 'lucide-react';

interface AuthProps {
  onComplete: (forceOnboarding?: boolean) => void;
  onBack: () => void;
}

// Global flag to track if the slogan animation has played during this session
let sloganHasPlayed = false;

const CustomEyeIcon = ({ isHidden }: { isHidden: boolean }) => (
  <div className="relative w-6 h-6 flex items-center justify-center transform-gpu">
    <svg 
      viewBox="0 0 100 65" 
      fill="currentColor" 
      className="w-full h-full transition-all duration-300 transform-gpu"
    >
      <defs>
        <mask id="eye-mask">
          <rect width="100" height="65" fill="white" />
          <line 
            x1="10" y1="55" x2="90" y2="10" 
            stroke="black" 
            strokeWidth={isHidden ? "14" : "0"} 
            className="transition-all duration-300 ease-in-out"
          />
        </mask>
      </defs>
      
      <g mask="url(#eye-mask)" className="transition-all duration-300">
        <path d="M50 2.5C27.5 2.5 8.3 16.6 0 32.5c8.3 15.9 27.5 30 50 30s41.7-14.1 50-30C91.7 16.6 72.5 2.5 50 2.5zm0 50c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20zm0-32c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12z" />
      </g>
      
      <line 
        x1="10" y1="55" x2="90" y2="10" 
        stroke="currentColor" 
        strokeWidth={isHidden ? "5" : "0"} 
        strokeLinecap="round"
        className={`transition-all duration-300 ease-in-out transform-gpu ${isHidden ? 'opacity-100' : 'opacity-0'}`}
      />
    </svg>
  </div>
);

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transform-gpu block">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] transform-gpu block">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.47-1.02.66 0 2.53.15 3.56 1.43-.09.06-2.13 1.24-2.11 3.53.02 2.83 2.5 3.79 2.65 3.84-2.28 4.95-3.69 4.38-2.65 4.45zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.18 2.32-2.32 4.09-3.74 4.25z"/>
  </svg>
);

interface FloatingGlideCharProps {
  char: string;
  active: boolean;
  delay: number;
  immediate?: boolean;
}

const FloatingGlideChar: React.FC<FloatingGlideCharProps> = ({ char, active, delay, immediate }) => {
  return (
    <span
      className={`inline-block ${immediate ? '' : 'transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]'} ${
        active ? 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0' : 'opacity-0 translate-y-5 translate-x-1 scale-90 blur-[2px]'
      }`}
      style={{ 
        whiteSpace: char === ' ' ? 'pre' : 'normal',
        transitionDelay: immediate ? '0ms' : `${delay}ms`,
        willChange: immediate ? 'auto' : 'transform, opacity'
      }}
    >
      {char}
    </span>
  );
};

const GlidingText = ({ text, active, immediate }: { text: string; active: boolean; immediate?: boolean }) => {
  const [showLetters, setShowLetters] = useState(immediate || false);

  useEffect(() => {
    if (active && !immediate) {
      setShowLetters(true);
    }
  }, [active, immediate]);

  const chars = useMemo(() => text.split(''), [text]);

  return (
    <>
      {chars.map((char, i) => (
        <FloatingGlideChar 
          key={i} 
          char={char} 
          active={showLetters} 
          delay={i * 125} 
          immediate={immediate}
        />
      ))}
    </>
  );
};

const SequentialTypewriter = () => {
  const [startLine1, setStartLine1] = useState(sloganHasPlayed);
  const [startLine2, setStartLine2] = useState(sloganHasPlayed);
  const line1 = "Stop studying.";
  const line2 = "Start speaking.";

  useEffect(() => {
    if (sloganHasPlayed) return;

    const line1Trigger = setTimeout(() => {
      setStartLine1(true);
    }, 1000);

    const line1TypingDuration = (line1.length - 1) * 125;
    const line2Trigger = setTimeout(() => {
      setStartLine2(true);
    }, 1000 + line1TypingDuration + 2000);

    const totalDuration = 1000 + line1TypingDuration + 2000 + (line2.length * 125);
    const finishTrigger = setTimeout(() => {
      sloganHasPlayed = true;
    }, totalDuration);

    return () => {
      clearTimeout(line1Trigger);
      clearTimeout(line2Trigger);
      clearTimeout(finishTrigger);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center select-none transform-gpu py-8 contain-layout">
      <h2 className="text-[42px] md:text-[54px] font-bold leading-[1.1] tracking-tight text-white h-[1.2em] mb-2 overflow-visible font-sans will-change-transform">
        <GlidingText text={line1} active={startLine1} immediate={sloganHasPlayed} />
      </h2>
      <h2 className="text-[42px] md:text-[54px] font-bold leading-[1.1] tracking-tight text-white h-[1.2em] overflow-visible font-sans will-change-transform">
        <GlidingText text={line2} active={startLine2} immediate={sloganHasPlayed} />
      </h2>
    </div>
  );
};

const Auth: React.FC<AuthProps> = ({ onComplete, onBack }) => {
  const [view, setView] = useState<'entry' | 'login'>('entry');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (view === 'login') setView('entry');
    else onBack();
  };

  const handleGetStarted = () => onComplete(true);

  const handleTogglePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setShowPassword(prev => !prev);
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handleLoginClick = () => {
    // Immediate state update for visual feedback
    setIsLoggingIn(true);
    
    // We use a clean timeout for the cinematic pause
    // Avoiding nested requestAnimationFrame where possible to prevent frame drops
    setTimeout(() => {
      onComplete(false);
    }, 500);
  };

  const getViewStyle = (targetView: 'entry' | 'login') => {
      const isActive = view === targetView;
      let translateX = 0;
      if (!isActive) {
          translateX = targetView === 'entry' ? -100 : 100;
      }

      return {
          transform: `translate3d(${translateX}%, 0, 0) translateZ(0)`,
          opacity: isActive ? 1 : 0,
          visibility: (isActive ? 'visible' : 'hidden') as any,
          pointerEvents: (isActive ? 'auto' : 'none') as any,
          zIndex: isActive ? 20 : 0,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s linear',
          willChange: 'transform, opacity',
          position: 'absolute' as const,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column' as const,
          contain: 'layout paint',
          backfaceVisibility: 'hidden' as any,
          WebkitBackfaceVisibility: 'hidden' as any,
      };
  };

  return (
    <div className="relative h-screen bg-transparent overflow-hidden w-full pointer-events-auto selection:bg-white/10 transform-gpu font-sans touch-manipulation">
      <div className="relative z-[100] max-w-md mx-auto h-full flex flex-col px-0 transform-gpu">
        
        <nav className="pt-12 relative z-[210] shrink-0 transform-gpu px-6">
          <button 
            onClick={handleBackClick}
            className="flex items-center gap-0.5 group -ml-5 p-5 rounded-2xl transition-transform active:scale-95 cursor-pointer bg-transparent border-none outline-none transform-gpu touch-manipulation"
          >
            <ChevronLeft className="w-[30px] h-[30px] text-white" strokeWidth={3} />
            <span className="text-[22px] font-bold text-white tracking-tight">Back</span>
          </button>
        </nav>

        <div className="flex-1 relative overflow-hidden perspective-[1000px] transform-gpu transform-style-3d">
          
          <div style={getViewStyle('entry')} className="w-full flex flex-col transform-gpu px-8">
            <div className="flex-1 flex flex-col justify-center items-center pointer-events-none transform-gpu">
              <SequentialTypewriter />
            </div>
            
            <div className="pb-12 space-y-8 relative z-20 shrink-0 transform-gpu w-full">
              <div className="flex flex-col items-center gap-8 w-full transform-gpu">
                <button 
                  onClick={handleGetStarted} 
                  className="w-full bg-white text-black h-[64px] rounded-full font-bold text-[21px] flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-none outline-none shadow-xl transform-gpu touch-manipulation font-sans"
                >
                  Get Started <ArrowRight className="w-6 h-6" strokeWidth={3} />
                </button>
                <p className="text-zinc-400 text-[16.1px] font-medium transform-gpu text-center tracking-tight font-sans">
                  Already have an account? <button 
                    onClick={() => setView('login')} 
                    className="text-white font-medium cursor-pointer inline-flex items-center border-none bg-transparent p-0 outline-none active:scale-95 transition-transform transform-gpu tracking-tight font-sans touch-manipulation"
                  >
                    <span className="underline decoration-white decoration-1 underline-offset-[2px]">Log In</span>
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div style={getViewStyle('login')} className="w-full flex flex-col transform-gpu px-8">
            <div className="mb-8 mt-1 shrink-0 pl-1 transform-gpu">
                <h1 className="text-[38px] font-bold text-white tracking-tight leading-[1.1] transform-gpu font-sans">
                    Welcome Back
                </h1>
            </div>

            <div className="flex-1 flex flex-col gap-6 w-full transform-gpu">
                <div className="space-y-4 w-full transform-gpu">
                  <div className="relative group w-full transform-gpu">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 w-[22px] h-[22px] group-focus-within:text-white transition-colors z-10" strokeWidth={2} />
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email Address" 
                        className="w-full h-[64px] bg-white/[0.01] backdrop-blur-[16px] border border-white/10 rounded-full pl-16 pr-6 text-white outline-none focus:border-white/30 focus:bg-white/[0.03] transition-all text-[18px] font-normal placeholder:font-bold placeholder:text-zinc-600 leading-none transform-gpu font-sans relative shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]" 
                    />
                  </div>
                  <div className="relative group w-full transform-gpu">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 w-[22px] h-[22px] group-focus-within:text-white transition-colors z-10" strokeWidth={2} />
                    <input 
                        ref={passwordInputRef}
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        className="w-full h-[64px] bg-white/[0.01] backdrop-blur-[16px] border border-white/10 rounded-full pl-16 pr-16 text-white outline-none focus:border-white/30 focus:bg-white/[0.03] transition-all text-[18px] font-normal placeholder:font-bold placeholder:text-zinc-600 leading-none transform-gpu font-sans relative shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]" 
                    />
                    <button 
                        type="button"
                        onPointerDown={handleTogglePointerDown}
                        className="absolute right-[18px] top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white w-[48px] h-[48px] flex items-center justify-center bg-transparent border-none cursor-pointer active:scale-90 transition-transform transform-gpu touch-manipulation z-20"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <CustomEyeIcon isHidden={!showPassword} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleLoginClick} 
                    disabled={isLoggingIn}
                    className="w-full bg-white text-black h-[64px] rounded-full font-bold text-[21px] flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-none outline-none mt-2 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transform-gpu touch-manipulation font-sans disabled:opacity-50 will-change-transform"
                  >
                    {isLoggingIn ? 'Entering...' : 'Log In'} <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                </div>

                <div className="relative flex items-center justify-center py-2 shrink-0 transform-gpu gap-4 w-full">
                    <div className="flex-1 border-t border-zinc-600 transform-gpu"></div>
                    <div className="relative text-[13px] font-bold text-zinc-600 transform-gpu font-sans uppercase tracking-[0.2em] shrink-0">
                        OR
                    </div>
                    <div className="flex-1 border-t border-zinc-600 transform-gpu"></div>
                </div>

                <div className="space-y-3 shrink-0 transform-gpu w-full">
                    <button className="w-full h-[60px] bg-white text-black rounded-full font-bold text-[18px] flex items-center justify-center gap-4 active:scale-95 transition-transform cursor-pointer border-none transform-gpu overflow-visible touch-manipulation font-sans tracking-tight shadow-lg">
                        <div className="shrink-0 flex items-center justify-center transform-gpu">
                          <AppleIcon />
                        </div>
                        Continue with Apple
                    </button>
                    <button className="w-full h-[60px] bg-white/[0.08] text-white border border-white/5 rounded-full font-bold text-[18px] flex items-center justify-center gap-4 active:scale-95 transition-transform cursor-pointer hover:bg-white/[0.12] border-none transform-gpu overflow-visible touch-manipulation font-sans tracking-tight">
                        <div className="shrink-0 flex items-center justify-center transform-gpu">
                          <GoogleIcon />
                        </div>
                        Continue with Google
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;