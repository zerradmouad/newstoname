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
import { AvailabilityCell } from "@/components/availability-cell";
import type { DomainSuggestion } from "@/lib/types";

interface ResultsTableProps {
  results: DomainSuggestion[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>
          Click "Check Availability" to perform a real-time WHOIS lookup for a
          domain.
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
              <TableCell className="font-medium font-code">
                {item.domainName}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {item.reasoning}
              </TableCell>
              <TableCell className="text-right">
                <AvailabilityCell domainName={item.domainName} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
