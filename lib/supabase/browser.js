import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseEnv } from './env';

let browserClient;

export function createClient() {
  if (!browserClient) {
    const { url, anonKey } = getSupabaseEnv();
    browserClient = createBrowserClient(url, anonKey);
  }

  return browserClient;
}