import React from 'react';
import { motion } from 'framer-motion';

export function HeroAnimation() {
  const seedVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const sproutVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut", delay: 1 }
    }
  };

  const networkVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1, 
        ease: "easeOut", 
        delay: 2,
        staggerChildren: 0.1
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

  return (
    <div className="relative w-full max-w-md mx-auto h-64 flex items-center justify-center">
      <svg
        width="300"
        height="250"
        viewBox="0 0 300 250"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background gradient */}
        <defs>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(34 197 94 / 0.1)" />
            <stop offset="100%" stopColor="rgb(34 197 94 / 0)" />
          </radialGradient>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        <circle cx="150" cy="125" r="120" fill="url(#bgGradient)" />

        {/* Seed (starting point) */}
        <motion.g variants={seedVariants} initial="hidden" animate="visible">
          <ellipse 
            cx="150" 
            cy="180" 
            rx="6" 
            ry="4" 
            fill="url(#leafGradient)"
            className="drop-shadow-sm"
          />
        </motion.g>

        {/* Growing sprout */}
        <motion.g variants={sproutVariants} initial="hidden" animate="visible">
          {/* Main stem */}
          <motion.path
            d="M 150 180 Q 148 160 150 140 Q 152 120 150 100"
            stroke="url(#leafGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Left leaf */}
          <motion.path
            d="M 148 140 Q 135 135 130 145 Q 135 155 148 150"
            stroke="url(#leafGradient)"
            strokeWidth="2"
            fill="url(#leafGradient)"
            fillOpacity="0.7"
          />
          
          {/* Right leaf */}
          <motion.path
            d="M 152 140 Q 165 135 170 145 Q 165 155 152 150"
            stroke="url(#leafGradient)"
            strokeWidth="2"
            fill="url(#leafGradient)"
            fillOpacity="0.7"
          />
        </motion.g>

        {/* Network transformation */}
        <motion.g variants={networkVariants} initial="hidden" animate="visible">
          {/* Network connections */}
          <motion.g variants={nodeVariants}>
            <path d="M 120 80 L 150 100" stroke="url(#circuitGradient)" strokeWidth="2" opacity="0.6" strokeDasharray="3 3"/>
            <path d="M 180 80 L 150 100" stroke="url(#circuitGradient)" strokeWidth="2" opacity="0.6" strokeDasharray="3 3"/>
            <path d="M 150 100 L 120 120" stroke="url(#circuitGradient)" strokeWidth="2" opacity="0.6" strokeDasharray="3 3"/>
            <path d="M 150 100 L 180 120" stroke="url(#circuitGradient)" strokeWidth="2" opacity="0.6" strokeDasharray="3 3"/>
            <path d="M 120 80 L 180 80" stroke="url(#circuitGradient)" strokeWidth="2" opacity="0.6" strokeDasharray="3 3"/>
            <path d="M 120 120 L 180 120" stroke="url(#circuitGradient)" strokeWidth="2" opacity="0.6" strokeDasharray="3 3"/>
          </motion.g>

          {/* Network nodes */}
          <motion.g variants={nodeVariants}>
            <circle cx="120" cy="80" r="8" fill="url(#circuitGradient)" className="drop-shadow-sm"/>
            <circle cx="120" cy="80" r="4" fill="white" opacity="0.9"/>
          </motion.g>
          
          <motion.g variants={nodeVariants}>
            <circle cx="180" cy="80" r="8" fill="url(#circuitGradient)" className="drop-shadow-sm"/>
            <circle cx="180" cy="80" r="4" fill="white" opacity="0.9"/>
          </motion.g>
          
          <motion.g variants={nodeVariants}>
            <circle cx="150" cy="100" r="10" fill="url(#circuitGradient)" className="drop-shadow-sm"/>
            <circle cx="150" cy="100" r="5" fill="white" opacity="0.9"/>
          </motion.g>
          
          <motion.g variants={nodeVariants}>
            <circle cx="120" cy="120" r="8" fill="url(#circuitGradient)" className="drop-shadow-sm"/>
            <circle cx="120" cy="120" r="4" fill="white" opacity="0.9"/>
          </motion.g>
          
          <motion.g variants={nodeVariants}>
            <circle cx="180" cy="120" r="8" fill="url(#circuitGradient)" className="drop-shadow-sm"/>
            <circle cx="180" cy="120" r="4" fill="white" opacity="0.9"/>
          </motion.g>

          {/* Pulsing center node */}
          <motion.circle
            cx="150"
            cy="100"
            r="12"
            fill="none"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            opacity="0.5"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>

        {/* Floating data points */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={80 + (i * 28)}
            cy={50 + Math.sin(i) * 20}
            r="2"
            fill="url(#circuitGradient)"
            opacity="0.4"
            animate={{
              y: [0, -5, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2 + (i * 0.2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </svg>
    </div>
  );
}