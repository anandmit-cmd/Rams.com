
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { Leaf, Dumbbell, Users, ShieldCheck, ArrowRight, Star, Twitter, Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

const wellnessCategories = [
  {
    title: 'Yoga & Mindfulness',
    description: 'Find inner peace and improve flexibility with our curated yoga sessions.',
    icon: Leaf,
    image: placeholderImages['wellness-yoga'],
    href: '#',
  },
  {
    title: 'Fitness & Workouts',
    description: 'Get stronger and healthier with personalized workout plans.',
    icon: Dumbbell,
    image: placeholderImages['wellness-fitness'],
    href: '#',
  },
  {
    title: 'Mental Wellness',
    description: 'Connect with therapists and access resources for mental peace.',
    icon: Users,
    image: placeholderImages['wellness-mental'],
    href: '#',
  },
  {
    title: 'Diet & Nutrition',
    description: 'Get custom diet plans from expert nutritionists for a healthier lifestyle.',
    icon: ShieldCheck,
    image: placeholderImages['wellness-diet'],
    href: '#',
  },
];

const experts = [
    {
        name: 'Aarav Sharma',
        expertise: 'Yoga Instructor',
        rating: 4.9,
        reviews: 85,
        image: placeholderImages['yoga-instructor-avatar'],
    },
    {
        name: 'Priya Singh',
        expertise: 'Fitness Coach',
        rating: 4.8,
        reviews: 120,
        image: placeholderImages['fitness-coach-avatar'],
    },
    {
        name: 'Dr. Rohan Mehra',
        expertise: 'Mental Health Counselor',
        rating: 4.9,
        reviews: 92,
        image: placeholderImages['counselor-avatar'],
    }
]

export default function WellnessPage() {
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
          <Link href="/wellness" className="text-sm font-medium text-primary" prefetch={false}>
            Wellness
          </Link>
          <Link href="/for-providers" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
            For Providers
          </Link>
        </nav>
        <Button asChild>
            <Link href="/dashboard/patient">My Dashboard</Link>
        </Button>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-800">Your Journey to a Healthier You</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Discover personalized wellness plans, expert guidance, and a supportive community to help you achieve your health goals.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {wellnessCategories.map((category) => (
                <Link href={category.href} key={category.title}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
                     <div className="relative h-48">
                        <Image src={category.image.src} alt={category.title} fill style={{objectFit: 'cover'}} data-ai-hint={category.image.hint} />
                     </div>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <category.icon className="w-8 h-8 text-primary" />
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter text-gray-800">Connect with Wellness Experts</h2>
                    <p className="mt-2 text-gray-500">Get personalized guidance from certified professionals.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {experts.map(expert => (
                        <Card key={expert.name} className="text-center shadow-lg">
                            <CardContent className="p-6">
                                <Image src={expert.image.src} alt={expert.name} width={100} height={100} className="rounded-full mx-auto mb-4 border-4 border-secondary" data-ai-hint={expert.image.hint} />
                                <h3 className="text-lg font-bold">{expert.name}</h3>
                                <p className="text-primary">{expert.expertise}</p>
                                <div className="flex items-center justify-center gap-1 my-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="font-bold">{expert.rating}</span>
                                    <span className="text-xs text-gray-500">({expert.reviews} reviews)</span>
                                </div>
                                <Button className="mt-4 w-full">Book a Session</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Link href="/register/wellness">
                        <Button variant="outline">
                            Become a Wellness Expert <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
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
