const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export function telegramConfigured(): boolean {
    return Boolean(BOT_TOKEN && CHAT_ID);
}

// Escape text for Telegram MarkdownV2
export function escapeMarkdownV2(str: string): string {
    return str.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}

type SendResult = { ok: true } | { ok: false; error: string };

export async function sendTelegram(
    text: string,
    parseMode?: 'MarkdownV2' | 'HTML'
): Promise<SendResult> {
    if (!BOT_TOKEN || !CHAT_ID) {
        return { ok: false, error: 'Missing Telegram config' };
    }

    try {
        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text,
                ...(parseMode ? { parse_mode: parseMode } : {}),
            }),
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
            return { ok: false, error: data.description || 'Telegram failed' };
        }

        return { ok: true };
    } catch (err) {
        return { ok: false, error: 'Telegram request failed' };
    }
}
