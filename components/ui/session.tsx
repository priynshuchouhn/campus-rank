'use client';
import { usePageTimer } from '@/lib/hooks/usePageTimer';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

function Session() {
  const session = useSession();
  const pathname = usePathname();
  usePageTimer(pathname,session.data?.user.id);
  return (
    <div className='sr-only'>Thanks for using Campus Rank!</div>
  )
}

export default Session
