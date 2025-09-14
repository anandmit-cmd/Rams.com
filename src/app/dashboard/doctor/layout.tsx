
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/icons';
import { Bell, Calendar, LayoutGrid, LogOut, User, BarChart2 } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { auth, db } from '@/lib/firebase';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, updateDoc, orderBy, limit } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const menuItems = [
    { href: '/dashboard/doctor', label: 'Dashboard', icon: LayoutGrid },
    { href: '/dashboard/doctor/my-schedule', label: 'My Schedule', icon: Calendar },
    { href: '#', label: 'My Patients', icon: User },
    { href: '#', label: 'Earnings', icon: BarChart2 },
];

interface Notification {
    id: string;
    title: string;
    body: string;
    createdAt: any;
    isRead: boolean;
}

export default function DoctorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const doctorAvatar = placeholderImages['doctor-avatar'];
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter(n => !n.isRead).length;


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, "notifications"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
        setNotifications(notifs);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleMarkAsRead = async (notificationId: string) => {
    const notifRef = doc(db, "notifications", notificationId);
    await updateDoc(notifRef, {
        isRead: true
    });
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="border-r">
        <SidebarHeader>
           <Link href="/" className="flex items-center gap-2" prefetch={false}>
             <AppLogo className="w-8 h-8 text-primary" />
             <span className="font-bold text-xl text-gray-800 group-data-[collapsible=icon]:hidden">RAMS.com</span>
            </Link>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                 {menuItems.map(item => (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton 
                            href={item.href} 
                            isActive={pathname === item.href}
                            tooltip={item.label}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="group-data-[collapsible=icon]:p-0">
             <Button variant="ghost" onClick={() => auth.signOut()} className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0">
                <LogOut />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-xl font-semibold">Doctor's Dashboard</h1>
           </div>
          <div className="flex items-center gap-4">
             <Popover>
                <PopoverTrigger asChild>
                     <Button variant="ghost" size="icon" className="relative">
                        <Bell className="w-6 h-6 text-gray-600" />
                        {unreadCount > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />}
                        <span className="sr-only">Notifications</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                                You have {unreadCount} unread messages.
                            </p>
                        </div>
                         <div className="grid gap-2">
                            {notifications.map(notif => (
                                <div key={notif.id} className={`p-2 rounded-md ${!notif.isRead ? 'bg-primary/10' : ''}`} onClick={() => !notif.isRead && handleMarkAsRead(notif.id)} role="button">
                                    <p className="font-semibold text-sm">{notif.title}</p>
                                    <p className="text-xs text-muted-foreground">{notif.body}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(notif.createdAt.toDate(), { addSuffix: true })}</p>
                                </div>
                            ))}
                            {notifications.length === 0 && <p className="text-sm text-muted-foreground text-center">No new notifications.</p>}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Avatar>
              <AvatarImage src={doctorAvatar.src} data-ai-hint={doctorAvatar.hint} alt="Doctor" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
