import GitHubProvider from "next-auth/providers/github";
import crypto from "crypto";

function generateUUID(id) {
  // Use a fixed namespace UUID (version 5)
  const namespace = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  return crypto
    .createHash("sha1")
    .update(namespace + id)
    .digest("hex")
    .slice(0, 32)
    .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Convert GitHub's numeric ID to UUID format
      session.user.id = generateUUID(token.sub);
      session.user.originalId = token.sub; // Keep original ID if needed
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
