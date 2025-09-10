'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Hospital, Phone, Siren } from 'lucide-react';
import Link from 'next/link';

export function EmergencyButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 flex items-center justify-center"
          aria-label="Emergency Button"
        >
          <Siren className="h-8 w-8" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Emergency Help Needed?</AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm which service you would like to contact. If you are in immediate danger, please call your local emergency number.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 gap-4 my-4">
             <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                    <Siren className="w-5 h-5 text-red-500" />
                    Book or Call Ambulance
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ambulance Service</DialogTitle>
                  <DialogDescription>
                    Choose an option to get emergency medical transport.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 py-4">
                    <Button asChild size="lg">
                        <Link href="/book-ambulance" className='flex items-center gap-2'>
                           <Siren className="w-5 h-5"/>
                           Book an Ambulance Online
                        </Link>
                    </Button>
                     <Button asChild size="lg" variant="destructive">
                        <Link href="tel:108" className="flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            Call 108 Directly
                        </Link>
                    </Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                        Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

             <Button asChild size="lg" variant="outline">
                 <Link href="/find-a-hospital" className="flex items-center gap-2">
                    <Hospital className="w-5 h-5 text-blue-500" />
                    Search Nearby Hospital
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
                <Link href="tel:112" className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    Contact Police (112)
                </Link>
            </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
