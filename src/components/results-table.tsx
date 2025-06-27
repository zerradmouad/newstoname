"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AvailabilityButton } from "./availability-button";
import type { SuggestDomainsOutput } from "@/ai/flows/suggest-domains";

interface ResultsTableProps {
  results: SuggestDomainsOutput;
}

export function ResultsTable({ results }: ResultsTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>
          Domain availability is checked against a mock service. Results may not be accurate.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Suggested Domain</TableHead>
            <TableHead>Reasoning from AI</TableHead>
            <TableHead className="text-right w-[180px]">Availability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((item) => (
            <TableRow key={item.domainName}>
              <TableCell className="font-medium font-code">{item.domainName}</TableCell>
              <TableCell className="text-muted-foreground">{item.reasoning}</TableCell>
              <TableCell className="text-right">
                <AvailabilityButton domainName={item.domainName} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
