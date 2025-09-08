import {
  Ambulance,
  Beaker,
  Bell,
  BookMarked,
  Calendar,
  ChevronDown,
  Clock,
  HeartPulse,
  Home,
  LayoutGrid,
  LogOut,
  PanelLeft,
  Settings,
  Siren,
  Store,
  Stethoscope,
  User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { AppLogo } from '@/components/icons';
import { IntelligentSearch } from '@/components/intelligent-search';

const appointments = [
  {
    type: 'Doctor',
    name: 'Dr. Evelyn Reed',
    specialty: 'Cardiologist',
    time: '10:30 AM',
    date: 'Aug 15',
    status: 'Confirmed',
    avatar: 'https://picsum.photos/id/1027/100/100',
    dataAiHint: 'doctor portrait',
  },
  {
    type: 'Lab',
    name: 'Sunrise Diagnostics',
    specialty: 'Blood Test',
    time: '08:00 AM',
    date: 'Aug 16',
    status: 'Confirmed',
    avatar: 'https://picsum.photos/id/30/100/100',
    dataAiHint: 'lab building',
  },
  {
    type: 'Doctor',
    name: 'Dr. Marcus Thorne',
    specialty: 'Dermatologist',
    time: '02:00 PM',
    date: 'Aug 20',
    status: 'Pending',
    avatar: 'https://picsum.photos/id/1005/100/100',
    dataAiHint: 'doctor portrait',
  },
];

const getAppointmentIcon = (type: string) => {
  switch (type) {
    case 'Doctor':
      return <Stethoscope className="size-5 text-accent" />;
    case 'Lab':
      return <Beaker className="size-5 text-accent" />;
    default:
      return <HeartPulse className="size-5 text-accent" />;
  }
};

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full bg-background">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <AppLogo className="size-8 text-primary" />
            <h1 className="font-headline text-xl font-bold text-primary-foreground">
              Rams.com
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive>
                <Home />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <Calendar />
                Appointments
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <BookMarked />
                Medical History
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <LayoutGrid />
                Services
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 p-2 h-auto"
              >
                <Avatar className="size-10">
                  <AvatarImage
                    src="https://picsum.photos/id/237/100/100"
                    alt="User"
                    data-ai-hint="user avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-base font-medium">John Doe</span>
                  <span className="text-sm text-muted-foreground">Patient</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="top" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h1 className="font-headline text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="size-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 p-1 h-auto">
                  <Avatar className="size-9">
                    <AvatarImage
                      src="https://picsum.photos/id/237/100/100"
                      alt="User"
                      data-ai-hint="user avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">Patient</span>
                  </div>
                  <ChevronDown className="hidden size-4 sm:inline" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                <User className="mr-2" />
                <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Settings className="mr-2" />
                <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                <LogOut className="mr-2" />
                <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 space-y-8 p-4 sm:p-6 lg:p-8">
          <IntelligentSearch />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>
                    Your scheduled consultations and lab tests.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appt, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 rounded-lg border bg-background/50 p-4 transition-shadow hover:shadow-md"
                      >
                        <Avatar className="hidden h-12 w-12 sm:flex">
                          <AvatarImage
                            src={appt.avatar}
                            alt={appt.name}
                            data-ai-hint={appt.dataAiHint}
                          />
                          <AvatarFallback>
                            {getAppointmentIcon(appt.type)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 gap-1">
                          <div className="font-semibold">{appt.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {appt.specialty}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="size-4" />
                            <span>{appt.time}</span>
                            <Calendar className="ml-2 size-4" />
                            <span>{appt.date}</span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            appt.status === 'Confirmed'
                              ? 'default'
                              : 'secondary'
                          }
                          className={
                            appt.status === 'Confirmed'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          }
                        >
                          {appt.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-red-500/80 to-destructive">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-bold text-destructive-foreground">
                    Emergency SOS
                  </CardTitle>
                  <Siren className="size-6 text-destructive-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-destructive-foreground/80">
                    Send an alert to nearby ambulances and hospitals instantly.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="destructive"
                    className="w-full bg-background text-destructive hover:bg-background/90"
                  >
                    Request Help Now
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Ambulance className="size-6 text-accent" />
                    <span className="text-xs">Book Ambulance</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Store className="size-6 text-accent" />
                    <span className="text-xs">Find Pharmacy</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Stethoscope className="size-6 text-accent" />
                    <span className="text-xs">Find a Doctor</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Beaker className="size-6 text-accent" />
                    <span className="text-xs">Book Lab Test</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
