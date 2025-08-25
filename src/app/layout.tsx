import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "NewsToName",
  description: "AI-Powered Domain Name Suggestions from News",
};

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zM17.5 19.5l-1.4-2L7.5 4.5l1.4 2L17.5 19.5z" />
  </svg>
);

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    {...props}>
    <path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.28 1.28.2 1.02 1.31L17.1 17.61c-.24.82-.78 1-1.4.6L12 14.84l-2.22 2.15c-.45.42-1.01.62-1.29.64z"/>
    </svg>
);


const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <path d="M19.04 4.96C17.02 2.94 14.57 1.92 12 1.92S6.98 2.94 4.96 4.96C2.94 6.98 1.92 9.43 1.92 12s1.02 5.02 3.04 7.04c2.02 2.02 4.47 3.04 7.04 3.04s5.02-1.02 7.04-3.04c2.02-2.02 3.04-4.47 3.04-7.04s-1.02-5.02-3.04-7.04zm-5.49 12.33l-.08.05c-1.36.79-2.92 1.21-4.48 1.21-3.69 0-6.7-3-6.7-6.7s3.01-6.7 6.7-6.7c1.78 0 3.44.7 4.71 1.97s1.97 2.93 1.97 4.71c0 1.56-.54 3.12-1.61 4.39l.06-.08-1.57 1.55zm-1.8-1.95l.44.26c.78.46 1.68.7 2.6.7 2.87 0 5.2-2.33 5.2-5.2s-2.33-5.2-5.2-5.2-5.2 2.33-5.2 5.2c0 .92.24 1.82.7 2.6l.26.44-1.12 1.12 1.12-1.12zm-2.82-3.66c-.14-.24-.28-.5-.38-.76s-.14-.52-.14-.78.05-.5.14-.72.24-.44.38-.64l.28-.35.35-.28.64-.38.72-.14.78-.14.76.38.64.38.5.28.35.35.28.5.14.64.14.72-.14.78-.28.64-.38.5-.5.35-.64.28-1.02-.2-1.88-.9-2.6-1.57-1.24-2.1-1.88-2.6-2.6z"/>
    </svg>
);

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
            <div className="flex justify-center items-center space-x-4 mb-2">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <WhatsAppIcon className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <TelegramIcon className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <XIcon className="w-5 h-5" />
              </a>
            </div>
            <div>Made with ❤️ by Mouad ZERRAD</div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
