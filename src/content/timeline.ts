export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  place?: string;
  summary: string;
  detail: string;
  skills?: string[];
  /** GitHub repo URL. '' is a placeholder: nothing is shown until it is filled in. */
  repo?: string;
}

// Oldest first. Source: DESIGN.md section 6. Tag every personal claim FACT-CHECK.
export const timeline: TimelineItem[] = [
  {
    id: 'workshop',
    date: 'Age 12', // CONFIRM year (unknown). Workshop name and city also unknown: show none.
    title: 'Agrobotics workshop',
    summary: 'Sparked an interest in robotics and agriculture.', // FACT-CHECK
    detail: 'Participated in an agrobotics workshop where I used scratch to program an arduino that powered a fully automated greenhouse with automated lighting, watering moisture and pH sensors. That is where robotics and agriculture first got to me.', // FACT-CHECK
  },
  {
    id: 'year-10',
    date: 'May 2022',
    title: 'Year 10 (AISSE)',
    place: 'Srimathi Sundaravalli Memorial School, Chennai',
    summary: 'Completed the All India Secondary School Examination (AISSE) with a 95.2% aggregate.',
    detail: 'Completed Year 10 at Srimathi Sundaravalli Memorial School, Chennai, and passed the All India Secondary School Examination (AISSE) with a 95.2% aggregate across Mathematics, Science, Social Science, English and Tamil.',
  },
  {
    id: 'independence-site',
    date: 'Jan 2023',
    title: 'Web development competition',
    place: 'Competition',
    summary: "A static scroller website about India's journey towards independence.",
    detail: 'The site got our team into the regional qualifiers.',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'pocket-farmer',
    date: 'Aug to Oct 2023',
    title: 'Student intern (remote)',
    place: 'With Dr Ken Kahn, retired lecturer, University of Oxford',
    summary: 'A VGG16-based real-time rotten fruit detector.', // FACT-CHECK
    detail:
      'Built with a CNN and transfer learning. Project: Pocket Farmer. My first major ag-tech project, using VGG16 for image classification.', // FACT-CHECK
    skills: ['Python', 'Pandas', 'Computer vision', 'VGG16'],
    repo: 'https://github.com/eashwar910/PFarmer',
  },
  {
    id: 'velammal',
    date: 'June 2022 to May 2024',
    title: 'Year 12 (AISSCE)',
    place: 'The Velammal International School, Chennai',
    summary: 'Completed the All India Senior School Certificate Examination (AISSCE) with a 93.2% weighted average.', // FACT-CHECK
    detail:
      'Studied English, Mathematics, Physics, Chemistry and Computer Science for the AISSCE. Discovered coding here and chose computer science and AI over Agri-tech, while keeping the interest in agriculture.', // FACT-CHECK
    skills: ['Problem solving', 'Leadership', 'Teamwork', 'Project management'],
  },
  {
    id: 'unmc',
    date: 'Sept 2024 to present',
    title: 'BSc (Hons) Computer Science with Artificial Intelligence',
    place: 'University of Nottingham Malaysia',
    summary: 'First Class Honours in Year 1 and Year 2. Now in Year 3.', // FACT-CHECK
    detail:
      'Studying on the Semenyih campus in Malaysia. Year 1 built the foundation in core hardware and software: C, Java, Haskell, ARM Assembly, and hardware simulation with HDL. Year 2 built on image processing, software development and maintenance, data structures and algorithms, and AI methods, alongside core Computer Science modules.', // FACT-CHECK
    skills: [
      'C',
      'Java',
      'Haskell',
      'ARM Assembly',
      'Hardware simulation',
      'HDL',
      'JavaFX',
      'Data structures and algorithms',
      'Operating systems',
      'PyTorch',
      'Python',
      'TensorFlow',
    ],
  },
  {
    id: 'crm-website',
    date: 'Feb 2025',
    title: 'CRM website',
    place: 'University coursework',
    summary: 'A CRM website for a fictional robotics company, with role-based access.',
    detail: 'Part of the Databases and Web Development module. Project: Robotics Company CRM System.',
    skills: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    repo: '', // TODO: repo URL
  },
  {
    id: 'terminal-contacts',
    date: 'Feb 2025',
    title: 'Terminal contact management system',
    place: 'University coursework',
    summary: 'A terminal contact manager in C with permanent, user-specific storage.',
    detail: 'Built for the C Programming module, with user authentication and file-based persistence.',
    skills: ['C', 'Data structures'],
    repo: 'https://github.com/eashwar910/Contact_ManagementSystem',
  },
  {
    id: 'maze-solver',
    date: 'Mar 2025',
    title: 'Maze solver for search algorithm visualisation',
    place: 'Personal project',
    summary: 'A simple maze solver in Pygame that visualises various search algorithms.',
    detail: 'Project: Maze Algorithm Visualizer.',
    skills: ['Python', 'Pygame', 'Search algorithms'],
    repo: 'https://github.com/eashwar910/MazeSolver',
  },
  {
    id: 'webcam-paint',
    date: 'Jun 2025',
    title: 'WebCam Paint',
    place: 'Personal project',
    summary: 'A computer vision project, made while learning the basics of OpenCV and Python.',
    detail: 'A small project to get hands-on with OpenCV and Python.',
    skills: ['Python', 'OpenCV', 'Computer vision'],
    repo: '', // TODO: repo URL
  },
  {
    id: 'seed-research',
    date: 'July to Sept 2025',
    title: 'Student Research Intern',
    place: 'University of Nottingham Malaysia',
    summary: 'Measured radicle and plumule growth in germinating soybean seeds with a U-Net.', // FACT-CHECK
    detail:
      'A U-Net semantic segmentation pipeline to measure the radicle and plumule in germinating soybean seeds, for seed quality assurance. Project: Seed Germination Analyzer.', // FACT-CHECK
    skills: ['Python', 'U-Net', 'Image processing', 'Computer vision', 'YOLO', 'ResNet', 'Mask R-CNN'],
    repo: 'https://github.com/eashwar910/Soybean_Segmentation',
  },
  {
    id: 'tech-fest',
    date: 'Oct 2025',
    title: 'Publicity Officer, CS Tech Fest',
    place: 'Computer Science Society Publicity Team',
    summary: 'Publicity for the Computer Science Society tech festival.', // FACT-CHECK
    detail: 'Part of the Computer Science Society Publicity Team.', // FACT-CHECK
  },
  {
    id: 'tetris',
    date: 'Dec 2025',
    title: 'JavaFX Tetris clone',
    place: 'University coursework',
    summary: 'Refactored and improved a faulty, buggy Tetris clone built on JavaFX.',
    detail: 'Built for the Developing Maintainable Software module. Project: JavaFX Tetris Clone.',
    skills: ['JavaFX', 'Object-oriented design', 'Software architecture'],
    repo: 'https://github.com/eashwar910/DMS_Tetris',
  },
  {
    id: 'open-day',
    date: 'April 2026',
    title: 'First prize, Software Engineering Project open day',
    place: 'University of Nottingham Malaysia',
    summary: 'Farmer Buddy won first prize in the Best Project category, against 20+ other groups.',
    detail: 'Farmer Buddy won first prize in the Best Project category at the Software Engineering Project open day, against more than 20 other groups.',
    repo: '', // TODO: repo URL
  },
  {
    id: 'cs-society',
    date: 'May 2026 to present',
    title: 'Head of Technology, Computer Science Society',
    place: 'University of Nottingham Malaysia',
    summary: 'Digital initiatives, technical infrastructure, tech events and workshops.', // FACT-CHECK
    detail:
      'Leads the technology side of the society: its digital initiatives, infrastructure, events and workshops.', // FACT-CHECK
  },
  {
    id: 'agritix',
    date: 'Summer 2026, 3 months', // CONFIRM: resume says "June 2026 to present", but this was a three-month freelance summer.
    title: 'Freelance AI engineer',
    place: 'Agritix Sdn Bhd, Malaysia',
    summary: 'Built Farmer Buddy, then returned for a summer of software and AI engineering.', // FACT-CHECK
    detail:
      'Farmer Buddy is an all-in-one precision agriculture app. After building it, I returned the following summer as a freelance AI engineer for three months.', // FACT-CHECK
    skills: ['React', 'Agentic AI', 'Software architecture', 'Mobile app development', 'Vision API'],
    repo: '', // TODO: repo URL
  },
  {
    id: 'fyp',
    date: '2026/27',
    title: 'Final year project: Rice Fallow Radar (COMP3025)',
    place: 'University of Nottingham Malaysia',
    summary:
      'Forecasting when fallow rice fields in Odisha can be sown with a winter pulse. Early days, no results yet.', // FACT-CHECK
    detail:
      'Uses Sentinel-1 radar time series. Study districts are Bolangir and Baleswar in Odisha. No results yet.', // FACT-CHECK
    repo: 'https://github.com/eashwar910/rice-fallow-radar',
  },
];
