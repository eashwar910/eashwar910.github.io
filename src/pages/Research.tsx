import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, Users, Target, TrendingUp } from 'lucide-react';
import Layout from '@/components/Layout';

const Research: React.FC = () => {
  const currentResearch = {
    title: "Multi-Modal Crop Health Assessment Using Computer Vision and IoT Sensors",
    affiliation: "[University Name]",
    advisor: "Prof. [Lecturer Name]",
    summary: "Developing an integrated system that combines drone imagery, satellite data, and ground-based IoT sensors for comprehensive crop health monitoring and early disease detection.",
    objectives: [
      "Develop multi-modal fusion algorithms for crop health assessment",
      "Create real-time disease detection pipeline with 95%+ accuracy",
      "Deploy edge computing solution for farm-level implementation"
    ],
    roadmap: [
      { phase: "Literature Review", status: "completed", progress: 100 },
      { phase: "Data Collection", status: "completed", progress: 100 },
      { phase: "Baseline Models", status: "in-progress", progress: 75 },
      { phase: "Experiments", status: "in-progress", progress: 40 },
      { phase: "Results & Publication", status: "pending", progress: 0 }
    ],
    experiments: [
      { method: "RGB-only CNN", change: "Baseline", deltaMetric: "87.3% accuracy" },
      { method: "+ Multispectral", change: "Added NIR bands", deltaMetric: "+5.2% accuracy" },
      { method: "+ IoT Fusion", change: "Soil moisture integration", deltaMetric: "+2.8% accuracy" },
      { method: "+ Temporal", change: "Time series analysis", deltaMetric: "+1.9% accuracy" }
    ]
  };

  const pastProjects = [
    {
      title: "Automated Pest Detection in Cotton Fields",
      period: "Jan 2023 - Aug 2023",
      role: "Research Assistant",
      outcome: "Published in Agricultural Informatics Conference 2023"
    },
    {
      title: "Soil Classification Using Hyperspectral Imaging",
      period: "Sep 2022 - Dec 2022",
      role: "Independent Study",
      outcome: "Achieved 92% classification accuracy across 12 soil types"
    }
  ];

  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Research & Experience</h1>
            <p className="text-lg text-muted-foreground">
              Advancing agricultural technology through AI research and practical applications
            </p>
          </div>

          {/* Current Research */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Ongoing Research
                </Badge>
              </div>
              <CardTitle className="text-2xl">{currentResearch.title}</CardTitle>
              <CardDescription className="text-base">
                <div className="flex items-center gap-2 mt-2">
                  <Users className="w-4 h-4" />
                  {currentResearch.affiliation} • Under {currentResearch.advisor}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{currentResearch.summary}</p>

              {/* Objectives */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Research Objectives
                </h3>
                <ul className="space-y-2">
                  {currentResearch.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Roadmap */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Research Roadmap
                </h3>
                <div className="space-y-4">
                  {currentResearch.roadmap.map((milestone, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{milestone.phase}</span>
                        <Badge 
                          variant={
                            milestone.status === 'completed' ? 'default' : 
                            milestone.status === 'in-progress' ? 'secondary' : 'outline'
                          }
                          className="text-xs"
                        >
                          {milestone.status}
                        </Badge>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Experiments */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Ablation Studies
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Method</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentResearch.experiments.map((exp, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{exp.method}</TableCell>
                        <TableCell>{exp.change}</TableCell>
                        <TableCell>{exp.deltaMetric}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* What's Next */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What's Next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Complete temporal analysis experiments by March 2024</li>
                  <li>• Deploy pilot system on 3 partner farms for validation</li>
                  <li>• Submit findings to ICCV Agricultural Vision Workshop</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Past Research */}
          <Card>
            <CardHeader>
              <CardTitle>Previous Research Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastProjects.map((project, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-4">
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-muted-foreground">{project.period} • {project.role}</p>
                    <p className="text-sm mt-1">{project.outcome}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Research;