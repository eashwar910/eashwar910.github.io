import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroAnimation } from '../SVG/HeroAnimation';
import { siteContent } from '../../data/content';

export function Hero() {
  const [selectedTagline, setSelectedTagline] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900/20 -z-10" />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-200 dark:bg-green-800 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="block">{siteContent.personal.name}</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-gray-600 dark:text-gray-400 mt-2 font-medium">
                {siteContent.personal.role}
              </span>
            </h1>
          </motion.div>

          {/* Tagline selector */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
              {siteContent.taglines.map((tagline, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTagline(index)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedTagline === index
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <motion.h2
              key={selectedTagline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-6"
            >
              {siteContent.taglines[selectedTagline]}
            </motion.h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            {siteContent.hero.intro}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href={siteContent.personal.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold rounded-lg transition-colors group"
            >
              <Download className="w-5 h-5 mr-2" />
              View Resume
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-600 transition-colors group"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={itemVariants}
            className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-3 font-medium">
              Recent Research Project with
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {siteContent.personal.advisor}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500 block">
                  {siteContent.personal.university}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  Ongoing Research
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500 block">
                  Precision Agriculture AI
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center lg:justify-end"
        >
          <HeroAnimation />
        </motion.div>
      </div>
    </section>
  );
}