import { useEffect, useState } from 'react';
import { domainProfiles, getDomainProfile } from '../data/domainProfiles';

const storageKey = 'selectedPortfolioRole';

export const useRolePreference = () => {
  const [selectedRoleId, setSelectedRoleId] = useState(() => localStorage.getItem(storageKey) || domainProfiles[0].id);

  useEffect(() => {
    localStorage.setItem(storageKey, selectedRoleId);
    window.dispatchEvent(new CustomEvent('portfolio-role-change', { detail: selectedRoleId }));
  }, [selectedRoleId]);

  return {
    selectedRoleId,
    selectedRole: getDomainProfile(selectedRoleId),
    setSelectedRoleId,
    roles: domainProfiles,
  };
};

export const useSyncedRole = () => {
  const [selectedRoleId, setSelectedRoleId] = useState(() => localStorage.getItem(storageKey) || domainProfiles[0].id);

  useEffect(() => {
    const handleChange = (event) => setSelectedRoleId(event.detail || localStorage.getItem(storageKey) || domainProfiles[0].id);
    window.addEventListener('portfolio-role-change', handleChange);
    window.addEventListener('storage', handleChange);
    return () => {
      window.removeEventListener('portfolio-role-change', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  return {
    selectedRoleId,
    selectedRole: getDomainProfile(selectedRoleId),
    roles: domainProfiles,
  };
};

export default useRolePreference;
