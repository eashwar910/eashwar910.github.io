export interface Project {
  id: string;
  name: string;
  context?: string;
  featured?: boolean;
  tags: string[];
  summary: string;
  points?: string[];
  stack?: string[];
  /** Where the data came from and how much of it. */
  dataset?: string;
  award?: string;
  links?: { label: string; href: string }[];
  note?: string;
  year?: number;
}

// Source: DESIGN.md section 6. Stack only where the source names one. Link only repos listed here. Never show results for Rice Fallow Radar.
export const projects: Project[] = [
  {
    id: 'rice-fallow-radar',
    name: 'Rice Fallow Radar',
    context: 'Final year project',
    featured: true,
    tags: ['Satellite', 'Research'],
    note: 'Early development. No results yet.',
    summary:
      "Forecasts when fields in India's rice fallows can be sown with a winter pulse such as lentil or black gram. About 11.65 million hectares (29% of India's monsoon rice land) lie fallow through winter.", // FACT-CHECK
    points: [
      'M1: harvest-date forecaster (7, 14 and 21 days ahead, with calibrated intervals) from Sentinel-1 radar and weather data.',
      'M2: cross-region transfer from labelled Tamil Nadu plots (SICKLE dataset) to Odisha.',
      'M3: sowing-window classifier (too wet, workable, too dry) using a soil-water balance.',
      'M4: winter-crop success ranking using positive-unlabelled learning, with checkable reason codes.',
      'Also: weekly Odia and English alert text (generated, not sent) and a Streamlit dashboard for district farm-advice centres.',
      'Study districts: Bolangir and Baleswar, Odisha.',
    ],
    stack: ['Python 3.12', 'uv', 'Google Earth Engine', 'earthaccess', 'Streamlit'],
    links: [{ label: 'GitHub repository', href: 'https://github.com/eashwar910/rice-fallow-radar' }],
  },
  {
    id: 'farmer-buddy',
    name: 'Farmer Buddy',
    context: 'With Agritix Sdn Bhd',
    featured: true,
    tags: ['Mobile', 'Computer vision'],
    summary:
      'An all-in-one precision agriculture mobile app. It began as an employee safety app using bodycam footage and grew into a utility app for farm owners and workers.', // FACT-CHECK
    points: [
      'AI agronomist chatbot.',
      'Irrigation timer with AI suggestions and alerts.',
      'Leaf and plant disease detection.',
      'IoT sensor data visualisation with an explainable-AI tool.',
      'Bodycam employee monitoring.',
    ],
    award: 'First Place, Best School Project Category', // CONFIRM wording: shown exactly as written on the resume.
    links: [{ label: 'GitHub repository', href: '' }], // TODO: repo URL (an empty href is hidden)
  },
  {
    id: 'seed-germination-analyzer',
    name: 'Seed Germination Analyzer',
    tags: ['Computer vision', 'Research'],
    summary:
      'U-Net semantic segmentation to quantify radicle and plumule emergence for soybean seed quality assurance. Built for seed distribution companies, to cut wasted seed batches caused by slow germination analysis.',
    points: [
      'Objectives: automate detection of seed radicles and cotyledons, cut manual counting time by 90% on large batches, and reach over 90% segmentation accuracy across lighting conditions.',
      'Experiments (IoU): baseline U-Net 46.4%. Data augmentation (rotation, flip, scale) +5.1%. Tversky loss for class imbalance +3.2%. Attention gates for small features +1.0%.',
      'Roadmap: literature, dataset sourcing, proof of concept, main development, results.',
      'Next: investigate attention mechanisms, expand the dataset with multi-seasonal imagery, pilot field testing, prepare findings for publication.',
    ],
    stack: ['U-Net', 'PyTorch', 'scikit-learn', 'NumPy', 'Matplotlib', 'Streamlit'],
    dataset: '7,000+ labelled soybean sprout images (Kaggle), with semantic masks on the seed and radicle.',
    year: 2025,
    links: [
      {
        label: 'GitHub notebook',
        href: 'https://github.com/eashwar910/Soybean_Segmentation/blob/master/unet-tld.ipynb',
      },
      { label: 'Dataset (Kaggle)', href: 'https://www.kaggle.com/datasets/byunghyunban/congnamul' },
    ],
  },
  {
    id: 'pocket-farmer',
    name: 'Pocket Farmer',
    tags: ['Computer vision'],
    summary: 'A VGG16 transfer-learning rotten fruit detector, real-time and image-based.',
    stack: ['VGG16', 'Transfer learning'],
    dataset: 'Kaggle fresh and rotten fruit dataset: about 13,000 images across 3 fruits.',
    year: 2023,
    points: ['Built during the remote student internship with Dr Ken Kahn, while still in high school.'],
    links: [
      { label: 'GitHub repository', href: 'https://github.com/eashwar910/PFarmer' },
      {
        label: 'Dataset (Kaggle)',
        href: 'https://www.kaggle.com/datasets/sriramr/fruits-fresh-and-rotten-for-classification',
      },
    ],
  },
  {
    id: 'pmy-segmentation',
    name: 'PMY Cell Segmentation Pipeline',
    context: 'Introduction to Image Processing (COMP2032) group coursework',
    tags: ['Computer vision', 'Coursework'],
    summary:
      'A classical image processing pipeline that segments pro-myelocyte (PMY) cells in microscope images and outputs each cell in colour on a white background.',
    points: [
      'Steps: LAB L-channel extraction, inverted Otsu thresholding, largest connected component, flood fill to close holes, 7x7 morphological closing, then GrabCut boundary refinement.',
      'Runs over the full dataset to write binary masks for evaluation, and over 9 selected easy, medium and hard images with every intermediate step saved.',
    ],
    stack: ['Python', 'OpenCV', 'NumPy', 'Otsu thresholding', 'GrabCut', 'Morphology'],
    dataset: 'Naturalize Dataset: 16,000 microscope cell images across classes including PMY, EO and ERB.',
    year: 2026,
    links: [{ label: 'GitHub repository', href: 'https://github.com/eashwar910/pmy-cell-segmentation' }],
  },
  {
    id: 'aegis-waf',
    name: 'Aegis WAF',
    tags: ['Security', 'LLM'],
    summary:
      'A web application firewall for FinTech agents, using a two-tier CaMeL (Carefully Managed LLM) architecture with NeMo Guardrails and dynamic risk scoring to stop prompt injection attacks.',
    stack: ['NeMo Guardrails', 'CaMeL', 'Python'],
    links: [{ label: 'GitHub repository', href: '' }], // TODO: repo URL (an empty href is hidden)
  },
  {
    id: 'ocr-handwriting',
    name: 'OCR Handwriting Recognition',
    tags: ['Computer vision'],
    summary:
      'Replicated the keras_ocr library with a custom CNN-CRNN trained on the IAM Handwriting Dataset, reaching 76% accuracy.', // FACT-CHECK
    stack: [
      'CNN-CRNN',
      'IAM Handwriting Dataset',
      'TensorFlow',
      'Keras',
      'LSTM',
      'CNN',
      'OpenCV',
      'CTC loss',
      'Python',
      'NumPy',
    ],
    dataset:
      'IAM Handwriting Database: 40,000 records processed, labels encoded to a 78-character vocabulary.',
    year: 2025,
    points: [
      'A CRNN pipeline with word-level accuracy tracked by a custom Levenshtein-based callback.',
      'Started over the summer as a side project, to see whether the keras_ocr library could be replicated.',
    ],
    links: [{ label: 'GitHub repository', href: 'https://github.com/eashwar910/OCRHandwriting-Recognition' }],
  },
  {
    id: 'ids-metaheuristics',
    name: 'Metaheuristic Benchmarking for IDS Classification',
    tags: ['Research'],
    summary:
      'Compared GA, PSO, ACO, Hybrid GA-PSO and NSGA-II for feature selection on an intrusion detection classifier, analysing accuracy, feature reduction and computational efficiency.',
    stack: ['GA', 'PSO', 'ACO', 'Hybrid GA-PSO', 'NSGA-II'],
    links: [{ label: 'GitHub repository', href: '' }], // TODO: repo URL (an empty href is hidden)
  },
  {
    id: 'maze-visualizer',
    name: 'Maze Algorithm Visualizer',
    context: 'Personal project',
    tags: ['Algorithms'],
    summary:
      'A Python and Pygame app that visualises pathfinding algorithms on a grid maze generated by a procedural algorithm.',
    points: [
      'An interactive way to compare the efficiency and traversal patterns of different pathfinding algorithms.',
      'Built while learning search algorithms, so they were easier to see.',
    ],
    stack: ['Python', 'Pygame'],
    dataset: 'Procedurally generated 71x71 maze, using randomized Union-Find (DSU) logic.',
    year: 2025,
    links: [{ label: 'GitHub repository', href: 'https://github.com/eashwar910/MazeSolver' }],
  },
  {
    id: 'webcam-paint',
    name: 'WebCam Paint',
    context: 'Personal project',
    tags: ['Computer vision'],
    summary:
      'A real-time paint app where the webcam is the canvas and finger gestures, tracked with MediaPipe, are the brush.',
    stack: ['Python', 'OpenCV', 'MediaPipe'],
    year: 2025,
    links: [{ label: 'GitHub repository', href: '' }], // TODO: repo URL (an empty href is hidden)
  },
  {
    id: 'srtf-visualizer',
    name: 'SRTF Visualizer',
    tags: ['Algorithms'],
    summary:
      'A command-line visualiser for Shortest Remaining Time First CPU scheduling, simulating process queues and printing a Gantt chart.',
    links: [{ label: 'GitHub repository', href: '' }], // TODO: repo URL (an empty href is hidden)
  },
  {
    id: 'terminal-contacts',
    name: 'Terminal Contact Management System',
    context: 'C Programming module coursework',
    tags: ['Coursework'],
    summary:
      'A C terminal application for contact management, with user authentication and file-based data persistence.',
    points: [
      'Multi-user support, with a separate contact file for each user.',
      'Full create, read, update and delete, advanced search, and sorting by attribute.',
    ],
    stack: ['C', 'File handling', 'User authentication', 'Standard library'],
    dataset: 'Local .txt files, scaling with the records the user enters.',
    year: 2025,
    links: [{ label: 'GitHub repository', href: 'https://github.com/eashwar910/Contact_ManagementSystem' }],
  },
  {
    id: 'robotics-crm',
    name: 'Robotics Company CRM System',
    context: 'Databases and Web Development module coursework',
    tags: ['Coursework', 'Web'],
    summary:
      'A relational database design for a customer relationship management system for the robotics industry sales cycle, with a role-based CRM website for a fictional robotics company.',
    points: [
      'Maps the relationships between admin users, leads and established customers.',
      'Tracks interaction methods and follow-up scheduling.',
    ],
    stack: ['ERD', 'Relational database design', 'SQL schema', 'HTML', 'CSS', 'JavaScript', 'PHP'],
    dataset: 'CRM data model: users, customers, leads and interaction histories (schema design).',
    year: 2025,
    links: [{ label: 'GitHub repository', href: '' }], // TODO: repo URL (an empty href is hidden)
  },
  {
    id: 'javafx-tetris',
    name: 'JavaFX Tetris Clone',
    context: 'Developing Maintainable Software module coursework',
    tags: ['Coursework', 'Games'],
    summary:
      'A modular, object-oriented Tetris built with JavaFX, with an automated game loop and a dedicated UI rendering engine.',
    points: [
      'Refactored and improved a buggy starting code base.',
      'A decoupled input handling system, matrix-based rotation logic and dynamic overlay management.',
    ],
    stack: ['Java', 'JavaFX', 'Object-oriented design', 'Matrix operations'],
    dataset: 'The standard tetromino set (I, J, L, O, S, T, Z).',
    year: 2025,
    links: [{ label: 'GitHub repository', href: 'https://github.com/eashwar910/DMS_Tetris' }],
  },
];
