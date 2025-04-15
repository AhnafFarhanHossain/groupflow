import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // use the service role key because you're inserting into a protected table
);

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = session.user;

  // Insert into 'profiles' table
  const { data, error } = await supabase.from("profiles").upsert([
    {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.image,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ error: "Failed to create profile" });
  }

  return res.status(200).json({ message: "Profile created", data });
}
