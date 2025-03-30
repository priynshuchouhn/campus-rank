import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './button'
import Link from 'next/link'
import { auth } from '@/auth'
import { signOutAction } from '@/lib/actions/signout'
async function Navbar() {
    const session = await auth();
    const user = session?.user;
  return (
    <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold">CampusRank - Coding Leaderboard</h1>
    <div className="flex items-center gap-2">
      <ThemeToggle />
      {user ? (
        <form action={signOutAction}>
          <Button variant="outline">
            logout
          </Button>
        </form>
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
