// Chapter copy (DESIGN.md section 2). Component code only renders this.
// Tags: FACT-CHECK = a personal claim to verify; ADD MEMORY = a spot where a real memory would land better; CONFIRM = default chosen, see ROADMAP.md open items.
export interface Chapter {
  id: string;
  title: string;
  lines: string[];
}

export const chapters: Chapter[] = [
  {
    id: 'orbit',
    title: 'Orbit',
    lines: [
      'From up here, a farm is just a colour.',
      "I've spent the last few years learning to read what changes.", // FACT-CHECK
      'Scroll to land.',
    ],
  },
  {
    id: 'age-12',
    title: 'Age 12',
    lines: [
      'I was twelve when I walked into an agrobotics workshop.', // FACT-CHECK  // ADD MEMORY (year, name and city unknown: show none)
      "Machines that could work a field. That's where robotics and agriculture first got to me.", // FACT-CHECK
    ],
  },
  {
    id: 'the-detour',
    title: 'The detour',
    lines: [
      'The plan was an Agri-tech degree.', // FACT-CHECK
      'Then high school handed me code. I chose Computer Science and AI, and kept the fields.', // FACT-CHECK
    ],
  },
  {
    id: 'age-16',
    title: 'Age 16',
    lines: [
      'At sixteen I started my first AI project, working remotely with a retired Oxford lecturer, Dr Ken Kahn.', // FACT-CHECK
      'A rotten fruit detector built on VGG16 and transfer learning.', // FACT-CHECK
    ],
  },
  {
    id: 'malaysia',
    title: 'Malaysia',
    lines: [
      'In 2024 I moved to Malaysia for Computer Science with AI at the University of Nottingham.', // FACT-CHECK
      'First Class Honours in years one and two.', // FACT-CHECK
    ],
  },
  {
    id: 'seeds',
    title: 'Seeds',
    lines: [
      'My first summer, I helped a lecturer measure germinating soybean seeds.', // FACT-CHECK  (lecturer stays unnamed)
      'A U-Net that finds the radicle in a microscope image, pixel by pixel.', // FACT-CHECK
    ],
  },
  {
    id: 'farmer-buddy',
    title: 'Farmer Buddy',
    lines: [
      'Then Agritix, an ag-tech company. The brief: keep farm workers safe using bodycam footage.', // FACT-CHECK
      'It grew into one app for the whole farm: an agronomist chatbot, AI-suggested irrigation timers, leaf disease detection, and IoT sensor data explained with XAI.', // FACT-CHECK
    ],
  },
  {
    id: 'back-for-more',
    title: 'Back for more',
    lines: [
      'The next summer I returned as an AI engineer. Three months of software and ML work, built for farmers and forest officers.', // FACT-CHECK  // CONFIRM Agritix dates: default "Summer 2026, 3 months"
    ],
  },
  {
    id: 'community',
    title: 'Community',
    lines: [
      "Off the clock, I'm Head of Tech for the Computer Science Society: infrastructure, events, workshops.", // FACT-CHECK
    ],
  },
  {
    id: 'now-odisha',
    title: 'Now: Odisha',
    lines: [
      "Now, my final-year project. About 11.65 million hectares of India's rice land sits fallow after harvest.", // FACT-CHECK
      "I'm using Sentinel-1 radar time series to forecast harvest dates, so farmers and farmer groups in Odisha know when a winter pulse can go in.", // FACT-CHECK
      'Early days. No results yet.',
    ],
  },
  {
    id: 'home',
    title: 'Home',
    lines: ['And this is where it started.', 'Welcome to Chennai. Look around.'],
  },
];

/** Chapter 4 pin: where the camera points on arriving in Malaysia. */
export const campusPin = { name: 'University of Nottingham Malaysia', lon: 101.8736, lat: 2.945 };

/** Study districts for the chapter 9 overlay. Decorative pins, not data. */
export const odishaPins = [
  { name: 'Bolangir', lon: 83.49, lat: 20.72 },
  { name: 'Baleswar', lon: 86.93, lat: 21.49 },
];
