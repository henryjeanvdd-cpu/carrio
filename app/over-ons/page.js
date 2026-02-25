import Link from 'next/link';

export const metadata = {
  title: 'Over Ons – Carrio | AI Sollicitatiebrief Generator',
  description: 'Leer meer over Carrio, de AI-tool voor sollicitatiebrieven en motivatiebrieven op maat van de Belgische arbeidsmarkt.',
};

export default function OverOns() {
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
          }}>Start nu</Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: '80px 24px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
            Over Carrio
          </h1>
          <p style={{ fontSize: 18, color: '#94A3C0', lineHeight: 1.7, margin: 0 }}>
            Carrio helpt Belgische werkzoekenden bij het schrijven van professionele sollicitatiebrieven en motivatiebrieven met behulp van AI.
          </p>
        </div>
      </section>

      {/* MISSIE */}
      <section style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ background: 'rgba(20,22,40,0.8)', border: '1px solid rgba(42,53,80,0.5)', borderRadius: 16, padding: '40px 32px' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 16px', color: '#F0F2F7' }}>Onze missie</h2>
            <p style={{ fontSize: 15, color: '#94A3C0', lineHeight: 1.8, margin: '0 0 16px' }}>
              Solliciteren in België is uniek. Of je nu in het Nederlands, Frans of Engels schrijft — elke regio heeft zijn eigen verwachtingen en conventies. Veel AI-tools begrijpen dat verschil niet.
            </p>
            <p style={{ fontSize: 15, color: '#94A3C0', lineHeight: 1.8, margin: 0 }}>
              Carrio is gebouwd specifiek voor de Belgische arbeidsmarkt. We combineren AI-technologie met kennis van lokale sollicitatiecultuur, zodat jij in minder dan 30 seconden een brief op maat hebt die écht werkt.
            </p>
          </div>
        </div>
      </section>

      {/* WAAROM CARRIO */}
      <section style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 24px', textAlign: 'center', color: '#F0F2F7' }}>Waarom Carrio?</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { icon: '🇧🇪', title: 'Belgisch', desc: 'Specifiek ontwikkeld voor de Vlaamse, Waalse en Brusselse arbeidsmarkt.' },
              { icon: '⚡', title: 'Snel', desc: 'Een professionele brief in minder dan 30 seconden. Geen account nodig.' },
              { icon: '🎯', title: 'Op maat', desc: 'Elke brief wordt gegenereerd op basis van jouw profiel en de vacature.' },
              { icon: '🔒', title: 'Privacy', desc: 'We bewaren je gegevens alleen om je brieven te tellen. Geen spam, nooit.' },
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
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 12px', color: '#F0F2F7' }}>Contact</h2>
            <p style={{ fontSize: 15, color: '#94A3C0', lineHeight: 1.8, margin: '0 0 20px' }}>
              Heb je vragen, feedback of een samenwerking in gedachten? We horen graag van je.
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
            © 2026 Carrio. Gemaakt in Antwerpen 🇧🇪
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 8 }}>
            <Link href="/" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>Home</Link>
            <Link href="/brief" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>Brief schrijven</Link>
            <a href="mailto:hello@carrio.be" style={{ fontSize: 11, color: '#6B7A99', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
