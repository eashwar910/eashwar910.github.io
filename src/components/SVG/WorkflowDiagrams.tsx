import React from 'react';
import { motion } from 'framer-motion';

interface WorkflowDiagramProps {
  type: string;
  isInteractive?: boolean;
  size?: 'small' | 'large';
}

export function WorkflowDiagram({ type, isInteractive = false, size = 'small' }: WorkflowDiagramProps) {
  const baseSize = size === 'small' ? 300 : 600;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const connectionVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  // Rotten Fruit / Vegetable Detector workflow
  if (type === 'crop-disease-workflow' || type === 'crop-disease-full-workflow') {
    return (
      <motion.svg
        width={baseSize}
        height={size === 'small' ? 200 : 400}
        viewBox="0 0 600 400"
        className="w-full h-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Connections */}
        <motion.path
          d="M 80 200 L 140 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          variants={connectionVariants}
          className="text-green-600 dark:text-green-400"
        />
        <motion.path
          d="M 200 200 L 260 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          variants={connectionVariants}
          className="text-green-600 dark:text-green-400"
        />
        <motion.path
          d="M 320 200 L 380 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          variants={connectionVariants}
          className="text-green-600 dark:text-green-400"
        />
        <motion.path
          d="M 440 200 L 500 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          variants={connectionVariants}
          className="text-green-600 dark:text-green-400"
        />

        {/* Nodes */}
        <motion.g variants={nodeVariants}>
          <circle cx="50" cy="200" r="25" className="fill-blue-100 dark:fill-blue-900 stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" />
          <text x="50" y="205" textAnchor="middle" className="text-xs fill-blue-800 dark:fill-blue-200 font-medium">Camera</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <circle cx="170" cy="200" r="25" className="fill-purple-100 dark:fill-purple-900 stroke-purple-600 dark:stroke-purple-400" strokeWidth="2" />
          <text x="170" y="205" textAnchor="middle" className="text-xs fill-purple-800 dark:fill-purple-200 font-medium">OpenCV</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <circle cx="290" cy="200" r="25" className="fill-green-100 dark:fill-green-900 stroke-green-600 dark:stroke-green-400" strokeWidth="2" />
          <text x="290" y="205" textAnchor="middle" className="text-xs fill-green-800 dark:fill-green-200 font-medium">YOLOv8</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <circle cx="410" cy="200" r="25" className="fill-orange-100 dark:fill-orange-900 stroke-orange-600 dark:stroke-orange-400" strokeWidth="2" />
          <text x="410" y="205" textAnchor="middle" className="text-xs fill-orange-800 dark:fill-orange-200 font-medium">PyTorch</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <circle cx="530" cy="200" r="25" className="fill-red-100 dark:fill-red-900 stroke-red-600 dark:stroke-red-400" strokeWidth="2" />
          <text x="530" y="205" textAnchor="middle" className="text-xs fill-red-800 dark:fill-red-200 font-medium">FastAPI</text>
        </motion.g>
      </motion.svg>
    );
  }

  // Seed Segmentation Workflow
  if (type === 'soil-analysis-workflow' || type === 'soil-analysis-full-workflow') {
    return (
      <motion.svg
        width={baseSize}
        height={size === 'small' ? 200 : 400}
        viewBox="0 0 600 400"
        className="w-full h-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Connections */}
        <motion.path
          d="M 80 200 L 140 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          variants={connectionVariants}
          className="text-green-600 dark:text-green-400"
        />
        <motion.path
          d="M 200 200 L 260 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          variants={connectionVariants}
          className="text-green-600 dark:text-green-400"
        />
        <motion.path
          d="M 320 200 L 380 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          variants={connectionVariants}
          className="text-green-600 dark:text-green-400"
        />
        <motion.path
          d="M 440 200 L 500 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          variants={connectionVariants}
          className="text-green-600 dark:text-green-400"
        />

        {/* Nodes */}
        <motion.g variants={nodeVariants}>
          <circle cx="50" cy="200" r="25" className="fill-blue-100 dark:fill-blue-900 stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" />
          <text x="50" y="205" textAnchor="middle" className="text-xs fill-blue-800 dark:fill-blue-200 font-medium">Image</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <circle cx="170" cy="200" r="25" className="fill-purple-100 dark:fill-purple-900 stroke-purple-600 dark:stroke-purple-400" strokeWidth="2" />
          <text x="170" y="205" textAnchor="middle" className="text-xs fill-purple-800 dark:fill-purple-200 font-medium">Masking</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <circle cx="290" cy="200" r="25" className="fill-green-100 dark:fill-green-900 stroke-green-600 dark:stroke-green-400" strokeWidth="2" />
          <text x="290" y="205" textAnchor="middle" className="text-xs fill-green-800 dark:fill-green-200 font-medium">U-Net</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <circle cx="410" cy="200" r="25" className="fill-orange-100 dark:fill-orange-900 stroke-orange-600 dark:stroke-orange-400" strokeWidth="2" />
          <text x="410" y="205" textAnchor="middle" className="text-xs fill-orange-800 dark:fill-orange-200 font-medium">Analysis</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <circle cx="530" cy="200" r="25" className="fill-red-100 dark:fill-red-900 stroke-red-600 dark:stroke-red-400" strokeWidth="2" />
          <text x="530" y="205" textAnchor="middle" className="text-xs fill-red-800 dark:fill-red-200 font-medium">Dash</text>
        </motion.g>

        {/* Labels for full workflow */}
        {size === 'large' && (
          <>
            <text x="50" y="160" textAnchor="middle" className="text-sm fill-current font-medium">Soybean Sprout</text>
            <text x="170" y="160" textAnchor="middle" className="text-sm fill-current font-medium">Augmentation</text>
            <text x="290" y="160" textAnchor="middle" className="text-sm fill-current font-medium">Semantic Segment</text>
            <text x="410" y="160" textAnchor="middle" className="text-sm fill-current font-medium">Germination Rate</text>
            <text x="530" y="160" textAnchor="middle" className="text-sm fill-current font-medium">Streamlit UI</text>
          </>
        )}
      </motion.svg>
    );
  }

  // OCR Handwriting Recognition Workflow
  if (type === 'yield-prediction-workflow' || type === 'yield-prediction-full-workflow') {
    return (
      <motion.svg
        width={baseSize}
        height={size === 'small' ? 200 : 400}
        viewBox="0 0 600 400"
        className="w-full h-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Define Arrowhead */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
          </marker>
        </defs>

        {/* Connections with Arrowheads */}
        <motion.line x1="85" y1="200" x2="135" y2="200" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" variants={connectionVariants} className="text-blue-500" />
        <motion.line x1="205" y1="200" x2="255" y2="200" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" variants={connectionVariants} className="text-blue-500" />
        <motion.line x1="325" y1="200" x2="375" y2="200" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" variants={connectionVariants} className="text-blue-500" />
        <motion.line x1="445" y1="200" x2="495" y2="200" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" variants={connectionVariants} className="text-blue-500" />

        {/* Square Nodes */}
        <motion.g variants={nodeVariants}>
          <rect x="25" y="175" width="60" height="50" rx="4" className="fill-slate-100 dark:fill-slate-800 stroke-slate-600 dark:stroke-slate-400" strokeWidth="2" />
          <text x="55" y="205" textAnchor="middle" className="text-[10px] fill-slate-800 dark:fill-slate-200 font-bold">IMAGE</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="145" y="175" width="60" height="50" rx="4" className="fill-indigo-100 dark:fill-indigo-900 stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" />
          <text x="175" y="205" textAnchor="middle" className="text-[10px] fill-indigo-800 dark:fill-indigo-200 font-bold">CNN</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="265" y="175" width="60" height="50" rx="4" className="fill-blue-100 dark:fill-blue-900 stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" />
          <text x="295" y="205" textAnchor="middle" className="text-[10px] fill-blue-800 dark:fill-blue-200 font-bold">MAP</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="385" y="175" width="60" height="50" rx="4" className="fill-cyan-100 dark:fill-cyan-900 stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="2" />
          <text x="415" y="205" textAnchor="middle" className="text-[10px] fill-cyan-800 dark:fill-cyan-200 font-bold">LSTM</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="505" y="175" width="60" height="50" rx="4" className="fill-teal-100 dark:fill-teal-900 stroke-teal-600 dark:stroke-teal-400" strokeWidth="2" />
          <text x="535" y="205" textAnchor="middle" className="text-[10px] fill-teal-800 dark:fill-teal-200 font-bold">CTC</text>
        </motion.g>

        {/* Labels for full workflow */}
        {size === 'large' && (
          <g className="fill-slate-500 dark:fill-slate-400 text-[11px] font-medium">
            <text x="55" y="160" textAnchor="middle">Input Text</text>
            <text x="175" y="160" textAnchor="middle">Feature Extractor</text>
            <text x="295" y="160" textAnchor="middle">Reshape Layer</text>
            <text x="415" y="160" textAnchor="middle">Sequence Model</text>
            <text x="535" y="160" textAnchor="middle">Decoding/Loss</text>
          </g>
        )}
      </motion.svg>
    );
  }

  // Maze Algorithm Visualizer Workflow
  if (type === 'maze-visualizer-workflow' || type === 'maze-visualizer-full-workflow') {
    return (
      <motion.svg
        width={baseSize}
        height={size === 'small' ? 200 : 400}
        viewBox="0 0 600 400"
        className="w-full h-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <defs>
          <marker id="maze-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
          </marker>
        </defs>

        {/* Thick Directional Arrows */}
        <motion.line x1="90" y1="200" x2="130" y2="200" stroke="currentColor" strokeWidth="3" markerEnd="url(#maze-arrow)" variants={connectionVariants} className="text-orange-500" />
        <motion.line x1="210" y1="200" x2="250" y2="200" stroke="currentColor" strokeWidth="3" markerEnd="url(#maze-arrow)" variants={connectionVariants} className="text-orange-500" />
        <motion.line x1="330" y1="200" x2="370" y2="200" stroke="currentColor" strokeWidth="3" markerEnd="url(#maze-arrow)" variants={connectionVariants} className="text-orange-500" />
        <motion.line x1="450" y1="200" x2="490" y2="200" stroke="currentColor" strokeWidth="3" markerEnd="url(#maze-arrow)" variants={connectionVariants} className="text-orange-500" />

        {/* Rectangular Nodes */}
        <motion.g variants={nodeVariants}>
          <rect x="10" y="170" width="80" height="60" className="fill-amber-50 dark:fill-amber-900/30 stroke-amber-500" strokeWidth="2" />
          <text x="50" y="205" textAnchor="middle" className="text-[10px] fill-amber-700 dark:fill-amber-200 font-black">DSU GEN</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="130" y="170" width="80" height="60" className="fill-orange-50 dark:fill-orange-900/30 stroke-orange-500" strokeWidth="2" />
          <text x="170" y="205" textAnchor="middle" className="text-[10px] fill-orange-700 dark:fill-orange-200 font-black">GRID SET</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="250" y="170" width="80" height="60" className="fill-yellow-50 dark:fill-yellow-900/30 stroke-yellow-500" strokeWidth="2" />
          <text x="290" y="205" textAnchor="middle" className="text-[10px] fill-yellow-700 dark:fill-yellow-200 font-black">ALGO INP</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="370" y="170" width="80" height="60" className="fill-red-50 dark:fill-red-900/30 stroke-red-500" strokeWidth="2" />
          <text x="410" y="205" textAnchor="middle" className="text-[10px] fill-red-700 dark:fill-red-200 font-black">SOLVER</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="490" y="170" width="80" height="60" className="fill-zinc-50 dark:fill-zinc-800 stroke-zinc-500" strokeWidth="2" />
          <text x="530" y="205" textAnchor="middle" className="text-[10px] fill-zinc-700 dark:fill-zinc-200 font-black">PYGAME</text>
        </motion.g>

        {/* Workflow Labels */}
        {size === 'large' && (
          <g className="fill-orange-600/80 dark:fill-orange-400/80 text-[12px] font-bold italic">
            <text x="50" y="155" textAnchor="middle">Maze Logic</text>
            <text x="170" y="155" textAnchor="middle">Cell Mapping</text>
            <text x="290" y="155" textAnchor="middle">BFS/DFS/A*</text>
            <text x="410" y="155" textAnchor="middle">Pathfinding</text>
            <text x="530" y="155" textAnchor="middle">Visualizer</text>
          </g>
        )}
      </motion.svg>
    );
  }


  // Terminal Contact Management System Workflow
  if (type === 'terminal-contact-workflow' || type === 'terminal-contact-full-workflow') {
    return (
      <motion.svg
        width={baseSize}
        height={size === 'small' ? 200 : 400}
        viewBox="0 0 600 400"
        className="w-full h-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <defs>
          <marker id="terminal-arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </marker>
        </defs>

        {/* Dashed Connecting Lines */}
        <motion.path d="M 90 200 L 130 200" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#terminal-arrow)" variants={connectionVariants} className="text-cyan-600" />
        <motion.path d="M 210 200 L 250 200" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#terminal-arrow)" variants={connectionVariants} className="text-cyan-600" />
        <motion.path d="M 330 200 L 370 200" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#terminal-arrow)" variants={connectionVariants} className="text-cyan-600" />
        <motion.path d="M 450 200 L 490 200" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#terminal-arrow)" variants={connectionVariants} className="text-cyan-600" />

        {/* Square Nodes with Rounded Corners */}
        <motion.g variants={nodeVariants}>
          <rect x="10" y="170" width="80" height="60" rx="8" className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-600" strokeWidth="2" />
          <text x="50" y="205" textAnchor="middle" className="text-[10px] fill-blue-700 dark:fill-blue-300 font-mono font-bold">AUTH</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="130" y="170" width="80" height="60" rx="8" className="fill-cyan-50 dark:fill-cyan-900/20 stroke-cyan-600" strokeWidth="2" />
          <text x="170" y="205" textAnchor="middle" className="text-[10px] fill-cyan-700 dark:fill-cyan-300 font-mono font-bold">MENU</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="250" y="170" width="80" height="60" rx="8" className="fill-sky-50 dark:fill-sky-900/20 stroke-sky-600" strokeWidth="2" />
          <text x="290" y="205" textAnchor="middle" className="text-[10px] fill-sky-700 dark:fill-sky-300 font-mono font-bold">CRUD</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="370" y="170" width="80" height="60" rx="8" className="fill-indigo-50 dark:fill-indigo-900/20 stroke-indigo-600" strokeWidth="2" />
          <text x="410" y="205" textAnchor="middle" className="text-[10px] fill-indigo-700 dark:fill-indigo-300 font-mono font-bold">QUERY</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="490" y="170" width="80" height="60" rx="8" className="fill-slate-100 dark:fill-slate-800 stroke-slate-600" strokeWidth="2" />
          <text x="530" y="205" textAnchor="middle" className="text-[10px] fill-slate-700 dark:fill-slate-300 font-mono font-bold">FILE_IO</text>
        </motion.g>

        {/* Labels for full workflow */}
        {size === 'large' && (
          <g className="fill-blue-900/60 dark:fill-blue-200/60 text-[11px] font-mono">
            <text x="50" y="155" textAnchor="middle">User Login</text>
            <text x="170" y="155" textAnchor="middle">Input Handler</text>
            <text x="290" y="155" textAnchor="middle">Add/Edit/Del</text>
            <text x="410" y="155" textAnchor="middle">Search/Sort</text>
            <text x="530" y="155" textAnchor="middle">Data Persist</text>
          </g>
        )}
      </motion.svg>
    );
  }

  // Robotics Company CRM System Workflow
  if (type === 'robotics-crm-workflow' || type === 'robotics-crm-full-workflow') {
    return (
      <motion.svg
        width={baseSize}
        height={size === 'small' ? 200 : 400}
        viewBox="0 0 600 400"
        className="w-full h-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <defs>
          <marker id="crm-arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <path d="M2,2 L8,5 L2,8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </marker>
        </defs>

        {/* Orthogonal Connecting Lines */}
        <motion.path d="M 80 200 L 140 200" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#crm-arrow)" variants={connectionVariants} className="text-emerald-500" />
        <motion.path d="M 200 200 L 260 200" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#crm-arrow)" variants={connectionVariants} className="text-emerald-500" />
        <motion.path d="M 320 200 L 380 200" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#crm-arrow)" variants={connectionVariants} className="text-emerald-500" />
        <motion.path d="M 440 200 L 500 200" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#crm-arrow)" variants={connectionVariants} className="text-emerald-500" />

        {/* Database-style Rectangular Nodes */}
        <motion.g variants={nodeVariants}>
          <rect x="20" y="170" width="60" height="60" className="fill-emerald-50 dark:fill-emerald-900/20 stroke-emerald-600" strokeWidth="2.5" />
          <text x="50" y="205" textAnchor="middle" className="text-[10px] fill-emerald-800 dark:fill-emerald-200 font-bold uppercase tracking-tighter">Leads</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="140" y="170" width="60" height="60" className="fill-green-50 dark:fill-green-900/20 stroke-green-600" strokeWidth="2.5" />
          <text x="170" y="205" textAnchor="middle" className="text-[10px] fill-green-800 dark:fill-green-200 font-bold uppercase tracking-tighter">Logs</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="260" y="170" width="60" height="60" className="fill-teal-50 dark:fill-teal-900/20 stroke-teal-600" strokeWidth="2.5" />
          <text x="290" y="205" textAnchor="middle" className="text-[10px] fill-teal-800 dark:fill-teal-200 font-bold uppercase tracking-tighter">Status</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="380" y="170" width="60" height="60" className="fill-cyan-50 dark:fill-cyan-900/20 stroke-cyan-600" strokeWidth="2.5" />
          <text x="410" y="205" textAnchor="middle" className="text-[10px] fill-cyan-800 dark:fill-cyan-200 font-bold uppercase tracking-tighter">Client</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="500" y="170" width="60" height="60" className="fill-slate-50 dark:fill-slate-800 stroke-slate-500" strokeWidth="2.5" />
          <text x="530" y="205" textAnchor="middle" className="text-[10px] fill-slate-700 dark:fill-slate-300 font-bold uppercase tracking-tighter">Admin</text>
        </motion.g>

        {/* Schema Relationship Labels */}
        {size === 'large' && (
          <g className="fill-emerald-900/70 dark:fill-emerald-100/70 text-[11px] font-semibold italic">
            <text x="50" y="155" textAnchor="middle">Lead Entry</text>
            <text x="170" y="155" textAnchor="middle">Interaction History</text>
            <text x="290" y="155" textAnchor="middle">Pipeline Logic</text>
            <text x="410" y="155" textAnchor="middle">Customer Data</text>
            <text x="530" y="155" textAnchor="middle">User Management</text>
          </g>
        )}
      </motion.svg>
    );


  }

  // JavaFX Tetris Clone Workflow
  if (type === 'tetris-clone-workflow' || type === 'tetris-clone-full-workflow') {
    return (
      <motion.svg
        width={baseSize}
        height={size === 'small' ? 200 : 400}
        viewBox="0 0 600 400"
        className="w-full h-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <defs>
          <marker id="tetris-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10" fill="none" stroke="currentColor" strokeWidth="2" />
          </marker>
        </defs>

        {/* Solid Connecting Lines */}
        <motion.path d="M 85 200 L 135 200" stroke="currentColor" strokeWidth="2.5" fill="none" markerEnd="url(#tetris-arrow)" variants={connectionVariants} className="text-purple-500" />
        <motion.path d="M 205 200 L 255 200" stroke="currentColor" strokeWidth="2.5" fill="none" markerEnd="url(#tetris-arrow)" variants={connectionVariants} className="text-purple-500" />
        <motion.path d="M 325 200 L 375 200" stroke="currentColor" strokeWidth="2.5" fill="none" markerEnd="url(#tetris-arrow)" variants={connectionVariants} className="text-purple-500" />
        <motion.path d="M 445 200 L 495 200" stroke="currentColor" strokeWidth="2.5" fill="none" markerEnd="url(#tetris-arrow)" variants={connectionVariants} className="text-purple-500" />

        {/* Thick Bordered Rectangular Nodes */}
        <motion.g variants={nodeVariants}>
          <rect x="25" y="170" width="60" height="60" rx="2" className="fill-purple-50 dark:fill-purple-900/20 stroke-purple-600" strokeWidth="3" />
          <text x="55" y="205" textAnchor="middle" className="text-[10px] fill-purple-800 dark:fill-purple-200 font-black">INPUT</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="145" y="170" width="60" height="60" rx="2" className="fill-fuchsia-50 dark:fill-fuchsia-900/20 stroke-fuchsia-600" strokeWidth="3" />
          <text x="175" y="205" textAnchor="middle" className="text-[10px] fill-fuchsia-800 dark:fill-fuchsia-200 font-black">LOOP</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="265" y="170" width="60" height="60" rx="2" className="fill-pink-50 dark:fill-pink-900/20 stroke-pink-600" strokeWidth="3" />
          <text x="295" y="205" textAnchor="middle" className="text-[10px] fill-pink-800 dark:fill-pink-200 font-black">STATE</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="385" y="170" width="60" height="60" rx="2" className="fill-rose-50 dark:fill-rose-900/20 stroke-rose-600" strokeWidth="3" />
          <text x="415" y="205" textAnchor="middle" className="text-[10px] fill-rose-800 dark:fill-rose-200 font-black">DRAW</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="505" y="170" width="60" height="60" rx="2" className="fill-slate-100 dark:fill-slate-800 stroke-slate-600" strokeWidth="3" />
          <text x="535" y="205" textAnchor="middle" className="text-[10px] fill-slate-700 dark:fill-slate-300 font-black">VIEW</text>
        </motion.g>

        {/* JavaFX Logic Labels */}
        {size === 'large' && (
          <g className="fill-purple-900/80 dark:fill-purple-200/80 text-[11px] font-black uppercase">
            <text x="55" y="155" textAnchor="middle">Key Events</text>
            <text x="175" y="155" textAnchor="middle">Controller</text>
            <text x="295" y="155" textAnchor="middle">Matrix Op</text>
            <text x="415" y="155" textAnchor="middle">Renderer</text>
            <text x="535" y="155" textAnchor="middle">JavaFX UI</text>
          </g>
        )}
      </motion.svg>
    );
  }

  // Default fallback
  return (
    <svg width={baseSize} height={200} viewBox="0 0 300 200" className="w-full h-auto">
      <rect x="50" y="75" width="50" height="50" rx="8" className="fill-gray-200 dark:fill-gray-700 stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
      <path d="M 100 100 L 140 100" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400" />
      <circle cx="170" cy="100" r="25" className="fill-blue-100 dark:fill-blue-900 stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" />
      <path d="M 195 100 L 235 100" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400" />
      <rect x="235" y="75" width="50" height="50" rx="8" className="fill-green-100 dark:fill-green-900 stroke-green-600 dark:stroke-green-400" strokeWidth="2" />
    </svg>
  );
}