export const seedProfile = {
  fullName: 'Arati Thorat',
  title: 'Full Stack Web Developer (Entry-Level)',
  bio:
    'Entry-level Full Stack Web Developer with strong knowledge of MERN stack, REST APIs, authentication, database management, and software development principles.',
  email: 'thoratarati96@gmail.com',
  phone: '+91 9699369743',
  location: 'Kopargaon, Maharashtra',
  resumeUrl: '/resume/AratiThorat_FullStackWebDeveloperResume.pdf',
  socialLinks: {
    github: 'https://github.com/AratiThorat96',
    linkedin: 'https://www.linkedin.com/in/aratithorat',
    leetcode: 'https://leetcode.com/u/AratiThorat_96/',
    tryhackme: 'https://tryhackme.com/p/AratiThorat',
    twitter: '',
    instagram: '',
    portfolio: '',
  },
  skills: [
    {
      category: 'Programming Languages',
      items: ['JavaScript', 'Java', 'Python', 'PHP', 'C'],
    },
    {
      category: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Angular', 'TypeScript'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'PHP', 'JDBC', 'REST APIs'],
    },
    {
      category: 'Databases',
      items: ['MongoDB', 'MySQL', 'Firebase'],
    },
  ],
  education: [
    {
      institution: 'Sanjivani College of Engineering',
      degree: 'B.Tech',
      field: 'Information Technology',
      startYear: 2023,
      endYear: 2027,
    },
  ],
  about:
    'I enjoy building scalable, responsive, and user-friendly web applications and mobile apps while continuously improving my technical and problem-solving skills.',
};

export const seedProjects = [
  {
    _id: 'seed-project-1',
    title: 'Resume & Portfolio Builder',
    description:
      'Built a full-stack web application to generate resumes, cover letters, and portfolios using AI-powered content with JWT authentication, responsive UI, PDF generation, and Google Gemini API integration.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    liveLink: '',
    githubLink: 'https://github.com/AratiThorat96/AI-Resume-and-Portfolio-Builder',
    category: 'web',
    featured: true,
    order: 1,
    duration: 'Aug 2025 - Oct 2025',
  },
  {
    _id: 'seed-project-2',
    title: 'E-Commerce Website',
    description:
      'Developed a complete e-commerce platform with cart, checkout, order management, Google Authentication, Razorpay payment gateway, and admin dashboard.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    technologies: ['MERN Stack'],
    liveLink: '',
    githubLink: 'https://github.com/AratiThorat96/E-commerce-Web',
    category: 'web',
    featured: true,
    order: 2,
    duration: 'Jul 2025 - Oct 2025',
  },
  {
    _id: 'seed-project-3',
    title: 'Vehicle Tracking System',
    description:
      'Real-time vehicle tracking system with trip history, emergency SMS alerts, admin-user management, and live location tracking.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Google Maps API'],
    liveLink: '',
    githubLink: 'http://github.com/AratiThorat96/Vehicle-Tracking-System-with-Live-GPS-Alerts-and-Admin-Panel',
    category: 'web',
    featured: true,
    order: 3,
    duration: 'Jan 2025 - May 2025',
  },
  {
    _id: 'seed-project-4',
    title: 'WhatsApp Clone',
    description:
      'Developed Android WhatsApp Clone with chat lists, status updates, call history, real-time messaging, and Firebase authentication.',
    image:
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Kotlin', 'Java', 'Firebase', 'Jetpack Compose'],
    liveLink: '',
    githubLink: 'https://github.com/AratiThorat96/WhatsApp-Clone',
    category: 'mobile',
    featured: true,
    order: 4,
    duration: 'Mobile App Project',
  },
  {
    _id: 'seed-project-5',
    title: 'Sai Fabrication App',
    description:
      'Built admin and client applications for fabrication design management with image upload, category-wise browsing, and Firebase integration.',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Kotlin', 'Firebase'],
    liveLink: '',
    githubLink: 'https://github.com/AratiThorat96/SaiFabrication_App',
    category: 'mobile',
    featured: true,
    order: 5,
    duration: 'Mobile App Project',
  },
];

export const seedCertificates = [
  {
    _id: 'seed-cert-1',
    title: 'Full Stack Web Development',
    provider: 'Udemy',
    issueDate: '2025-01-01',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    image:
      'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80',
    description: 'Certification in full stack web development.',
  },
  {
    _id: 'seed-cert-2',
    title: 'Artificial Intelligence Fundamentals',
    provider: 'IBM SkillsBuild',
    issueDate: '2025-01-01',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    description: 'Certification in artificial intelligence fundamentals.',
  },
  {
    _id: 'seed-cert-3',
    title: 'AWS Academy Cloud Foundations',
    provider: 'AWS',
    issueDate: '2025-01-01',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    description: 'Cloud foundations certification from AWS Academy.',
  },
  {
    _id: 'seed-cert-4',
    title: 'Programming in Java',
    provider: 'NPTEL',
    issueDate: '2025-01-01',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    description: 'Programming in Java certification.',
  },
  {
    _id: 'seed-cert-5',
    title: 'Python Programming',
    provider: 'NPTEL',
    issueDate: '2025-01-01',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
    description: 'Python programming certification.',
  },
  {
    _id: 'seed-cert-6',
    title: 'Android Development',
    provider: 'LinkedIn Learning',
    issueDate: '2025-01-01',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    image:
      'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=80',
    description: 'Android development certification.',
  },
];
