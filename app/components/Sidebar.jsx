"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  CheckSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Teams",
      href: "/dashboard/teams",
      icon: Users,
    },
    {
      name: "Schedule",
      href: "/dashboard/schedule",
      icon: Calendar,
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: CheckSquare,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <aside 
      className="group fixed left-0 top-0 h-screen bg-white transition-[width] duration-300 ease-in-out z-40 border-r border-gray-200"
      style={{ width: 'var(--sidebar-width, 70px)' }}
      onMouseEnter={() => document.documentElement.style.setProperty('--sidebar-width', '240px')}
      onMouseLeave={() => document.documentElement.style.setProperty('--sidebar-width', '70px')}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-16 flex items-center px-3 border-b border-gray-100">
          <Link href="/dashboard" className="w-10 h-10">
            <Image
              src="/GroupFlow-icon.png"
              alt="GroupFlow"
              width={40}
              height={40}
              className="rounded-lg w-10"
              priority
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-2">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 
                      ${
                        isActive
                          ? "text-green-700 bg-green-50"
                          : "text-gray-600 hover:text-green-700 hover:bg-gray-50"
                      }`}
                  >
                    <link.icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 p-2">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="font-medium whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-0 group-hover:opacity-100">
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}