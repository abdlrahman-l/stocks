import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/query/provider";
import { DateProvider } from "./date-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "US Stock Exchange App",
  description: "US Stock Exchange App, Compare the stocks and buy the best",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <DateProvider>
            <main className="mx-auto max-w-3xl p-3 space-y-3">
              {children}
            </main>
          </DateProvider>
        </Providers>
      </body>
    </html>
  );
}
