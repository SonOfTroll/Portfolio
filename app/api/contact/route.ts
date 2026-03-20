import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Helper to escape MarkdownV2 special characters
function escapeMarkdownV2(str: string): string {
    return str
        .replace(/([_*[\]()~`>#+-=|{}.!\\])/g, '\\$1') // escape all special chars
        .replace(/\\\\/g, '\\\\'); // double-escape backslashes if needed
}

export async function POST(req: Request) {
    console.log('API /contact hit!');

    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Missing env vars:', { BOT_TOKEN: !!BOT_TOKEN, CHAT_ID: !!CHAT_ID });
        return NextResponse.json({ success: false, error: 'Config Error' }, { status: 500 });
    }

    try {
        const { message, sender } = await req.json();
        console.log('Received payload:', { sender, messageLength: message?.length });

        // Build the message with escaping
        const safeSender = escapeMarkdownV2(sender || 'Anonymous');
        const safeMessage = escapeMarkdownV2(message || '(no message)');

        const text = escapeMarkdownV2(
            `📩 *PORTFOLIO MSG* 📩\n\n` +
            `👤 ${safeSender}\n\n` +
            `${safeMessage}`
        );

        console.log('Sending to Telegram... (escaped length:', text.length, ')');

        const tgRes = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text,
                    parse_mode: 'MarkdownV2',   // ← switched to V2 + escaping
                }),
            }
        );

        const tgData = await tgRes.json();
        console.log('Telegram response:', tgData);

        if (!tgRes.ok || !tgData.ok) {
            console.error('Telegram failed:', tgData);
            return NextResponse.json(
                { success: false, error: tgData.description || 'Telegram API error' },
                { status: tgRes.status || 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}