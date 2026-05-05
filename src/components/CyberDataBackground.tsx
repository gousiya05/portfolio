import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

export default function CyberDataBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax layers
  const moveX = useTransform(springX, [0, window.innerWidth], [20, -20]);
  const moveY = useTransform(springY, [0, window.innerHeight], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      style={{ x: moveX, y: moveY }}
      className="fixed inset-[-5%] pointer-events-none -z-20 overflow-hidden bg-background"
    >
      {/* Glitchy Data Streams */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          initial={{ y: '-100%', x: `${i * 8}%`, opacity: 0 }}
          animate={{
            y: '200%',
            opacity: [0, 0.2, 0.2, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear"
          }}
          className="absolute w-px h-64 bg-gradient-to-b from-transparent via-brand/40 to-transparent shadow-[0_0_10px_#0ea5e980]"
        />
      ))}

      {/* Neural Particle Drift */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`drift-${i}`}
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            opacity: 0 
          }}
          animate={{
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`
            ],
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`
            ],
            opacity: [0, 0.15, 0]
          }}
          transition={{
            duration: 30 + Math.random() * 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-0.5 h-0.5 bg-brand/30 rounded-full blur-[0.5px]"
        />
      ))}

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            scale: 0,
            opacity: 0 
          }}
          animate={{
            y: ['-5%', '105%'],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-accent rounded-full blur-[1px]"
        />
      ))}

      {/* Pulsing Core Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 -right-1/4 w-[60%] h-[60%] bg-brand/10 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]"
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
    </motion.div>
  );
}

