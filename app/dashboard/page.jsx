"use client";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const session = useSession();

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-emerald-50/30 to-green-50/20 rounded-xl p-6 border border-emerald-100/20">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
            Welcome back, {session.data?.user?.name}
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-gray-600">
            Ready to collaborate? Your workspace is up to date and waiting for
            you.
          </p>
        </div>
      </div>
      {/* Analytics Section */}
      <div className="mt-4 px-6">
        <h3 className="font-bold text-gray-700">Latest Analytics</h3>
        <div className="grid grid-cols-3 mt-6">
          <div className="p-4 bg-gray-100 border border-gray-200 rounded-sm">
            Current Project:
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
