
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Star, MapPin, BedDouble, ShieldAlert, HeartPulse, Baby, GitCommitVertical, User } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { RankBadge } from '@/components/rank-badge';
import placeholderImages from '@/lib/placeholder-images.json';

const hospitals = [
  {
    id: '1',
    name: 'Apollo Hospital',
    location: 'Mumbai, IN',
    rating: 4.9,
    reviews: 1800,
    image: placeholderImages['hospital-1'],
    bedsAvailable: 25,
    tags: ['Multi-Specialty', '24/7 Emergency'],
    rank: 'gold'
  },
  {
    id: '2',
    name: 'Fortis Hospital',
    location: 'Delhi, IN',
    rating: 4.8,
    reviews: 1500,
    image: placeholderImages['hospital-2'],
    bedsAvailable: 15,
    tags: ['Cardiac Care', 'Neurology'],
    rank: 'silver'
  },
  {
    id: '3',
    name: 'Manipal Hospital',
    location: 'Bangalore, IN',
    rating: 4.7,
    reviews: 1200,
    image: placeholderImages['hospital-3'],
    bedsAvailable: 30,
    tags: ['Cancer Care', 'Pediatrics'],
    rank: 'bronze'
  },
];

const hospitalCategories = [
    { name: 'Emergency', icon: ShieldAlert },
    { name: 'Maternity', icon: GitCommitVertical },
    { name: 'Pediatrics', icon: Baby },
    { name: 'Heart Care', icon: HeartPulse },
    { name: 'Senior Care', icon: User },
];

export default function FindHospitalPage() {
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
          <Card className="p-6 mb-12 shadow-lg">
            <CardHeader className="text-center p-0 mb-6">
                <CardTitle className="text-3xl font-bold">Find and Book a Hospital</CardTitle>
                <CardDescription>Search for hospitals based on your specific needs.</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <label className="font-semibold text-sm">Hospital Name or Location</label>
                <Input placeholder="e.g., Apollo Hospital or Mumbai" />
              </div>
              <Button className="h-10 bg-accent hover:bg-accent/90">
                <Search className="w-5 h-5 mr-2" />
                Search Hospitals
              </Button>
            </div>
             <div className="mt-6">
                <p className="text-sm font-semibold text-center mb-3">Or search by category:</p>
                <div className="flex flex-wrap justify-center gap-3">
                    {hospitalCategories.map((cat) => (
                        <Button key={cat.name} variant="outline" className="flex items-center gap-2">
                            <cat.icon className="w-5 h-5"/>
                            {cat.name}
                        </Button>
                    ))}
                </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospitals.map((hospital) => (
              <Card key={hospital.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow relative">
                <div className="relative h-52">
                  <Image src={hospital.image.src} alt={`Photo of ${hospital.name}`} fill style={{ objectFit: 'cover' }} data-ai-hint={hospital.image.hint} />
                   {hospital.rank && <RankBadge rank={hospital.rank as 'gold' | 'silver' | 'bronze'} className="absolute top-2 right-2"/>}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-xl text-gray-800">{hospital.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 my-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hospital.location}
                  </div>
                  <div className="flex items-center gap-4 my-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-bold">{hospital.rating}</span>
                      <span className="text-xs text-gray-500">({hospital.reviews} reviews)</span>
                    </div>
                     <Badge variant="secondary" className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-green-600" />
                        {hospital.bedsAvailable} Beds Available
                    </Badge>
                  </div>
                   <div className="flex flex-wrap gap-2 mb-4">
                        {hospital.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                    </div>
                  <Button asChild className="w-full mt-4 h-10">
                    <Link href={`/hospitals/${hospital.id}`}>View Details & Book</Link>
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
