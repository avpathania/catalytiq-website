import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CatalytIQ Systems - AI-Powered Business Automation for SMEs",
  description: "Transform your SME with intelligent automation solutions. Reduce manual work by 80%, improve accuracy, and scale your operations with our AI-powered workflows.",
  keywords: ["business automation", "AI automation", "SME automation", "workflow automation", "process automation"],
  authors: [{ name: "CatalytIQ Systems" }],
  creator: "CatalytIQ Systems",
  publisher: "CatalytIQ Systems",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://catalytiq.com",
    title: "CatalytIQ Systems - AI-Powered Business Automation for SMEs",
    description: "Transform your SME with intelligent automation solutions. Reduce manual work by 80%, improve accuracy, and scale your operations with our AI-powered workflows.",
    siteName: "CatalytIQ Systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "CatalytIQ Systems - AI-Powered Business Automation for SMEs",
    description: "Transform your SME with intelligent automation solutions. Reduce manual work by 80%, improve accuracy, and scale your operations with our AI-powered workflows.",
    creator: "@catalytiq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
