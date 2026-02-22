import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, naam, functie, ervaring, opleiding, talen, skills, vacatureTitel, bedrijf, vacatureTekst, toon, taal } = body;

    if (!email || !naam || !functie || !ervaring || !vacatureTitel || !bedrijf) {
      return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check usage limits (skip if Supabase not configured = dev mode)
    if (supabase) {
      const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('email', normalizedEmail)
        .single();

      if (!user) {
        return NextResponse.json({ error: 'Gebruiker niet gevonden. Vernieuw de pagina.' }, { status: 403 });
      }

      const canGenerate = user.is_pro || user.briefs_used < 1 || (user.paid_briefs || 0) > 0;

      if (!canGenerate) {
        return NextResponse.json({
          error: 'LIMIT_REACHED',
          message: 'Je gratis brief is al gebruikt. Koop een losse brief of upgrade naar Pro.',
        }, { status: 403 });
      }
    }

    // Generate the letter
    const taalMap = { nl: 'Nederlands', fr: 'Frans', en: 'Engels' };

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: `Je bent een expert carrière-adviseur gespecialiseerd in de Belgische arbeidsmarkt. Je schrijft uitsluitend motivatiebrieven. Antwoord ALLEEN met de brief zelf — geen uitleg, geen markdown, geen backticks. Begin direct met de datum en aanspreking.

Belgische conventies:
- Motivatiebrief is cruciaal in België en wordt door recruiters aandachtig gelezen
- Taalkennis is zeer belangrijk (meertalig land: NL/FR/EN/DE)
- Werkgevers waarderen ervaring, motivatie en sociale vaardigheden
- De brief moet complementair zijn aan het CV, niet herhalend
- Formele aanspreking
- Maximum 1 pagina, bondig maar overtuigend
- Eindig met een concrete call-to-action (uitnodiging voor gesprek)`,
      messages: [
        {
          role: 'user',
          content: `Schrijf een motivatiebrief in het ${taalMap[taal] || 'Nederlands'} met toon: ${toon || 'Professioneel'}.

SOLLICITANT:
Naam: ${naam}
Functie: ${functie}
Ervaring: ${ervaring}
Opleiding: ${opleiding || 'Niet opgegeven'}
Talen: ${talen || 'Niet opgegeven'}
Vaardigheden: ${skills || 'Niet opgegeven'}

VACATURE:
Titel: ${vacatureTitel}
Bedrijf: ${bedrijf}
Beschrijving: ${vacatureTekst || 'Niet opgegeven — baseer je op de functietitel en het bedrijf'}

Schrijf de brief nu.`,
        },
      ],
    });

    const text = message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    // Track usage in database
    if (supabase) {
      const { data: user } = await supabase
        .from('users')
        .select('briefs_used, paid_briefs, is_pro')
        .eq('email', normalizedEmail)
        .single();

      if (user) {
        const updates = { briefs_used: (user.briefs_used || 0) + 1 };

        // If not pro and already used free brief, decrement paid_briefs
        if (!user.is_pro && user.briefs_used >= 1 && (user.paid_briefs || 0) > 0) {
          updates.paid_briefs = user.paid_briefs - 1;
        }

        await supabase
          .from('users')
          .update(updates)
          .eq('email', normalizedEmail);
      }
    }

    return NextResponse.json({ letter: text });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Er ging iets mis bij het genereren.' },
      { status: 500 }
    );
  }
}
