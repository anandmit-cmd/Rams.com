
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Star, MapPin, Navigation, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { RankBadge } from '@/components/rank-badge';
import placeholderImages from '@/lib/placeholder-images.json';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Lab = {
  id: string;
  labName: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  image: { src: string; hint: string; };
  isOpen: boolean;
  rank: 'gold' | 'silver' | 'bronze';
};

export default function FindLabPage() {
    const [labs, setLabs] = useState<Lab[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLabs = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "users"), where("role", "==", "lab"));
                const querySnapshot = await getDocs(q);
                const labsData = querySnapshot.docs.map((doc, index) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        labName: data.labName,
                        location: data.address,
                        distance: `${(Math.random() * 10).toFixed(1)} km`,
                        rating: data.rating || 4.7,
                        reviews: data.reviews || (Math.floor(Math.random() * 1000) + 200),
                        image: placeholderImages[`lab-${(index % 3) + 1}` as keyof typeof placeholderImages] || placeholderImages['lab-1'],
                        isOpen: data.isOpen !== undefined ? data.isOpen : Math.random() > 0.2,
                        rank: data.rank || 'bronze',
                    } as Lab;
                });
                setLabs(labsData);
            } catch (error) {
                console.error("Error fetching labs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLabs();
    }, []);


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

           {loading ? (
                <div className="flex justify-center items-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-4">Loading labs...</p>
                </div>
            ) : labs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {labs.map((lab) => (
                    <Card key={lab.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow relative">
                        <div className="relative h-52">
                        <Image src={lab.image.src} alt={`Photo of ${lab.labName}`} fill style={{ objectFit: 'cover' }} data-ai-hint={lab.image.hint} />
                        {lab.rank && <RankBadge rank={lab.rank as 'gold' | 'silver' | 'bronze'} className="absolute top-2 right-2"/>}
                        </div>
                        <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-xl text-gray-800">{lab.labName}</h3>
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
            ) : (
                <p className="text-center text-muted-foreground">No labs found.</p>
            )}
        </div>
      </main>
    </div>
  );
}
