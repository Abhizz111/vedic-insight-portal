
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGetReport = async () => {
    if (!user) {
      toast.error('Please sign in to purchase a report');
      navigate('/signin');
      return;
    }

    setLoading(true);
    
    // Get Razorpay keys from localStorage
    const razorpayKeyId = localStorage.getItem('razorpay_key_id');
    const razorpayKeySecret = localStorage.getItem('razorpay_key_secret');
    
    if (!razorpayKeyId) {
      toast.error('Payment gateway not configured. Please contact support.');
      setLoading(false);
      return;
    }

    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: razorpayKeyId,
          amount: 19900, // ₹199 in paise
          currency: 'INR',
          name: 'VedicNumbers',
          description: 'Complete Numerology Report',
          image: '/favicon.ico',
          handler: function (response: any) {
            console.log('Payment successful:', response);
            toast.success('Payment successful! Redirecting to thank you page...');
            setTimeout(() => {
              navigate('/thank-you', { 
                state: { 
                  paymentId: response.razorpay_payment_id,
                  amount: 199 
                }
              });
            }, 1000);
          },
          prefill: {
            email: user.email,
          },
          theme: {
            color: '#f59e0b'
          },
          modal: {
            ondismiss: function() {
              setLoading(false);
              toast.info('Payment cancelled');
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        setLoading(false);
      };

      script.onerror = () => {
        toast.error('Failed to load payment gateway');
        setLoading(false);
      };
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Unlock Your Cosmic Blueprint
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get your complete numerology report with detailed insights into your life path, destiny, and personality
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Sparkles className="h-12 w-12 text-yellow-400" />
                </div>
                <CardTitle className="text-white text-2xl">Complete Report</CardTitle>
                <CardDescription className="text-gray-300">
                  Your comprehensive numerology analysis
                </CardDescription>
                <div className="text-4xl font-bold text-yellow-400 mt-4">
                  ₹199
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Life Path Number Analysis
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Destiny Number Insights
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Soul Urge Number Reading
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Personality Number Decode
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Detailed PDF Report
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Career & Relationship Guidance
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Lucky Numbers & Colors
                  </li>
                </ul>
                
                <Button 
                  onClick={handleGetReport}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white py-3 text-lg"
                >
                  {loading ? 'Processing...' : 'Get Your Report Now'}
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

export default Pricing;
