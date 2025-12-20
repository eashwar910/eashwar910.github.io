import React from 'react';
import { Hero } from '../components/Home/Hero';
import { ProjectCard } from '../components/Projects/ProjectCard';
import { siteContent } from '../data/content';
import { motion } from 'framer-motion';
import { ArrowRight, Microscope, Leaf, Droplet, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  const featuredProjects = siteContent.projects.slice(0, 3);

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

  const steps = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Field Data",
      description: "Collect high-resolution images and sensor data from agricultural fields"
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Labeling",
      description: "Expert-verified annotations and ground truth data preparation"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Model Training",
      description: "Deep learning architectures optimized for agricultural computer vision"
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: "Deployment",
      description: "Edge computing solutions for real-time field applications"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Showcase of agricultural AI projects with measurable impact on farming efficiency and sustainability.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/projects"
                className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
              >
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white mb-4">
              Ready to Collaborate?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              {siteContent.personal.availability}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get In Touch
              </Link>
              <a
                href={siteContent.personal.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}