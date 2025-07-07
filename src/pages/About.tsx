
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, Award, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Happy Customers",
      description: "People who discovered their true potential"
    },
    {
      icon: Star,
      number: "15+",
      label: "Years Experience",
      description: "In Vedic numerology and cosmic sciences"
    },
    {
      icon: Award,
      number: "98%",
      label: "Accuracy Rate",
      description: "Customer satisfaction with our reports"
    },
    {
      icon: Heart,
      number: "50,000+",
      label: "Lives Transformed",
      description: "Through ancient numerological wisdom"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About VedicNumbers
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We bridge ancient Vedic wisdom with modern life, helping thousands discover their cosmic blueprint 
              and unlock their true potential through the sacred science of numerology.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-yellow-400 mb-2">{stat.label}</div>
                  <p className="text-sm text-gray-300">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2009 by renowned Vedic scholar Dr. Rajesh Sharma, VedicNumbers began as a small 
                  practice dedicated to preserving and sharing the ancient wisdom of numerical sciences. 
                  What started with handwritten reports for local community members has grown into a 
                  trusted platform serving thousands worldwide.
                </p>
                <p>
                  Our founder spent over two decades studying under traditional Vedic masters in India, 
                  learning the intricate calculations and interpretations that form the foundation of 
                  authentic numerological analysis. This deep knowledge, combined with modern technology, 
                  allows us to provide accurate, personalized insights to seekers around the globe.
                </p>
                <p>
                  Every report we create maintains the authenticity of traditional methods while being 
                  presented in a format that's relevant and actionable for modern life challenges.
                </p>
              </div>
            </div>
            
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-300">
                  To make the profound wisdom of Vedic numerology accessible to everyone, helping individuals 
                  understand their cosmic blueprint and make informed decisions that align with their true nature.
                </CardDescription>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold">Authenticity</h4>
                      <p className="text-gray-300 text-sm">Traditional methods preserved for modern times</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold">Accuracy</h4>
                      <p className="text-gray-300 text-sm">Precise calculations based on ancient formulas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold">Accessibility</h4>
                      <p className="text-gray-300 text-sm">Making ancient wisdom available to everyone</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Meet Our Experts</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">DS</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Dr. Rajesh Sharma</h3>
                  <p className="text-yellow-400 mb-2">Founder & Chief Numerologist</p>
                  <p className="text-gray-300 text-sm">25+ years of Vedic studies, Traditional lineage holder</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">AP</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Anita Patel</h3>
                  <p className="text-yellow-400 mb-2">Senior Numerologist</p>
                  <p className="text-gray-300 text-sm">15+ years experience, Relationship & Career specialist</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">MK</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Manoj Kumar</h3>
                  <p className="text-yellow-400 mb-2">Research Director</p>
                  <p className="text-gray-300 text-sm">20+ years in astrological sciences, Ancient text researcher</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 border-white/20 max-w-2xl mx-auto">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Discover Your Cosmic Blueprint?
                </h3>
                <p className="text-gray-300 mb-6">
                  Join thousands who have unlocked their potential through authentic Vedic numerology.
                </p>
                <Button 
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
                  onClick={() => navigate('/')}
                >
                  Get Your Report Today
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
