import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Preloader from '@/components/Preloader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://autoweltgroup.com.ar'),
  title: {
    default: 'AutoWelt Group — Volkswagen 0km y Planes Adjudicados',
    template: '%s | AutoWelt Group',
  },
  description: 'Especialistas en Volkswagen 0km y planes adjudicados. Amarok V6, Polo, Taos, Tera. Financiación oficial, cuotas fijas, entrega inmediata. Atendemos Buenos Aires y todo el interior del país.',
  keywords: [
    'volkswagen 0km', 'amarok 0km', 'planes adjudicados argentina',
    'amarok financiacion', 'amarok cuotas fijas', 'amarok entrega inmediata',
    'volkswagen amarok precio', 'financiar auto 0km argentina', 'autowelt group',
    'polo 0km', 'taos 0km', 'concesionario volkswagen caba', 'auto 0km interior argentina',
    'amarok interior del pais', 'comprar auto buenos aires',
  ],
  openGraph: {
    title: 'AutoWelt Group — Volkswagen 0km y Planes Adjudicados',
    description: 'Especialistas en 0km y adjudicados. Amarok, Polo, Taos, Tera. Atendemos Buenos Aires y todo el interior.',
    url: 'https://autoweltgroup.com.ar',
    siteName: 'AutoWelt Group',
    locale: 'es_AR',
    type: 'website',
  },
}

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jakarta.variable}`}>
      <body
        className="min-h-screen flex flex-col"
        style={{ fontFamily: 'var(--font-inter), sans-serif', overflowX: 'hidden' }}
        suppressHydrationWarning
      >
        <Preloader />
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>

      {/* Google Ads — existing */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17888545559" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-17888545559');
        ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ''}
      `}</Script>

      {/* Meta Pixel — condicional, requiere NEXT_PUBLIC_META_PIXEL_ID */}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}</Script>
      )}
    </html>
  )
}
