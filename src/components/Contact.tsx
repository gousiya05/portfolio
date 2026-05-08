import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Digital Experience',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setStatus(type);
    setTimeout(() => {
      setStatus('idle');
      setToastMessage('');
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Transmission failed');
      }

      showToast('Transmission Sent Successfully', 'success');
      setFormData({ name: '', email: '', projectType: 'Digital Experience', message: '' });
    } catch (error) {
      showToast('Transmission Failed. Please try again.', 'error');
    }
  };

  return (
    <section id="contact" className="py-20 md:pt-[120px] px-6 md:px-[60px] relative overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {status === 'success' || status === 'error' ? (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-10 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl glass backdrop-blur-xl border ${
              status === 'success' 
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                : 'border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
            }`}
          >
            {status === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-display font-bold tracking-widest text-xs uppercase">{toastMessage}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[60px]">
          
          {/* Left Side: Contact Details */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="font-black text-foreground uppercase tracking-[-2px] leading-[0.9] mb-8 md:mb-12 font-display text-[clamp(2.5rem,5vw,6rem)] break-words">
                Establish <br /> <span className="accent">Connection</span>
              </h2>
              
              <div className="space-y-12">
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand group-hover:bg-brand/10 group-hover:border-brand/30 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-2 font-display">Communication Link</p>
                    <a href="mailto:gdudekula3@gmail.com" className="text-xl md:text-2xl font-bold text-foreground hover:text-brand transition-colors tracking-tight font-display">
                      gdudekula3@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-12">
                  <a 
                    href="https://www.linkedin.com/in/dudekula-gousiya-4aa815325" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group flex flex-col gap-2"
                  >
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest font-display">LinkedIn</span>
                    <div className="flex items-center gap-2 text-foreground group-hover:text-brand transition-colors font-bold font-display text-sm md:text-base">
                      Profile <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </a>
                  <a 
                    href="https://github.com/gousiya05" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group flex flex-col gap-2"
                  >
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest font-display">Source</span>
                    <div className="flex items-center gap-2 text-foreground group-hover:text-brand transition-colors font-bold font-display text-sm md:text-base">
                      GitHub <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-background/20 backdrop-blur-3xl border border-white/5 rounded-[32px] p-8 md:p-12 relative group"
            >
              {/* Form Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[32px] pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] ml-2 font-display">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-[64px] bg-black/40 border border-white/10 rounded-[18px] px-[24px] text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 focus:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] ml-2 font-display">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@company.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-[64px] bg-black/40 border border-white/10 rounded-[18px] px-[24px] text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 focus:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] ml-2 font-display">Project Type</label>
                  <div className="relative">
                    <select 
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full h-[64px] bg-black/40 border border-white/10 rounded-[18px] px-[24px] text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 focus:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 appearance-none"
                    >
                      <option value="Digital Experience" className="bg-neutral-900">Digital Experience</option>
                      <option value="Custom Development" className="bg-neutral-900">Custom Development</option>
                      <option value="Brand Identity" className="bg-neutral-900">Brand Identity</option>
                      <option value="Other" className="bg-neutral-900">Other</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] ml-2 font-display">How can I help?</label>
                  <textarea 
                    required
                    minLength={10}
                    placeholder="Tell me about your project..." 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full min-h-[180px] bg-black/40 border border-white/10 rounded-[18px] px-[24px] py-6 text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 focus:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 resize-none"
                  />
                </div>
                <motion.button 
                  whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                  disabled={status === 'loading'}
                  className="w-full h-[64px] bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-[18px] transition-all duration-500 hover:bg-brand hover:text-white hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:shadow-none"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Transmitting...
                    </>
                  ) : (
                    'Send Inquiry'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
