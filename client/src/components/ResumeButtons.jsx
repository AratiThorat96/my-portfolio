import React from 'react';
import api from '../api/axios';
import useProfileData from '../hooks/useProfileData';
import { useSyncedRole } from '../hooks/useRolePreference';

const ResumeButtons = ({ className = '', mode = 'all' }) => {
  const portfolioData = useProfileData();
  const { selectedRole } = useSyncedRole();
  const trackDownload = () => {
    api.post('/profile/resume-download').catch(() => {});
  };
  const selectedResume = portfolioData.resumes.find((resume) => resume.id === selectedRole.id || resume.domain === selectedRole.domain);
  const resumes = mode === 'selected'
    ? [{ label: selectedResume?.label || selectedRole.resumeLabel, href: selectedResume?.href || selectedRole.resumeHref }]
    : portfolioData.resumes;

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      {resumes.map((resume) => (
        <a
          key={resume.label}
          href={resume.href}
          download
          onClick={trackDownload}
          className="px-6 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition font-bold text-center"
        >
          {resume.label}
        </a>
      ))}
    </div>
  );
};

export default ResumeButtons;
