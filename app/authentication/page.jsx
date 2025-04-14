"use client";

import SignInForm from "../components/Sign-in-Form";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Authentication = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Use replace instead of push to prevent back button from returning to auth page
      router.replace("/dashboard");
    }
  }, [status, router]);

  // During loading or right after authentication, show loading spinner
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <SignInForm />
    </div>
  );
};

export default Authentication;
