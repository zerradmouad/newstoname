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
      {...props}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.35 3.45 16.86L2.05 22L7.31 20.55C8.77 21.33 10.37 21.8 12.04 21.8H12.05C17.5 21.8 21.95 17.35 21.95 11.89C21.95 9.28 20.94 6.88 19.14 5.08C17.34 3.28 14.83 2 12.04 2M12.05 3.67C16.56 3.67 20.28 7.38 20.28 11.89C20.28 16.4 16.56 20.11 12.05 20.11C10.56 20.11 9.14 19.68 7.91 18.9L7.44 18.62L4.25 19.54L5.18 16.41L4.88 15.91C4.06 14.58 3.61 13.06 3.61 11.89C3.61 7.38 7.32 3.67 12.05 3.67M9.13 7.59C8.89 7.59 8.67 7.6 8.41 8.04C8.15 8.48 7.45 9.14 7.45 10.41C7.45 11.68 8.42 12.9 8.58 13.09C8.74 13.28 10.16 15.52 12.33 16.46C14.05 17.18 14.5 17.02 14.88 16.97C15.42 16.89 16.46 16.29 16.71 15.63C16.96 14.96 16.96 14.42 16.88 14.32C16.79 14.23 16.63 14.17 16.38 14.04C16.12 13.91 14.7 13.26 14.46 13.16C14.21 13.06 14.05 13.02 13.89 13.28C13.73 13.54 13.26 14.11 13.12 14.27C12.98 14.43 12.83 14.46 12.58 14.33C12.33 14.2 11.23 13.84 9.92 12.67C8.89 11.77 8.23 10.66 8.07 10.4C7.91 10.14 8.08 9.99 8.23 9.85C8.36 9.73 8.52 9.53 8.68 9.37C8.84 9.21 8.9 9.12 9.03 8.9C9.15 8.68 9.09 8.52 9.01 8.36C8.93 8.2 8.47 7.06 8.28 6.62C8.09 6.18 7.9 6.22 7.76 6.22H7.61C7.47 6.22 7.23 6.28 7 6.54C6.77 6.8 6.07 7.46 6.07 8.73C6.07 10 7.04 11.21 7.2 11.4C7.36 11.59 8.78 13.83 10.95 14.77C12.67 15.49 13.12 15.33 13.5 15.28C14.04 15.2 15.08 14.6 15.33 13.94C15.58 13.27 15.58 12.73 15.5 12.63C15.41 12.54 15.25 12.48 15 12.35C14.75 12.22 13.32 11.57 13.08 11.47C12.83 11.37 12.67 11.33 12.51 11.59C12.35 11.85 11.88 12.42 11.74 12.58C11.6 12.74 11.45 12.77 11.2 12.64C10.95 12.51 9.85 12.15 8.54 11C7.51 10.1 6.85 8.99 6.69 8.73C6.53 8.47 6.7 8.32 6.85 8.18C6.98 8.06 7.14 7.86 7.3 7.7C7.46 7.54 7.52 7.45 7.65 7.23C7.77 7.01 7.71 6.85 7.63 6.69C7.55 6.53 7.09 5.39 6.9 4.95C6.71 4.51 6.52 4.55 6.38 4.55H6.23C6.09 4.55 5.85 4.61 5.62 4.87C5.39 5.13 4.69 5.79 4.69 7.06C4.69 8.33 5.66 9.54 5.82 9.73C5.98 9.92 7.4 12.16 9.57 13.1C11.29 13.82 11.74 13.66 12.12 13.61C12.66 13.53 13.7 12.93 13.95 12.27C14.2 11.6 14.2 11.06 14.12 10.96C14.03 10.87 13.87 10.81 13.62 10.68C13.38 10.55 11.94 9.9 11.7 9.8C11.45 9.7 11.29 9.66 11.13 9.92C10.97 10.18 10.5 10.75 10.36 10.91C10.22 11.07 10.07 11.1 9.82 10.97C9.57 10.84 8.47 10.48 7.16 9.31C6.13 8.41 5.47 7.3 5.31 7.04C5.15 6.78 5.32 6.63 5.47 6.49C5.6 6.37 5.76 6.17 5.92 6.01C6.08 5.85 6.14 5.76 6.27 5.54C6.39 5.32 6.33 5.16 6.25 5C6.17 4.84 5.71 3.7 5.52 3.26C5.33 2.82 5.14 2.86 5 2.86Z" />
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
