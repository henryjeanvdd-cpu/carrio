# Carrio Setup Guide: Supabase + Stripe

Dit is de aanvullende handleiding voor het opzetten van de database (Supabase) en betalingen (Stripe).

---

## DEEL 1: Supabase (Database) — Gratis

Supabase is je database. Het onthoudt welke emails al een gratis brief hebben gehad.

### Account aanmaken:
1. Ga naar: https://supabase.com
2. Klik **"Start your project"**
3. Log in met je **GitHub account** (die je al hebt aangemaakt)
4. Klik **"New Project"**
5. Vul in:
   - Organization: je eigen naam
   - Project name: `carrio`
   - Database password: kies een sterk wachtwoord (BEWAAR DIT!)
   - Region: **West EU (Ireland)** — dichtste bij België
6. Klik **"Create new project"**
7. Wacht 1-2 minuten terwijl het project wordt aangemaakt

### Database tabel aanmaken:
1. Klik links op **"SQL Editor"** (het icoon met `<>`)
2. Klik **"New query"**
3. Kopieer en plak deze hele SQL code:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  briefs_used INTEGER DEFAULT 0,
  paid_briefs INTEGER DEFAULT 0,
  is_pro BOOLEAN DEFAULT false,
  pro_since TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index voor snelle email lookups
CREATE INDEX idx_users_email ON users (email);

-- Index voor Stripe customer lookups
CREATE INDEX idx_users_stripe ON users (stripe_customer_id);

-- Row Level Security aanzetten
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: alleen service role kan lezen/schrijven (API calls vanuit je server)
CREATE POLICY "Service role full access" ON users
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Klik **"Run"** (de groene play knop)
5. Je ziet: "Success. No rows returned." — dat is goed!

### API keys ophalen:
1. Klik links op **"Project Settings"** (het tandwiel icoon onderaan)
2. Klik op **"API"** in het submenu
3. Je ziet twee dingen die je nodig hebt:

**Project URL** (begint met `https://xxxxx.supabase.co`)
→ Dit wordt je `NEXT_PUBLIC_SUPABASE_URL`

**service_role key** (begint met `eyJ...`, staat onder "Project API keys")
→ ⚠️ Klik op "Reveal" om de volledige key te zien
→ Dit wordt je `SUPABASE_SERVICE_ROLE_KEY`
→ ⚠️ DEEL DEZE KEY NOOIT PUBLIEK — alleen in env variables

---

## DEEL 2: Stripe (Betalingen) — Gratis tot je verdient

Stripe handelt alle betalingen af. Zij nemen 1.4% + €0.25 per transactie.

### Account aanmaken:
1. Ga naar: https://stripe.com
2. Klik **"Start now"**
3. Maak een account aan met je email
4. Vul je bedrijfsgegevens in:
   - Type: **Individual / Sole proprietor** (eenmanszaak)
   - Land: **België**
   - Je naam en adres
   - Bankrekeningnummer (IBAN) waar je geld naartoe wilt
5. Stripe kan een dag duren om je account te verifiëren

### ⚠️ TEST MODE: Begin altijd in test mode!
Stripe start automatisch in **Test mode** (oranje balk bovenaan).
Blijf in test mode totdat alles werkt. Je kunt dan "betalen" met testkaartnummers.

### API key ophalen:
1. Ga naar: https://dashboard.stripe.com/test/apikeys
2. Je ziet twee keys:
   - **Publishable key** (begint met `pk_test_...`) — die heb je niet nodig
   - **Secret key** (begint met `sk_test_...`) — klik "Reveal test key"
   → Dit wordt je `STRIPE_SECRET_KEY`

### Webhook instellen:
Een webhook vertelt je app wanneer iemand heeft betaald.

1. Ga naar: https://dashboard.stripe.com/test/webhooks
2. Klik **"Add endpoint"**
3. Vul in:
   - Endpoint URL: `https://carrio.be/api/webhook`
   (Als je nog lokaal test: gebruik een tool als ngrok, of sla dit over tot je live bent)
4. Klik **"Select events"** en kies:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Klik **"Add endpoint"**
6. Je ziet nu je webhook. Klik erop en kopieer de **"Signing secret"** (begint met `whsec_...`)
   → Dit wordt je `STRIPE_WEBHOOK_SECRET`

### Testen met testkaarten:
In test mode kun je deze kaartnummers gebruiken:
- **Succesvolle betaling**: `4242 4242 4242 4242`
- **Betaling geweigerd**: `4000 0000 0000 0002`
- Vervaldatum: elke datum in de toekomst
- CVC: elk 3-cijferig nummer

---

## DEEL 3: Alles koppelen

### Lokaal (.env.local):
Open je `.env.local` bestand en vul ALLE keys in:

```
ANTHROPIC_API_KEY=sk-ant-jouw-anthropic-key
NEXT_PUBLIC_SUPABASE_URL=https://jouw-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ-jouw-service-role-key
STRIPE_SECRET_KEY=sk_test_jouw-stripe-key
STRIPE_WEBHOOK_SECRET=whsec_jouw-webhook-secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Op Vercel (productie):
1. Ga naar je Vercel project → Settings → Environment Variables
2. Voeg ALLE 6 variabelen toe (dezelfde als hierboven)
3. ⚠️ Verander `NEXT_PUBLIC_BASE_URL` naar `https://carrio.be`
4. ⚠️ Verander `STRIPE_SECRET_KEY` naar je LIVE key als je uit test mode gaat

---

## DEEL 4: Van Test naar Live

Wanneer alles werkt in test mode:

1. **Stripe**: Klik bovenaan op "Test mode" toggle om naar Live te schakelen
2. Ga naar https://dashboard.stripe.com/apikeys (zonder /test/)
3. Kopieer je LIVE secret key (`sk_live_...`)
4. Maak een nieuwe webhook aan voor live mode met dezelfde URL
5. Update je Vercel environment variables met de live keys
6. Re-deploy op Vercel

---

## Hoe de flow werkt (samenvatting):

```
Bezoeker → carrio.be (landing page)
         → klikt "Start gratis"
         → carrio.be/brief
         → Vult email in
         → Check: heeft deze email al een gratis brief?
            NEE → brief generator (gratis)
            JA  → paywall modal (€6.99 of €19.99/mo)
         → Bij betaling: Stripe Checkout
         → Na betaling: redirect terug → brief generator
         → Webhook: Supabase update (is_pro=true of paid_briefs+1)
```

---

## Veelvoorkomende problemen

### "Supabase connection failed"
→ Check of je NEXT_PUBLIC_SUPABASE_URL correct is (met https://)

### "Stripe checkout niet beschikbaar"
→ Check of je STRIPE_SECRET_KEY correct is
→ Check of je in test mode zit

### "Webhook faalt"
→ Je webhook URL moet publiek bereikbaar zijn
→ Lokaal werken webhooks niet zonder ngrok
→ Test eerst door de app live te deployen op Vercel

### "Betaling gelukt maar brief nog geblokkeerd"
→ De webhook heeft misschien even nodig. Wacht 5 seconden en vernieuw.
→ Check in Supabase of de user record is geüpdatet.
