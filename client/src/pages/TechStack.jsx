import React, { useEffect } from 'react';
import { FaDatabase, FaServer, FaReact, FaLock } from 'react-icons/fa';
import { useDarkMode } from '../hooks/useDarkMode';

const TechStackPage = () => {
  const { isDark } = useDarkMode();

  const stacks = [
    {
      icon: FaReact,
      title: 'Frontend',
      tech: ['React.js 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Axios'],
      description: 'Modern, performant frontend with smooth animations and state management'
    },
    {
      icon: FaServer,
      title: 'Backend',
      tech: ['Node.js', 'Express.js', 'CORS', 'Helmet', 'Middleware'],
      description: 'RESTful APIs with comprehensive error handling and security'
    },
    {
      icon: FaDatabase,
      title: 'Database',
      tech: ['MongoDB', 'MongoDB Atlas', 'Mongoose', 'Validation'],
      description: 'Scalable cloud database with schema validation'
    },
    {
      icon: FaLock,
      title: 'Security',
      tech: ['JWT', 'bcrypt', 'Environment Variables', 'Input Validation'],
      description: 'Secure authentication and data protection'
    },
  ];

  return (
    <div className={`min-h-screen py-20 ${isDark ? 'bg-secondary' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-16">Tech Stack</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {stacks.map((stack, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-lg shadow-lg ${isDark ? 'bg-black/30' : 'bg-white'}`}
            >
              <stack.icon className="text-4xl text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-4">{stack.title}</h2>
              <p className="text-gray-400 mb-6">{stack.description}</p>
              <div className="flex flex-wrap gap-2">
                {stack.tech.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackPage;
