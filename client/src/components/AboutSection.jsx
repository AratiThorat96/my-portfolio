import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useDarkMode } from '../hooks/useDarkMode';
import useProfileData from '../hooks/useProfileData';
import { useSyncedRole } from '../hooks/useRolePreference';

const AboutSection = () => {
  const { ref, inView } = useScrollAnimation();
  const { isDark } = useDarkMode();
  const portfolioData = useProfileData();
  const { selectedRole } = useSyncedRole();

  return (
    <section id="about" className={`py-20 ${isDark ? 'bg-black/20' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center text-primary"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          About Me
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`p-8 rounded-3xl ${isDark ? 'bg-secondary/90' : 'bg-white'} shadow-xl`}
          >
            <p className="text-lg text-gray-300 mb-6 leading-8">
              This portfolio is built as one adaptable profile for multiple roles. The selected focus is <span className="text-primary font-bold">{selectedRole.title}</span>, but the work also covers full stack development, frontend engineering, app development, cyber security fundamentals, data analysis, and SDE preparation.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-2xl ${isDark ? 'bg-black/25' : 'bg-gray-50'}`}>
                <p className="text-sm text-gray-400 mb-2">Current Focus</p>
                <p className="text-gray-200 leading-7">{selectedRole.summary}</p>
              </div>
              <div className={`p-4 rounded-2xl ${isDark ? 'bg-black/25' : 'bg-gray-50'}`}>
                <p className="text-sm text-gray-400 mb-2">Contact</p>
                <p className="text-gray-200">{portfolioData.email}</p>
                <p className="text-gray-200">{portfolioData.phone}</p>
                <p className="text-gray-200">{portfolioData.location}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
