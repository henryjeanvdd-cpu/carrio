'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

const TONES = {
  nl: [
    { id: "professioneel", label: "Professioneel", desc: "Zakelijk en formeel", emoji: "👔" },
    { id: "enthousiast", label: "Enthousiast", desc: "Energiek en gedreven", emoji: "🔥" },
    { id: "persoonlijk", label: "Persoonlijk", desc: "Warm en authentiek", emoji: "💬" },
  ],
  fr: [
    { id: "professioneel", label: "Professionnel", desc: "Formel et serieux", emoji: "👔" },
    { id: "enthousiast", label: "Enthousiaste", desc: "Dynamique et motive", emoji: "🔥" },
    { id: "persoonlijk", label: "Personnel", desc: "Chaleureux et authentique", emoji: "💬" },
  ],
};

const LANGS = [
  { id: 'nl', label: 'Nederlands' },
  { id: 'fr', label: 'Français' },
  { id: 'en', label: 'English' },
];

export default function BriefApp() {
  const { lang } = useLanguage();

  // Auth / payment state
  const [email, setEmail] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [canGenerate, setCanGenerate] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [briefsUsed, setBriefsUsed] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);

  // Form state
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const [naam, setNaam] = useState('');
  const [functie, setFunctie] = useState('');
  const [ervaring, setErvaring] = useState('');
  const [opleiding, setOpleiding] = useState('');
  const [talen, setTalen] = useState('');
  const [skills, setSkills] = useState('');
  const [vacatureTitel, setVacatureTitel] = useState('');
  const [bedrijf, setBedrijf] = useState('');
  const [vacatureTekst, setVacatureTekst] = useState('');
  const [toon, setToon] = useState('professioneel');
  const [taal, setTaal] = useState('nl');

  // Check for saved email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('carrio_email');
    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get('payment');

    if (savedEmail) {
      setEmail(savedEmail);
      if (payment === 'success') {
        setCheckingPayment(true);
        setTimeout(() => {
          checkUsage(savedEmail).then(() => setCheckingPayment(false));
        }, 1500);
      } else {
        checkUsage(savedEmail);
      }
    }
  }, []);

  const checkUsage = async (emailToCheck) => {
    try {
      const res = await fetch('/api/check-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToCheck }),
      });
      const data = await res.json();

      if (res.ok) {
        setEmailConfirmed(true);
        setCanGenerate(data.canGenerate);
        setIsPro(data.isPro);
        setBriefsUsed(data.briefsUsed);

        if (!data.canGenerate && data.reason === 'limit_reached') {
          setShowPaywall(true);
        }
      }
    } catch (err) {
      console.error('Usage check failed:', err);
      // Still confirm email but allow usage if DB is down
      setEmailConfirmed(true);
      setCanGenerate(true);
    }
  };

  const handleEmailSubmit = async () => {
    if (!email.includes('@') || !email.includes('.')) return;
    localStorage.setItem('carrio_email', email.toLowerCase().trim());
    await checkUsage(email);
  };

  const handleCheckout = async (plan) => {
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Er ging iets mis met de betaling.');
      }
    } catch (err) {
      alert('Kan betaalvenster niet openen. Probeer opnieuw.');
    }
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const s0ok = naam.trim() && functie.trim() && ervaring.trim();
  const s1ok = vacatureTitel.trim() && bedrijf.trim();

  const generate = useCallback(async () => {
    setStep(3);
    setLoading(true);
    setError('');
    setLetter('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, naam, functie, ervaring, opleiding, talen, skills,
          vacatureTitel, bedrijf, vacatureTekst,
          toon: TONES.find((t) => t.id === toon)?.label || 'Professioneel',
          taal,
        }),
      });

      const data = await res.json();

      if (data.error === 'LIMIT_REACHED') {
        setShowPaywall(true);
        setLoading(false);
        setStep(2);
        return;
      }

      if (!res.ok) throw new Error(data.error || 'Generatie mislukt');
      if (!data.letter) throw new Error('Geen brief ontvangen');
      setLetter(data.letter);
      setBriefsUsed((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [email, naam, functie, ervaring, opleiding, talen, skills, vacatureTitel, bedrijf, vacatureTekst, toon, taal]);

  const copy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inp = "w-full px-3.5 py-2.5 bg-[#141B2D] border border-[#2A3550] rounded-lg text-[#D4DCE8] text-sm outline-none focus:border-[#3B82F6] transition-colors placeholder:text-[#3A4560]";
  const ta = inp + " resize-y min-h-[100px]";
  const lbl = "block text-xs font-semibold text-[#6B7A99] mb-1.5";

  return (
    <div className="min-h-screen bg-[#0B0F1A]" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* Header */}
      <header className="border-b border-[#2A355030] bg-[#141B2D80]" style={{ backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[600px] mx-auto px-5 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#3B82F6] to-[#10B981] flex items-center justify-center text-sm font-bold text-white">C</div>
              <span className="text-base font-bold text-[#F0F2F7]">Carrio</span>
            </Link>
            <div className="flex-1" />
            {isPro && (
              <span className="text-[10px] px-2.5 py-1 bg-[#3B82F618] text-[#60A5FA] rounded-full font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>PRO</span>
            )}
            {emailConfirmed && !isPro && (
              <span className="text-[10px] px-2.5 py-1 bg-[#10B98118] text-[#10B981] rounded-full font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {briefsUsed === 0 ? '1 GRATIS BRIEF' : 'GRATIS BRIEF GEBRUIKT'}
              </span>
            )}
          </div>

          {emailConfirmed && step < 3 && (
            <div className="flex gap-1.5 mt-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 h-[3px] rounded-full transition-colors" style={{
                  background: i <= step ? 'linear-gradient(90deg, #3B82F6, #10B981)' : '#1C2438',
                }} />
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[600px] mx-auto px-5 py-5">

        {/* ===== EMAIL GATE ===== */}
        {!emailConfirmed && (
          <div style={{ paddingTop: 40, textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #3B82F6, #10B981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 800, color: '#FFF',
            }}>C</div>

            <h2 className="text-2xl font-bold text-[#F0F2F7] mb-2">Schrijf je sollicitatiebrief</h2>
            <p className="text-sm text-[#6B7A99] mb-6 max-w-[360px] mx-auto leading-relaxed">
              Vul je emailadres in om te starten. Je eerste brief is gratis!
            </p>

            <div className="max-w-[360px] mx-auto">
              <input
                type="email"
                className={inp + " !text-center !text-base !py-3.5 mb-3"}
                placeholder={lang === "fr" ? "votre@email.be" : "jouw@email.be"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
              />
              <button
                onClick={handleEmailSubmit}
                disabled={!email.includes('@') || !email.includes('.')}
                className="w-full py-3.5 rounded-lg text-base font-semibold transition-all cursor-pointer"
                style={{
                  background: email.includes('@') && email.includes('.')
                    ? 'linear-gradient(135deg, #3B82F6, #10B981)'
                    : '#1C2438',
                  color: email.includes('@') && email.includes('.') ? '#FFF' : '#4A5568',
                  border: 'none',
                  boxShadow: email.includes('@') ? '0 4px 20px rgba(59,130,246,0.2)' : 'none',
                }}
              >Start →</button>
            </div>

            <p className="text-[11px] text-[#3A4560] mt-4">
              Geen spam, geen account nodig. We bewaren je email alleen om je brieven te tellen.
            </p>
          </div>
        )}

        {/* ===== PAYMENT SUCCESS NOTICE ===== */}
        {checkingPayment && (
          <div style={{
            textAlign: 'center', padding: '48px 20px',
          }}>
            <div className="w-12 h-12 border-[3px] border-[#1C2438] border-t-[#10B981] rounded-full mx-auto mb-5" style={{ animation: 'spin 0.8s linear infinite' }} />
            <div className="text-base font-semibold text-[#F0F2F7] mb-1.5">Betaling wordt verwerkt...</div>
            <div className="text-sm text-[#6B7A99]">Even geduld, we activeren je account.</div>
          </div>
        )}

        {/* ===== BRIEF FORM (only when email confirmed) ===== */}
        {emailConfirmed && !checkingPayment && (
          <>
            {/* STEP 0 */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#F0F2F7] mb-1">Over jou</h2>
                <p className="text-sm text-[#6B7A99] mb-5">Vertel over je achtergrond voor een persoonlijke brief.</p>

                <div className="mb-4"><label className={lbl}>Volledige naam *</label><input className={inp} placeholder={lang === "fr" ? "Jean Dupont" : "Jan Peeters"} value={naam} onChange={(e) => setNaam(e.target.value)} /></div>
                <div className="mb-4"><label className={lbl}>Huidige / gewenste functie *</label><input className={inp} placeholder={lang === "fr" ? "Responsable Marketing, Developpeur, ..." : "Marketing Manager, Software Developer, ..."} value={functie} onChange={(e) => setFunctie(e.target.value)} /></div>
                <div className="mb-4"><label className={lbl}>Werkervaring (kort samenvatten) *</label><textarea className={ta} placeholder={lang === "fr" ? "Ex: 3 ans comme digital marketer dans une entreprise e-commerce." : "Bijv: 3 jaar als digital marketer bij een Antwerps e-commerce bedrijf."} value={ervaring} onChange={(e) => setErvaring(e.target.value)} /></div>
                <div className="mb-4"><label className={lbl}>Opleiding</label><input className={inp} placeholder={lang === "fr" ? "Bachelor en Gestion — Haute Ecole de Bruxelles" : "Bachelor Bedrijfsmanagement — Artesis Hogeschool Antwerpen"} value={opleiding} onChange={(e) => setOpleiding(e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="mb-4"><label className={lbl}>Talen 🇧🇪</label><input className={inp} placeholder={lang === "fr" ? "FR, NL, EN" : "NL, FR, EN"} value={talen} onChange={(e) => setTalen(e.target.value)} /></div>
                  <div className="mb-4"><label className={lbl}>Vaardigheden</label><input className={inp} placeholder={lang === "fr" ? "Excel, Photoshop, ..." : "Excel, Photoshop, ..."} value={skills} onChange={(e) => setSkills(e.target.value)} /></div>
                </div>

                <div className="flex justify-end mt-6">
                  <button onClick={s0ok ? next : undefined} className={`px-7 py-3 rounded-lg text-sm font-semibold transition-colors ${s0ok ? 'bg-[#3B82F6] text-white cursor-pointer hover:bg-[#2563EB]' : 'bg-[#1C2438] text-[#4A5568] cursor-default'}`}>Volgende →</button>
                </div>
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-[#F0F2F7] mb-1">De vacature</h2>
                <p className="text-sm text-[#6B7A99] mb-5">Voor welke functie solliciteer je?</p>

                <div className="mb-4"><label className={lbl}>Functietitel *</label><input className={inp} placeholder={lang === "fr" ? "Specialiste Marketing Digital" : "Digital Marketing Specialist"} value={vacatureTitel} onChange={(e) => setVacatureTitel(e.target.value)} /></div>
                <div className="mb-4"><label className={lbl}>Bedrijf *</label><input className={inp} placeholder={lang === "fr" ? "Proximus, Belfius, Delhaize, ..." : "Coolblue, Telenet, KBC, ..."} value={bedrijf} onChange={(e) => setBedrijf(e.target.value)} /></div>
                <div className="mb-4"><label className={lbl}>{lang === 'fr' ? 'Texte de l offre' : 'Vacaturetekst'} <span className="font-normal text-[#3A4560]">{lang === "fr" ? "(optionnel mais recommande)" : "(optioneel maar aanbevolen)"}</span></label><textarea className={ta + " !min-h-[140px]"} placeholder={lang === "fr" ? "Copiez et collez ici le texte complet de l offre." : "Kopieer en plak hier de volledige vacaturetekst."} value={vacatureTekst} onChange={(e) => setVacatureTekst(e.target.value)} /></div>

                <div className="flex justify-between mt-6">
                  <button onClick={back} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">← Terug</button>
                  <button onClick={s1ok ? next : undefined} className={`px-7 py-3 rounded-lg text-sm font-semibold transition-colors ${s1ok ? 'bg-[#3B82F6] text-white cursor-pointer hover:bg-[#2563EB]' : 'bg-[#1C2438] text-[#4A5568] cursor-default'}`}>Volgende →</button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-[#F0F2F7] mb-1">Toon & taal</h2>
                <p className="text-sm text-[#6B7A99] mb-5">Kies de stijl en taal van je sollicitatiebrief.</p>

                <label className={lbl + " !mb-2.5"}>Toon van de brief</label>
                <div className="grid grid-cols-3 gap-2.5 mb-6">
                  {TONES.map((t) => (
                    <div key={t.id} onClick={() => setToon(t.id)} className="p-3.5 bg-[#141B2D] rounded-[10px] cursor-pointer text-center transition-all" style={{ border: `2px solid ${toon === t.id ? '#3B82F6' : '#2A3550'}` }}>
                      <div className="text-2xl mb-1.5">{t.emoji}</div>
                      <div className="text-[13px] font-semibold text-[#F0F2F7]">{t.label}</div>
                      <div className="text-[11px] text-[#6B7A99] mt-0.5">{t.desc}</div>
                    </div>
                  ))}
                </div>

                <label className={lbl + " !mb-2.5"}>Taal van de brief</label>
                <div className="grid grid-cols-3 gap-2.5 mb-6">
                  {LANGS.map((l) => (
                    <button key={l.id} onClick={() => setTaal(l.id)} className="py-2.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer" style={{
                      background: taal === l.id ? '#3B82F6' : '#141B2D',
                      color: taal === l.id ? '#FFF' : '#6B7A99',
                      border: `1px solid ${taal === l.id ? '#3B82F6' : '#2A3550'}`,
                    }}>{l.label}</button>
                  ))}
                </div>

                <div className="bg-[#0D1220] rounded-[10px] p-4 border border-[#2A355040] mb-6">
                  <div className="text-xs font-semibold text-[#3B82F6] mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>SAMENVATTING</div>
                  <div className="text-[13px] text-[#94A3C0] leading-relaxed">
                    <strong className="text-[#F0F2F7]">{naam}</strong> solliciteert als{' '}
                    <strong className="text-[#F0F2F7]">{vacatureTitel}</strong> bij{' '}
                    <strong className="text-[#F0F2F7]">{bedrijf}</strong>
                    <br />{TONES.find((t) => t.id === toon)?.emoji} {TONES.find((t) => t.id === toon)?.label} · {LANGS.find((l) => l.id === taal)?.label}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={back} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">← Terug</button>
                  <button onClick={canGenerate ? generate : () => setShowPaywall(true)} className="px-8 py-3 rounded-lg text-sm font-semibold text-white cursor-pointer" style={{
                    background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                    boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
                    border: 'none',
                  }}>
                    {canGenerate ? '✨ Genereer brief' : '🔒 Upgrade om te genereren'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 - Result */}
            {step === 3 && (
              <div>
                {loading && (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 border-[3px] border-[#1C2438] border-t-[#3B82F6] rounded-full mx-auto mb-5" style={{ animation: 'spin 0.8s linear infinite' }} />
                    <div className="text-base font-semibold text-[#F0F2F7] mb-1.5">Je brief wordt geschreven...</div>
                    <div className="text-sm text-[#6B7A99]">AI analyseert de vacature en schrijft een persoonlijke sollicitatiebrief</div>
                  </div>
                )}

                {!loading && error && (
                  <div>
                    <div className="bg-[#1A0B0F] border border-[#3A1520] rounded-[10px] p-4 mb-4">
                      <div className="text-sm font-semibold text-[#F87171] mb-1">Generatie mislukt</div>
                      <div className="text-xs text-[#A07070]">{error}</div>
                    </div>
                    <div className="flex gap-2.5">
                      <button onClick={() => { setStep(2); setError(''); }} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">← Terug</button>
                      <button onClick={generate} className="px-7 py-3 rounded-lg text-sm font-semibold text-white bg-[#3B82F6] cursor-pointer border-none">Opnieuw</button>
                    </div>
                  </div>
                )}

                {!loading && !error && letter && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-[#F0F2F7]">Je sollicitatiebrief ✨</h2>
                      <button onClick={copy} className="px-4 py-2 text-xs rounded-lg cursor-pointer transition-colors" style={{
                        background: copied ? '#10B98120' : 'transparent',
                        border: `1px solid ${copied ? '#10B981' : '#2A3550'}`,
                        color: copied ? '#10B981' : '#6B7A99',
                        fontFamily: 'inherit',
                      }}>{copied ? '✓ Gekopieerd!' : '📋 Kopieer'}</button>
                    </div>

                    <div className="bg-[#FAFAF8] rounded-[10px] p-5 text-[#1A1A2E] text-sm leading-[1.8] border border-[#E0E0D8] whitespace-pre-wrap max-h-[480px] overflow-y-auto" style={{ fontFamily: 'Georgia, serif' }}>
                      {letter}
                    </div>

                    <div className="flex gap-2.5 mt-5">
                      <button onClick={() => { setStep(2); setLetter(''); }} className="px-6 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">← Pas aan</button>
                      <div className="flex-1" />
                      {!isPro && (
                        <button onClick={() => setShowPaywall(true)} className="px-6 py-3 rounded-lg text-sm font-medium text-[#60A5FA] border border-[#3B82F630] cursor-pointer bg-[#3B82F610]">Nog een brief</button>
                      )}
                      {isPro && (
                        <button onClick={() => { setStep(0); setLetter(''); setNaam(''); setFunctie(''); setErvaring(''); setOpleiding(''); setTalen(''); setSkills(''); setVacatureTitel(''); setBedrijf(''); setVacatureTekst(''); }} className="px-6 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">Nieuwe brief</button>
                      )}
                    </div>

                    {!isPro && (
                      <div className="mt-5 p-3.5 rounded-[10px] border text-xs leading-relaxed" style={{
                        background: 'rgba(99,102,241,0.06)',
                        borderColor: 'rgba(99,102,241,0.15)',
                        color: '#94A3C0',
                      }}>
                        💡 <strong className="text-[#D4DCE8]">Tip:</strong> Met <button onClick={() => setShowPaywall(true)} className="text-[#60A5FA] underline cursor-pointer bg-transparent border-none font-inherit" style={{fontSize: 'inherit'}}>Carrio Pro (€9,99/maand)</button> genereer je onbeperkt sollicitatiebrieven. Maandelijks opzegbaar.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* ===== PAYWALL MODAL ===== */}
      {showPaywall && (
        <div onClick={() => setShowPaywall(false)} style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: '100%', maxWidth: 440, borderRadius: 18,
            background: '#141B2D', border: '1px solid rgba(42,53,80,0.5)',
            overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}>
            <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, margin: '0 auto 14px',
                background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>🚀</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F0F2F7', margin: '0 0 6px' }}>
                Je gratis brief is al gebruikt
              </h3>
              <p style={{ fontSize: 13, color: '#6B7A99', margin: '0 0 24px', lineHeight: 1.6 }}>
                Kies hoe je verder wilt. Elke brief is op maat geschreven voor de Belgische arbeidsmarkt.
              </p>
            </div>

            <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Pro option */}
              <div onClick={() => handleCheckout('pro')} style={{
                padding: '16px 18px', borderRadius: 12, cursor: 'pointer',
                border: '2px solid #3B82F6', background: 'rgba(59,130,246,0.06)',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', top: -8, right: 14,
                  fontSize: 9, fontWeight: 700, letterSpacing: 1,
                  padding: '3px 10px', borderRadius: 4,
                  background: 'linear-gradient(135deg, #3B82F6, #10B981)', color: '#FFF',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>LAUNCH PRIJS</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F2F7' }}>Carrio Pro</div>
                    <div style={{ fontSize: 12, color: '#6B7A99', marginTop: 2 }}>Onbeperkt brieven, maandelijks opzegbaar</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#F0F2F7' }}>€9,99</div>
                    <div style={{ fontSize: 11, color: '#6B7A99' }}>/maand</div>
                  </div>
                </div>
              </div>

              {/* Starter option */}
              <div onClick={() => handleCheckout('starter')} style={{
                padding: '16px 18px', borderRadius: 12, cursor: 'pointer',
                border: '1px solid rgba(42,53,80,0.5)', background: 'transparent',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F2F7' }}>Starter</div>
                    <div style={{ fontSize: 12, color: '#6B7A99', marginTop: 2 }}>3 brieven, geen abonnement</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#F0F2F7' }}>€4,99</div>
                    <div style={{ fontSize: 11, color: '#6B7A99' }}>eenmalig</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '14px 20px', borderTop: '1px solid rgba(42,53,80,0.3)',
              textAlign: 'center',
            }}>
              <button onClick={() => setShowPaywall(false)} style={{
                background: 'none', border: 'none', color: '#6B7A99', fontSize: 12,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>Niet nu, misschien later</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
