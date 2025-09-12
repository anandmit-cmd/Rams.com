'use server';

import {
  intelligentMedicalSearch,
  type IntelligentMedicalSearchOutput,
} from '@/ai/flows/intelligent-medical-search';
import { z } from 'zod';

const searchSchema = z.object({
  query: z.string().min(3, 'Query must be at least 3 characters long.'),
});

export type SearchState = {
  message: string;
  results?: IntelligentMedicalSearchOutput;
  errors?: {
    query?: string[];
  };
};

export async function handleSearch(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  const validatedFields = searchSchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid query.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const results = await intelligentMedicalSearch({
      query: validatedFields.data.query,
    });
    if (!results || !results.analysis) {
      return {
        message: 'No relevant medical services found. Please try a different search term.',
        results: undefined,
      };
    }
    return {
      message: 'Search successful.',
      results,
    };
  } catch (error) {
    console.error('Intelligent search failed:', error);
    return {
      message: 'An unexpected error occurred during the search. Please try again later.',
      results: undefined,
    };
  }
}
