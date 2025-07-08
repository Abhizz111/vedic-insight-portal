
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Sparkles, Moon, Sun, Users, Award, Clock, Shield } from "lucide-react";
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
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in leading-tight">
                Discover Your
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block md:inline"> Cosmic Destiny</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto animate-fade-in leading-relaxed px-4">
                Unlock the profound secrets of Vedic numerology and discover the cosmic blueprint that shapes your life's journey. Get personalized insights based on ancient wisdom that has guided souls for millennia.
              </p>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 px-6 md:py-6 md:px-10 rounded-full text-lg md:text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in w-full md:w-auto"
              >
                <Sparkles className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
                Get Your Personalized Numerology Report
              </Button>
              <p className="text-gray-400 mt-4 text-base md:text-lg px-4">✨ 10,000+ Lives Transformed • 🔮 Ancient Wisdom • 📊 Modern Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 md:py-12 px-4 bg-black/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 md:h-12 md:w-12 text-yellow-400 mb-2 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-white">10,000+</h3>
              <p className="text-gray-300 text-sm md:text-base">Happy Customers</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 md:h-12 md:w-12 text-yellow-400 mb-2 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-white">99.8%</h3>
              <p className="text-gray-300 text-sm md:text-base">Accuracy Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 md:h-12 md:w-12 text-yellow-400 mb-2 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-white">24 Hours</h3>
              <p className="text-gray-300 text-sm md:text-base">Report Delivery</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 md:h-12 md:w-12 text-yellow-400 mb-2 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-white">100%</h3>
              <p className="text-gray-300 text-sm md:text-base">Secure & Private</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-4 md:mb-6">
            Why Choose Vedic Numerology?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 text-center mb-12 md:mb-16 max-w-3xl mx-auto px-4">
            Experience the power of ancient Vedic wisdom combined with modern precision to unlock your life's deepest mysteries and potential.
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center pb-4">
                <Star className="h-12 w-12 md:h-16 md:w-16 text-yellow-400 mx-auto mb-4 md:mb-6" />
                <CardTitle className="text-white text-xl md:text-2xl mb-4">Ancient Wisdom</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center text-base md:text-lg leading-relaxed">
                  Rooted in 5000+ years of Vedic knowledge, our calculations use time-tested formulas that have guided countless souls through their spiritual and material journeys.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center pb-4">
                <Moon className="h-12 w-12 md:h-16 md:w-16 text-blue-400 mx-auto mb-4 md:mb-6" />
                <CardTitle className="text-white text-xl md:text-2xl mb-4">Personalized Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center text-base md:text-lg leading-relaxed">
                  Every report is uniquely crafted based on your exact birth details, revealing your personal cosmic signature and life path with unprecedented accuracy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center pb-4">
                <Sun className="h-12 w-12 md:h-16 md:w-16 text-orange-400 mx-auto mb-4 md:mb-6" />
                <CardTitle className="text-white text-xl md:text-2xl mb-4">Life Transformation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center text-base md:text-lg leading-relaxed">
                  Discover your destiny number, career path, relationship compatibility, and the most auspicious times for major life decisions and transformations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-purple-800/50 to-blue-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 md:mb-16">
            What Your Report Reveals
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Life Path Number</h3>
                  <p className="text-gray-300 text-sm md:text-base">Your core purpose and the journey you're meant to take in this lifetime.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <Moon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Destiny Number</h3>
                  <p className="text-gray-300 text-sm md:text-base">Your ultimate life goal and what you're destined to achieve.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <Sun className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Soul Urge Number</h3>
                  <p className="text-gray-300 text-sm md:text-base">Your deepest desires and what truly motivates your soul.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Personality Number</h3>
                  <p className="text-gray-300 text-sm md:text-base">How others perceive you and your outer personality traits.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Relationship Compatibility</h3>
                  <p className="text-gray-300 text-sm md:text-base">Your ideal partners and how to nurture lasting relationships.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-red-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Auspicious Timings</h3>
                  <p className="text-gray-300 text-sm md:text-base">Best times for important decisions, career moves, and life changes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 md:mb-16">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic text-sm md:text-base">
                  "The accuracy of my numerology report was mind-blowing! It revealed aspects of my personality I never knew existed and guided me towards my true calling."
                </p>
                <p className="text-white font-semibold text-sm md:text-base">- Sarah M., Entrepreneur</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic text-sm md:text-base">
                  "I was skeptical at first, but the insights from my report helped me make better career decisions and understand my relationships deeply."
                </p>
                <p className="text-white font-semibold text-sm md:text-base">- Raj P., Software Engineer</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic text-sm md:text-base">
                  "The timing predictions in my report were incredibly accurate. I followed the advice and landed my dream job during the recommended period!"
                </p>
                <p className="text-white font-semibold text-sm md:text-base">- Priya K., Marketing Manager</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-purple-800/50 to-blue-800/50">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Unlock Your Cosmic Blueprint?
          </h3>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-3xl mx-auto px-4">
            Join thousands of satisfied customers who have discovered their true potential through our authentic Vedic numerology reports. Your destiny awaits your discovery.
          </p>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 px-8 md:py-6 md:px-12 rounded-full text-lg md:text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full md:w-auto"
          >
            <Sparkles className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
            Start Your Cosmic Journey Now
          </Button>
          <p className="text-gray-400 mt-6 text-base md:text-lg px-4">💫 Instant Access • 🔒 100% Secure • 💰 Money-Back Guarantee</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
