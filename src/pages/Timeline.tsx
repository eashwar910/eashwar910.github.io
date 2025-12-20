import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, GraduationCap, Code, Briefcase } from 'lucide-react';
import { siteContent } from '../data/content';

export function Timeline() {
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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-6 h-6" />;
      case 'project':
        return <Code className="w-6 h-6" />;
      case 'work':
        return <Briefcase className="w-6 h-6" />;
      default:
        return <Calendar className="w-6 h-6" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'project':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'work':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    // Add this check at the top
    if (dateString.toLowerCase() === 'present' || dateString.toLowerCase() === 'ongoing') {
      return 'Ongoing';
    }

    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${monthNames[parseInt(month) - 1]} ${year}`;
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Timeline
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My journey through education and projects, showcasing growth from foundational learning
              to advanced agricultural AI research and development.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

            <div className="space-y-8">
              {siteContent.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex items-start"
                >
                  {/* Timeline dot */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${getIconColor(item.type)} border-4 border-white dark:border-gray-900 shadow-lg z-10`}>
                    {getIcon(item.type)}
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(item.date)}
                          </div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {item.org}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${item.type === 'education' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' :
                          item.type === 'project' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                            'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
                          }`}>
                          {item.type}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {item.skills && (
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Growth metaphor icons */}
            <div className="absolute -left-4 -top-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
              >
                <div className="w-3 h-3 bg-green-600 dark:bg-green-400 rounded-full"></div>
              </motion.div>
            </div>

            <div className="absolute -left-2 top-1/3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="w-6 h-6 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-green-700 dark:bg-green-300 rounded-full"></div>
              </motion.div>
            </div>

            <div className="absolute -left-6 bottom-8">
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="w-10 h-10 bg-green-300 dark:bg-green-700 rounded-full flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-green-800 dark:bg-green-200 rounded-full"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}