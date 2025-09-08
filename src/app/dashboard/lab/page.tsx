
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { TestTube2, CalendarCheck2, FileUp, BarChart, Bell, LogOut, LayoutGrid } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function LabDashboard() {
  const bookings = [
    { id: '#BK-101', patient: 'Rina Desai', test: 'Complete Blood Count', status: 'Sample Collected' },
    { id: '#BK-102', patient: 'Mohit Verma', test: 'Lipid Profile', status: 'Report Ready' },
    { id: '#BK-103', patient: 'Sonia Agarwal', test: 'Thyroid Function Test', status: 'Awaiting Sample' },
  ];

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
            <CalendarCheck2 className="h-5 w-5" />
            Test Bookings
          </Link>
           <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <FileUp className="h-5 w-5" />
            Upload Reports
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <BarChart className="h-5 w-5" />
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
          <h1 className="text-xl font-semibold">Lab Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <Avatar>
              <AvatarImage src="https://picsum.photos/100/100?random=lab-tech" alt="Lab Technician" />
              <AvatarFallback>LT</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">New Bookings</CardTitle>
                        <CalendarCheck2 className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">22</div>
                        <p className="text-xs text-muted-foreground">Bookings for today</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Reports to be Uploaded</CardTitle>
                        <FileUp className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7</div>
                        <p className="text-xs text-muted-foreground">Awaiting report generation</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue (Today)</CardTitle>
                        <BarChart className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹18,750</div>
                        <p className="text-xs text-muted-foreground">From 35 completed tests</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Current Bookings</CardTitle>
                    <CardDescription>A list of ongoing and recent test bookings.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Booking ID</TableHead>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Test Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map(booking => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium">{booking.id}</TableCell>
                                    <TableCell>{booking.patient}</TableCell>
                                    <TableCell>{booking.test}</TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">Manage</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
