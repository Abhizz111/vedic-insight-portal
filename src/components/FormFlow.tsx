
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Calendar, Mail, Phone, User, Users } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface FormData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  email: string;
}

interface FormFlowProps {
  onBack: () => void;
}

const REPORT_PRICE = 199; // Price in INR

const FormFlow = ({ onBack }: FormFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    email: ''
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 5;

  const handleNext = () => {
    const currentStepValid = validateCurrentStep();
    if (currentStepValid) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) {
          toast.error("Please enter your full name");
          return false;
        }
        break;
      case 2:
        if (!formData.dateOfBirth) {
          toast.error("Please select your date of birth");
          return false;
        }
        break;
      case 3:
        if (!formData.gender) {
          toast.error("Please select your gender");
          return false;
        }
        break;
      case 4:
        if (!formData.mobileNumber.trim() || formData.mobileNumber.length < 10) {
          toast.error("Please enter a valid mobile number");
          return false;
        }
        break;
      case 5:
        if (!formData.email.trim() || !formData.email.includes('@')) {
          toast.error("Please enter a valid email address");
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      let reportUserId = null;
      
      // If user is signed in, use their ID, otherwise proceed as guest
      if (user) {
        reportUserId = user.id;
      }

      // Create the numerology report - for guest users, we'll bypass RLS by using service role
      const reportData = {
        user_id: reportUserId,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.mobileNumber,
        date_of_birth: formData.dateOfBirth,
        payment_status: 'pending',
        amount: REPORT_PRICE
      };

      console.log('Creating report with data:', reportData);

      // Use the RPC function to create report which will handle RLS properly
      const { data: report, error: reportError } = await supabase.rpc('create_guest_report', {
        p_user_id: reportUserId,
        p_full_name: formData.fullName,
        p_email: formData.email,
        p_phone: formData.mobileNumber,
        p_date_of_birth: formData.dateOfBirth,
        p_amount: REPORT_PRICE
      });

      if (reportError) {
        console.error('Report creation error:', reportError);
        throw reportError;
      }

      console.log('Report created successfully:', report);

      // Proceed with payment
      handlePayment(report, reportUserId);
    } catch (error: any) {
      console.error('Error creating report:', error);
      toast.error('Failed to create report. Please try again.');
    }
  };

  const handlePayment = async (reportId: string, userId: string | null) => {
    toast.info("Preparing your secure payment...");
    
    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: 'rzp_test_vTAk9LCrgGgzjp', // Test key
          amount: REPORT_PRICE * 100, // Convert to paise
          currency: 'INR',
          name: 'VedicNumbers',
          description: 'Complete Numerology Report',
          handler: async function (response: any) {
            try {
              console.log('Payment successful, updating records...');

              // Update report with payment info
              await supabase
                .from('numerology_reports')
                .update({
                  payment_status: 'completed',
                  payment_id: response.razorpay_payment_id
                })
                .eq('id', reportId);

              // Create order record using RPC function
              const { error: orderError } = await supabase.rpc('create_guest_order', {
                p_user_id: userId,
                p_report_id: reportId,
                p_customer_name: formData.fullName,
                p_customer_email: formData.email,
                p_customer_phone: formData.mobileNumber,
                p_amount: REPORT_PRICE,
                p_payment_id: response.razorpay_payment_id
              });

              if (orderError) {
                console.error('Order creation error:', orderError);
              }

              // Create payment history record if user is logged in
              if (userId) {
                await supabase
                  .from('payment_history')
                  .insert({
                    user_id: userId,
                    report_id: reportId,
                    payment_id: response.razorpay_payment_id,
                    amount: REPORT_PRICE,
                    currency: 'INR',
                    status: 'completed',
                    payment_gateway: 'razorpay'
                  });
              }

              toast.success("Payment Successful!");
              setTimeout(() => {
                navigate('/thank-you', {
                  state: {
                    paymentId: response.razorpay_payment_id,
                    amount: REPORT_PRICE,
                  },
                });
              }, 1000);
            } catch (error) {
              console.error('Error updating payment status:', error);
              toast.error('Payment successful but failed to update records');
            }
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.mobileNumber,
          },
          theme: { color: '#FBBF24' },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };

      script.onerror = () => {
        toast.error('Failed to load payment gateway');
      };
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">What's your full name?</h3>
              <p className="text-gray-300">We need your complete name for accurate numerological calculations</p>
            </div>
            <div>
              <Label htmlFor="fullName" className="text-white">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                autoFocus
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Calendar className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">When were you born?</h3>
              <p className="text-gray-300">Your birth date is crucial for Vedic numerology calculations</p>
            </div>
            <div>
              <Label htmlFor="dateOfBirth" className="text-white">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                className="bg-white/10 border-white/20 text-white focus:border-yellow-400"
                autoFocus
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">What's your gender?</h3>
              <p className="text-gray-300">Gender helps in providing more personalized numerological insights</p>
            </div>
            <div>
              <Label htmlFor="gender" className="text-white">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-yellow-400">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Phone className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">What's your mobile number?</h3>
              <p className="text-gray-300">We'll use this to send you updates about your report</p>
            </div>
            <div>
              <Label htmlFor="mobileNumber" className="text-white">Mobile Number</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={(e) => updateFormData('mobileNumber', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                autoFocus
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Mail className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">What's your email address?</h3>
              <p className="text-gray-300">Your personalized report will be sent to this email</p>
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                autoFocus
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-white">
            Step {currentStep} of {totalSteps}
          </CardTitle>
          <div className="w-full bg-white/20 rounded-full h-2 mt-4">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStepContent()}
          
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 1 ? 'Back' : 'Previous'}
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
            >
              {currentStep === totalSteps ? 'Proceed to Payment' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormFlow;
