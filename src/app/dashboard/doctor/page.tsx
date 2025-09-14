
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
import { collection, query, where, onSnapshot, DocumentData } from 'firebase/firestore';

interface Appointment extends DocumentData {
    id: string;
    patientName: string;
    time: string;
    type: 'Video Call' | 'In-Clinic';
    status: 'Upcoming' | 'Refund Requested' | 'Refunded';
    details?: string | null;
}

const chartData = [
  { date: 'Mon', revenue: Math.floor(Math.random() * 15000) + 5000 },
  { date: 'Tue', revenue: Math.floor(Math.random() * 15000) + 5000 },
  { date: 'Wed', revenue: Math.floor(Math.random() * 15000) + 5000 },
  { date: 'Thu', revenue: Math.floor(Math.random() * 15000) + 5000 },
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
  const doctorAvatar = placeholderImages['doctor-avatar'];
  const [consultations, setConsultations] = useState<Appointment[]>([]);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      const q = query(collection(db, "appointments"), where("doctorId", "==", currentUser.uid), where("status", "==", "Confirmed"));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const apps: Appointment[] = snapshot.docs.map((doc, index) => {
            const data = doc.data();
            return { 
                id: doc.id,
                ...data,
                //This is dummy logic to create varied statuses for demonstration
                status: index === 1 ? 'Refund Requested' : 'Upcoming',
                details: index === 1 ? 'Patient requested a refund due to technical issues.' : null,
            } as Appointment;
        });
        setConsultations(apps);
        setLoading(false);
      }, (error) => {
          console.error("Error fetching appointments: ", error);
          setLoading(false);
      });

      return () => unsubscribe();
    } else {
        setLoading(false);
    }
  }, [currentUser]);


  const handleRefund = (id: string) => {
    setConsultations(consultations.map(c => 
      c.id === id ? { ...c, status: 'Refunded', details: 'Payment has been refunded.' } : c
    ));
  };


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
          <Link href="/dashboard/doctor" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground" prefetch={false}>
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/dashboard/doctor/my-schedule" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
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
             <Link href="/" onClick={() => auth.signOut()} className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
                <LogOut className="h-5 w-5" />
                Logout
            </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Doctor's Dashboard</h1>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src={doctorAvatar.src} data-ai-hint={doctorAvatar.hint} alt="Doctor" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">8 Video Calls, 4 In-Clinic</p>
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
                        <CardTitle>Upcoming Consultations</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {loading ? (
                             <div className="flex justify-center items-center h-48">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : consultations.length > 0 ? (
                            <div className="space-y-4">
                                {consultations.map((consultation, index) => {
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
                                                <p className="text-sm text-gray-500">{consultation.time} - {consultation.type}</p>
                                                {consultation.details && (
                                                    <p className={`text-xs mt-1 ${consultation.status === 'Refunded' ? 'text-green-600' : 'text-red-500'}`}>
                                                        {consultation.details}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {consultation.status === 'Upcoming' && (
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
                              <RechartsBarChart accessibilityLayer data={chartData}>
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
      </div>
    </div>
  );
}

    