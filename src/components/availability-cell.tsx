"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { checkDomainAvailabilityAction } from "@/app/actions";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "available" | "taken" | "error";

interface AvailabilityCellProps {
  domainName: string;
}

/**
 * A map to define the display properties for each availability status.
 * This includes the icon, text, and styling for the badge.
 */
const statusInfo = {
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

/**
 * A component that renders a button to check domain availability.
 * It manages its own state for the lookup process (idle, loading, and result states).
 *
 * @param {AvailabilityCellProps} props - The props for the component.
 * @param {string} props.domainName - The domain name to check.
 */
export function AvailabilityCell({ domainName }: AvailabilityCellProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the click event of the "Check Availability" button.
   * It calls the server action and updates the component's state based on the result.
   */
  const handleCheck = async () => {
    setIsLoading(true);
    // This server action performs the real-time WHOIS lookup.
    const result = await checkDomainAvailabilityAction(domainName);
    setStatus(result.status);
    setIsLoading(false);
  };

  // While loading, show a disabled button with a spinner.
  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Checking...
      </Button>
    );
  }

  // In the initial 'idle' state or on 'error', show the check button.
  // This allows the user to initiate the check or retry if it failed.
  if (status === "idle" || status === "error") {
    return (
      <Button variant="outline" size="sm" onClick={handleCheck}>
        {status === "error" ? (
          <>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Check Again
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Check Availability
          </>
        )}
      </Button>
    );
  }

  // Once the check is successful, display the result as a styled badge.
  const { Icon, text, variant, className } = statusInfo[status];

  return (
    <Badge variant={variant} className={cn(className, "cursor-default")}>
      <Icon className="mr-2 h-4 w-4" />
      {text}
    </Badge>
  );
}
