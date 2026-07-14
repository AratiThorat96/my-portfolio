export const domainProfiles = [
  {
    id: 'full-stack',
    domain: 'Full Stack Developer',
    label: 'Full Stack',
    title: 'Full Stack Web Developer',
    resumeLabel: 'Full Stack Resume',
    resumeHref: '/resume/AratiThorat_FullStackWebDeveloperResume.pdf',
    headline: 'Building complete web products from polished UI to reliable APIs.',
    summary:
      'MERN stack, authentication, REST APIs, dashboards, MongoDB data modeling, and responsive product interfaces.',
    strengths: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
  },
  {
    id: 'frontend',
    domain: 'Frontend Developer',
    label: 'Frontend',
    title: 'Frontend Developer',
    resumeLabel: 'Frontend Resume',
    resumeHref: '/resume/AratiThorat_FrontendDeveloperResume.pdf',
    headline: 'Designing responsive, accessible, and high-polish user interfaces.',
    summary:
      'React, Tailwind CSS, component systems, animations, form UX, and mobile-first layouts focused on clarity.',
    strengths: ['React.js', 'JavaScript', 'Tailwind CSS', 'Responsive UI', 'Animations', 'UX'],
  },
  {
    id: 'app-java',
    domain: 'App Developer',
    label: 'App',
    title: 'App Developer',
    resumeLabel: 'App Developer Resume',
    resumeHref: '/resume/AratiThorat_SoftwareDeveloperResume.pdf',
    headline: 'Building practical Android apps with clean screens and useful workflows.',
    summary:
      'Android Studio, Kotlin, Jetpack Compose, Firebase authentication, real-time data, app navigation, and mobile UI flows.',
    strengths: ['Kotlin', 'Android Studio', 'Jetpack Compose', 'Firebase', 'Mobile UI', 'App Navigation'],
  },
  {
    id: 'java-developer',
    domain: 'Java Developer',
    label: 'Java',
    title: 'Java Developer',
    resumeLabel: 'Java Focus Resume',
    resumeHref: '/resume/JAVAFOCUS_RESUME.pdf',
    headline: 'Developing Java applications with strong OOP and problem-solving fundamentals.',
    summary:
      'Core Java, OOP, collections, exception handling, JDBC, SQL integration, DSA practice, debugging, and structured backend logic.',
    strengths: ['Core Java', 'OOP', 'Collections', 'JDBC', 'SQL', 'DSA'],
  },
  {
    id: 'cyber-security',
    domain: 'Cyber Security',
    label: 'Security',
    title: 'Cyber Security Enthusiast',
    resumeLabel: 'Cyber Security Resume',
    resumeHref: '/resume/AratiThorat_CyberSecurityResume.pdf',
    headline: 'Applying secure development thinking across apps, APIs, and data.',
    summary:
      'Authentication, secure API practices, validation, access control, threat awareness, and defensive coding basics.',
    strengths: ['JWT', 'Validation', 'Access Control', 'Secure APIs', 'OWASP Basics', 'Risk Review'],
  },
  {
    id: 'data-analyst',
    domain: 'Data Analyst',
    label: 'Data Analyst',
    title: 'Data Analyst',
    resumeLabel: 'Data Analyst Resume',
    resumeHref: '/resume/AratiThoratResume_Data Analyst.pdf',
    headline: 'Turning raw data into clear insights, dashboards, and decisions.',
    summary:
      'SQL, data cleaning, spreadsheet analysis, visualization thinking, reporting, and analytical problem solving.',
    strengths: ['SQL', 'Excel', 'Python', 'Data Cleaning', 'Dashboards', 'Reporting'],
  },
  {
    id: 'sde',
    domain: 'Other',
    label: 'SDE',
    title: 'Software Development Engineer',
    resumeLabel: 'SDE Resume',
    resumeHref: '/resume/ARATI_THORAT_SDEResume.pdf',
    headline: 'Solving software problems with fundamentals, clean code, and product sense.',
    summary:
      'Data structures, algorithms, OOP, SDLC, debugging, backend basics, and scalable software foundations.',
    strengths: ['DSA', 'OOP', 'JavaScript', 'Java', 'APIs', 'System Design Basics'],
  },
];

export const getDomainProfile = (id) => domainProfiles.find((profile) => profile.id === id) || domainProfiles[0];

export const getDomainById = (id) => getDomainProfile(id).domain;
