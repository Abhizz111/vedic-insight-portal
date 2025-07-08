import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Shield, Users, CreditCard, FileText, LogOut, Search, ShoppingCart } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
  user_id?: string;
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

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount: number;
  payment_status: string;
  payment_id?: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    // Filter orders based on search term
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const fetchData = async () => {
    try {
      // Create service role client for admin access
      const supabaseService = supabase;

      // Fetch users with profiles - get all users regardless of current session
      const { data: profilesData, error: profilesError } = await supabaseService
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Profiles error:', profilesError);
      } else {
        // Transform profiles data to match User interface
        const transformedUsers = profilesData?.map(profile => ({
          id: profile.id,
          email: '', // We'll need to get this from auth users if needed
          full_name: profile.full_name,
          phone: profile.phone,
          created_at: profile.created_at,
          user_id: profile.user_id
        })) || [];
        setUsers(transformedUsers);
      }

      // Fetch ALL numerology reports regardless of user session
      const { data: reportsData, error: reportsError } = await supabaseService
        .from('numerology_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (reportsError) {
        console.error('Reports error:', reportsError);
      } else {
        setReports(reportsData || []);
      }

      // Fetch ALL orders regardless of user session
      const { data: ordersData, error: ordersError } = await supabaseService
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Orders error:', ordersError);
      } else {
        setOrders(ordersData || []);
      }

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
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.amount), 0);

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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
                  <p className="text-gray-300 text-sm">Total Orders</p>
                  <p className="text-white text-2xl font-bold">{orders.length}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-purple-400" />
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
                  <p className="text-white text-2xl font-bold">₹{totalRevenue}</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="orders" className="text-white data-[state=active]:bg-white/20">
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-white/20">
              Users
            </TabsTrigger>
            <TabsTrigger value="paid" className="text-white data-[state=active]:bg-white/20">
              Paid Reports
            </TabsTrigger>
            <TabsTrigger value="unpaid" className="text-white data-[state=active]:bg-white/20">
              Unpaid Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">All Orders</CardTitle>
                    <CardDescription className="text-gray-300">
                      Complete order history with search
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by order number or customer name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 w-80"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white">Order #</TableHead>
                      <TableHead className="text-white">Customer</TableHead>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Phone</TableHead>
                      <TableHead className="text-white">Amount</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id} className="border-white/10">
                        <TableCell className="text-yellow-400 font-mono">{order.order_number}</TableCell>
                        <TableCell className="text-gray-300">{order.customer_name}</TableCell>
                        <TableCell className="text-gray-300">{order.customer_email}</TableCell>
                        <TableCell className="text-gray-300">{order.customer_phone}</TableCell>
                        <TableCell className="text-gray-300">₹{order.amount}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400">
                            {order.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(order.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Registered Users</CardTitle>
                <CardDescription className="text-gray-300">
                  All users who have signed up
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Phone</TableHead>
                      <TableHead className="text-white">Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-white/10">
                        <TableCell className="text-gray-300">{user.full_name}</TableCell>
                        <TableCell className="text-gray-300">{user.email || '-'}</TableCell>
                        <TableCell className="text-gray-300">{user.phone || '-'}</TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Phone</TableHead>
                      <TableHead className="text-white">DOB</TableHead>
                      <TableHead className="text-white">Amount</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paidReports.map((report) => (
                      <TableRow key={report.id} className="border-white/10">
                        <TableCell className="text-gray-300">{report.full_name}</TableCell>
                        <TableCell className="text-gray-300">{report.email}</TableCell>
                        <TableCell className="text-gray-300">{report.phone}</TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(report.date_of_birth).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-gray-300">₹{report.amount || 199}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400">
                            {report.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(report.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Phone</TableHead>
                      <TableHead className="text-white">DOB</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unpaidReports.map((report) => (
                      <TableRow key={report.id} className="border-white/10">
                        <TableCell className="text-gray-300">{report.full_name}</TableCell>
                        <TableCell className="text-gray-300">{report.email}</TableCell>
                        <TableCell className="text-gray-300">{report.phone}</TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(report.date_of_birth).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-orange-500/20 text-orange-400">
                            {report.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(report.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
