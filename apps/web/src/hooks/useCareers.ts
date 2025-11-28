'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CareerMatch } from '@/types/career';
import type { Insight } from '@/components/stats/InsightCard';

interface CareerReport {
  matches: CareerMatch[];
  insights: string[];
  totalEmailsAnalyzed: number;
  generatedAt: string;
}

export function useCareers() {
  const [report, setReport] = useState<CareerReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCareers = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/careers');
      // const data = await response.json();
      // setReport(data.report);

      // Mock data for now
      setReport({
        matches: [],
        insights: [],
        totalEmailsAnalyzed: 0,
        generatedAt: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch career report'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  return {
    report,
    isLoading,
    error,
    refetch: fetchCareers,
  };
}
