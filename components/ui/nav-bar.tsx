import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './button'
import Link from 'next/link'
import { auth } from '@/auth'
import { signOutAction } from '@/lib/actions/signout'
import Image from 'next/image'
async function Navbar() {
    const session = await auth();
    const user = session?.user;
  return (
    <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold md:block hidden">Campus Rank - Coding Leaderboard</h1>
    <Image src="/logo.jpg" alt="Campus Rank" className='md:hidden w-16 h-16 rounded-full' width={100} height={100} />
    <div className="flex items-center gap-2">
      <ThemeToggle />
      {user ? (
        <>
        <Link href="/profile">
        <Button variant="outline">
           My Profile
          </Button>
        </Link>
        <form action={signOutAction}>
          <Button variant="outline">
            logout
          </Button>
        </form>
        </>
      ) : (
        <Link href="/profile">
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
