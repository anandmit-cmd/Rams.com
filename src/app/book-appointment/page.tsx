

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AppLogo } from '@/components/icons';
import { Star, MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import placeholderImages from '@/lib/placeholder-images.json';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc, DocumentData, serverTimestamp } from "firebase/firestore"; 
import React from 'react';
import type { Metadata } from 'next';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

async function fetchDoctorData(doctorId: string | null): Promise<DocumentData | null> {
    if (!doctorId) return null;
    try {
        const docRef = doc(db, "users", doctorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error("Error fetching doctor for metadata:", error);
        return null;
    }
}

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): Promise<Metadata> {
  const doctorId = searchParams.doctorId as string | null;
  const doctor = await fetchDoctorData(doctorId);

  if (!doctor) {
    return {
      title: 'Book Appointment | RAMS.com',
      description: 'Select a doctor to book an appointment.',
    };
  }

  return {
    title: `Book Appointment with ${doctor.fullName} | RAMS.com`,
    description: `Schedule an appointment with ${doctor.fullName}, a specialist in ${doctor.specialty}.`,
  };
}


function BookAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [doctor, setDoctor] = useState<DocumentData | null>(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const { toast } = useToast();
  
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId');

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorId) {
        setLoadingDoctor(false);
        return;
      }
      try {
        const docRef = doc(db, "users", doctorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDoctor(docSnap.data());
        } else {
          console.log("No such doctor!");
          toast({ title: "Doctor not found", variant: "destructive" });
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
        toast({ title: "Failed to load doctor details", variant: "destructive" });
      } finally {
        setLoadingDoctor(false);
      }
    };
    fetchDoctor();
  }, [doctorId, toast]);


  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: 'Incomplete Selection',
        description: 'Please select a date and a time slot to book an appointment.',
        variant: 'destructive',
      });
      return;
    }
     if (!doctorId || !doctor) {
      toast({
        title: 'Doctor Not Found',
        description: 'Cannot book appointment without a valid doctor.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsBooking(true);

    try {
        const patientName = 'Guest User'; // In a real app, patientId and name would come from auth state
        const appointmentData = {
            doctorId: doctorId,
            patientId: 'some-patient-id', 
            doctorName: doctor.fullName,
            patientName: patientName,
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            type: 'In-Clinic',
            status: 'Confirmed',
            createdAt: serverTimestamp()
        };

        await addDoc(collection(db, "appointments"), appointmentData);

        // Create a notification for the doctor
        await addDoc(collection(db, "notifications"), {
            userId: doctorId, // The ID of the user to notify
            title: "New Appointment Booked!",
            body: `${patientName} has booked an appointment with you for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
            type: "appointment_booked",
            isRead: false,
            createdAt: serverTimestamp()
        });

        toast({
            title: 'Appointment Booked!',
            description: `Your appointment with ${doctor.fullName} is confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
        });

    } catch (error) {
        console.error("Error booking appointment: ", error);
        toast({
            title: 'Booking Failed',
            description: 'Could not book the appointment. Please try again.',
            variant: 'destructive'
        });
    } finally {
        setIsBooking(false);
    }
  };

  const doctorImage = doctor?.image || placeholderImages['doctor-1'];

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
                <Button size="lg" className="bg-accent hover:bg-accent/90 h-12 text-lg" onClick={handleBooking} disabled={isBooking || loadingDoctor || !doctorId}>
                    {isBooking ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Confirming...
                        </>
                    ) : (
                        'Confirm Appointment'
                    )}
                </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
             <Card>
                {loadingDoctor ? (
                     <CardContent className="p-6 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        <p className="mt-2 text-sm text-muted-foreground">Loading doctor details...</p>
                    </CardContent>
                ) : doctor ? (
                    <>
                    <CardHeader className="items-center text-center">
                        <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                            <AvatarImage src={doctorImage.src} alt={doctor.fullName} data-ai-hint={doctorImage.hint}/>
                            <AvatarFallback>{doctor.fullName?.charAt(0) || 'D'}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{doctor.fullName}</CardTitle>
                        <CardDescription>{doctor.specialty}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                    <div className="flex items-center justify-center text-gray-500 my-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {doctor.location || 'Mumbai, IN'}
                        </div>
                        <div className="flex items-center justify-center gap-4 my-4">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                <span className="font-bold">{doctor.rating || 4.8}</span>
                                <span className="text-xs text-gray-500">({doctor.reviews || 120}+ reviews)</span>
                            </div>
                        </div>
                        <p className="text-center text-muted-foreground">
                            {doctor.bio || `A specialist in ${doctor.specialty} with several years of experience.`}
                        </p>
                    </CardContent>
                    </>
                ) : (
                     <CardContent className="p-6 text-center">
                        <p className="text-destructive">Could not load doctor details.</p>
                        <p className="text-sm text-muted-foreground">Please go back and select a doctor again.</p>
                    </CardContent>
                )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

const BookAppointmentPageWrapper = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <BookAppointmentPage />
  </React.Suspense>
);

export default BookAppointmentPageWrapper;

    