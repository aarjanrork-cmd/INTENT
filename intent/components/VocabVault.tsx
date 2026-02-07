import React from 'react';
import { UserProfile } from '../types';
import { ChevronLeft, Brain, Sparkles, RefreshCcw } from 'lucide-react';

interface VocabVaultProps {
  user: UserProfile;
  onBack: () => void;
}

const VocabVault: React.FC<VocabVaultProps> = ({ user, onBack }) => {
  const words = [
    { word: 'Coyuntura', definition: 'Current situation / Conjuncture', strength: 85, nextReview: '2 days' },
    { word: 'Imprescindible', definition: 'Essential / Indispensable', strength: 42, nextReview: 'Now' },
    { word: 'Pormenorizar', definition: 'To detail / itemize', strength: 98, nextReview: '12 days' },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24 animate-in slide-in-from-right duration-500">
      <header className="p-6 pt-12 sticky top-0 bg-black/80 backdrop-blur-xl z-20 flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-zinc-900 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Vocab Vault</h1>
      </header>

      <div className="p-6 space-y-8">
        <div className="p-6 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-indigo-500/20 rounded-[2.5rem] flex items-center gap-6">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/20">
                <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
                <h2 className="text-lg font-bold">1,248 Words</h2>
                <p className="text-xs text-indigo-300 font-medium">Spaced Repetition Optimized</p>
            </div>
        </div>

        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Priority Review</h3>
                <button className="text-blue-500 text-xs font-bold flex items-center gap-1">
                    <RefreshCcw className="w-3 h-3" /> Refresh
                </button>
            </div>
            <div className="space-y-3">
                {words.map((w, i) => (
                    <div key={i} className="p-5 bg-zinc-900 rounded-[1.5rem] border border-zinc-800 flex justify-between items-center group">
                        <div className="space-y-1">
                            <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{w.word}</h4>
                            <p className="text-xs text-zinc-500">{w.definition}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black uppercase tracking-tighter text-zinc-500 mb-1">Strength</div>
                            <div className="h-1 w-16 bg-zinc-800 rounded-full overflow-hidden">
                                <div className={`h-full ${w.strength > 70 ? 'bg-green-500' : 'bg-orange-500'} transition-all`} style={{ width: `${w.strength}%` }} />
                            </div>
                            <div className="text-[9px] font-bold text-zinc-400 mt-1">Review: {w.nextReview}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <button className="w-full py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5">
            <Sparkles className="w-4 h-4 fill-black" />
            Deep Recall Session
        </button>
      </div>
    </div>
  );
};

export default VocabVault;