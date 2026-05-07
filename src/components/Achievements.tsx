import { motion } from 'motion/react';
import { Award, Trophy, Star } from 'lucide-react';

const achievements = [
  {
    title: '1st Place - CodeVerse’25 Hackathon',
    organization: 'S-VYASA University',
    description: 'Secured 1st place in the 24-hour national hackathon by building a comprehensive full-stack web application with integrated AI features.',
    icon: <Trophy className="text-brand" size={24} />,
    type: 'Competition'
  },
  {
    title: 'Best Team III - Summer Special',
    organization: 'CodeVerse’25, S-VYASA University',
    description: 'Awarded Best Team III (Cloud Commanders) for technical excellence and hands-on implementation of scalable web technologies.',
    icon: <Award className="text-brand" size={24} />,
    type: 'Program'
  },
  {
    title: 'National Finalist - VISION 2047',
    organization: 'RV College of Engineering, Bangalore',
    description: 'Selected as a Finalist in the VISION 2047 National Hackathon (Karnataka Edition), demonstrating innovative problem-solving on a national stage.',
    icon: <Star className="text-brand" size={24} />,
    type: 'Recognition'
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-heading"> 
            Operational <br /> <span className="accent">Benchmarks</span> 
          </h2>
          <p className="text-muted max-w-lg mx-auto font-light text-lg">
            A linear progression of technical certifications and competitive milestones.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand/50 via-accent/30 to-transparent hidden md:block" />

          <div className="space-y-12 relative">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand neon-glow z-10" />
                
                <div className="flex-1 w-full">
                  <div className={`card-glass p-6 md:p-8 group ${index % 2 === 0 ? 'md:text-right' : 'text-left'} text-center md:text-left`}>
                    <div className={`mb-6 w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner mx-auto ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:ml-0'}`}>
                      {achievement.icon}
                    </div>
                    
                    <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-3 block font-display">
                      {achievement.type}
                    </span>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight font-display">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-sm text-brand font-medium uppercase tracking-widest mb-4">
                      {achievement.organization}
                    </p>
                    
                    <p className="text-muted text-sm leading-relaxed font-light">
                      {achievement.description}
                    </p>
                  </div>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

