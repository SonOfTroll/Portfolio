import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { sendTelegram, escapeMarkdownV2 } from '@/lib/telegram';

export async function POST(req: Request) {
    let name = '';
    try {
        const body = await req.json();
        name = (body.name || '').trim();
    } catch {
        return NextResponse.json({ known: false, error: 'Bad request' }, { status: 400 });
    }

    if (!name) {
        return NextResponse.json({ known: false }, { status: 400 });
    }

    const supabase = getSupabase();

    // If Supabase isn't configured, fail open → everyone is treated as unknown
    // so the leave-a-message flow still works.
    if (!supabase) {
        return NextResponse.json({ known: false });
    }

    try {
        // Case-insensitive exact match on the stored name.
        const { data, error } = await supabase
            .from('known_people')
            .select('name, greeting')
            .ilike('name', name)
            .limit(1)
            .maybeSingle();

        if (error || !data) {
            return NextResponse.json({ known: false });
        }

        // Known contact — ping Telegram right away.
        const ping =
            `🔓 *Known contact detected*\n\n` +
            `👤 ${escapeMarkdownV2(data.name)} just opened the portfolio\\.\n` +
            `They typed: "${escapeMarkdownV2(name)}"`;

        await sendTelegram(ping, 'MarkdownV2');

        return NextResponse.json({
            known: true,
            displayName: data.name,
            greeting: data.greeting,
        });
    } catch {
        return NextResponse.json({ known: false });
    }
}
