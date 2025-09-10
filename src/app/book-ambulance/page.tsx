
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { MapPin, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function BookAmbulancePage() {
  const [location, setLocation] = useState<string>('Mumbai, Maharashtra');
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const { toast } = useToast();

  const handleBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      toast({
        title: 'Ambulance Booked!',
        description: `An ambulance is on its way to ${location}. ETA: 12 minutes.`,
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
       <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <AppLogo className="w-8 h-8 text-primary" />
                <span className="font-bold text-xl text-gray-800">RAMS.com</span>
            </Link>
            <Button asChild>
                <Link href="/dashboard/patient">My Dashboard</Link>
            </Button>
        </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
            <Card className="max-w-3xl mx-auto shadow-lg">
              <CardHeader>
                 <Link href="/" className="flex items-center text-sm text-primary mb-4 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <CardTitle className="text-2xl md:text-3xl">Request an Ambulance</CardTitle>
                <CardDescription>Confirm your location to book an ambulance immediately.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-80 bg-gray-200 rounded-lg relative overflow-hidden mb-6">
                    <Image src="https://picsum.photos/seed/livemap/1200/800" alt="Live Map" fill style={{ objectFit: 'cover' }} data-ai-hint="city map location pin" />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <MapPin className="w-10 h-10 text-red-500" />
                    </div>
                </div>
                
                <div className="space-y-2 mb-6">
                    <label className="font-semibold text-sm">Your Location</label>
                    <div className="flex items-center gap-2 p-3 border rounded-md bg-white">
                        <MapPin className="w-5 h-5 text-primary" />
                        <p className="font-medium">{location}</p>
                    </div>
                     <p className="text-xs text-muted-foreground">The nearest ambulance will be dispatched to this location.</p>
                </div>

                <Button size="lg" className="w-full h-12 text-lg" onClick={handleBooking} disabled={isBooking}>
                    {isBooking ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Booking...
                        </>
                    ) : (
                        'Confirm & Book Ambulance'
                    )}
                </Button>
              </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
