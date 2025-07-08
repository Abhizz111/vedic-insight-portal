
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, User, Calendar, Phone, Mail, Star, CreditCard, Sparkles, Moon, Sun, Heart, Edit, Zap, BookOpen, Eye, Compass, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EditProfileModal from "@/components/EditProfileModal";
import NumerologySection from "@/components/NumerologySection";
import { toast } from "sonner";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Profile {
  full_name: string;
  phone: string | null;
}

interface NumerologyReport {
  id: string;
  full_name: string;
  date_of_birth: string;
  phone: string;
  email: string;
  life_path_number: number | null;
  destiny_number: number | null;
  soul_urge_number: number | null;
  personality_number: number | null;
  report_pdf_url: string | null;
  payment_status: string | null;
  created_at: string;
}

interface PaymentHistory {
  id: string;
  amount: number;
  created_at: string;
  status: string | null;
  payment_gateway: string | null;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reports, setReports] = useState<NumerologyReport[]>([]);
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, loading, navigate]);

  const fetchUserData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch reports
      const { data: reportsData } = await supabase
        .from('numerology_reports')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (reportsData) {
        setReports(reportsData);
      }

      // Fetch payment history
      const { data: paymentsData } = await supabase
        .from('payment_history')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (paymentsData) {
        setPayments(paymentsData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleDownloadReport = (reportId: string) => {
    toast.success("Downloading your numerology report...");
    // In real implementation, this would download the actual PDF report
  };

  const getNumerologyMeaning = (type: string, number: number | null) => {
    if (!number) return "Your cosmic number awaits calculation...";
    
    const meanings: { [key: string]: { [key: number]: string } } = {
      life_path: {
        1: "The Leader - Independent, pioneering, and ambitious",
        2: "The Peacemaker - Cooperative, diplomatic, and intuitive",
        3: "The Creative - Artistic, expressive, and optimistic",
        4: "The Builder - Practical, hardworking, and reliable",
        5: "The Explorer - Adventurous, versatile, and freedom-loving",
        6: "The Nurturer - Caring, responsible, and family-oriented",
        7: "The Seeker - Spiritual, analytical, and introspective",
        8: "The Achiever - Ambitious, business-minded, and successful",
        9: "The Humanitarian - Compassionate, generous, and wise"
      },
      destiny: {
        1: "Destined to lead and innovate",
        2: "Destined to bring harmony and cooperation",
        3: "Destined to inspire and create",
        4: "Destined to build lasting foundations",
        5: "Destined to experience freedom and adventure",
        6: "Destined to serve and nurture others",
        7: "Destined to seek truth and wisdom",
        8: "Destined to achieve material success",
        9: "Destined to serve humanity"
      }
    };

    return meanings[type]?.[number] || "A unique cosmic signature awaits interpretation";
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your cosmic dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {profile?.full_name || user?.email}! ✨
            </h1>
            <p className="text-gray-300">Explore your cosmic journey and numerological insights</p>
          </div>

          {/* Numerology Numbers Display */}
          {reports.length > 0 && (
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-yellow-500/30">
                <CardContent className="pt-6 text-center">
                  <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Life Path</h3>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {reports[0].life_path_number || "—"}
                  </div>
                  <p className="text-xs text-gray-300">
                    {getNumerologyMeaning('life_path', reports[0].life_path_number)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-lg border-blue-500/30">
                <CardContent className="pt-6 text-center">
                  <Moon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Destiny</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {reports[0].destiny_number || "—"}
                  </div>
                  <p className="text-xs text-gray-300">
                    {getNumerologyMeaning('destiny', reports[0].destiny_number)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-purple-500/30">
                <CardContent className="pt-6 text-center">
                  <Heart className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Soul Urge</h3>
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {reports[0].soul_urge_number || "—"}
                  </div>
                  <p className="text-xs text-gray-300">Your heart's deepest desires</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-lg border-green-500/30">
                <CardContent className="pt-6 text-center">
                  <Sun className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Personality</h3>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {reports[0].personality_number || "—"}
                  </div>
                  <p className="text-xs text-gray-300">How the world sees you</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Interactive Numerology Sections */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Explore Numerology</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NumerologySection
                title="Chakra Alignment"
                description="Discover your energy centers and spiritual balance"
                icon={<Zap className="h-10 w-10 text-white" />}
                gradient="bg-gradient-to-br from-red-500/20 to-orange-500/20"
                comingSoon={true}
              />
              
              <NumerologySection
                title="Vedic Wisdom"
                description="Ancient knowledge and cosmic insights"
                icon={<BookOpen className="h-10 w-10 text-white" />}
                gradient="bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
                comingSoon={true}
              />
              
              <NumerologySection
                title="Aura Reading"
                description="Understand your spiritual energy field"
                icon={<Eye className="h-10 w-10 text-white" />}
                gradient="bg-gradient-to-br from-cyan-500/20 to-blue-500/20"
                comingSoon={true}
              />
              
              <NumerologySection
                title="Life Guidance"
                description="Navigate your path with cosmic wisdom"
                icon={<Compass className="h-10 w-10 text-white" />}
                gradient="bg-gradient-to-br from-green-500/20 to-emerald-500/20"
                comingSoon={true}
              />
              
              <NumerologySection
                title="Protection Mantras"
                description="Sacred sounds for spiritual protection"
                icon={<Shield className="h-10 w-10 text-white" />}
                gradient="bg-gradient-to-br from-yellow-500/20 to-amber-500/20"
                comingSoon={true}
              />
              
              <NumerologySection
                title="Crystal Healing"
                description="Gemstone recommendations for your numbers"
                icon={<Sparkles className="h-10 w-10 text-white" />}
                gradient="bg-gradient-to-br from-pink-500/20 to-rose-500/20"
                comingSoon={true}
              />
            </div>
          </div>

          <Tabs defaultValue="reports" className="space-y-6">
            <TabsList className="bg-white/10 backdrop-blur-lg border-white/20">
              <TabsTrigger value="reports" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                My Reports
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                Profile
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                Payment History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-6">
              <div className="grid gap-6">
                {reports.map((report) => (
                  <Card key={report.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-yellow-400" />
                            Vedic Numerology Report
                          </CardTitle>
                          <CardDescription className="text-gray-300 mt-2">
                            Comprehensive analysis for {report.full_name}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`${
                            report.payment_status === 'completed' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          }`}
                        >
                          {report.payment_status === 'completed' ? 'Completed' : 'Pending'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-300">Generated: {new Date(report.created_at).toLocaleDateString()}</p>
                          <p className="text-gray-300">Birth Date: {report.date_of_birth}</p>
                        </div>
                        <Button 
                          onClick={() => handleDownloadReport(report.id)}
                          disabled={report.payment_status !== 'completed'}
                          className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:opacity-50"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {reports.length === 0 && (
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="text-center py-12">
                      <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold text-white mb-2">No Reports Yet</h3>
                      <p className="text-gray-300 mb-4">You haven't generated any numerology reports yet.</p>
                      <Button 
                        onClick={() => navigate('/')}
                        className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
                      >
                        Get Your First Report
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Profile Information</CardTitle>
                      <CardDescription className="text-gray-300">
                        Your personal details used for numerological calculations
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setIsEditModalOpen(true)}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-300">Full Name</p>
                        <p className="text-white font-semibold">{profile?.full_name || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-300">Email</p>
                        <p className="text-white font-semibold">{user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-300">Phone</p>
                        <p className="text-white font-semibold">{profile?.phone || 'Not provided'}</p>
                      </div>
                    </div>

                    {reports.length > 0 && (
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-yellow-400" />
                        <div>
                          <p className="text-sm text-gray-300">Date of Birth</p>
                          <p className="text-white font-semibold">{reports[0].date_of_birth}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <div className="grid gap-6">
                {payments.map((payment) => (
                  <Card key={payment.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-yellow-400" />
                          <div>
                            <p className="text-white font-semibold">Numerology Report</p>
                            <p className="text-gray-300 text-sm">
                              {new Date(payment.created_at).toLocaleDateString()} • {payment.payment_gateway}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">₹{payment.amount}</p>
                          <Badge 
                            variant="secondary" 
                            className={`${
                              payment.status === 'completed' 
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            }`}
                          >
                            {payment.status || 'Pending'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {payments.length === 0 && (
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="text-center py-12">
                      <CreditCard className="h-12 w-12 text-yellow-400 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold text-white mb-2">No Payment History</h3>
                      <p className="text-gray-300">Your payment transactions will appear here.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onProfileUpdate={(updatedProfile) => setProfile(updatedProfile)}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
