'use client'
import { signOutAction } from '@/lib/actions/signout'
import React from 'react'
import { Button } from './button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
function NavbarItems() {
    const pathname = usePathname();
    const isNotHome = pathname !== '/' && pathname !== '/leaderboard';
    if (isNotHome) return null;
    return (
        <div className='items-center gap-2 md:flex hidden'>
            <Link href="/dashboard">
                <Button variant="outline">
                    Dashboard
                </Button>
            </Link>
            <form action={signOutAction}>
                <Button variant="outline">
                    Logout
                </Button>
            </form>
        </div>
    )
}

export default NavbarItems
