import { useEffect, useRef } from 'react';

export function usePageTimer(pagePath: string, userId?: string) {
  const startTime = useRef<number>(Date.now());

  const reportSession = async () => {
    if (!userId) return;

    const endTime = Date.now();
    const duration = Math.floor((endTime - startTime.current) / 1000); // seconds

    try {
      await fetch('/api/session-logger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          pagePath,
          startTime: startTime.current,
          endTime,
          duration,
        }),
      });
    } catch (err) {
      console.error('Failed to log session:', err);
    }
  };

  useEffect(() => {
    // reset timer for new page
    startTime.current = Date.now();

    const handleBeforeUnload = () => reportSession();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') reportSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // log before pagePath changes or unmount
      reportSession();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pagePath, userId]);
}
