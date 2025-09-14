
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BedDouble, BarChart2, FilePlus, Siren, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function HospitalDashboard() {
  const [showEmergencyRequest, setShowEmergencyRequest] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [admissionStatus, setAdmissionStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const { toast } = useToast();
    
  const handleAdmissionAction = (action: 'accepted' | 'declined') => {
    setIsLoading(true);
    setTimeout(() => {
        setAdmissionStatus(action);
        setIsLoading(false);
        if (action === 'accepted') {
            toast({
                title: 'Admission Accepted!',
                description: 'Patient Anjali Verma has been admitted. A notification has been sent.',
            });
        } else {
             setShowEmergencyRequest(false);
             toast({
                title: 'Admission Declined',
                description: 'The emergency admission request has been declined.',
                variant: 'destructive'
            });
        }
    }, 1500);
  };

  const recentAdmissions = [
    { id: '#AD-501', patient: 'Ravi Kumar', room: 'Private 302', status: 'Admitted' },
    { id: '#AD-502', patient: 'Sunita Devi', room: 'Semi-Private 101-B', status: 'Admitted' },
    { id: '#AD-503', patient: 'Amit Singh', room: 'General Ward', status: 'Discharged' },
  ];


  return (
    <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">New Admissions Today</CardTitle>
                    <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+3 from yesterday</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
                    <BedDouble className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground">120 / 140 beds filled</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Revenue (Today)</CardTitle>
                    <BarChart2 className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹5,50,000</div>
                    <p className="text-xs text-muted-foreground">From admissions & services</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Emergency Cases</CardTitle>
                    <FilePlus className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">In the last 24 hours</p>
                </CardContent>
            </Card>
        </div>
        {showEmergencyRequest && (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                    <Siren className="w-6 h-6 mr-2" />
                    Emergency Admission Request
                </CardTitle>
                 {admissionStatus === 'pending' && <CardDescription>A patient has booked an emergency admission. Please review and take action.</CardDescription>}
                 {admissionStatus === 'accepted' && <CardDescription className="text-green-600 font-semibold">Admission Accepted for Anjali Verma. A bed has been allocated in the ICU.</CardDescription>}
            </CardHeader>
            {admissionStatus !== 'accepted' && (
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="font-semibold">Patient Name</p>
                            <p>Anjali Verma</p>
                        </div>
                        <div>
                            <p className="font-semibold">Age / Gender</p>
                            <p>58 / Female</p>
                        </div>
                        <div>
                            <p className="font-semibold">Reported Condition</p>
                            <p>Severe chest pain and difficulty breathing.</p>
                        </div>
                    </div>
                </CardContent>
            )}
             {admissionStatus === 'pending' && (
                <CardHeader>
                    <div className="flex gap-4">
                        <Button className="w-full" size="lg" onClick={() => handleAdmissionAction('accepted')} disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Accept Admission
                        </Button>
                        <Button className="w-full" variant="destructive" size="lg" onClick={() => handleAdmissionAction('declined')} disabled={isLoading}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Decline
                        </Button>
                    </div>
                </CardHeader>
            )}
        </Card>
        )}


        <Card>
            <CardHeader>
                <CardTitle>Recent Admissions</CardTitle>
                <CardDescription>A list of the latest patient admissions.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Admission ID</TableHead>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Room / Bed</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentAdmissions.map(admission => (
                            <TableRow key={admission.id}>
                                <TableCell className="font-medium">{admission.id}</TableCell>
                                <TableCell>{admission.patient}</TableCell>
                                <TableCell>{admission.room}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        admission.status === 'Admitted' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {admission.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">View Details</Button>
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
