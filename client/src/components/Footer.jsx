import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaShieldAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import portfolioData from '../data/portfolioData';

const Footer = () => {
  const { isDark } = useDarkMode();

  const socialLinks = [
    { icon: FaGithub, href: portfolioData.socialLinks.github, label: 'GitHub' },
    { icon: FaLinkedin, href: portfolioData.socialLinks.linkedin, label: 'LinkedIn' },
    { icon: SiLeetcode, href: portfolioData.socialLinks.leetcode, label: 'LeetCode' },
    { icon: FaShieldAlt, href: portfolioData.socialLinks.tryhackme, label: 'TryHackMe' },
    { icon: FaEnvelope, href: portfolioData.socialLinks.email, label: 'Email' },
  ];

  return (
    <footer className={`${isDark ? 'bg-secondary' : 'bg-gray-900'} text-white py-12 mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">{portfolioData.name}</h3>
            <p className="text-gray-400">{portfolioData.tagline}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#projects" className="hover:text-primary transition">Projects</a></li>
              <li><a href="#skills" className="hover:text-primary transition">Skills</a></li>
              <li><a href="#achievements" className="hover:text-primary transition">Achievements</a></li>
              <li><a href="#contact" className="hover:text-primary transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="hover:text-primary transition text-xl"
                  aria-label={link.label}
                >
                  <link.icon />
                </a>
              ))}
            </div>
            <Link
              to="/admin/login"
              className="inline-flex mt-6 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition"
            >
              Admin
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex justify-between items-center">
          <p className="text-gray-400">&copy; 2026 {portfolioData.name}. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 bg-primary hover:bg-primary/80 rounded-full transition"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
