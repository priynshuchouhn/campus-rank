"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronDown,
  FileCode,
  BookOpen,
  FolderTree,
  HelpCircle,
  Mail,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import { signOutAction } from "@/lib/actions/signout";
const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Sections",
    href: "/admin/sections",
    icon: FolderTree,
  },
  {
    title: "Topics",
    href: "/admin/topics",
    icon: BookOpen,
  },
  {
    title: "Questions",
    href: "/admin/questions",
    icon: FileCode,
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: BookOpen,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: HelpCircle,
  },
  {
    title: "Emails",
    href: "/admin/emails",
    icon: Mail,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } border-r bg-card md:translate-x-0`}
        style={{ width: sidebarOpen ? "240px" : "0" }}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-14 items-center border-b px-3">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Image src="/logo.jpg" alt="logo" className="rounded-full" width={32} height={32} />
              <span>Campus Rank</span>
            </Link>
          </div>

          {/* Sidebar Content */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex min-h-screen flex-col ${sidebarOpen ? "md:ml-60" : ""
          } transition-margin duration-300`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-background">
          <div className="flex h-14 items-center gap-4 px-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Separator orientation="vertical" className="h-8" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                  >
                    <Image
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                      alt="Admin"
                      className="h-6 w-6 rounded-full"
                      width={24}
                      height={24}
                    />
                    <span>Admin</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={signOutAction}>
                    <button type="submit" className="flex items-center gap-2">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                    {/* <form action={signOutAction}>
                    </form> */}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t py-4 px-4">
          <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2025 Campus Rank. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}