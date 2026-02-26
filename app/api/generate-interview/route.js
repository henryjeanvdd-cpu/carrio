import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, functie, sector, bedrijf, niveau, taal, mode, questions, answers } = body;

    if (!email || !functie || !sector) {
      return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 });
    }

    // Check usage
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (user) {
      const limit = user.is_pro ? 999999 : user.briefs_allowed || 1;
      if (user.briefs_used >= limit) {
        return NextResponse.json({ error: 'LIMIT_REACHED' }, { status: 403 });
      }
    }

    const langMap = { nl: 'Nederlands', fr: 'Frans', en: 'Engels' };
    const language = langMap[taal] || 'Nederlands';

    // MODE: Generate questions
    if (mode !== 'feedback') {
      const prompt = `Je bent een professionele interviewcoach gespecialiseerd in de Belgische arbeidsmarkt.

Genereer exact 5 realistische interviewvragen voor de volgende situatie:
- Functie: ${functie}
- Sector: ${sector}
${bedrijf ? `- Bedrijf: ${bedrijf}` : ''}
- Ervaringsniveau: ${niveau}

Regels:
- Schrijf de vragen in het ${language}
- Mix van gedragsvragen (STAR-methode), technische/inhoudelijke vragen, en motivatievragen
- Maak ze realistisch voor de Belgische context
- Pas het niveau aan (${niveau})
- Eén vraag mag specifiek over het bedrijf gaan als een bedrijfsnaam is opgegeven

Antwoord ALLEEN met een JSON array van 5 strings. Geen uitleg, geen markdown, alleen de JSON array.
Voorbeeld: ["Vraag 1?", "Vraag 2?", "Vraag 3?", "Vraag 4?", "Vraag 5?"]`;

      const message = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      const text = message.content[0].text.trim();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        const match = text.match(/\[[\s\S]*\]/);
        if (match) parsed = JSON.parse(match[0]);
        else throw new Error('Kon vragen niet parsen');
      }

      return NextResponse.json({ questions: parsed });
    }

    // MODE: Feedback on answers
    if (mode === 'feedback') {
      if (!questions || !answers || questions.length !== answers.length) {
        return NextResponse.json({ error: 'Ongeldige data' }, { status: 400 });
      }

      const qaPairs = questions.map((q, i) => `Vraag ${i + 1}: ${q}\nAntwoord ${i + 1}: ${answers[i]}`).join('\n\n');

      const prompt = `Je bent een professionele interviewcoach gespecialiseerd in de Belgische arbeidsmarkt.

Beoordeel de volgende interviewantwoorden:

Functie: ${functie}
Sector: ${sector}
${bedrijf ? `Bedrijf: ${bedrijf}` : ''}
Niveau: ${niveau}

${qaPairs}

Regels:
- Schrijf al je feedback in het ${language}
- Geef per vraag een score (1-10), constructieve feedback, en een concrete tip
- Geef ook een totaalscore (1-10)
- Wees eerlijk maar bemoedigend
- Focus op de Belgische arbeidsmarktcontext
- Gebruik de STAR-methode als referentiekader voor gedragsvragen

Antwoord ALLEEN met JSON in dit exact formaat (geen markdown, geen uitleg):
{
  "totalScore": 7,
  "items": [
    {
      "score": 7,
      "feedback": "Je feedback hier...",
      "tip": "Concrete tip hier..."
    }
  ]
}

Er moeten exact ${questions.length} items zijn, één per vraag.`;

      const message = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      });

      const text = message.content[0].text.trim();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        const match = text.match(/\{[\s\S]*\}/);
        if (match) parsed = JSON.parse(match[0]);
        else throw new Error('Kon feedback niet parsen');
      }

      // Update usage
      if (user) {
        await supabase
          .from('users')
          .update({ briefs_used: user.briefs_used + 1 })
          .eq('email', email.toLowerCase().trim());
      }

      return NextResponse.json({ feedback: parsed });
    }

  } catch (err) {
    console.error('Interview API error:', err);
    return NextResponse.json({ error: err.message || 'Er ging iets mis' }, { status: 500 });
  }
}
