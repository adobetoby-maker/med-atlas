import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  title: 'Med Atlas — 3D Medical Terminology',
  description: 'Master 1,200+ medical terms for MA, CMA, and CPC certification with immersive 3D anatomical flashcards and gamified quizzes.',
  keywords: ['medical terminology', 'flashcards', 'CMA exam prep', 'MA certification', 'medical assistant', 'CPC exam'],
  openGraph: {
    title: 'Med Atlas — 3D Medical Terminology',
    description: '1,200+ medical terms with 3D anatomy. Study for MA, CMA, CPC exams.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#080c14] text-white antialiased">
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});
            `}</Script>
          </>
        )}
        {children}
      </body>
    </html>
  )
}
