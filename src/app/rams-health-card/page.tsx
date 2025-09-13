
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { ArrowLeft, ShieldCheck, Star, Check } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const plans = [
    {
        name: "Silver",
        price: 399,
        coverage: 1_00_000,
        features: [
            "Up to ₹1 Lakh Coverage",
            "Hospital Room Rent up to ₹2,000/day",
            "Free Health Check-up",
            "Doctor Consultation Discounts"
        ],
        isPopular: false
    },
    {
        name: "Gold",
        price: 599,
        coverage: 3_00_000,
        features: [
            "Up to ₹3 Lakh Coverage",
            "Any Hospital Room (up to Single Private A/C)",
            "2 Free Health Check-ups",
            "Unlimited Online Consultations",
            "Covers Pre & Post Hospitalization"
        ],
        isPopular: true
    },
    {
        name: "Platinum",
        price: 999,
        coverage: 5_00_000,
        features: [
            "Up to ₹5 Lakh Coverage",
            "No Room Rent Limit",
            "4 Free Premium Health Check-ups",
            "Unlimited In-clinic & Online Consultations",
            "International Coverage (excl. USA/Canada)",
            "Maternity Benefits Included"
        ],
        isPopular: false
    }
];


export default function RamsHealthCardPage() {
    const [selectedPlan, setSelectedPlan] = useState('Gold');
    const { toast } = useToast();

    const handleApply = (planName: string) => {
        toast({
            title: `Application for ${planName} Plan Started!`,
            description: "Please fill out the next form to complete your application.",
        });
        // Here you would typically navigate to a full application form
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

      <main className="flex-1">
        <section className="py-12 md:py-20 bg-white text-center">
             <div className="container mx-auto px-4 md:px-6">
                <Link href="/dashboard/patient" className="inline-flex items-center text-sm text-primary mb-8 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-800">Get Your RAMS Health Card Today</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                   Secure your health with affordable monthly plans. Get coverage for hospitalization, consultations, and more.
                </p>
            </div>
        </section>

        <section className="py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {plans.map(plan => (
                        <Card key={plan.name} className={cn(
                            "shadow-lg hover:shadow-2xl transition-all flex flex-col",
                            plan.isPopular ? "border-primary border-2 relative" : ""
                        )}>
                            {plan.isPopular && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <Star className="w-4 h-4" /> Most Popular
                                </div>
                            )}
                            <CardHeader className="text-center">
                                <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                                <p className="text-4xl font-extrabold text-primary">₹{plan.price}<span className="text-base font-medium text-muted-foreground">/month</span></p>
                                <p className="font-semibold text-accent">Up to ₹{plan.coverage.toLocaleString('en-IN')} Coverage</p>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <ul className="space-y-3 text-muted-foreground flex-1">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                 <Button 
                                    size="lg" 
                                    className="w-full mt-6" 
                                    variant={plan.isPopular ? 'default' : 'outline'}
                                    onClick={() => handleApply(plan.name)}
                                >
                                    Choose {plan.name} Plan
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
