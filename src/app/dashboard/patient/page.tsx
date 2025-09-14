
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Stethoscope, FileText, Wallet, Bell, LogOut, LayoutGrid, HeartPulse, ShieldPlus, HeartHandshake, Star, MessageSquare, Leaf, Users, Download, Upload, Camera, Loader2 } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import placeholderImages from '@/lib/placeholder-images.json';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, updateDoc, collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Appointment {
    id: string;
    doctorName: string;
    date: string;
    time: string;
    type: string;
    status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export default function PatientDashboard() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();
  const ratingLabels = ["Very Poor", "Poor", "Fair", "Good", "Excellent"];
  const defaultUserAvatar = placeholderImages['patient-user-avatar'];

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      const unsubDoc = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
        } else {
          console.log("No such document!");
        }
      });
      
      const q = query(collection(db, "appointments"), where("patientId", "==", currentUser.uid));
      const unsubAppointments = onSnapshot(q, (snapshot) => {
        const appsData: Appointment[] = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Appointment));
        setAppointments(appsData);
        setLoading(false);
      });

      return () => {
          unsubDoc();
          unsubAppointments();
      };
    } else {
      setLoading(false);
      setUserData(null);
      setAppointments([]);
    }
  }, [currentUser]);


  const handleFeedbackSubmit = () => {
    toast({
        title: "Feedback Submitted!",
        description: "Thank you for sharing your experience.",
    });
    setRating(0);
  };
  
  const handleUpload = () => {
    toast({
        title: "File Uploaded!",
        description: "Your prescription has been successfully uploaded.",
    });
  };

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
  const upcomingAppointment = appointments.find(a => a.status === 'Confirmed');

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
          <Link href="/dashboard/patient" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground" prefetch={false}>
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Calendar className="h-5 w-5" />
            Appointments
          </Link>
           <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <FileText className="h-5 w-5" />
            Medical Records
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Wallet className="h-5 w-5" />
            Billing
          </Link>
           <Link href="/find-a-doctor" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100" prefetch={false}>
            <Stethoscope className="h-5 w-5" />
            Find a Doctor
          </Link>
        </nav>
        <div className="p-4 mt-auto">
             <Button variant="ghost" onClick={() => auth.signOut()} className="w-full justify-start">
                <LogOut className="h-5 w-5 mr-3" />
                Logout
            </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Patient Dashboard</h1>
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

        <main className="flex-1 p-6">
           {loading ? (
             <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
                <CardHeader>
                    <CardTitle>Loading your dashboard...</CardTitle>
                    <CardDescription>Please wait a moment.</CardDescription>
                </CardHeader>
            </Card>
           ) : (
            <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
                <CardHeader>
                    <CardTitle>Welcome back, {userData?.fullName || 'Guest'}!</CardTitle>
                    <CardDescription>{currentUser ? 'Here\'s a quick overview of your health dashboard.' : 'Please log in to see your dashboard.'}</CardDescription>
                </CardHeader>
            </Card>
           )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Appointment</CardTitle>
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                       {loading ? <Loader2 className='animate-spin' /> : upcomingAppointment ? (
                            <>
                                <p className="text-lg font-bold">{upcomingAppointment.doctorName}</p>
                                <p className="text-sm text-muted-foreground">{new Date(upcomingAppointment.date).toLocaleDateString()}</p>
                                <p className="text-sm font-semibold mt-2">{upcomingAppointment.time}</p>
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground">{currentUser ? 'No upcoming appointments.' : 'Log in to view.'}</p>
                        )}
                         <Button className="mt-4 w-full" variant="outline">View Appointments</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">My Medical Records</CardTitle>
                        <FileText className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {loading ? <Loader2 className='animate-spin' /> : currentUser ? (
                       <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border">
                            <p className="text-sm font-medium">Blood Test Report (10th July)</p>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border">
                            <p className="text-sm font-medium">X-Ray Report (5th July)</p>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                          </div>
                       </div>
                       ) : (
                         <p className="text-sm text-muted-foreground">Log in to view.</p>
                       )}
                         <Button className="mt-4 w-full" variant="outline">View All Records</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Outstanding Bills</CardTitle>
                        <Wallet className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1,250.00</div>
                        <p className="text-xs text-muted-foreground">Due for recent consultation.</p>
                        <Button className="mt-4 w-full bg-accent hover:bg-accent/90">Pay Now</Button>
                    </CardContent>
                </Card>
            </div>

             <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border">
                                <div>
                                    <p className="font-semibold">Consultation with Dr. Sharma</p>
                                    <p className="text-sm text-gray-500">12th July - Technical Issue</p>
                                </div>
                                <Button size="sm" variant="destructive">Request Refund</Button>
                            </div>
                             <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border">
                                <div>
                                    <p className="font-semibold">Lab Test from City Labs</p>
                                    <p className="text-sm text-gray-500">10th July - Completed</p>
                                </div>
                                <Button size="sm" variant="outline">Give Feedback</Button>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border">
                                <div>
                                    <p className="font-semibold">Appointment with Dr. Vikram</p>
                                    <p className="text-sm text-gray-500">8th July - Completed</p>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline">Rate Doctor</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Rate your experience with Dr. Vikram</DialogTitle>
                                            <DialogDescription>Your feedback helps us improve.</DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-col items-center justify-center py-4">
                                            <div className="flex items-center gap-2">
                                                {[...Array(5)].map((_, index) => {
                                                    const starValue = index + 1;
                                                    return (
                                                        <Star
                                                            key={starValue}
                                                            className={`w-10 h-10 cursor-pointer ${starValue <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                            onClick={() => setRating(starValue)}
                                                            onMouseEnter={() => setHoverRating(starValue)}
                                                            onMouseLeave={() => setHoverRating(0)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <p className="mt-4 h-6 text-sm font-medium">
                                                {hoverRating > 0 ? ratingLabels[hoverRating - 1] : rating > 0 ? ratingLabels[rating - 1] : 'Select a rating'}
                                            </p>
                                             <Textarea placeholder="Share your experience..." className="mt-4" />
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="submit" onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>My Prescriptions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4">
                       <div className="flex items-center justify-between p-2 rounded-lg border">
                          <p className="text-sm font-medium">Prescription from Dr. Sharma (12th July)</p>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                       </div>
                        <div className="flex items-center justify-between p-2 rounded-lg border">
                          <p className="text-sm font-medium">Uploaded Prescription (9th July)</p>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                       </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full h-11">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload New Prescription
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Upload Prescription</DialogTitle>
                                    <DialogDescription>
                                        Upload a prescription to order medicines or book lab tests.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                    <Input type="file" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="submit" onClick={handleUpload}>Upload</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>


            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Explore More Services</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/" className="block hover:shadow-lg transition-shadow rounded-lg">
                        <Card className="text-center h-full">
                            <CardContent className="p-6 flex flex-col items-center justify-center">
                                <HeartPulse className="w-10 h-10 text-primary mx-auto mb-2"/>
                                <h3 className="font-semibold">AI Symptom Checker</h3>
                            </CardContent>
                        </Card>
                    </Link>
                     <Link href="/wellness" className="block hover:shadow-lg transition-shadow rounded-lg">
                        <Card className="text-center h-full">
                            <CardContent className="p-6 flex flex-col items-center justify-center">
                                <Leaf className="w-10 h-10 text-primary mx-auto mb-2"/>
                                <h3 className="font-semibold">Wellness Zone</h3>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/health-loan" className="block hover:shadow-lg transition-shadow rounded-lg">
                        <Card className="text-center h-full">
                            <CardContent className="p-6 flex flex-col items-center justify-center">
                                <HeartHandshake className="w-10 h-10 text-primary mx-auto mb-2"/>
                                <h3 className="font-semibold">Get a Health Loan</h3>
                            </CardContent>
                        </Card>
                    </Link>
                     <Link href="/rams-health-card" className="block hover:shadow-lg transition-shadow rounded-lg">
                         <Card className="text-center h-full">
                            <CardContent className="p-6 flex flex-col items-center justify-center">
                                <ShieldPlus className="w-10 h-10 text-primary mx-auto mb-2"/>
                                <h3 className="font-semibold">RAMS Health Card</h3>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
