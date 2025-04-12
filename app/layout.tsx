import './globals.css'
import type { Metadata } from 'next'
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Orison - Une voix intérieure',
  description: 'Un sanctuaire pour votre mémoire. Un espace intime de transmission.',
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  )
}
