import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Target, FlaskConical, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { siteContent } from '../data/content';

export function Research() {
  const research = siteContent.research[0];

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

  const roadmapColors = {
    'Literature': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    'Dataset Sourcing': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
    'Proof of Concept': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
    'Main Development': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    'Results': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
  };

  const getRoadmapStatus = (phase: string, currentPhase: string) => {
    const phases = ['Literature', 'Dataset Sourcing', 'Proof of Concept', 'Main Development', 'Results'];
    const currentIndex = phases.indexOf(currentPhase);
    const phaseIndex = phases.indexOf(phase);

    if (phaseIndex < currentIndex) return 'completed';
    if (phaseIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Research & Experience
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Over Summer 2025, I started working on this research project. It presents a solution to seed distribution companies to reduce wastage of seed batches during quality checks by using computer vision to analyze the germination of seed batches with lesser error rates.
            </p>
          </motion.div>

          {/* Ongoing Research */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700 rounded-xl p-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <FlaskConical className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Ongoing Research
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {research.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {research.advisor}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {research.affiliation}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {research.summary}
                    </p>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Research Objectives
                      </h4>
                      <ul className="space-y-2">
                        {research.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Research Roadmap */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Research Roadmap
                      </h4>
                      <div className="space-y-3">
                        {research.roadmap.map((phase, index) => {
                          const status = getRoadmapStatus(phase, research.currentPhase);
                          return (
                            <div key={phase} className="flex items-center">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${status === 'completed' ? 'bg-green-600 text-white' :
                                status === 'current' ? 'bg-blue-600 text-white' :
                                  'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}>
                                {status === 'completed' ? '✓' : index + 1}
                              </div>
                              <div className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${roadmapColors[phase as keyof typeof roadmapColors] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}>
                                {phase}
                                {status === 'current' && (
                                  <Clock className="w-3 h-3 inline ml-1" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Current Status */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Current Phase: {research.currentPhase}
                      </h5>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Conducting experiments with different architectures and evaluating model performance across various agricultural scenarios.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experiments Table */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FlaskConical className="w-6 h-6 mr-3" />
              Experiment Results
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Method</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Change</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {research.experiments.map((experiment, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                        {experiment.name}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {experiment.change}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`font-semibold ${experiment.deltaMetric.includes('+')
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-blue-600 dark:text-blue-400'
                          }`}>
                          {experiment.deltaMetric}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What's Next?</h4>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Investigate attention mechanisms for improved feature extraction</li>
                <li>• Expand dataset with multi-seasonal agricultural imagery</li>
                <li>• Deploy pilot system for field testing and validation</li>
                <li>• Prepare findings for publication in agricultural AI journal</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}