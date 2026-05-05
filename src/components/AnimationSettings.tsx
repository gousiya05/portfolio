import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Zap, Ghost, EyeOff, Settings2 } from 'lucide-react';

export default function AnimationSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'fluid' | 'glitch' | 'minimal'>('fluid');

  const modes = [
    { id: 'fluid' as const, label: 'Neural Fluid', icon: <Zap size={14} />, desc: 'Smooth transitions & physics' },
    { id: 'glitch' as const, label: 'Data Corruption', icon: <Ghost size={14} />, desc: 'High-energy artifacts & glitch' },
    { id: 'minimal' as const, label: 'Deep Focus', icon: <EyeOff size={14} />, desc: 'Static & low performance impact' },
  ];

  return (
    <div className="fixed bottom-8 left-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 w-64 glass p-4 rounded-2xl border border-white/10 shadow-2xl"
          >
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-4">Animation Architecture</p>
            <div className="space-y-2">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    // This could be wired to a Context for global effect changes
                    document.documentElement.setAttribute('data-anim-mode', m.id);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    mode === m.id ? 'bg-brand text-black' : 'hover:bg-white/5 text-neutral-400'
                  }`}
                >
                  <div className={`${mode === m.id ? 'text-black' : 'text-brand'}`}>
                    {m.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-none mb-1">{m.label}</p>
                    <p className="text-[10px] opacity-60 leading-none">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          isOpen ? 'bg-brand text-black neon-glow' : 'glass text-white'
        }`}
      >
        <Settings2 size={20} className={isOpen ? 'animate-spin-slow' : ''} />
      </motion.button>
    </div>
  );
}
