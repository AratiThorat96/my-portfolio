import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import portfolioData from '../data/portfolioData';
import { domainProfiles } from '../data/domainProfiles';

const normalizeProfile = (profile) => {
  if (!profile) return portfolioData;
  const roleResumes = profile.resumes?.length
    ? profile.resumes
    : domainProfiles.map((role) => ({ id: role.id, domain: role.domain, label: role.resumeLabel, href: role.resumeHref }));

  return {
    ...portfolioData,
    ...profile,
    name: profile.name || profile.fullName || portfolioData.name,
    introduction: profile.bio || profile.about || portfolioData.introduction,
    socialLinks: {
      ...portfolioData.socialLinks,
      ...(profile.socialLinks || {}),
      email: `mailto:${profile.email || portfolioData.email}`,
    },
    skills: profile.skills?.length ? profile.skills : portfolioData.skills,
    resumes: profile.resumeUrl
      ? [{ id: 'default', domain: 'Default', label: 'Default Resume', href: profile.resumeUrl }, ...roleResumes]
      : roleResumes,
  };
};

export const useProfileData = () => {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('/profile');
      return normalizeProfile(response.data.profile);
    },
    staleTime: 60 * 1000,
    retry: 1,
  });

  return data || portfolioData;
};

export default useProfileData;
