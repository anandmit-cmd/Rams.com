
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AppLogo } from '@/components/icons';
import { ArrowLeft } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, type Auth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

const formSchema = z.object({
  pharmacyName: z.string().min(2, "Pharmacy name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number is required."),
  address: z.string().min(10, "Address is required."),
  licenseNumber: z.string().min(5, "License number is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

function PharmacyRegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [authInstance, setAuthInstance] = React.useState<Auth | null>(null);

  React.useEffect(() => {
    setAuthInstance(auth);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pharmacyName: "",
      email: "",
      phone: "",
      address: "",
      licenseNumber: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!authInstance) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(authInstance, values.email, values.password);
      console.log("Pharmacy registered:", userCredential.user);
      // TODO: Save pharmacy-specific data to Firestore
      toast({
        title: "Registration Successful",
        description: "Your account has been created.",
      });
      router.push('/dashboard/pharmacy');
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred.",
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
       <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <AppLogo className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl text-gray-800">RAMS.com</span>
        </Link>
        <Button asChild variant="outline">
          <Link href="/login">Login</Link>
        </Button>
      </header>
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <Button asChild variant="ghost" className="absolute top-6 left-6">
                <Link href="/register"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
              </Button>
              <CardTitle className="text-2xl font-bold text-center pt-8">Pharmacy Registration</CardTitle>
              <CardDescription className="text-center">Register your pharmacy to manage orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="pharmacyName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pharmacy Name</FormLabel>
                      <FormControl><Input placeholder="City Medical Store" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Address</FormLabel>
                      <FormControl><Input placeholder="123, Main Street, City" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="contact@citymedical.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl><Input type="tel" placeholder="+91 12345 67890" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="licenseNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pharmacy License Number</FormLabel>
                      <FormControl><Input placeholder="LIC-12345" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 h-11" disabled={form.formState.isSubmitting || !authInstance}>
                    {form.formState.isSubmitting ? 'Registering...' : 'Register Pharmacy'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

import dynamic from 'next/dynamic';

export default dynamic(() => Promise.resolve(PharmacyRegisterPage), {
  ssr: false,
});
