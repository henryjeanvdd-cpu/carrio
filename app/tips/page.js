'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { articles } from './articles';

export default function TipsOverview() {
  const { lang } = useLanguage();

  const t = {
    nl: {
      title: 'Tips & Advies',
      subtitle: 'Alles wat je moet weten over solliciteren in België. Praktische tips, voorbeelden en strategieën.',
      readMore: 'Lees meer →',
      min: 'min leestijd',
    },
    fr: {
      title: 'Conseils & Astuces',
      subtitle: 'Tout ce que vous devez savoir pour postuler en Belgique. Conseils pratiques, exemples et strategies.',
      readMore: 'Lire la suite →',
      min: 'min de lecture',
    },
  };

  const T = t[lang] || t.nl;

  return (
    <div className="min-h-screen bg-[#0B0F1A]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <header className="border-b border-[#2A355030] bg-[#141B2D80]" style={{ backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[900px] mx-auto px-5 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#3B82F6] to-[#10B981] flex items-center justify-center text-sm font-bold text-white">C</div>
              <span className="text-base font-bold text-[#F0F2F7]">Carrio</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-5 py-12">
        <div className="text-center mb-12">
          <span style={{
            fontSize: 10, letterSpacing: 3, color: '#3B82F6', fontWeight: 600,
            fontFamily: "'JetBrains Mono', monospace",
          }}>TIPS & ADVIES</span>
          <h1 className="text-3xl font-bold text-[#F0F2F7] mt-2 mb-3">{T.title}</h1>
          <p className="text-base text-[#94A3C0] max-w-[560px] mx-auto leading-relaxed">{T.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {articles.map((article) => (
            <Link href={`/tips/${article.slug}`} key={article.slug} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#141B2D', borderRadius: 14, padding: 24,
                border: '1px solid rgba(42,53,80,0.4)',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer',
                height: '100%',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(42,53,80,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: 1,
                    padding: '3px 8px', borderRadius: 4,
                    background: `${article.tagColor}18`, color: article.tagColor,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{lang === 'fr' ? article.tagFr : article.tagNl}</span>
                  <span style={{ fontSize: 11, color: '#6B7A99', alignSelf: 'center' }}>{article.readTime} {T.min}</span>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F0F2F7', margin: '0 0 8px', lineHeight: 1.4 }}>
                  {lang === 'fr' ? article.titleFr : article.titleNl}
                </h2>
                <p style={{ fontSize: 13, color: '#94A3C0', lineHeight: 1.7, margin: '0 0 16px' }}>
                  {lang === 'fr' ? article.excerptFr : article.excerptNl}
                </p>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#3B82F6' }}>{T.readMore}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer style={{ borderTop: '1px solid rgba(42,53,80,0.3)', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#6B7A99' }}>© 2026 Carrio. Gemaakt in Antwerpen 🇧🇪</p>
      </footer>
    </div>
  );
}
