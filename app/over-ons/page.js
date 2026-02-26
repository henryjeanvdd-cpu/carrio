'use client';

import Link from 'next/link';
import { useLanguage } from '../../lib/LanguageContext';

export default function OverOns() {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: '100vh', background: '#0a0b14', color: '#F0F2F7' }}>

      {/* HEADER */}
      <header style={{ padding: '20px 24px', borderBottom: '1px solid rgba(42,53,80,0.3)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #3B82F6, #10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 }}>C</div>
            <span style={{ color: '#F0F2F7', fontWeight: 700, fontSize: 18 }}>Carrio</span>
          </Link>
          <Link href="/brief" style={{
            padding: '10px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600,
            background: 'linear-gradient(135deg, #3B82F6, #10B981)',
            color: '#FFF', textDecoration: 'none',
          }}>{t.about_nav_cta}</Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: '80px 24px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
            {t.about_title}
          </h1>
          <p style={{ fontSize: 18, color: '#94A3C0', lineHeight: 1.7, margin: 0 }}>
            {t.about_subtitle}
          </p>
        </div>
      </section>

      {/* MISSIE */}
      <section style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ background: 'rgba(20,22,40,0.8)', border: '1px solid rgba(42,53,80,0.5)', borderRadius: 16, padding: '40px 32px' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 16px', color: '#F0F2F7' }}>{t.about_mission_title}</h2>
            <p style={{ fontSize: 15, color: '#94A3C0', lineHeight: 1.8, margin: '0 0 16px' }}>
              {t.about_mission_p1}
            </p>
            <p style={{ fontSize: 15, color: '#94A3C0', lineHeight: 1.8, margin: 0 }}>
              {t.about_mission_p2}
            </p>
          </div>
        </div>
      </section>

      {/* WAAROM CARRIO */}
      <section style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 24px', textAlign: 'center', color: '#F0F2F7' }}>{t.about_why_title}</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { icon: '🇧🇪', title: t.about_why1_title, desc: t.about_why1_desc },
              { icon: '⚡', title: t.about_why2_title, desc: t.about_why2_desc },
              { icon: '🎯', title: t.about_why3_title, desc: t.about_why3_desc },
              { icon: '🔒', title: t.about_why4_title, desc: t.about_why4_desc },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(20,22,40,0.8)', border: '1px solid rgba(42,53,80,0.5)',
                borderRadius: 12, padding: '24px',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#F0F2F7' }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#94A3C0', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{
            background: 'rgba(20,22,40,0.8)', border: '1px solid rgba(42,53,80,0.5)',
            borderRadius: 16, padding: '40px 32px', textAlign: 'center',
          }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 12px', color: '#F0F2F7' }}>{t.about_contact_title}</h2>
            <p style={{ fontSize: 15, color: '#94A3C0', lineHeight: 1.8, margin: '0 0 20px' }}>
              {t.about_contact_desc}
            </p>
            <a href="mailto:hello@carrio.be" style={{
              display: 'inline-block',
              padding: '14px 32px', borderRadius: 12, fontSize: 16, fontWeight: 600,
              background: 'linear-gradient(135deg, #3B82F6, #10B981)',
              color: '#FFF', textDecoration: 'none',
              boxShadow: '0 4px 32px rgba(59,130,246,0.3)',
            }}>
              hello@carrio.be
            </a>
            <p style={{ fontSize: 13, color: '#6B7A99', marginTop: 16 }}>
              Antwerpen, België 🇧🇪
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '32px 24px', borderTop: '1px solid rgba(42,53,80,0.3)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p style={{ fontSize: 12, color: '#6B7A99', marginTop: 12 }}>
            {t.footer_copy}
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 8 }}>
            <Link href="/" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>{t.about_footer_home}</Link>
            <Link href="/brief" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>{t.about_footer_brief}</Link>
            <a href="mailto:hello@carrio.be" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>{t.footer_contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
