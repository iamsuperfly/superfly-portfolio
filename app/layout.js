import './globals.css';

export const metadata = {
  title: 'Your Name — Portfolio',
  description: 'Minimal premium developer portfolio built with Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
