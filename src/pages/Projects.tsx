import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExternalLink, Github, FileText, BarChart3 } from 'lucide-react';
import Layout from '@/components/Layout';

const Projects: React.FC = () => {
  const [taskFilter, setTaskFilter] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');

  const projects = [
    {
      id: 1,
      title: "Crop Disease Detection System",
      summary: "YOLOv8-based real-time disease identification in crop fields",
      impact: "Reduced crop loss by 23% in pilot farms through early detection",
      year: "2024",
      image: "/placeholder.svg",
      tags: ["classification", "plant disease", "computer vision"],
      techStack: ["YOLOv8", "PyTorch", "OpenCV", "FastAPI"],
      metrics: {
        accuracy: "94.2%",
        f1: "0.91",
        mAP: "0.89",
        datasetSize: "12,000 images"
      },
      links: {
        github: "https://github.com/username/crop-disease-detection",
        demo: "https://demo.example.com",
        paper: "https://paper.example.com"
      },
      dataset: {
        source: "PlantVillage + Custom Collection",
        labeling: "Manual annotation by agricultural experts",
        classes: "8 disease types across 3 crop varieties"
      }
    },
    {
      id: 2,
      title: "Soil Moisture Prediction",
      summary: "ML model using satellite imagery for irrigation optimization",
      impact: "Improved water efficiency by 31% in test regions",
      year: "2024",
      image: "/placeholder.svg",
      tags: ["regression", "soil", "remote sensing"],
      techStack: ["TensorFlow", "Sentinel-2", "NDVI", "Random Forest"],
      metrics: {
        accuracy: "89.7%",
        rmse: "0.08",
        r2: "0.85",
        datasetSize: "5,000 satellite images"
      },
      links: {
        github: "https://github.com/username/soil-moisture",
        demo: "https://demo.example.com"
      },
      dataset: {
        source: "Sentinel-2 ESA + Ground truth sensors",
        labeling: "IoT sensor validation",
        classes: "Continuous moisture levels (0-100%)"
      }
    },
    {
      id: 3,
      title: "Yield Estimation System",
      summary: "CNN-based crop yield prediction from drone imagery",
      impact: "Achieved 15% better yield forecasting accuracy",
      year: "2023",
      image: "/placeholder.svg",
      tags: ["segmentation", "yield", "drone data"],
      techStack: ["U-Net", "PyTorch", "Drone imagery", "GIS"],
      metrics: {
        accuracy: "91.5%",
        iou: "0.87",
        mae: "0.12 tons/hectare",
        datasetSize: "3,200 drone flights"
      },
      links: {
        github: "https://github.com/username/yield-estimation"
      },
      dataset: {
        source: "Custom drone surveys across 50 farms",
        labeling: "Post-harvest ground truth validation",
        classes: "5 yield categories per crop type"
      }
    }
  ];

  const filteredProjects = projects.filter(project => {
    const taskMatch = taskFilter === 'all' || project.tags.some(tag => tag === taskFilter);
    const domainMatch = domainFilter === 'all' || project.tags.some(tag => tag === domainFilter);
    return taskMatch && domainMatch;
  });

  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Projects</h1>
            <p className="text-lg text-muted-foreground">
              AI solutions for agricultural challenges with measurable impact
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Select value={taskFilter} onValueChange={setTaskFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by Task" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="classification">Classification</SelectItem>
                <SelectItem value="segmentation">Segmentation</SelectItem>
                <SelectItem value="regression">Regression</SelectItem>
              </SelectContent>
            </Select>

            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by Domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                <SelectItem value="soil">Soil</SelectItem>
                <SelectItem value="plant disease">Plant Disease</SelectItem>
                <SelectItem value="yield">Yield</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant="outline">{project.year}</Badge>
                  </div>
                  <CardDescription>{project.summary}</CardDescription>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Impact: {project.impact}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Tech Stack */}
                    <div>
                      <p className="text-sm font-medium mb-2">Tech Stack:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="bg-muted/50 p-2 rounded">
                          <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                          <p className="font-medium">{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-2">
                      {project.links.github && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.links.demo && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.links.paper && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.links.paper} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4 mr-1" />
                            Paper
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects match the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;