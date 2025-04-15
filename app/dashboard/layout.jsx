"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import CreateProject from "../components/CreateProject";

export default function DashboardLayout({ children }) {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const openCreateProject = () => setShowCreateProject(true);
  const closeCreateProject = () => setShowCreateProject(false);

  return (
    <div className="flex">
      <Sidebar />
      <main
        className="flex-1 min-h-screen transition-[margin] duration-300"
        style={{ marginLeft: "var(--sidebar-width, 70px)" }}
      >
        <DashboardHeader openCreateProject={openCreateProject} />
        <div className="m-6">{children}</div>
      </main>
      {showCreateProject && <CreateProject closeModal={closeCreateProject} />}
    </div>
  );
}
