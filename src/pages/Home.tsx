import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Download, Mail, Leaf, Cpu, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const Home: React.FC = () => {
  const taglines = [
    "AI that helps crops thrive.",
    "From pixels to harvest: building intelligent agriculture.",
    "Computer Vision for plants, soil, and sustainable yields.",
    "Turning field data into field results.",
    "Learning systems for living systems."
  ];

  const featuredProjects = [
    {
      title: "Crop Disease Detection",
      description: "YOLOv8-based system for early disease identification",
      image: "/placeholder.svg",
      tags: ["Computer Vision", "PyTorch", "YOLOv8"],
      accuracy: "94.2%"
    },
    {
      title: "Soil Moisture Prediction",
      description: "ML model using satellite imagery for irrigation optimization",
      image: "/placeholder.svg",
      tags: ["Machine Learning", "Remote Sensing", "TensorFlow"],
      accuracy: "89.7%"
    },
    {
      title: "Yield Estimation System",
      description: "CNN-based crop yield prediction from drone imagery",
      image: "/placeholder.svg",
      tags: ["Deep Learning", "Drone Data", "Segmentation"],
      accuracy: "91.5%"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full flex items-center justify-center">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            [YOUR NAME]
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Computer Science & AI Student — AgTech Research
          </p>
          
          <p className="text-lg md:text-xl text-green-600 dark:text-green-400 mb-8 font-medium">
            {taglines[0]}
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Developing AI-powered solutions for sustainable agriculture through computer vision, 
            machine learning, and precision farming technologies. Currently researching crop 
            monitoring systems under [Lecturer Name] at [University Name].
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/static/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                View Resume
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <Badge variant="secondary" className="mr-2">Active Research</Badge>
              Working with Lecturer at [University Name] — Ongoing Research in Precision Agriculture
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground">
              AI solutions addressing real agricultural challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Accuracy: {project.accuracy}
                    </span>
                    <Button variant="ghost" size="sm">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/projects">
                View All Projects <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Home;