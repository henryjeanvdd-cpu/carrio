'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: 'linear-gradient(135deg, #3B82F6, #10B981)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 18, fontWeight: 800, color: '#FFF',
    }}>C</div>
    <span style={{ fontSize: 20, fontWeight: 700, color: '#F0F2F7', letterSpacing: 0.5 }}>Carrio</span>
  </div>
);

const LanguageSwitcher = () => {
  const { lang, switchLang } = useLanguage();
  return (
    <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', border: '1px solid #2A3550' }}>
      <button
        onClick={() => switchLang('nl')}
        style={{
          padding: '4px 10px', fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer',
          background: lang === 'nl' ? 'linear-gradient(135deg, #3B82F6, #10B981)' : 'transparent',
          color: lang === 'nl' ? '#FFF' : '#6B7A99',
          fontFamily: "'JetBrains Mono', monospace",
          transition: 'all 0.2s ease',
        }}
      >NL</button>
      <button
        onClick={() => switchLang('fr')}
        style={{
          padding: '4px 10px', fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer',
          borderLeft: '1px solid #2A3550',
          background: lang === 'fr' ? 'linear-gradient(135deg, #3B82F6, #10B981)' : 'transparent',
          color: lang === 'fr' ? '#FFF' : '#6B7A99',
          fontFamily: "'JetBrains Mono', monospace",
          transition: 'all 0.2s ease',
        }}
      >FR</button>
    </div>
  );
};

export default function LandingPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const features = [
    { emoji: '✍️', title: t.feature1_title, desc: t.feature1_desc, tag: t.feature1_tag, tagColor: '#10B981' },
    { emoji: '📄', title: t.feature2_title, desc: t.feature2_desc, tag: t.feature2_tag, tagColor: '#10B981' },
    { emoji: '🎤', title: t.feature3_title, desc: t.feature3_desc, tag: t.feature3_tag, tagColor: '#10B981' },
    { emoji: '💼', title: t.feature4_title, desc: t.feature4_desc, tag: t.feature4_tag, tagColor: '#F59E0B' },
  ];

  const steps = [
    { num: '1', title: t.step1_title, desc: t.step1_desc },
    { num: '2', title: t.step2_title, desc: t.step2_desc },
    { num: '3', title: t.step3_title, desc: t.step3_desc },
    { num: '✨', title: t.step4_title, desc: t.step4_desc },
  ];

  const faqs = [
    { q: t.faq1_q, a: t.faq1_a },
    { q: t.faq2_q, a: t.faq2_a },
    { q: t.faq3_q, a: t.faq3_a },
    { q: t.faq4_q, a: t.faq4_a },
    { q: t.faq5_q, a: t.faq5_a },
    { q: t.faq6_q, a: t.faq6_a },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', fontFamily: "'Outfit', sans-serif" }}>

      {/* ===== NAV ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '12px 24px',
        background: scrolled ? 'rgba(11,15,26,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42,53,80,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="#features" style={{ fontSize: 13, color: '#94A3C0', textDecoration: 'none', fontWeight: 500 }}>{t.nav_features}</a>
            <a href="#hoe-werkt-het" style={{ fontSize: 13, color: '#94A3C0', textDecoration: 'none', fontWeight: 500 }}>{t.nav_how}</a>
            <a href="#pricing" style={{ fontSize: 13, color: '#94A3C0', textDecoration: 'none', fontWeight: 500 }}>{t.nav_pricing}</a>
            <Link href="/over-ons" style={{ fontSize: 13, color: '#94A3C0', textDecoration: 'none', fontWeight: 500 }}>{t.nav_about}</Link>
            <Link href="/cv" style={{ fontSize: 13, color: '#818CF8', textDecoration: 'none', fontWeight: 600 }}>CV Builder</Link>
            <Link href="/interview" style={{ fontSize: 13, color: '#F59E0B', textDecoration: 'none', fontWeight: 600 }}>Interview Prep</Link>
            <LanguageSwitcher />
            <Link href="/brief" style={{
              padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: 'linear-gradient(135deg, #3B82F6, #10B981)',
              color: '#FFF', textDecoration: 'none', border: 'none',
            }}>{t.nav_cta}</Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={{
        padding: '140px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '15%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <div className="animate-fade-up" style={{ opacity: 0 }}>
            <span style={{
              display: 'inline-block', padding: '6px 16px', borderRadius: 100,
              fontSize: 11, fontWeight: 600, letterSpacing: 1.5,
              background: 'rgba(59,130,246,0.1)', color: '#60A5FA',
              border: '1px solid rgba(59,130,246,0.2)', marginBottom: 24,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{t.hero_badge}</span>
          </div>

          <h1 className="animate-fade-up delay-100" style={{
            fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1,
            color: '#F0F2F7', margin: '0 0 20px', opacity: 0,
          }}>
            {t.hero_title_1}<br />
            <span className="gradient-text">{t.hero_title_2}</span>
          </h1>

          <p className="animate-fade-up delay-200" style={{
            fontSize: 'clamp(16px, 2vw, 19px)', color: '#94A3C0', maxWidth: 540,
            margin: '0 auto 32px', lineHeight: 1.7, opacity: 0,
          }}>
            {t.hero_subtitle}
          </p>

          <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', opacity: 0 }}>
            <Link href="/brief" style={{
              padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 700,
              background: 'linear-gradient(135deg, #3B82F6, #10B981)',
              color: '#FFF', textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 4px 24px rgba(59,130,246,0.3)',
            }}>{t.hero_cta}</Link>
            <a href="#hoe-werkt-het" style={{
              padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600,
              background: 'transparent', color: '#94A3C0', textDecoration: 'none',
              border: '1px solid #2A3550', display: 'inline-block',
            }}>{t.hero_cta2}</a>
          </div>

          <div className="animate-fade-up delay-400" style={{
            display: 'flex', gap: 32, justifyContent: 'center', marginTop: 48, opacity: 0,
          }}>
            {[
              { num: t.hero_stat1_num, label: t.hero_stat1_label },
              { num: t.hero_stat2_num, label: t.hero_stat2_label },
              { num: t.hero_stat3_num, label: t.hero_stat3_label },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#F0F2F7' }}>{s.num}</div>
                <div style={{ fontSize: 11, color: '#6B7A99', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" style={{ padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              fontSize: 10, letterSpacing: 3, color: '#3B82F6', fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{t.features_label}</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#F0F2F7', margin: '8px 0 0' }}>
              {t.features_title}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: '#141B2D', borderRadius: 14, padding: 24,
                border: '1px solid rgba(42,53,80,0.4)',
                transition: 'border-color 0.3s, transform 0.3s',
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{f.emoji}</div>
                <div style={{  }}>
                  <span style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: 1,
                    padding: '3px 8px', borderRadius: 4,
                    background: `${f.tagColor}18`, color: f.tagColor,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{f.tag}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F0F2F7', margin: '6px 0 0' }}>{f.title}</h3>
                </div>
                <p style={{ fontSize: 13, color: '#94A3C0', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOE WERKT HET ===== */}
      <section id="hoe-werkt-het" style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, rgba(20,27,45,0.5) 0%, #0B0F1A 100%)',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              fontSize: 10, letterSpacing: 3, color: '#10B981', fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{t.how_label}</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#F0F2F7', margin: '8px 0 0' }}>
              {t.how_title}
            </h2>
          </div>

          <div style={{ position: 'relative', paddingLeft: 48 }}>
            <div style={{
              position: 'absolute', left: 18, top: 8, bottom: 8, width: 2,
              background: 'linear-gradient(180deg, #3B82F6, #6366F1, #10B981)',
              borderRadius: 1,
            }} />

            {steps.map((step, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: i < 3 ? 36 : 0 }}>
                <div style={{
                  position: 'absolute', left: -38, top: 2,
                  width: 28, height: 28, borderRadius: '50%',
                  background: i === 3 ? 'linear-gradient(135deg, #3B82F6, #10B981)' : '#1C2438',
                  border: i === 3 ? 'none' : '2px solid #3B82F6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  color: i === 3 ? '#FFF' : '#3B82F6',
                }}>{step.num}</div>

                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F0F2F7', margin: '0 0 4px' }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#94A3C0', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/brief" style={{
              padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 700,
              background: 'linear-gradient(135deg, #3B82F6, #10B981)',
              color: '#FFF', textDecoration: 'none', display: 'inline-block',
            }}>{t.how_cta}</Link>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              fontSize: 10, letterSpacing: 3, color: '#F59E0B', fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{t.pricing_label}</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#F0F2F7', margin: '8px 0 0' }}>
              {t.pricing_title}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {/* Free */}
            <div style={{
              background: '#141B2D', borderRadius: 16, padding: 28,
              border: '1px solid rgba(42,53,80,0.4)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7A99', marginBottom: 4 }}>{t.free_label}</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#F0F2F7' }}>{t.free_price}</div>
              <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 20 }}>{t.free_period}</div>
              {[t.free_f1, t.free_f2, t.free_f3].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: '#D4DCE8' }}>
                  <span style={{ color: '#10B981' }}>✓</span>{f}
                </div>
              ))}
              <Link href="/brief" style={{
                display: 'block', textAlign: 'center', marginTop: 20,
                padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                border: '1px solid #2A3550', color: '#94A3C0', textDecoration: 'none',
              }}>{t.free_cta}</Link>
            </div>

            {/* Starter */}
            <div style={{
              background: '#141B2D', borderRadius: 16, padding: 28,
              border: '1px solid rgba(42,53,80,0.4)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#10B981', marginBottom: 4 }}>{t.starter_label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: '#F0F2F7' }}>{t.starter_price}</span>
              </div>
              <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 20 }}>{t.starter_period}</div>
              {[t.starter_f1, t.starter_f2, t.starter_f3, t.starter_f4].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: '#D4DCE8' }}>
                  <span style={{ color: '#10B981' }}>✓</span>{f}
                </div>
              ))}
              <Link href="/brief" style={{
                display: 'block', textAlign: 'center', marginTop: 20,
                padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                border: '1px solid #2A3550', color: '#94A3C0', textDecoration: 'none',
              }}>{t.starter_cta}</Link>
            </div>

            {/* Pro */}
            <div style={{
              background: '#141B2D', borderRadius: 16, padding: 28,
              border: '2px solid #3B82F6', position: 'relative',
            }}>
              <span style={{
                position: 'absolute', top: -10, right: 16,
                padding: '4px 12px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                background: 'linear-gradient(135deg, #3B82F6, #10B981)', color: '#FFF',
                letterSpacing: 1, fontFamily: "'JetBrains Mono', monospace",
              }}>{t.pro_badge}</span>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3B82F6', marginBottom: 4 }}>{t.pro_label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: '#F0F2F7' }}>{t.pro_price}</span>
                <span style={{ fontSize: 14, color: '#6B7A99' }}>{t.pro_period_suffix}</span>
              </div>
              <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 20 }}>{t.pro_period_desc}</div>
              {[t.pro_f1, t.pro_f2, t.pro_f3, t.pro_f4].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: '#D4DCE8' }}>
                  <span style={{ color: '#10B981' }}>✓</span>{f}
                </div>
              ))}
              <Link href="/brief" style={{
                display: 'block', textAlign: 'center', marginTop: 20,
                padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700,
                background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                color: '#FFF', textDecoration: 'none',
              }}>{t.pro_cta}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, rgba(20,27,45,0.3) 0%, #0B0F1A 100%)',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{
              fontSize: 10, letterSpacing: 3, color: '#6366F1', fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{t.faq_label}</span>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#F0F2F7', margin: '8px 0 0' }}>
              {t.faq_title}
            </h2>
          </div>

          {faqs.map((faq, i) => (
            <div key={i} style={{
              marginBottom: 8, borderRadius: 12, overflow: 'hidden',
              border: `1px solid ${openFaq === i ? 'rgba(59,130,246,0.3)' : 'rgba(42,53,80,0.3)'}`,
              background: openFaq === i ? 'rgba(20,27,45,0.8)' : 'transparent',
              transition: 'all 0.2s ease',
            }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                width: '100%', padding: '16px 20px', border: 'none', cursor: 'pointer',
                background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: 14, fontWeight: 600, color: '#F0F2F7', fontFamily: 'inherit', textAlign: 'left',
              }}>
                {faq.q}
                <span style={{
                  fontSize: 18, color: '#6B7A99', transition: 'transform 0.2s',
                  transform: openFaq === i ? 'rotate(45deg)' : 'none',
                }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 20px 16px', fontSize: 13, color: '#94A3C0', lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#F0F2F7', margin: '0 0 12px' }}>
            {t.cta_title}
          </h2>
          <p style={{ fontSize: 16, color: '#94A3C0', margin: '0 0 28px', lineHeight: 1.6 }}>
            {t.cta_subtitle}
          </p>
          <Link href="/brief" style={{
            padding: '16px 40px', borderRadius: 12, fontSize: 17, fontWeight: 700,
            background: 'linear-gradient(135deg, #3B82F6, #10B981)',
            color: '#FFF', textDecoration: 'none', display: 'inline-block',
            boxShadow: '0 4px 32px rgba(59,130,246,0.3)',
          }}>{t.cta_button}</Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        padding: '32px 24px', borderTop: '1px solid rgba(42,53,80,0.3)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Logo />
          <p style={{ fontSize: 12, color: '#6B7A99', marginTop: 12 }}>
            {t.footer_copy}
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 8 }}>
            <a href="/over-ons" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>{t.footer_about}</a>
            <a href="#" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>{t.footer_privacy}</a>
            <a href="#" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>{t.footer_terms}</a>
            <a href="mailto:hello@carrio.be" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>{t.footer_contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
