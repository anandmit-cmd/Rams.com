
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ShoppingCart, Package, BarChart, Bell, LogOut, LayoutGrid, PlusCircle, Calendar as CalendarIcon, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useState }from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import placeholderImages from '@/lib/placeholder-images.json';
import { useToast } from '@/hooks/use-toast';

type Medicine = {
    id: string;
    name: string;
    price: number;
    stock: number;
    expiry: string;
};

const initialInventory: Medicine[] = [
  { id: 'MED-001', name: 'Paracetamol 500mg', price: 25.50, stock: 120, expiry: '2025-12-31' },
  { id: 'MED-002', name: 'Aspirin 75mg', price: 15.00, stock: 80, expiry: '2026-06-30' },
  { id: 'MED-003', name: 'Amoxicillin 250mg', price: 75.00, stock: 50, expiry: '2025-08-15' },
  { id: 'MED-004', name: 'Cetirizine 10mg', price: 30.00, stock: 200, expiry: '2026-01-20' },
];

export default function InventoryPage() {
    const [inventory, setInventory] = useState<Medicine[]>(initialInventory);
    const [newMedName, setNewMedName] = useState('');
    const [newMedPrice, setNewMedPrice] = useState('');
    const [newMedStock, setNewMedStock] = useState('');
    const [newMedExpiry, setNewMedExpiry] = useState<Date | undefined>();
    const { toast } = useToast();

    const pharmacistAvatar = placeholderImages['pharmacist-avatar'];

    const handleAddMedicine = () => {
        if (!newMedName || !newMedPrice || !newMedStock || !newMedExpiry) {
            toast({
                title: 'Error',
                description: 'Please fill all the fields to add a new medicine.',
                variant: 'destructive',
            });
            return;
        }
        const newMedicine: Medicine = {
            id: `MED-${String(inventory.length + 1).padStart(3, '0')}`,
            name: newMedName,
            price: parseFloat(newMedPrice),
            stock: parseInt(newMedStock),
            expiry: format(newMedExpiry, 'yyyy-MM-dd'),
        };
        setInventory([...inventory, newMedicine]);
        // Reset form
        setNewMedName('');
        setNewMedPrice('');
        setNewMedStock('');
        setNewMedExpiry(undefined);
        toast({
            title: 'Success!',
            description: `${newMedicine.name} has been added to the inventory.`,
        });
    };
    
    const handleDeleteMedicine = (id: string) => {
        setInventory(inventory.filter(med => med.id !== id));
        toast({
            title: 'Medicine Removed',
            description: 'The selected medicine has been removed from the inventory.',
        });
    };

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
          <Link href="/dashboard/pharmacy" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
           <Link href="/dashboard/pharmacy/inventory" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground" prefetch={false}>
            <Package className="h-5 w-5" />
            Inventory
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <BarChart className="h-5 w-5" />
            Analytics
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
          <h1 className="text-xl font-semibold">Inventory Management</h1>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src={pharmacistAvatar.src} alt="Pharmacist" data-ai-hint={pharmacistAvatar.hint} />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6">
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Medicine Stock</CardTitle>
                        <CardDescription>Manage your pharmacy's inventory.</CardDescription>
                    </div>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button><PlusCircle className="mr-2 h-4 w-4"/> Add New Medicine</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Medicine</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to add a new medicine to your inventory.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">Name</Label>
                                    <Input id="name" placeholder="e.g., Paracetamol 500mg" className="col-span-3" value={newMedName} onChange={(e) => setNewMedName(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right">Price (₹)</Label>
                                    <Input id="price" type="number" placeholder="25.50" className="col-span-3" value={newMedPrice} onChange={(e) => setNewMedPrice(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="stock" className="text-right">Stock</Label>
                                    <Input id="stock" type="number" placeholder="100" className="col-span-3" value={newMedStock} onChange={(e) => setNewMedStock(e.target.value)} />
                                </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Expiry Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="col-span-3 justify-start font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {newMedExpiry ? format(newMedExpiry, 'PPP') : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={newMedExpiry} onSelect={setNewMedExpiry} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit" onClick={handleAddMedicine}>Add Medicine</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Medicine ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price (₹)</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Expiry Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventory.map(med => (
                                <TableRow key={med.id}>
                                    <TableCell className="font-medium">{med.id}</TableCell>
                                    <TableCell>{med.name}</TableCell>
                                    <TableCell>{med.price.toFixed(2)}</TableCell>
                                    <TableCell>{med.stock}</TableCell>
                                    <TableCell>{med.expiry}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600" onClick={() => handleDeleteMedicine(med.id)}>
                                                     <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
