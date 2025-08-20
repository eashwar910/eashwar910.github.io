import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Github, Linkedin, MapPin, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, redirect to mailto since we don't have a backend
    const subject = `Research Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:me@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact</h1>
            <p className="text-lg text-muted-foreground">
              Let's discuss research opportunities and agricultural AI innovations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get In Touch</CardTitle>
                  <CardDescription>
                    I'm always interested in discussing research opportunities, 
                    collaborations, and how AI can advance sustainable agriculture.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href="mailto:me@example.com" 
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        me@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <a 
                        href="https://linkedin.com/in/username" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        linkedin.com/in/username
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <a 
                        href="https://github.com/username" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        github.com/username
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        [University City], Open to Remote Work
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Availability</p>
                      <p className="text-sm text-muted-foreground">
                        Open to RA/Research Intern roles — Summer 2024 & Beyond
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
                <CardHeader>
                  <CardTitle>Research Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Computer Vision for Agriculture</li>
                    <li>• Precision Farming Technologies</li>
                    <li>• Multi-modal Sensor Fusion</li>
                    <li>• Edge Computing for IoT</li>
                    <li>• Sustainable AI Applications</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Reach out about research opportunities, collaborations, or any questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your research opportunity, collaboration idea, or question..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    This form will open your default email client. 
                    You can also email me directly at me@example.com
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Response Time Note */}
          <div className="mt-8 text-center">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Response Time:</strong> I typically respond to research inquiries within 24-48 hours. 
                  For urgent matters, please mention "URGENT" in your subject line.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;