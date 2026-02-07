
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Check, Volume2, Info, ChevronRight, Mic } from 'lucide-react';

interface LessonDetailProps {
  lessonId: string;
  user: UserProfile;
  onClose: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lessonId, user, onClose }) => {
  const [step, setStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const lessonContent = {
    title: "The Silent Connection",
    phrases: [
      { text: "Encantado de conocerle.", translation: "Pleased to meet you (Formal).", context: "Use this in business meetings or when meeting elders to show respect." },
      { text: "¿Cómo le ha ido el día?", translation: "How has your day been? (Formal).", context: "A polite way to open a professional conversation." },
    ]
  };

  const currentPhrase = lessonContent.phrases[step] || lessonContent.phrases[0];

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col p-6 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-12">
        <button onClick={onClose} className="p-2 bg-zinc-900 rounded-full">
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 px-8">
           <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 w-1/2 transition-all duration-500" />
           </div>
        </div>
        <button className="p-2 bg-zinc-900 rounded-full text-zinc-400">
          <Info className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-12">
        <div className="space-y-4">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Speak this phrase</span>
          <h2 className="text-4xl font-bold leading-tight">{currentPhrase.text}</h2>
          <p className="text-xl text-zinc-400 italic">{currentPhrase.translation}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 transition-all">
            <Volume2 className="w-8 h-8 text-indigo-400" />
            <span className="text-xs font-bold uppercase">Listen</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-8 rounded-3xl revolut-gradient shadow-lg shadow-indigo-500/20 group">
            <Mic className="w-8 h-8 text-white group-active:scale-90 transition-transform" />
            <span className="text-xs font-bold uppercase text-white">Hold to Speak</span>
          </button>
        </div>

        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          className="p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800 text-left"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold">Why this works</h4>
            <ChevronRight className={`w-5 h-5 transition-transform ${showExplanation ? 'rotate-90' : ''}`} />
          </div>
          {showExplanation && (
            <p className="text-sm text-zinc-400 animate-in fade-in duration-300">
              {currentPhrase.context}
            </p>
          )}
        </button>
      </div>

      <div className="pt-8 pb-4">
        <button 
          onClick={() => setStep(s => s + 1)}
          className="w-full bg-white text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-zinc-200"
        >
          Continue <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LessonDetail;
