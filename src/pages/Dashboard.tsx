
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Brain, Compass, Download, User, Settings, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import EditProfileModal from '@/components/EditProfileModal';
import NumerologySection from '@/components/NumerologySection';

interface UserReport {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  life_path_number?: number;
  destiny_number?: number;
  soul_urge_number?: number;
  personality_number?: number;
  payment_status: string;
  amount?: number;
  created_at: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string | null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<UserReport[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserReports();
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserReports = async () => {
    try {
      const { data, error } = await supabase
        .from('numerology_reports')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error: any) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load your reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleDownloadReport = () => {
    toast.info('Report download feature coming soon!');
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  const paidReports = reports.filter(report => report.payment_status === 'completed');
  const pendingReports = reports.filter(report => report.payment_status === 'pending');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-white text-xl">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to Your Cosmic Dashboard
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore your numerological insights and discover your spiritual journey
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-emerald-500 to-teal-700 backdrop-blur-sm border-white/30 shadow-lg">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Total Reports</h3>
                <p className="text-white/90 text-3xl font-bold">{reports.length}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-indigo-700 backdrop-blur-sm border-white/30 shadow-lg">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Completed</h3>
                <p className="text-white/90 text-3xl font-bold">{paidReports.length}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-700 backdrop-blur-sm border-white/30 shadow-lg">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Pending</h3>
                <p className="text-white/90 text-3xl font-bold">{pendingReports.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Numerology Sections */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Explore Your Numerological Journey
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div onClick={() => setShowEditProfile(true)}>
                <NumerologySection
                  title="Profile Settings"
                  description="Edit your personal information and preferences"
                  icon={<User className="h-16 w-16 text-white" />}
                  gradient="bg-gradient-to-br from-purple-600 to-pink-700"
                  comingSoon={false}
                />
              </div>
              
              <div onClick={handleDownloadReport}>
                <NumerologySection
                  title="Download Report"
                  description="Get your complete numerology analysis"
                  icon={<Download className="h-16 w-16 text-white" />}
                  gradient="bg-gradient-to-br from-green-600 to-emerald-700"
                  comingSoon={false}
                />
              </div>

              <NumerologySection
                title="Life Path Analysis"
                description="Discover your core life purpose and direction"
                icon={<Compass className="h-16 w-16 text-white" />}
                gradient="bg-gradient-to-br from-blue-600 to-cyan-700"
                comingSoon={true}
              />

              <NumerologySection
                title="Destiny Number"
                description="Uncover what you're meant to achieve in this lifetime"
                icon={<Star className="h-16 w-16 text-white" />}
                gradient="bg-gradient-to-br from-yellow-600 to-orange-700"
                comingSoon={true}
              />

              <NumerologySection
                title="Soul Urge Insights"
                description="Understand your deepest desires and motivations"
                icon={<Heart className="h-16 w-16 text-white" />}
                gradient="bg-gradient-to-br from-rose-600 to-red-700"
                comingSoon={true}
              />

              <NumerologySection
                title="Personality Decode"
                description="Learn how others perceive your outer personality"
                icon={<Brain className="h-16 w-16 text-white" />}
                gradient="bg-gradient-to-br from-indigo-600 to-purple-700"
                comingSoon={true}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Management
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Update your personal information and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowEditProfile(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Your Reports
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Download your completed numerology reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleDownloadReport}
                  disabled={paidReports.length === 0}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                {paidReports.length === 0 && (
                  <p className="text-gray-400 text-sm mt-2 text-center">
                    No completed reports available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          {reports.length > 0 && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Your Recent Reports</CardTitle>
                <CardDescription className="text-gray-300">
                  Track your numerology report history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{report.full_name}</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          className={
                            report.payment_status === 'completed' 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-orange-500/20 text-orange-400"
                          }
                        >
                          {report.payment_status}
                        </Badge>
                        <p className="text-gray-300 text-sm mt-1">₹{report.amount || 199}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default Dashboard;
