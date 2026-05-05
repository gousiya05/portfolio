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
    description: 'Designed an AI-based system to convert leftover ingredients into recipes, reducing food waste. Built features like recipe search, filtering, AI-generated instructions, and user recipe sharing. Integrated modules such as Leftover Challenge, Scan & Cook, and bookmarking with a responsive UI.',
    tags: ['React', 'AI', 'Node.js', 'PostgreSQL'],
    link: 'https://github.com/gousiya05/platemate',
  },
  {
    id: 2,
    title: 'AI TRAVELL PLANNER',
    category: 'WEB APP / UI',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800&h=600',
    description: 'Developed a responsive AI-powered travel planning web application that enables users to search destinations, explore popular locations, and book accommodations. Integrated smart filtering (price, property type, amenities) and categorized services like flights, hotels, and tours to enhance user experience. Designed an intuitive UI with dynamic recommendations to simplify trip planning and improve engagement.',
    tags: ['React', 'Tailwind', 'AI Integration', 'UX Design'],
    link: 'https://github.com/gousiya05',
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
    <section ref={sectionRef} id="projects" className="py-24 px-6 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase text-white font-display"> 
              Neural <br /> <span className="text-brand italic text-glow">Archives</span> 
            </h2>
            <p className="text-neutral-400 max-w-sm font-light">
              High-precision machine learning frameworks and intelligent interface prototypes.
            </p>
          </div>
          <div className="flex flex-col items-end gap-6">
            <a href="https://github.com/gousiya05" target="_blank" rel="noreferrer" className="text-sm font-bold text-brand hover:underline underline-offset-8">Explore Archive (10+)</a>
            
            {/* Filter UI */}
            <div className="flex flex-wrap gap-2 justify-end">
              <div className="flex items-center gap-2 mr-4 text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
                <Filter size={12} /> Filter Architecture:
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

        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-8 lg:gap-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative project-card"
              >
                <Tilt>
                  {/* Floating Hologram Glow */}
                  <div className="absolute -inset-4 bg-brand/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800/50 mb-8 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(14,165,233,0.15)] group-hover:border-brand/30">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* AI Scanline Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/20 to-transparent h-[15%] w-full -translate-y-full group-hover:animate-scanline pointer-events-none z-10" />
                    
                    <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-transparent transition-all duration-500" />
                    
                    <div className="absolute top-8 left-8 flex gap-2 z-20">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-black/40 backdrop-blur-xl rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 group-hover:border-brand/40 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm z-20">
                      <div className="flex gap-4">
                        <a href={project.link} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-brand hover:text-white transition-all">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                        <a href={project.link} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors border border-white/10">
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="glass p-10 rounded-[2.5rem] group-hover:border-brand/30 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <p className="text-[10px] font-black text-brand uppercase tracking-[0.4em] mb-4 font-display neon-glow">{project.category}</p>
                    <h3 className="text-4xl font-black mb-5 tracking-tighter text-white group-hover:translate-x-2 transition-transform duration-500 font-display uppercase">{project.title}</h3>
                    <p className="text-neutral-400 font-light leading-relaxed mb-0 text-lg">{project.description}</p>
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
