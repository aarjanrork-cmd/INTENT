import React from 'react';

interface SplashProps {
  isExiting?: boolean;
}

const Splash: React.FC<SplashProps> = ({ isExiting }) => {
  // Restoration of the exact preferred dither stops
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
    <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-[500] overflow-hidden hw-accel ${isExiting ? 'splash-exit' : ''}`}>
      {/* RESTORED: Deep atmospheric background with center 58% black and rich blue glows. */}
      {/* UPDATED: Added requested black depth layers at top-to-middle left and bottom-to-middle right. */}
      <div 
        className="absolute inset-0 pointer-events-none transform-gpu" 
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
            radial-gradient(circle at 50% 50%, rgba(0, 20, 80, 0.03) 0%, transparent 100%),
            #010103
          ` 
        }}
      />
      
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <h1 className="intent-text text-5xl md:text-7xl font-black tracking-[0.2em] italic select-none text-center">
          INTENT
        </h1>
      </div>
    </div>
  );
};

export default Splash;