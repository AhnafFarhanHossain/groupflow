"use client";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import getBreadcrumbs from "@/lib/action/getBreadcrumb";

export default function DashboardHeader({ openCreateProject }) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const pageName =
    breadcrumbs.length > 0
      ? breadcrumbs[breadcrumbs.length - 1].name
      : "Dashboard";

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-100">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side with Page Name and Breadcrumbs */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-800">{pageName}</h1>
            <nav className="flex items-center gap-2 text-sm text-gray-500 border-l border-gray-200 pl-3 ml-1">
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.href} className="flex items-center gap-2">
                  {index > 0 && <span className="text-gray-400">/</span>}
                  {crumb.isLast ? (
                    <span className="text-gray-900 font-medium">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-gray-600 hover:text-green-700 transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Right side with Search and Actions */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 h-10 pl-4 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <Button
              className="bg-green-700 hover:bg-green-800 text-white gap-2"
              onClick={openCreateProject}
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
