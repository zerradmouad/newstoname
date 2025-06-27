# **App Name**: Domain Muse

## Core Features:

- API Key and Config Input: Collects API keys (MediaStack, GNews, NewsAPI, Currents, Gemini) and configuration settings (News Time Range, Article Fetch Depth, Max Words in Domain Name, TLD, Number of Domains) via a user-friendly form.
- API Call Orchestration: Manages API calls to multiple news sources based on user input, respecting free-tier limits by tracking request counts in memory.
- News Data Aggregation: Aggregates news article data (titles, descriptions, and potentially full content) from various APIs into a unified format.
- AI-Powered Domain Suggestion: Leverages the Gemini API as a tool to generate domain name suggestions and associated reasoning based on the aggregated news content.
- Results Presentation: Displays suggested domain names, AI-provided reasoning, and domain availability status in a clear, sortable three-column table.
- Domain Availability Checker: Enables users to check domain availability via a 'Check Availability' button, updating the display to reflect real-time status.
- Creator Acknowledgment: Displays a persistent footer message: 'Made with ❤️ by Mouad ZERRAD'

## Style Guidelines:

- Primary color: Dark slate blue (#483D8B) for a professional and trustworthy feel.
- Background color: Light gray (#F0F8FF) to ensure readability and a clean interface.
- Accent color: Teal (#008080) to highlight interactive elements like buttons and links.
- Body and headline font: 'Inter' (sans-serif) for a modern and clean appearance.
- Code font: 'Source Code Pro' (monospace) for clear presentation of API keys and related data.
- A three-column table layout is utilized to organize domain suggestions, reasoning, and availability clearly.
- Subtle loading animations are shown during API calls and domain availability checks to provide user feedback.