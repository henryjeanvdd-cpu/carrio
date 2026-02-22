import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Ongeldig emailadres' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // If Supabase is not configured, allow usage (dev mode)
    if (!supabase) {
      return NextResponse.json({
        email: normalizedEmail,
        canGenerate: true,
        reason: 'dev_mode',
        briefsUsed: 0,
        isPro: false,
      });
    }

    // Check if user exists
    let { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', normalizedEmail)
      .single();

    // If user doesn't exist, create them
    if (!user) {
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          email: normalizedEmail,
          briefs_used: 0,
          is_pro: false,
          stripe_customer_id: null,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return NextResponse.json({ error: 'Database fout' }, { status: 500 });
      }

      user = newUser;
    }

    // Determine if they can generate
    const canGenerate = user.is_pro || user.briefs_used < 1 || user.paid_briefs > 0;

    let reason = 'free';
    if (user.is_pro) reason = 'pro';
    else if (user.briefs_used >= 1 && user.paid_briefs > 0) reason = 'paid_brief';
    else if (user.briefs_used >= 1) reason = 'limit_reached';

    return NextResponse.json({
      email: normalizedEmail,
      canGenerate,
      reason,
      briefsUsed: user.briefs_used || 0,
      paidBriefs: user.paid_briefs || 0,
      isPro: user.is_pro || false,
    });
  } catch (err) {
    console.error('Check usage error:', err);
    return NextResponse.json({ error: 'Server fout' }, { status: 500 });
  }
}
