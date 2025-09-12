'use server';

/**
 * @fileOverview Implements an AI-powered medical search flow that interprets user queries
 *   to provide accurate and relevant suggestions for medical services like doctors, labs, and medical stores,
 *   along with a detailed analysis of the symptoms.
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

const IntelligentMedicalSearchOutputSchema = z.object({
  analysis: z.object({
    summary: z.string().describe("A brief, article-like summary of the potential condition based on the user's symptoms."),
    severity: z.enum(['low', 'medium', 'high']).describe('The estimated severity of the condition.'),
    firstAid: z.string().optional().describe('Immediate first aid or home remedy advice. This should be safe, general advice.')
  }).describe('A detailed analysis of the user\'s symptoms.'),
  suggestions: z.array(SearchResultSchema).describe(
    'An array of search results, each representing a medical service relevant to the query.'
  )
});

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
  prompt: `You are an expert AI medical assistant. Your goal is to analyze a user's symptoms and provide a helpful, safe, and informative response.

  User Query: {{{query}}}

  **IMPORTANT**: First, detect the language of the user's query (e.g., English, Hindi, Hinglish). You MUST provide the "summary" and "firstAid" fields in the JSON output in the SAME language as the user's query. The "suggestions" should remain in English as they map to system categories.

  Based on the query, you must perform the following actions:
  1.  **Analyze the Symptoms**: Provide a helpful summary of what the symptoms might indicate in the user's language. Do not provide a definitive diagnosis. Use phrases like "This could be related to..." or "It's possible that...".
  2.  **Estimate Severity**: Assess the potential severity as 'low', 'medium', or 'high'. If the user mentions symptoms like severe chest pain, difficulty breathing, or uncontrolled bleeding, always mark it as 'high'. For mild symptoms like a slight headache or a common cold, mark it as 'low'.
  3.  **Provide First Aid**: If applicable, suggest safe, general first aid or home care advice in the user's language. For example, for a sprain, suggest R.I.C.E (Rest, Ice, Compression, Elevation). For stress, suggest deep breathing exercises. DO NOT suggest taking any specific medicine.
  4.  **Suggest Next Steps**: Based on the analysis, provide an array of suggestions for medical services (doctors, labs, medical stores). For high-severity issues, strongly recommend seeing a specific type of doctor. The suggestions array must be in English.

  Format your response as a single JSON object with two main keys: "analysis" and "suggestions".

  Example for "I have a severe chest pain and shortness of breath":
  {
    "analysis": {
      "summary": "Severe chest pain and shortness of breath can be symptoms of a serious cardiac or respiratory issue. It is crucial to seek immediate medical attention to rule out conditions like a heart attack or pulmonary embolism.",
      "severity": "high",
      "firstAid": "While waiting for medical help, try to stay calm and sit in a comfortable position. Loosen any tight clothing. Do not ignore these symptoms."
    },
    "suggestions": [
      {
        "type": "doctor",
        "name": "Cardiologist (Heart Specialist)",
        "description": "It is highly recommended to consult a cardiologist immediately.",
        "availability": "Emergency services are available 24/7"
      },
      {
        "type": "doctor",
        "name": "Emergency Room",
        "description": "Go to the nearest hospital emergency room without delay."
      }
    ]
  }

  Example for "मुझे घबराहट हो रही है":
  {
    "analysis": {
      "summary": "घबराहट महसूस करना चिंता या तनाव का संकेत हो सकता है, लेकिन यह हृदय संबंधी समस्याओं जैसी गंभीर स्थितियों से भी जुड़ा हो सकता है। यह महत्वपूर्ण है कि आप अपने लक्षणों पर ध्यान दें।",
      "severity": "medium",
      "firstAid": "शांत रहने की कोशिश करें और गहरी सांस लें। यदि आपको सीने में दर्द या सांस लेने में तकलीफ हो तो तत्काल चिकित्सा सहायता लें। नमक और पानी का घोल पीने से निम्न रक्तचाप में मदद मिल सकती है यदि यह कारण है।"
    },
    "suggestions": [
       {
        "type": "doctor",
        "name": "General Physician",
        "description": "A general physician can assess your symptoms and guide you further.",
        "availability": "Check for local clinics"
      },
      {
        "type": "doctor",
        "name": "Cardiologist",
        "description": "If you have a history of heart issues, a cardiologist is recommended."
      }
    ]
  }
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
