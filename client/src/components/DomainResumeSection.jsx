import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { useDarkMode } from '../hooks/useDarkMode';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import useProfileData from '../hooks/useProfileData';
import api from '../api/axios';

const DomainResumeSection = () => {
  const { isDark } = useDarkMode();
  const { ref, inView } = useScrollAnimation();
  const portfolioData = useProfileData();

  const trackDownload = () => {
    api.post('/profile/resume-download').catch(() => {});
  };

  return (
    <section id="resumes" className={`py-20 ${isDark ? 'bg-black/20' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="uppercase tracking-[0.35em] text-sm text-primary mb-3">Role-Wise Resumes</p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {portfolioData.resumes.map((role, idx) => (
            <motion.a
              key={role.id || role.label}
              href={role.href}
              download
              onClick={trackDownload}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.08 }}
              className={`group p-6 rounded-lg border transition hover:-translate-y-1 ${
                isDark ? 'bg-secondary border-primary/20 hover:border-primary/60' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">{role.domain}</p>
                  <h3 className="text-xl font-bold text-primary">{role.label}</h3>
                </div>
                <span className="w-11 h-11 rounded-lg bg-primary/15 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition">
                  <FaDownload />
                </span>
              </div>
              <p className="text-gray-300 mt-4 leading-7">Download the latest {role.domain || 'portfolio'} resume.</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainResumeSection;
