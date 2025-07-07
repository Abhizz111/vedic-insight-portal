
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Clock, Home } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId, amount } = location.state || {};

  useEffect(() => {
    // If no payment data, redirect to pricing
    if (!paymentId) {
      navigate('/pricing');
    }
  }, [paymentId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-20 w-20 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-300">
              Thank you for your purchase
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Order Confirmation</CardTitle>
              <CardDescription className="text-gray-300">
                Your numerology report is being prepared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {paymentId && (
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Payment ID:</span>
                    <span className="text-white font-mono text-sm">{paymentId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Amount Paid:</span>
                    <span className="text-green-400 font-bold">₹{amount}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Mail className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Email Delivery</h3>
                    <p className="text-gray-300 text-sm">
                      Your detailed numerology report will be sent to your registered email address within 48 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <Clock className="h-6 w-6 text-orange-400 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Processing Time</h3>
                    <p className="text-gray-300 text-sm">
                      Our expert numerologists are preparing your personalized report. This usually takes 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
                <h3 className="text-white font-semibold mb-3">What's Included in Your Report:</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Complete Life Path Number Analysis</li>
                  <li>• Destiny Number Insights</li>
                  <li>• Soul Urge Number Reading</li>
                  <li>• Personality Number Decode</li>
                  <li>• Career & Relationship Guidance</li>
                  <li>• Lucky Numbers & Colors</li>
                  <li>• Comprehensive PDF Report</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                >
                  View Dashboard
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-gray-300 text-sm">
              Questions? Contact us at{' '}
              <a href="mailto:support@vedic.com" className="text-yellow-400 hover:text-yellow-300">
                support@vedic.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ThankYou;
