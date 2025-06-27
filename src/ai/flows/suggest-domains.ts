'use server';
/**
 * @fileOverview A flow to suggest domain names based on aggregated news content using the Gemini API.
 *
 * - suggestDomains - A function that generates domain name suggestions and reasoning.
 * - SuggestDomainsInput - The input type for the suggestDomains function.
 * - SuggestDomainsOutput - The return type for the suggestDomains function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDomainsInputSchema = z.object({
  newsContent: z
    .string()
    .describe("Aggregated news content from various APIs."),
  maxWordsInDomain: z.number().describe("Maximum number of words in the generated domain name.").default(3),
  tld: z.string().describe("Top-level domain (TLD) to use for the domain names.").default("com"),
  numberOfDomains: z.number().describe("Number of domain names to generate.").default(3),
});
export type SuggestDomainsInput = z.infer<typeof SuggestDomainsInputSchema>;

const SuggestDomainsOutputSchema = z.array(
  z.object({
    domainName: z.string().describe("The suggested domain name."),
    reasoning: z.string().describe("The AI's reasoning for suggesting this domain name."),
  })
);
export type SuggestDomainsOutput = z.infer<typeof SuggestDomainsOutputSchema>;

export async function suggestDomains(input: SuggestDomainsInput): Promise<SuggestDomainsOutput> {
  return suggestDomainsFlow(input);
}

const suggestDomainsPrompt = ai.definePrompt({
  name: 'suggestDomainsPrompt',
  input: {schema: SuggestDomainsInputSchema},
  output: {schema: SuggestDomainsOutputSchema},
  prompt: `You are a creative domain name generator. You will receive aggregated news content and generate {{numberOfDomains}} domain name suggestions based on the content.

  The domain names should:
  - Be relevant to the news content.
  - Not exceed {{maxWordsInDomain}} words.
  - Use the ".{{{tld}}}" TLD.

  For each domain name, provide a brief explanation of your reasoning.

  News Content:
  {{newsContent}}`,
});

const suggestDomainsFlow = ai.defineFlow(
  {
    name: 'suggestDomainsFlow',
    inputSchema: SuggestDomainsInputSchema,
    outputSchema: SuggestDomainsOutputSchema,
  },
  async input => {
    const {output} = await suggestDomainsPrompt(input);
    return output!;
  }
);
