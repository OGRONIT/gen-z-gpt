import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Montserrat } from 'next/font/google'

// Plus Jakarta Sans: The "Apple-esque" modern font for clean UI
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gen-Z GPT | Maximum Aura for Founders',
  description: 'The insanely goated SaaS to transform boring corporate talk into high-signal Gen-Z slang. No cap, just vibes.',
  keywords: ['AI', 'Gen-Z', 'Slang', 'SaaS', 'CoDaddy', 'Narrative Coding', 'Sigma Tools'],
  authors: [{ name: 'Ronit (CoDaddy)' }],
  icons: {
    icon: '/favicon.ico', // Make sure to add a zap emoji favicon
  },
  openGraph: {
    title: 'Gen-Z GPT | Fix Your Mid Narrative',
    description: 'Get some rizz in your updates. Secure the bag with Gen-Z GPT.',
    url: 'https://genz-gpt.com',
    siteName: 'Gen-Z GPT',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gen-Z GPT',
    description: 'Stop sounding like an NPC. Elevate to Sigma status.',
    creator: '@codaddy_ronit',
  },
}

export const viewport: Viewport = {
  themeColor: '#FDFDFF', // Clean white theme color for mobile browsers
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`
          ${jakarta.variable} 
          ${montserrat.variable} 
          font-sans 
          bg-[#FDFDFF] 
          text-[#1A1A1A] 
          antialiased 
          selection:bg-yellow-300 
          selection:text-black
        `}
      >
        {/* The Mesh Aura Layer (Subtle background texture) */}
        <div className="mesh-bg" />
        
        {/* Custom Cursor Dot (Optional: add the JS in page.tsx) */}
        <div className="hidden lg:block cursor-dot" />

        <div className="flex flex-col min-h-screen relative overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}