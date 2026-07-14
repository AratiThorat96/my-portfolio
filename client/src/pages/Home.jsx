import React, { useEffect } from 'react';
import {
  Navbar,
  Footer,
  HeroSection,
  AboutSection,
  ProjectsSection,
  CertificationsSection,
  DomainResumeSection,
  AchievementsSection,
  EducationSection,
  ContactSection,
} from '../components';
import api from '../api/axios';

const Home = () => {
  useEffect(() => {
    api.post('/profile/visit').catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CertificationsSection />
        <DomainResumeSection />
        <AchievementsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
