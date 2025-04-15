import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const userId = session.user.id;

  // Check if the user belongs to a team
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("owner_id", userId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // If data is returned, user is part of a team
  const isInTeam = data.length > 0;

  return res.status(200).json({ isInTeam });
}
