
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import { X, Mic, MicOff, AlertCircle, Headphones, Volume2, Sparkles } from 'lucide-react';

interface LiveConversationProps {
  user: UserProfile;
  scenarioId?: string | null;
  onClose: () => void;
}

const LiveConversation: React.FC<LiveConversationProps> = ({ user, scenarioId, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<string>("Ready when you are.");
  const [waveform, setWaveform] = useState<number[]>(new Array(40).fill(4));
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setWaveform(prev => prev.map(() => Math.max(4, Math.random() * (thinking ? 15 : 40))));
      }, 80);
    } else {
      setWaveform(new Array(40).fill(4));
    }
    return () => clearInterval(interval);
  }, [isActive, thinking]);

  const toggleMic = () => {
    setIsActive(!isActive);
    if (!isActive) {
        setTranscription("Listening closely...");
        // Mocking the turn-taking logic
        setTimeout(() => {
            setThinking(true);
            setTranscription("Analyzing response...");
            setTimeout(() => {
                setThinking(false);
                setTranscription("Model responding in native pace.");
            }, 2000);
        }, 4000);
    } else {
        setTranscription("Paused.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col animate-in slide-in-from-bottom duration-700 font-sans">
      <div className="p-6 pt-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-500/20 shadow-inner shadow-blue-500/10">
            <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
          </div>
          <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Gemini 2.5 Live</span>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{scenarioId ? 'Scenario Active' : 'Free Conversation'}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-3 bg-zinc-900/50 hover:bg-zinc-800 rounded-full transition-all active:scale-90 border border-white/5">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-16">
        <div className="relative group">
            <div className={`w-56 h-56 rounded-full bg-blue-600/5 flex items-center justify-center transition-all duration-1000 ${isActive ? 'scale-110' : 'scale-100 opacity-60'}`}>
                <div className={`w-32 h-32 rounded-full bg-blue-600 shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)] flex items-center justify-center transition-all duration-500 ${isActive ? 'animate-pulse' : ''}`}>
                    {thinking ? <Sparkles className="w-12 h-12 text-white animate-spin-slow" /> : <Volume2 className="w-12 h-12 text-white" />}
                </div>
            </div>
            {isActive && !thinking && <div className="absolute inset-0 border-2 border-blue-600/30 rounded-full animate-ping pointer-events-none" />}
            {thinking && <div className="absolute inset-0 border-4 border-blue-400/20 border-t-blue-400 rounded-full animate-spin pointer-events-none" />}
        </div>

        <div className="max-w-xs space-y-3">
            <h2 className="text-3xl font-black tracking-tight">{isActive ? (thinking ? 'Thinking...' : 'Speak Now') : 'Mic Off'}</h2>
            <p className="text-zinc-500 text-sm font-medium h-10 leading-relaxed italic">
                {transcription}
            </p>
        </div>

        <div className="flex items-end justify-center gap-1.5 h-20 w-full max-w-sm px-8">
            {waveform.map((h, i) => (
                <div 
                    key={i} 
                    className={`w-1 rounded-full transition-all duration-300 shadow-sm ${
                        isActive ? (thinking ? 'bg-zinc-700' : 'bg-blue-500') : 'bg-zinc-900'
                    }`}
                    style={{ height: `${h}%` }}
                />
            ))}
        </div>
      </div>

      <div className="p-10 pb-20 flex flex-col items-center space-y-8 bg-gradient-to-t from-black via-zinc-950/80 to-transparent backdrop-blur-3xl">
        <div className="w-full flex justify-center">
            <button 
                onClick={toggleMic}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 active:scale-90 shadow-2xl ${
                    isActive ? 'bg-zinc-900 border border-red-500/50' : 'bg-blue-600 shadow-blue-600/40'
                }`}
            >
                {isActive ? <MicOff className="w-8 h-8 text-red-500" /> : <Mic className="w-8 h-8 text-white" />}
            </button>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
            <AlertCircle className="w-3 h-3 text-blue-600" />
            Adaptive Emotion Engine Active
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LiveConversation;
