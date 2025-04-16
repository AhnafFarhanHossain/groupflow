"use server";

// app/dashboard/teams/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { Users } from "lucide-react";

export default async function TeamsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Please log in</p>;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  );

  // Fetch the user's teams with profiles information
  const { data: teams, error: teamError } = await supabase
    .from("groups")
    .select(
      `
      *,
      profiles:owner_id (
        name,
        avatar_url
      )
    `
    )
    .eq("owner_id", session.user.id);

  if (teamError) {
    console.error("Team loading error:", teamError);
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Error loading teams
        </h1>
        <p>{teamError.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Your Teams</h1>
        <p className="text-gray-600 mt-2">
          Manage and collaborate with your teams
        </p>
      </div>

      {!teams || teams.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No teams found
          </h3>
          <p className="text-gray-600">
            Create your first team to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-green-200 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {team.profile_picture_url ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-100 flex-shrink-0">
                    <Image
                      src={team.profile_picture_url}
                      alt={`${team.name}'s profile`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {team.name}
                  </h2>
                  <div className="mt-1 text-sm text-gray-500">
                    Created {new Date(team.created_at).toLocaleDateString()}
                  </div>
                  {team.description && (
                    <p className="mt-2 text-sm text-gray-600">
                      {team.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
