import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

import "@/app/(app)/globals.css";

import  Navbar  from "@/components/navbar";
import FooterSection from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || process.env.URL || "https://codingclubcuh.online"),
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
        className={`${fontInter.variable} ${fontHandjet.variable} ${fontJersey.variable} ${fontInter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Toaster />
          <NextTopLoader
            color="#3b82f6"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #3b82f6,0 0 5px #8b5cf6"
          />
          {children}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}
