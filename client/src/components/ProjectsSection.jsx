import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useDarkMode } from '../hooks/useDarkMode';
import { useSyncedRole } from '../hooks/useRolePreference';
import api from '../api/axios';

const domains = ['All', 'Full Stack Developer', 'Frontend Developer', 'App Developer', 'Java Developer', 'Cyber Security', 'Data Analyst', 'Other'];

const ProjectModal = ({ project, onClose, isDark }) => {
  if (!project) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl ${
            isDark ? 'bg-secondary' : 'bg-white'
          }`}
        >
          <div className="relative h-72 bg-gray-800">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-3xl font-bold text-primary">{project.title}</h3>
                {project.duration && <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mt-2">{project.duration}</p>}
              </div>
              <div className="flex gap-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
                  >
                    <FaExternalLinkAlt />
                    Live
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition"
                  >
                    <FaGithub />
                    Code
                  </a>
                )}
              </div>
            </div>

            <p className="text-gray-300 leading-8 mb-6">{project.description}</p>

            {project.features?.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-bold text-white mb-3">Key Features</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feature) => (
                    <div key={feature} className="px-4 py-3 rounded-2xl bg-black/20 text-gray-200">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {(project.technologies || []).map((tech) => (
                <span key={tech} className="px-3 py-1 bg-primary/15 text-primary rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectsSection = () => {
  const { ref, inView } = useScrollAnimation();
  const { isDark } = useDarkMode();
  const { selectedRole } = useSyncedRole();
  const [projects, setProjects] = useState([]);
  const [domain, setDomain] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDomain(selectedRole.domain);
  }, [selectedRole.domain]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects', {
          params: domain === 'All' ? {} : { domain },
        });
        setProjects(response.data.projects || []);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [domain]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <>
      <section id="projects" className={`py-20 ${isDark ? 'bg-black/20' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center text-primary"
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Projects
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {domains.map((item) => (
              <button
                key={item}
                onClick={() => setDomain(item)}
                className={`px-4 py-2 rounded-lg border transition ${
                  domain === item ? 'bg-primary border-primary text-white' : 'border-primary/30 text-primary hover:bg-primary/10'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {loading && projects.length === 0 && (
              <div className="col-span-full text-center text-gray-400">Loading projects...</div>
            )}
            {!loading && projects.length === 0 && (
              <div className="col-span-full text-center text-gray-400">No projects found.</div>
            )}
            {projects.map((project, idx) => (
              <motion.div
                key={project._id || project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.08 }}
                className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition ${
                  isDark ? 'bg-secondary' : 'bg-white'
                }`}
              >
                <div className="h-52 overflow-hidden bg-gray-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                    {project.duration && <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mt-2">{project.duration}</p>}
                  </div>
                  <p className="text-gray-400 text-sm mb-4 leading-7">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {(project.technologies || []).slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary/15 text-primary text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 items-center">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-primary hover:text-accent transition font-semibold"
                    >
                      View Details
                    </button>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-accent transition"
                      >
                        <FaExternalLinkAlt /> Live
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-accent transition"
                      >
                        <FaGithub /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} isDark={isDark} />
    </>
  );
};

export default ProjectsSection;
