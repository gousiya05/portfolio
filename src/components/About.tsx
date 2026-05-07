import { motion } from 'motion/react';
import { User, Code, GraduationCap, Laptop } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: <GraduationCap size={20} />,
      title: 'Current Education',
      text: 'Computer Science student at S-VYASA Deemed to be University, focusing on AI and System Architecture.'
    },
    {
      icon: <Laptop size={20} />,
      title: 'Technical Role',
      text: 'Technical Coordinator for ROBOXION, leading robotics and development initiatives on campus.'
    },
    {
      icon: <Code size={20} />,
      title: 'Core Philosophy',
      text: 'Believer in clean code, efficient algorithms, and the transformative power of Artificial Intelligence.'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading">
              Architecting <br /> <span className="accent">Intelligence</span>
            </h2>
            <p className="text-lg text-muted mb-16 font-light leading-relaxed max-w-2xl mx-auto">
              I am a neural systems researcher and developer, driven by the challenge of creating autonomous frameworks that bridge the gap between abstract mathematical models and real-world impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 w-full">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-glass flex flex-col items-center gap-6 p-8"
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-neutral-900 flex items-center justify-center text-brand border border-neutral-800 neon-glow">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 tracking-tight font-display uppercase text-sm">{item.title}</h4>
                  <p className="text-sm text-muted font-light leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
