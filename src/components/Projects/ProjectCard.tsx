import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, FileText, Calendar, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { WorkflowDiagram } from '../SVG/WorkflowDiagrams';

interface Project {
  id: string;
  title: string;
  year: number;
  summary: string;
  impact: string;
  techStack: string[];
  metrics: {
    accuracy: string;
    f1: string;
    mAP: string;
    IoU: string;
  };
  media: {
    thumbnailSvg: string;
    gallery: string[];
    workflowSvg: string;
  } | null;
  links: {
    github: string;
    demo: string;
    paper: string;
  };
  tags: string[];
  isResearch?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Workflow Diagram or Fallback */}
      <div className="h-48 bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        {project.media ? (
          <WorkflowDiagram
            type={project.media.thumbnailSvg}
            isInteractive={false}
            size="small"
          />
        ) : (
          <div className="text-gray-400 dark:text-gray-600">
            <Code className="w-16 h-16 opacity-50" />
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              {project.isResearch && (
                <Link
                  to="/research"
                  className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)] hover:shadow-[0_0_15px_rgba(34,197,94,0.7)] transition-shadow duration-300 animate-pulse"
                >
                  RESEARCH
                </Link>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              {project.year}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {project.summary}
            </p>
          </div>
        </div>

        {/* Impact Statement */}
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-4">
          <p className="text-green-800 dark:text-green-200 text-sm font-medium">
            <span className="font-semibold">Impact:</span> {project.impact}
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {Object.entries(project.metrics).map(([key, value]) => (
            value !== 'N/A' && (
              <div key={key} className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  {key}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                +{project.techStack.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="View demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            {project.links.paper && (
              <a
                href={project.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="View paper"
              >
                <FileText className="w-5 h-5" />
              </a>
            )}
          </div>

          <Link
            to={`/projects/${project.id}`}
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}