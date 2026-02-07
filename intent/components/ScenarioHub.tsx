import React from 'react';
import { SCENARIOS } from '../constants';
import { UserProfile } from '../types';
import { ChevronLeft, Zap, Star, Lock } from 'lucide-react';

interface ScenarioHubProps {
  user: UserProfile;
  onSelectScenario: (id: string) => void;
  onBack: () => void;
}

const ScenarioHub: React.FC<ScenarioHubProps> = ({ user, onSelectScenario, onBack }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen pb-24 animate-in fade-in duration-500">
      <header className="p-6 pt-12 sticky top-0 bg-black/80 backdrop-blur-xl z-20 flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-zinc-900 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Real-Life Simulations</h1>
      </header>

      <div className="p-6 space-y-6">
        <p className="text-zinc-500 text-sm leading-relaxed">
          The AI will place you in a specific context. You must react, persuade, or solve problems using {user.targetLanguage}. No multiple choice here.
        </p>

        <div className="grid gap-4">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectScenario(s.id)}
              className="group p-5 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] text-left hover:border-blue-500/50 transition-all active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <div className="px-3 py-1 bg-zinc-800 rounded-full flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-black tracking-widest text-zinc-300">{s.difficulty}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-1">{s.title}</h3>
              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                {s.prompt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-blue-500 text-[10px] font-bold uppercase tracking-widest">
                <Zap className="w-3 h-3" />
                Adaptive difficulty enabled
              </div>
            </button>
          ))}
          
          <div className="p-5 bg-zinc-900/20 border border-zinc-800/50 border-dashed rounded-[2rem] flex flex-col items-center justify-center text-center opacity-60">
             <Lock className="w-8 h-8 text-zinc-700 mb-2" />
             <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">More scenarios unlocking at B1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioHub;