import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Cpu } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-brand/20' : 'py-4 md:py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <motion.a
          href="#hero"
          onClick={() => setMobileMenuOpen(false)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-black tracking-tighter text-white flex items-center gap-3 font-display group"
        >
          <div className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center neon-glow group-hover:scale-110 transition-transform">
            <Cpu size={24} className="text-black" />
          </div>
          <span className="group-hover:text-glow transition-all">GOUSIYA</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 hover:text-brand transition-colors font-display"
            >
              {link.name}
            </motion.a>
          ))}
          
          <button
            onClick={toggleTheme}
            className="p-2 text-brand glass rounded-lg hover:neon-glow transition-all"
            title="Toggle Protocol"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="btn-primary !px-6 !py-2.5 !text-[10px] !rounded-lg"
          >
            Terminal
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 glass rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 glass border-b border-brand/20 p-8 flex flex-col gap-6 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-neutral-300 uppercase tracking-widest font-display"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 bg-brand text-black text-center font-bold uppercase tracking-widest rounded-xl font-display"
            >
              Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand origin-left shadow-[0_0_10px_#0ea5e9]"
        style={{ scaleX }}
      />
    </nav>
  );
}
