import './globals.css';
import CookieBanner from '@/components/CookieBanner';
import { LanguageProvider } from '@/lib/LanguageContext';

export const metadata = {
  title: 'Carrio – AI Sollicitatiebrief & Motivatiebrief Generator | België',
  description: 'Schrijf in 30 seconden een professionele sollicitatiebrief of motivatiebrief met AI. Specifiek voor de Belgische arbeidsmarkt.',
  keywords: 'sollicitatiebrief, motivatiebrief, sollicitatiebrief schrijven, motivatiebrief voorbeeld, sollicitatiebrief voorbeeld, lettre de motivation, lettre de motivation Belgique',
  openGraph: {
    title: 'Carrio – AI Sollicitatiebrief & Motivatiebrief Generator voor België',
    description: 'Schrijf overtuigende sollicitatiebrieven en motivatiebrieven met AI. Specifiek voor België.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl-BE">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
