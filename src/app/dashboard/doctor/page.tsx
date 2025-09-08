
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, User, FileText, BarChart2, Bell, LogOut, LayoutGrid, Video } from 'lucide-react';
import { AppLogo } from '@/components/icons';

export default function DoctorDashboard() {
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
            My Schedule
          </Link>
           <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <User className="h-5 w-5" />
            My Patients
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <BarChart2 className="h-5 w-5" />
            Earnings
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
          <h1 className="text-xl font-semibold">Doctor's Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <Avatar>
              <AvatarImage src="https://picsum.photos/100/100?random=doctor" alt="Doctor" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Welcome back, Dr. Sharma!</CardTitle>
                    <CardDescription>Here's what's happening today.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">8 Video Calls, 4 In-Clinic</p>
                         <Button className="mt-4 w-full">View Schedule</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">New Patient Requests</CardTitle>
                        <User className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5 New</div>
                        <p className="text-xs text-muted-foreground">Pending approval for consultation.</p>
                         <Button className="mt-4 w-full">Manage Patients</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Earnings (This Month)</CardTitle>
                        <BarChart2 className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹85,500</div>
                        <p className="text-xs text-muted-foreground">+15% from last month</p>
                        <Button className="mt-4 w-full">View Earnings Report</Button>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Consultations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                <div>
                                    <p className="font-semibold">Riya Singh</p>
                                    <p className="text-sm text-gray-500">10:30 AM - Video Call</p>
                                </div>
                                <Button size="sm">Start Call</Button>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                <div>
                                    <p className="font-semibold">Amit Patel</p>
                                    <p className="text-sm text-gray-500">11:00 AM - In-Clinic</p>
                                </div>
                                <Button size="sm" variant="outline">View Details</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                     <CardContent className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-20 flex-col gap-1">
                            <FileText className="w-6 h-6 mb-1"/>
                            Create E-Prescription
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-1">
                            <Video className="w-6 h-6 mb-1"/>
                            Start Unscheduled Call
                        </Button>
                     </CardContent>
                </Card>
            </div>
        </main>
      </div>
    </div>
  );
}
