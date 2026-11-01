import type { Metadata } from 'next';
import './globals.css';

const description =
  'A 13-day family winter road trip in the Arizona low desert, Dec 21, 2026 to Jan 2, 2027: the Superstitions and Apache Trail, Globe, Tonto, Organ Pipe, Tucson, Tombstone, Bisbee, and Kartchner Caverns, round trip from Phoenix, with stays, a detailed map, weather, and the NOAA El Niño outlook.';

export const metadata: Metadata = {
  metadataBase: new URL('https://ibendavi.github.io'),
  title: 'The Warm Desert Loop | Winter Break 2026',
  description,
  openGraph: {
    title: 'The Warm Desert Loop | Winter Break 2026',
    description,
    url: 'https://ibendavi.github.io/winter-trip-2026/',
    siteName: 'The Warm Desert Loop',
    images: [
      {
        url: '/winter-trip-2026/og.png',
        width: 1200,
        height: 630,
        alt: 'The Superstition Mountains with the title The warm desert loop',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Warm Desert Loop | Winter Break 2026',
    description: 'Hualapai canyon, Zion, Bryce, Moab, and Salt Lake City: a 13-day winter road trip plan.',
    images: ['/winter-trip-2026/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
