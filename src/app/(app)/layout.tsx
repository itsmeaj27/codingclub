import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";

import "@/app/(app)/globals.css";

import  Navbar  from "@/components/navbar";
import FooterSection from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

const fontHandjet = localFont({
  src: "./fonts/Handjet/Handjet-VariableFont_ELGR,ELSH,wght.ttf",
  variable: "--font-handjet",
});

const fontJersey = localFont({
  src: "./fonts/Jersey_20/Jersey20-Regular.ttf",
  variable: "--font-jersey",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Coding Club Cuh",
  description: "coding club central university of haryana",
  metadataBase: new URL("https://codingclubcuh.vercel.app"),
  openGraph: {
    title: "Coding Club Cuh",
    description: "coding club central university of haryana",
  },
  keywords: [
    "ccc",
    "coding club",
    "coding club cuh",
    "central university of haryana",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontHandjet.variable} ${fontJersey.variable}  ${fontJersey.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Toaster />
          <NextTopLoader
            color="#9C4847"
            initialPosition={0.08}
            crawlSpeed={200}
            height={8}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #9C4847,0 0 5px #9C4847"
          />
          {children}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}
