
'use client';

import { useActionState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Phone, Mail, MapPin, Loader2, CheckCircle } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { handleContactUs, type ContactState } from '@/app/actions';
import { useFormStatus } from 'react-dom';


const initialState: ContactState = {
  message: '',
  isSuccess: false,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        'Send Message'
      )}
    </Button>
  );
}


export default function ContactPage() {
    const { toast } = useToast();
    const heroImage = placeholderImages['contact-hero'];
    const [state, formAction, isPending] = useActionState(handleContactUs, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.message) {
            toast({
                title: state.isSuccess ? 'Success!' : 'Error',
                description: state.message,
                variant: state.isSuccess ? 'default' : 'destructive',
            });
            if (state.isSuccess) {
                formRef.current?.reset();
            }
        }
    }, [state, toast]);

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
       <header className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <AppLogo className="w-8 h-8 text-primary" />
                <span className="font-bold text-xl text-gray-800">RAMS.com</span>
            </Link>
            <Button asChild>
                <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </Button>
        </header>

      <main className="flex-1">
        <section className="relative h-64 bg-gradient-to-r from-primary/10 to-accent/10">
            <Image src={heroImage.src} alt="Contact Us" fill style={{ objectFit: 'cover' }} data-ai-hint={heroImage.hint} className="opacity-20" />
            <div className="container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center relative">
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-800">Get in Touch</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl">We're here to help. Contact us for any questions, support, or feedback.</p>
            </div>
        </section>

        <section className="py-16 md:py-24 -mt-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12">
                     <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl">Send us a Message</CardTitle>
                            <CardDescription>Fill out the form and our team will get back to you within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <form ref={formRef} action={formAction} className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" name="name" placeholder="John Doe" required />
                                    {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                                </div>
                                 <div className="space-y-1">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                                    {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                                </div>
                                 <div className="space-y-1">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" name="subject" placeholder="Question about services" required />
                                    {state?.errors?.subject && <p className="text-sm text-destructive">{state.errors.subject[0]}</p>}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required />
                                    {state?.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
                                </div>
                                <SubmitButton />
                            </form>
                        </CardContent>
                    </Card>
                     <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription>Reach out to us directly through our channels.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Mail className="w-6 h-6 text-primary"/>
                                    <div>
                                        <h4 className="font-semibold">Email</h4>
                                        <a href="mailto:support@rams.com" className="text-muted-foreground hover:text-primary">support@rams.com</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="w-6 h-6 text-primary"/>
                                    <div>
                                        <h4 className="font-semibold">Phone</h4>
                                        <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary">+91 123 456 7890</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-primary mt-1"/>
                                    <div>
                                        <h4 className="font-semibold">Office Address</h4>
                                        <p className="text-muted-foreground">RAMS Healthcare Pvt. Ltd.,<br/>123 Health Tower, Tech Park,<br/>Mumbai, Maharashtra, 400001</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                     </div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
