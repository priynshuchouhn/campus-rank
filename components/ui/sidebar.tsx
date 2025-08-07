'use client'
import { usePathname } from 'next/navigation'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Home, BookOpen, Code, User, Settings, LogOut, Notebook, Target, Info, Shield, FileText, HelpCircle, Trophy } from 'lucide-react'
import React from 'react'
import { Button } from './button'
import { SidebarNavItem } from './sidebar-nav-item'
import { signOutAction } from '@/lib/actions/signout'

function Sidebar({ user }: { user: any }) {
    const pathname = usePathname();
    const isLinkActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + '/');
    };
    return (
        <>
            {user ?
                <>
                    <nav className="mt-4 space-y-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground px-4 mb-2 ">Dashboard</p>
                            <SidebarNavItem
                                href="/dashboard"
                                icon={<Home className="h-4 w-4" />}
                                title="Home"
                                isActive={isLinkActive('/dashboard')}
                            />
                            <SidebarNavItem
                                href="/leaderboard"
                                icon={<Trophy className="h-4 w-4" />}
                                title="Leaderboard"
                                isActive={isLinkActive('/leaderboard')}
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground px-4 mb-2">Learning</p>
                            <SidebarNavItem
                                href="/roadmap"
                                icon={<BookOpen className="h-4 w-4" />}
                                title="Roadmap"
                                isActive={isLinkActive('/roadmap') && pathname === '/roadmap'}
                                // badge="New"
                            />
                            <SidebarNavItem
                                href="/roadmap/topics"
                                icon={<Notebook className="h-4 w-4" />}
                                title="Topics"
                                isActive={pathname.includes('/roadmap/topics')}
                                // badge="New"
                            />
                            <SidebarNavItem
                                href="/practice"
                                icon={<Code className="h-4 w-4" />}
                                title="Practice"
                                isActive={pathname.includes('/practice')}
                                badge="Beta"
                            />
                            <SidebarNavItem
                                href="/goals"
                                icon={<Target className="h-4 w-4" />}
                                title="Weekly Goals"
                                isActive={isLinkActive('/goals')}
                                // badge="New"
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
                            <SidebarNavItem
                                href="/reports"
                                icon={<HelpCircle className="h-4 w-4" />}
                                title="Reports"
                                isActive={isLinkActive('/reports')}
                            />
                        </div>
                    </nav>
                    <Separator className="mt-4" />
                    <div className="mt-4 ">
                        <form action={signOutAction}>
                            <Button variant="ghost" className="flex items-center justify-start gap-2 w-full text-red-500">
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Button>
                        </form>
                    </div>
                </> :
                <>
                    <nav className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground px-4 mb-2">Explore</p>
                            <SidebarNavItem
                                href="/leaderboard"
                                icon={<Trophy className="h-4 w-4" />}
                                title="Leaderboard"
                                isActive={isLinkActive('/leaderboard')}
                            />
                            <Separator className="mt-4" />
                            <p className="text-sm font-medium text-muted-foreground px-4 mb-2">Information</p>
                            <SidebarNavItem
                                href="/about-us"
                                icon={<Info className="h-4 w-4" />}
                                title="About Us"
                                isActive={isLinkActive('/about-us')}
                            />
                            <SidebarNavItem
                                href="/privacy-policy"
                                icon={<Shield className="h-4 w-4" />}
                                title="Privacy Policy"
                                isActive={isLinkActive('/privacy-policy')}
                            />
                            <SidebarNavItem
                                href="/terms-of-service"
                                icon={<FileText className="h-4 w-4" />}
                                title="Terms of Service"
                                isActive={isLinkActive('/terms-of-service')}
                            />
                            <Separator className="mt-4" />
                            <p className="text-sm font-medium text-muted-foreground px-4 mb-2">Get Started</p>
                            <SidebarNavItem
                                href="/dashboard"
                                icon={<LogOut className="h-4 w-4" />}
                                title="Login"
                                isActive={isLinkActive('/dashboard')}
                            />
                        </div>
                    </nav>
                </>
            }
        </>
    )
}

export default Sidebar
