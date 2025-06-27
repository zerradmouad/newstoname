"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { checkDomainAvailabilityAction } from "@/app/actions";

type Status = "idle" | "loading" | "available" | "taken" | "error";

export function AvailabilityButton({ domainName }: { domainName: string }) {
  const [status, setStatus] = useState<Status>("idle");

  const checkAvailability = async () => {
    setStatus("loading");
    const result = await checkDomainAvailabilityAction(domainName);
    setStatus(result.status);
  };

  if (status === "loading") {
    return (
      <Button variant="outline" size="sm" disabled className="w-[140px]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Checking...
      </Button>
    );
  }

  if (status === "available") {
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-700">
        <CheckCircle className="mr-2 h-4 w-4" />
        Available
      </Badge>
    );
  }
  
  if (status === "taken") {
     return (
      <Badge variant="destructive">
        <XCircle className="mr-2 h-4 w-4" />
        Taken
      </Badge>
    );
  }

  if (status === "error") {
      return (
      <Badge variant="destructive" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700">
        <AlertTriangle className="mr-2 h-4 w-4" />
        Error
      </Badge>
    );
  }


  return (
    <Button variant="outline" size="sm" onClick={checkAvailability} className="w-[140px]">
      Check Availability
    </Button>
  );
}
