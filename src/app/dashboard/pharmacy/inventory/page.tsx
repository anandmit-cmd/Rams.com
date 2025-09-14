
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Calendar as CalendarIcon, MoreHorizontal, Trash2, Pencil, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc, query, where, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

type Medicine = {
    id: string;
    name: string;
    price: number;
    stock: number;
    expiry: string;
    pharmacyId: string;
};

export default function InventoryPage() {
    const [inventory, setInventory] = useState<Medicine[]>([]);
    const [newMedName, setNewMedName] = useState('');
    const [newMedPrice, setNewMedPrice] = useState('');
    const [newMedStock, setNewMedStock] = useState('');
    const [newMedExpiry, setNewMedExpiry] = useState<Date | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                // Handle user not logged in
                setCurrentUser(null);
                setInventory([]);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            const q = query(collection(db, "medicines"), where("pharmacyId", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
                const medsData: Medicine[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Medicine));
                setInventory(medsData);
                setIsLoading(false);
            }, (error) => {
                console.error("Error fetching inventory: ", error);
                toast({
                    title: 'Error',
                    description: 'Could not fetch inventory.',
                    variant: 'destructive',
                });
                setIsLoading(false);
            });

            return () => unsubscribe();
        } else {
            setIsLoading(false);
        }
    }, [currentUser, toast]);


    const handleAddMedicine = async () => {
        if (!newMedName || !newMedPrice || !newMedStock || !newMedExpiry || !currentUser) {
            toast({
                title: 'Error',
                description: 'Please fill all the fields to add a new medicine.',
                variant: 'destructive',
            });
            return;
        }
        try {
            const newMedicine = {
                name: newMedName,
                price: parseFloat(newMedPrice),
                stock: parseInt(newMedStock),
                expiry: format(newMedExpiry, 'yyyy-MM-dd'),
                pharmacyId: currentUser.uid,
            };
            await addDoc(collection(db, "medicines"), newMedicine);

            setNewMedName('');
            setNewMedPrice('');
            setNewMedStock('');
            setNewMedExpiry(undefined);
            toast({
                title: 'Success!',
                description: `${newMedicine.name} has been added to the inventory.`,
            });
        } catch (error) {
            console.error("Error adding document: ", error);
            toast({
                title: 'Error',
                description: 'Failed to add medicine.',
                variant: 'destructive',
            });
        }
    };
    
    const handleDeleteMedicine = async (id: string) => {
        try {
            await deleteDoc(doc(db, "medicines", id));
            toast({
                title: 'Medicine Removed',
                description: 'The selected medicine has been removed from the inventory.',
            });
        } catch (error) {
            console.error("Error removing document: ", error);
            toast({
                title: 'Error',
                description: 'Failed to remove medicine.',
                variant: 'destructive',
            });
        }
    };

  return (
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
                                        <Calendar mode="single" selected={newMedExpiry} onSelect={setNewMedExpiry} initialFocus disabled={(date) => date < new Date()} />
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
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
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
                        {inventory.length > 0 ? inventory.map(med => (
                            <TableRow key={med.id}>
                                <TableCell className="font-medium">{med.id.substring(0, 7)}...</TableCell>
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
                                            <DropdownMenuItem onClick={() => toast({ title: 'Edit action is not implemented yet.' })}>
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
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                   {currentUser ? "No medicines found in your inventory. Add one to get started." : "Please log in to manage your inventory."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                )}
            </CardContent>
        </Card>
    </main>
  );
}
