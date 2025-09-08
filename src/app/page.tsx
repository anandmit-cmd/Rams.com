import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Calendar, MessageSquare, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Briefcase className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">RAMS.com</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Find a Doctor
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Wellness
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            For Doctors
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline">Register</Button>
          <Button>Login</Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Your Health, <span className="text-blue-500">Understood.</span>
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              Feeling unwell? Describe your symptoms and our AI will suggest the right specialist for you.
            </p>
            <Card className="mt-8 max-w-2xl mx-auto text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Briefcase className="text-blue-500" /> AI Symptom Checker
                </h3>
                <p className="text-muted-foreground text-sm mt-1">Don't know where to start? Let our AI guide you.</p>
                <div className="mt-4">
                  <Input placeholder="e.g., I have a persistent headache and feel dizzy..." />
                  <Button className="w-full mt-2 bg-accent hover:bg-accent/90 text-accent-foreground">Analyze Symptoms</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
              <p className="mt-3 max-w-md mx-auto text-muted-foreground">Get expert medical care in three simple steps.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-background shadow-md">
                  <Search className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="mt-4 font-bold text-xl">Find Your Doctor</h3>
                <p className="mt-2 text-muted-foreground">Search by specialty or symptoms to find the right doctor for you.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-background shadow-md">
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="mt-4 font-bold text-xl">Book an Appointment</h3>
                <p className="mt-2 text-muted-foreground">Choose a convenient time and book a video, audio, or in-clinic visit.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-background shadow-md">
                  <MessageSquare className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="mt-4 font-bold text-xl">Consult Online</h3>
                <p className="mt-2 text-muted-foreground">Connect with your doctor from the comfort of your home.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Find a Doctor</h2>
              <p className="mt-3 max-w-md mx-auto text-muted-foreground">Search for doctors by specialty, location, or consultation type.</p>
            </div>
            <Card className="mt-8 max-w-4xl mx-auto">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Input placeholder="Symptom or Specialty" icon={<Search className="text-muted-foreground" />} />
                  <Input placeholder="Location" icon={<MapPin className="text-muted-foreground" />} />
                  <Input placeholder="Consultation Type" />
                  <Button className="md:col-span-3 bg-accent hover:bg-accent/90 text-accent-foreground">Search</Button>
                </div>
              </CardContent>
            </Card>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <Image
                  src="https://picsum.photos/400/250?random=1"
                  alt="Doctor Ananya Sharma"
                  width={400}
                  height={250}
                  className="rounded-t-lg object-cover"
                  data-ai-hint="doctor portrait"
                />
                <CardContent className="p-4">
                  <h3 className="font-bold">Dr. Ananya Sharma</h3>
                  <p className="text-muted-foreground text-sm">Cardiologist</p>
                  <p className="text-muted-foreground text-sm mt-1">Mumbai, India</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">4.8</span>
                    <span className="text-muted-foreground text-sm">(132 reviews)</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">Online</Button>
                </CardContent>
              </Card>
              <Card>
                <Image
                  src="https://picsum.photos/400/250?random=2"
                  alt="Doctor Vikram Singh"
                  width={400}
                  height={250}
                  className="rounded-t-lg object-cover"
                  data-ai-hint="doctor portrait"
                />
                <CardContent className="p-4">
                  <h3 className="font-bold">Dr. Vikram Singh</h3>
                  <p className="text-muted-foreground text-sm">Neurologist</p>
                  <p className="text-muted-foreground text-sm mt-1">Delhi, India</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">4.9</span>
                    <span className="text-muted-foreground text-sm">(98 reviews)</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">In-Clinic</Button>
                </CardContent>
              </Card>
              <Card>
                <Image
                  src="https://picsum.photos/400/250?random=3"
                  alt="Doctor Priya Patel"
                  width={400}
                  height={250}
                  className="rounded-t-lg object-cover"
                  data-ai-hint="doctor portrait"
                />
                <CardContent className="p-4">
                  <h3 className="font-bold">Dr. Priya Patel</h3>
                  <p className="text-muted-foreground text-sm">Dermatologist</p>
                  <p className="text-muted-foreground text-sm mt-1">Bangalore, India</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">4.7</span>
                    <span className="text-muted-foreground text-sm">(150 reviews)</span>
                  </div>
                   <Button variant="outline" className="w-full mt-4">Online</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 md:px-6 py-6 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; 2024 Rams.com. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
