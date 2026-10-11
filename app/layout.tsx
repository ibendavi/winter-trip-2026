import type { Metadata } from 'next';
import './globals.css';

const description =
  'A 13-day family winter road trip, Dec 21, 2026 to Jan 2, 2027: the Hualapai canyon rim, Hoover Dam, Zion, Bryce, Capitol Reef, Arches, and Canyonlands, from Las Vegas to Salt Lake City, with stays, a detailed map, weather, and the NOAA El Niño outlook.';

export const metadata: Metadata = {
  metadataBase: new URL('https://ibendavi.github.io'),
  title: 'West Rim to Red Rock | Winter Break 2026',
  description,
  openGraph: {
    title: 'West Rim to Red Rock | Winter Break 2026',
    description,
    url: 'https://ibendavi.github.io/winter-trip-2026/',
    siteName: 'West Rim to Red Rock',
    images: [
      {
        url: '/winter-trip-2026/og.png',
        width: 1200,
        height: 630,
        alt: 'Delicate Arch in snow with the title West rim to red rock',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'West Rim to Red Rock | Winter Break 2026',
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
