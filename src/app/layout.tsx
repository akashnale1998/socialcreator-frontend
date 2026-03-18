import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SocialCreator AI - Grow Instagram & YouTube",
  description: "All-in-one AI Instagram Caption Generator, YouTube Title Generator, and Reel Hook Generator. Grow your social media with viral content in seconds.",
  verification: {
    google: "GagVu1HuhYLdxqjToKPL_F9ZVE7lmkq7W7smMFrq2eY",
  },
};

import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#030014] text-white`}
        suppressHydrationWarning
      >
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <ReduxProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ReduxProvider>
      </body>
    </html>
  );
}

