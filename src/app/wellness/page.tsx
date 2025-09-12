
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { Leaf, Dumbbell, Users, ShieldCheck, Video, UserCheck, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const wellnessCategories = [
  {
    title: 'Yoga & Mindfulness',
    description: 'Find inner peace and improve flexibility with our curated yoga sessions.',
    icon: Leaf,
    image: 'wellness-yoga',
    hint: 'yoga mindfulness',
    href: '#',
  },
  {
    title: 'Fitness & Workouts',
    description: 'Get stronger and healthier with personalized workout plans.',
    icon: Dumbbell,
    image: 'wellness-fitness',
    hint: 'fitness workout',
    href: '#',
  },
  {
    title: 'Mental Wellness',
    description: 'Connect with therapists and access resources for mental peace.',
    icon: Users,
    image: 'wellness-mental',
    hint: 'mental wellness',
    href: '#',
  },
  {
    title: 'Diet & Nutrition',
    description: 'Get custom diet plans from expert nutritionists for a healthier lifestyle.',
    icon: ShieldCheck,
    image: 'wellness-diet',
    hint: 'diet nutrition',
    href: '#',
  },
];

const experts = [
    {
        name: 'Aarav Sharma',
        expertise: 'Yoga Instructor',
        rating: 4.9,
        reviews: 85,
        image: 'yoga-instructor-avatar',
        imageHint: 'yoga instructor'
    },
    {
        name: 'Priya Singh',
        expertise: 'Fitness Coach',
        rating: 4.8,
        reviews: 120,
        image: 'fitness-coach-avatar',
        imageHint: 'fitness coach'
    },
    {
        name: 'Dr. Rohan Mehra',
        expertise: 'Mental Health Counselor',
        rating: 4.9,
        reviews: 92,
        image: 'counselor-avatar',
        imageHint: 'counselor portrait'
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
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-primary" prefetch={false}>
            For Doctors
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
                        <Image src={`https://picsum.photos/seed/${category.image}/400/300`} alt={category.title} fill style={{objectFit: 'cover'}} data-ai-hint={category.hint} />
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
                                <Image src={`https://picsum.photos/seed/${expert.image}/300/200`} alt={expert.name} width={100} height={100} className="rounded-full mx-auto mb-4 border-4 border-secondary" data-ai-hint={expert.imageHint} />
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
    </div>
  );
}

    