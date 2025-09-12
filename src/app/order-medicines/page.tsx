
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Truck, Store, ArrowLeft, FileUp } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import placeholderImages from '@/lib/placeholder-images.json';

const medicines = [
  { name: 'Paracetamol 500mg', description: 'For fever and pain relief', price: 25.50, image: placeholderImages['medicine-1'] },
  { name: 'Aspirin 75mg', description: 'Blood thinner, prevents clots', price: 15.00, image: placeholderImages['medicine-2'] },
  { name: 'Amoxicillin 250mg', description: 'Antibiotic for bacterial infections', price: 75.00, image: placeholderImages['medicine-3'] },
  { name: 'Cetirizine 10mg', description: 'For allergy relief', price: 30.00, image: placeholderImages['medicine-4'] },
  { name: 'Omeprazole 20mg', description: 'For acidity and heartburn', price: 45.00, image: placeholderImages['medicine-5'] },
  { name: 'Multivitamin Tablets', description: 'Supports overall health', price: 150.00, image: placeholderImages['medicine-6'] },
];

export default function OrderMedicinesPage() {
    const { toast } = useToast();

    const handleHomeDelivery = (medicineName: string) => {
        toast({
            title: 'Selection Confirmed',
            description: `You chose Home Delivery for ${medicineName}. The item has been added to your cart.`,
        });
    };

    const handlePrescriptionUpload = () => {
        toast({
            title: 'Prescription Uploaded',
            description: 'Our team will review your prescription and contact you shortly.',
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
              <CardTitle className="text-2xl md:text-3xl">Order Medicines Online</CardTitle>
              <CardDescription>Search for medicines, or upload your prescription to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input type="search" placeholder="Search for medicines..." className="w-full pl-10 h-12" />
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
                                Please upload a clear image of your prescription. Our experts will contact you shortly.
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
            {medicines.map((med, index) => (
              <Card key={index} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image src={med.image.src} alt={med.name} fill style={{ objectFit: 'cover' }} data-ai-hint={med.image.hint} />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{med.name}</h3>
                  <p className="text-sm text-muted-foreground h-10">{med.description}</p>
                  <p className="font-bold text-xl my-2">₹{med.price.toFixed(2)}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                       <Button className="w-full mt-2">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Choose Your Preference</DialogTitle>
                        <DialogDescription>
                          How would you like to receive {med.name}?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => handleHomeDelivery(med.name)}>
                                <Truck className="w-8 h-8 text-primary"/>
                                Home Delivery
                            </Button>
                        </DialogClose>
                         <DialogClose asChild>
                            <Link href="/find-pharmacy" passHref>
                                <Button variant="outline" className="h-24 flex-col gap-2 w-full">
                                    <Store className="w-8 h-8 text-primary"/>
                                    In-Store Pickup
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
