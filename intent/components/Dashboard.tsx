import React from 'react';
import { UserProfile } from '../types';
import { MOCK_ROADMAP } from '../constants';
import ProgressStatsCard from './ProgressStatsCard';
import { 
  Play, 
  Settings, 
  Award, 
  LayoutGrid, 
  Zap, 
  ChevronRight,
  TrendingUp,
  CreditCard,
  Target,
  Search,
  BookOpen
} from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  onStartLesson: (id: string) => void;
  onStartConversation: () => void;
  onNavigate: (target: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartLesson, onStartConversation, onNavigate }) => {
  return (
    <div className="max-w-md mx-auto pb-32 min-h-screen transform-gpu">
      {/* Dynamic App Bar */}
      <header className="p-6 pt-12 flex justify-between items-start sticky top-0 bg-black/60 backdrop-blur-3xl z-40 border-b border-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 flex items-center justify-center border border-white/10 shadow-inner">
              <span className="text-sm font-bold text-white tracking-tighter">
                {user.name ? user.name.substring(0, 2).toUpperCase() : 'JD'}
              </span>
          </div>
          <div>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Tier: {user.level}</p>
              <h2 className="text-sm font-bold flex items-center gap-1">
                  {user.targetLanguage} • {user.intent}
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
              </h2>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2.5 bg-white/5 backdrop-blur-md rounded-2xl hover:bg-white/10 transition-colors">
                <Search className="w-5 h-5 text-zinc-400" />
            </button>
            <button className="p-2.5 bg-white/5 backdrop-blur-md rounded-2xl hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5 text-zinc-400" />
            </button>
        </div>
      </header>

      <div className="px-6 space-y-8 mt-6">
        {/* Fluency Asset Card - Refractive Transparency */}
        <section className="relative overflow-hidden p-8 bg-white/[0.01] backdrop-blur-[40px] border border-white/[0.05] rounded-[3rem] group shadow-2xl">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full" />
            <div className="relative z-10">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-4xl font-black tracking-tight font-sans italic">{user.fluencyScore || 72.4}%</h3>
                    <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> +4.2%
                    </span>
                </div>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Fluency Equity Index</p>
                <ProgressStatsCard />
            </div>
        </section>

        {/* Action Hub */}
        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={onStartConversation}
                className="col-span-2 p-8 bg-blue-600 rounded-[2.5rem] flex items-center justify-between group active:scale-[0.98] transition-all shadow-2xl shadow-blue-600/20"
            >
                <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight text-white">Open Live Practice</h3>
                    <p className="text-blue-100/60 text-xs font-medium">Gemini 2.5 Real-time Audio</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 text-blue-600 fill-blue-600" />
                </div>
            </button>
            
            <button 
                onClick={() => onNavigate('scenarios')}
                className="p-6 bg-white/[0.01] backdrop-blur-[40px] rounded-[2rem] text-left space-y-4 border border-white/[0.05] hover:bg-white/[0.04] active:scale-[0.98] transition-all shadow-xl"
            >
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-white">Simulations</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Real World</p>
                </div>
            </button>
            
            <button 
                onClick={() => onNavigate('vocab')}
                className="p-6 bg-white/[0.01] backdrop-blur-[40px] rounded-[2rem] text-left space-y-4 border border-white/[0.05] hover:bg-white/[0.04] active:scale-[0.98] transition-all shadow-xl"
            >
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-white">Vocab Vault</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">MemorySRS</p>
                </div>
            </button>
        </div>

        {/* The "Mastery" Path */}
        <section className="pt-4 pb-20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-zinc-500 text-[10px] uppercase tracking-[0.4em]">Mastery Nodes</h3>
            <span className="text-[10px] font-bold text-blue-500">Adaptive Roadmap</span>
          </div>
          <div className="relative space-y-3">
            {MOCK_ROADMAP.map((lesson, idx) => (
              <div 
                key={lesson.id}
                onClick={() => !lesson.isLocked && onStartLesson(lesson.id)}
                className={`relative pl-10 group ${lesson.isLocked ? 'opacity-20' : 'cursor-pointer'}`}
              >
                {/* Visual Connector */}
                {idx !== MOCK_ROADMAP.length - 1 && (
                    <div className="absolute left-[7px] top-[28px] bottom-0 w-0.5 bg-gradient-to-b from-blue-600/50 to-transparent" />
                )}
                
                {/* Visual Node */}
                <div className={`absolute left-0 top-[6px] w-4 h-4 rounded-full border-2 z-10 transition-all duration-700 ${
                    lesson.progress === 100 ? 'bg-blue-600 border-blue-600 scale-110 shadow-lg shadow-blue-500/40' : 
                    lesson.isLocked ? 'bg-zinc-900 border-zinc-700' : 'bg-black border-blue-600 animate-pulse'
                }`} />

                <div className={`p-6 rounded-[2rem] transition-all duration-500 border ${
                    lesson.isLocked ? 'bg-transparent border-transparent' : 'bg-white/[0.01] backdrop-blur-[40px] border-white/[0.05] group-hover:bg-white/[0.04] group-hover:border-blue-500/30 shadow-xl'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm tracking-tight text-white">{lesson.title}</h4>
                    {lesson.progress === 100 ? <Award className="w-4 h-4 text-blue-500" /> : <div className="text-[10px] font-bold text-zinc-600">Lv.{lesson.difficulty}</div>}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">{lesson.description}</p>
                  {lesson.progress > 0 && lesson.progress < 100 && (
                      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600" style={{ width: `${lesson.progress}%` }} />
                      </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Nav */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm px-8 py-5 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex justify-between items-center z-50 shadow-2xl shadow-black/80">
        <button onClick={() => onNavigate('dashboard')} className="text-blue-500 relative group transition-transform active:scale-90 bg-transparent border-none">
          <LayoutGrid className="w-6 h-6" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
        </button>
        <button onClick={() => onNavigate('scenarios')} className="text-zinc-600 hover:text-zinc-300 transition-all active:scale-90 bg-transparent border-none"><Target className="w-6 h-6" /></button>
        <button onClick={() => onNavigate('vocab')} className="text-zinc-600 hover:text-zinc-300 transition-all active:scale-90 bg-transparent border-none"><BookOpen className="w-6 h-6" /></button>
        <button className="text-zinc-600 hover:text-zinc-300 transition-all active:scale-90 bg-transparent border-none"><CreditCard className="w-6 h-6" /></button>
      </nav>
    </div>
  );
};

export default Dashboard;