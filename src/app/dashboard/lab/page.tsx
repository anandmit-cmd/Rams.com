
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube2, CalendarCheck2, FileUp, BarChart, Star } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function LabDashboard() {
  const bookings = [
    { id: '#BK-101', patient: 'Rina Desai', test: 'Complete Blood Count', status: 'Sample Collected' },
    { id: '#BK-102', patient: 'Mohit Verma', test: 'Lipid Profile', status: 'Report Ready' },
    { id: '#BK-103', patient: 'Sonia Agarwal', test: 'Thyroid Function Test', status: 'Awaiting Sample' },
    { id: '#BK-104', patient: 'Vikram Rathod', test: 'Vitamin D Test', status: 'Sample Collected'},
  ];

  return (
    <main className="flex-1 p-6">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
                    <CardTitle className="text-sm font-medium">Revenue (Today)</CardTitle>
                    <BarChart className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹18,750</div>
                    <p className="text-xs text-muted-foreground">From 35 completed tests</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Patient Rating</CardTitle>
                    <Star className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold flex items-center">4.9 <Star className="w-5 h-5 ml-1 text-yellow-400 fill-current" /></div>
                    <p className="text-xs text-muted-foreground">Based on 120 ratings</p>
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
                                <TableCell>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        booking.status === 'Report Ready' ? 'bg-green-100 text-green-800' : 
                                        booking.status === 'Sample Collected' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </TableCell>
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
  );
}
