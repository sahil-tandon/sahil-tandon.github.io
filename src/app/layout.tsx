import type { Metadata } from "next";
import { Oxanium } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";

const oxanium = Oxanium({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-oxanium',
});

export const metadata: Metadata = {
  title: "Sahil Tandon - Frontend Engineer & Product Enthusiast",
  description: "Frontend Engineer with a passion for crafting delightful digital experiences that solve business problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oxanium.variable} font-oxanium antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
