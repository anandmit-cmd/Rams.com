
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Map, Siren, List, Bell, LogOut, LayoutGrid, Star, BarChart2, CheckCircle, XCircle } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';


export default function AmbulanceDashboard() {
  const driverAvatar = placeholderImages['ambulance-driver-avatar'];
  const liveMap = placeholderImages['live-map'];
  const [showSos, setShowSos] = useState(true);
  const { toast } = useToast();

  const handleSosAction = (accepted: boolean) => {
    if (accepted) {
        toast({
            title: "Alert Accepted!",
            description: "Patient and hospital have been notified. Navigate to the location immediately.",
        });
    } else {
        toast({
            title: "Alert Declined",
            description: "The alert has been passed to the next available unit.",
            variant: "destructive"
        })
    }
    setShowSos(false);
  }

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
          <Link href="/dashboard/ambulance" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground" prefetch={false}>
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Siren className="h-5 w-5" />
            Active Alerts
          </Link>
           <Link href="/dashboard/ambulance/trip-history" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
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
            <Button variant="ghost" size="icon">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src={driverAvatar.src} data-ai-hint={driverAvatar.hint} alt="Driver" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
                        <BarChart2 className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹2,450</div>
                        <p className="text-xs text-muted-foreground">From 5 completed trips</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Trips Today</CardTitle>
                        <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Successfully completed</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Cancelled Trips</CardTitle>
                        <XCircle className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground">Cancelled by patient</p>
                    </CardContent>
                </Card>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Live Map</CardTitle>
                        <CardDescription>Real-time location of active requests.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-4rem)]">
                        <div className="w-full h-full bg-gray-200 rounded-lg relative overflow-hidden">
                            <Image src={liveMap.src} alt="Map" fill style={{ objectFit: 'cover' }} data-ai-hint={liveMap.hint} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-black/50 text-white rounded-lg">
                                Map Area
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
               {showSos && (
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
                                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleSosAction(true)}>Accept</Button>
                                <Button className="w-full" variant="destructive" onClick={() => handleSosAction(false)}>Decline</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
               )}
                <Card>
                    <CardHeader>
                        <CardTitle>Ratings & Feedback</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                            <div className="text-4xl font-bold flex items-center justify-center">4.9 <Star className="w-8 h-8 ml-2 text-yellow-400 fill-current" /></div>
                            <p className="text-sm text-muted-foreground mt-1">Based on 42 recent trips</p>
                        </div>
                        <div className="mt-4 text-sm">
                            <p className="font-semibold">"Very fast and professional service. Highly recommended."</p>
                            <p className="text-xs text-gray-500">- Anonymous User</p>
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
                        </ul>
                    </CardContent>
                </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
