import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: Request) {
    if (!BOT_TOKEN || !CHAT_ID) {
        return NextResponse.json({ success: false, error: 'Config Error' }, { status: 500 });
    }

    try {
        const { message, sender } = await req.json();
        const text = `🚨 *PORTFOLIO MSG* 🚨\n\n👤: \`${sender}\`\n💬: ${message}`;

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
