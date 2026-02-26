'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

const t = {
  nl: {
    title: 'Interview Prep',
    subtitle: 'Oefen met AI-gestuurde interviewvragen op maat van jouw functie.',
    emailTitle: 'Bereid je interview voor',
    emailSubtitle: 'Vul je emailadres in om te starten. Je eerste sessie is gratis!',
    start: 'Start \u2192',
    emailNote: 'Geen spam. We bewaren je email alleen om je sessies te tellen.',
    paymentProcessing: 'Betaling wordt verwerkt...',
    paymentWait: 'Even geduld, we activeren je account.',
    step1Title: 'Jouw interview',
    step1Subtitle: 'Vertel ons over de functie waarvoor je wilt oefenen.',
    labelFunctie: 'Functie waarvoor je solliciteert *',
    placeholderFunctie: 'Marketing Manager, Software Developer, ...',
    labelSector: 'Sector *',
    placeholderSector: 'IT, Finance, Retail, Gezondheidszorg, ...',
    labelBedrijf: 'Bedrijf (optioneel)',
    placeholderBedrijf: 'Coolblue, KBC, Proximus, ...',
    labelNiveau: 'Ervaringsniveau',
    niveauJunior: 'Junior',
    niveauMedior: 'Medior',
    niveauSenior: 'Senior',
    labelTaal: 'Taal van het interview',
    next: 'Volgende \u2192',
    back: '\u2190 Terug',
    generating: 'Vragen worden gegenereerd...',
    generatingDesc: 'AI stelt relevante interviewvragen samen op basis van jouw profiel.',
    step2Title: 'Beantwoord de vragen',
    step2Subtitle: 'Geef je antwoord per vraag. Neem de tijd, net als bij een echt interview.',
    vraag: 'Vraag',
    van: 'van',
    placeholderAntwoord: 'Typ hier je antwoord...',
    volgendeVraag: 'Volgende vraag \u2192',
    feedbackButton: '\u2728 Ontvang feedback',
    analyzingTitle: 'Je antwoorden worden geanalyseerd...',
    analyzingDesc: 'AI beoordeelt je antwoorden en geeft persoonlijke feedback.',
    resultsTitle: 'Je interview feedback \u2728',
    totalScore: 'Totaalscore',
    vraagLabel: 'Vraag',
    jouwAntwoord: 'Jouw antwoord',
    feedbackLabel: 'Feedback',
    scoreLabel: 'Score',
    tipLabel: 'Tip',
    opnieuw: 'Nieuw interview',
    pasAan: '\u2190 Pas antwoorden aan',
    nogEen: 'Nog een sessie',
    proTip: 'Met Carrio Pro (\u20ac9,99/maand) oefen je onbeperkt interviews. Maandelijks opzegbaar.',
    genError: 'Generatie mislukt',
    retry: 'Opnieuw',
    freeTag: '1 GRATIS SESSIE',
    usedTag: 'GRATIS SESSIE GEBRUIKT',
    paywallTitle: 'Je gratis sessie is al gebruikt',
    paywallDesc: 'Kies hoe je verder wilt. Elke sessie is op maat van jouw functie en sector.',
    proName: 'Carrio Pro',
    proDesc: 'Onbeperkt sessies, maandelijks opzegbaar',
    starterName: 'Starter',
    starterDesc: '3 sessies, geen abonnement',
    notNow: 'Niet nu, misschien later',
    upgradeBtn: '\ud83d\udd12 Upgrade om te starten',
    generateBtn: '\u2728 Genereer vragen',
  },
  fr: {
    title: 'Interview Prep',
    subtitle: 'Entrainez-vous avec des questions d\'entretien IA adaptees a votre poste.',
    emailTitle: 'Preparez votre entretien',
    emailSubtitle: 'Entrez votre email pour commencer. Votre premiere session est gratuite !',
    start: 'Commencer \u2192',
    emailNote: 'Pas de spam. Nous conservons votre email uniquement pour compter vos sessions.',
    paymentProcessing: 'Paiement en cours...',
    paymentWait: 'Veuillez patienter.',
    step1Title: 'Votre entretien',
    step1Subtitle: 'Parlez-nous du poste pour lequel vous souhaitez vous preparer.',
    labelFunctie: 'Poste vise *',
    placeholderFunctie: 'Responsable Marketing, Developpeur, ...',
    labelSector: 'Secteur *',
    placeholderSector: 'IT, Finance, Retail, Sante, ...',
    labelBedrijf: 'Entreprise (optionnel)',
    placeholderBedrijf: 'Proximus, Belfius, Delhaize, ...',
    labelNiveau: 'Niveau d\'experience',
    niveauJunior: 'Junior',
    niveauMedior: 'Intermediaire',
    niveauSenior: 'Senior',
    labelTaal: 'Langue de l\'entretien',
    next: 'Suivant \u2192',
    back: '\u2190 Retour',
    generating: 'Generation des questions...',
    generatingDesc: 'L\'IA prepare des questions d\'entretien pertinentes basees sur votre profil.',
    step2Title: 'Repondez aux questions',
    step2Subtitle: 'Donnez votre reponse par question. Prenez votre temps, comme un vrai entretien.',
    vraag: 'Question',
    van: 'sur',
    placeholderAntwoord: 'Tapez votre reponse ici...',
    volgendeVraag: 'Question suivante \u2192',
    feedbackButton: '\u2728 Recevoir le feedback',
    analyzingTitle: 'Vos reponses sont analysees...',
    analyzingDesc: 'L\'IA evalue vos reponses et fournit un feedback personnalise.',
    resultsTitle: 'Votre feedback d\'entretien \u2728',
    totalScore: 'Score total',
    vraagLabel: 'Question',
    jouwAntwoord: 'Votre reponse',
    feedbackLabel: 'Feedback',
    scoreLabel: 'Score',
    tipLabel: 'Conseil',
    opnieuw: 'Nouvel entretien',
    pasAan: '\u2190 Modifier les reponses',
    nogEen: 'Encore une session',
    proTip: 'Avec Carrio Pro (\u20ac9,99/mois) entrainez-vous sans limites. Resiliable mensuellement.',
    genError: 'Echec de la generation',
    retry: 'Reessayer',
    freeTag: '1 SESSION GRATUITE',
    usedTag: 'SESSION UTILISEE',
    paywallTitle: 'Votre session gratuite est utilisee',
    paywallDesc: 'Chaque session est adaptee a votre poste et secteur.',
    proName: 'Carrio Pro',
    proDesc: 'Sessions illimitees, resiliable mensuellement',
    starterName: 'Starter',
    starterDesc: '3 sessions, sans abonnement',
    notNow: 'Pas maintenant',
    upgradeBtn: '\ud83d\udd12 Passer au Pro',
    generateBtn: '\u2728 Generer les questions',
  },
};

const LANGS = [
  { id: 'nl', label: 'Nederlands' },
  { id: 'fr', label: 'Fran\u00e7ais' },
  { id: 'en', label: 'English' },
];

export default function InterviewPrep() {
  const { lang } = useLanguage();
  const T = t[lang] || t.nl;

  const [email, setEmail] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [canGenerate, setCanGenerate] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [briefsUsed, setBriefsUsed] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [functie, setFunctie] = useState('');
  const [sector, setSector] = useState('');
  const [bedrijf, setBedrijf] = useState('');
  const [niveau, setNiveau] = useState('medior');
  const [taal, setTaal] = useState('nl');

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [feedback, setFeedback] = useState(null);

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
      if (data.url) window.location.href = data.url;
      else alert(data.error || 'Er ging iets mis.');
    } catch (err) {
      alert('Kan betaalvenster niet openen.');
    }
  };

  const s0ok = functie.trim() && sector.trim();

  const generateQuestions = async () => {
    setStep(1);
    setLoading(true);
    setError('');
    setQuestions([]);
    setAnswers([]);
    setCurrentQ(0);
    setFeedback(null);

    try {
      const res = await fetch('/api/generate-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, functie, sector, bedrijf, niveau, taal }),
      });
      const data = await res.json();

      if (data.error === 'LIMIT_REACHED') {
        setShowPaywall(true);
        setLoading(false);
        setStep(0);
        return;
      }
      if (!res.ok) throw new Error(data.error || 'Generatie mislukt');
      if (!data.questions || !data.questions.length) throw new Error('Geen vragen ontvangen');

      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(''));
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const submitAnswers = async () => {
    setStep(3);
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, functie, sector, bedrijf, niveau, taal,
          mode: 'feedback',
          questions,
          answers,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Feedback mislukt');
      setFeedback(data.feedback);
      setBriefsUsed((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const inp = "w-full px-3.5 py-2.5 bg-[#141B2D] border border-[#2A3550] rounded-lg text-[#D4DCE8] text-sm outline-none focus:border-[#3B82F6] transition-colors placeholder:text-[#3A4560]";
  const ta = inp + " resize-y min-h-[120px]";
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
                {briefsUsed === 0 ? T.freeTag : T.usedTag}
              </span>
            )}
          </div>

          {emailConfirmed && step >= 0 && step <= 2 && (
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

        {/* EMAIL GATE */}
        {!emailConfirmed && (
          <div style={{ paddingTop: 40, textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #3B82F6, #10B981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26,
            }}>\ud83c\udfaf</div>

            <h2 className="text-2xl font-bold text-[#F0F2F7] mb-2">{T.emailTitle}</h2>
            <p className="text-sm text-[#6B7A99] mb-6 max-w-[360px] mx-auto leading-relaxed">{T.emailSubtitle}</p>

            <div className="max-w-[360px] mx-auto">
              <input
                type="email" className={inp + " !text-center !text-base !py-3.5 mb-3"}
                placeholder={lang === 'fr' ? 'votre@email.be' : 'jouw@email.be'}
                value={email} onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
              />
              <button onClick={handleEmailSubmit}
                disabled={!email.includes('@') || !email.includes('.')}
                className="w-full py-3.5 rounded-lg text-base font-semibold transition-all cursor-pointer"
                style={{
                  background: email.includes('@') && email.includes('.') ? 'linear-gradient(135deg, #3B82F6, #10B981)' : '#1C2438',
                  color: email.includes('@') && email.includes('.') ? '#FFF' : '#4A5568',
                  border: 'none',
                  boxShadow: email.includes('@') ? '0 4px 20px rgba(59,130,246,0.2)' : 'none',
                }}>{T.start}</button>
            </div>
            <p className="text-[11px] text-[#3A4560] mt-4">{T.emailNote}</p>
          </div>
        )}

        {/* Payment processing */}
        {checkingPayment && (
          <div style={{ textAlign: 'center', padding: '48px 20px' }}>
            <div className="w-12 h-12 border-[3px] border-[#1C2438] border-t-[#10B981] rounded-full mx-auto mb-5" style={{ animation: 'spin 0.8s linear infinite' }} />
            <div className="text-base font-semibold text-[#F0F2F7] mb-1.5">{T.paymentProcessing}</div>
            <div className="text-sm text-[#6B7A99]">{T.paymentWait}</div>
          </div>
        )}

        {emailConfirmed && !checkingPayment && (
          <>
            {/* STEP 0: Setup */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#F0F2F7] mb-1">{T.step1Title}</h2>
                <p className="text-sm text-[#6B7A99] mb-5">{T.step1Subtitle}</p>

                <div className="mb-4">
                  <label className={lbl}>{T.labelFunctie}</label>
                  <input className={inp} placeholder={T.placeholderFunctie} value={functie} onChange={(e) => setFunctie(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className={lbl}>{T.labelSector}</label>
                  <input className={inp} placeholder={T.placeholderSector} value={sector} onChange={(e) => setSector(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className={lbl}>{T.labelBedrijf}</label>
                  <input className={inp} placeholder={T.placeholderBedrijf} value={bedrijf} onChange={(e) => setBedrijf(e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className={lbl}>{T.labelNiveau}</label>
                    <div className="flex gap-1.5">
                      {['junior', 'medior', 'senior'].map((n) => (
                        <button key={n} onClick={() => setNiveau(n)}
                          className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                          style={{
                            background: niveau === n ? '#3B82F6' : '#141B2D',
                            color: niveau === n ? '#FFF' : '#6B7A99',
                            border: `1px solid ${niveau === n ? '#3B82F6' : '#2A3550'}`,
                          }}>
                          {n === 'junior' ? T.niveauJunior : n === 'medior' ? T.niveauMedior : T.niveauSenior}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>{T.labelTaal}</label>
                    <select className={inp + " cursor-pointer"} value={taal} onChange={(e) => setTaal(e.target.value)}>
                      {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={s0ok ? (canGenerate ? generateQuestions : () => setShowPaywall(true)) : undefined}
                    className="px-8 py-3 rounded-lg text-sm font-semibold cursor-pointer"
                    style={{
                      background: s0ok ? 'linear-gradient(135deg, #3B82F6, #10B981)' : '#1C2438',
                      color: s0ok ? '#FFF' : '#4A5568',
                      border: 'none',
                      boxShadow: s0ok ? '0 4px 20px rgba(59,130,246,0.2)' : 'none',
                    }}>
                    {canGenerate ? T.generateBtn : T.upgradeBtn}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: Generating */}
            {step === 1 && loading && (
              <div className="text-center py-16">
                <div className="w-12 h-12 border-[3px] border-[#1C2438] border-t-[#3B82F6] rounded-full mx-auto mb-5" style={{ animation: 'spin 0.8s linear infinite' }} />
                <div className="text-base font-semibold text-[#F0F2F7] mb-1.5">{T.generating}</div>
                <div className="text-sm text-[#6B7A99]">{T.generatingDesc}</div>
              </div>
            )}

            {step === 1 && !loading && error && (
              <div>
                <div className="bg-[#1A0B0F] border border-[#3A1520] rounded-[10px] p-4 mb-4">
                  <div className="text-sm font-semibold text-[#F87171] mb-1">{T.genError}</div>
                  <div className="text-xs text-[#A07070]">{error}</div>
                </div>
                <div className="flex gap-2.5">
                  <button onClick={() => { setStep(0); setError(''); }} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">{T.back}</button>
                  <button onClick={generateQuestions} className="px-7 py-3 rounded-lg text-sm font-semibold text-white bg-[#3B82F6] cursor-pointer border-none">{T.retry}</button>
                </div>
              </div>
            )}

            {/* STEP 2: Answer questions */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-[#F0F2F7] mb-1">{T.step2Title}</h2>
                <p className="text-sm text-[#6B7A99] mb-5">{T.step2Subtitle}</p>

                {/* Question counter */}
                <div className="flex gap-1.5 mb-5">
                  {questions.map((_, i) => (
                    <div key={i} onClick={() => setCurrentQ(i)}
                      className="flex-1 h-[3px] rounded-full cursor-pointer transition-colors"
                      style={{ background: i <= currentQ ? 'linear-gradient(90deg, #3B82F6, #10B981)' : '#1C2438' }} />
                  ))}
                </div>

                <div className="bg-[#0D1220] rounded-[10px] p-4 border border-[#2A355040] mb-5">
                  <div className="text-xs font-semibold text-[#3B82F6] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
                    {T.vraag} {currentQ + 1} {T.van} {questions.length}
                  </div>
                  <div className="text-[15px] text-[#F0F2F7] leading-relaxed font-medium">
                    {questions[currentQ]}
                  </div>
                </div>

                <textarea
                  className={ta + " !min-h-[160px]"}
                  placeholder={T.placeholderAntwoord}
                  value={answers[currentQ] || ''}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[currentQ] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                />

                <div className="flex justify-between mt-5">
                  {currentQ > 0 ? (
                    <button onClick={() => setCurrentQ((c) => c - 1)} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">{T.back}</button>
                  ) : (
                    <button onClick={() => setStep(0)} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">{T.back}</button>
                  )}

                  {currentQ < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQ((c) => c + 1)}
                      disabled={!answers[currentQ]?.trim()}
                      className="px-7 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                      style={{
                        background: answers[currentQ]?.trim() ? '#3B82F6' : '#1C2438',
                        color: answers[currentQ]?.trim() ? '#FFF' : '#4A5568',
                        border: 'none',
                      }}>{T.volgendeVraag}</button>
                  ) : (
                    <button
                      onClick={submitAnswers}
                      disabled={!answers[currentQ]?.trim()}
                      className="px-8 py-3 rounded-lg text-sm font-semibold cursor-pointer"
                      style={{
                        background: answers[currentQ]?.trim() ? 'linear-gradient(135deg, #3B82F6, #10B981)' : '#1C2438',
                        color: answers[currentQ]?.trim() ? '#FFF' : '#4A5568',
                        border: 'none',
                        boxShadow: answers[currentQ]?.trim() ? '0 4px 20px rgba(59,130,246,0.2)' : 'none',
                      }}>{T.feedbackButton}</button>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Feedback */}
            {step === 3 && loading && (
              <div className="text-center py-16">
                <div className="w-12 h-12 border-[3px] border-[#1C2438] border-t-[#10B981] rounded-full mx-auto mb-5" style={{ animation: 'spin 0.8s linear infinite' }} />
                <div className="text-base font-semibold text-[#F0F2F7] mb-1.5">{T.analyzingTitle}</div>
                <div className="text-sm text-[#6B7A99]">{T.analyzingDesc}</div>
              </div>
            )}

            {step === 3 && !loading && error && (
              <div>
                <div className="bg-[#1A0B0F] border border-[#3A1520] rounded-[10px] p-4 mb-4">
                  <div className="text-sm font-semibold text-[#F87171] mb-1">{T.genError}</div>
                  <div className="text-xs text-[#A07070]">{error}</div>
                </div>
                <div className="flex gap-2.5">
                  <button onClick={() => { setStep(2); setError(''); }} className="px-7 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">{T.back}</button>
                  <button onClick={submitAnswers} className="px-7 py-3 rounded-lg text-sm font-semibold text-white bg-[#3B82F6] cursor-pointer border-none">{T.retry}</button>
                </div>
              </div>
            )}

            {step === 3 && !loading && !error && feedback && (
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold text-[#F0F2F7]">{T.resultsTitle}</h2>
                  <div className="text-right">
                    <div className="text-xs text-[#6B7A99]">{T.totalScore}</div>
                    <div className="text-2xl font-bold" style={{
                      background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>{feedback.totalScore}/10</div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {feedback.items.map((item, i) => (
                    <div key={i} className="bg-[#141B2D] rounded-[10px] p-4 border border-[#2A355040]">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-xs font-semibold text-[#3B82F6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {T.vraagLabel} {i + 1}
                        </div>
                        <div className="text-xs font-bold px-2 py-0.5 rounded" style={{
                          background: item.score >= 8 ? '#10B98120' : item.score >= 6 ? '#F59E0B20' : '#EF444420',
                          color: item.score >= 8 ? '#10B981' : item.score >= 6 ? '#F59E0B' : '#EF4444',
                        }}>{item.score}/10</div>
                      </div>

                      <div className="text-[13px] text-[#F0F2F7] font-medium mb-2">{questions[i]}</div>

                      <div className="text-xs text-[#6B7A99] mb-1 font-semibold">{T.jouwAntwoord}</div>
                      <div className="text-xs text-[#94A3C0] mb-3 leading-relaxed bg-[#0D1220] rounded-lg p-2.5">{answers[i]}</div>

                      <div className="text-xs text-[#6B7A99] mb-1 font-semibold">{T.feedbackLabel}</div>
                      <div className="text-xs text-[#94A3C0] leading-relaxed mb-2">{item.feedback}</div>

                      {item.tip && (
                        <div className="text-xs p-2.5 rounded-lg" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
                          <span className="font-semibold text-[#60A5FA]">{T.tipLabel}:</span>{' '}
                          <span className="text-[#94A3C0]">{item.tip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2.5">
                  <button onClick={() => { setStep(2); setFeedback(null); }} className="px-6 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">{T.pasAan}</button>
                  <div className="flex-1" />
                  {isPro ? (
                    <button onClick={() => { setStep(0); setQuestions([]); setAnswers([]); setFeedback(null); setFunctie(''); setSector(''); setBedrijf(''); }}
                      className="px-6 py-3 rounded-lg text-sm font-medium text-[#6B7A99] border border-[#2A3550] cursor-pointer">{T.opnieuw}</button>
                  ) : (
                    <button onClick={() => setShowPaywall(true)}
                      className="px-6 py-3 rounded-lg text-sm font-medium text-[#60A5FA] border border-[#3B82F630] cursor-pointer bg-[#3B82F610]">{T.nogEen}</button>
                  )}
                </div>

                {!isPro && (
                  <div className="mt-5 p-3.5 rounded-[10px] border text-xs leading-relaxed" style={{
                    background: 'rgba(99,102,241,0.06)',
                    borderColor: 'rgba(99,102,241,0.15)',
                    color: '#94A3C0',
                  }}>
                    \ud83d\udca1 <strong className="text-[#D4DCE8]">{T.tipLabel}:</strong>{' '}
                    <button onClick={() => setShowPaywall(true)} className="text-[#60A5FA] underline cursor-pointer bg-transparent border-none font-inherit" style={{ fontSize: 'inherit' }}>{T.proTip}</button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* PAYWALL MODAL */}
      {showPaywall && (
        <div onClick={() => setShowPaywall(false)} style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
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
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>\ud83d\ude80</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F0F2F7', margin: '0 0 6px' }}>{T.paywallTitle}</h3>
              <p style={{ fontSize: 13, color: '#6B7A99', margin: '0 0 24px', lineHeight: 1.6 }}>{T.paywallDesc}</p>
            </div>
            <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div onClick={() => handleCheckout('pro')} style={{
                padding: '16px 18px', borderRadius: 12, cursor: 'pointer',
                border: '2px solid #3B82F6', background: 'rgba(59,130,246,0.06)', position: 'relative',
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
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F2F7' }}>{T.proName}</div>
                    <div style={{ fontSize: 12, color: '#6B7A99', marginTop: 2 }}>{T.proDesc}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#F0F2F7' }}>\u20ac9,99</div>
                    <div style={{ fontSize: 11, color: '#6B7A99' }}>/maand</div>
                  </div>
                </div>
              </div>
              <div onClick={() => handleCheckout('starter')} style={{
                padding: '16px 18px', borderRadius: 12, cursor: 'pointer',
                border: '1px solid rgba(42,53,80,0.5)', background: 'transparent',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F2F7' }}>{T.starterName}</div>
                    <div style={{ fontSize: 12, color: '#6B7A99', marginTop: 2 }}>{T.starterDesc}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#F0F2F7' }}>\u20ac4,99</div>
                    <div style={{ fontSize: 11, color: '#6B7A99' }}>eenmalig</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(42,53,80,0.3)', textAlign: 'center' }}>
              <button onClick={() => setShowPaywall(false)} style={{
                background: 'none', border: 'none', color: '#6B7A99', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
              }}>{T.notNow}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
