/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CyberDataBackground from './components/CyberDataBackground';
import AnimationSettings from './components/AnimationSettings';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';

import { ThemeProvider } from './lib/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Preloader />
      <SmoothScroll>
        <div id="app-root" className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-brand/30 selection:text-white">
          <CustomCursor />
          <CyberDataBackground />
          <AnimationSettings />
          
          <Navbar />
          
          <main>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Achievements />
                <Contact />
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer />

          {/* Structured noise overlay for tactile feel */}
          <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
          </div>
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}
