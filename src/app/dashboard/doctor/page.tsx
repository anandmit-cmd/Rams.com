
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, User, FileText, BarChart2, Bell, LogOut, LayoutGrid, Video, Star, Loader2 } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import placeholderImages from '@/lib/placeholder-images.json';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, onSnapshot, DocumentData, doc, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface Appointment extends DocumentData {
    id: string;
    patientName: string;
    time: string;
    type: 'Video Call' | 'In-Clinic';
    status: 'Confirmed' | 'Completed' | 'Cancelled' | 'Refund Requested' | 'Refunded';
    details?: string | null;
    date: string;
}

const chartData = [
  { date: 'Mon', revenue: Math.floor(Math.random() * 15000) + 5000 },
  { date: 'Tue', revenue: Math.floor(Math.random() * 15000) + 5000 },
  { date: 'Wed', revenue: Math.floor(Math.random() * 15000) + 5000 },
  { date: 'Thu-IGNORE', revenue: 0 }, //This is a dummy value to make the chart look better
  { date: 'Fri', revenue: Math.floor(Math.random() * 15000) + 5000 },
  { date: 'Sat', revenue: Math.floor(Math.random() * 15000) + 5000 },
  { date: 'Sun', revenue: Math.floor(Math.random() * 15000) + 5000 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;


export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      const q = query(collection(db, "appointments"), where("doctorId", "==", currentUser.uid));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const apps: Appointment[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return { 
                id: doc.id,
                ...data,
            } as Appointment;
        });
        setAppointments(apps);
        setLoading(false);
      }, (error) => {
          console.error("Error fetching appointments: ", error);
          toast({ title: 'Error', description: 'Could not fetch appointments.', variant: 'destructive' });
          setLoading(false);
      });

      return () => unsubscribe();
    } else {
        setLoading(false);
    }
  }, [currentUser, toast]);


  const handleRefund = async (id: string) => {
    try {
        const appointmentRef = doc(db, 'appointments', id);
        await updateDoc(appointmentRef, { status: 'Refunded', details: 'Payment has been refunded.' });
        toast({ title: 'Success', description: 'Payment has been refunded.' });
    } catch (error) {
        console.error("Error refunding payment: ", error);
        toast({ title: 'Error', description: 'Failed to refund payment.', variant: 'destructive' });
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter(a => a.date === today && a.status === 'Confirmed');
  const newPatients = appointments.filter(a => a.status === 'Confirmed'); // Simplified logic
  const upcomingConsultations = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Refund Requested');


  return (
    <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {loading ? <Loader2 className="animate-spin" /> : <div className="text-2xl font-bold">{todaysAppointments.length}</div>}
                    <p className="text-xs text-muted-foreground">Scheduled for today</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    <User className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {loading ? <Loader2 className="animate-spin" /> : <div className="text-2xl font-bold">{newPatients.length}</div>}
                    <p className="text-xs text-muted-foreground">Total patients served.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Patient Feedback</CardTitle>
                    <Star className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold flex items-center">4.8 <Star className="w-5 h-5 ml-1 text-yellow-400 fill-current" /></div>
                    <p className="text-xs text-muted-foreground">Based on 215 patient reviews</p>
                </CardContent>
            </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Upcoming & Actionable Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                   {loading ? (
                         <div className="flex justify-center items-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : upcomingConsultations.length > 0 ? (
                        <div className="space-y-4">
                            {upcomingConsultations.map((consultation, index) => {
                                const patientAvatar = placeholderImages[`patient-avatar-${index % 4}` as keyof typeof placeholderImages] || placeholderImages['patient-avatar-0'];
                                return(
                                <div key={consultation.id} className="flex items-start justify-between p-3 rounded-lg bg-gray-50 border">
                                    <div className="flex items-start gap-4">
                                        <Avatar>
                                            <AvatarImage src={patientAvatar.src} data-ai-hint={patientAvatar.hint} alt={consultation.patientName} />
                                            <AvatarFallback>{consultation.patientName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{consultation.patientName}</p>
                                            <p className="text-sm text-gray-500">{new Date(consultation.date).toLocaleDateString()} at {consultation.time} - {consultation.type}</p>
                                            {consultation.details && (
                                                <p className={`text-xs mt-1 ${consultation.status === 'Refunded' ? 'text-green-600' : 'text-red-500'}`}>
                                                    {consultation.details}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {consultation.status === 'Confirmed' && (
                                            <>
                                                <Button size="sm"><Video className="w-4 h-4 mr-2"/>Start Call</Button>
                                                <Button size="sm" variant="outline">Details</Button>
                                            </>
                                        )}
                                        {consultation.status === 'Refund Requested' && (
                                            <>
                                                <Button size="sm" variant="destructive" onClick={() => handleRefund(consultation.id)}>Refund Payment</Button>
                                                <Button size="sm" variant="outline">Details</Button>
                                            </>
                                        )}
                                        {consultation.status === 'Refunded' && (
                                            <>
                                                <Button size="sm" variant="outline" disabled>Payment Refunded</Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    ) : (
                         <div className="text-center py-16">
                            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-lg font-semibold">{currentUser ? 'No upcoming consultations.' : 'Please log in to view consultations.'}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Revenue</CardTitle>
                        <CardDescription>Total earnings over the last 7 days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
                          <RechartsBarChart accessibilityLayer data={chartData.filter(d => !d.date.includes('IGNORE'))}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                              dataKey="date"
                              tickLine={false}
                              tickMargin={10}
                              axisLine={false}
                              tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis
                              tickFormatter={(value) => `₹${value / 1000}k`}
                              tickLine={false}
                              axisLine={false}
                              tickMargin={10}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                          </RechartsBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                     <CardContent className="grid grid-cols-1 gap-4">
                        <Button variant="outline" className="h-16 flex-col gap-1">
                            <FileText className="w-5 h-5 mb-1"/>
                            Create E-Prescription
                        </Button>
                     </CardContent>
                </Card>
            </div>
        </div>
    </main>
  );
}
