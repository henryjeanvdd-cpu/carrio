'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function CVBuilder() {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [canGenerate, setCanGenerate] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [naam, setNaam] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [adres, setAdres] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [gewensteFunctie, setGewensteFunctie] = useState('');
  const [ervaring, setErvaring] = useState([{ functie: '', bedrijf: '', van: '', tot: '', beschrijving: '' }]);
  const [opleiding, setOpleiding] = useState([{ diploma: '', school: '', jaar: '' }]);
  const [vaardigheden, setVaardigheden] = useState('');
  const [talen, setTalen] = useState('');
  const [taal, setTaal] = useState('nl');

  useEffect(() => {
    const savedEmail = localStorage.getItem('carrio_email');
    if (savedEmail) { setEmail(savedEmail); checkUsage(savedEmail); }
  }, []);

  const checkUsage = async (emailToCheck) => {
    try {
      const res = await fetch('/api/check-usage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: emailToCheck }) });
      const data = await res.json();
      if (res.ok) { setEmailConfirmed(true); setCanGenerate(data.canGenerate); setIsPro(data.isPro); if (!data.canGenerate && data.reason === 'limit_reached') setShowPaywall(true); }
    } catch (err) { setEmailConfirmed(true); setCanGenerate(true); }
  };

  const handleEmailSubmit = async () => {
    if (!email.includes('@') || !email.includes('.')) return;
    localStorage.setItem('carrio_email', email.toLowerCase().trim());
    await checkUsage(email);
  };

  const handleCheckout = async (plan) => {
    try {
      const res = await fetch('/api/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, plan }) });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) { alert('Kan betaalvenster niet openen.'); }
  };

  const addErvaring = () => setErvaring([...ervaring, { functie: '', bedrijf: '', van: '', tot: '', beschrijving: '' }]);
  const removeErvaring = (i) => setErvaring(ervaring.filter((_, idx) => idx !== i));
  const updateErvaring = (i, field, val) => { const c = [...ervaring]; c[i][field] = val; setErvaring(c); };
  const addOpleiding = () => setOpleiding([...opleiding, { diploma: '', school: '', jaar: '' }]);
  const removeOpleiding = (i) => setOpleiding(opleiding.filter((_, idx) => idx !== i));
  const updateOpleiding = (i, field, val) => { const c = [...opleiding]; c[i][field] = val; setOpleiding(c); };

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const s0ok = naam.trim() && gewensteFunctie.trim();
  const s1ok = ervaring[0]?.functie?.trim() && ervaring[0]?.bedrijf?.trim();
  const s2ok = opleiding[0]?.diploma?.trim() && opleiding[0]?.school?.trim();

  const generateCV = useCallback(async () => {
    setStep(4); setLoading(true); setError(''); setPdfUrl('');
    try {
      const res = await fetch('/api/generate-cv', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, naam, functie: gewensteFunctie, ervaring, opleiding, vaardigheden, talen, taal }) });
      const data = await res.json();
      if (data.error === 'LIMIT_REACHED') { setShowPaywall(true); setLoading(false); setStep(3); return; }
      if (!res.ok) throw new Error(data.error || 'Generatie mislukt');
      setGeneratedSummary(data.summary);
      await buildPDF(data.summary);
    } catch (err) { setError(err.message); }
    setLoading(false);
  }, [email, naam, gewensteFunctie, ervaring, opleiding, vaardigheden, talen, taal]);

  const buildPDF = async (summary) => {
    const { pdf, Document, Page, Text, View, StyleSheet } = await import('@react-pdf/renderer');
    const s = StyleSheet.create({
      page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a2e' },
      header: { marginBottom: 20, borderBottomWidth: 2, borderBottomColor: '#3B82F6', paddingBottom: 15 },
      name: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 4 },
      role: { fontSize: 13, color: '#3B82F6', marginBottom: 8 },
      contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
      contactItem: { fontSize: 9, color: '#666' },
      section: { marginBottom: 16 },
      sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#3B82F6', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
      summaryText: { fontSize: 10, lineHeight: 1.6, color: '#333', marginBottom: 16 },
      entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
      entryTitle: { fontSize: 11, fontWeight: 'bold', color: '#1a1a2e' },
      entryCompany: { fontSize: 10, color: '#3B82F6' },
      entryDate: { fontSize: 9, color: '#888' },
      entryDesc: { fontSize: 9.5, color: '#444', lineHeight: 1.5, marginTop: 3, marginBottom: 10 },
      skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
      skill: { fontSize: 9, backgroundColor: '#EEF2FF', color: '#3B82F6', padding: '3 8', borderRadius: 3 },
      langRow: { flexDirection: 'row', gap: 16, marginTop: 4 },
      langItem: { fontSize: 10, color: '#333' },
    });
    const labels = { nl: { profile: 'Profiel', experience: 'Werkervaring', education: 'Opleiding', skills: 'Vaardigheden', languages: 'Talen' }, fr: { profile: 'Profil', experience: 'Experience', education: 'Formation', skills: 'Competences', languages: 'Langues' }, en: { profile: 'Profile', experience: 'Work Experience', education: 'Education', skills: 'Skills', languages: 'Languages' } };
    const lb = labels[taal] || labels.nl;
    const CVDoc = () => (
      <Document>
        <Page size="A4" style={s.page}>
          <View style={s.header}>
            <Text style={s.name}>{naam}</Text>
            <Text style={s.role}>{gewensteFunctie}</Text>
            <View style={s.contactRow}>
              {email && <Text style={s.contactItem}>{email}</Text>}
              {telefoon && <Text style={s.contactItem}>{telefoon}</Text>}
              {adres && <Text style={s.contactItem}>{adres}</Text>}
              {linkedin && <Text style={s.contactItem}>{linkedin}</Text>}
            </View>
          </View>
          {summary && <View style={s.section}><Text style={s.sectionTitle}>{lb.profile}</Text><Text style={s.summaryText}>{summary}</Text></View>}
          <View style={s.section}>
            <Text style={s.sectionTitle}>{lb.experience}</Text>
            {ervaring.filter(e => e.functie).map((e, i) => (
              <View key={i}><View style={s.entryHeader}><View><Text style={s.entryTitle}>{e.functie}</Text><Text style={s.entryCompany}>{e.bedrijf}</Text></View><Text style={s.entryDate}>{e.van} - {e.tot || 'Heden'}</Text></View>{e.beschrijving && <Text style={s.entryDesc}>{e.beschrijving}</Text>}</View>
            ))}
          </View>
          <View style={s.section}>
            <Text style={s.sectionTitle}>{lb.education}</Text>
            {opleiding.filter(o => o.diploma).map((o, i) => (
              <View key={i} style={{ marginBottom: 8 }}><View style={s.entryHeader}><View><Text style={s.entryTitle}>{o.diploma}</Text><Text style={s.entryCompany}>{o.school}</Text></View><Text style={s.entryDate}>{o.jaar}</Text></View></View>
            ))}
          </View>
          {vaardigheden && <View style={s.section}><Text style={s.sectionTitle}>{lb.skills}</Text><View style={s.skillsRow}>{vaardigheden.split(',').map((sk, i) => <Text key={i} style={s.skill}>{sk.trim()}</Text>)}</View></View>}
          {talen && <View style={s.section}><Text style={s.sectionTitle}>{lb.languages}</Text><View style={s.langRow}>{talen.split(',').map((la, i) => <Text key={i} style={s.langItem}>{la.trim()}</Text>)}</View></View>}
        </Page>
      </Document>
    );
    const blob = await pdf(<CVDoc />).toBlob();
    setPdfUrl(URL.createObjectURL(blob));
  };

  const downloadPDF = () => { if (!pdfUrl) return; const a = document.createElement('a'); a.href = pdfUrl; a.download = `CV_${naam.replace(/\s+/g, '_')}.pdf`; a.click(); };

  const inp = "w-full px-3.5 py-2.5 bg-[#141B2D] border border-[#2A3550] rounded-lg text-[#D4DCE8] text-sm outline-none focus:border-[#3B82F6] transition-colors placeholder:text-[#3A4560]";
  const ta = inp + " resize-y min-h-[100px]";
  const lbl = "block text-xs font-semibold text-[#6B7A99] mb-1.5";

  return (
    <div className="min-h-screen bg-[#0B0F1A]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <header className="border-b border-[#2A355030] bg-[#141B2D80]" style={{ backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[600px] mx-auto px-5 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#3B82F6] to-[#10B981] flex items-center justify-center text-sm font-bold text-white">C</div>
              <span className="text-base font-bold text-[#F0F2F7]">Carrio</span>
            </Link>
            <div className="flex-1" />
            <span className="text-[10px] px-2.5 py-1 bg-[#6366F118] text-[#818CF8] rounded-full font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>CV BUILDER</span>
          </div>
          {emailConfirmed && step < 4 && (
            <div className="flex gap-1.5 mt-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-[3px] rounded-full transition-colors" style={{ background: i <= step ? 'linear-gradient(90deg, #6366F1, #10B981)' : '#1C2438' }} />
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[600px] mx-auto px-5 py-5">
        {!emailConfirmed && (
          <div style={{ paddingTop: 40, textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, margin: '0 auto 20px', background: 'linear-gradient(135deg, #6366F1, #10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>📄</div>
            <h2 className="text-2xl font-bold text-[#F0F2F7] mb-2">{lang === 'fr' ? 'Creez votre CV professionnel' : 'Bouw je professionele CV'}</h2>
            <p className="text-sm text-[#6B7A99] mb-6 max-w-[360px] mx-auto leading-relaxed">{lang === 'fr' ? 'Entrez votre email pour commencer.' : 'Vul je emailadres in om te starten. Je eerste CV is gratis!'}</p>
            <div className="max-w-[360px] mx-auto">
              <input type="email" className={inp + " !text-center !text-base !py-3.5 mb-3"} placeholder="jouw@email.be" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()} />
              <button onClick={handleEmailSubmit} disabled={!email.includes('@') || !email.includes('.')} className="w-full py-3.5 rounded-lg text-base font-semibold transition-all cursor-pointer" style={{ background: email.includes('@') && email.includes('.') ? 'linear-gradient(135deg, #6366F1, #10B981)' : '#1C2438', color: email.includes('@') && email.includes('.') ? '#FFF' : '#4A5568', border: 'none' }}>Start →</button>
            </div>
          </div>
        )}

        {emailConfirmed && (
          <>
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#F0F2F7] mb-1">{lang === 'fr' ? 'Informations personnelles' : 'Persoonlijke gegevens'}</h2>
                <p className="text-sm text-[#6B7A99] mb-5">{lang === 'fr' ? 'Ces informations apparaitront en haut de votre CV.' : 'Deze gegevens komen bovenaan je CV.'}</p>
                <div className="mb-4"><label className={lbl}>{lang === 'fr' ? 'Nom complet' : 'Volledige naam'} *</label><input className={inp} placeholder="Jan Peeters" value={naam} onChange={(e) => setNaam(e.target.value)} /></div>
                <div className="mb-4"><label className={lbl}>{lang === 'fr' ? 'Fonction souhaitee' : 'Gewenste functie'} *</label><input className={inp} placeholder="Marketing Manager" value={gewensteFunctie} onChange={(e) => setGewensteFunctie(e.target.value)} /></div>
                <div className="mb-4"><label className={lbl}>{lang === 'fr' ? 'Telephone' : 'Telefoon'}</label><input className={inp} placeholder="+32 470 12 34 56" value={telefoon} onChange={(e) => setTelefoon(e.target.value)} /></div>
                <div className="mb-4"><label className={lbl}>{lang === 'fr' ? 'Adresse' : 'Adres'}</label><input className={inp} placeholder="Antwerpen, Belgie" value={adres} onChange={(e) => setAdres(e.target.value)} /></div>
                <div className="mb-4"><label className={lbl}>LinkedIn</label><input className={inp} placeholder="linkedin.com/in/janpeeters" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} /></div>
                <div className="flex justify-end mt-6">
                  <button onClick={s0ok ? next : undefined} className={`px-7 py-3 rounded-lg text-sm font-semibold transition-colors ${s0ok ? 'bg-[#6366F1] text-white cursor-pointer hover:bg-[#4F46E5]' : 'bg-[#1C2438] text-[#4A5568] cursor-default'}`}>{lang === 'fr' ? 'Suivant' : 'Volgende'} →</button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-[#F0F2F7] mb-1">{lang === 'fr' ? 'Experience professionnelle' : 'Werkervaring'}</h2>
                <p className="text-sm text-[#6B7A99] mb-5">{lang === 'fr' ? 'Ajoutez vos experiences.' : 'Voeg je ervaringen toe, van recent naar oud.'}</p>
                {ervaring.map((e, i) => (
                  <div key={i} className="bg-[#141B2D] rounded-xl p-4 border border-[#2A355040] mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-[#6366F1]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{lang === 'fr' ? 'EXPERIENCE' : 'ERVARING'} {i + 1}</span>
                      {ervaring.length > 1 && <button onClick={() => removeErvaring(i)} className="text-xs text-[#6B7A99] cursor-pointer bg-transparent border-none">✕</button>}
                    </div>
                    <div className="mb-3"><label className={lbl}>{lang === 'fr' ? 'Fonction' : 'Functie'} *</label><input className={inp} placeholder="Marketing Manager" value={e.functie} onChange={(ev) => updateErvaring(i, 'functie', ev.target.value)} /></div>
                    <div className="mb-3"><label className={lbl}>{lang === 'fr' ? 'Entreprise' : 'Bedrijf'} *</label><input className={inp} placeholder="Coolblue" value={e.bedrijf} onChange={(ev) => updateErvaring(i, 'bedrijf', ev.target.value)} /></div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div><label className={lbl}>{lang === 'fr' ? 'De' : 'Van'}</label><input className={inp} placeholder="2020" value={e.van} onChange={(ev) => updateErvaring(i, 'van', ev.target.value)} /></div>
                      <div><label className={lbl}>{lang === 'fr' ? 'A' : 'Tot'}</label><input className={inp} placeholder={lang === 'fr' ? 'Present' : 'Heden'} value={e.tot} onChange={(ev) => updateErvaring(i, 'tot', ev.target.value)} /></div>
                    </div>
                    <div><label className={lbl}>{lang === 'fr' ? 'Description' : 'Beschrijving'}</label><textarea className={ta} placeholder={lang === 'fr' ? 'Decrivez vos responsabilites...' : 'Beschrijf je taken en prestaties...'} value={e.beschrijving} onChange={(ev) => updateErvaring(i, 'beschrijving', ev.target.value)} /></div>
                  </div>
                ))}
                <button onClick={addErvaring} className="w-full py-2.5 rounded-lg text-sm font-medium text-[#6366F1] border border-dashed border-[#6366F140] cursor-pointer bg-transparent mb-4">+ {lang === 'fr' ? 'Ajouter' : 'Toevoegen'}</button>
                <div className="flex justify-between mt-4">
                  <button onClick={back} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">← {lang === 'fr' ? 'Retour' : 'Terug'}</button>
                  <button onClick={s1ok ? next : undefined} className={`px-7 py-3 rounded-lg text-sm font-semibold transition-colors ${s1ok ? 'bg-[#6366F1] text-white cursor-pointer' : 'bg-[#1C2438] text-[#4A5568] cursor-default'}`}>{lang === 'fr' ? 'Suivant' : 'Volgende'} →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-[#F0F2F7] mb-1">{lang === 'fr' ? 'Formation' : 'Opleiding'}</h2>
                <p className="text-sm text-[#6B7A99] mb-5">{lang === 'fr' ? 'Ajoutez vos diplomes.' : 'Voeg je opleidingen toe.'}</p>
                {opleiding.map((o, i) => (
                  <div key={i} className="bg-[#141B2D] rounded-xl p-4 border border-[#2A355040] mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-[#6366F1]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{lang === 'fr' ? 'FORMATION' : 'OPLEIDING'} {i + 1}</span>
                      {opleiding.length > 1 && <button onClick={() => removeOpleiding(i)} className="text-xs text-[#6B7A99] cursor-pointer bg-transparent border-none">✕</button>}
                    </div>
                    <div className="mb-3"><label className={lbl}>{lang === 'fr' ? 'Diplome' : 'Diploma'} *</label><input className={inp} placeholder="Bachelor Bedrijfsmanagement" value={o.diploma} onChange={(ev) => updateOpleiding(i, 'diploma', ev.target.value)} /></div>
                    <div className="mb-3"><label className={lbl}>{lang === 'fr' ? 'Ecole' : 'School'} *</label><input className={inp} placeholder="KU Leuven" value={o.school} onChange={(ev) => updateOpleiding(i, 'school', ev.target.value)} /></div>
                    <div><label className={lbl}>{lang === 'fr' ? 'Annee' : 'Jaar'}</label><input className={inp} placeholder="2018" value={o.jaar} onChange={(ev) => updateOpleiding(i, 'jaar', ev.target.value)} /></div>
                  </div>
                ))}
                <button onClick={addOpleiding} className="w-full py-2.5 rounded-lg text-sm font-medium text-[#6366F1] border border-dashed border-[#6366F140] cursor-pointer bg-transparent mb-4">+ {lang === 'fr' ? 'Ajouter' : 'Toevoegen'}</button>
                <div className="flex justify-between mt-4">
                  <button onClick={back} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">← {lang === 'fr' ? 'Retour' : 'Terug'}</button>
                  <button onClick={s2ok ? next : undefined} className={`px-7 py-3 rounded-lg text-sm font-semibold transition-colors ${s2ok ? 'bg-[#6366F1] text-white cursor-pointer' : 'bg-[#1C2438] text-[#4A5568] cursor-default'}`}>{lang === 'fr' ? 'Suivant' : 'Volgende'} →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-[#F0F2F7] mb-1">{lang === 'fr' ? 'Competences & langues' : 'Vaardigheden & talen'}</h2>
                <p className="text-sm text-[#6B7A99] mb-5">{lang === 'fr' ? 'Separez par des virgules.' : 'Scheid met kommas.'}</p>
                <div className="mb-4"><label className={lbl}>{lang === 'fr' ? 'Competences' : 'Vaardigheden'}</label><textarea className={ta} placeholder="Excel, Photoshop, SEO, ..." value={vaardigheden} onChange={(e) => setVaardigheden(e.target.value)} /></div>
                <div className="mb-6"><label className={lbl}>{lang === 'fr' ? 'Langues' : 'Talen'}</label><input className={inp} placeholder="Nederlands, Frans, Engels" value={talen} onChange={(e) => setTalen(e.target.value)} /></div>
                <label className={lbl + " !mb-2.5"}>{lang === 'fr' ? 'Langue du CV' : 'Taal van het CV'}</label>
                <div className="grid grid-cols-3 gap-2.5 mb-6">
                  {[{ id: 'nl', label: 'Nederlands' }, { id: 'fr', label: 'Francais' }, { id: 'en', label: 'English' }].map((l) => (
                    <button key={l.id} onClick={() => setTaal(l.id)} className="py-2.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer" style={{ background: taal === l.id ? '#6366F1' : '#141B2D', color: taal === l.id ? '#FFF' : '#6B7A99', border: `1px solid ${taal === l.id ? '#6366F1' : '#2A3550'}` }}>{l.label}</button>
                  ))}
                </div>
                <div className="bg-[#0D1220] rounded-[10px] p-4 border border-[#2A355040] mb-6">
                  <div className="text-xs font-semibold text-[#6366F1] mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>SAMENVATTING</div>
                  <div className="text-[13px] text-[#94A3C0] leading-relaxed"><strong className="text-[#F0F2F7]">{naam}</strong> — {gewensteFunctie}<br />{ervaring.filter(e => e.functie).length} ervaring(en) · {opleiding.filter(o => o.diploma).length} opleiding(en)</div>
                </div>
                <div className="flex justify-between">
                  <button onClick={back} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">← {lang === 'fr' ? 'Retour' : 'Terug'}</button>
                  <button onClick={canGenerate ? generateCV : () => setShowPaywall(true)} className="px-8 py-3 rounded-lg text-sm font-semibold text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #6366F1, #10B981)', border: 'none' }}>{canGenerate ? '✨ Genereer CV' : 'Upgrade'}</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                {loading && (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 border-[3px] border-[#1C2438] border-t-[#6366F1] rounded-full mx-auto mb-5" style={{ animation: 'spin 0.8s linear infinite' }} />
                    <div className="text-base font-semibold text-[#F0F2F7] mb-1.5">{lang === 'fr' ? 'Votre CV est en cours...' : 'Je CV wordt gemaakt...'}</div>
                    <div className="text-sm text-[#6B7A99]">AI schrijft je profiel en genereert de PDF</div>
                  </div>
                )}
                {!loading && error && (
                  <div>
                    <div className="bg-[#1A0B0F] border border-[#3A1520] rounded-[10px] p-4 mb-4">
                      <div className="text-sm font-semibold text-[#F87171] mb-1">Generatie mislukt</div>
                      <div className="text-xs text-[#A07070]">{error}</div>
                    </div>
                    <div className="flex gap-2.5">
                      <button onClick={() => { setStep(3); setError(''); }} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">← Terug</button>
                      <button onClick={generateCV} className="px-7 py-3 rounded-lg text-sm font-semibold text-white bg-[#6366F1] cursor-pointer border-none">Opnieuw</button>
                    </div>
                  </div>
                )}
                {!loading && !error && pdfUrl && (
                  <div>
                    <h2 className="text-xl font-bold text-[#F0F2F7] mb-4">Je CV is klaar! ✨</h2>
                    {generatedSummary && (
                      <div className="bg-[#141B2D] rounded-[10px] p-4 border border-[#2A355040] mb-4">
                        <div className="text-xs font-semibold text-[#6366F1] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>AI PROFIEL</div>
                        <div className="text-sm text-[#94A3C0] leading-relaxed">{generatedSummary}</div>
                      </div>
                    )}
                    <div className="bg-white rounded-[10px] overflow-hidden mb-4" style={{ height: 400 }}>
                      <iframe src={pdfUrl} width="100%" height="100%" style={{ border: 'none' }} />
                    </div>
                    <div className="flex gap-2.5">
                      <button onClick={() => { setStep(3); setPdfUrl(''); }} className="px-6 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">← Aanpassen</button>
                      <div className="flex-1" />
                      <button onClick={downloadPDF} className="px-8 py-3 rounded-lg text-sm font-semibold text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #6366F1, #10B981)', border: 'none' }}>Download PDF</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {showPaywall && (
        <div onClick={() => setShowPaywall(false)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, borderRadius: 18, background: '#141B2D', border: '1px solid rgba(42,53,80,0.5)', overflow: 'hidden' }}>
            <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F0F2F7', margin: '0 0 6px' }}>Upgrade naar Pro</h3>
              <p style={{ fontSize: 13, color: '#6B7A99', margin: '0 0 24px' }}>Onbeperkte CVs en sollicitatiebrieven.</p>
            </div>
            <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div onClick={() => handleCheckout('pro')} style={{ padding: '16px 18px', borderRadius: 12, cursor: 'pointer', border: '2px solid #6366F1', background: 'rgba(99,102,241,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700, color: '#F0F2F7' }}>Pro</div><div style={{ fontSize: 12, color: '#6B7A99' }}>Onbeperkt</div></div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#F0F2F7' }}>€9,99<span style={{ fontSize: 11, color: '#6B7A99' }}>/mo</span></div>
                </div>
              </div>
              <div onClick={() => handleCheckout('starter')} style={{ padding: '16px 18px', borderRadius: 12, cursor: 'pointer', border: '1px solid rgba(42,53,80,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700, color: '#F0F2F7' }}>Starter</div><div style={{ fontSize: 12, color: '#6B7A99' }}>3 documenten</div></div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#F0F2F7' }}>€4,99</div>
                </div>
              </div>
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(42,53,80,0.3)', textAlign: 'center' }}>
              <button onClick={() => setShowPaywall(false)} style={{ background: 'none', border: 'none', color: '#6B7A99', fontSize: 12, cursor: 'pointer' }}>Niet nu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
