import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/icons';
import { Globe, User, Stethoscope, Pill, TestTube2, Ambulance, Sparkles, ArrowRight, Twitter, Facebook, Instagram } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';


const roles = [
  {
    icon: User,
    title: 'Patient',
    description: 'Book appointments and manage your health.',
    href: '/register/patient',
  },
  {
    icon: Stethoscope,
    title: 'Doctor',
    description: 'Provide consultations and manage patients.',
    href: '/register/doctor',
  },
  {
    icon: Pill,
    title: 'Pharmacy',
    description: 'Manage orders and sell medicines.',
    href: '/register/pharmacy',
  },
  {
    icon: TestTube2,
    title: 'Lab / Diagnostics',
    description: 'Manage test bookings and reports.',
    href: '/register/lab',
  },
  {
    icon: Ambulance,
    title: 'Ambulance',
    description: 'Provide emergency transport services.',
    href: '/register/ambulance',
  },
  {
    icon: Sparkles,
    title: 'Wellness Expert',
    description: 'Offer yoga, fitness, or diet plans.',
    href: '/register/wellness',
  },
];

export default function RegisterPage() {
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
          <Button variant="outline" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Join RAMS.com</h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-500">
            Create an account to access a world of healthcare services. Choose the role that best describes you.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {roles.map((role) => (
              <Link href={role.href} key={role.title} prefetch={false}>
                <Card className="p-6 text-left hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-between h-full">
                  <div className="flex items-center gap-4">
                    <role.icon className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{role.title}</h3>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
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
                 <div className="col-span-2 md:col-span-1">
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex gap-4">
                        <Link href="#" className="text-gray-400 hover:text-white" prefetch={false}><Twitter /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white" prefetch={false}><Facebook /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white" prefetch={false}><Instagram /></Link>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
                <p>© 2025 RAMS.com. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
