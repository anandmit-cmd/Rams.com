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
  Beaker,
  Clock,
  Search,
  Stethoscope,
  Store,
  AlertCircle,
} from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';

const initialState: SearchState = {
  message: '',
  results: [],
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="icon" className="shrink-0">
      {pending ? (
        <div className="size-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
      ) : (
        <Search className="size-5" />
      )}
      <span className="sr-only">Search</span>
    </Button>
  );
}

function ResultIcon({ type }: { type: string }) {
  switch (type) {
    case 'doctor':
      return <Stethoscope className="size-5 text-accent" />;
    case 'lab':
      return <Beaker className="size-5 text-accent" />;
    case 'medical_store':
      return <Store className="size-5 text-accent" />;
    default:
      return null;
  }
}

export function IntelligentSearch() {
  const [state, formAction] = useFormState(handleSearch, initialState);
  const { pending } = useFormStatus();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Intelligent Medical Search
        </CardTitle>
        <CardDescription>
          Use our AI to find doctors, labs, and pharmacies. Try searching for
          &quot;cardiologist near me&quot; or &quot;pharmacy open 24/7&quot;.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex w-full items-start gap-2">
          <div className="flex-1">
            <Input
              name="query"
              placeholder="e.g., 'fever medicine'"
              className="text-base"
              aria-label="Search query"
            />
            {state.errors?.query && (
              <p className="mt-2 text-sm text-destructive">
                {state.errors.query[0]}
              </p>
            )}
          </div>
          <SubmitButton />
        </form>
      </CardContent>

      {(pending || state.results.length > 0 || state.message) && (
        <CardFooter className="flex-col items-start gap-4 border-t px-6 py-4">
          {pending && (
            <div className="grid w-full gap-4 md:grid-cols-2">
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
            </div>
          )}
          {!pending && state.results.length > 0 && (
            <>
              <h3 className="font-semibold">Search Results</h3>
              <div className="grid w-full gap-4 md:grid-cols-2">
                {state.results.map((result, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-lg border bg-background/50 p-4 transition-all hover:shadow-lg"
                  >
                    <div className="mt-1">
                      <ResultIcon type={result.type} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-semibold">{result.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {result.description}
                      </p>
                      {result.availability && (
                        <div className="flex items-center pt-2">
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
                  </div>
                ))}
              </div>
            </>
          )}
          {!pending && state.message && state.results.length === 0 && (
            <Alert variant={state.errors ? 'destructive' : 'default'}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {state.errors ? 'Search Failed' : 'Information'}
              </AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
