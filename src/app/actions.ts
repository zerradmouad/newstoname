"use server";

import { suggestDomains } from "@/ai/flows/suggest-domains";
import { formSchema, type FormSchemaType } from "@/lib/types";
import whois from "whois";

// This is a simplified in-memory store. In a real-world serverless environment,
// this would not persist across function invocations. A more robust solution
// like Redis or Firestore would be needed for accurate tracking.
const apiUsage = {
  mediaStack: 0,
  gNews: 0,
  newsApi: 0,
  currents: 0,
};

const MOCK_NEWS_CONTENT = `
Tech Giant Unveils Quantum Leap in AI Development; Market Reacts with Enthusiasm.
Global Leaders Convene for Summit on Sustainable Energy Solutions, Announce Green New Deal.
Breakthrough in Medical Science: Researchers Discover Potential Cure for Age-Old Disease.
Space Exploration Firm Successfully Launches Manned Mission to Mars.
Fashion World Buzzes as Iconic Brand Releases New Eco-Friendly Clothing Line.
Cryptocurrency Market Sees Unprecedented Volatility Following Regulatory News.
Indie Game Studio's Debut Title Becomes Overnight Sensation, Topping Sales Charts.
Culinary World Astonished by New Fusion Cuisine Trends Sweeping Top Restaurants.
`;

/**
 * Simulates fetching and aggregating news from various sources.
 * In a real application, this function would make fetch requests to
 * MediaStack, GNews, etc., using the provided API keys.
 */
async function aggregateNews(
  config: Pick<FormSchemaType, "articleFetchDepth">
): Promise<string> {
  console.log("Aggregating news with config:", config);
  // Increment mock usage counters
  apiUsage.mediaStack++;
  apiUsage.gNews++;
  apiUsage.newsApi++;
  apiUsage.currents++;
  console.log("Current API usage:", apiUsage);

  // Simulate a network delay
  await new Promise((res) => setTimeout(res, 500));

  if (config.articleFetchDepth === "Deep") {
    return MOCK_NEWS_CONTENT.repeat(3); // Simulate more content for 'Deep' fetch
  }
  return MOCK_NEWS_CONTENT;
}

export async function generateDomainsAction(data: FormSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid input.", data: null };
  }

  // Set the Gemini API key from user input.
  // In a real app, handle this securely.
  process.env.GOOGLE_GENAI_API_KEY = data.geminiApiKey;

  try {
    const newsContent = await aggregateNews(data);

    const suggestions = await suggestDomains({
      newsContent,
      maxWordsInDomain: data.maxWordsInDomain,
      tld: data.tld,
      numberOfDomains: data.numberOfDomains,
    });

    return { data: suggestions, error: null };
  } catch (error) {
    console.error("Error in generateDomainsAction:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    if (errorMessage.includes("API key not valid")) {
      return {
        error: "Your Gemini API key is invalid. Please check and try again.",
        data: null,
      };
    }
    return { error: `AI processing failed: ${errorMessage}`, data: null };
  }
}

/**
 * Checks domain availability by performing a real WHOIS lookup.
 * This function uses the 'whois' library to query public WHOIS servers.
 *
 * How it works:
 * 1. It takes a domain name (e.g., "example.com").
 * 2. It performs a WHOIS lookup with a 5-second timeout.
 * 3. It analyzes the raw WHOIS text data.
 *    - If the response is empty or contains common "not found" phrases (e.g., "No match for domain", "NOT FOUND"),
 *      it's considered **available**.
 *    - Otherwise, if a record is returned, it's considered **taken**.
 * 4. In case of a lookup error (e.g., network issue, timeout), it returns an **error** status.
 *
 * @param domain The full domain name (e.g., "example.com") to check.
 * @returns A promise that resolves to an object with the availability status.
 */
export async function checkDomainAvailabilityAction(
  domain: string
): Promise<{ status: "available" | "taken" | "error" }> {
  console.log(`Checking availability for: ${domain}`);
  try {
    // The `whois` library is callback-based, so we wrap it in a Promise
    // to work seamlessly with async/await in our server action.
    return new Promise((resolve) => {
      whois.lookup(domain, { timeout: 5000 }, (err, data) => {
        if (err) {
          console.error(`WHOIS lookup error for ${domain}:`, err);
          // Errors can happen for various reasons, e.g., network issues, timeouts,
          // or if the WHOIS server for the TLD is not supported.
          resolve({ status: "error" });
          return;
        }

        // If the WHOIS server returns an empty response, we can often assume the domain is available.
        if (!data) {
          resolve({ status: "available" });
          return;
        }

        const responseText = data.toLowerCase();

        // This is a list of common phrases found in WHOIS responses for unregistered domains.
        // The check is case-insensitive. Different TLDs use different phrases.
        const availableMatchers = [
          "no match for domain",
          "not found",
          "no data found",
          "domain not found",
          "no entries found",
          "status: available",
          "the queried object does not exist",
          "object does not exist",
          "is free",
        ];

        const isAvailable = availableMatchers.some((matcher) =>
          responseText.includes(matcher)
        );

        if (isAvailable) {
          resolve({ status: "available" });
        } else {
          // If no availability indicator is found, it means a record exists,
          // so the domain is considered taken.
          resolve({ status: "taken" });
        }
      });
    });
  } catch (error) {
    console.error(`Failed to check availability for ${domain}:`, error);
    // This outer catch block handles any unexpected synchronous errors.
    return { status: "error" };
  }
}
