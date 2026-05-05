import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setComplete(true);
      }
    });

    // Simulate progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    tl.to('.loader-text', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to('.loader-bar', {
      scaleX: 1,
      duration: 2,
      ease: 'power4.inOut'
    }, 0)
    .to('.preloader', {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut',
      delay: 0.5
    });

    return () => clearInterval(timer);
  }, []);

  if (complete) return null;

  return (
    <div className="preloader fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center">
      <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mb-8">
        <div className="loader-bar absolute inset-0 bg-brand origin-left scale-x-0" />
      </div>
      
      <div className="loader-text flex flex-col items-center opacity-0 translate-y-4">
        <span className="text-[10px] font-black tracking-[0.5em] text-brand uppercase mb-2">Systems initializing</span>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black font-display text-white">{progress}%</span>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 flex gap-4">
        <div className="w-2 h-2 bg-brand rounded-full animate-ping" />
        <span className="text-[8px] font-mono text-muted uppercase tracking-widest">Establishing Neural Link...</span>
      </div>
    </div>
  );
}
