import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useDarkMode } from '../hooks/useDarkMode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useDarkMode();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Resumes', href: '#resumes' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 ${
        isDark ? 'bg-secondary/85' : 'bg-white/90'
      } backdrop-blur-md shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center text-primary">
            <span className="w-10 h-10 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center text-lg font-bold">
              A
            </span>
          </Link>

          <div className="hidden xl:flex items-center space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm hover:text-primary transition ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="xl:hidden flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className={`xl:hidden pb-4 space-y-3 ${isDark ? 'bg-secondary/95' : 'bg-white/95'}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block hover:text-primary transition ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
