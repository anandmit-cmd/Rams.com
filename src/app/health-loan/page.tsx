
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, BadgeIndianRupee, Percent, CheckCircle } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


const loanSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: z.string().min(10, "A valid 10-digit phone number is required."),
  loanAmount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive("Loan amount must be positive.")
  ),
  hospitalName: z.string().min(3, "Hospital name is required."),
});


export default function HealthLoanPage() {
    const { toast } = useToast();
    const heroImage = placeholderImages['health-loan-hero'];
    
    const form = useForm<z.infer<typeof loanSchema>>({
        resolver: zodResolver(loanSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            loanAmount: undefined,
            hospitalName: ""
        }
    });

    const onSubmit = (data: z.infer<typeof loanSchema>) => {
        console.log(data);
        toast({
            title: "Loan Application Submitted!",
            description: "Our team will contact you shortly to process your request.",
        });
        form.reset();
    };
    
    const loanFeatures = [
        {
            icon: CheckCircle,
            title: "Instant Approval",
            description: "Get your loan approved in minutes with minimal documentation."
        },
        {
            icon: Percent,
            title: "0% Interest EMI",
            description: "Enjoy no-cost EMI options on your medical treatments."
        },
        {
            icon: BadgeIndianRupee,
            title: "Flexible Repayment",
            description: "Choose a repayment tenure that suits your financial needs."
        }
    ];

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

      <main className="flex-1">
        <section className="py-12 md:py-20 bg-white">
             <div className="container mx-auto px-4 md:px-6">
                <Link href="/dashboard/patient" className="flex items-center text-sm text-primary mb-8 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-800">Don't Let Finances Delay Your Health</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Get instant loans for your medical treatments with flexible EMI options. Focus on your recovery, not the bills.
                        </p>
                        <div className="mt-8 space-y-6">
                            {loanFeatures.map((feature, index) => (
                                <div key={index} className="flex gap-4">
                                    <feature.icon className="w-8 h-8 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-bold text-lg">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                     <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl">Apply for a Health Loan</CardTitle>
                            <CardDescription>Fill this form to get a callback from our loan expert.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                     <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="Enter your 10-digit mobile number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="loanAmount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Loan Amount (₹)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="e.g., 50000" {...field} onChange={event => field.onChange(+event.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hospitalName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hospital Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter hospital name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" size="lg" className="w-full mt-4 bg-accent hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                                        {form.formState.isSubmitting ? 'Submitting...' : 'Apply Now'}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
