import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, plan } = await request.json();
    // plan = 'single_brief' or 'pro'

    if (!stripe) {
      return NextResponse.json({ error: 'Stripe niet geconfigureerd' }, { status: 500 });
    }

    if (!email || !plan) {
      return NextResponse.json({ error: 'Email en plan zijn vereist' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Get or create Stripe customer
    let customerId = null;

    if (supabase) {
      const { data: user } = await supabase
        .from('users')
        .select('stripe_customer_id')
        .eq('email', normalizedEmail)
        .single();

      customerId = user?.stripe_customer_id;
    }

    if (!customerId) {
      const customer = await stripe.customers.create({ email: normalizedEmail });
      customerId = customer.id;

      // Save customer ID
      if (supabase) {
        await supabase
          .from('users')
          .update({ stripe_customer_id: customerId })
          .eq('email', normalizedEmail);
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://carrio.be';

    let sessionConfig;

    if (plan === 'pro') {
      // Monthly subscription - launch price
      sessionConfig = {
        customer: customerId,
        mode: 'subscription',
        line_items: [{
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Carrio Pro',
              description: 'Onbeperkt motivatiebrieven + alle toekomstige tools',
            },
            unit_amount: 999, // €9.99 in cents
            recurring: { interval: 'month' },
          },
          quantity: 1,
        }],
        success_url: `${baseUrl}/brief?payment=success&plan=pro`,
        cancel_url: `${baseUrl}/brief?payment=cancelled`,
        metadata: { email: normalizedEmail, plan: 'pro' },
      };
    } else if (plan === 'starter') {
      // Starter pack - 3 brieven eenmalig
      sessionConfig = {
        customer: customerId,
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Carrio Starter',
              description: '3 AI-gegenereerde motivatiebrieven op maat',
            },
            unit_amount: 499, // €4.99 in cents
          },
          quantity: 1,
        }],
        success_url: `${baseUrl}/brief?payment=success&plan=starter`,
        cancel_url: `${baseUrl}/brief?payment=cancelled`,
        metadata: { email: normalizedEmail, plan: 'starter' },
      };
    } else {
      return NextResponse.json({ error: 'Ongeldig plan' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
