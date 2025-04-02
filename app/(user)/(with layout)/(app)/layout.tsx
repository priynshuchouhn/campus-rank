"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Home,
    BookOpen,
    Code,
    Settings,
    User,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Bell,
    Target,
    Notebook,
    Locate
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarNavItemProps {
    href: string;
    icon: React.ReactNode;
    title: string;
    isActive?: boolean;
}

function SidebarNavItem({ href, icon, title, isActive }: SidebarNavItemProps) {
    return (
        <Link href={href} passHref>
            <Button
                variant="ghost"
                className={cn(
                    "flex items-center justify-start gap-2 w-full h-10 px-4 mb-1",
                    isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"
                )}
            >
                {icon}
                <span>{title}</span>
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
            </Button>
        </Link>
    );
}

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isLinkActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + '/');
    };

    return (
        <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r bg-card">
                <Separator />
                <ScrollArea className="flex-1 p-4">
                    <nav className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground px-4 mb-2">Dashboard</p>
                            <SidebarNavItem
                                href="/dashboard"
                                icon={<Home className="h-4 w-4" />}
                                title="Home"
                                isActive={isLinkActive('/dashboard')}
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground px-4 mb-2">Learning</p>
                            <SidebarNavItem
                                href="/roadmap"
                                icon={<Locate className="h-4 w-4" />}
                                title="Roadmap"
                                isActive={isLinkActive('/roadmap') && pathname === '/roadmap'}
                            />
                            <SidebarNavItem
                                href="/roadmap/topics"
                                icon={<Notebook className="h-4 w-4" />}
                                title="Topics"
                                isActive={pathname.includes('/roadmap/topics')}
                            />
                            <SidebarNavItem
                                href="/practice"
                                icon={<Code className="h-4 w-4" />}
                                title="Practice"
                                isActive={pathname.includes('/practice')}
                            />
                            <SidebarNavItem
                                href="/goals"
                                icon={<Target className="h-4 w-4" />}
                                title="Weekly Goals"
                                isActive={isLinkActive('/goals')}
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground px-4 mb-2">Account</p>
                            <SidebarNavItem
                                href="/profile"
                                icon={<User className="h-4 w-4" />}
                                title="Profile"
                                isActive={isLinkActive('/profile')}
                            />
                            <SidebarNavItem
                                href="/settings"
                                icon={<Settings className="h-4 w-4" />}
                                title="Settings"
                                isActive={isLinkActive('/settings')}
                            />
                        </div>
                    </nav>
                    <Separator />
                    <div className="">
                        <Button variant="ghost" className="flex items-center justify-start gap-2 w-full text-red-500">
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72">
                            <div className="flex items-center gap-2 mb-6">
                                <Link href="/" className="flex items-center gap-2">
                                    <span className="font-bold text-xl">CampusRank</span>
                                </Link>
                            </div>
                            <Separator />
                            <nav className="mt-4 space-y-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground px-4 mb-2">Dashboard</p>
                                    <SidebarNavItem
                                        href="/dashboard"
                                        icon={<Home className="h-4 w-4" />}
                                        title="Home"
                                        isActive={isLinkActive('/dashboard')}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground px-4 mb-2">Learning</p>
                                    <SidebarNavItem
                                        href="/roadmap"
                                        icon={<BookOpen className="h-4 w-4" />}
                                        title="Roadmap"
                                        isActive={isLinkActive('/roadmap') && pathname === '/roadmap'}
                                    />
                                    <SidebarNavItem
                                        href="/roadmap/topics"
                                        icon={<BookOpen className="h-4 w-4" />}
                                        title="Topics"
                                        isActive={pathname.includes('/roadmap/topics')}
                                    />
                                    <SidebarNavItem
                                        href="/practice"
                                        icon={<Code className="h-4 w-4" />}
                                        title="Practice"
                                        isActive={pathname.includes('/practice')}
                                    />
                                    <SidebarNavItem
                                        href="/goals"
                                        icon={<Code className="h-4 w-4" />}
                                        title="Weekly Goals"
                                        isActive={isLinkActive('/goals')}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground px-4 mb-2">Account</p>
                                    <SidebarNavItem
                                        href="/profile"
                                        icon={<User className="h-4 w-4" />}
                                        title="Profile"
                                        isActive={isLinkActive('/profile')}
                                    />
                                    <SidebarNavItem
                                        href="/settings"
                                        icon={<Settings className="h-4 w-4" />}
                                        title="Settings"
                                        isActive={isLinkActive('/settings')}
                                    />
                                </div>
                            </nav>
                            <Separator className="mt-4" />
                            <div className="mt-4">
                                <Button variant="ghost" className="flex items-center justify-start gap-2 w-full">
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="flex-1 flex justify-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="font-bold text-lg">CampusRank</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
} 