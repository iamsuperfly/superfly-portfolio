import './globals.css';

const siteUrl = 'https://iamsuperflly.vercel.app/';
const title = 'Superfly — Builder Portfolio';
const description =
  'Superfly is an independent builder creating useful digital products, websites, and tools. Explore builds and collaborate.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Superfly Portfolio',
    images: [
      {
        url: '/images/branding/IMG_20251226_201906_741.jpg',
        width: 1200,
        height: 630,
        alt: 'Superfly portfolio preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@iamsuperflyy',
    images: ['/images/branding/IMG_20251226_201906_741.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
