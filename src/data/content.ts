export const siteContent = {
  personal: {
    name: "Eashwar Siddha",
    role: "Computer Science & AI Student — AgTech Research",
    email: "eashwarsiddha@gmail.com",
    linkedin: "https://linkedin.com/in/eash123",
    github: "https://github.com/eashwar910",
    university: "University Of Nottingham, Malaysia Campus",
    advisor: "Dr. Tissa Chandesa",
    resumeFile: "/static/resume.pdf",
    availability: "Open to RA/Research Intern roles — Summer 2026"
  },
  taglines: [
    "AI that helps crops thrive.",
    "From pixels to harvest: building intelligent agriculture.",
    "Computer Vision for plants, soil, and sustainable yields.",
    "Turning field data into field results.",
    "Learning systems for living systems."
  ],
  hero: {
    intro: "Developing computer vision and machine learning solutions to address agricultural challenges one at a time. "
  },
  projects: [
    {
      // rotten fruit 
      id: "crop-disease-detection",
      title: "Rotten Fruit / Vegetable Detector",
      year: 2023,
      summary: "Deep learning system for detection of rotten fruits and vegetables using smartphone imagery",
      impact: "Helped farmers to identify rotten fruits and vegetables in their farms",
      techStack: ["YOLOv8", "PyTorch", "OpenCV", "FastAPI", "Streamlit"],
      dataset: {
        source: "Kaggle Dataset",
        size: "13,000 images across 3 fruits",
        labeling: "Expert-verified bounding boxes and masks",
        notes: "Worked on this project during my student internship under Dr Ken Khan (University of Oxford) when I was in high school. "
      },
      metrics: {
        accuracy: "94.2%",
        f1: "92.8%",
        mAP: "89.5%",
        IoU: "87.3%"
      },
      media: {
        thumbnailSvg: "crop-disease-workflow",
        gallery: ["/img/crop-disease-1.jpg", "/img/crop-disease-2.jpg"],
        workflowSvg: "crop-disease-full-workflow"
      },
      links: {
        github: "https://github.com/eashwar910/PFarmer",
        demo: "https://crop-disease-demo.vercel.app",
        paper: "https://www.kaggle.com/datasets/sriramr/fruits-fresh-and-rotten-for-classification"
      },
      tags: ["detection", "agriculture", "disease", "python"]
    },

    // semantic seg
    {
      id: "seed-segmentation",
      title: "Semantic Segmentation of Seeds for Germination Analysis",
      year: 2025,
      summary: "U-Net based Semantic Segmentation Model for Germination Analysis by Seed Distribution Companies",
      impact: "Reduce wastage of seed batches due to inefficient germination analysis",
      techStack: ["U-Net", "PyTorch", "scikit-learn", "NumPy", "Matplotlib", "StreamLit"],
      dataset: {
        source: "Kaggle Dataset",
        size: "7000+ labelled images of soybean sprouts",
        labeling: "Semantic Masks on Seed Radicle and Seed",
        notes: "Worked on this project over the summer of 2025 during my research internship under Dr Tissa Chandesa (University of Nottingham)"
      },
      metrics: {
        accuracy: "N/A",
        f1: "N/A",
        mAP: "N/A",
        IoU: "N/A"
      },
      media: {
        thumbnailSvg: "soil-analysis-workflow",
        gallery: ["/img/soil-1.jpg", "/img/soil-2.jpg"],
        workflowSvg: "soil-analysis-full-workflow"
      },
      links: {
        github: "https://github.com/eashwar910/Soybean_Segmentation/blob/master/unet-tld.ipynb",
        demo: "https://soil-analysis-demo.vercel.app",
        paper: "https://www.kaggle.com/datasets/byunghyunban/congnamul"
      },
      tags: ["segmentation", "seeds", "python", "precision-ag", "Research"],
      isResearch: true
    },

    //ocr 
    {
      id: "ocr-handwriting",
      title: "OCR Handwriting Recognition",
      year: 2025,
      summary: "A deep learning-based Optical Character Recognition (OCR) system designed to recognize handwritten words from the IAM Dataset.",
      impact: "Implements a robust CRNN pipeline with word-level accuracy tracking through a custom Levenshtein-based callback.",
      techStack: ["TensorFlow", "Keras", "LSTM", "CNN", "OpenCV", "CTC Loss", "Python", "NumPy"],
      dataset: {
        source: "IAM Handwriting Database",
        size: "40,000 records processed",
        labeling: "Encoded character-level labels mapped to a 78-character vocabulary",
        notes: "Worked on this project over the summer of 2025 when I was bored and wanted to see if I could replicate the OCR keras library."
      },
      metrics: {
        accuracy: "76.4%",
        f1: "N/A",
        mAP: "N/A",
        IoU: "N/A"
      },
      media: {
        thumbnailSvg: "yield-prediction-workflow",
        gallery: ["/img/yield-1.jpg", "/img/yield-2.jpg"],
        workflowSvg: "yield-prediction-full-workflow"
      },
      links: {
        github: "https://github.com/eashwar910/OCRHandwriting-Recognition",
        demo: "",
        paper: "https://arxiv.org/placeholder"
      },
      tags: ["OCR", "Computer-Vision", "RNN", "Handwriting-Recognition"]
    },

    //maze
    {
      id: "maze-solving-visualizer",
      title: "Maze Algorithm Visualizer",
      year: 2025,
      summary: "A Python-based application using Pygame to visualize pathfinding algorithms within a grid-based maze generated via procedural algorithms.",
      impact: "Provides an interactive platform to compare the efficiency and traversal patterns of different pathfinding algorithms.",
      techStack: ["Python", "Pygame"],
      dataset: {
        "source": "Procedurally generated maze via Randomized Union-Find (DSU) logic",
        "size": "71x71 grid (MAZE_SIZE = 71)",
        "labeling": "N/A",
        "notes": "Worked on this project over Autumn 2024 when I was learning search algorithms so I can visualie them easier."
      },
      metrics: {
        accuracy: "N/A",
        f1: "N/A",
        mAP: "N/A",
        IoU: "N/A"
      },
      media: {
        thumbnailSvg: "maze-visualizer-workflow",
        gallery: ["/img/yield-1.jpg", "/img/yield-2.jpg"],
        workflowSvg: "maze-visualizer-full-workflow"
      },
      links: {
        github: "https://github.com/eashwar910/MazeSolver",
        demo: "",
        paper: ""
      },
      tags: ["Python", "Pygame", "Pathfinding", "Maze"]
    },

    // terminal
    {
      id: "terminal-contact-system",
      title: "Terminal Contact Management System",
      year: 2025,
      summary: "A C-based terminal application designed for secure contact management featuring user authentication and file-based data persistence.",
      impact: "Enables multi-user support with individual contact files, supporting full CRUD operations, advanced search, and attribute-based sorting.",
      techStack: ["C", "File Handling", "User Authentication", "Standard Library"],
      dataset: {
        source: "Local file system (.txt based persistent storage)",
        size: "Scalable based on user input records",
        labeling: "N/A",
        notes: "Worked on this for my C Programming Module as a coursework"
      },
      metrics: {
        accuracy: "N/A",
        f1: "N/A",
        mAP: "N/A",
        IoU: "N/A"
      },
      media: {
        thumbnailSvg: "terminal-contact-workflow",
        gallery: ["/img/contact-menu.jpg", "/img/contact-sort.jpg"],
        workflowSvg: "terminal-contact-full-workflow"
      },
      links: {
        github: "https://github.com/eashwar910/Contact_ManagementSystem",
        demo: "",
        paper: ""
      },
      tags: ["C-Programming", "CRUD", "Authentication", "System-Utility"]
    },

    // dbi
    {
      id: "robotics-crm-system",
      title: "Robotics Company CRM System",
      year: 2025,
      summary: "A relational database architecture for a Customer Relationship Management (CRM) system tailored for the robotics industry sales cycle.",
      impact: "Maps complex relationships between administrative users, leads, and established customers, including dedicated tracking for interaction methods and follow-up scheduling.",
      techStack: ["ERD", "Relational Database Design", "SQL Schema"],
      dataset: {
        source: "CRM Data Model (User, Customers, Leads, and Interaction Histories)",
        size: "N/A (Schema Design)",
        labeling: "N/A",
        notes: "Worked on this for my Databases and Web Development module as coursework"
      },
      metrics: {
        accuracy: "N/A",
        f1: "N/A",
        mAP: "N/A",
        IoU: "N/A"
      },
      media: {
        thumbnailSvg: "robotics-crm-workflow",
        gallery: ["/img/crm-erd-diagram.jpg"],
        workflowSvg: "robotics-crm-full-workflow"
      },
      links: {
        github: "",
        demo: "",
        paper: ""
      },
      tags: ["Database-Design", "CRM", "Robotics", "Relational-Models"]
    },

    // dms
    {
      id: "javafx-tetris-clone",
      title: "JavaFX Tetris Clone",
      year: 2025,
      summary: "A modular, object-oriented implementation of Tetris built with JavaFX, featuring automated game loops and a dedicated UI rendering engine.",
      impact: "Demonstrates advanced software design patterns including a decoupled input handling system, matrix-based rotation logic, and dynamic overlay management.",
      techStack: ["Java", "JavaFX", "Object-Oriented Design", "Matrix Operations"],
      dataset: {
        source: "Standard Tetromino sets (I, J, L, O, S, T, Z bricks)",
        size: "N/A (Game Logic)",
        labeling: "N/A",
        notes: "Worked on this clone for my Developing Maintainable Software module as coursework"
      },
      metrics: {
        accuracy: "N/A",
        f1: "N/A",
        mAP: "N/A",
        IoU: "N/A"
      },
      media: {
        thumbnailSvg: "tetris-clone-workflow",
        gallery: ["/img/tetris-gameplay.jpg", "/img/tetris-class-diagram.jpg"],
        workflowSvg: "tetris-clone-full-workflow"
      },
      links: {
        github: "https://github.com/eashwar910/DMS_Tetris",
        demo: "",
        paper: ""
      },
      tags: ["Game-Dev", "JavaFX", "OOD", "Software-Architecture"]
    }

  ],
  research: [
    {
      id: "seed-segmentation-research",
      title: "Semantic Segmentation of Seeds for Germination Analysis",
      affiliation: "University Of Nottingham, Malaysia Campus",
      advisor: "Dr. Tissa Chandesa",
      summary: "Developing a robust U-Net based semantic segmentation model to automate the analysis of seed germination rates, specifically focused on soybean sprouts for seed distribution companies.",
      objectives: [
        "Automate the detection of seed radicles and cotyledons",
        "Reduce manual counting time by 90% for large batches",
        "Achieve segmentation accuracy > 90% across diverse lighting conditions"
      ],
      roadmap: ["Literature", "Dataset Sourcing", "Proof of Concept", "Main Development", "Results"],
      currentPhase: "Proof of Concept",
      experiments: [
        { name: "Baseline U-Net", change: "Standard Architecture", deltaMetric: "46.4% IoU" },
        { name: "+ Data Augmentation", change: "Rotation, Flip, Scale", deltaMetric: "+5.1%" },
        { name: "+ Tversky Loss", change: "Handling Class Imbalance", deltaMetric: "+3.2%" },
        { name: "+ Attention Gates", change: "Focusing on small features", deltaMetric: "+1.0%" }
      ]
    }
  ],
  timeline: [
    {
      date: "Ongoing",
      type: "project",
      title: "Farmer Buddy App",
      org: "University Coursework",
      description: "Working with Agritix Sdn Bhd to develop a mobile application for farmers featuring an agronomist chatbot, a bodycam video streaming dashboard along with report generation.",
      skills: ["React", "Agentic AI", "Software Architecture", "Mobile App Development", "Vision API"]
    },
    {
      date: "2025-12",
      type: "project",
      title: "JavaFX Tetris Clone",
      org: "University Coursework",
      description: "Refactored and Improvised a very faulty and buggy source code of a Tetris Game clone built on JavaFX.",
      skills: ["JavaFX", "OOD", "Software Architecture"]
    },
    {
      date: "2025-09",
      type: "education",
      title: "Year 2 - BSc Computer Science with Artificial Intelligence",
      org: "University Of Nottingham, Malaysia",
      description: "Building on my core niches like Image Processing, Software Development and Maintenance, Data Strucutres and Algorithms and Artificial Intelligence Methods alongside Core Computer Science modules",
      skills: ["JavaFX", "Data Structures and Algorithms", "C", "Operating Systems", "PyTorch", "Python", "TensorFlow"]
    },
    {
      date: "2025-07",
      type: "work",
      title: "Research Internship",
      org: "Personal Research",
      description: "First Research Project on Computer Vision and Image Processing for Agricultural Implementation.",
      skills: ["Python", "UNet", "Image Processing", "Computer Vision", "YOLO", "ResNet", "Mask RCNN"]
    },
    {
      date: "2025-06",
      type: "project",
      title: "Web Cam Paint App",
      org: "Personal Project",
      description: "Worked on a very computer vision project while I was learning about the basics of OpenCV and Python",
      skills: ["Python", "OpenCV", "Computer Vision"]
    },
    {
      date: "2025-03",
      type: "project",
      title: "Maze Solver for Search Algo Visualisation",
      org: "Personal Project",
      description: "A Simple Maze Solver on pygame to visualize various search algorithms.",
      skills: ["Python", "pygame", "Search Algorithms"]
    },
    {
      date: "2025-02",
      type: "project",
      title: "CRM Website",
      org: "University Coursework",
      description: "A Simple CRM Website for a fictional Robotics Company with role based access.",
      skills: ["HTML", "CSS", "JS", "PHP"]
    },
    {
      date: "2025-02",
      type: "project",
      title: "Terminal Based Contact Management System",
      org: "University Coursework",
      description: "A Simple Terminal Based Contact Management System with permenant user specific memory on C",
      skills: ["C", "Data Structures"]
    },
    {
      date: "2024-09",
      type: "education",
      title: "Year 1 - BSc Computer Science with Artificial Intelligence",
      org: "University Of Nottingham, Malaysia",
      description: "Building my foundation in computer science dealing with the core hardware and software details. Learnt C, Java, Haskell, ARM Assembly, and Hardware Simulation using HDL",
      skills: ["C", "Java", "Haskell", "ARM Assembly", "Hardware Simulation", "HDL"]
    },
    {
      date: "2024-05",
      type: "education",
      title: "Graduated High School",
      org: "The Velammal International School, Chennai, India",
      description: "Graduated High School with a 93.2% Aggregate",
      skills: ["Problem Solving", "Leadership Skills", "Teamwork", "Project Management"]
    },
    {
      date: "2023-10",
      type: "project",
      title: "Rotten Fruit / Vegetable Detector",
      org: "Personal Research",
      description: "First major AgTech project using VGG16 for image classification",
      skills: ["Python", "Pandas", "Computer Vision", "VGG16"]
    },
    {
      date: "2023-01",
      type: "project",
      title: "Static Website for a Web Developement Competition",
      org: "Competition",
      description: "A simple static scroller website about India's Journey towards Independance, which got us into the regional qualifiers.",
      skills: ["HTML", "CSS", "JavaScript"]
    },
    {
      date: "2022-05",
      type: "education",
      title: "Year 10 - High School",
      org: "Srimathi Sundaravalli Memorial School, Chennai, India",
      description: "Completed Year 10 with a 95.2% Aggregate",
    },
  ]
};

export const skills = [
  { name: "Computer Vision", level: 90, category: "AI/ML" },
  { name: "Deep Learning", level: 85, category: "AI/ML" },
  { name: "PyTorch", level: 80, category: "Frameworks" },
  { name: "OpenCV", level: 85, category: "Libraries" },
  { name: "Python", level: 90, category: "Languages" },
  { name: "JavaScript", level: 75, category: "Languages" },
  { name: "React", level: 80, category: "Frontend" },
  { name: "FastAPI", level: 75, category: "Backend" },
  { name: "Docker", level: 70, category: "DevOps" },
  { name: "Git", level: 85, category: "Tools" }
];