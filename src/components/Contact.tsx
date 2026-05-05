import { motion } from 'motion/react';
import { Mail, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto glass rounded-[32px] p-8 md:p-16 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-4xl md:text-8xl font-black mb-12 tracking-tighter uppercase text-foreground font-display leading-[0.9]">
              Establish <br /> <span className="text-brand italic text-glow">Connection</span>
            </h2>
            <div className="space-y-12">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-brand neon-glow">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] mb-2 font-display">Communication Link</p>
                  <a href="mailto:gdudkela3@gmail.com" className="text-2xl font-bold text-foreground hover:text-brand transition-colors tracking-tight font-display">
                    gdudkela3@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex gap-8">
                <a 
                  href="https://www.linkedin.com/in/dudekula-gousiya-4aa815325" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group flex flex-col gap-2"
                >
                  <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest font-display">LinkedIn</span>
                  <div className="flex items-center gap-2 text-foreground group-hover:text-brand transition-colors font-bold font-display">
                    Profile <ArrowUpRight size={18} />
                  </div>
                </a>
                <a 
                  href="https://github.com/gousiya05" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group flex flex-col gap-2"
                >
                  <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest font-display">Source</span>
                  <div className="flex items-center gap-2 text-foreground group-hover:text-brand transition-colors font-bold font-display">
                    GitHub <ArrowUpRight size={18} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Jane Doe" 
                  className="w-full bg-background border border-foreground/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted focus:outline-none focus:border-brand transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="jane@company.com" 
                  className="w-full bg-background border border-foreground/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted focus:outline-none focus:border-brand transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Project Type</label>
              <select className="w-full bg-background border border-foreground/10 rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-brand transition-colors appearance-none">
                <option className="bg-background">Digital Experience</option>
                <option className="bg-background">Custom Development</option>
                <option className="bg-background">Brand Identity</option>
                <option className="bg-background">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">How can I help?</label>
              <textarea 
                rows={4}
                placeholder="Tell me about your project..." 
                className="w-full bg-background border border-foreground/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted focus:outline-none focus:border-brand transition-colors resize-none"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-white text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-neutral-200 transition-all"
            >
              Send Inquiry
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
