import { authOptions } from "@/lib/auth"; // Your NextAuth options
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  console.log("SESSION", session); // Debug: log session
  if (!session || !session.user?.id) {
    return NextResponse.json(
      { error: "You must be signed in to create a project" },
      { status: 401 }
    );
  }

  const { title, description } = await req.json();

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      description,
      owner_id: session.user.id, // Use the correct user id
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }

  return NextResponse.json({ projectId: data.id });
}
