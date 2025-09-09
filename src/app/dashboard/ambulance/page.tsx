
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Map, Siren, List, Bell, LogOut, LayoutGrid } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import Image from 'next/image';


export default function AmbulanceDashboard() {
  return (
    <div className="flex min-h-screen bg-secondary">
      <aside className="w-64 bg-white shadow-md flex-col hidden md:flex">
        <div className="p-6">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <AppLogo className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl text-gray-800">RAMS.com</span>
            </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground" prefetch={false}>
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Siren className="h-5 w-5" />
            Active Alerts
          </Link>
           <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <List className="h-5 w-5" />
            Trip History
          </Link>
        </nav>
        <div className="p-4 mt-auto">
             <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
                <LogOut className="h-5 w-5" />
                Logout
            </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Ambulance Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <Avatar>
              <AvatarImage src="https://picsum.photos/100/100?random=ambulance-driver" alt="Driver" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full">
                 <CardHeader>
                    <CardTitle>Live Map</CardTitle>
                    <CardDescription>Real-time location of active requests.</CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100%-4rem)]">
                    {/* Placeholder for a map component */}
                     <div className="w-full h-full bg-gray-200 rounded-lg relative overflow-hidden">
                        <Image src="https://picsum.photos/seed/map/1200/800" alt="Map" fill style={{ objectFit: 'cover' }} data-ai-hint="city map" />
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-black/50 text-white rounded-lg">
                            Map Area
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Emergency SOS</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 border-2 border-dashed border-red-500 rounded-lg text-center">
                        <Siren className="w-12 h-12 text-red-500 mx-auto mb-2" />
                        <h3 className="font-bold text-lg">New SOS Alert!</h3>
                        <p className="text-gray-600 text-sm">Near Andheri Station, Mumbai</p>
                        <p className="text-sm">ETA: 12 mins</p>
                        <div className="flex gap-2 mt-4">
                             <Button className="w-full bg-green-600 hover:bg-green-700">Accept</Button>
                             <Button className="w-full" variant="destructive">Decline</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Vehicle Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between"><span>Vehicle No:</span> <span className="font-semibold">MH 01 AB 1234</span></li>
                        <li className="flex justify-between"><span>Status:</span> <span className="font-semibold text-green-600">Available</span></li>
                        <li className="flex justify-between"><span>Driver:</span> <span className="font-semibold">Ramesh Kumar</span></li>
                        <li className="flex justify-between"><span>Trips Today:</span> <span className="font-semibold">3</span></li>
                    </ul>
                </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
