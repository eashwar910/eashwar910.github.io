import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Clock, MessageCircle } from 'lucide-react';
import { siteContent } from '../data/content';

export function Contact() {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Interested in agricultural AI research collaboration, internship opportunities,
              or discussing innovative farming technologies? I'd love to hear from you.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <a
                      href={`mailto:${siteContent.personal.email}`}
                      className="text-lg font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {siteContent.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</div>
                    <a
                      href={siteContent.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Professional Profile
                    </a>
                  </div>
                </div>

                <div className="flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Github className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">GitHub</div>
                    <a
                      href={siteContent.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                    >
                      Code Portfolio
                    </a>
                  </div>
                </div>

                <div className="flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      Malaysia
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Direct Message</div>
                    <a
                      href="https://topmate.io/eashwar_siddha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      Shoot me a message on Topmate
                    </a>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Availability</div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {siteContent.personal.availability}
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Interest Note */}
              <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-center">
                  Research Interests
                </h3>
                <p className="text-green-700 dark:text-green-300 text-center max-w-2xl mx-auto">
                  Particularly interested in precision agriculture, computer vision applications
                  in farming, and sustainable agricultural technology solutions.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}