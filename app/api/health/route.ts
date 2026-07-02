import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { telegramConfigured } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

// Safe diagnostic endpoint — reports whether things are wired up correctly.
// It NEVER returns secret values, only booleans / key *type* / row counts.
export async function GET() {
    const rawKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    // Figure out what *kind* of key was pasted, without revealing it.
    let keyLooksLike: string = 'not set';
    if (rawKey.startsWith('sb_secret_')) keyLooksLike = 'secret ✅ (correct)';
    else if (rawKey.startsWith('sb_publishable_')) keyLooksLike = 'PUBLISHABLE ❌ (wrong — use the secret key)';
    else if (rawKey.startsWith('eyJ')) {
        // Legacy JWT key — decode only the role claim (not a secret).
        try {
            const payload = JSON.parse(Buffer.from(rawKey.split('.')[1], 'base64').toString());
            keyLooksLike = `legacy JWT, role="${payload.role}" ${payload.role === 'service_role' ? '✅' : '❌ (use service_role, not anon)'}`;
        } catch {
            keyLooksLike = 'legacy JWT (could not decode)';
        }
    } else if (rawKey) {
        keyLooksLike = 'unknown format ❌';
    }

    const result: Record<string, unknown> = {
        supabaseUrlSet: Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
        supabaseKeySet: Boolean(rawKey),
        keyLooksLike,
        telegramConfigured: telegramConfigured(),
    };

    const supabase = getSupabase();
    if (!supabase) {
        result.query = 'skipped — Supabase client not configured (URL or key missing)';
        return NextResponse.json(result);
    }

    try {
        const { data, error } = await supabase
            .from('known_people')
            .select('name');

        if (error) {
            result.query = { ok: false, error: error.message };
        } else {
            result.query = {
                ok: true,
                rowCount: data?.length ?? 0,
                names: data?.map((r: { name: string }) => r.name) ?? [],
            };
        }
    } catch (e) {
        result.query = { ok: false, error: e instanceof Error ? e.message : 'unknown error' };
    }

    return NextResponse.json(result);
}
