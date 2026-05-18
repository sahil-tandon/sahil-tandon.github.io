import type { Metadata } from "next";
import { Oxanium } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL, OG } from '@/lib/site';

const oxanium = Oxanium({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-oxanium',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: OG.defaultImage,
        width: OG.width,
        height: OG.height,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [OG.defaultImage],
    ...(AUTHOR.twitter ? { creator: AUTHOR.twitter, site: AUTHOR.twitter } : {}),
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oxanium.variable} font-oxanium antialiased`}>
        {children}
        <GoogleAnalytics gaId="G-EYYW253R71" />
      </body>
    </html>
  );
}