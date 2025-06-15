'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logAnalyticsEvent } from '@/utils/log';

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const path = usePathname();

  useEffect(() => {
    logAnalyticsEvent('screen_view', { screen_name: path });
  }, [path]);

  return <>{children}</>;
}
