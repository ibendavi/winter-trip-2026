import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ibendavi.github.io'),
  title: 'Two Roads West | Winter Break 2026',
  description: 'Four family road-trip options for Dec 21, 2026 to Jan 2, 2027, weighed against the NOAA El Niño outlook: Utah parks, the Oregon coast, the southern coast and desert, or Sequoia and Death Valley.',
  openGraph: {
    title: 'Two Roads West | Winter Break 2026',
    description: 'Four family road-trip options for Dec 21, 2026 to Jan 2, 2027, weighed against the NOAA El Niño outlook.',
    url: 'https://ibendavi.github.io/winter-trip-2026/',
    siteName: 'Two Roads West',
    images: [
      {
        url: '/winter-trip-2026/og.png',
        width: 1730,
        height: 909,
        alt: 'Two Roads West, Winter Break 2026',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Two Roads West | Winter Break 2026',
    description: 'Utah parks, the Pacific coast, or the southern deserts: four family road-trip plans.',
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
