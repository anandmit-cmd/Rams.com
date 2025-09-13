
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { ArrowRight, BarChart2, Calendar, DollarSign, Globe, Stethoscope, Users, Video, Twitter, Facebook, Instagram } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

const providerBenefits = [
    {
        icon: Users,
        title: 'Expand Your Reach',
        description: 'Connect with thousands of patients in your city and beyond. Grow your practice with our extensive user base.',
    },
    {
        icon: Calendar,
        title: 'Streamline Your Operations',
        description: 'Manage appointments, patient records, and payments all in one place with our intuitive dashboards.',
    },
    {
        icon: Video,
        title: 'Offer Telemedicine',
        description: 'Provide video consultations and reach patients who cannot visit in person, offering flexibility and convenience.',
    },
    {
        icon: BarChart2,
        title: 'Gain Insights',
        description: 'Use our analytics tools to track your earnings, patient feedback, and practice performance over time.',
    }
];

const providerRoles = [
  {
    title: 'Doctors & Specialists',
    description: 'Offer consultations, manage your schedule, and build your online presence.',
    href: '/register/doctor',
    image: placeholderImages['provider-doctor']
  },
  {
    title: 'Pharmacies',
    description: 'Sell medicines, manage inventory, and process online orders seamlessly.',
    href: '/register/pharmacy',
    image: placeholderImages['provider-pharmacy']
  },
  {
    title: 'Labs & Diagnostics',
    description: 'Accept online bookings for tests, manage samples, and upload digital reports.',
    href: '/register/lab',
    image: placeholderImages['provider-lab']
  },
  {
    title: 'Ambulance Services',
    description: 'Receive real-time emergency requests and manage your fleet efficiently.',
    href: '/register/ambulance',
    image: placeholderImages['provider-ambulance']
  }
];


export default function ForProvidersPage() {
    const heroImage = placeholderImages['provider-hero'];

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
                <Link href="/for-providers" className="text-sm font-medium text-primary" prefetch={false}>
                    For Providers
                </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button asChild className="bg-accent hover:bg-accent/90">
                        <Link href="/register">Register</Link>
                    </Button>
                    <Button variant="link" asChild className="text-primary">
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            </header>

            <main className="flex-1">
                <section className="relative py-20 md:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
                    <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-800">Partner with Us, Transform Healthcare</h1>
                            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
                                Join the RAMS.com network and connect with patients who need your expertise. Grow your practice, streamline your workflow, and be a part of the future of digital health.
                            </p>
                            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90">
                                <Link href="/register">Join Our Network Today</Link>
                            </Button>
                        </div>
                        <div className="relative h-64 md:h-full w-full">
                             <Image src={heroImage.src} alt="Healthcare Providers" fill style={{ objectFit: 'cover' }} data-ai-hint={heroImage.hint} className="rounded-lg shadow-lg"/>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                         <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Why Join RAMS.com?</h2>
                            <p className="mt-2 text-gray-500">A partnership designed for growth and efficiency.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {providerBenefits.map(benefit => (
                                <Card key={benefit.title} className="text-center p-6 shadow-md hover:shadow-xl transition-shadow">
                                    <div className="p-4 rounded-full bg-primary/10 inline-block mb-4">
                                        <benefit.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                                    <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                 <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Who Can Join?</h2>
                            <p className="mt-2 text-gray-500">We welcome a wide range of healthcare professionals and services.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {providerRoles.map(role => (
                                <Card key={role.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="relative h-48">
                                         <Image src={role.image.src} alt={role.title} fill style={{ objectFit: 'cover' }} data-ai-hint={role.image.hint} />
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold">{role.title}</h3>
                                        <p className="mt-2 text-muted-foreground h-16">{role.description}</p>
                                        <Button asChild variant="outline" className="w-full mt-4">
                                            <Link href={role.href}>Join as a {role.title.replace(' & Specialists', '')} <ArrowRight className="ml-2 w-4 h-4"/></Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                         <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Ready to Get Started?</h2>
                         <p className="mt-2 text-gray-500 max-w-2xl mx-auto">Registration is simple and takes just a few minutes. Join our growing network and start making a difference today.</p>
                         <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90">
                            <Link href="/register">Register Now</Link>
                         </Button>
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
                                <li><Link href="/for-providers" className="text-gray-400 hover:text-white" prefetch={false}>For Providers</Link></li>
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
                                <li><Link href="/" className="text-gray-400 hover:text-white" prefetch={false}>AI Checker</Link></li>
                                <li><Link href="/find-a-doctor" className="text-gray-400 hover:text-white" prefetch={false}>Find a Doctor</Link></li>
                                <li><Link href="/find-a-hospital" className="text-gray-400 hover:text-white" prefetch={false}>Find a Hospital</Link></li>
                                <li><Link href="/wellness" className="text-gray-400 hover:text-white" prefetch={false}>Wellness</Link></li>
                                <li><Link href="/book-ambulance" className="text-gray-400 hover:text-white" prefetch={false}>Emergency</Link></li>
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
