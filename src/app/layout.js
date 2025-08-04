import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'ADmyBRAND Insights - Analytics Dashboard',
  description:
    'Professional analytics dashboard for digital marketing agencies. Track revenue, users, conversions, and campaign performance with beautiful charts and real-time data.',
  keywords:
    'analytics, dashboard, marketing, digital agency, insights, reports',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
