
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, HeartPulse, BrainCircuit, Bone, Baby, Glasses, Stethoscope, Twitter, Facebook, Instagram, BadgeIndianRupee } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RankBadge } from '@/components/rank-badge';
import placeholderImages from '@/lib/placeholder-images.json';

const doctors = [
  {
    name: 'Dr. Anjali Sharma',
    specialty: 'Cardiologist',
    location: 'Mumbai, IN',
    rating: 4.8,
    reviews: 120,
    availability: 'Online',
    image: placeholderImages['doctor-1'],
    rank: 'gold',
    consultationFee: 1500,
  },
  {
    name: 'Dr. Vikram Singh',
    specialty: 'Neurologist',
    location: 'Delhi, IN',
    rating: 4.9,
    reviews: 98,
    availability: 'In-Clinic',
    image: placeholderImages['doctor-2'],
    rank: 'gold',
    consultationFee: 1800,
  },
  {
    name: 'Dr. Priya Patel',
    specialty: 'Orthopedic Surgeon',
    location: 'Bangalore, IN',
    rating: 4.7,
    reviews: 210,
    availability: 'Online',
    image: placeholderImages['doctor-3'],
    rank: 'silver',
    consultationFee: 1200,
  },
   {
    name: 'Dr. Rohan Mehra',
    specialty: 'Pediatrician',
    location: 'Chennai, IN',
    rating: 4.9,
    reviews: 150,
    availability: 'In-Clinic',
    image: placeholderImages['doctor-4'],
    rank: 'silver',
    consultationFee: 800,
  },
  {
    name: 'Dr. Sunita Desai',
    specialty: 'Ophthalmologist',
    location: 'Pune, IN',
    rating: 4.8,
    reviews: 85,
    availability: 'Online',
    image: placeholderImages['doctor-5'],
    rank: 'bronze',
    consultationFee: 1000,
  },
  {
    name: 'Dr. Sameer Joshi',
    specialty: 'General Medicine',
    location: 'Hyderabad, IN',
    rating: 4.6,
    reviews: 300,
    availability: 'In-Clinic',
    image: placeholderImages['doctor-6'],
    rank: 'bronze',
    consultationFee: 750,
  },
];


const specialties = [
  { name: 'Cardiology', icon: HeartPulse },
  { name: 'Neurology', icon: BrainCircuit },
  { name: 'Orthopedics', icon: Bone },
  { name: 'Pediatrics', icon: Baby },
  { name: 'Ophthalmology', icon: Glasses },
  { name: 'General Medicine', icon: Stethoscope },
];

export default function FindDoctorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
        <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <AppLogo className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl text-gray-800">RAMS.com</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
            <Link href="/find-a-doctor" className="text-sm font-medium text-primary" prefetch={false}>
                Find a Doctor
            </Link>
             <Link href="/find-a-hospital" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
                Find a Hospital
            </Link>
            <Link href="/wellness" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
                Wellness
            </Link>
            <Link href="/for-providers" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
                For Providers
            </Link>
            </nav>
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <Globe className="w-5 h-5 mr-2" />
                        Language
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuItem>English</DropdownMenuItem>
                    <DropdownMenuItem>हिन्दी</DropdownMenuItem>
                    <DropdownMenuItem>मराठी</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                 <Button asChild className="bg-accent hover:bg-accent/90">
                    <Link href="/register">Register</Link>
                </Button>
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        </header>

        <main className="flex-1 py-12">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="p-6 mb-12 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                            <label className="font-semibold text-sm">Symptom or Specialty</label>
                            <Input placeholder="e.g., Cardiology" />
                        </div>
                        <div className="space-y-2">
                             <label className="font-semibold text-sm">Location</label>
                            <Input placeholder="e.g., Mumbai" />
                        </div>
                        <div className="space-y-2">
                            <label className="font-semibold text-sm">Consultation Type</label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Online/In-clinic" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="in-clinic">In-clinic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="h-10 bg-accent hover:bg-accent/90">
                            <Search className="w-5 h-5 mr-2" />
                            Search Doctors
                        </Button>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor, index) => (
                        <Card key={index} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                            <div className="relative h-52">
                                <Image src={doctor.image.src} alt={`Photo of ${'doctor.name'}`} fill style={{ objectFit: 'cover' }} data-ai-hint={doctor.image.hint} />
                                 {doctor.rank && <RankBadge rank={doctor.rank as 'gold' | 'silver' | 'bronze'} className="absolute top-2 right-2"/>}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-xl text-gray-800">{doctor.name}</h3>
                                <p className="text-primary font-semibold">{doctor.specialty}</p>
                                <div className="flex items-center text-sm text-gray-500 my-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {doctor.location}
                                </div>
                                <div className="flex items-center gap-4 my-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="font-bold">{doctor.rating}</span>
                                        <span className="text-xs text-gray-500">({doctor.reviews} reviews)</span>
                                    </div>
                                    <Badge variant={doctor.availability === 'Online' ? 'default' : 'secondary'} className={`${doctor.availability === 'Online' ? 'bg-green-100 text-green-800' : ''}`}>
                                        {doctor.availability}
                                    </Badge>
                                </div>
                                 <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                    <div className="flex items-center font-bold text-lg">
                                        <BadgeIndianRupee className="w-5 h-5 mr-1"/>
                                        {doctor.consultationFee}
                                    </div>
                                    <Button asChild className="h-10">
                                        <Link href="/book-appointment">Book Appointment</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <section className="py-16 mt-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Browse by Specialty</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {specialties.map(spec => (
                            <Card key={spec.name} className="flex flex-col items-center justify-center p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            <spec.icon className="w-10 h-10 text-primary mb-2" />
                            <p className="font-semibold text-center text-gray-800">{spec.name}</p>
                            </Card>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <Button asChild variant="outline">
                            <Link href="/specialties">View All Specialties</Link>
                        </Button>
                    </div>
                </section>

            </div>
        </main>
        
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid gap-8 grid-cols-2 md:grid-cols-5">
                     <div className="col-span-2 md:col-span-1">
                        <h3 className="font-bold text-lg mb-2">RAMS.com</h3>
                        <p className="text-gray-400 text-sm">Your health companion.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-3">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-gray-400 hover:text-white" prefetch={false}>About Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Careers</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Press</Link></li>
                            <li><Link href="/for-providers" className="text-gray-400 hover:text-white" prefetch={false}>For Providers</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-3">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Blog</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Help Center</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Contact Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Privacy Policy</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-3">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="text-gray-400 hover:text-white" prefetch={false}>AI Checker</Link></li>
                            <li><Link href="/find-a-doctor" className="text-gray-400 hover:text-white" prefetch={false}>Find a Doctor</Link></li>
                             <li><Link href="/find-a-hospital" className="text-gray-400 hover:text-white" prefetch={false}>Find a Hospital</Link></li>
                            <li><Link href="/wellness" className="text-gray-400 hover:text-white" prefetch={false}>Wellness</Link></li>
                            <li><Link href="/book-ambulance" className="text-gray-400 hover:text-white" prefetch={false}>Emergency</Link></li>
                        </ul>
                    </div>
                     <div className="col-span-2 md:col-span-1">
                        <h4 className="font-semibold mb-3">Follow Us</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-400 hover:text-white" prefetch={false}><Twitter /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white" prefetch={false}><Facebook /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white" prefetch={false}><Instagram /></Link>
                        </div>
                    </div>
                </div>
                 <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
                    <p>© 2025 RAMS.com. All rights reserved.</p>
                </div>
            </div>
      </footer>
    </div>
  );
}
