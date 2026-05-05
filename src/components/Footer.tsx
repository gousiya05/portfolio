export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-foreground/5 relative z-10 bg-background/50 backdrop-blur-md overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-brand flex items-center justify-center neon-glow">
            <span className="text-black text-xs font-black">G</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-foreground font-display">GOUSIYA</span>
        </div>
        
        <p className="text-xs text-neutral-600 font-mono uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} GS-System. All protocols active.
        </p>

        <div className="flex gap-8">
          <a href="https://github.com/gousiya05" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-neutral-500 hover:text-brand transition-colors tracking-widest font-display uppercase">GitHub</a>
          <a href="https://www.linkedin.com/in/dudekula-gousiya-4aa815325" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-neutral-500 hover:text-brand transition-colors tracking-widest font-display uppercase">LinkedIn</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 text-center opacity-5">
        <p className="text-[14vw] font-black text-foreground leading-none select-none font-display">NEURAL CORE</p>
      </div>
    </footer>
  );
}
