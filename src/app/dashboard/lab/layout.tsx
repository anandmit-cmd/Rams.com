
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
import { Bell, TestTube2, CalendarCheck2, FileUp, BarChart, LogOut, LayoutGrid } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { auth } from '@/lib/firebase';


const menuItems = [
    { href: '/dashboard/lab', label: 'Dashboard', icon: LayoutGrid },
    { href: '#', label: 'Test Bookings', icon: CalendarCheck2 },
    { href: '#', label: 'Upload Reports', icon: FileUp },
    { href: '#', label: 'Earnings', icon: BarChart },
];

export default function LabDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const labTechAvatar = placeholderImages['lab-tech-avatar'];

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
                <h1 className="text-xl font-semibold">Lab Dashboard</h1>
           </div>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src={labTechAvatar.src} data-ai-hint={labTechAvatar.hint} alt="Lab Technician" />
              <AvatarFallback>LT</AvatarFallback>
            </Avatar>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
