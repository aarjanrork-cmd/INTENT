
import React from 'react';

const ProgressStatsCard: React.FC = () => {
  const metrics = [
    { label: 'Grammar', value: 64, color: 'bg-blue-500' },
    { label: 'Listening', value: 82, color: 'bg-blue-400' },
    { label: 'Speaking', value: 48, color: 'bg-zinc-700' },
    { label: 'Accent', value: 91, color: 'bg-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map(m => (
        <div key={m.label} className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">{m.label}</span>
            <span className="text-[10px] font-bold text-zinc-300">{m.value}%</span>
          </div>
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className={`h-full ${m.color} rounded-full transition-all duration-1000`}
              style={{ width: `${m.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressStatsCard;
