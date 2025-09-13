
'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppLogo } from '@/components/icons';
import { Star, MapPin, Phone, ShieldCheck, Wifi, Utensils, Car, Bed, BadgeIndianRupee, ArrowLeft } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import placeholderImages from '@/lib/placeholder-images.json';

const hospitalData = {
    id: '1',
    name: 'Apollo Hospital, Mumbai',
    images: [
        placeholderImages['hospital-gallery-1'],
        placeholderImages['hospital-gallery-2'],
        placeholderImages['hospital-gallery-3'],
        placeholderImages['hospital-gallery-4'],
    ],
    rating: 4.9,
    reviews: 1800,
    address: '123, Health Street, Andheri, Mumbai, Maharashtra',
    phone: '+91 22 1234 5678',
    description: 'Apollo Hospital is a state-of-the-art multi-specialty hospital committed to providing the best healthcare services. With a team of renowned doctors and advanced technology, we offer comprehensive care across various disciplines.',
    facilities: [
        { name: '24/7 Pharmacy', icon: ShieldCheck },
        { name: 'Free WiFi', icon: Wifi },
        { name: 'Cafeteria', icon: Utensils },
        { name: 'Parking Available', icon: Car },
    ],
    doctors: [
        { name: 'Dr. Anjali Sharma', specialty: 'Cardiologist', image: placeholderImages['doctor-avatar-1'] },
        { name: 'Dr. Vikram Singh', specialty: 'Neurologist', image: placeholderImages['doctor-avatar-2'] },
        { name: 'Dr. Priya Patel', specialty: 'Orthopedic Surgeon', image: placeholderImages['doctor-avatar-3'] },
    ],
    bedOptions: [
        { type: 'General Ward', price: 2500, features: 'Shared room, basic amenities' },
        { type: 'Semi-Private Room', price: 5000, features: 'Two beds, TV, attached bath' },
        { type: 'Private Room', price: 8000, features: 'Single bed, TV, AC, attendant couch' },
        { type: 'Deluxe Room', price: 12000, features: 'Premium amenities, spacious, mini-fridge' },
        { type: 'ICU', price: 15000, features: 'Intensive care unit with advanced monitoring' },
    ],
    surgeryPackages: [
        { name: 'Cataract Surgery', price: 40000 },
        { name: 'Knee Replacement', price: 250000 },
        { name: 'Angioplasty', price: 350000 },
    ]
};

export default function HospitalDetailPage({ params }: { params: { id: string } }) {
    
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
       <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <AppLogo className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl text-gray-800">RAMS.com</span>
        </Link>
        <Button asChild variant="outline">
            <Link href="/find-a-hospital" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Hospitals
            </Link>
        </Button>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">

            <Carousel className="w-full max-w-4xl mx-auto mb-8"
              opts={{
                align: "start",
                loop: true,
              }}
            >
                <CarouselContent>
                    {hospitalData.images.map((img, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-[16/9] items-center justify-center p-0 relative overflow-hidden rounded-lg">
                                 <Image src={img.src} alt={`${hospitalData.name} - Image ${index + 1}`} fill style={{ objectFit: 'cover' }} data-ai-hint={img.hint}/>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-50px] hidden sm:flex" />
                <CarouselNext className="right-[-50px] hidden sm:flex" />
            </Carousel>
          
          <Card className="max-w-4xl mx-auto shadow-xl">
            <CardHeader className="border-b">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                        <CardTitle className="text-3xl font-bold">{hospitalData.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            {hospitalData.address}
                        </div>
                    </div>
                     <div className="flex items-center gap-1 mt-4 md:mt-0">
                        <Star className="w-6 h-6 text-yellow-400 fill-current" />
                        <span className="font-bold text-xl">{hospitalData.rating}</span>
                        <span className="text-sm text-gray-500">({hospitalData.reviews} reviews)</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="doctors">Doctors</TabsTrigger>
                        <TabsTrigger value="beds">Bed & Pricing</TabsTrigger>
                        <TabsTrigger value="packages">Packages</TabsTrigger>
                    </TabsList>
                    <div className="p-6">
                        <TabsContent value="overview">
                           <h3 className="font-bold text-lg mb-4">About the Hospital</h3>
                           <p className="text-muted-foreground mb-6">{hospitalData.description}</p>
                           <h3 className="font-bold text-lg mb-4">Facilities</h3>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {hospitalData.facilities.map(facility => (
                                    <div key={facility.name} className="flex items-center gap-2 text-sm">
                                        <facility.icon className="w-5 h-5 text-primary" />
                                        <span>{facility.name}</span>
                                    </div>
                                ))}
                           </div>
                        </TabsContent>
                        <TabsContent value="doctors">
                            <h3 className="font-bold text-lg mb-4">Our Specialists</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {hospitalData.doctors.map(doctor => (
                                    <Card key={doctor.name}>
                                        <CardContent className="p-4 flex items-center gap-4">
                                             <Avatar className="w-16 h-16">
                                                <AvatarImage src={doctor.image.src} alt={doctor.name} data-ai-hint={doctor.image.hint} />
                                                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{doctor.name}</p>
                                                <p className="text-sm text-primary">{doctor.specialty}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="beds">
                             <h3 className="font-bold text-lg mb-4">Bed Availability & Pricing</h3>
                             <div className="space-y-4">
                                {hospitalData.bedOptions.map(bed => (
                                    <Card key={bed.type} className="flex flex-col md:flex-row items-start justify-between p-4">
                                        <div className="mb-4 md:mb-0">
                                            <p className="font-semibold flex items-center gap-2"><Bed className="w-5 h-5 text-primary"/> {bed.type}</p>
                                            <p className="text-sm text-muted-foreground mt-1">{bed.features}</p>
                                        </div>
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <p className="font-bold text-lg flex items-center"><BadgeIndianRupee className="w-5 h-5 mr-1"/>{bed.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground ml-1">/night</span></p>
                                            <Button>Book Now</Button>
                                        </div>
                                    </Card>
                                ))}
                             </div>
                        </TabsContent>
                         <TabsContent value="packages">
                             <h3 className="font-bold text-lg mb-4">Surgery & Operation Packages</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {hospitalData.surgeryPackages.map(pkg => (
                                    <Card key={pkg.name}>
                                        <CardHeader>
                                            <CardTitle className="text-xl">{pkg.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="font-bold text-2xl mb-4 flex items-center"><BadgeIndianRupee className="w-6 h-6 mr-1"/>{pkg.price.toLocaleString()}</p>
                                            <Button variant="outline" className="w-full">Enquire Now</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                             </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

    