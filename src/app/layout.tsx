import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { NewsToNameLogo } from "@/components/domain-muse-logo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "NewsToName",
  description: "AI-Powered Domain Name Suggestions from News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sourceCodePro.variable} font-body antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-grow">
            {children}
          </div>
          <footer className="py-4 text-center text-sm text-muted-foreground">
            <div>Made with ❤️ by Mouad ZERRAD</div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
