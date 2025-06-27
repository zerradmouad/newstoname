import { z } from "zod";

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
