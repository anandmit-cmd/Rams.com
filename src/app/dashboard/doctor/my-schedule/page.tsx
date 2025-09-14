
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar as CalendarIcon, User, BarChart2, Bell, LogOut, LayoutGrid, Video, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { Calendar } from '@/components/ui/calendar';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import placeholderImages from '@/lib/placeholder-images.json';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, DocumentData } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface Appointment extends DocumentData {
  id: string;
  time: string;
  patientName: string;
  type: 'In-Clinic' | 'Video Call';
  status: 'Confirmed' | 'Cancelled' | 'Completed';
}

export default function DoctorSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAvailable, setIsAvailable] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  const doctorAvatar = placeholderImages['doctor-avatar'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser && selectedDate) {
      setIsLoading(true);
      const q = query(
        collection(db, "appointments"),
        where("doctorId", "==", currentUser.uid),
        where("date", "==", selectedDate.toISOString().split('T')[0])
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const apps: Appointment[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
        setAppointments(apps);
        setIsLoading(false);
      }, (error) => {
          console.error("Error fetching appointments: ", error);
          setIsLoading(false);
      });

      return () => unsubscribe();
    } else {
        setAppointments([]);
        setIsLoading(false);
    }
  }, [currentUser, selectedDate]);


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
          <Link href="/dashboard/doctor" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/dashboard/doctor/my-schedule" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground" prefetch={false}>
            <CalendarIcon className="h-5 w-5" />
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
          <h1 className="text-xl font-semibold">My Schedule</h1>
           <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
                <Switch id="availability" checked={isAvailable} onCheckedChange={setIsAvailable} />
                <Label htmlFor="availability" className="font-medium">{isAvailable ? "I'm Available" : "I'm Busy"}</Label>
            </div>
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

        <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle>Appointments for {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Today'}</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                         <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : appointments.length > 0 ? (
                        <div className="space-y-4">
                            {appointments.map((apt, index) => {
                                const patientAvatar = placeholderImages[`patient-avatar-${index % 4}` as keyof typeof placeholderImages] || placeholderImages['patient-avatar-0'];
                                return (
                                <div key={apt.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={patientAvatar.src} data-ai-hint={patientAvatar.hint} alt={apt.patientName} />
                                            <AvatarFallback>{apt.patientName?.charAt(0) || 'P'}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{apt.patientName}</p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                <Clock className="w-4 h-4" /> {apt.time}
                                                <span className="mx-1">|</span>
                                                {apt.type === 'Video Call' ? <Video className="w-4 h-4"/> : <User className="w-4 h-4"/>} {apt.type}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {apt.status === 'Confirmed' ? (
                                            <span className="text-sm font-medium text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {apt.status}</span>
                                        ) : apt.status === 'Cancelled' ? (
                                            <span className="text-sm font-medium text-red-600 flex items-center gap-1"><XCircle className="w-4 h-4" /> {apt.status}</span>
                                        ) : (
                                            <span className="text-sm font-medium text-gray-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {apt.status}</span>
                                        )}
                                    {apt.type === 'Video Call' && apt.status === 'Confirmed' && <Button size="sm">Start Call</Button>}
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    ) : (
                         <div className="text-center py-16">
                            <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                            <p className="text-lg font-semibold">{currentUser ? 'No appointments scheduled for this day.' : 'Please log in to view your schedule.'}</p>
                            <p className="text-sm text-muted-foreground">{currentUser ? 'Select another date to view other appointments.' : 'Your appointments will appear here once you log in.'}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
                <CardContent className="p-2">
                    <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md"
                    />
                </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

    