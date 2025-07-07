
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate form submission
    toast.success("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@vedicnumbers.com",
      description: "Get answers to your questions"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Speak with our numerology experts"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Spiritual Lane, Mystic City, MC 12345",
      description: "In-person consultations available"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-6PM EST",
      description: "Weekend support available"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about numerology or need help with your report? 
              We're here to guide you on your cosmic journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Send us a Message</CardTitle>
                <CardDescription className="text-gray-300">
                  Fill out the form below and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => updateFormData('subject', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 min-h-[120px]"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-lg">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-1">{info.title}</h3>
                        <p className="text-yellow-400 font-medium mb-1">{info.details}</p>
                        <p className="text-gray-300 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* FAQ Section */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">How accurate are your reports?</h4>
                    <p className="text-gray-300 text-sm">Our reports are based on authentic Vedic numerology principles with 98% customer satisfaction rate.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">How long does it take to receive my report?</h4>
                    <p className="text-gray-300 text-sm">Most reports are delivered within 24-48 hours after payment confirmation.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Do you offer refunds?</h4>
                    <p className="text-gray-300 text-sm">Yes, we offer a 30-day money-back guarantee if you're not satisfied with your report.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
