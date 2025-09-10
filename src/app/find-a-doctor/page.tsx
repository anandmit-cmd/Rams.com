
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, HeartPulse, BrainCircuit, Bone, Baby, Glasses, Stethoscope, Hospital } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Anjali Sharma',
    specialty: 'Cardiologist',
    location: 'Mumbai, IN',
    rating: 4.8,
    reviews: 120,
    availability: 'Online',
    image: 'https://picsum.photos/300/200?random=1',
    imageHint: 'doctor portrait'
  },
  {
    name: 'Dr. Vikram Singh',
    specialty: 'Neurologist',
    location: 'Delhi, IN',
    rating: 4.9,
    reviews: 98,
    availability: 'In-Clinic',
    image: 'https://picsum.photos/300/200?random=2',
    imageHint: 'doctor smiling'
  },
  {
    name: 'Dr. Priya Patel',
    specialty: 'Orthopedic Surgeon',
    location: 'Bangalore, IN',
    rating: 4.7,
    reviews: 210,
    availability: 'Online',
    image: 'https://picsum.photos/300/200?random=3',
    imageHint: 'female doctor'
  },
   {
    name: 'Dr. Rohan Mehra',
    specialty: 'Pediatrician',
    location: 'Chennai, IN',
    rating: 4.9,
    reviews: 150,
    availability: 'In-Clinic',
    image: 'https://picsum.photos/300/200?random=4',
    imageHint: 'male doctor'
  },
  {
    name: 'Dr. Sunita Desai',
    specialty: 'Ophthalmologist',
    location: 'Pune, IN',
    rating: 4.8,
    reviews: 85,
    availability: 'Online',
    image: 'https://picsum.photos/300/200?random=5',
    imageHint: 'doctor glasses'
  },
  {
    name: 'Dr. Sameer Joshi',
    specialty: 'General Medicine',
    location: 'Hyderabad, IN',
    rating: 4.6,
    reviews: 300,
    availability: 'In-Clinic',
    image: 'https://picsum.photos/300/200?random=6',
    imageHint: 'doctor friendly'
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
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
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
                 <Button asChild>
                    <Link href="/register">Register</Link>
                </Button>
                <Button variant="link" asChild className="text-primary">
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
                            <div className="relative h-48">
                                <Image src={doctor.image} alt={`Photo of ${doctor.name}`} fill style={{ objectFit: 'cover' }} data-ai-hint={doctor.imageHint} />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-xl text-gray-800">{doctor.name}</h3>
                                <p className="text-primary font-semibold">{doctor.specialty}</p>
                                <div className="flex items-center text-sm text-gray-500 my-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {doctor.location}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="font-bold">{doctor.rating}</span>
                                        <span className="text-xs text-gray-500">({doctor.reviews} reviews)</span>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${doctor.availability === 'Online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {doctor.availability}
                                    </span>
                                </div>
                                <Button asChild className="w-full mt-4 h-10">
                                    <Link href="/book-appointment">Book Appointment</Link>
                                </Button>
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
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>About Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Careers</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Press</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>For Providers</Link></li>
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
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>AI Checker</Link></li>
                            <li><Link href="/find-a-doctor" className="text-gray-400 hover:text-white" prefetch={false}>Find a Doctor</Link></li>
                             <li><Link href="/find-a-hospital" className="text-gray-400 hover:text-white" prefetch={false}>Find a Hospital</Link></li>
                            <li><Link href="/wellness" className="text-gray-400 hover:text-white" prefetch={false}>Wellness</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Emergency</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
      </footer>
    </div>
  );
}

