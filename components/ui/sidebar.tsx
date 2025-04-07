'use client'
import { usePathname } from 'next/navigation'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Home, BookOpen, Code, User, Settings, LogOut, Notebook, Target } from 'lucide-react'
import React from 'react'
import { Button } from './button'
import { SidebarNavItem } from './sidebar-nav-item'

function Sidebar() {
    const pathname = usePathname();
    const isLinkActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + '/');
    };
    return (
        <>
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
                        href="#"
                        icon={<BookOpen className="h-4 w-4" />}
                        title="Roadmap"
                        isActive={isLinkActive('/roadmap') && pathname === '/roadmap'}
                        badge="Coming Soon"
                    />
                    <SidebarNavItem
                        href="#"
                        icon={<Notebook className="h-4 w-4" />}
                        title="Topics"
                        isActive={pathname.includes('/roadmap/topics')}
                        badge="Coming Soon"
                    />
                    <SidebarNavItem
                        href="#"
                        icon={<Code className="h-4 w-4" />}
                        title="Practice"
                        isActive={pathname.includes('/practice')}
                        badge="Coming Soon"
                    />
                    <SidebarNavItem
                        href="#"
                        icon={<Target className="h-4 w-4" />}
                        title="Weekly Goals"
                        isActive={isLinkActive('/goals')}
                        badge="Coming Soon"
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
                        href="#"
                        icon={<Settings className="h-4 w-4" />}
                        title="Settings"
                        isActive={isLinkActive('/settings')}
                    />
                </div>
            </nav>
            <Separator className="mt-4" />
            <div className="mt-4 ">
                <Button variant="ghost" className="flex items-center justify-start gap-2 w-full text-red-500">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </Button>
            </div>
        </>
    )
}

export default Sidebar
