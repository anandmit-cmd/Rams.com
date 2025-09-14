
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LayoutGrid, Users, Hospital, Stethoscope, BarChart2, Bell, LogOut, Settings, PlusCircle, Trash2, Pencil, MoreHorizontal, FileText, BadgePercent, Loader2 } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import placeholderImages from '@/lib/placeholder-images.json';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';


const chartData = [
  { date: 'Mon', revenue: Math.floor(Math.random() * 200000) + 50000 },
  { date: 'Tue', revenue: Math.floor(Math.random() * 200000) + 50000 },
  { date: 'Wed', revenue: Math.floor(Math.random() * 200000) + 50000 },
  { date: 'Thu', revenue: Math.floor(Math.random() * 200000) + 50000 },
  { date: 'Fri', revenue: Math.floor(Math.random() * 200000) + 50000 },
  { date: 'Sat', revenue: Math.floor(Math.random() * 200000) + 50000 },
  { date: 'Sun', revenue: Math.floor(Math.random() * 200000) + 50000 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

type User = {
    id: string;
    fullName?: string;
    hospitalName?: string;
    pharmacyName?: string;
    labName?: string;
    driverName?: string;
    role: string;
    createdAt: any;
};


export default function AdminDashboard() {
  const adminAvatar = placeholderImages['admin-avatar'];
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
        setLoading(true);
        try {
            const usersCollection = await getDocs(collection(db, 'users'));
            const usersData = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
            setAllUsers(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }
    fetchUsers();
  }, []);

  const getUserDetails = (user: User) => {
    let name = 'N/A';
    let avatarKey: keyof typeof placeholderImages = 'patient-user-avatar';

    switch(user.role) {
      case 'patient':
        name = user.fullName || 'Patient';
        avatarKey = 'patient-user-avatar';
        break;
      case 'doctor':
        name = user.fullName || 'Doctor';
        avatarKey = 'doctor-avatar';
        break;
      case 'hospital':
        name = user.hospitalName || 'Hospital';
        avatarKey = 'hospital-1';
        break;
      case 'pharmacy':
        name = user.pharmacyName || 'Pharmacy';
        avatarKey = 'pharmacy-1';
        break;
      case 'lab':
        name = user.labName || 'Lab';
        avatarKey = 'lab-tech-avatar';
        break;
      case 'ambulance':
        name = user.driverName || 'Ambulance Driver';
        avatarKey = 'ambulance-driver-avatar';
        break;
      case 'wellness':
          name = user.fullName || 'Wellness Expert';
          avatarKey = 'wellness-expert-avatar';
          break;
      case 'admin':
          name = user.fullName || 'Admin';
          avatarKey = 'admin-avatar';
          break;
      default:
          name = user.fullName || 'Unknown User';
          break;
    }
    const avatar = placeholderImages[avatarKey] || placeholderImages['patient-user-avatar'];
    return { name, avatar };
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
          <Link href="/dashboard/admin" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground" prefetch={false}>
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Users className="h-5 w-5" />
            User Management
          </Link>
           <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <BarChart2 className="h-5 w-5" />
            Analytics
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Settings className="h-5 w-5" />
            Platform Settings
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
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src={adminAvatar.src} data-ai-hint={adminAvatar.hint} alt="Admin" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{loading ? <Skeleton className="h-8 w-20" /> : allUsers.length}</div>
                        <p className="text-xs text-muted-foreground">All registered users</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
                        <Stethoscope className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold"> {loading ? <Skeleton className="h-8 w-16" /> : allUsers.filter(u => u.role === 'doctor').length}</div>
                         <p className="text-xs text-muted-foreground">Verified doctors</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Hospitals</CardTitle>
                        <Hospital className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{loading ? <Skeleton className="h-8 w-16" /> : allUsers.filter(u => u.role === 'hospital').length}</div>
                        <p className="text-xs text-muted-foreground">Partnered hospitals</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Revenue (Today)</CardTitle>
                        <BarChart2 className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹8,50,000</div>
                        <p className="text-xs text-muted-foreground">Across all services</p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>View, manage, or delete users from the platform.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           {loading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Registered On</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allUsers.map(user => {
                                        const { name, avatar } = getUserDetails(user);
                                        return (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="w-8 h-8">
                                                            <AvatarImage src={avatar.src} data-ai-hint={avatar.hint} alt={name} />
                                                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        {name}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="capitalize">{user.role}</TableCell>
                                                <TableCell>{user.createdAt?.toDate ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'N/A'}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit User</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600 focus:text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete User</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col gap-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Platform Analytics</CardTitle>
                            <CardDescription>Revenue over the last 7 days.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
                              <RechartsBarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                                <YAxis tickFormatter={(value) => `₹${Number(value) / 1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                              </RechartsBarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                         <CardContent className="grid grid-cols-2 gap-4">
                            <Button variant="outline"><PlusCircle className="mr-2"/> Add Doctor</Button>
                            <Button variant="outline"><PlusCircle className="mr-2"/> Add Hospital</Button>
                            <Button variant="outline"><FileText className="mr-2"/> View Reports</Button>
                            <Button variant="outline"><BadgePercent className="mr-2"/> Create Offer</Button>
                         </CardContent>
                    </Card>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

    