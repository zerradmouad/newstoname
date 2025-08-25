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
    <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.7-.8.9-.1.1-.3.1-.5 0-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6s0-.3.1-.4.2-.2.4-.4.1-.2.2-.4.1-.3 0-.4c-.1-.1-.6-1.5-.8-2s-.4-.5-.6-.5h-.5c-.2 0-.5.2-.6.4-.1.2-.6 1.5-.6 2.9 0 1.5.7 3.4 1.7 4.4 1 1 2.2 1.7 4.3 1.7.5 0 1-.1 1.5-.2.5-.1 1.5-.7 1.7-1.3.2-.6.2-1.1.1-1.2s-.2-.2-.4-.3zm3.5-5.9c-1.5-1.5-3.5-2.3-5.6-2.3-4.4 0-8 3.6-8 8s3.6 8 8 8c2.1 0 4.1-.8 5.6-2.3l.1-.1-1.1-1.1-1.1-1.1c-.2.2-.4.4-.6.5-.2.1-.4.2-.6.2h-1c-2.4 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h1c.2 0 .4.1.6.2.2.1.4.3.6.5l1.1-1.1 1.1-1.1-.1-.1zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
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
