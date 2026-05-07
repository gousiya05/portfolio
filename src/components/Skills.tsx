import { motion } from 'motion/react';

const skillCategories = [
  {
    title: 'Programming',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 }
    ],
  },
  {
    title: 'AI/ML',
    skills: [
      { name: 'Scikit-learn', level: 80 },
      { name: 'Pandas', level: 85 },
      { name: 'NumPy', level: 85 }
    ],
  },
  {
    title: 'Web',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'JavaScript', level: 85 }
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-px h-full bg-neutral-900 hidden lg:block" />
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="section-heading"> 
            System <br /> <span className="accent">Capabilities</span> 
          </h2>
          <p className="section-sub">An exhaustive overview of core technical competencies across the AI and neural framework domains.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-t border-neutral-800 pt-8"
            >
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-8">{category.title}</h3>
              <div className="flex flex-col gap-8">
                {category.skills.map(skill => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-lg font-bold text-muted group-hover:text-foreground transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-neutral-600 group-hover:text-brand transition-colors duration-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        className="h-full bg-brand rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
