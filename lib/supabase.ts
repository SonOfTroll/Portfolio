import { createClient, SupabaseClient } from '@supabase/supabase-js';

// The URL is not secret, so accept either name (ours or Supabase's default).
// Trim whitespace/newlines and strip any trailing slash — a trailing "/" causes
// a double-slash in the request path ("Invalid path specified in request URL").
const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '')
    .trim()
    .replace(/\/+$/, '')          // drop trailing slash(es)
    .replace(/\/rest\/v1$/, '');  // drop a mistakenly-included /rest/v1 path
// Server-only SECRET key (sb_secret_... or legacy service_role). Never expose to the client.
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

let client: SupabaseClient | null = null;

/**
 * Returns a server-side Supabase client, or null if credentials are not set.
 * Safe to call in API routes; the caller should treat null as "not configured".
 */
export function getSupabase(): SupabaseClient | null {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        return null;
    }
    if (!client) {
        client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: { persistSession: false },
        });
    }
    return client;
}
