
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Simulate sign up (this will be connected to Supabase later)
    toast.success("Account created successfully!");
    navigate('/dashboard');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto flex items-center justify-center min-h-[80vh]">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Sparkles className="h-12 w-12 text-yellow-400" />
              </div>
              <CardTitle className="text-white text-2xl">Create Account</CardTitle>
              <CardDescription className="text-gray-300">
                Join us to unlock your cosmic blueprint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
                >
                  Create Account
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-300">
                  Already have an account?{' '}
                  <button 
                    onClick={() => navigate('/signin')}
                    className="text-yellow-400 hover:text-yellow-300 font-semibold"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
