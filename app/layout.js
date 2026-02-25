import './globals.css';
import CookieBanner from '@/components/CookieBanner';

export const metadata = {
  title: 'Carrio – AI Sollicitatiebrief & Motivatiebrief Generator | België',
  description: 'Schrijf in 30 seconden een professionele sollicitatiebrief of motivatiebrief met AI. Specifiek voor de Belgische arbeidsmarkt.',
  keywords: 'sollicitatiebrief, motivatiebrief, sollicitatiebrief schrijven, motivatiebrief voorbeeld, sollicitatiebrief voorbeeld, sollicitatie, carrière, brief schrijven',
  openGraph: {
    title: 'Carrio – AI Sollicitatiebrief & Motivatiebrief Generator voor België',
    description: 'Schrijf overtuigende sollicitatiebrieven en motivatiebrieven met AI. Specifiek voor België. In NL, FR en EN.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl-BE">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
