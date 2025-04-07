import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './button'
import Link from 'next/link'
import { auth } from '@/auth'
import { signOutAction } from '@/lib/actions/signout'
import Image from 'next/image'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Menu } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from './sheet'
import Sidebar from './sidebar'
async function Navbar() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="justify-between mb-8 sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-background px-4 py-2 sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-2">
          <Separator />
          <Sidebar />
        </SheetContent>
      </Sheet>
      <Link href="/" className='flex items-center gap-2'>
        <Image src="/logo.jpg" alt="Campus Rank" className='w-16 h-16 md:w-14 md:h-14 rounded-full' width={100} height={100} />
        <h1 className="text-4xl font-bold md:block hidden">Campus Rank - Coding Leaderboard</h1>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {user ? (
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
        ) : (
          <Link href="/dashboard">
            <Button variant="outline">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
