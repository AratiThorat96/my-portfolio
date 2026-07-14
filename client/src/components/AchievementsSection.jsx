import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useDarkMode } from '../hooks/useDarkMode';
import api from '../api/axios';

const AchievementsSection = () => {
  const { ref, inView } = useScrollAnimation();
  const { isDark } = useDarkMode();
  const { data: achievements = [] } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const response = await api.get('/achievements');
      return response.data.achievements || [];
    },
    staleTime: 60 * 1000,
    retry: 1,
  });

  return (
    <section id="achievements" className={`py-20 ${isDark ? 'bg-black/20' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center text-primary"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Achievements
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement._id || achievement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-3xl ${isDark ? 'bg-secondary' : 'bg-white'} shadow-lg hover:-translate-y-1 transition`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">{achievement.category || 'Achievement'}</p>
              <h3 className="text-xl font-bold text-primary mb-3">{achievement.title}</h3>
              {(achievement.organization || achievement.achievementDate) && (
                <p className="text-sm text-gray-500 mb-3">
                  {[achievement.organization, achievement.achievementDate ? new Date(achievement.achievementDate).toLocaleDateString() : ''].filter(Boolean).join(' / ')}
                </p>
              )}
              <p className="text-gray-300 leading-7">{achievement.description}</p>
              {achievement.proofUrl && (
                <a href={achievement.proofUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-primary font-bold hover:text-accent transition">
                  View Proof
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
