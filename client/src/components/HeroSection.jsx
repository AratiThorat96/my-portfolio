import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaShieldAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { useDarkMode } from '../hooks/useDarkMode';
import useProfileData from '../hooks/useProfileData';
import useRolePreference from '../hooks/useRolePreference';
import profileImage from '../assets/profile.jpg';

const HeroSection = () => {
  const { isDark } = useDarkMode();
  const portfolioData = useProfileData();
  const { roles, selectedRole, selectedRoleId, setSelectedRoleId } = useRolePreference();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const socialLinks = [
    { href: portfolioData.socialLinks.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
    { href: portfolioData.socialLinks.github, icon: FaGithub, label: 'GitHub' },
    { href: portfolioData.socialLinks.leetcode, icon: SiLeetcode, label: 'LeetCode' },
    { href: portfolioData.socialLinks.tryhackme, icon: FaShieldAlt, label: 'TryHackMe' },
    { href: portfolioData.socialLinks.email, icon: FaEnvelope, label: 'Email' },
  ];

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center pt-24 pb-16 overflow-hidden ${
        isDark ? 'bg-secondary' : 'bg-gray-50'
      }`}
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-10 xl:gap-16 items-center">
          <motion.div
            variants={itemVariants}
            className="relative order-1 lg:order-none flex justify-center lg:justify-start"
          >
            <div className="absolute -inset-4 max-w-[430px] sm:max-w-[500px] lg:max-w-[560px] mx-auto lg:mx-0 rounded-[2rem] border border-primary/20 bg-primary/5 blur-sm" />
            <div className="relative w-full max-w-[390px] sm:max-w-[470px] lg:max-w-[540px]">
              <div className="absolute -top-4 -left-4 h-24 w-24 border-l-4 border-t-4 border-primary rounded-tl-[2rem]" />
              <div className="absolute -bottom-4 -right-4 h-24 w-24 border-r-4 border-b-4 border-accent rounded-br-[2rem]" />
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/40 bg-black/30 shadow-2xl shadow-primary/20">
                <img
                  src={portfolioData.profileImage || profileImage}
                  alt={portfolioData.name}
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-primary">Portfolio</p>
                  <p className="mt-2 text-2xl font-bold text-white">{portfolioData.name}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center lg:text-left order-2">
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl xl:text-8xl font-bold mb-6 text-white leading-none">
              {portfolioData.name}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-2xl md:text-4xl text-gray-200 mb-6 leading-tight">
              {selectedRole.title}
            </motion.p>

            <motion.p variants={itemVariants} className="max-w-3xl text-base md:text-lg text-gray-400 mb-8 leading-8 mx-auto lg:mx-0">
              {selectedRole.headline} {selectedRole.summary}
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`px-4 py-3 rounded-lg border text-sm font-bold transition ${
                    selectedRoleId === role.id
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                      : 'bg-black/20 text-gray-300 border-primary/20 hover:border-primary/60 hover:text-primary'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {selectedRole.strengths.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                  {skill}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary/40 text-primary bg-primary/5 hover:bg-primary/15 transition"
                >
                  <link.icon />
                  {link.label}
                </a>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href="#contact"
                className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/80 transition font-bold shadow-lg shadow-primary/20"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="px-8 py-4 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition font-bold"
              >
                View Projects
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
