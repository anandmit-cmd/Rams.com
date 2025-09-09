
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar as CalendarIcon, User, BarChart2, Bell, LogOut, LayoutGrid, Video, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const appointments = [
  { time: '10:30 AM', patient: 'Riya Singh', type: 'Video Call', status: 'Confirmed' },
  { time: '11:00 AM', patient: 'Amit Patel', type: 'In-Clinic', status: 'Confirmed' },
  { time: '12:00 PM', patient: 'Sunita Sharma', type: 'Video Call', status: 'Confirmed' },
  { time: '02:00 PM', patient: 'Karan Verma', type: 'In-Clinic', status: 'Cancelled' },
];

export default function DoctorSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAvailable, setIsAvailable] = useState(true);

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
             <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
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
              <AvatarImage src="https://picsum.photos/100/100?random=doctor" alt="Doctor" />
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
                    <div className="space-y-4">
                        {appointments.map((apt, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border">
                                <div className="flex items-center gap-4">
                                     <Avatar>
                                        <AvatarImage src={`https://picsum.photos/100/100?random=patient-${index}`} alt={apt.patient} />
                                        <AvatarFallback>{apt.patient.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{apt.patient}</p>
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
                                    ) : (
                                        <span className="text-sm font-medium text-red-600 flex items-center gap-1"><XCircle className="w-4 h-4" /> {apt.status}</span>
                                    )}
                                  {apt.type === 'Video Call' && apt.status === 'Confirmed' && <Button size="sm">Start Call</Button>}
                                </div>
                            </div>
                        ))}
                    </div>
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
