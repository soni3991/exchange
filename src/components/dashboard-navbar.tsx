"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  DollarSign,
  MessageCircle,
  History,
  Settings,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-900 py-4 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold flex items-center"
          >
            <DollarSign className="h-6 w-6 text-yellow-400 mr-2" />
            <span>AnonyExchange</span>
          </Link>
          <div className="hidden md:flex items-center space-x-1 ml-6">
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/dashboard") && !isActive("/dashboard/exchange") ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
            >
              Overview
            </Link>
            <Link
              href="/dashboard/exchange"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/dashboard/exchange") ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
            >
              Exchange
            </Link>
            <Link
              href="/dashboard/messages"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/dashboard/messages") ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
            >
              Messages
            </Link>
            <Link
              href="/dashboard/history"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/dashboard/history") ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
            >
              History
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-300 hidden md:block">
            <span className="text-xs">Device ID:</span> d8f7a3b1e9c2
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-gray-800 text-white border-gray-700"
            >
              <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
