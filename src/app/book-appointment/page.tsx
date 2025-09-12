
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AppLogo } from '@/components/icons';
import { Star, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import placeholderImages from '@/lib/placeholder-images.json';


const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

export default function BookAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();
  const doctorImage = placeholderImages['doctor-1'];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: 'Incomplete Selection',
        description: 'Please select a date and a time slot to book an appointment.',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
        title: 'Appointment Booked!',
        description: `Your appointment with Dr. Anjali Sharma is confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
       <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <AppLogo className="w-8 h-8 text-primary" />
                <span className="font-bold text-xl text-gray-800">RAMS.com</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
                <Link href="/find-a-doctor" className="text-sm font-medium text-primary" prefetch={false}>
                    Find a Doctor
                </Link>
            </nav>
            <Button asChild>
                <Link href="/dashboard/patient">My Dashboard</Link>
            </Button>
        </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Book an Appointment</CardTitle>
                <CardDescription>Select a date and time that works for you.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-8">
                <div className="flex justify-center">
                    <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    className="rounded-md border"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold mb-4">Available Time Slots for {selectedDate ? selectedDate.toLocaleDateString() : ''}</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map(time => (
                            <Button
                                key={time}
                                variant={selectedTime === time ? 'default' : 'outline'}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </Button>
                        ))}
                    </div>
                </div>
              </CardContent>
            </Card>
             <div className="mt-8 flex justify-end">
                <Button size="lg" className="bg-accent hover:bg-accent/90 h-12 text-lg" onClick={handleBooking}>
                    Confirm Appointment
                </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
             <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                        <AvatarImage src={doctorImage.src} alt="Dr. Anjali Sharma" data-ai-hint={doctorImage.hint}/>
                        <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <CardTitle>Dr. Anjali Sharma</CardTitle>
                    <CardDescription>Cardiologist</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                   <div className="flex items-center justify-center text-gray-500 my-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        Mumbai, IN
                    </div>
                    <div className="flex items-center justify-center gap-4 my-4">
                        <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="font-bold">4.8</span>
                            <span className="text-xs text-gray-500">(120 reviews)</span>
                        </div>
                    </div>
                    <p className="text-center text-muted-foreground">
                        Dr. Anjali Sharma is a renowned cardiologist with over 15 years of experience in treating heart conditions.
                    </p>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
