
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
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import React from 'react';


const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [authInstance, setAuthInstance] = React.useState<Auth | null>(null);

  React.useEffect(() => {
    setAuthInstance(auth);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!authInstance) return;
    try {
      await signInWithEmailAndPassword(authInstance, values.email, values.password);
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });
      // TODO: Implement role-based redirection
      router.push('/dashboard/patient');
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
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
        <Button asChild>
            <Link href="/register">Register</Link>
        </Button>
      </header>
      <main className="flex-1 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">Login to your RAMS.com account</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 h-11" disabled={form.formState.isSubmitting || !authInstance}>
                    {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </Form>
              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account? <Link href="/register" className="text-primary hover:underline">Register here</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

import dynamic from 'next/dynamic';

export default dynamic(() => Promise.resolve(LoginPage), {
  ssr: false,
});
