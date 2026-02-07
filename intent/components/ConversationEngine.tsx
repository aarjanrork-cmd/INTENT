
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import { X, Mic, MicOff, Send, MessageCircle, AlertCircle } from 'lucide-react';

interface ConversationEngineProps {
  user: UserProfile;
  onClose: () => void;
}

const ConversationEngine: React.FC<ConversationEngineProps> = ({ user, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: `¡Hola! Let's practice for your ${user.intent.toLowerCase()} needs. How can I help you today?` }
  ]);
  const [inputText, setInputText] = useState('');
  const [waveform, setWaveform] = useState<number[]>(new Array(20).fill(2));
  const waveformRef = useRef<number[]>([]);

  // Simulate waveform animation when listening
  useEffect(() => {
    let interval: any;
    if (isListening) {
      interval = setInterval(() => {
        setWaveform(prev => prev.map(() => Math.random() * 20 + 2));
      }, 100);
    } else {
      setWaveform(new Array(20).fill(2));
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newUserMsg = { role: 'user' as const, text: inputText };
    setMessages([...messages, newUserMsg]);
    setInputText('');
    
    // Simulate AI response logic
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "That's a great question. In a professional context, we use the subjunctive here to express intent. Would you like me to explain 'why' or continue the practice?" 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 revolut-gradient rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold">AI Tutor</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Immersive Mode</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500`}>
            <div className={`max-w-[85%] p-4 rounded-3xl ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Interaction Area */}
      <div className="p-6 pb-12 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900 space-y-6">
        {/* Waveform Visualization */}
        <div className="flex items-center justify-center gap-1 h-12">
          {waveform.map((h, i) => (
            <div 
              key={i} 
              className={`w-1 rounded-full transition-all duration-100 ${isListening ? 'bg-indigo-500' : 'bg-zinc-800'}`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isListening ? 'bg-red-500/20 border-2 border-red-500 animate-pulse' : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6 text-red-500" /> : <Mic className="w-6 h-6 text-indigo-400" />}
          </button>
          
          <div className="flex-1 bg-zinc-900 rounded-[2rem] px-6 flex items-center gap-3 border border-zinc-800 focus-within:border-indigo-500/50 transition-colors">
            <input 
              type="text" 
              placeholder="Type or speak..."
              className="bg-transparent flex-1 py-4 text-zinc-100 outline-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="p-2 text-indigo-400 hover:text-indigo-300 disabled:opacity-30"
              disabled={!inputText.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center text-[10px] text-zinc-500 font-medium">
          <AlertCircle className="w-3 h-3" />
          AI is optimized for your {user.intent.toLowerCase()} goals
        </div>
      </div>
    </div>
  );
};

export default ConversationEngine;
