import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './button'
import Link from 'next/link'

function Navbar() {
  return (
    <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold">CampusRank - Coding Leaderboard</h1>
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <Link href="/get-started">
        <Button variant="outline">
          Login
        </Button>
      </Link>
    </div>
  </div>
  )
}

export default Navbar
