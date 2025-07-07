
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, User, Calendar, Phone, Mail, Star, CreditCard } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Dashboard = () => {
  const [userDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    dateOfBirth: "1990-05-15"
  });

  const [reports] = useState([
    {
      id: 1,
      title: "Complete Vedic Numerology Report",
      date: "2024-01-15",
      status: "Completed",
      description: "Comprehensive analysis of your life path, destiny number, and cosmic influences"
    }
  ]);

  const [payments] = useState([
    {
      id: 1,
      amount: "$49.99",
      date: "2024-01-15",
      status: "Completed",
      description: "Vedic Numerology Report"
    }
  ]);

  const handleDownloadReport = (reportId: number) => {
    toast.success("Downloading your numerology report...");
    // In real implementation, this would download the actual PDF report
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {userDetails.name}!</h1>
            <p className="text-gray-300">Manage your numerology reports and account details</p>
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
                            <Star className="h-5 w-5 text-yellow-400" />
                            {report.title}
                          </CardTitle>
                          <CardDescription className="text-gray-300 mt-2">
                            {report.description}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="bg-green-500/20 text-green-400 border-green-500/30"
                        >
                          {report.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-300">Generated on: {report.date}</p>
                        <Button 
                          onClick={() => handleDownloadReport(report.id)}
                          className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
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
                      <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold text-white mb-2">No Reports Yet</h3>
                      <p className="text-gray-300 mb-4">You haven't generated any numerology reports yet.</p>
                      <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700">
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
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your personal details used for numerological calculations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-300">Full Name</p>
                        <p className="text-white font-semibold">{userDetails.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-300">Date of Birth</p>
                        <p className="text-white font-semibold">{userDetails.dateOfBirth}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-300">Email</p>
                        <p className="text-white font-semibold">{userDetails.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-300">Phone</p>
                        <p className="text-white font-semibold">{userDetails.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Edit Profile
                    </Button>
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
                            <p className="text-white font-semibold">{payment.description}</p>
                            <p className="text-gray-300 text-sm">Transaction Date: {payment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">{payment.amount}</p>
                          <Badge 
                            variant="secondary" 
                            className="bg-green-500/20 text-green-400 border-green-500/30"
                          >
                            {payment.status}
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

      <Footer />
    </div>
  );
};

export default Dashboard;
