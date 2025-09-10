import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, MessageSquare, HeartPulse, BrainCircuit, Bone, Baby, Glasses, Stethoscope, Leaf, Users, ShieldCheck, Dumbbell, Hospital } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { IntelligentSearch } from '@/components/intelligent-search';


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <AppLogo className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl text-gray-800">RAMS.com</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/find-a-doctor" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
            Find a Doctor
          </Link>
           <Link href="/find-a-hospital" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
            Find a Hospital
          </Link>
          <Link href="/wellness" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
            Wellness
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
            For Doctors
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Globe className="w-5 h-5 mr-2" />
                Language
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>हिन्दी</DropdownMenuItem>
              <DropdownMenuItem>मराठी</DropdownMenuItem>
              <DropdownMenuItem>বাংলা</DropdownMenuItem>
              <DropdownMenuItem>தமிழ்</DropdownMenuItem>
              <DropdownMenuItem>తెలుగు</DropdownMenuItem>
              <DropdownMenuItem>Other</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
          <Button variant="link" asChild className="text-primary">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
           <IntelligentSearch />
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-800">How It Works</h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-white shadow-md">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mt-4 font-bold text-xl text-gray-800">Find Your Doctor</h3>
                <p className="mt-2 text-gray-500">Search by specialty or symptoms to find the right doctor for you.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-white shadow-md">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mt-4 font-bold text-xl text-gray-800">Book an Appointment</h3>
                <p className="mt-2 text-gray-500">Choose a convenient time and book a video, audio, or in-clinic visit.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-white shadow-md">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mt-4 font-bold text-xl text-gray-800">Consult Online</h3>
                <p className="mt-2 text-gray-500">Connect with your doctor from the comfort of your home.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Explore Our Core Services</h2>
              <p className="mt-2 text-gray-500">Comprehensive healthcare at your fingertips.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link href="/find-a-doctor">
                <Card className="p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-shadow h-full">
                  <Stethoscope className="w-16 h-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Find a Doctor</h3>
                  <p className="text-gray-500 mt-2">Search for top specialists and book appointments instantly.</p>
                </Card>
              </Link>
              <Link href="/find-a-hospital">
                <Card className="p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-shadow h-full">
                  <Hospital className="w-16 h-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Find a Hospital</h3>
                  <p className="text-gray-500 mt-2">Explore hospitals, check bed availability, and book your stay.</p>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Browse by Specialty</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Cardiology', icon: HeartPulse },
                { name: 'Neurology', icon: BrainCircuit },
                { name: 'Orthopedics', icon: Bone },
                { name: 'Pediatrics', icon: Baby },
                { name: 'Ophthalmology', icon: Glasses },
                { name: 'General Medicine', icon: Stethoscope },
              ].map(spec => (
                <Card key={spec.name} className="flex flex-col items-center justify-center p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <spec.icon className="w-10 h-10 text-primary mb-2" />
                  <p className="font-semibold text-center text-gray-800">{spec.name}</p>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/specialties">View All Specialties</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Wellness Zone</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: 'Yoga & Mindfulness', image: 'yoga', icon: Leaf, href: '/wellness' },
                  { title: 'Fitness & Workouts', image: 'fitness', icon: Dumbbell, href: '/wellness' },
                  { title: 'Mental Wellness', image: 'mental', icon: Users, href: '/wellness' },
                  { title: 'Diet & Nutrition', image: 'diet', icon: ShieldCheck, href: '/wellness' },
                ].map(item => (
                  <Link href={item.href} key={item.title}>
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
                        <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                            <Image src={`https://picsum.photos/400/300?${item.image}`} alt={item.title} fill style={{objectFit: 'cover'}} data-ai-hint={item.image} />
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">Explore resources to improve your well-being.</p>
                            <div className="text-primary font-semibold text-sm mt-4 inline-block hover:underline">
                                Explore More →
                            </div>
                        </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid gap-8 grid-cols-2 md:grid-cols-5">
                <div className="col-span-2 md:col-span-1">
                    <h3 className="font-bold text-lg mb-2">RAMS.com</h3>
                    <p className="text-gray-400 text-sm">Your health companion.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>About Us</Link></li>
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Careers</Link></li>
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Press</Link></li>
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>For Doctors</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Resources</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Blog</Link></li>
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Help Center</Link></li>
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Contact Us</Link></li>
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Services</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>AI Checker</Link></li>
                        <li><Link href="/find-a-doctor" className="text-gray-400 hover:text-white" prefetch={false}>Find a Doctor</Link></li>
                        <li><Link href="/wellness" className="text-gray-400 hover:text-white" prefetch={false}>Wellness</Link></li>
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Emergency</Link></li>
                    </ul>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
