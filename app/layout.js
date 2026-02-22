import './globals.css';

export const metadata = {
  title: 'Carrio — Je carrière, jouw kracht. | AI Career Toolkit voor België',
  description: 'Genereer professionele motivatiebrieven, bouw CV\'s en bereid je voor op interviews. Specifiek voor de Belgische arbeidsmarkt. In NL, FR en EN.',
  keywords: 'carrière, motivatiebrief, CV, interview, België, VDAB, Actiris, Forem, AI, werkzoekend, sollicitatie',
  openGraph: {
    title: 'Carrio — Je carrière, jouw kracht.',
    description: 'AI-powered career toolkit voor België. Motivatiebrieven, CV\'s en interviewvoorbereiding in NL, FR en EN.',
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
