"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { checkDomainAvailabilityAction } from "@/app/actions";

/**
 * Defines the possible states for the availability check button,
 * ensuring a clear and predictable UI flow for the user.
 */
type Status = "idle" | "loading" | "available" | "taken" | "error";

/**
 * A client component that renders a button to check domain availability.
 * It manages the visual state of the check, from initiating the request
 * to displaying the final result (Available, Taken, or Error).
 *
 * @param {object} props - The component props.
 * @param {string} props.domainName - The domain name to be checked.
 */
export function AvailabilityButton({ domainName }: { domainName: string }) {
  /**
   * State hook to manage the current status of the availability check.
   * It starts in an 'idle' state.
   */
  const [status, setStatus] = useState<Status>("idle");

  /**
   * An asynchronous function triggered on button click. It handles the
   * entire lifecycle of an availability check:
   * 1. Sets the status to 'loading' to provide visual feedback.
   * 2. Calls the backend server action to perform the WHOIS lookup.
   * 3. Updates the status based on the action's response.
   */
  const checkAvailability = async () => {
    setStatus("loading");
    const result = await checkDomainAvailabilityAction(domainName);
    setStatus(result.status);
  };

  // While the check is in progress, display a disabled button with a loading spinner.
  if (status === "loading") {
    return (
      <Button variant="outline" size="sm" disabled className="w-[140px]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Checking...
      </Button>
    );
  }

  // If the domain is available, show a green "Available" badge.
  if (status === "available") {
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-700">
        <CheckCircle className="mr-2 h-4 w-4" />
        Available
      </Badge>
    );
  }
  
  // If the domain is taken, show a red "Taken" badge.
  if (status === "taken") {
     return (
      <Badge variant="destructive">
        <XCircle className="mr-2 h-4 w-4" />
        Taken
      </Badge>
    );
  }

  // If an error occurred, show a yellow "Error" badge to inform the user.
  if (status === "error") {
      return (
      <Badge variant="destructive" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700">
        <AlertTriangle className="mr-2 h-4 w-4" />
        Error
      </Badge>
    );
  }

  // Initially, render the "Check Availability" button.
  return (
    <Button variant="outline" size="sm" onClick={checkAvailability} className="w-[140px]">
      Check Availability
    </Button>
  );
}
