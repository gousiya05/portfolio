import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Tilt from './Tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'PLATE MATE',
    category: 'AI / SUSTAINABILITY',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=800&h=600',
    description: 'AI-based system to convert leftover ingredients into recipes, reducing food waste. Features recipe search, filtering, AI-generated instructions, and user recipe sharing.',
    tags: ['React', 'AI', 'Node.js', 'PostgreSQL'],
    demo: 'https://platemate-ivory.vercel.app/',
    github: 'https://github.com/gousiya05/platemate',
  },
  {
    id: 2,
    title: 'AI TRAVEL PLANNER',
    category: 'WEB APP / UI',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800&h=600',
    description: 'AI-powered travel planning web app with smart filtering, dynamic recommendations, and booking for flights, hotels, and tours.',
    tags: ['React', 'Tailwind', 'AI Integration', 'UX Design'],
    demo: 'https://ai-travell-planner-ecru.vercel.app/',
    github: 'https://github.com/gousiya05/AI-TRAVELL-PLANNER',
  },
];

const categories = ['ALL', 'AI / SUSTAINABILITY', 'WEB APP / UI'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeFilter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.project-card');
    
    gsap.fromTo(cards, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );
  }, [filteredProjects]);

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="section-heading"> 
              Neural <br /> <span className="accent">Archives</span> 
            </h2>
            <p className="section-sub">
              High-precision machine learning frameworks and intelligent interface prototypes.
            </p>
          </div>
          <div className="flex flex-col items-end gap-6">
            <a href="https://github.com/gousiya05" target="_blank" rel="noreferrer" className="text-sm font-bold text-brand hover:underline underline-offset-8">Explore Archive (10+)</a>
            
            {/* Filter */}
            <div className="flex flex-wrap gap-2 justify-end">
              <div className="flex items-center gap-2 mr-4 text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
                <Filter size={12} /> Filter:
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${
                    activeFilter === cat 
                      ? 'bg-brand text-black neon-glow' 
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group project-card flex flex-col"
              >
                <Tilt>
                  {/* Hover glow */}
                  <div className="absolute -inset-4 bg-brand/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl bg-neutral-900 border border-neutral-800/50 border-b-0 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(14,165,233,0.15)] group-hover:border-brand/30">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-transparent transition-all duration-500" />
                    
                    {/* Tags on image */}
                    <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-xl rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 group-hover:border-brand/40 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="card-glass rounded-t-none rounded-b-3xl p-6 md:p-8 flex flex-col flex-1">
                    <p className="text-[10px] font-black text-brand uppercase tracking-[0.4em] mb-3 font-display">{project.category}</p>
                    <h3 className="text-3xl font-black mb-4 tracking-tighter text-white group-hover:translate-x-1 transition-transform duration-500 font-display uppercase">{project.title}</h3>
                    <p className="text-neutral-400 font-light leading-relaxed mb-8 flex-1">{project.description}</p>
                    
                    {/* Buttons — always visible, consistent */}
                    <div className="flex gap-4">
                      <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary flex-1">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                      <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary flex-1">
                        <Github size={16} /> View Code
                      </a>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
