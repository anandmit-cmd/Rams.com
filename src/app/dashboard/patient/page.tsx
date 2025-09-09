
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Stethoscope, FileText, Wallet, Bell, Settings, LogOut, LayoutGrid, HeartPulse, ShieldCheck, Dumbbell, Star, MessageSquare } from 'lucide-react';
import { AppLogo } from '@/components/icons';

export default function PatientDashboard() {
  return (
    <div className="flex min-h-screen bg-secondary">
      <aside className="w-64 bg-white shadow-md flex-col hidden md:flex">
        <div className="p-6">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <AppLogo className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl text-gray-800">RAMS.com</span>
            </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground" prefetch={false}>
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Calendar className="h-5 w-5" />
            Appointments
          </Link>
           <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <FileText className="h-5 w-5" />
            Medical Records
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Wallet className="h-5 w-5" />
            Billing
          </Link>
           <Link href="/find-a-doctor" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Stethoscope className="h-5 w-5" />
            Find a Doctor
          </Link>
        </nav>
        <div className="p-4 mt-auto">
             <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
                <LogOut className="h-5 w-5" />
                Logout
            </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Patient Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <Avatar>
              <AvatarImage src="https://picsum.photos/100/100?random=user" alt="Patient" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Welcome back, Patient!</CardTitle>
                    <CardDescription>Here's a quick overview of your health dashboard.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">You have 2 appointments this week.</p>
                         <Button className="mt-4 w-full">View Appointments</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Recent Reports</CardTitle>
                        <FileText className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3 New</div>
                        <p className="text-xs text-muted-foreground">Blood test and X-ray reports are in.</p>
                         <Button className="mt-4 w-full">View Records</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Outstanding Bills</CardTitle>
                        <Wallet className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1,250</div>
                        <p className="text-xs text-muted-foreground">Due for recent consultation.</p>
                        <Button className="mt-4 w-full">Pay Now</Button>
                    </CardContent>
                </Card>
            </div>

             <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Consultations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                <div>
                                    <p className="font-semibold">Consultation with Dr. Sharma</p>
                                    <p className="text-sm text-gray-500">12th July - Technical Issue</p>
                                </div>
                                <Button size="sm" variant="destructive">Request Refund</Button>
                            </div>
                             <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                <div>
                                    <p className="font-semibold">Lab Test from City Labs</p>
                                    <p className="text-sm text-gray-500">10th July - Completed</p>
                                </div>
                                <Button size="sm" variant="outline">Give Feedback</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Give Feedback</CardTitle>
                    </CardHeader>
                     <CardContent className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-20 flex-col gap-1">
                            <Star className="w-6 h-6 mb-1 text-yellow-500"/>
                            Rate a Doctor
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-1">
                            <MessageSquare className="w-6 h-6 mb-1 text-blue-500"/>
                            Write a Review
                        </Button>
                     </CardContent>
                </Card>
            </div>


            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Explore Wellness</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/">
                        <Card className="text-center hover:shadow-lg transition-shadow h-full">
                            <CardContent className="p-6 flex flex-col items-center justify-center">
                                <HeartPulse className="w-10 h-10 text-primary mx-auto mb-2"/>
                                <h3 className="font-semibold">AI Symptom Checker</h3>
                            </CardContent>
                        </Card>
                    </Link>
                     <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-2"/>
                            <h3 className="font-semibold">Health Insurance</h3>
                        </CardContent>
                    </Card>
                     <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <Dumbbell className="w-10 h-10 text-primary mx-auto mb-2"/>
                            <h3 className="font-semibold">Fitness Plans</h3>
                        </CardContent>
                    </Card>
                     <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <Stethoscope className="w-10 h-10 text-primary mx-auto mb-2"/>
                            <h3 className="font-semibold">Find a New Doctor</h3>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

