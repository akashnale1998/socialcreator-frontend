import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SocialCreator AI - Create Viral Content",
  description: "Generate viral hooks, titles, and script insights for your social media in seconds.",
};

import { ReduxProvider } from "@/components/providers/ReduxProvider";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#030014] text-white`}
      >
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

