import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useDarkMode } from '../hooks/useDarkMode';
import portfolioData from '../data/portfolioData';

const EducationSection = () => {
  const { ref, inView } = useScrollAnimation();
  const { isDark } = useDarkMode();

  return (
    <section id="education" className={`py-20 ${isDark ? 'bg-secondary' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center text-primary"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Education
        </motion.h2>

        <div className="space-y-5">
          {portfolioData.education.map((item, idx) => (
            <motion.div
              key={`${item.degree}-${item.institution}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-3xl ${isDark ? 'bg-black/30' : 'bg-gray-50'} shadow-lg`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-primary">{item.degree}</h3>
                  <p className="text-gray-300">{item.institution}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-gray-400">{item.duration}</p>
                  <p className="text-white font-semibold">{item.score}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
