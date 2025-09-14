
'use server';

import {
  intelligentMedicalSearch,
  type IntelligentMedicalSearchOutput,
} from '@/ai/flows/intelligent-medical-search';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


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


const contactSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  subject: z.string().min(3, 'Subject is required.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

export type ContactState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  isSuccess: boolean;
};


export async function handleContactUs(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check the fields and try again.',
      errors: validatedFields.error.flatten().fieldErrors,
      isSuccess: false,
    };
  }
  
  try {
    await addDoc(collection(db, 'contacts'), {
      ...validatedFields.data,
      submittedAt: serverTimestamp(),
    });

    return {
        message: 'Your message has been sent successfully! We will get back to you soon.',
        isSuccess: true,
        errors: {},
    };
  } catch (error) {
     console.error('Failed to save contact message:', error);
     return {
        message: 'An unexpected error occurred. Could not send your message.',
        isSuccess: false,
     }
  }
}
