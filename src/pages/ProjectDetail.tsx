import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, FileText, Calendar, Database, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { WorkflowDiagram } from '../components/SVG/WorkflowDiagrams';
import { siteContent } from '../data/content';

export function ProjectDetail() {
  const { id } = useParams();
  const project = siteContent.projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-green-600 dark:text-green-400 hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Back Navigation */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h1>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.year}
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {project.summary}
                </p>

                {/* Impact Statement */}
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
                  <div className="flex items-start">
                    <Target className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Impact</h3>
                      <p className="text-green-700 dark:text-green-300">{project.impact}</p>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      View Code
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Live Demo
                    </a>
                  )}
                  {project.links.paper && (
                    <a
                      href={project.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Dataset
                    </a>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    value !== 'N/A' && (
                      <div key={key} className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {value}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                          {key}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technology Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 font-medium rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Workflow Diagram */}
          {project.media && (
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">System Architecture</h2>
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
                <WorkflowDiagram
                  type={project.media.workflowSvg}
                  isInteractive={true}
                  size="large"
                />
              </div>
            </motion.div>
          )}

          {/* Dataset Information */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3" />
              Dataset & Methodology
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dataset Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Source:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{project.dataset.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Size:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{project.dataset.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Labeling:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{project.dataset.labeling}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notes</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.dataset.notes}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}