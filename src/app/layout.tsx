import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Preloader from '@/components/Preloader'


const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap', weight: ['700', '800', '900'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://autoweltgroup.com.ar'),
  title: {
    default: 'Autos Welt — Planes Adjudicados y 0km en Argentina',
    template: '%s | Autos Welt',
  },
  description: 'Especialistas en planes adjudicados y autos 0km. Amarok V6, Polo, Taos, Tera. Financiación oficial VW, cuotas fijas en pesos, tasa 0%, entrega inmediata. Buenos Aires.',
  keywords: [
    'planes adjudicados', 'autos 0km argentina', 'volkswagen 0km', 'amarok 0km',
    'amarok financiacion argentina', 'amarok cuotas fijas', 'amarok entrega inmediata',
    'volkswagen amarok precio', 'financiar auto 0km argentina', 'autos welt',
    'polo 0km', 'taos 0km', 'concesionario volkswagen caba', 'auto financiado argentina',
  ],
  openGraph: {
    title: 'Autos Welt — Planes Adjudicados y 0km',
    description: 'Especialistas en planes adjudicados. VW, Fiat, Peugeot, Renault, Toyota, Chevrolet y Ford.',
    url: 'https://autoweltgroup.com.ar',
    siteName: 'Autos Welt',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-inter), sans-serif', overflowX: 'hidden' }} suppressHydrationWarning>
        <Preloader />
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17888545559"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17888545559');
        `}
      </Script>
    </html>
  )
}
