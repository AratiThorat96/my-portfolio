import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useDarkMode } from '../hooks/useDarkMode';
import { domainProfiles } from '../data/domainProfiles';

const SkillsSection = () => {
  const { ref, inView } = useScrollAnimation();
  const { isDark } = useDarkMode();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section id="skills" className={`py-20 ${isDark ? 'bg-secondary' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center text-primary"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Skills
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <div className="text-center mb-8">
            <p className="uppercase tracking-[0.35em] text-sm text-primary mb-3">Role Domains</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {domainProfiles.map((domain, idx) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.08 }}
                className={`p-6 rounded-lg border hover:-translate-y-1 transition ${
                  isDark ? 'bg-black/30 border-primary/15 hover:border-primary/50' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">{domain.label}</p>
                <h3 className="text-xl font-bold text-primary mb-3">{domain.title}</h3>
                <p className="text-gray-400 text-sm mb-5 leading-6">{domain.headline}</p>
                <div className="flex flex-wrap gap-2">
                  {domain.strengths.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-primary/15 text-primary rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
