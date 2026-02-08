import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RNK Adventures | Explore Beyond Limits',
  description: 'Embark on unforgettable adventures with RNK Adventures. Mountain treks, safaris, and expeditions that create lasting memories.',
  keywords: 'adventure tours, mountain trekking, safaris, outdoor adventures, expeditions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
