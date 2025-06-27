"use client";

import { useState } from "react";
import { DomainForm } from "@/components/domain-form";
import { ResultsTable } from "@/components/results-table";
import { DomainMuseLogo } from "@/components/domain-muse-logo";
import { Skeleton } from "@/components/ui/skeleton";
import type { SuggestDomainsOutput } from "@/ai/flows/suggest-domains";
import type { FormSchemaType } from "@/lib/types";
import { generateDomainsAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SuggestDomainsOutput | null>(null);
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
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <DomainMuseLogo className="w-20 h-20 mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
          Domain Muse
        </h1>
        <p className="mt-4 text-lg max-w-2xl text-muted-foreground">
          Uncover unique domain names from today's headlines. Enter your API
          keys, set your preferences, and let our AI find the perfect domain for
          your next big idea.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <DomainForm onSubmit={handleFormSubmit} loading={loading} />
        </div>
        <div className="md:col-span-2">
          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
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
