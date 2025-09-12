
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { MapPin, ArrowLeft, Loader2, Hospital, Siren, Plus, HeartPulse, BadgeIndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const ambulanceTypes = [
  {
    type: 'basic',
    name: 'Basic Life Support (BLS)',
    description: 'For non-emergency transport, stable patients.',
    icon: Siren,
    baseFare: 500,
    perKm: 20,
  },
  {
    type: 'advanced',
    name: 'Advanced Life Support (ALS)',
    description: 'Equipped with advanced medical tools for critical patients.',
    icon: Plus,
    baseFare: 1000,
    perKm: 35,
  },
  {
    type: 'cardiac',
    name: 'Cardiac Ambulance',
    description: 'Specialized for heart patients with a defibrillator and ECG.',
    icon: HeartPulse,
    baseFare: 1500,
    perKm: 45,
  },
];


export default function BookAmbulancePage() {
  const [pickupLocation, setPickupLocation] = useState<string>('Current Location, Mumbai');
  const [destination, setDestination] = useState<string>('');
  const [selectedAmbulance, setSelectedAmbulance] = useState<string>('basic');
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const { toast } = useToast();
  
  const estimatedDistance = 12; // Dummy distance in km for calculation
  const selectedTypeData = ambulanceTypes.find(a => a.type === selectedAmbulance);
  const estimatedFare = selectedTypeData ? selectedTypeData.baseFare + selectedTypeData.perKm * estimatedDistance : 0;

  const handleBooking = () => {
    if(!destination) {
        toast({
            title: 'Destination Required',
            description: 'Please enter a destination hospital.',
            variant: 'destructive'
        })
        return;
    }
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      toast({
        title: 'Ambulance Booked!',
        description: `A ${selectedTypeData?.name} is on its way. Your registered emergency contact has also been notified.`,
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
                <CardDescription>Enter your details to book an ambulance immediately.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">

                <div>
                    <Label className="font-semibold">Pickup Location</Label>
                     <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <Input value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
                    </div>
                </div>

                 <div>
                    <Label className="font-semibold">Destination Hospital</Label>
                    <div className="flex items-center gap-2 mt-2">
                        <Hospital className="w-5 h-5 text-primary" />
                        <Input placeholder="Enter destination hospital or address" value={destination} onChange={(e) => setDestination(e.target.value)} />
                    </div>
                </div>

                <div>
                    <Label className="font-semibold mb-4 block">Select Ambulance Type</Label>
                     <RadioGroup value={selectedAmbulance} onValueChange={setSelectedAmbulance} className="space-y-4">
                      {ambulanceTypes.map((ambulance) => (
                        <Label key={ambulance.type} htmlFor={ambulance.type} className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                          <RadioGroupItem value={ambulance.type} id={ambulance.type} />
                          <ambulance.icon className="w-8 h-8 text-primary" />
                          <div className="flex-1">
                            <p className="font-bold">{ambulance.name}</p>
                            <p className="text-sm text-muted-foreground">{ambulance.description}</p>
                          </div>
                           <div className="text-right">
                              <p className="font-bold text-lg">₹{ambulance.baseFare}</p>
                              <p className="text-xs text-muted-foreground">+ ₹{ambulance.perKm}/km</p>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                </div>
                
                 <Card className="bg-secondary p-4">
                    <CardHeader className="p-2">
                        <CardTitle className="text-lg">Fare Estimate</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 space-y-2 text-sm">
                        <div className="flex justify-between"><span>Base Fare:</span> <span className="font-medium">₹{selectedTypeData?.baseFare.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Distance (approx):</span> <span className="font-medium">{estimatedDistance} km</span></div>
                        <div className="flex justify-between"><span>Distance Charge:</span> <span className="font-medium">₹{(selectedTypeData ? selectedTypeData.perKm * estimatedDistance : 0).toFixed(2)}</span></div>
                         <div className="flex justify-between font-bold text-base border-t pt-2 mt-2"><span>Estimated Total:</span> <span>₹{estimatedFare.toFixed(2)}</span></div>
                    </CardContent>
                </Card>

                <Button size="lg" className="w-full h-12 text-lg bg-accent hover:bg-accent/90" onClick={handleBooking} disabled={isBooking}>
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
