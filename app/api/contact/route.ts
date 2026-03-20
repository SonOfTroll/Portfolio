import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Proper MarkdownV2 escape function
function escapeMarkdownV2(str: string): string {
    return str.replace(/([_*[\]()~`>#+-=|{}.!\\])/g, '\\$1');
}

export async function POST(req: Request) {
    console.log('API /contact hit!');

    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Missing env vars');
        return NextResponse.json({ success: false, error: 'Missing Telegram config' }, { status: 500 });
    }

    try {
        const body = await req.json();
        const sender = body.sender || 'Anonymous';
        const message = body.message || '(no message)';

        console.log('Received:', { sender, messageLength: message.length });

        // Escape everything safely
        const safeSender = escapeMarkdownV2(sender);
        const safeMessage = escapeMarkdownV2(message);

        // Build clean Telegram message
        const text =
            `📩 *PORTFOLIO MSG* 📩\n\n` +
            `👤 ${safeSender}\n\n` +
            `${safeMessage}`;

        const tgRes = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text,
                    parse_mode: 'MarkdownV2',
                }),
            }
        );

        const tgData = await tgRes.json();

        if (!tgRes.ok || !tgData.ok) {
            console.error('Telegram error:', tgData);
            return NextResponse.json(
                { success: false, error: tgData.description || 'Telegram failed' },
                { status: 500 }
            );
        }

        console.log('Sent successfully');
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
    }
}