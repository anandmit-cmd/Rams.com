
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Stethoscope, FileText, Wallet, HeartPulse, ShieldPlus, HeartHandshake, Star, MessageSquare, Leaf, Users, Download, Upload, Camera, Loader2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import placeholderImages from '@/app/lib/placeholder-images.json';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, collection, query, where, orderBy, limit, DocumentData } from 'firebase/firestore';


interface Appointment extends DocumentData {
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

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        setLoading(false);
        setUserData(null);
        setAppointments([]);
      }
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
      }, (error) => {
        console.error("Error fetching user data:", error);
        toast({ title: "Could not load user data.", variant: "destructive" });
      });
      
      const q = query(
          collection(db, "appointments"), 
          where("patientId", "==", currentUser.uid),
          orderBy("date", "desc"),
          orderBy("time", "desc")
      );
      const unsubAppointments = onSnapshot(q, (snapshot) => {
        const appsData: Appointment[] = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Appointment));
        setAppointments(appsData);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching appointments:", error);
        toast({ title: "Could not load appointments.", variant: "destructive" });
        setLoading(false);
      });

      return () => {
          unsubDoc();
          unsubAppointments();
      };
    }
  }, [currentUser, toast]);


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

  const upcomingAppointment = appointments.find(a => a.status === 'Confirmed' && new Date(a.date) >= new Date(new Date().toDateString()));
  const recentActivities = appointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled').slice(0, 3);


  return (
    <main className="flex-1 p-6">
        {loading ? (
            <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
            <CardHeader>
                 <div className="flex items-center gap-4">
                    <Loader2 className='w-8 h-8 animate-spin text-primary' />
                    <div>
                        <CardTitle>Loading your dashboard...</CardTitle>
                        <CardDescription>Please wait a moment.</CardDescription>
                    </div>
                </div>
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
                        {/* This section can be made dynamic by fetching from a 'medical_records' collection */}
                        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border">
                        <p className="text-sm font-medium">Blood Test Report (Sample)</p>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border">
                        <p className="text-sm font-medium">X-Ray Report (Sample)</p>
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
                    {/* This can be made dynamic by fetching from a 'bills' collection */}
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
                     {loading ? <Loader2 className='animate-spin' /> : recentActivities.length > 0 ? (
                        <div className="space-y-4">
                            {recentActivities.map(activity => (
                                <div key={activity.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border">
                                    <div>
                                        <p className="font-semibold">Appointment with {activity.doctorName}</p>
                                        <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()} - {activity.status}</p>
                                    </div>
                                    {activity.status === 'Completed' ? (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="outline">Rate Doctor</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Rate your experience with {activity.doctorName}</DialogTitle>
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
                                    ) : (
                                        <Button size="sm" variant="secondary" disabled>Cancelled</Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-center text-muted-foreground py-8">{currentUser ? 'No recent activities found.' : 'Log in to see your activities.'}</p>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>My Prescriptions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4">
                    {/* This can be made dynamic from a 'prescriptions' collection */}
                    <div className="flex items-center justify-between p-2 rounded-lg border">
                        <p className="text-sm font-medium">Prescription from Dr. Sharma (Sample)</p>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg border">
                        <p className="text-sm font-medium">Uploaded Prescription (Sample)</p>
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
  );
}
