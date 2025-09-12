
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Search, TestTube, Home, Building, ArrowLeft, Calendar as CalendarIcon, FileUp } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';

const labTests = [
  { name: 'Complete Blood Count (CBC)', description: 'Measures different components of your blood.', price: 350.00, image: 'https://picsum.photos/seed/test1/300/200', imageHint: 'blood test tube' },
  { name: 'Lipid Profile', description: 'Measures cholesterol and triglyceride levels.', price: 600.00, image: 'https://picsum.photos/seed/test2/300/200', imageHint: 'lab analysis' },
  { name: 'Liver Function Test (LFT)', description: 'Assesses the health of your liver.', price: 800.00, image: 'https://picsum.photos/seed/test3/300/200', imageHint: 'medical lab equipment' },
  { name: 'Thyroid Function Test', description: 'Checks for thyroid gland problems.', price: 500.00, image: 'https://picsum.photos/seed/test4/300/200', imageHint: 'lab technician' },
  { name: 'Diabetes Test (HbA1c)', description: 'Monitors average blood sugar levels.', price: 450.00, image: 'https://picsum.photos/seed/test5/300/200', imageHint: 'blood sugar test' },
  { name: 'Vitamin D Test', description: 'Checks for Vitamin D deficiency.', price: 1200.00, image: 'https://picsum.photos/seed/test6/300/200', imageHint: 'health supplements' },
];

const timeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'
];

export default function BookLabTestPage() {
    const { toast } = useToast();
    const [selectedTest, setSelectedTest] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleScheduleHomeCollection = () => {
        if (!selectedDate || !selectedTime || !selectedTest) {
            toast({
                title: 'Incomplete Information',
                description: 'Please select a date and time for home collection.',
                variant: 'destructive',
            });
            return;
        }
        toast({
            title: 'Booking Confirmed',
            description: `A technician will visit you for ${selectedTest} on ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
        });
        setSelectedDate(new Date());
        setSelectedTime(null);
        setSelectedTest(null);
    };

    const handlePrescriptionUpload = () => {
        toast({
            title: 'Prescription Uploaded',
            description: 'Our team will review your prescription and contact you shortly to book the required tests.',
        });
    }

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
          <Card className="max-w-4xl mx-auto shadow-lg mb-8">
            <CardHeader>
              <Link href="/" className="flex items-center text-sm text-primary mb-4 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
              </Link>
              <CardTitle className="text-2xl md:text-3xl">Book a Lab Test</CardTitle>
              <CardDescription>Search for tests, or upload your prescription to book an appointment.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input type="search" placeholder="Search for a lab test..." className="w-full pl-10 h-12" />
                </div>
                 <Dialog>
                    <DialogTrigger asChild>
                         <Button variant="outline" className="w-full h-12 text-base border-dashed border-2">
                            <FileUp className="mr-2 h-5 w-5" />
                            Upload Prescription
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload Your Prescription</DialogTitle>
                            <DialogDescription>
                                Please upload a clear image of your prescription. Our experts will contact you to book the necessary tests.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <Input type="file" />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={handlePrescriptionUpload}>Upload & Submit</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labTests.map((test, index) => (
              <Card key={index} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image src={test.image} alt={test.name} fill style={{ objectFit: 'cover' }} data-ai-hint={test.imageHint} />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{test.name}</h3>
                  <p className="text-sm text-muted-foreground h-10">{test.description}</p>
                  <p className="font-bold text-xl my-2">₹{test.price.toFixed(2)}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                       <Button className="w-full mt-2" onClick={() => setSelectedTest(test.name)}>
                        <TestTube className="mr-2 h-4 w-4" /> Book Test
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Choose Collection Method</DialogTitle>
                        <DialogDescription>
                          How would you like to provide your sample for the {test.name}?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="h-24 flex-col gap-2">
                                    <Home className="w-8 h-8 text-primary"/>
                                    Home Collection
                                </Button>
                            </DialogTrigger>
                             <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                    <DialogTitle>Schedule Home Collection</DialogTitle>
                                    <DialogDescription>Select a date and time for sample collection from your home.</DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col md:flex-row gap-8 py-4">
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
                                        <h3 className="font-semibold mb-4">Available Slots for {selectedDate ? selectedDate.toLocaleDateString() : ''}</h3>
                                        <div className="grid grid-cols-2 gap-3">
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
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button onClick={handleScheduleHomeCollection} className="bg-accent hover:bg-accent/90">
                                            Confirm Schedule
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                         <DialogClose asChild>
                            <Link href="/find-lab" passHref>
                                <Button variant="outline" className="h-24 flex-col gap-2 w-full">
                                    <Building className="w-8 h-8 text-primary"/>
                                    Visit a Lab
                                </Button>
                            </Link>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
