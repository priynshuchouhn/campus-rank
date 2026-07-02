import { useCallback, useEffect, useRef } from 'react';

const MIN_SESSION_DURATION_SECONDS = 30;

export function usePageTimer(pagePath: string, userId?: string) {
  const startTime = useRef<number>(Date.now());
  const lastReportedKey = useRef<string | null>(null);

  const reportSession = useCallback((useBeacon = false) => {
    if (!userId) return;

    const endTime = Date.now();
    const duration = Math.floor((endTime - startTime.current) / 1000); // seconds
    if (duration < MIN_SESSION_DURATION_SECONDS) return;

    const reportKey = `${pagePath}:${startTime.current}`;
    if (lastReportedKey.current === reportKey) return;
    lastReportedKey.current = reportKey;

    const payload = JSON.stringify({
      pagePath,
      startTime: startTime.current,
      endTime,
      duration,
    });

    try {
      if (useBeacon && navigator.sendBeacon) {
        navigator.sendBeacon('/api/session-logger', new Blob([payload], { type: 'application/json' }));
        return;
      }

      void fetch('/api/session-logger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      });
    } catch (err) {
      console.error('Failed to log session:', err);
    }
  }, [pagePath, userId]);

  useEffect(() => {
    // reset timer for new page
    startTime.current = Date.now();
    lastReportedKey.current = null;

    const handleBeforeUnload = () => reportSession(true);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') reportSession(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // log before pagePath changes or unmount
      reportSession();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pagePath, userId, reportSession]);
}
