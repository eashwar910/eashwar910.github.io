import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GraduationCap, Sprout, TreePine, Award, BookOpen, Code } from 'lucide-react';
import Layout from '@/components/Layout';

const Timeline: React.FC = () => {
  const timelineItems = [
    {
      date: "2024-01",
      type: "project",
      title: "Multi-Modal Crop Health Assessment",
      org: "[University Name] Research",
      description: "Started PhD-level research on combining computer vision with IoT sensors for comprehensive crop monitoring.",
      icon: TreePine,
      phase: "growth"
    },
    {
      date: "2023-09",
      type: "education",
      title: "Advanced Machine Learning",
      org: "[University Name]",
      description: "Specialized coursework in deep learning architectures, with focus on computer vision applications.",
      icon: BookOpen,
      phase: "growth"
    },
    {
      date: "2023-08",
      type: "project",
      title: "Automated Pest Detection System",
      org: "Research Publication",
      description: "Published research on cotton pest detection using YOLOv8, achieving 94% accuracy in field conditions.",
      icon: Award,
      phase: "growth"
    },
    {
      date: "2023-01",
      type: "education",
      title: "Computer Vision Fundamentals",
      org: "[University Name]",
      description: "Core coursework covering image processing, feature extraction, and classical ML approaches to vision.",
      icon: BookOpen,
      phase: "sprout"
    },
    {
      date: "2022-12",
      type: "project",
      title: "Soil Classification Project",
      org: "Independent Study",
      description: "Developed hyperspectral imaging system for soil type classification, achieving 92% accuracy across 12 soil types.",
      icon: Code,
      phase: "sprout"
    },
    {
      date: "2022-09",
      type: "education",
      title: "Data Structures & Algorithms",
      org: "[University Name]",
      description: "Fundamental computer science coursework with applications to agricultural data processing.",
      icon: BookOpen,
      phase: "sprout"
    },
    {
      date: "2022-08",
      type: "education",
      title: "Started Computer Science Degree",
      org: "[University Name]",
      description: "Began undergraduate studies with focus on AI applications in agriculture and sustainability.",
      icon: GraduationCap,
      phase: "seed"
    },
    {
      date: "2022-06",
      type: "education",
      title: "High School Graduation",
      org: "[High School Name]",
      description: "Graduated with honors, specializing in Mathematics and Science. First exposure to programming and data analysis.",
      icon: GraduationCap,
      phase: "seed"
    }
  ];

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'seed': return GraduationCap;
      case 'sprout': return Sprout;
      case 'growth': return TreePine;
      default: return GraduationCap;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'seed': return 'text-yellow-600 dark:text-yellow-400';
      case 'sprout': return 'text-green-600 dark:text-green-400';
      case 'growth': return 'text-green-700 dark:text-green-300';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Timeline</h1>
            <p className="text-lg text-muted-foreground">
              My journey from student to agricultural AI researcher
            </p>
          </div>

          {/* Growth Phases Legend */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium">Foundation</span>
              </div>
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium">Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-green-700 dark:text-green-300" />
                <span className="text-sm font-medium">Research</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-8">
              {timelineItems.map((item, index) => {
                const PhaseIcon = getPhaseIcon(item.phase);
                const ItemIcon = item.icon;
                
                return (
                  <div key={index} className="relative flex gap-6">
                    {/* Timeline marker */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 bg-background border-2 border-border rounded-full flex items-center justify-center">
                        <PhaseIcon className={`w-6 h-6 ${getPhaseColor(item.phase)}`} />
                      </div>
                      {/* Item type indicator */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <ItemIcon className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                              <CardDescription className="text-base font-medium">
                                {item.org}
                              </CardDescription>
                            </div>
                            <div className="text-sm text-muted-foreground font-mono">
                              {new Date(item.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short' 
                              })}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{item.description}</p>
                          
                          {/* Hover details for projects */}
                          {item.type === 'project' && (
                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground">
                                <strong>For Recruiters:</strong> This project demonstrates my ability to work independently, 
                                conduct rigorous research, and deliver measurable results within academic timelines.
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Future Goals */}
          <div className="mt-16">
            <Separator className="mb-8" />
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-dashed">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-green-600 dark:text-green-400" />
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Complete current research and submit to top-tier conference (ICCV/CVPR)
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Pursue PhD in Computer Vision for Agricultural Applications
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Open to Research Assistant and Internship opportunities in 2024
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Timeline;