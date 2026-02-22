'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

const features = [
  {
    emoji: '✍️',
    title: 'Motivatiebrieven',
    desc: 'AI schrijft overtuigende brieven die perfect passen bij Belgische conventies. Formele aanspreking, taalkennis-nadruk, en een sterke call-to-action.',
    tag: 'NU BESCHIKBAAR',
    tagColor: '#10B981',
  },
  {
    emoji: '📄',
    title: 'CV Builder',
    desc: 'Bouw professionele CV\'s die voldoen aan Belgische standaarden. VDAB-compatibel, Europass-ready, en direct exporteerbaar als PDF.',
    tag: 'BINNENKORT',
    tagColor: '#6366F1',
  },
  {
    emoji: '🎤',
    title: 'Interview Prep',
    desc: 'Oefen met AI mock-interviews afgestemd op jouw sector en functie. Krijg direct feedback op je antwoorden.',
    tag: 'BINNENKORT',
    tagColor: '#6366F1',
  },
  {
    emoji: '💼',
    title: 'LinkedIn Coach',
    desc: 'Optimaliseer je LinkedIn profiel en leer netwerken als een pro. Meer zichtbaarheid, meer kansen.',
    tag: 'BINNENKORT',
    tagColor: '#F59E0B',
  },
];

const steps = [
  { num: '1', title: 'Vertel over jezelf', desc: 'Vul je naam, ervaring, opleiding en talen in. Hoe meer context, hoe beter het resultaat.' },
  { num: '2', title: 'Voeg de vacature toe', desc: 'Kopieer de vacaturetekst of vul de functietitel en het bedrijf in.' },
  { num: '3', title: 'Kies toon & taal', desc: 'Professioneel, enthousiast of persoonlijk? In het Nederlands, Frans of Engels.' },
  { num: '✨', title: 'Ontvang je brief', desc: 'AI genereert een persoonlijke motivatiebrief volgens Belgische conventies. Kopieer en verstuur!' },
];

const faqs = [
  { q: 'In welke talen werkt Carrio?', a: 'Carrio genereert motivatiebrieven in het Nederlands, Frans en Engels — de drie werktalen van België.' },
  { q: 'Is mijn data veilig?', a: 'Absoluut. We slaan geen persoonlijke gegevens op na het genereren van je brief. Je data wordt niet gedeeld met derden.' },
  { q: 'Wat maakt Carrio anders dan ChatGPT?', a: 'Carrio is specifiek gebouwd voor de Belgische arbeidsmarkt. We kennen de conventies: formele aanspreking, nadruk op taalkennis, VDAB/Actiris/Forem-compatibiliteit, en Belgische bedrijfscultuur.' },
  { q: 'Moet ik betalen?', a: 'Je eerste brief is gratis, zodat je de kwaliteit kunt ervaren. Daarna kies je voor losse brieven (€6.99) of een Pro-abonnement (€19.99/maand) voor onbeperkte toegang tot alle tools.' },
  { q: 'Werkt het ook voor Wallonië en Brussel?', a: 'Ja! Carrio werkt voor heel België. Genereer brieven in het Frans voor Wallonië, Nederlands voor Vlaanderen, of Engels/Frans voor Brussel.' },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

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
            <a href="#features" style={{ fontSize: 13, color: '#94A3C0', textDecoration: 'none', fontWeight: 500 }}>Features</a>
            <a href="#hoe-werkt-het" style={{ fontSize: 13, color: '#94A3C0', textDecoration: 'none', fontWeight: 500 }}>Hoe werkt het</a>
            <a href="#pricing" style={{ fontSize: 13, color: '#94A3C0', textDecoration: 'none', fontWeight: 500 }}>Pricing</a>
            <Link href="/brief" style={{
              padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: 'linear-gradient(135deg, #3B82F6, #10B981)',
              color: '#FFF', textDecoration: 'none', border: 'none',
            }}>Start gratis →</Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={{
        padding: '140px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow effects */}
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
            }}>🇧🇪 GEMAAKT VOOR BELGIË</span>
          </div>

          <h1 className="animate-fade-up delay-100" style={{
            fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1,
            color: '#F0F2F7', margin: '0 0 20px', opacity: 0,
          }}>
            Je carrière,<br />
            <span className="gradient-text">jouw kracht.</span>
          </h1>

          <p className="animate-fade-up delay-200" style={{
            fontSize: 'clamp(16px, 2vw, 19px)', color: '#94A3C0', maxWidth: 540,
            margin: '0 auto 32px', lineHeight: 1.7, opacity: 0,
          }}>
            AI-powered motivatiebrieven, CV's en interviewvoorbereiding. Specifiek voor de Belgische arbeidsmarkt. In het Nederlands, Frans én Engels.
          </p>

          <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', opacity: 0 }}>
            <Link href="/brief" style={{
              padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 700,
              background: 'linear-gradient(135deg, #3B82F6, #10B981)',
              color: '#FFF', textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 4px 24px rgba(59,130,246,0.3)',
            }}>Schrijf je eerste brief — gratis ✨</Link>
            <a href="#hoe-werkt-het" style={{
              padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600,
              background: 'transparent', color: '#94A3C0', textDecoration: 'none',
              border: '1px solid #2A3550', display: 'inline-block',
            }}>Hoe werkt het?</a>
          </div>

          {/* Social proof */}
          <div className="animate-fade-up delay-400" style={{
            display: 'flex', gap: 32, justifyContent: 'center', marginTop: 48,
            opacity: 0,
          }}>
            {[
              { num: '1', label: 'gratis brief' },
              { num: '< 30s', label: 'generatietijd' },
              { num: '3', label: 'talen' },
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
            }}>FEATURES</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#F0F2F7', margin: '8px 0 0' }}>
              Alles voor je carrière, op één plek.
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F0F2F7', margin: 0 }}>{f.title}</h3>
                  <span style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: 1,
                    padding: '3px 8px', borderRadius: 4,
                    background: `${f.tagColor}18`, color: f.tagColor,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{f.tag}</span>
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
            }}>HOE WERKT HET</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#F0F2F7', margin: '8px 0 0' }}>
              In 4 stappen naar je brief.
            </h2>
          </div>

          <div style={{ position: 'relative', paddingLeft: 48 }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: 18, top: 8, bottom: 8, width: 2,
              background: 'linear-gradient(180deg, #3B82F6, #6366F1, #10B981)',
              borderRadius: 1,
            }} />

            {steps.map((step, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: i < 3 ? 36 : 0 }}>
                {/* Dot */}
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
            }}>Probeer het nu — gratis →</Link>
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
            }}>PRICING</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#F0F2F7', margin: '8px 0 0' }}>
              Start gratis. Upgrade wanneer je wilt.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {/* Free */}
            <div style={{
              background: '#141B2D', borderRadius: 16, padding: 28,
              border: '1px solid rgba(42,53,80,0.4)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7A99', marginBottom: 4 }}>GRATIS</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#F0F2F7' }}>€0</div>
              <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 20 }}>voor altijd</div>
              {['1 motivatiebrief gratis', 'Nederlands, Frans & Engels', 'Kopieer met één klik'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: '#D4DCE8' }}>
                  <span style={{ color: '#10B981' }}>✓</span>{f}
                </div>
              ))}
              <Link href="/brief" style={{
                display: 'block', textAlign: 'center', marginTop: 20,
                padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                border: '1px solid #2A3550', color: '#94A3C0', textDecoration: 'none',
              }}>Start gratis</Link>
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
              }}>POPULAIR</span>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3B82F6', marginBottom: 4 }}>PRO</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: '#F0F2F7' }}>€19,99</span>
                <span style={{ fontSize: 14, color: '#6B7A99' }}>/maand</span>
              </div>
              <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 20 }}>onbeperkt alles</div>
              {['Onbeperkt brieven', 'CV Builder (binnenkort)', 'Interview Prep (binnenkort)', 'LinkedIn Coach (binnenkort)', 'Prioriteit support'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: '#D4DCE8' }}>
                  <span style={{ color: '#10B981' }}>✓</span>{f}
                </div>
              ))}
              <Link href="/brief" style={{
                display: 'block', textAlign: 'center', marginTop: 20,
                padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700,
                background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                color: '#FFF', textDecoration: 'none',
              }}>Upgrade naar Pro</Link>
            </div>

            {/* Per brief */}
            <div style={{
              background: '#141B2D', borderRadius: 16, padding: 28,
              border: '1px solid rgba(42,53,80,0.4)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7A99', marginBottom: 4 }}>PER BRIEF</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: '#F0F2F7' }}>€6,99</span>
              </div>
              <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 20 }}>per motivatiebrief</div>
              {['1 brief per betaling', 'Alle talen', 'Geen abonnement nodig'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: '#D4DCE8' }}>
                  <span style={{ color: '#10B981' }}>✓</span>{f}
                </div>
              ))}
              <Link href="/brief" style={{
                display: 'block', textAlign: 'center', marginTop: 20,
                padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                border: '1px solid #2A3550', color: '#94A3C0', textDecoration: 'none',
              }}>Koop een brief</Link>
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
            }}>FAQ</span>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#F0F2F7', margin: '8px 0 0' }}>
              Veelgestelde vragen
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
            Klaar om te solliciteren?
          </h2>
          <p style={{ fontSize: 16, color: '#94A3C0', margin: '0 0 28px', lineHeight: 1.6 }}>
            Schrijf je eerste motivatiebrief in minder dan 30 seconden. Gratis, geen account nodig.
          </p>
          <Link href="/brief" style={{
            padding: '16px 40px', borderRadius: 12, fontSize: 17, fontWeight: 700,
            background: 'linear-gradient(135deg, #3B82F6, #10B981)',
            color: '#FFF', textDecoration: 'none', display: 'inline-block',
            boxShadow: '0 4px 32px rgba(59,130,246,0.3)',
          }}>Start nu — het is gratis ✨</Link>
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
            © 2026 Carrio. Gemaakt in Antwerpen 🇧🇪
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 8 }}>
            <a href="#" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>Voorwaarden</a>
            <a href="mailto:hello@carrio.be" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
