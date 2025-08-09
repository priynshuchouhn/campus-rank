'use client'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Button } from './button'
import { SidebarNavItem } from './sidebar-nav-item'
import { signOutAction } from '@/lib/actions/signout'
import { SheetClose } from '@/components/ui/sheet'
import { LogOut } from 'lucide-react'
import { authMenuItems, guestMenuItems } from '@/lib/data'

function Sidebar({ user, withSheetClose=false }: { user: any, withSheetClose?: boolean }) {
    const pathname = usePathname()
    const isLinkActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

    const menus = user ? authMenuItems : guestMenuItems

    return (
        <>
            <nav className="mt-4 space-y-4">
                {menus.map((section, i) => (
                    <div key={i} className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground px-4 mb-2">{section.section}</p>
                        {section.items.map((item) => (
                            withSheetClose ?
                                <SheetClose asChild key={item.href}>
                                    <SidebarNavItem
                                        href={item.href}
                                        icon={<item.icon className="h-4 w-4" />}
                                        title={item.title}
                                        isActive={isLinkActive(item.href, item.exact)}
                                        badge={item.badge}
                                    />
                                </SheetClose> :
                                <SidebarNavItem
                                    key={item.href}
                                    href={item.href}
                                    icon={<item.icon className="h-4 w-4" />}
                                    title={item.title}
                                    isActive={isLinkActive(item.href, item.exact)}
                                    badge={item.badge}
                                />
                        ))}
                    </div>
                ))}
            </nav>

            {user && (
                <>
                    <Separator className="mt-4" />
                    <div className="mt-4">
                        <form action={signOutAction}>
                           { withSheetClose ?
                            <SheetClose asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center justify-start gap-2 w-full text-red-500"
                                    type="submit"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </Button>
                            </SheetClose> :
                            <Button
                                variant="ghost"
                                className="flex items-center justify-start gap-2 w-full text-red-500"
                                type="submit"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Button>}
                        </form>
                    </div>
                </>
            )}
        </>
    )
}

export default Sidebar
