'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CategoryStat } from '@/components/stats/CategoryBreakdown';
import type { Insight } from '@/components/stats/InsightCard';

interface Stats {
  totalCompleted: number;
  totalHelped: number;
  totalSkipped: number;
  totalWordsTyped: number;
  avgResponseTime: number;
}

interface Session {
  emailsCompleted: number;
  timeSpent: number; // in minutes
  avgResponseTime: number; // in seconds
  streakActive: boolean;
}

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/stats');
      // const data = await response.json();
      // setStats(data.stats);
      // setSession(data.session);
      // setCategoryStats(data.categoryStats);
      // setInsights(data.insights);

      // Mock data for now
      setStats({
        totalCompleted: 0,
        totalHelped: 0,
        totalSkipped: 0,
        totalWordsTyped: 0,
        avgResponseTime: 0,
      });
      setSession({
        emailsCompleted: 0,
        timeSpent: 0,
        avgResponseTime: 0,
        streakActive: false,
      });
      setCategoryStats([]);
      setInsights([]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch stats'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    session,
    categoryStats,
    insights,
    isLoading,
    error,
    refetch: fetchStats,
  };
}
