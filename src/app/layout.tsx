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
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.05 3.67c4.56 0 8.26 3.71 8.26 8.26 0 4.56-3.71 8.26-8.26 8.26-1.55 0-3.04-.43-4.38-1.21l-.3-.18-3.26.86.88-3.18-.2-.32c-.84-1.31-1.29-2.83-1.29-4.42 0-4.55 3.71-8.26 8.26-8.26zm-2.32 4.57c-.18-.48.33-1.05.79-1.05h.42c.36 0 .61.09.84.42l.09.18.67 1.63.18.42c.18.42-.04.84-.23.94l-.62.36c-.18.09-.42.23-.61.42-.18.18-.36.36-.18.73s.56.94 1.14 1.51c.73.73 1.31.94 1.55 1.05.28.09.56-.05.79-.28l.23-.28c.18-.23.42-.23.7-.05l1.36.67c.28.14.47.42.52.66l.09.42c.05.23-.23.88-.7 1.05l-.42.18c-1.12.23-2.14-.37-2.92-1.14s-1.36-1.8-1.36-2.92.33-1.99.52-2.22z"/>
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
