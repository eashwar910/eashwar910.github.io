// Identity and contact (DESIGN.md section 6). No phone number anywhere on the site.
export const profile = {
  name: 'Eashwar Siddha',
  tagline: 'AI & Computer Science Undergraduate | Machine Learning Engineer | Ag-Tech Enthusiast',
  role: 'Computer Science & AI Student, AgTech Research',
  intro:
    'Developing computer vision and machine learning solutions to address agricultural challenges one at a time.',
  taglines: [
    'AI that helps crops thrive.',
    'From pixels to harvest: building intelligent agriculture.',
    'Computer Vision for plants, soil, and sustainable yields.',
    'Turning field data into field results.',
    'Learning systems for living systems.',
  ],
  // How a project goes, from the previous site.
  workflow: [
    { step: 'Field data', text: 'Collect high-resolution images and sensor data from agricultural fields.' },
    { step: 'Labeling', text: 'Expert-verified annotations and ground truth data preparation.' },
    {
      step: 'Model training',
      text: 'Deep learning architectures optimized for agricultural computer vision.',
    },
    { step: 'Deployment', text: 'Edge computing solutions for real-time field applications.' },
  ],
  location: 'From Chennai, Tamil Nadu. Studying in Malaysia.',
  // FACT-CHECK
  bio: [
    "I'm a Computer Science with AI undergraduate from Chennai, now in my third year at the University of Nottingham Malaysia.",
    'My work is reading change from imagery, in service of agriculture.',
  ],
  principle: 'I prefer fixing data quality to adding model layers.',
  availability: 'Open to research assistant roles, internships and agtech projects.',
  languages: ['English (fluent)', 'Tamil (native)', 'Saurashtra (native)'],
  interests: ['Music and guitar', 'Web and app development', 'Community volunteering', 'Hiking and camping'],
  photo: null as string | null, // CONFIRM: placeholder until a photo is supplied (put it in public/ and set the path)
  email: 'eashwarsiddha@gmail.com',
  github: 'https://github.com/eashwar910',
  linkedin: 'https://www.linkedin.com/in/eash123',
  // CONFIRM: null until a phone-free resume PDF is supplied (public/static/resume.pdf currently contains a phone number, so it is not linked).
  resumeUrl: null as string | null,
};
