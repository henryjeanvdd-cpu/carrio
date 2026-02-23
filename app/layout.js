import './globals.css';

export const metadata = {
  title: 'Carrio — AI Sollicitatiebrief & Motivatiebrief Generator | België',
  description: 'Schrijf in 30 seconden een professionele sollicitatiebrief of motivatiebrief met AI. Specifiek voor de Belgische arbeidsmarkt. In het Nederlands, Frans en Engels. VDAB, Actiris & Forem compatibel.',
  keywords: 'sollicitatiebrief, motivatiebrief, sollicitatiebrief schrijven, motivatiebrief voorbeeld, sollicitatiebrief voorbeeld, CV, interview, België, Vlaanderen, VDAB, Actiris, Forem, AI, werkzoekend, sollicitatie, carrière, brief schrijven',
  openGraph: {
    title: 'Carrio — AI Sollicitatiebrief & Motivatiebrief Generator voor België',
    description: 'Schrijf overtuigende sollicitatiebrieven en motivatiebrieven met AI. Specifiek voor België. In NL, FR en EN.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl-BE">
      <body>{children}</body>
    </html>
  );
}
