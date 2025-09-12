
'use client';

import { handleSearch, type SearchState } from '@/app/actions';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertCircle,
  ArrowRight,
  Beaker,
  Clock,
  HeartPulse,
  Pill,
  Stethoscope,
} from 'lucide-react';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const initialState: SearchState = {
  message: '',
  results: undefined,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full mt-4 h-12 text-base bg-accent hover:bg-accent/90">
      {pending ? (
        <>
          <div className="size-5 animate-spin rounded-full border-2 border-background border-t-transparent mr-2" />
          Analyzing...
        </>
      ) : (
        'Analyze Symptoms'
      )}
    </Button>
  );
}

function ResultIcon({ type }: { type: string }) {
  switch (type) {
    case 'doctor':
      return <Stethoscope className="size-8 text-primary" />;
    case 'lab':
      return <Beaker className="size-8 text-primary" />;
    case 'medical_store':
      return <Pill className="size-8 text-primary" />;
    default:
      return null;
  }
}

const resultLinks = {
  doctor: '/find-a-doctor',
  lab: '/book-lab-test',
  medical_store: '/order-medicines',
};

export function IntelligentSearch() {
  const [state, formAction] = useActionState(handleSearch, initialState);
  const { pending } = useFormStatus();

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg text-left">
      <CardHeader className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-800">
            Your Health, <span className="text-primary">Understood.</span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-500">
            Feeling unwell? Describe your symptoms and our AI will suggest the right specialist for you.
        </p>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
           <Input
              name="query"
              placeholder="I have a persistent headache and feel dizzy..."
              className="h-12 text-base"
              aria-label="Search query"
            />
            {state.errors?.query && (
              <p className="mt-2 text-sm text-destructive">
                {state.errors.query[0]}
              </p>
            )}
          <SubmitButton />
        </form>
      </CardContent>

      {(pending || state.results || (state.message && !state.errors)) && (
        <CardFooter className="flex-col items-start gap-4 border-t px-6 py-4">
          {pending && (
            <div className="grid w-full gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          )}
          {!pending && state.results && state.results.analysis && (
            <>
              <h3 className="font-semibold text-lg">AI Analysis:</h3>
              <Card className={`w-full ${state.results.analysis.severity === 'high' ? 'border-destructive bg-destructive/5' : ''}`}>
                <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${state.results.analysis.severity === 'high' ? 'text-destructive' : ''}`}>
                        <HeartPulse />
                        AI Symptom Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-1">Summary</h4>
                        <p className="text-sm text-muted-foreground">{state.results.analysis.summary}</p>
                    </div>
                     {state.results.analysis.firstAid && (
                        <div>
                            <h4 className="font-semibold mb-1">Immediate Advice</h4>
                            <p className="text-sm text-muted-foreground">{state.results.analysis.firstAid}</p>
                        </div>
                    )}
                     <div>
                        <h4 className="font-semibold mb-1">Severity</h4>
                        <Badge variant={state.results.analysis.severity === 'high' ? 'destructive' : 'secondary'}>
                            {state.results.analysis.severity.charAt(0).toUpperCase() + state.results.analysis.severity.slice(1)}
                        </Badge>
                     </div>
                </CardContent>
              </Card>

              {state.results.suggestions && state.results.suggestions.length > 0 && (
                <>
                    <h3 className="font-semibold text-lg mt-4">Our Suggestions:</h3>
                    <div className="grid w-full gap-4">
                        {state.results.suggestions.map((result, index) => (
                        <Card
                            key={index}
                            className="flex flex-col sm:flex-row gap-4 p-4 transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-center sm:justify-start">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <ResultIcon type={result.type} />
                            </div>
                            </div>
                            <div className="flex-1 space-y-1 text-center sm:text-left">
                            <p className="font-bold text-base">{result.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {result.description}
                            </p>
                            {result.availability && (
                                <div className="flex items-center justify-center sm:justify-start pt-2">
                                <Badge
                                    variant="outline"
                                    className="flex items-center gap-1.5"
                                >
                                    <Clock className="size-3" />
                                    {result.availability}
                                </Badge>
                                </div>
                            )}
                            </div>
                            <div className="flex items-center justify-center">
                                <Button asChild variant="outline" size="sm">
                                    <Link href={resultLinks[result.type as keyof typeof resultLinks] || '/'}>
                                        Go to {result.type.replace('_', ' ')} <ArrowRight className="ml-2"/>
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                        ))}
                    </div>
                </>
              )}
            </>
          )}
        </CardFooter>
      )}
      {!pending && state.message && (!state.results || state.errors) && (
            <CardFooter className="border-t px-6 py-4">
                <Alert variant={state.errors ? 'destructive' : 'default'} className="w-full">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                    {state.errors ? 'Search Failed' : 'Information'}
                </AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            </CardFooter>
      )}
    </Card>
  );
}
