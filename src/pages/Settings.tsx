
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Key, Eye, EyeOff, Save } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const SettingsPage = () => {
  const [razorpayKeyId, setRazorpayKeyId] = useState('');
  const [razorpayKeySecret, setRazorpayKeySecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load existing keys from localStorage (in production, use secure storage)
    const savedKeyId = localStorage.getItem('razorpay_key_id');
    const savedKeySecret = localStorage.getItem('razorpay_key_secret');
    
    if (savedKeyId) setRazorpayKeyId(savedKeyId);
    if (savedKeySecret) setRazorpayKeySecret(savedKeySecret);
  }, []);

  const handleSaveKeys = async () => {
    if (!razorpayKeyId || !razorpayKeySecret) {
      toast.error('Please provide both Razorpay Key ID and Secret');
      return;
    }

    setLoading(true);
    
    try {
      // In production, these should be stored securely on the server
      localStorage.setItem('razorpay_key_id', razorpayKeyId);
      localStorage.setItem('razorpay_key_secret', razorpayKeySecret);
      
      toast.success('Razorpay keys saved successfully!');
    } catch (error) {
      toast.error('Failed to save keys');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Settings className="h-10 w-10 text-yellow-400" />
              Payment Settings
            </h1>
            <p className="text-gray-300">Configure your Razorpay payment gateway</p>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="h-5 w-5 text-yellow-400" />
                Razorpay Configuration
              </CardTitle>
              <CardDescription className="text-gray-300">
                Add your Razorpay API keys to enable payment processing. Get these from your Razorpay dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="keyId" className="text-white">Razorpay Key ID</Label>
                <Input
                  id="keyId"
                  type="text"
                  placeholder="rzp_test_xxxxxxxxxx or rzp_live_xxxxxxxxxx"
                  value={razorpayKeyId}
                  onChange={(e) => setRazorpayKeyId(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Your Razorpay Key ID (starts with rzp_test_ or rzp_live_)
                </p>
              </div>

              <div>
                <Label htmlFor="keySecret" className="text-white">Razorpay Key Secret</Label>
                <div className="relative">
                  <Input
                    id="keySecret"
                    type={showSecret ? "text" : "password"}
                    placeholder="Your Razorpay Key Secret"
                    value={razorpayKeySecret}
                    onChange={(e) => setRazorpayKeySecret(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Your Razorpay Key Secret (keep this confidential)
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleSaveKeys}
                  disabled={loading}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Configuration'}
                </Button>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-6">
                <h4 className="text-blue-400 font-semibold mb-2">How to get your Razorpay keys:</h4>
                <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                  <li>Sign up at <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">razorpay.com</a></li>
                  <li>Complete your KYC verification</li>
                  <li>Go to Settings → API Keys in your dashboard</li>
                  <li>Generate new API keys or use existing ones</li>
                  <li>Copy the Key ID and Key Secret here</li>
                </ol>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2">⚠️ Security Note:</h4>
                <p className="text-gray-300 text-sm">
                  In production, API keys should be stored securely on your server, not in the browser. 
                  This is a demo implementation for development purposes.
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

export default SettingsPage;
