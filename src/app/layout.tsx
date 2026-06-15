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
    default: 'AutoWelt Group | 0km con entrega inmediata y financiación en Buenos Aires',
    template: '%s | AutoWelt Group',
  },
  description: 'Cotizá tu Volkswagen 0km con entrega inmediata, cuotas fijas y retiro coordinado en Buenos Aires. Venta convencional, tomamos tu usado. Atención para compradores de todo el país.',
  keywords: [
    'volkswagen 0km', 'amarok 0km', 'vehiculos 0km buenos aires',
    'venta convencional 0km', 'amarok financiacion', 'amarok cuotas fijas',
    'amarok entrega inmediata', 'volkswagen amarok precio', 'financiar auto 0km argentina',
    'autowelt group', 'polo 0km', 'taos 0km', 'nivus 0km', 'tera 0km',
    'comprar 0km en buenos aires', 'cotizar 0km', 'auto 0km interior argentina',
    'tomamos usado parte de pago', 'retiro 0km buenos aires',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'AutoWelt Group | 0km con entrega inmediata y financiación en Buenos Aires',
    description: 'Cotizá tu Volkswagen 0km con entrega inmediata, cuotas fijas y retiro coordinado en Buenos Aires. Atención para compradores de todo el país.',
    url: 'https://autoweltgroup.com.ar',
    siteName: 'AutoWelt Group',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoWelt Group | 0km con entrega inmediata y financiación',
    description: 'Cotizá tu Volkswagen 0km con entrega inmediata, cuotas fijas y retiro coordinado en Buenos Aires.',
  },
}

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'AutoWelt Group',
  url: 'https://autoweltgroup.com.ar',
  logo: 'https://autoweltgroup.com.ar/images/logo/logo.svg',
  telephone: '+5491156010329',
  email: 'info@autoweltgroup.com.ar',
  description: 'AutoWelt Group coordina operaciones de vehículos 0km con concesionarias oficiales, financiación vigente y acompañamiento hasta la entrega. Venta convencional, entrega inmediata y atención para compradores de todo el país.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Buenos Aires',
    addressCountry: 'AR',
  },
  areaServed: 'AR',
  openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00'],
}

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${jakarta.variable}`}>
      <body
        className="min-h-screen flex flex-col"
        style={{ fontFamily: 'var(--font-inter), sans-serif', overflowX: 'hidden' }}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
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
