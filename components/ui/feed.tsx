'use client';
import { Search } from 'lucide-react';
import React, { useState } from 'react'
import { Input } from './input';
import { LeaderboardTable } from './leaderboard-table';
import { User } from '@/lib/interfaces';

function Feed({users}: {users: User[]}) {
    const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <LeaderboardTable users={users} searchQuery={searchQuery} />
    </>
  )
}

export default Feed
