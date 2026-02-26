import './globals.css';
import CookieBanner from '@/components/CookieBanner';
import { LanguageProvider } from '@/lib/LanguageContext';

export const metadata = {
  title: {
    default: 'Carrio – AI Sollicitatiebrief & Motivatiebrief Generator | België',
    template: '%s | Carrio',
  },
  description: 'Schrijf in 30 seconden een professionele sollicitatiebrief, motivatiebrief of CV met AI. Specifiek voor de Belgische arbeidsmarkt. Nederlands, Frans & Engels.',
  keywords: [
    'sollicitatiebrief', 'motivatiebrief', 'sollicitatiebrief schrijven',
    'motivatiebrief voorbeeld', 'sollicitatiebrief voorbeeld',
    'sollicitatiebrief België', 'CV maken', 'CV builder',
    'interview voorbereiding', 'AI sollicitatiebrief',
    'lettre de motivation', 'lettre de motivation Belgique',
    'lettre de motivation exemple', 'CV Belgique',
    'sollicitatiebrief generator', 'motivatiebrief generator',
  ],
  metadataBase: new URL('https://carrio.be'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Carrio – AI Sollicitatiebrief, CV Builder & Interview Prep voor België',
    description: 'Schrijf overtuigende sollicitatiebrieven, bouw professionele CVs en bereid je interview voor met AI. Specifiek voor de Belgische arbeidsmarkt.',
    url: 'https://carrio.be',
    siteName: 'Carrio',
    locale: 'nl_BE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carrio – AI Career Toolkit voor België',
    description: 'Sollicitatiebrieven, CVs en interview prep met AI. Specifiek voor België.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl-BE">
      <head>
        <link rel="alternate" hrefLang="nl-BE" href="https://carrio.be" />
        <link rel="alternate" hrefLang="fr-BE" href="https://carrio.be" />
        <link rel="alternate" hrefLang="x-default" href="https://carrio.be" />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Carrio',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              url: 'https://carrio.be',
              description: 'AI-powered sollicitatiebrief generator, CV builder en interview prep voor de Belgische arbeidsmarkt.',
              offers: [
                {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'EUR',
                  name: 'Gratis',
                  description: '1 sollicitatiebrief, 1 CV, 1 interview sessie gratis',
                },
                {
                  '@type': 'Offer',
                  price: '4.99',
                  priceCurrency: 'EUR',
                  name: 'Starter',
                },
                {
                  '@type': 'Offer',
                  price: '9.99',
                  priceCurrency: 'EUR',
                  name: 'Pro',
                  priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' },
                },
                {
                  '@type': 'Offer',
                  price: '14.99',
                  priceCurrency: 'EUR',
                  name: 'Pro+',
                  priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' },
                },
              ],
              aggregateRating: undefined,
            }),
          }}
        />
        <CookieBanner />
      </body>
    </html>
  );
}
