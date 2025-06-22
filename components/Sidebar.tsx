"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldHalf,
  LayoutDashboard,
  BarChart2,
  Settings,
  Bell,
  LogOut,
  UserCircle,
  ShieldCheck,
  Zap,
  PencilLine,
  Ellipsis,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Profile", href: "", icon: UserCircle },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Vulnerabilities", href: "/vulnerabilities", icon: ShieldCheck },
  /* { name: "Attack Surface", href: "", icon: Zap }, */
  { name: "Executive Risk", href: "", icon: BarChart2 },
  { name: "Remediation Hub", href: "", icon: BarChart2 },
  { name: "Automation", href: "", icon: Zap },
];

const bottomMenuItems = [
  { name: "Notification", href: "", icon: Bell, hasBadge: true },
  { name: "Setting", href: "", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-40 md:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={toggleSidebar}
      />

      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-[#1E1F28] z-50 transform transition-transform duration-300 ease-in-out md:relative md:w-96 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full max-h-screen flex-col m-3 bg-[#1E1F28]">
          <div className="flex h-20 items-center border-2 bg-[#1D1D28] rounded-2xl border-neutral-950 px-4 mb-8 ">
            <Link
              href="/"
              className="flex flex-grow items-center gap-4 font-semibold"
            >
              <ShieldHalf className="h-16 w-6 text-sky-500" />
              <span className="text-gray-200 text-2xl">PeakCyber</span>
            </Link>
            <Ellipsis className="text-gray-200 w-5 h-5" />
          </div>
          <div className="flex-1 overflow-y-auto border-b  border-b-neutral-950 no-scrollbar">
            <nav className="grid items-start px-4 gap-6 text-sm font-medium">
              <div className="flex items-center ">
                <h2 className="px-2 py-2 text-base flex-grow font-semibold text-neutral-500 uppercase tracking-wider">
                  Menu
                </h2>
                <PencilLine
                  strokeWidth={2.5}
                  className="w-5 h-5 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                />
              </div>

              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center text-base gap-3 rounded-lg p-3 text-neutral-500 transition-all hover:bg-neutral-800 hover:text-white border-2 border-[#1E1F28]",
                    pathname === item.href &&
                      "bg-gradient-to-r from-orange-500  to-neutral-900 text-white border-2 border-neutral-950"
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t border-t-neutral-500 ">
            <nav className="grid items-start text-sm font-medium gap-1">
              {bottomMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3  rounded-lg p-3 my-3 text-base text-neutral-500  transition-all hover:bg-neutral-800 hover:text-white"
                >
                  <item.icon className="h-6 w-6" />
                  {item.name}
                  {item.hasBadge && (
                    <Badge variant="destructive" className="ml-auto">
                      12
                    </Badge>
                  )}
                </Link>
              ))}
              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="flex items-center gap-3 rounded-lg p-3 my-3 text-base text-neutral-500 transition-all hover:bg-neutral-800 hover:text-white cursor-pointer w-full mb-16"
                type="button"
              >
                <LogOut className="h-6 w-6" />
                Log Out
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
