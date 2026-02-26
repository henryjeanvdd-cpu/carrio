import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, naam, functie, ervaring, opleiding, vaardigheden, talen, taal } = body;

    if (!email || !naam || !functie) {
      return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check usage limits
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
          message: 'Je gratis CV is al gebruikt. Upgrade naar Pro voor onbeperkte toegang.',
        }, { status: 403 });
      }
    }

    const taalMap = { nl: 'Nederlands', fr: 'Frans', en: 'Engels' };

    // Format experience for the prompt
    const ervaringText = ervaring.map((e, i) => 
      `${i + 1}. ${e.functie} bij ${e.bedrijf} (${e.van} - ${e.tot}): ${e.beschrijving}`
    ).join('\n');

    const opleidingText = opleiding.map((o, i) =>
      `${i + 1}. ${o.diploma} - ${o.school} (${o.jaar})`
    ).join('\n');

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: `Je bent een expert CV-schrijver gespecialiseerd in de Belgische arbeidsmarkt. Je schrijft uitsluitend een professioneel profiel/samenvatting voor een CV. Antwoord ALLEEN met de samenvatting zelf — geen uitleg, geen markdown, geen backticks. Maximum 4 zinnen, krachtig en to-the-point. Belgische conventies: meertaligheid benadrukken, resultaatgericht, professioneel.`,
      messages: [
        {
          role: 'user',
          content: `Schrijf een professionele CV-samenvatting in het ${taalMap[taal] || 'Nederlands'}.

PERSOON:
Naam: ${naam}
Gewenste functie: ${functie}

WERKERVARING:
${ervaringText || 'Geen werkervaring opgegeven'}

OPLEIDING:
${opleidingText || 'Geen opleiding opgegeven'}

VAARDIGHEDEN: ${vaardigheden || 'Niet opgegeven'}
TALEN: ${talen || 'Niet opgegeven'}

Schrijf nu een krachtige professionele samenvatting van max 4 zinnen.`,
        },
      ],
    });

    const summary = message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    // Track usage
    if (supabase) {
      const { data: user } = await supabase
        .from('users')
        .select('briefs_used, paid_briefs, is_pro')
        .eq('email', normalizedEmail)
        .single();

      if (user) {
        const updates = { briefs_used: (user.briefs_used || 0) + 1 };
        if (!user.is_pro && user.briefs_used >= 1 && (user.paid_briefs || 0) > 0) {
          updates.paid_briefs = user.paid_briefs - 1;
        }
        await supabase
          .from('users')
          .update(updates)
          .eq('email', normalizedEmail);
      }
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('CV API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Er ging iets mis bij het genereren.' },
      { status: 500 }
    );
  }
}
