import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createBrowserClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
