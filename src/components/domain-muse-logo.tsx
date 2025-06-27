import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function DomainMuseLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-8 h-8", props.className)}
      {...props}
    >
      <title>Domain Muse Logo</title>
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="hsl(var(--primary))" opacity="0.6" />
      <path d="M2 17l10 5 10-5" stroke="hsl(var(--accent))" />
      <path d="M2 12l10 5 10-5" stroke="hsl(var(--accent))" />
      <path d="M12 22V12" stroke="hsl(var(--primary))" />
      <circle cx="12" cy="12" r="3" fill="hsl(var(--accent))" stroke="hsl(var(--background))" strokeWidth="1" />
    </svg>
  );
}
