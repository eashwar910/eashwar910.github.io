import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ExternalLink, Printer } from 'lucide-react';
import Layout from '@/components/Layout';

const Resume: React.FC = () => {
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Resume</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Computer Science & AI Student focused on Agricultural Technology
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/static/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </a>
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.print()}>
                <Printer className="w-5 h-5 mr-2" />
                Print Version
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  LinkedIn Profile
                </a>
              </Button>
            </div>
          </div>

          {/* PDF Viewer Placeholder */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Download className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Resume PDF Preview</p>
                  <p className="text-muted-foreground mb-4">
                    Click "Download PDF" above to view the full resume
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/static/resume.pdf" target="_blank" rel="noopener noreferrer">
                      Open PDF
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Computer Science student with AI/ML specialization</li>
                  <li>• 2+ years experience in agricultural computer vision</li>
                  <li>• Published research in crop disease detection</li>
                  <li>• Proficient in PyTorch, TensorFlow, OpenCV</li>
                  <li>• Experience with drone imagery and satellite data</li>
                  <li>• Strong background in deep learning and CNNs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-green-600 dark:text-green-400">
                      Open to Research Opportunities
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Research Assistant positions, Summer internships, 
                      and collaborative projects in AgTech/AI
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Timeline:</p>
                    <p className="text-sm text-muted-foreground">
                      Available for Summer 2024 internships and part-time 
                      research positions during academic year
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Location:</p>
                    <p className="text-sm text-muted-foreground">
                      Open to remote work and on-site opportunities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact CTA */}
          <div className="mt-8 text-center">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">
                  Interested in my research and experience?
                </h3>
                <p className="text-muted-foreground mb-4">
                  I'm always open to discussing research opportunities, 
                  collaborations, and how AI can advance sustainable agriculture.
                </p>
                <Button asChild>
                  <a href="mailto:me@example.com">
                    Get In Touch
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;