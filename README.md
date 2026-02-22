# Carrio — Je carrière, jouw kracht. 🇧🇪

AI-powered career toolkit voor de Belgische arbeidsmarkt.

## Structuur

```
carrio/
├── app/
│   ├── page.js              ← Landing page (carrio.be)
│   ├── brief/
│   │   └── page.js          ← Brief generator app (carrio.be/brief)
│   ├── api/
│   │   └── generate/
│   │       └── route.js     ← AI API endpoint (server-side)
│   ├── layout.js            ← Root layout + SEO
│   └── globals.css           ← Styles + animaties
├── package.json
├── tailwind.config.js
└── .env.example
```

## Routes

| Route | Wat |
|-------|-----|
| `/` | Landing page met features, pricing, FAQ |
| `/brief` | Motivatiebrief generator (3-stappen flow) |
| `/api/generate` | Server-side AI endpoint |

## Lokaal draaien

```bash
npm install
cp .env.example .env.local
# Vul je Anthropic API key in
npm run dev
```

Open http://localhost:3000

## Deployen naar Vercel

1. Push naar GitHub
2. Importeer op vercel.com
3. Voeg `ANTHROPIC_API_KEY` toe als environment variable
4. Deploy

### Domein koppelen (Combell → Vercel)

1. Registreer carrio.be op Combell
2. In Vercel: Settings → Domains → Add "carrio.be"
3. In Combell DNS: voeg CNAME record toe:
   - Naam: `@` (of `www`)
   - Waarde: `cname.vercel-dns.com`
4. Wacht ~5 min → klaar!

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + Outfit font
- **Anthropic Claude API** (Sonnet)
- **Vercel** hosting

## Kosten

| Item | Prijs |
|------|-------|
| Vercel hosting | Gratis |
| Domein carrio.be | ~€10/jaar (Combell) |
| API per brief | ~€0.01-0.03 |

## Roadmap

- [x] Motivatiebrieven generator
- [x] Landing page
- [ ] Stripe betaalintegratie
- [ ] CV Builder
- [ ] Interview Prep
- [ ] LinkedIn Coach

## Licentie

MIT
