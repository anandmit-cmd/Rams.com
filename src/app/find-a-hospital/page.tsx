
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Star, MapPin, BedDouble, ShieldAlert, HeartPulse, Baby, GitCommitVertical, User, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { RankBadge } from '@/components/rank-badge';
import placeholderImages from '@/lib/placeholder-images.json';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';


type Hospital = {
    id: string;
    hospitalName: string;
    location: string;
    rating: number;
    reviews: number;
    image: { src: string; hint: string; };
    bedsAvailable: number;
    tags: string[];
    rank: 'gold' | 'silver' | 'bronze';
};


const hospitalCategories = [
    { name: 'Emergency', icon: ShieldAlert },
    { name: 'Maternity', icon: GitCommitVertical },
    { name: 'Pediatrics', icon: Baby },
    { name: 'Heart Care', icon: HeartPulse },
    { name: 'Senior Care', icon: User },
];

export default function FindHospitalPage() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHospitals = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "users"), where("role", "==", "hospital"));
                const querySnapshot = await getDocs(q);
                const hospitalsData = querySnapshot.docs.map((doc, index) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        hospitalName: data.hospitalName,
                        location: data.address,
                        rating: data.rating || 4.7,
                        reviews: data.reviews || (Math.floor(Math.random() * 500) + 100),
                        image: placeholderImages[`hospital-${(index % 3) + 1}` as keyof typeof placeholderImages] || placeholderImages['hospital-1'],
                        bedsAvailable: data.bedsAvailable || (Math.floor(Math.random() * 20) + 5),
                        tags: data.tags || ['Multi-Specialty', '24/7 Emergency'],
                        rank: data.rank || 'bronze',
                    } as Hospital;
                });
                setHospitals(hospitalsData);
            } catch (error) {
                console.error("Error fetching hospitals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHospitals();
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

          {loading ? (
                <div className="flex justify-center items-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-4">Loading hospitals...</p>
                </div>
            ) : hospitals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hospitals.map((hospital) => (
                    <Card key={hospital.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow relative">
                        <div className="relative h-52">
                        <Image src={hospital.image.src} alt={`Photo of ${hospital.hospitalName}`} fill style={{ objectFit: 'cover' }} data-ai-hint={hospital.image.hint} />
                        {hospital.rank && <RankBadge rank={hospital.rank as 'gold' | 'silver' | 'bronze'} className="absolute top-2 right-2"/>}
                        </div>
                        <CardContent className="p-4">
                        <h3 className="font-bold text-xl text-gray-800">{hospital.hospitalName}</h3>
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
            ) : (
                <p className="text-center text-muted-foreground">No hospitals found.</p>
            )}
        </div>
      </main>
    </div>
  );
}

    