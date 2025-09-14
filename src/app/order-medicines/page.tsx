
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Truck, Store, ArrowLeft, FileUp, X, Minus, Plus } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import placeholderImages from '@/lib/placeholder-images.json';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const medicines = [
  { name: 'Paracetamol 500mg', description: 'For fever and pain relief', price: 25.50, image: placeholderImages['medicine-1'] },
  { name: 'Aspirin 75mg', description: 'Blood thinner, prevents clots', price: 15.00, image: placeholderImages['medicine-2'] },
  { name: 'Amoxicillin 250mg', description: 'Antibiotic for bacterial infections', price: 75.00, image: placeholderImages['medicine-3'] },
  { name: 'Cetirizine 10mg', description: 'For allergy relief', price: 30.00, image: placeholderImages['medicine-4'] },
  { name: 'Omeprazole 20mg', description: 'For acidity and heartburn', price: 45.00, image: placeholderImages['medicine-5'] },
  { name: 'Multivitamin Tablets', description: 'Supports overall health', price: 150.00, image: placeholderImages['medicine-6'] },
];

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: { src: string; hint: string };
};


export default function OrderMedicinesPage() {
    const { toast } = useToast();
    const [cart, setCart] = useState<CartItem[]>([]);

    const handleAddToCart = (medicine: typeof medicines[0]) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.name === medicine.name);
        if (existingItem) {
          return prevCart.map((item) =>
            item.name === medicine.name ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...medicine, quantity: 1 }];
        }
      });
      toast({
        title: `${medicine.name} added to cart!`,
        description: 'Your item has been successfully added.',
      });
    };
    
    const updateQuantity = (name: string, quantity: number) => {
        if (quantity < 1) {
            setCart(cart.filter(item => item.name !== name));
        } else {
            setCart(cart.map(item => item.name === name ? {...item, quantity} : item));
        }
    }

    const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);


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
         <div className="flex items-center gap-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        {totalCartItems > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">{totalCartItems}</Badge>}
                        <span className="sr-only">Open Cart</span>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Your Shopping Cart</SheetTitle>
                        <SheetDescription>Review your items before checking out.</SheetDescription>
                    </SheetHeader>
                    {cart.length > 0 ? (
                        <div className="flex flex-col h-full">
                            <div className="flex-1 overflow-y-auto -mx-6 px-6 divide-y">
                            {cart.map((item) => (
                                <div key={item.name} className="flex items-center gap-4 py-4">
                                     <Image src={item.image.src} alt={item.name} width={64} height={64} className="rounded-md" data-ai-hint={item.image.hint} />
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                                         <div className="flex items-center gap-2 mt-2">
                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.name, item.quantity - 1)}>
                                                <Minus className="w-3 h-3"/>
                                            </Button>
                                            <span>{item.quantity}</span>
                                             <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.name, item.quantity + 1)}>
                                                <Plus className="w-3 h-3"/>
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            </div>
                            <Separator className="my-4" />
                            <SheetFooter className="flex flex-col gap-4">
                                 <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <Button size="lg" className="w-full">Proceed to Checkout</Button>
                            </SheetFooter>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
                            <p className="font-semibold">Your cart is empty.</p>
                            <p className="text-sm text-muted-foreground">Add some items to get started.</p>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
            <Button asChild>
            <Link href="/dashboard/patient">My Dashboard</Link>
            </Button>
        </div>
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
                        </Header>
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
                  
                       <Button className="w-full mt-2" onClick={() => handleAddToCart(med)}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                  
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

