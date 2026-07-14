import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useDarkMode } from '../hooks/useDarkMode';
import { toast } from 'react-toastify';
import api from '../api/axios';
import useProfileData from '../hooks/useProfileData';

const ContactSection = () => {
  const { ref, inView } = useScrollAnimation();
  const { isDark } = useDarkMode();
  const portfolioData = useProfileData();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const submitMessage = async (formData) => {
    setLoading(true);

    try {
      await api.post('/messages', {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={`py-20 ${isDark ? 'bg-black/20' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center text-primary"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Get In Touch
        </motion.h2>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className={`p-8 rounded-3xl ${isDark ? 'bg-secondary' : 'bg-white'} shadow-lg`}
          >
            <p className="text-gray-300 mb-6 leading-7">
              I am open to internships, entry-level developer opportunities, and collaborative software projects.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a href={portfolioData.socialLinks.email} className="text-primary font-semibold break-all">
                  {portfolioData.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <a href={`tel:${portfolioData.phone.replace(/[^\d+]/g, '')}`} className="text-primary font-semibold">
                  {portfolioData.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-white">{portfolioData.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">LinkedIn</p>
                <a
                  href={portfolioData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold"
                >
                  linkedin.com/in/aratithorat
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400">GitHub</p>
                <a
                  href={portfolioData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold"
                >
                  github.com/AratiThorat96
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400">LeetCode</p>
                <a
                  href={portfolioData.socialLinks.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold"
                >
                  leetcode.com/u/AratiThorat_96
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400">TryHackMe</p>
                <a
                  href={portfolioData.socialLinks.tryhackme}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold"
                >
                  tryhackme.com/p/AratiThorat
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(submitMessage)}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className={`space-y-6 p-8 rounded-3xl ${isDark ? 'bg-secondary' : 'bg-white'} shadow-lg`}
          >
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Name</label>
              <input
                type="text"
                {...register('name')}
                required
                className={`w-full px-4 py-3 rounded-xl border border-gray-600 focus:border-primary focus:outline-none transition ${
                  isDark ? 'bg-black/30 text-white' : 'bg-white text-black'
                }`}
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2">Email</label>
              <input
                type="email"
                {...register('email')}
                required
                className={`w-full px-4 py-3 rounded-xl border border-gray-600 focus:border-primary focus:outline-none transition ${
                  isDark ? 'bg-black/30 text-white' : 'bg-white text-black'
                }`}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2">Subject</label>
              <input
                type="text"
                {...register('subject')}
                required
                className={`w-full px-4 py-3 rounded-xl border border-gray-600 focus:border-primary focus:outline-none transition ${
                  isDark ? 'bg-black/30 text-white' : 'bg-white text-black'
                }`}
                placeholder="Project, opportunity, or question"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2">Message</label>
              <textarea
                {...register('message')}
                required
                rows="6"
                className={`w-full px-4 py-3 rounded-xl border border-gray-600 focus:border-primary focus:outline-none transition resize-none ${
                  isDark ? 'bg-black/30 text-white' : 'bg-white text-black'
                }`}
                placeholder="Tell me about your opportunity or project..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition font-bold disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
