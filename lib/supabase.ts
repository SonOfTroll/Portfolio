import { createClient, SupabaseClient } from '@supabase/supabase-js';

// The URL is not secret, so accept either name (ours or Supabase's default).
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
// Server-only SECRET key (sb_secret_... or legacy service_role). Never expose to the client.
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
