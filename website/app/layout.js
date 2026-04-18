import { Fraunces, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'designlang — reads a website the way a developer reads a stylesheet',
  description:
    'Extracts the complete design system from any live website. DTCG tokens, multi-platform emitters, MCP server, agent rules. One URL in, a design system out.',
  metadataBase: new URL('https://designlang.dev'),
  openGraph: {
    title: 'designlang',
    description: 'Extracts the complete design system from any live website.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#F3F1EA',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
