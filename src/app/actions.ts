"use server";

import { suggestDomains } from "@/ai/flows/suggest-domains";
import { formSchema, type FormSchemaType } from "@/lib/types";

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
 * Checks domain availability by simulating a WHOIS service call.
 * This is a mock implementation for demonstration purposes. A real-world
 * version would integrate with a proper WHOIS API.
 *
 * How to test:
 * 1. Run the application and generate a list of domains.
 * 2. Click the "Check Availability" button for any domain.
 * 3. Observe the button state change to "Checking...".
 * 4. After a simulated delay, the button will update to "Available" if the domain
 *    name (without TLD) contains a vowel, and "Taken" otherwise.
 * 5. To test the error state, you can manually throw an error inside the try block.
 *
 * @param domain The full domain name (e.g., "example.com") to check.
 * @returns A promise that resolves to an object with the availability status.
 */
export async function checkDomainAvailabilityAction(
  domain: string
): Promise<{ status: "available" | "taken" | "error" }> {
  console.log(`Checking availability for: ${domain}`);
  try {
    // Simulate network delay to mimic a real API call.
    await new Promise((res) => setTimeout(res, 1000 + Math.random() * 1000));

    // Mock logic: availability is determined by whether the domain name contains a vowel.
    // This simulates the response from a real WHOIS service.
    const hasVowel = /[aeiou]/i.test(domain.split('.')[0]);
    if (hasVowel) {
      return { status: "available" };
    } else {
      return { status: "taken" };
    }
  } catch (error) {
    console.error(`Failed to check availability for ${domain}:`, error);
    // In case of any failure during the check, return an 'error' status.
    return { status: "error" };
  }
}
