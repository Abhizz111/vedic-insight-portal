
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, CreditCard, FileText, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
}

interface Report {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  payment_status: string;
  amount?: number;
  created_at: string;
  life_path_number?: number;
  destiny_number?: number;
  soul_urge_number?: number;
  personality_number?: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem('admin_session');
    if (!adminSession) {
      toast.error('Admin access required');
      navigate('/adminlucky856');
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      // Fetch users with profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;
      setUsers(profilesData || []);

      // Fetch numerology reports
      const { data: reportsData, error: reportsError } = await supabase
        .from('numerology_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (reportsError) throw reportsError;
      setReports(reportsData || []);

    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('admin_session');
    toast.success('Signed out successfully');
    navigate('/adminlucky856');
  };

  const paidReports = reports.filter(report => report.payment_status === 'completed');
  const unpaidReports = reports.filter(report => report.payment_status === 'pending');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-red-400" />
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Users</p>
                  <p className="text-white text-2xl font-bold">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Reports</p>
                  <p className="text-white text-2xl font-bold">{reports.length}</p>
                </div>
                <FileText className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Paid Reports</p>
                  <p className="text-white text-2xl font-bold">{paidReports.length}</p>
                </div>
                <CreditCard className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Revenue</p>
                  <p className="text-white text-2xl font-bold">₹{paidReports.length * 199}</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-white/20">
              All Users
            </TabsTrigger>
            <TabsTrigger value="paid" className="text-white data-[state=active]:bg-white/20">
              Paid Reports
            </TabsTrigger>
            <TabsTrigger value="unpaid" className="text-white data-[state=active]:bg-white/20">
              Unpaid Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Registered Users</CardTitle>
                <CardDescription className="text-gray-300">
                  All users who have signed up
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-white pb-3">Name</th>
                        <th className="text-white pb-3">Email</th>
                        <th className="text-white pb-3">Phone</th>
                        <th className="text-white pb-3">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-white/10">
                          <td className="text-gray-300 py-3">{user.full_name}</td>
                          <td className="text-gray-300 py-3">{user.email}</td>
                          <td className="text-gray-300 py-3">{user.phone || '-'}</td>
                          <td className="text-gray-300 py-3">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paid">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Paid Reports</CardTitle>
                <CardDescription className="text-gray-300">
                  Users who have completed payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-white pb-3">Name</th>
                        <th className="text-white pb-3">Email</th>
                        <th className="text-white pb-3">Phone</th>
                        <th className="text-white pb-3">DOB</th>
                        <th className="text-white pb-3">Amount</th>
                        <th className="text-white pb-3">Status</th>
                        <th className="text-white pb-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paidReports.map((report) => (
                        <tr key={report.id} className="border-b border-white/10">
                          <td className="text-gray-300 py-3">{report.full_name}</td>
                          <td className="text-gray-300 py-3">{report.email}</td>
                          <td className="text-gray-300 py-3">{report.phone}</td>
                          <td className="text-gray-300 py-3">
                            {new Date(report.date_of_birth).toLocaleDateString()}
                          </td>
                          <td className="text-gray-300 py-3">₹{report.amount || 199}</td>
                          <td className="py-3">
                            <Badge className="bg-green-500/20 text-green-400">
                              {report.payment_status}
                            </Badge>
                          </td>
                          <td className="text-gray-300 py-3">
                            {new Date(report.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unpaid">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Unpaid Reports</CardTitle>
                <CardDescription className="text-gray-300">
                  Users with pending payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-white pb-3">Name</th>
                        <th className="text-white pb-3">Email</th>
                        <th className="text-white pb-3">Phone</th>
                        <th className="text-white pb-3">DOB</th>
                        <th className="text-white pb-3">Status</th>
                        <th className="text-white pb-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unpaidReports.map((report) => (
                        <tr key={report.id} className="border-b border-white/10">
                          <td className="text-gray-300 py-3">{report.full_name}</td>
                          <td className="text-gray-300 py-3">{report.email}</td>
                          <td className="text-gray-300 py-3">{report.phone}</td>
                          <td className="text-gray-300 py-3">
                            {new Date(report.date_of_birth).toLocaleDateString()}
                          </td>
                          <td className="py-3">
                            <Badge className="bg-orange-500/20 text-orange-400">
                              {report.payment_status}
                            </Badge>
                          </td>
                          <td className="text-gray-300 py-3">
                            {new Date(report.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
