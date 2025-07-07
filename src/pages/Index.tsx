
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Sparkles, Moon, Sun } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FormFlow from "@/components/FormFlow";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <FormFlow onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-3xl animate-pulse"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                Discover Your
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Destiny</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
                Unlock the ancient wisdom of Vedic numerology and discover the cosmic blueprint of your life through personalized, detailed reports.
              </p>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Get Your Personalized Numerology Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Why Choose Vedic Numerology?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <CardTitle className="text-white">Ancient Wisdom</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Based on thousands of years of Vedic knowledge and cosmic understanding of numbers and their influence on human life.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Moon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">Personalized Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Get detailed, personalized reports based on your exact birth details and cosmic numerical patterns.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Sun className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <CardTitle className="text-white">Life Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Discover your life path, career guidance, relationship compatibility, and auspicious timings for important decisions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-800/50 to-blue-800/50">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Unlock Your Cosmic Blueprint?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered their true potential through our authentic Vedic numerology reports.
          </p>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Your Journey Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
