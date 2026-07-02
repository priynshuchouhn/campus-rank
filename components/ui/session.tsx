'use client';
import { usePageTimer } from '@/lib/hooks/usePageTimer';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react'

function Session() {
  if (process.env.NEXT_PUBLIC_ENABLE_SESSION_LOGGING !== 'true') {
    return null;
  }

  return <SessionLogger />;
}

function SessionLogger() {
  const session = useSession();
  const pathname = usePathname();
  usePageTimer(pathname,session.data?.user.id);
  return null;
}

export default Session
