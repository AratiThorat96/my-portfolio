import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useDarkMode } from '../hooks/useDarkMode';
import { useSyncedRole } from '../hooks/useRolePreference';
import api from '../api/axios';

const domains = ['All', 'Full Stack Developer', 'Frontend Developer', 'App Developer', 'Java Developer', 'Cyber Security', 'Data Analyst', 'Other'];

const CertificationsSection = () => {
  const { ref, inView } = useScrollAnimation();
  const { isDark } = useDarkMode();
  const { selectedRole } = useSyncedRole();
  const [certificates, setCertificates] = useState([]);
  const [domain, setDomain] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDomain(selectedRole.domain);
  }, [selectedRole.domain]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await api.get('/certificates', {
          params: domain === 'All' ? {} : { domain },
        });
        setCertificates(response.data.certificates || []);
      } catch {
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [domain]);

  return (
    <section id="certifications" className={`py-20 ${isDark ? 'bg-secondary' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center text-primary"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Certifications
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

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading && certificates.length === 0 && (
            <div className="col-span-full text-center text-gray-400">Loading certifications...</div>
          )}
          {!loading && certificates.length === 0 && (
            <div className="col-span-full text-center text-gray-400">No certificates found.</div>
          )}

          {certificates.map((cert, idx) => (
            <motion.div
              key={cert._id || cert.title}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.08 }}
              className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition ${
                isDark ? 'bg-black/30' : 'bg-gray-50'
              }`}
            >
              <div className="h-44 overflow-hidden bg-gray-700">
                <img
                  src={cert.certificateImage || cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(cert.certificateImage || cert.image)}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary mb-2">{cert.title}</h3>
                <p className="text-gray-300 text-sm mb-1">{cert.organization || cert.provider}</p>
                <p className="text-gray-500 text-xs mb-4">
                  {new Date(cert.issueDate).toLocaleDateString()}
                </p>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition text-sm font-bold"
                  >
                    Verify Certificate
                  </a>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 z-[70] bg-black/80 p-4 flex items-center justify-center" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Certificate preview" className="max-w-5xl max-h-[90vh] rounded-lg shadow-2xl" />
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;
