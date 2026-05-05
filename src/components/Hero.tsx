import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';
import RevealText from './RevealText';

export default function Hero() {
  const [text, setText] = useState('');
  const fullText = "AI Developer | ML Enthusiast";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[110vh] flex items-center pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center z-10 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-xs font-bold text-brand mb-12 uppercase tracking-[0.2em] neon-glow mx-auto">
              <Cpu size={14} className="animate-pulse" />
              Neural Systems Active
            </div>
            
            <h1 className="text-[12vw] xl:text-[180px] font-black leading-[0.8] mb-12 tracking-tighter text-foreground font-display relative select-none">
              <RevealText text="GOUSIYA" className="inline-block" />
              <div className="absolute top-[110%] left-1/2 -translate-x-1/2 w-screen h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
            </h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-20"
            >
              <div className="h-8 mb-4">
                <p className="text-2xl md:text-3xl font-mono text-brand/80 tracking-tight flex items-center justify-center gap-2">
                  <span className="text-foreground opacity-20">&gt;</span>
                  {text}
                  <span className="w-2 h-6 bg-brand animate-pulse" />
                </p>
              </div>

              <p className="text-xl text-muted mb-16 max-w-3xl mx-auto font-light leading-relaxed">
                Engineering the next generation of <span className="text-foreground font-medium">intelligent systems</span> through a fusion of advanced machine learning and high-performance computing.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-8">
                <a 
                  href="#projects" 
                  className="group relative px-10 py-5 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
                  <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-500">
                    VIEW ARCHIVE <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </span>
                </a>
                
                <div className="flex gap-6">
                  <a 
                    href="https://github.com/gousiya05" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-14 h-14 flex items-center justify-center bg-foreground/5 border border-foreground/10 rounded-full text-muted hover:text-brand hover:border-brand/50 transition-all"
                  >
                    <Github size={24} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/dudekula-gousiya-4aa815325" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-14 h-14 flex items-center justify-center bg-foreground/5 border border-foreground/10 rounded-full text-muted hover:text-brand hover:border-brand/50 transition-all"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand/10 to-transparent" />
      <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand/10 to-transparent" />
    </section>
  );
}
