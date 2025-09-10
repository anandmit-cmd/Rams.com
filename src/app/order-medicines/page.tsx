
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Truck, Store, ArrowLeft } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const medicines = [
  { name: 'Paracetamol 500mg', description: 'For fever and pain relief', price: 25.50, image: 'https://picsum.photos/seed/med1/300/200', imageHint: 'medicine tablets' },
  { name: 'Aspirin 75mg', description: 'Blood thinner, prevents clots', price: 15.00, image: 'https://picsum.photos/seed/med2/300/200', imageHint: 'medicine pills' },
  { name: 'Amoxicillin 250mg', description: 'Antibiotic for bacterial infections', price: 75.00, image: 'https://picsum.photos/seed/med3/300/200', imageHint: 'medicine capsules' },
  { name: 'Cetirizine 10mg', description: 'For allergy relief', price: 30.00, image: 'https://picsum.photos/seed/med4/300/200', imageHint: 'allergy pills' },
  { name: 'Omeprazole 20mg', description: 'For acidity and heartburn', price: 45.00, image: 'https://picsum.photos/seed/med5/300/200', imageHint: 'antacid tablets' },
  { name: 'Multivitamin Tablets', description: 'Supports overall health', price: 150.00, image: 'https://picsum.photos/seed/med6/300/200', imageHint: 'vitamin supplements' },
];

export default function OrderMedicinesPage() {
    const { toast } = useToast();

    const handleDeliveryChoice = (choice: 'delivery' | 'pickup', medicineName: string) => {
        toast({
            title: 'Selection Confirmed',
            description: `You chose ${choice === 'delivery' ? 'Home Delivery' : 'In-Store Pickup'} for ${medicineName}.`,
        });
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
          <Card className="max-w-4xl mx-auto shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Order Medicines Online</CardTitle>
              <CardDescription>Search for medicines and get them delivered to your doorstep.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input type="search" placeholder="Search for medicines..." className="w-full pl-10 h-12" />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicines.map((med, index) => (
              <Card key={index} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image src={med.image} alt={med.name} fill style={{ objectFit: 'cover' }} data-ai-hint={med.imageHint} />
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
                            <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => handleDeliveryChoice('delivery', med.name)}>
                                <Truck className="w-8 h-8 text-primary"/>
                                Home Delivery
                            </Button>
                        </DialogClose>
                         <DialogClose asChild>
                            <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => handleDeliveryChoice('pickup', med.name)}>
                                <Store className="w-8 h-8 text-primary"/>
                                In-Store Pickup
                            </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>

           <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href="/" className="flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
}
