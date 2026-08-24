import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ibendavi.github.io'),
  title: 'Two Roads West | Winter Break 2026',
  description: 'Two detailed family road-trip options from Menlo Park: Utah parks or the Northern California and Oregon coast.',
  openGraph: {
    title: 'Two Roads West | Winter Break 2026',
    description: 'Two detailed family road-trip options from Menlo Park: Utah parks or the Northern California and Oregon coast.',
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
    description: 'Utah parks or the Pacific coast: two detailed family road-trip plans.',
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
