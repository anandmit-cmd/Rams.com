
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ShoppingCart, Package, ListOrdered, BarChart, Bell, LogOut, LayoutGrid, Star } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import placeholderImages from '@/lib/placeholder-images.json';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const orders = [
    { id: '#ORD-001', customer: 'Suresh Gupta', items: 3, status: 'Pending', total: '₹450' },
    { id: '#ORD-002', customer: 'Priya Mehta', items: 1, status: 'Shipped', total: '₹120' },
    { id: '#ORD-003', customer: 'Anil Kapoor', items: 5, status: 'Delivered', total: '₹980' },
];

const chartData = [
  { date: 'Mon', revenue: Math.floor(Math.random() * 20000) + 5000 },
  { date: 'Tue', revenue: Math.floor(Math.random() * 20000) + 5000 },
  { date: 'Wed', revenue: Math.floor(Math.random() * 20000) + 5000 },
  { date: 'Thu', revenue: Math.floor(Math.random() * 20000) + 5000 },
  { date: 'Fri', revenue: Math.floor(Math.random() * 20000) + 5000 },
  { date: 'Sat', revenue: Math.floor(Math.random() * 20000) + 5000 },
  { date: 'Sun', revenue: Math.floor(Math.random() * 20000) + 5000 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;


export default function PharmacyDashboard() {
  const pharmacistAvatar = placeholderImages['pharmacist-avatar'];

  return (
    <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                    <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">Orders awaiting processing</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Revenue (Today)</CardTitle>
                    <BarChart className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹12,350</div>
                    <p className="text-xs text-muted-foreground">From 42 successful orders</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                    <Package className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">Items need to be restocked</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
                    <Star className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold flex items-center">4.7 <Star className="w-5 h-5 ml-1 text-yellow-400 fill-current" /></div>
                    <p className="text-xs text-muted-foreground">Based on 150 ratings</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>A list of the latest orders.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>{order.items}</TableCell>
                                    <TableCell>{order.total}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">View Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Weekly Revenue</CardTitle>
                    <CardDescription>Last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                   <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                      <RechartsBarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                          tickFormatter={(value) => `₹${value / 1000}k`}
                          tickLine={false}
                          axisLine={false}
                          tickMargin={10}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                      </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

        </div>
    </main>
  );
}
