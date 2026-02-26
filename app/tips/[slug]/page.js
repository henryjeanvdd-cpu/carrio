'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { articles } from '../articles';
import { useParams } from 'next/navigation';

export default function ArticlePage() {
  const { lang } = useLanguage();
  const params = useParams();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F0F2F7] mb-4">404</h1>
          <p className="text-[#6B7A99] mb-6">{lang === 'fr' ? 'Article non trouve' : 'Artikel niet gevonden'}</p>
          <Link href="/tips" className="text-[#3B82F6] underline">{lang === 'fr' ? '← Retour aux conseils' : '← Terug naar tips'}</Link>
        </div>
      </div>
    );
  }

  const title = lang === 'fr' ? article.titleFr : article.titleNl;
  const content = lang === 'fr' ? article.contentFr : article.contentNl;
  const tag = lang === 'fr' ? article.tagFr : article.tagNl;

  // Determine CTA based on article tag
  const ctaMap = {
    SOLLICITATIEBRIEF: { href: '/brief', nl: 'Schrijf je sollicitatiebrief — gratis', fr: 'Redigez votre lettre — gratuit' },
    'LETTRE DE MOTIVATION': { href: '/brief', nl: 'Schrijf je sollicitatiebrief — gratis', fr: 'Redigez votre lettre — gratuit' },
    CV: { href: '/cv', nl: 'Maak je CV — gratis', fr: 'Creez votre CV — gratuit' },
    INTERVIEW: { href: '/interview', nl: 'Oefen je interview — gratis', fr: 'Entrainez-vous — gratuit' },
    ENTRETIEN: { href: '/interview', nl: 'Oefen je interview — gratis', fr: 'Entrainez-vous — gratuit' },
  };
  const cta = ctaMap[tag] || ctaMap.SOLLICITATIEBRIEF;

  // Simple markdown-to-JSX renderer
  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} style={{ fontSize: 22, fontWeight: 700, color: '#F0F2F7', margin: '32px 0 12px' }}>{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} style={{ fontSize: 15, fontWeight: 700, color: '#D4DCE8', margin: '16px 0 4px' }}>{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- **')) {
        const parts = line.replace('- **', '').split('**:');
        return (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14, color: '#94A3C0', lineHeight: 1.7 }}>
            <span style={{ color: '#3B82F6', flexShrink: 0 }}>•</span>
            <span><strong style={{ color: '#D4DCE8' }}>{parts[0]}</strong>{parts[1] ? ':' + parts[1] : ''}</span>
          </div>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14, color: '#94A3C0', lineHeight: 1.7 }}>
            <span style={{ color: '#3B82F6', flexShrink: 0 }}>•</span>
            <span>{line.replace('- ', '')}</span>
          </div>
        );
      }
      if (line.trim() === '') return <div key={i} style={{ height: 8 }} />;
      return <p key={i} style={{ fontSize: 14, color: '#94A3C0', lineHeight: 1.8, margin: '0 0 8px' }}>{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <header className="border-b border-[#2A355030] bg-[#141B2D80]" style={{ backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[700px] mx-auto px-5 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#3B82F6] to-[#10B981] flex items-center justify-center text-sm font-bold text-white">C</div>
              <span className="text-base font-bold text-[#F0F2F7]">Carrio</span>
            </Link>
            <div className="flex-1" />
            <Link href="/tips" style={{ fontSize: 13, color: '#6B7A99', textDecoration: 'none' }}>
              {lang === 'fr' ? '← Tous les conseils' : '← Alle tips'}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[700px] mx-auto px-5 py-10">
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <span style={{
              fontSize: 10, fontWeight: 600, letterSpacing: 1,
              padding: '3px 8px', borderRadius: 4,
              background: `${article.tagColor}18`, color: article.tagColor,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{tag}</span>
            <span style={{ fontSize: 12, color: '#6B7A99', alignSelf: 'center' }}>
              {article.readTime} {lang === 'fr' ? 'min de lecture' : 'min leestijd'}
            </span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F0F2F7', lineHeight: 1.3, margin: 0 }}>{title}</h1>
        </div>

        <article>
          {renderContent(content)}
        </article>

        {/* CTA */}
        <div style={{
          marginTop: 48, padding: 28, borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(16,185,129,0.08))',
          border: '1px solid rgba(59,130,246,0.2)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F0F2F7', margin: '0 0 8px' }}>
            {lang === 'fr' ? 'Pret a commencer ?' : 'Klaar om te beginnen?'}
          </h3>
          <p style={{ fontSize: 14, color: '#94A3C0', margin: '0 0 20px' }}>
            {lang === 'fr' ? 'Essayez Carrio gratuitement — aucune inscription requise.' : 'Probeer Carrio gratis — geen account nodig.'}
          </p>
          <Link href={cta.href} style={{
            display: 'inline-block', padding: '12px 28px', borderRadius: 10,
            fontSize: 14, fontWeight: 700,
            background: 'linear-gradient(135deg, #3B82F6, #10B981)',
            color: '#FFF', textDecoration: 'none',
          }}>{lang === 'fr' ? cta.fr : cta.nl}</Link>
        </div>

        {/* More articles */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F0F2F7', marginBottom: 16 }}>
            {lang === 'fr' ? 'Autres articles' : 'Meer artikelen'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {articles.filter((a) => a.slug !== article.slug).map((a) => (
              <Link href={`/tips/${a.slug}`} key={a.slug} style={{
                display: 'flex', gap: 12, padding: 16, borderRadius: 10,
                background: '#141B2D', border: '1px solid rgba(42,53,80,0.4)',
                textDecoration: 'none', alignItems: 'center',
              }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4,
                  background: `${a.tagColor}18`, color: a.tagColor,
                  fontFamily: "'JetBrains Mono', monospace", flexShrink: 0,
                }}>{lang === 'fr' ? a.tagFr : a.tagNl}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#D4DCE8' }}>
                  {lang === 'fr' ? a.titleFr : a.titleNl}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid rgba(42,53,80,0.3)', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#6B7A99' }}>© 2026 Carrio. Gemaakt in Antwerpen 🇧🇪</p>
      </footer>
    </div>
  );
}
