
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { List, Bell, LogOut, LayoutGrid, Siren, ArrowLeft } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import placeholderImages from '@/lib/placeholder-images.json';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const tripHistory = [
  { id: '#TR-701', patient: 'Aarav Sharma', date: '2024-07-22 10:30 AM', pickup: 'Andheri Station', dropoff: 'Apollo Hospital, Andheri', fare: 850, status: 'Completed' },
  { id: '#TR-702', patient: 'Priya Singh', date: '2024-07-22 02:15 PM', pickup: 'Juhu Beach', dropoff: 'City Hospital', fare: 1200, status: 'Completed' },
  { id: '#TR-703', patient: 'Rohan Mehra', date: '2024-07-21 08:00 PM', pickup: 'Dadar Market', dropoff: 'Fortis Hospital, Mulund', fare: 1500, status: 'Cancelled' },
  { id: '#TR-704', patient: 'Anjali Verma', date: '2024-07-21 11:45 AM', pickup: 'Bandra West', dropoff: 'Lilavati Hospital', fare: 950, status: 'Completed' },
  { id: '#TR-705', patient: 'Vikram Rathod', date: '2024-07-20 05:30 PM', pickup: 'Thane', dropoff: 'Jupiter Hospital', fare: 1100, status: 'Completed' },
];


export default function AmbulanceTripHistoryPage() {
    const driverAvatar = placeholderImages['ambulance-driver-avatar'];

    const getStatusVariant = (status: string): 'default' | 'destructive' | 'secondary' | 'outline' | null | undefined => {
        switch (status) {
            case 'Completed': return 'default';
            case 'Cancelled': return 'destructive';
            default: return 'secondary';
        }
    }

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
          <Link href="/dashboard/ambulance" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Siren className="h-5 w-5" />
            Active Alerts
          </Link>
           <Link href="/dashboard/ambulance/trip-history" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground" prefetch={false}>
            <List className="h-5 w-5" />
            Trip History
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
            <div className='flex items-center gap-4'>
                 <Link href="/dashboard/ambulance" className="text-gray-600 hover:text-gray-900 md:hidden">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-semibold">Trip History</h1>
            </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src={driverAvatar.src} data-ai-hint={driverAvatar.hint} alt="Driver" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6">
            <Card>
                <CardHeader>
                    <CardTitle>All Trips</CardTitle>
                    <CardDescription>A record of all your past ambulance trips.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Trip ID</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Pickup</TableHead>
                                <TableHead>Dropoff</TableHead>
                                <TableHead>Fare</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tripHistory.map(trip => (
                                <TableRow key={trip.id}>
                                    <TableCell className="font-medium">{trip.id}</TableCell>
                                    <TableCell>{trip.patient}</TableCell>
                                    <TableCell>{trip.date}</TableCell>
                                    <TableCell>{trip.pickup}</TableCell>
                                    <TableCell>{trip.dropoff}</TableCell>
                                    <TableCell>₹{trip.fare.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(trip.status)} className={cn(
                                            trip.status === 'Completed' && 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
                                            trip.status === 'Cancelled' && 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100'
                                            )}>
                                            {trip.status}
                                        </Badge>
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
