
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, MessageSquare, HeartPulse, BrainCircuit, Bone, Baby, Glasses, Stethoscope, Leaf, Users, ShieldCheck, Dumbbell, Hospital, Ambulance, Pill, TestTube2, ArrowRight, Twitter, Facebook, Instagram, HeartHandshake, ShieldPlus } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { IntelligentSearch } from '@/components/intelligent-search';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import * as React from 'react';
import placeholderImages from '@/lib/placeholder-images.json';


export default function LandingPage() {
  const promotions = [
    { title: 'Free Eye Check-up Camp', description: 'Apex Hospital is organizing a free eye check-up camp from Sep 20 to Sep 30. Avail the opportunity!', image: placeholderImages['promo-1'], link: '/find-a-hospital' },
    { title: '35% Off on Full Body Check-up', description: 'City Labs offers a 35% discount on their comprehensive full-body health check-up package. Limited time offer!', image: placeholderImages['promo-2'], link: '/book-lab-test' },
    { title: '20% Off On All Medicines', description: 'Get a flat 20% discount on all medicine orders from Apollo Pharmacy this week.', image: placeholderImages['promo-3'], link: '/order-medicines' },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const heroBgImage = placeholderImages['hero-background'];

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
          <Link href="/for-providers" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
            For Providers
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
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link href="/register">Register</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-12 md:py-24 lg:py-32 bg-white overflow-hidden">
          <div className="absolute inset-0">
             <Image src={heroBgImage.src} alt="Healthcare background" fill style={{objectFit: 'cover'}} className="opacity-10" data-ai-hint={heroBgImage.hint} />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 md:px-6 relative">
           <IntelligentSearch />
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-secondary">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Discover Health Offers &amp; Events</h2>
                    <p className="mt-2 text-gray-500">Check out the latest offers and health camps from our partners.</p>
                </div>
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {promotions.map((promo, index) => (
                            <CarouselItem key={index}>
                                <Card className="overflow-hidden">
                                    <div className="relative aspect-[2.4/1]">
                                        <Image src={promo.image.src} alt={promo.title} fill style={{ objectFit: 'cover' }} data-ai-hint={promo.image.hint} />
                                        <div className="absolute inset-0 bg-black/50" />
                                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8">
                                            <h3 className="text-2xl md:text-4xl font-bold">{promo.title}</h3>
                                            <p className="mt-2 max-w-2xl">{promo.description}</p>
                                            <Button asChild className="mt-6">
                                                <Link href={promo.link}>Learn More <ArrowRight className="ml-2" /></Link>
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Explore Our Core Services</h2>
              <p className="mt-2 text-gray-500">Comprehensive healthcare at your fingertips.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              <Link href="/find-a-doctor" className="group">
                <Card className="p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all w-full bg-blue-50 border-blue-200 hover:border-blue-400 transform hover:-translate-y-2 duration-300">
                  <div className="p-3 rounded-full bg-blue-100 mb-4 transition-transform group-hover:scale-110">
                    <Users className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Find a Doctor</h3>
                  <p className="text-gray-600 mt-2 text-sm">Search for top specialists and book instantly.</p>
                </Card>
              </Link>
              <Link href="/find-a-hospital" className="group">
                <Card className="p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all w-full bg-green-50 border-green-200 hover:border-green-400 transform hover:-translate-y-2 duration-300">
                   <div className="p-3 rounded-full bg-green-100 mb-4 transition-transform group-hover:scale-110">
                    <Hospital className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">Find a Hospital</h3>
                  <p className="text-gray-600 mt-2 text-sm">Explore hospitals and check bed availability.</p>
                </Card>
              </Link>
               <Link href="/order-medicines" className="group">
                <Card className="p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all w-full bg-indigo-50 border-indigo-200 hover:border-indigo-400 transform hover:-translate-y-2 duration-300">
                   <div className="p-3 rounded-full bg-indigo-100 mb-4 transition-transform group-hover:scale-110">
                    <Pill className="w-12 h-12 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-900">Order Medicines</h3>
                  <p className="text-gray-600 mt-2 text-sm">Get medicines delivered to your doorstep.</p>
                </Card>
              </Link>
               <Link href="/book-lab-test" className="group">
                <Card className="p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all w-full bg-purple-50 border-purple-200 hover:border-purple-400 transform hover:-translate-y-2 duration-300">
                   <div className="p-3 rounded-full bg-purple-100 mb-4 transition-transform group-hover:scale-110">
                    <TestTube2 className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900">Book a Lab Test</h3>
                  <p className="text-gray-600 mt-2 text-sm">Book tests and get reports online.</p>
                </Card>
              </Link>
              <Link href="/book-ambulance" className="group">
                <Card className="p-6 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl transition-all bg-red-100 border-2 border-red-500 hover:bg-red-200 w-full transform hover:-translate-y-2 duration-300">
                  <div className="p-3 rounded-full bg-red-200 mb-4 relative">
                    <Ambulance className="w-12 h-12 text-red-700 animate-ping" />
                     <span className="absolute h-full w-full top-0 left-0 animate-ping rounded-full bg-red-400 opacity-75"></span>
                  </div>
                  <h3 className="text-xl font-bold text-red-900">Book an Ambulance</h3>
                  <p className="text-red-700 mt-2 text-sm">Get immediate emergency assistance.</p>
                </Card>
              </Link>
               <Link href="/health-loan" className="group">
                <Card className="p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all w-full bg-orange-50 border-orange-200 hover:border-orange-400 transform hover:-translate-y-2 duration-300">
                   <div className="p-3 rounded-full bg-orange-100 mb-4 transition-transform group-hover:scale-110">
                    <HeartHandshake className="w-12 h-12 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-900">Get Health Loan</h3>
                  <p className="text-gray-600 mt-2 text-sm">Instant loans for medical expenses.</p>
                </Card>
              </Link>
               <Link href="/rams-health-card" className="group">
                <Card className="p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all w-full bg-teal-50 border-teal-200 hover:border-teal-400 transform hover:-translate-y-2 duration-300">
                   <div className="p-3 rounded-full bg-teal-100 mb-4 transition-transform group-hover:scale-110">
                    <ShieldCheck className="w-12 h-12 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-teal-900">Health Card</h3>
                  <p className="text-gray-600 mt-2 text-sm">Get health insurance coverage.</p>
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
               <p className="mt-2 text-gray-500 max-w-2xl mx-auto">Discover personalized wellness plans, expert guidance, and a supportive community to help you achieve your health goals.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: 'Yoga & Mindfulness', image: placeholderImages['wellness-yoga'], icon: Leaf, href: '/wellness' },
                  { title: 'Fitness & Workouts', image: placeholderImages['wellness-fitness'], icon: Dumbbell, href: '/wellness' },
                  { title: 'Mental Wellness', image: placeholderImages['wellness-mental'], icon: Users, href: '/wellness' },
                  { title: 'Diet & Nutrition', image: placeholderImages['wellness-diet'], icon: ShieldCheck, href: '/wellness' },
                ].map(item => (
                  <Link href={item.href} key={item.title}>
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
                        <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                            <Image src={item.image.src} alt={item.title} fill style={{objectFit: 'cover'}} data-ai-hint={item.image.hint} />
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
                        <li><Link href="/about" className="text-gray-400 hover:text-white" prefetch={false}>About Us</Link></li>
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
                        <li><Link href="/contact" className="text-gray-400 hover:text-white" prefetch={false}>Contact Us</Link></li>
                        <li><Link href="/privacy" className="text-gray-400 hover:text-white" prefetch={false}>Privacy Policy</Link></li>
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
