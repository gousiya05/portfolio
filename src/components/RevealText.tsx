import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function RevealText({ text, className = '', delay = 0 }: RevealTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      {
        y: 100,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.05,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, [text, delay]);

  return (
    <div ref={textRef} className={`overflow-hidden perspective-1000 ${className}`}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="char inline-block origin-bottom transition-transform duration-300 hover:text-brand"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
