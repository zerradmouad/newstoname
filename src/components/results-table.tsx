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
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import type { DomainSuggestion } from "@/lib/types";

interface ResultsTableProps {
  results: DomainSuggestion[];
}

const statusMap = {
  available: {
    Icon: CheckCircle,
    text: "Available",
    variant: "secondary",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-700",
  },
  taken: {
    Icon: XCircle,
    text: "Taken",
    variant: "destructive",
    className: "",
  },
  error: {
    Icon: AlertTriangle,
    text: "Error",
    variant: "secondary",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
  },
} as const;

export function ResultsTable({ results }: ResultsTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>
          Domain availability is checked in real-time. Results may be cached by TLD registrars.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Suggested Domain</TableHead>
            <TableHead>Reasoning from AI</TableHead>
            <TableHead className="text-right w-[180px]">Availability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((item) => {
            const { Icon, text, variant, className } = statusMap[item.status];
            return (
              <TableRow key={item.domainName}>
                <TableCell className="font-medium font-code">
                  {item.domainName}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.reasoning}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={variant} className={className}>
                    <Icon className="mr-2 h-4 w-4" />
                    {text}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
