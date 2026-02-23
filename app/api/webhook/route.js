import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    if (!stripe || !supabase) {
      return NextResponse.json({ error: 'Not configured' }, { status: 500 });
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      // Single brief payment completed
      case 'checkout.session.completed': {
        const session = event.data.object;
        const email = session.metadata?.email;
        const plan = session.metadata?.plan;

        if (!email) break;

        if (plan === 'pro') {
          // Activate Pro subscription
          await supabase
            .from('users')
            .update({
              is_pro: true,
              pro_since: new Date().toISOString(),
              stripe_subscription_id: session.subscription,
            })
            .eq('email', email);
        } else if (plan === 'starter') {
          // Add 3 paid brief credits
          const { data: user } = await supabase
            .from('users')
            .select('paid_briefs')
            .eq('email', email)
            .single();

          await supabase
            .from('users')
            .update({ paid_briefs: (user?.paid_briefs || 0) + 3 })
            .eq('email', email);
        } else if (plan === 'single_brief') {
          // Legacy: Add 1 paid brief credit
          const { data: user } = await supabase
            .from('users')
            .select('paid_briefs')
            .eq('email', email)
            .single();

          await supabase
            .from('users')
            .update({ paid_briefs: (user?.paid_briefs || 0) + 1 })
            .eq('email', email);
        }
        break;
      }

      // Subscription cancelled or expired
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        await supabase
          .from('users')
          .update({
            is_pro: false,
            stripe_subscription_id: null,
          })
          .eq('stripe_customer_id', customerId);
        break;
      }

      // Subscription payment failed
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        // Optionally: send warning email, or deactivate after X failures
        console.warn(`Payment failed for customer ${customerId}`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}

// App Router automatically handles raw body for route handlers
export const dynamic = 'force-dynamic';
