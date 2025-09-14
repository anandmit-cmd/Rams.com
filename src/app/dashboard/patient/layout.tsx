
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
import { Bell, Calendar, LayoutGrid, LogOut, FileText, Wallet, Stethoscope, User, Camera, Loader2 } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';


const menuItems = [
    { href: '/dashboard/patient', label: 'Dashboard', icon: LayoutGrid },
    { href: '#', label: 'Appointments', icon: Calendar },
    { href: '#', label: 'Medical Records', icon: FileText },
    { href: '#', label: 'Billing', icon: Wallet },
    { href: '/find-a-doctor', label: 'Find a Doctor', icon: Stethoscope },
];

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const defaultUserAvatar = placeholderImages['patient-user-avatar'];
  const { toast } = useToast();
  
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const unsubDoc = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
        }
      });
      return () => unsubDoc();
    } else {
      setUserData(null);
    }
  }, [currentUser]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentUser) return;

    setIsUploading(true);
    
    const storageRef = ref(storage, `avatars/${currentUser.uid}/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        avatar: downloadURL
      });

      toast({
        title: "Profile Picture Updated!",
        description: "Your new profile picture is now visible.",
      });

    } catch (error) {
      console.error("Error uploading file: ", error);
      toast({
        title: "Upload Failed",
        description: "Could not upload your profile picture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const userAvatarSrc = userData?.avatar || defaultUserAvatar.src;
  const userAvatarHint = userData?.avatar ? "user profile picture" : defaultUserAvatar.hint;

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
                <h1 className="text-xl font-semibold">Patient Dashboard</h1>
           </div>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="sr-only">Notifications</span>
            </Button>
            <div className="relative group">
                <Avatar className="h-10 w-10 cursor-pointer" onClick={handleAvatarClick}>
                    <AvatarImage src={userAvatarSrc} alt="Patient" data-ai-hint={userAvatarHint} />
                    <AvatarFallback>{userData?.fullName?.charAt(0) || 'P'}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleAvatarClick}>
                    {isUploading ? 
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> :
                        <Camera className="h-5 w-5 text-white" />
                    }
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg"
                />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
