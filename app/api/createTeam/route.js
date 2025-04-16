import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user?.id) {
      return NextResponse.json(
        { error: "Not Authenticated. Sign In First" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const profilePicture = formData.get("profilePicture");

    if (!name) {
      return NextResponse.json(
        { error: "Team name is required" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
    );

    let profilePictureUrl = null;

    // Upload profile picture if provided
    if (profilePicture) {
      const fileExt = profilePicture.name.split(".").pop();
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("team-profiles")
        .upload(fileName, profilePicture);

      if (uploadError) {
        console.error("Profile picture upload error:", uploadError);
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        );
      }

      // Get the public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from("team-profiles").getPublicUrl(fileName);

      profilePictureUrl = publicUrl;
    }

    // First ensure the user profile exists with the UUID
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      avatar_url: session.user.image,
      updated_at:
        new Date().toISOString().split("T")[0] +
        " " +
        new Date().toTimeString().split(" ")[0],
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    // Create the team with the UUID as owner_id
    const { data, error } = await supabase
      .from("groups")
      .insert([
        {
          name,
          description,
          owner_id: session.user.id,
          profile_picture_url: profilePictureUrl,
          created_at:
            new Date().toISOString().split("T")[0] +
            " " +
            new Date().toTimeString().split(" ")[0],
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Team creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ team: data });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Unexpected server error: " + err.message },
      { status: 500 }
    );
  }
}
