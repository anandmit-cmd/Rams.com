import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Calendar, MessageSquare, Briefcase, Globe, BrainCircuit, HeartPulse, Bone, Baby, Glasses, Stethoscope, Dumbbell, Leaf, Users, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <AppLogo className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl text-gray-800">RAMS.com</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
            Find a Doctor
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
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
          <Button>Register</Button>
          <Button variant="outline" className="bg-accent hover:bg-accent/90 text-accent-foreground">Login</Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-800">
              Your Health, <span className="text-primary">Understood.</span>
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-gray-500">
              Feeling unwell? Describe your symptoms and our AI will suggest the right specialist for you.
            </p>
            <Card className="mt-8 max-w-2xl mx-auto text-left shadow-lg">
              <CardContent className="p-6">
                <div className="mt-4">
                  <Input placeholder="I have a persistent headache and feel dizzy..." className="h-12 text-base" />
                  <Button className="w-full mt-4 h-12 text-base bg-accent hover:bg-accent/90">Analyze Symptoms</Button>
                </div>
              </CardContent>
            </Card>
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
              <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Find a Doctor</h2>
            </div>
            <Card className="max-w-4xl mx-auto shadow-lg mb-12">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <Select>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Symptom/Specialty" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Location" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Consultation Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="in-clinic">In-Clinic</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="h-12 text-base bg-accent hover:bg-accent/90 w-full">Search</Button>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: 'Dr. Ananya Sharma', specialty: 'Cardiologist', location: 'Mumbai, India', rating: 4.8, reviews: 132, type: 'Online', image: '1' },
                { name: 'Dr. Vikram Singh', specialty: 'Neurologist', location: 'Delhi, India', rating: 4.9, reviews: 98, type: 'In-Clinic', image: '2' },
                { name: 'Dr. Priya Patel', specialty: 'Dermatologist', location: 'Bangalore, India', rating: 4.7, reviews: 150, type: 'Online', image: '3' },
              ].map(doc => (
                <Card key={doc.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-56">
                    <Image
                      src={`https://picsum.photos/400/250?random=${doc.image}`}
                      alt={`Doctor ${doc.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint="doctor portrait"
                    />
                    <div className="absolute top-2 right-2">
                       <Badge className={doc.type === 'Online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>{doc.type}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-gray-800">{doc.name}</h3>
                    <p className="text-gray-500 text-sm">{doc.specialty}</p>
                    <p className="text-gray-500 text-sm mt-1">{doc.location}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold text-gray-700">{doc.rating}</span>
                      <span className="text-gray-500 text-sm">({doc.reviews} reviews)</span>
                    </div>
                    <Button className="w-full mt-4 h-11 text-base">Book Appointment</Button>
                  </CardContent>
                </Card>
              ))}
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
              <Button variant="outline">View All Specialties</Button>
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
                  { title: 'Yoga & Mindfulness', image: 'yoga', icon: Leaf },
                  { title: 'Fitness & Workouts', image: 'fitness', icon: Dumbbell },
                  { title: 'Mental Wellness', image: 'mental', icon: Users },
                  { title: 'Diet & Nutrition', image: 'diet', icon: ShieldCheck },
                ].map(item => (
                    <Card key={item.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                            <Image src={`https://picsum.photos/400/300?${item.image}`} alt={item.title} layout="fill" objectFit="cover" data-ai-hint={item.image} />
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">Explore resources to improve your well-being.</p>
                            <Link href="#" className="text-primary font-semibold text-sm mt-4 inline-block hover:underline" prefetch={false}>
                                Explore More →
                            </Link>
                        </CardContent>
                    </Card>
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
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Find a Doctor</Link></li>
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Wellness</Link></li>
                        <li><Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>Emergency</Link></li>
                    </ul>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
