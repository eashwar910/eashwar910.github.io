import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { siteContent } from '../data/content';

export function Resume() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Resume
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Download my complete resume or view the embedded version below. 
              Updated regularly with latest projects and research experience.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={siteContent.personal.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </a>
              
              <a
                href={siteContent.personal.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Open in New Tab
              </a>
            </div>
          </motion.div>

          {/* Resume Embed */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="aspect-[8.5/11] w-full">
              <iframe
                src={`${siteContent.personal.resumeFile}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-0"
                title="Resume PDF"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Fallback message */}
          <motion.div variants={itemVariants} className="text-center mt-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              If the PDF doesn't load above, please use the download button to view the resume.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">7+</div>
              <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Best Model Accuracy</div>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">1+</div>
              <div className="text-gray-600 dark:text-gray-400">Research Collaborations</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}