import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://casiahwest.com"),
  title: "Casiah West — Relationship Counselor, Podcast Host, R.D.",
  description:
    "The advice no one else is gonna give you. Join For The Girls — a community for real talk on relationships, health, and becoming your best self.",
  openGraph: {
    title: "Casiah West — The Advice No One Else Is Gonna Give You",
    description:
      "Relationship counselor, podcast host, and the friend who tells you what you need to hear. Join the For The Girls community.",
    images: ["/images/casiah-5.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
