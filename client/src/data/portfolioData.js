const portfolioData = {
  name: 'Arati Thorat',
  firstName: 'Arati',
  title: 'Full Stack Web Developer (Entry-Level)',
  tagline: 'Entry-level developer focused on scalable, user-centric web applications.',
  introduction:
    'I am an entry-level Full Stack Web Developer with strong knowledge of MERN stack, REST APIs, authentication, database management, and software development principles. I enjoy building scalable, responsive, and user-friendly web applications and mobile apps. I have worked on projects including E-Commerce platforms, Vehicle Tracking Systems, AI Resume Builder, and Android applications. My goal is to contribute to real-world software solutions while continuously improving my technical and problem-solving skills.',
  careerObjective:
    'To obtain an entry-level Software Developer position where I can apply my knowledge of OOP, Data Structures & Algorithms, SDLC, web development, and mobile application development to build efficient software solutions.',
  objective:
    'Entry-level Full Stack Web Developer seeking to build scalable and user-centric web applications using modern frontend and backend technologies. Strong foundation in MERN stack, REST APIs, authentication, and database management.',
  email: 'thoratarati96@gmail.com',
  phone: '+91-9699369743',
  location: 'Kopargaon, Maharashtra',
  socialLinks: {
    github: 'https://github.com/AratiThorat96',
    linkedin: 'https://www.linkedin.com/in/aratithorat',
    leetcode: 'https://leetcode.com/u/AratiThorat_96/',
    tryhackme: 'https://tryhackme.com/p/AratiThorat',
    email: 'mailto:thoratarati96@gmail.com',
  },
  resumes: [
    {
      label: 'Software Developer Resume',
      href: '/resume/AratiThorat_SoftwareDeveloperResume.pdf',
    },
    {
      label: 'Full Stack Resume',
      href: '/resume/AratiThorat_FullStackWebDeveloperResume.pdf',
    },
  ],
  about: [
    'I enjoy building practical web products that combine clean UI with reliable backend functionality.',
    'My recent work spans AI-assisted resume tooling, e-commerce workflows, and real-time tracking systems, with hands-on experience across React, Node.js, MongoDB, MySQL, JWT authentication, and REST APIs.',
  ],
  highlights: [
    {
      title: 'Core Stack',
      skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL'],
    },
    {
      title: 'Frontend',
      skills: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Responsive UI'],
    },
    {
      title: 'Backend & Tools',
      skills: ['REST APIs', 'JWT', 'Google OAuth', 'Git', 'Postman', 'Puppeteer'],
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: ['JavaScript', 'Java', 'Python', 'PHP', 'C'],
      percentage: 88,
    },
    {
      category: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Angular', 'TypeScript'],
      percentage: 90,
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'PHP', 'JDBC', 'REST APIs'],
      percentage: 86,
    },
    {
      category: 'Databases',
      items: ['MongoDB', 'MySQL', 'Firebase'],
      percentage: 84,
    },
    {
      category: 'App Development',
      items: ['Kotlin', 'Android Studio', 'Jetpack Compose'],
      percentage: 78,
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Eclipse', 'Bitbucket', 'Jira'],
      percentage: 85,
    },
  ],
  education: [
    {
      degree: 'B.Tech in Information Technology',
      institution: 'Sanjivani College of Engineering, Kopargaon',
      duration: '2023 - 2027',
      score: 'CGPA: 8.5/10',
    },
    {
      degree: 'HSC',
      institution: 'Shree Samarth Junior College',
      duration: '2023',
      score: 'Percentage: 68%',
    },
    {
      degree: 'SSC',
      institution: 'New High School, Ladgaon',
      duration: '2021',
      score: 'Percentage: 89.40%',
    },
  ],
  projects: [
    {
      _id: 'resume-portfolio-builder',
      title: 'Resume & Portfolio Builder',
      description:
        'Full-stack web application for generating resumes, cover letters, and portfolios with AI-powered content creation, JWT authentication, responsive UI, and PDF generation.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Puppeteer', 'Gemini API'],
      features: ['JWT authentication', 'Responsive UI', 'PDF generation', 'Google Gemini API integration'],
      liveLink: '',
      githubLink: 'https://github.com/AratiThorat96/AI-Resume-and-Portfolio-Builder',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      duration: 'Aug 2025 - Oct 2025',
    },
    {
      _id: 'ecommerce-website',
      title: 'E-Commerce Website',
      description:
        'Complete e-commerce platform with cart, checkout, order management, admin dashboard, Google Authentication, and Razorpay payment integration.',
      technologies: ['MERN Stack', 'React.js', 'Node.js', 'MongoDB', 'Google Auth', 'Razorpay'],
      features: ['Shopping cart', 'Checkout flow', 'Order management', 'Admin dashboard', 'Google Authentication', 'Razorpay payment gateway'],
      liveLink: '',
      githubLink: 'https://github.com/AratiThorat96/E-commerce-Web',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
      duration: 'Jul 2025 - Oct 2025',
    },
    {
      _id: 'vehicle-tracking-system',
      title: 'Vehicle Tracking System',
      description:
        'Web-based tracking system with real-time location monitoring, Google Maps integration, trip history, emergency SMS alerts, and role-based admin access.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Google Maps API'],
      features: ['Live location tracking', 'Trip history', 'Emergency SMS alerts', 'Admin-user management'],
      liveLink: '',
      githubLink: 'http://github.com/AratiThorat96/Vehicle-Tracking-System-with-Live-GPS-Alerts-and-Admin-Panel',
      image:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      duration: 'Jan 2025 - May 2025',
    },
    {
      _id: 'whatsapp-clone',
      title: 'WhatsApp Clone',
      description:
        'Android WhatsApp clone featuring chat lists, status updates, call history, real-time messaging, and Firebase authentication.',
      technologies: ['Kotlin', 'Java', 'Firebase', 'Jetpack Compose'],
      features: ['Chat lists', 'Status updates', 'Call history', 'Real-time messaging', 'Firebase authentication'],
      liveLink: '',
      githubLink: 'https://github.com/AratiThorat96/WhatsApp-Clone',
      image:
        'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80',
      duration: 'Mobile App Project',
    },
    {
      _id: 'sai-fabrication-app',
      title: 'Sai Fabrication App',
      description:
        'Admin and client applications for fabrication design management with image upload, category-wise browsing, and Firebase integration.',
      technologies: ['Kotlin', 'Firebase'],
      features: ['Admin and client apps', 'Image upload', 'Category-wise browsing', 'Firebase integration'],
      liveLink: '',
      githubLink: 'https://github.com/AratiThorat96/SaiFabrication_App',
      image:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
      duration: 'Mobile App Project',
    },
  ],
  certifications: [
    {
      _id: 'full-stack-udemy',
      title: 'Full Stack Web Development',
      provider: 'Udemy',
      issueDate: '2025-01-01',
      credentialUrl: '',
      image:
        'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80',
    },
    {
      _id: 'ai-fundamentals',
      title: 'Artificial Intelligence Fundamentals',
      provider: 'IBM SkillsBuild',
      issueDate: '2025-01-01',
      credentialUrl: '',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    },
    {
      _id: 'aws-cloud-foundations',
      title: 'AWS Academy Cloud Foundations',
      provider: 'Amazon Web Services',
      issueDate: '2025-01-01',
      credentialUrl: '',
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    },
    {
      _id: 'java-nptel',
      title: 'Programming in Java',
      provider: 'NPTEL',
      issueDate: '2025-01-01',
      credentialUrl: '',
      image:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    },
    {
      _id: 'python-nptel',
      title: 'Python Programming',
      provider: 'NPTEL',
      issueDate: '2025-01-01',
      credentialUrl: '',
      image:
        'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
    },
    {
      _id: 'android-linkedin-learning',
      title: 'Android Development',
      provider: 'LinkedIn Learning',
      issueDate: '2025-01-01',
      credentialUrl: '',
      image:
        'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=80',
    },
  ],
  achievements: [
    {
      title: 'TCS CodeVita Season 13',
      description: 'Cleared Round 1 and Round 2.',
    },
    {
      title: 'Unstop Talent Park Round 2',
      description: 'Runner Up.',
    },
    {
      title: 'IT and Analytics Challenge (EPIC 7.0)',
      description: 'Shortlisted achievement in analytics and problem-solving challenge participation.',
    },
  ],
};

export default portfolioData;
