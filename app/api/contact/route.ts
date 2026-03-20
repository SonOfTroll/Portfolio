import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // ← NEXT_PUBLIC_ nahi chahiye, server-only
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: Request) {
    console.log('API /contact hit!'); // ← Ye sabse pehla check

    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Missing env vars:', { BOT_TOKEN: !!BOT_TOKEN, CHAT_ID: !!CHAT_ID });
        return NextResponse.json({ success: false, error: 'Config Error' }, { status: 500 });
    }

    try {
        const { message, sender } = await req.json();
        console.log('Received payload:', { sender, messageLength: message?.length }); // ← Ye dekh body aa raha hai?

        const text = `📩 *PORTFOLIO MSG* 📩\n\n👤 ${sender}\n\n${message}`;

        console.log('Sending to Telegram...');

        const tgRes = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text,
                    parse_mode: 'Markdown',
                }),
            }
        );

        const tgData = await tgRes.json();
        console.log('Telegram response:', tgData);

        if (!tgRes.ok || !tgData.ok) {
            console.error('Telegram failed:', tgData);
            return NextResponse.json({ success: false, error: tgData.description }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}