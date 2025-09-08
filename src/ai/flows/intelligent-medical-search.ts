'use server';

/**
 * @fileOverview Implements an AI-powered medical search flow that interprets user queries
 *   to provide accurate and relevant suggestions for medical services like doctors, labs, and medical stores.
 *
 * - intelligentMedicalSearch - A function that orchestrates the medical search process.
 * - IntelligentMedicalSearchInput - The input type for the intelligentMedicalSearch function.
 * - IntelligentMedicalSearchOutput - The return type for the intelligentMedicalSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentMedicalSearchInputSchema = z.object({
  query: z.string().describe('The user query for medical services.'),
});
export type IntelligentMedicalSearchInput = z.infer<
  typeof IntelligentMedicalSearchInputSchema
>;

const SearchResultSchema = z.object({
  type: z.enum(['doctor', 'lab', 'medical_store']).describe('The type of medical service.'),
  name: z.string().describe('The name of the service.'),
  description: z.string().describe('A brief description of the service.'),
  availability: z.string().optional().describe('Availability details, if applicable.'),
});

const IntelligentMedicalSearchOutputSchema = z.array(SearchResultSchema).describe(
  'An array of search results, each representing a medical service relevant to the query.'
);
export type IntelligentMedicalSearchOutput = z.infer<
  typeof IntelligentMedicalSearchOutputSchema
>;

export async function intelligentMedicalSearch(
  input: IntelligentMedicalSearchInput
): Promise<IntelligentMedicalSearchOutput> {
  return intelligentMedicalSearchFlow(input);
}

const intelligentMedicalSearchPrompt = ai.definePrompt({
  name: 'intelligentMedicalSearchPrompt',
  input: {schema: IntelligentMedicalSearchInputSchema},
  output: {schema: IntelligentMedicalSearchOutputSchema},
  prompt: `You are an AI assistant designed to provide relevant medical service suggestions based on user queries.

  Analyze the following user query and provide an array of medical service suggestions, including doctors, labs, and medical stores.
  Each suggestion should include the type of service, name, a brief description, and availability details if available.

  User Query: {{{query}}}

  Format your response as a JSON array of objects, where each object represents a medical service suggestion and includes the following fields:
  - type (string): The type of medical service ('doctor', 'lab', 'medical_store').
  - name (string): The name of the service.
  - description (string): A brief description of the service.
  - availability (string, optional): Availability details, if applicable.

  Example:
  [
    {
      "type": "doctor",
      "name": "Dr. Smith",
      "description": "Cardiologist with 10 years of experience.",
      "availability": "Mon-Fri, 9am-5pm"
    },
    {
      "type": "lab",
      "name": "City Lab",
      "description": "Provides a wide range of diagnostic tests.",
      "availability": "24/7"
    }
  ]
  `,
});

const intelligentMedicalSearchFlow = ai.defineFlow(
  {
    name: 'intelligentMedicalSearchFlow',
    inputSchema: IntelligentMedicalSearchInputSchema,
    outputSchema: IntelligentMedicalSearchOutputSchema,
  },
  async input => {
    const {output} = await intelligentMedicalSearchPrompt(input);
    return output!;
  }
);
