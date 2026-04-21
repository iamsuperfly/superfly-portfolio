import './globals.css';

export const metadata = {
  title: 'Superfly — One build at a time.',
  description: 'Superfly portfolio: technical builds, mobile-first development, and creator-led documentation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
