
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic Report",
      price: "$29.99",
      description: "Essential numerology insights",
      features: [
        "Life Path Number Analysis",
        "Destiny Number Calculation",
        "Lucky Numbers & Colors",
        "Basic Personality Traits",
        "PDF Report Delivery"
      ],
      popular: false
    },
    {
      name: "Complete Report",
      price: "$49.99",
      description: "Comprehensive cosmic blueprint",
      features: [
        "Everything in Basic Report",
        "Soul Urge Number Analysis",
        "Expression Number Insights",
        "Karmic Debt Numbers",
        "Career & Relationship Guidance",
        "Yearly Predictions",
        "Auspicious Dates & Times",
        "Personal Consultation Call"
      ],
      popular: true
    },
    {
      name: "Premium Report",
      price: "$79.99",
      description: "Complete life transformation guide",
      features: [
        "Everything in Complete Report",
        "Detailed Health Predictions",
        "Business & Investment Timing",
        "Marriage Compatibility Analysis",
        "Children's Numerology Insights",
        "Gemstone Recommendations",
        "Monthly Follow-up Reports",
        "Priority Customer Support"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Cosmic Journey
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Select the perfect numerology report to unlock your life's potential and discover your true destiny.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`bg-white/10 backdrop-blur-lg border-white/20 relative ${
                  plan.popular ? 'transform scale-105 border-yellow-400/50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-yellow-400">{plan.price}</span>
                  </div>
                  <CardDescription className="text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700' 
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    } text-white`}
                    onClick={() => navigate('/')}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get This Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Not sure which report is right for you?
              </h3>
              <p className="text-gray-300 mb-6">
                Our Complete Report is perfect for most people, offering comprehensive insights 
                into your numerological profile with practical guidance for life decisions.
              </p>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                onClick={() => navigate('/contact')}
              >
                Contact Us for Guidance
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
