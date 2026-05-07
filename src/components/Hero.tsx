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
    <section id="hero" className="relative min-h-[110vh] flex items-center pt-24 md:pt-32 pb-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center z-10 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-[10px] md:text-xs font-bold text-brand mb-8 md:mb-12 uppercase tracking-[0.2em] neon-glow mx-auto">
              <Cpu size={14} className="animate-pulse" />
              Neural Systems Active
            </div>
            
            <h1 className="text-[16vw] md:text-[12vw] xl:text-[180px] font-black leading-[0.8] mb-8 md:mb-12 tracking-tighter text-foreground font-display relative select-none">
              <RevealText text="GOUSIYA" className="inline-block" />
              <div className="absolute top-[110%] left-1/2 -translate-x-1/2 w-screen h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
            </h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 md:mt-20"
            >
              <div className="h-8 mb-4">
                <p className="text-xl md:text-3xl font-mono text-brand/80 tracking-tight flex items-center justify-center gap-2">
                  <span className="text-foreground opacity-20">&gt;</span>
                  {text}
                  <span className="w-2 h-6 bg-brand animate-pulse" />
                </p>
              </div>

              <p className="text-base md:text-xl text-muted mb-12 md:mb-16 max-w-3xl mx-auto font-light leading-relaxed px-4">
                Engineering the next generation of <span className="text-foreground font-medium">intelligent systems</span> through a fusion of advanced machine learning and high-performance computing.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <a href="#projects" className="btn-primary w-full md:w-auto">
                  View Archive <ArrowRight size={18} />
                </a>
                
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/gousiya05" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-icon"
                  >
                    <Github size={22} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/dudekula-gousiya-4aa815325" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-icon"
                  >
                    <Linkedin size={22} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute right-4 md:right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand/10 to-transparent hidden sm:block" />
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand/10 to-transparent hidden sm:block" />
    </section>
  );
}
