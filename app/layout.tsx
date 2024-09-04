import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Roast My Fit',
  description: 'Upload your outfit and get a hilarious AI-generated roast. Fashion critique meets comedy!',
  keywords: ['fashion', 'AI', 'roast', 'outfit', 'comedy', 'style'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Roast My Fit',
    description: 'Get your outfit roasted by AI',
    url: 'https://roastmyfit.com',
    siteName: 'Roast My Fit',
    images: [
      {
        url: 'https://roastmyfit.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roast My Fit - AI Fashion Roasts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roast My Fit',
    description: 'Upload your outfit and get a hilarious AI-generated roast',
    images: ['https://roastmyfit.com/twitter-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
