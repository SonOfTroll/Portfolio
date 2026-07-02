import { NextResponse } from 'next/server';
import { sendTelegram, escapeMarkdownV2, telegramConfigured } from '@/lib/telegram';

export async function POST(req: Request) {
    if (!telegramConfigured()) {
        return NextResponse.json({ success: false, error: 'Missing Telegram config' }, { status: 500 });
    }

    try {
        const body = await req.json();
        const sender = body.sender || 'Anonymous';
        const message = body.message || '(no message)';

        const safeSender = escapeMarkdownV2(sender);
        const safeMessage = escapeMarkdownV2(message);

        const text =
            `📡 New contact from the portfolio\n\n` +
            `👤 From: ${safeSender}\n\n` +
            `💬 Message:\n${safeMessage}`;

        const result = await sendTelegram(text, 'MarkdownV2');

        if (!result.ok) {
            return NextResponse.json({ success: false, error: result.error }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
    }
}
