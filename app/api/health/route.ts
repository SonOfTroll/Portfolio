import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { telegramConfigured } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

// Safe diagnostic endpoint. The Supabase URL is NOT secret (it's in every
// browser request), so we echo it to spot a malformed value. The key is only
// ever reported by *type*, never its value.
export async function GET() {
    const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const normalizedUrl = rawUrl.trim().replace(/\/+$/, '');
    const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    let keyLooksLike = 'not set';
    if (rawKey.startsWith('sb_secret_')) keyLooksLike = 'secret ✅ (correct)';
    else if (rawKey.startsWith('sb_publishable_')) keyLooksLike = 'PUBLISHABLE ❌ (wrong — use the secret key)';
    else if (rawKey.startsWith('eyJ')) {
        try {
            const payload = JSON.parse(Buffer.from(rawKey.split('.')[1], 'base64').toString());
            keyLooksLike = `legacy JWT, role="${payload.role}"`;
        } catch {
            keyLooksLike = 'legacy JWT (could not decode)';
        }
    } else if (rawKey) {
        keyLooksLike = 'unknown format ❌';
    }

    const result: Record<string, unknown> = {
        version: 'health-v2',
        supabaseUrl_asStored: rawUrl,
        supabaseUrl_normalized: normalizedUrl,
        urlHasTrailingSlash: rawUrl !== rawUrl.replace(/\/+$/, ''),
        urlLooksValid: /^https:\/\/[a-z0-9]+\.supabase\.co$/.test(normalizedUrl),
        keyLooksLike,
        keyPrefix: rawKey ? rawKey.slice(0, 10) + '…' : 'none',
        telegramConfigured: telegramConfigured(),
    };

    // Direct REST probe (bypasses supabase-js) to see the raw gateway response.
    if (normalizedUrl && rawKey) {
        try {
            const probeUrl = `${normalizedUrl}/rest/v1/known_people?select=name&limit=5`;
            const res = await fetch(probeUrl, {
                headers: { apikey: rawKey.trim(), Authorization: `Bearer ${rawKey.trim()}` },
                cache: 'no-store',
            });
            const body = await res.text();
            result.directProbe = {
                url: probeUrl,
                status: res.status,
                body: body.slice(0, 300),
            };
        } catch (e) {
            result.directProbe = { error: e instanceof Error ? e.message : 'fetch failed' };
        }
    }

    // supabase-js query
    const supabase = getSupabase();
    if (!supabase) {
        result.query = 'skipped — client not configured';
        return NextResponse.json(result);
    }
    try {
        const { data, error } = await supabase.from('known_people').select('name');
        result.query = error
            ? { ok: false, error: error.message }
            : { ok: true, rowCount: data?.length ?? 0, names: data?.map((r: { name: string }) => r.name) ?? [] };
    } catch (e) {
        result.query = { ok: false, error: e instanceof Error ? e.message : 'unknown error' };
    }

    return NextResponse.json(result);
}
