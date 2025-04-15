"use client";

import { useState } from "react";
import { useSession } from "next-auth/react"; // To get the session data (user info)
import { useRouter } from "next/navigation"; // For redirection after project creation

const CreateProject = ({ closeModal }) => {
  const { data: session } = useSession(); // Get session data
  const router = useRouter(); // For redirection
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    // Check if the user is logged in and in a group
    if (!session?.user?.id) {
      setError("You must be logged in to create a project.");
      setLoading(false);
      return;
    }

    // Here, you'd typically check if the user belongs to a group
    // Example: Make sure user has a groupId (replace with your actual logic)
    const groupId = session?.user?.groupId;
    if (!groupId) {
      setError("You need to be part of a group to create a project.");
      setLoading(false);
      return;
    }

    // Create the project in the database
    try {
      const response = await fetch("/api/createProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          description: projectDescription,
          groupId: groupId, // Get group ID from session or state
          ownerId: session.user.id, // User's ID
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      // Successfully created, redirect to the new project page
      router.push("/projects/[id]", `/projects/${response.id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 animate-in fade-in zoom-in duration-200">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Create a New Project
        </h2>
        {error && (
          <p className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 rounded text-sm text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400"
              placeholder="Enter project name"
            />
          </div>
          <div>
            <label
              htmlFor="projectDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project Description
            </label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 min-h-[100px]"
              placeholder="Describe your project"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
