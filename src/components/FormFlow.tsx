
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Calendar, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  dateOfBirth: string;
  mobileNumber: string;
  email: string;
}

interface FormFlowProps {
  onBack: () => void;
}

// Set a price for the report. This could also be passed in as a prop.
const REPORT_PRICE = 1; // Example price in INR

const FormFlow = ({ onBack }: FormFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dateOfBirth: '',
    mobileNumber: '',
    email: ''
  });

  const totalSteps = 4;

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
        if (!formData.mobileNumber.trim() || formData.mobileNumber.length < 10) {
          toast.error("Please enter a valid mobile number");
          return false;
        }
        break;
      case 4:
        if (!formData.email.trim() || !formData.email.includes('@')) {
          toast.error("Please enter a valid email address");
          return false;
        }
        break;
    }
    return true;
  };

  const handlePayment = async () => {
  toast.info("Preparing your secure payment...");
  try {
    const response = await fetch('http://localhost:5000/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: REPORT_PRICE, currency: 'INR' }),
    });

    if (!response.ok) throw new Error('Failed to create payment order.');
    const order = await response.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Only the public key
      amount: order.amount,
      currency: order.currency,
      name: 'Vedic Numerology',
      description: 'Personalized Numerology Report',
      order_id: order.id,
      handler: function (response: any) {
        toast.success("Payment Successful!");
        navigate('/thank-you', {
          state: {
            paymentId: response.razorpay_payment_id,
            amount: order.amount / 100,
          },
        });
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

      case 4:
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
