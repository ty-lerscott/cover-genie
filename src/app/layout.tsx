import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cover Genie",
  description: "Create personalized cover letters in minutes with Cover Genie — the AI-powered tool that saves you time and crafts tailored, professional letters for any job. Smart, fast, and effortlessly effective.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
