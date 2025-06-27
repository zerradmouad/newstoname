import { z } from "zod";
import type { SuggestDomainsOutput } from "@/ai/flows/suggest-domains";

export const formSchema = z.object({
  geminiApiKey: z.string().min(1, "Gemini API key is required."),
  mediaStackApiKey: z.string().optional(),
  gNewsApiKey: z.string().optional(),
  newsApiApiKey: z.string().optional(),
  currentsApiKey: z.string().optional(),
  newsTimeRange: z.enum(["24h", "Week", "Month"]),
  articleFetchDepth: z.enum(["Light", "Deep"]),
  maxWordsInDomain: z.number().min(1).max(5),
  tld: z.string().min(1, "TLD is required.").max(10),
  numberOfDomains: z.number().min(1).max(10),
});

export type FormSchemaType = z.infer<typeof formSchema>;

// DomainSuggestion no longer includes the 'status' property, as availability
// is now checked on-demand from the UI.
export type DomainSuggestion = SuggestDomainsOutput[number];
