
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Star, MapPin, Navigation } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { RankBadge } from '@/components/rank-badge';
import placeholderImages from '@/lib/placeholder-images.json';

const pharmacies = [
  {
    id: '1',
    name: 'City Medical Store',
    location: 'Andheri West, Mumbai',
    distance: '1.2 km',
    rating: 4.5,
    reviews: 250,
    image: placeholderImages['pharmacy-1'],
    isOpen: true,
    rank: 'gold'
  },
  {
    id: '2',
    name: 'Wellness Forever',
    location: 'Juhu, Mumbai',
    distance: '2.5 km',
    rating: 4.8,
    reviews: 800,
    image: placeholderImages['pharmacy-2'],
    isOpen: true,
    rank: 'silver'
  },
  {
    id: '3',
    name: 'Apollo Pharmacy',
    location: 'Bandra, Mumbai',
    distance: '4.0 km',
    rating: 4.7,
    reviews: 1200,
    image: placeholderImages['pharmacy-3'],
    isOpen: false,
    rank: 'bronze'
  },
];

export default function FindPharmacyPage() {
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
                <CardTitle className="text-3xl font-bold">Find a Pharmacy for Pickup</CardTitle>
                <CardDescription>Search for pharmacies near you to pick up your medicines.</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <label className="font-semibold text-sm">Pharmacy Name or Location</label>
                <Input placeholder="e.g., City Medical or Andheri" />
              </div>
              <Button className="h-10 bg-accent hover:bg-accent/90">
                <Search className="w-5 h-5 mr-2" />
                Search Pharmacies
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pharmacies.map((pharmacy) => (
              <Card key={pharmacy.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow relative">
                <div className="relative h-52">
                  <Image src={pharmacy.image.src} alt={`Photo of ${pharmacy.name}`} fill style={{ objectFit: 'cover' }} data-ai-hint={pharmacy.image.hint} />
                   {pharmacy.rank && <RankBadge rank={pharmacy.rank as 'gold' | 'silver' | 'bronze'} className="absolute top-2 right-2"/>}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl text-gray-800">{pharmacy.name}</h3>
                     <Badge variant={pharmacy.isOpen ? 'default' : 'destructive'} className={`${pharmacy.isOpen ? 'bg-green-600' : ''}`}>
                        {pharmacy.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 my-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {pharmacy.location}
                  </div>
                  <div className="flex items-center gap-4 my-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-bold">{pharmacy.rating}</span>
                      <span className="text-xs text-gray-500">({pharmacy.reviews} reviews)</span>
                    </div>
                     <Badge variant="secondary" className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        {pharmacy.distance}
                    </Badge>
                  </div>
                  <Button asChild className="w-full mt-4 h-10">
                    <Link href={`/pharmacies/${pharmacy.id}`}>Select Store</Link>
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
