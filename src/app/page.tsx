
"use client";

import { useState } from "react";
import { DomainForm } from "@/components/domain-form";
import { ResultsTable } from "@/components/results-table";
import { Skeleton } from "@/components/ui/skeleton";
import type { DomainSuggestion, FormSchemaType } from "@/lib/types";
import { generateDomainsAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DomainSuggestion[] | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (data: FormSchemaType) => {
    setLoading(true);
    setResults(null);
    try {
      const result = await generateDomainsAction(data);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: result.error,
        });
      } else {
        setResults(result.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An unexpected error occurred",
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-12 relative max-w-5xl">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
       <div className="flex flex-col items-center text-center mb-12 border rounded-lg p-8">
        <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tight text-primary mb-4">
          NewsToName
        </h1>
        <p className="mt-4 text-lg max-w-3xl text-muted-foreground">
        Generate Perfect Domain Names <br className="md:hidden" />from Today’s Headlines
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <DomainForm onSubmit={handleFormSubmit} loading={loading} />
        </div>
        <div className="md:col-span-2">
          {loading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg bg-card text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin mb-4" />
              <p className="text-lg">Generating domain suggestions...</p>
            </div>
          )}
          {results && <ResultsTable results={results} />}
          {!loading && !results && (
             <div className="flex items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg bg-card">
              <p className="text-muted-foreground">Your domain suggestions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
