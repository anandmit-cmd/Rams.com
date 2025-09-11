
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, HeartPulse, BrainCircuit, Bone, Baby, Glasses, Stethoscope, Ear, Brain, Activity, User, Syringe, Shield, Microscope, Dumbbell } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { useState } from 'react';

const allSpecialties = [
    { name: 'Cardiology', icon: HeartPulse },
    { name: 'Neurology', icon: BrainCircuit },
    { name: 'Orthopedics', icon: Bone },
    { name: 'Pediatrics', icon: Baby },
    { name: 'Ophthalmology', icon: Glasses },
    { name: 'General Medicine', icon: Stethoscope },
    { name: 'Dermatology', icon: User },
    { name: 'ENT Specialist', icon: Ear },
    { name: 'Gastroenterology', icon: Activity },
    { name: 'Urology', icon: Shield },
    { name: 'Psychiatry', icon: Brain },
    { name: 'Oncology', icon: Stethoscope }, // No direct icon, using generic
    { name: 'Endocrinology', icon: Activity },
    { name: 'Pulmonology', icon: Activity },
    { name: 'Nephrology', icon: Stethoscope }, // No direct icon, using generic
    { name: 'Rheumatology', icon: Bone },
    { name: 'Gynecology', icon: User },
    { name: 'Dentistry', icon: Stethoscope }, // No direct icon, using generic
    { name: 'Anesthesiology', icon: Syringe },
    { name: 'Radiology', icon: Microscope },
    { name: 'Pathology', icon: Microscope },
    { name: 'General Surgery', icon: Stethoscope }, // No direct icon, using generic
    { name: 'Plastic Surgery', icon: Stethoscope }, // No direct icon, using generic
    { name: 'Physiotherapy', icon: Dumbbell },
];


export default function SpecialtiesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSpecialties = allSpecialties.filter(spec =>
        spec.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
        <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <AppLogo className="w-8 h-8 text-primary" />
                <span className="font-bold text-xl text-gray-800">RAMS.com</span>
            </Link>
            <Button asChild>
                <Link href="/find-a-doctor">Find a Doctor</Link>
            </Button>
        </header>

        <main className="flex-1 py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tighter text-gray-800">All Medical Specialties</h1>
                    <p className="mt-2 text-gray-500">Find the right specialist for your healthcare needs.</p>
                </div>

                <div className="max-w-xl mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search for a specialty..."
                            className="w-full pl-10 h-12"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {filteredSpecialties.map(spec => (
                        <Link href="/find-a-doctor" key={spec.name}>
                             <Card  className="flex flex-col items-center justify-center p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
                                <spec.icon className="w-12 h-12 text-primary mb-3" />
                                <p className="font-semibold text-center text-gray-800">{spec.name}</p>
                            </Card>
                        </Link>
                    ))}
                </div>

                {filteredSpecialties.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-lg text-gray-500">No specialties found for "{searchQuery}".</p>
                    </div>
                )}

            </div>
        </main>
        
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 md:px-6 py-12">
                 <div className="text-center text-gray-400 text-sm">
                    <p>© 2025 RAMS.com. All rights reserved.</p>
                </div>
            </div>
      </footer>
    </div>
  );
}
