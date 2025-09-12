
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, User, BarChart2, Bell, LogOut, LayoutGrid, Video, Star, Users, CalendarCheck, FileText, Sparkles } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import placeholderImages from '@/lib/placeholder-images.json';

const upcomingSessions = [
  {
    client: 'Anjali Sharma',
    time: '11:00 AM - 11:45 AM',
    type: '1-on-1 Yoga Session',
    avatar: placeholderImages['client-avatar-1'],
  },
  {
    client: 'Rohan Gupta',
    time: '04:00 PM - 05:00 PM',
    type: 'Group Fitness Class',
    avatar: placeholderImages['client-avatar-2'],
  }
];

export default function WellnessDashboard() {
  const expertAvatar = placeholderImages['wellness-expert-avatar'];

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
          <Link href="/dashboard/wellness" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground" prefetch={false}>
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <CalendarCheck className="h-5 w-5" />
            My Sessions
          </Link>
           <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Users className="h-5 w-5" />
            My Clients
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <BarChart2 className="h-5 w-5" />
            Earnings
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
          <h1 className="text-xl font-semibold">Wellness Expert Dashboard</h1>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src={expertAvatar.src} data-ai-hint={expertAvatar.hint} alt="Wellness Expert" />
              <AvatarFallback>WE</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">2 upcoming, 2 completed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">New Clients</CardTitle>
                        <User className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3 New</div>
                        <p className="text-xs text-muted-foreground">This week</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Earnings (This Month)</CardTitle>
                        <BarChart2 className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹25,000</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Client Rating</CardTitle>
                        <Star className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center">4.9 <Star className="w-5 h-5 ml-1 text-yellow-400 fill-current" /></div>
                        <p className="text-xs text-muted-foreground">Based on 50 client reviews</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Upcoming Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingSessions.map((session, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                                     <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={session.avatar.src} data-ai-hint={session.avatar.hint} alt={session.client} />
                                            <AvatarFallback>{session.client.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{session.client}</p>
                                            <p className="text-sm text-gray-500">{session.time}</p>
                                            <p className="text-xs text-primary font-medium mt-1">{session.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                    <Button size="sm"><Video className="w-4 h-4 mr-2"/>Start Session</Button>
                                    <Button size="sm" variant="outline">Details</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                     <CardContent className="grid grid-cols-1 gap-4">
                        <Button variant="outline" className="h-16 flex-col gap-1">
                            <CalendarCheck className="w-5 h-5 mb-1"/>
                            Schedule a New Session
                        </Button>
                        <Button variant="outline" className="h-16 flex-col gap-1">
                            <Sparkles className="w-5 h-5 mb-1"/>
                            Go Live for a Group Session
                        </Button>
                     </CardContent>
                </Card>
            </div>
        </main>
      </div>
    </div>
  );
}
