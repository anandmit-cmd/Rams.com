
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
import { Bell, LayoutGrid, LogOut, Users, BedDouble, BarChart2, Settings } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { auth } from '@/lib/firebase';


const menuItems = [
    { href: '/dashboard/hospital', label: 'Dashboard', icon: LayoutGrid },
    { href: '#', label: 'Admissions', icon: Users },
    { href: '#', label: 'Bed Management', icon: BedDouble },
    { href: '#', label: 'Analytics', icon: BarChart2 },
    { href: '#', label: 'Hospital Settings', icon: Settings },
];

export default function HospitalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hospitalAdminAvatar = placeholderImages['hospital-admin-avatar'];

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
                <h1 className="text-xl font-semibold">Hospital Dashboard</h1>
           </div>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src={hospitalAdminAvatar.src} data-ai-hint={hospitalAdminAvatar.hint} alt="Hospital Admin" />
              <AvatarFallback>HA</AvatarFallback>
            </Avatar>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
