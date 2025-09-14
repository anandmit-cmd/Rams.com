
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Completed': return 'default';
            case 'Cancelled': return 'destructive';
            default: return 'secondary';
        }
    }

  return (
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
                            <TableHead className="text-right">Fare</TableHead>
                            <TableHead className="text-center">Status</TableHead>
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
                                <TableCell className="text-right">₹{trip.fare.toFixed(2)}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={getStatusVariant(trip.status)} className={cn(
                                        'font-semibold',
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
  );
}
