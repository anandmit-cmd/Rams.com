
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Star, MapPin, Navigation, Award } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { Badge } from '@/components/ui/badge';

const labs = [
  {
    id: '1',
    name: 'Metropolis Healthcare',
    location: 'Dadar, Mumbai',
    distance: '1.5 km',
    rating: 4.7,
    reviews: 1500,
    image: 'https://picsum.photos/seed/lab1/600/400',
    imageHint: 'modern lab interior',
    isOpen: true,
    rank: 'gold'
  },
  {
    id: '2',
    name: 'Dr. Lal PathLabs',
    location: 'Andheri, Mumbai',
    distance: '3.2 km',
    rating: 4.8,
    reviews: 2200,
    image: 'https://picsum.photos/seed/lab2/600/400',
    imageHint: 'lab collection center',
    isOpen: true,
    rank: 'silver'
  },
  {
    id: '3',
    name: 'Thyrocare Aarogyam',
    location: 'Thane, Mumbai',
    distance: '8.0 km',
    rating: 4.6,
    reviews: 950,
    image: 'https://picsum.photos/seed/lab3/600/400',
    imageHint: 'diagnostic lab building',
    isOpen: false,
    rank: 'bronze'
  },
];

const RankBadge = ({ rank }: { rank: 'gold' | 'silver' | 'bronze' }) => {
    const rankConfig = {
        gold: {
            label: 'Gold',
            className: 'bg-yellow-400 text-yellow-900 border-yellow-500',
            icon: <Award className="w-3 h-3" />
        },
        silver: {
            label: 'Silver',
            className: 'bg-slate-300 text-slate-800 border-slate-400',
            icon: <Award className="w-3 h-3" />
        },
        bronze: {
            label: 'Bronze',
            className: 'bg-amber-600 text-white border-amber-700',
            icon: <Award className="w-3 h-3" />
        }
    };
    const { label, className, icon } = rankConfig[rank];
    return (
        <Badge className={`absolute top-2 right-2 text-xs z-10 ${className}`}>
            {icon}
            {label}
        </Badge>
    );
};

export default function FindLabPage() {
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
                <CardTitle className="text-3xl font-bold">Find a Lab Near You</CardTitle>
                <CardDescription>Search for diagnostic centers for your lab tests.</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <label className="font-semibold text-sm">Lab Name or Location</label>
                <Input placeholder="e.g., Metropolis or Dadar" />
              </div>
              <Button className="h-10 bg-accent hover:bg-accent/90">
                <Search className="w-5 h-5 mr-2" />
                Search Labs
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labs.map((lab) => (
              <Card key={lab.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow relative">
                <div className="relative h-52">
                  <Image src={lab.image} alt={`Photo of ${lab.name}`} fill style={{ objectFit: 'cover' }} data-ai-hint={lab.imageHint} />
                  {lab.rank && <RankBadge rank={lab.rank as 'gold' | 'silver' | 'bronze'} />}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl text-gray-800">{lab.name}</h3>
                     <Badge variant={lab.isOpen ? 'default' : 'destructive'} className={`${lab.isOpen ? 'bg-green-600' : ''}`}>
                        {lab.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 my-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {lab.location}
                  </div>
                  <div className="flex items-center gap-4 my-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-bold">{lab.rating}</span>
                      <span className="text-xs text-gray-500">({lab.reviews} reviews)</span>
                    </div>
                     <Badge variant="secondary" className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        {lab.distance}
                    </Badge>
                  </div>
                  <Button asChild className="w-full mt-4 h-10">
                    <Link href={`/labs/${lab.id}`}>Select Lab</Link>
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
