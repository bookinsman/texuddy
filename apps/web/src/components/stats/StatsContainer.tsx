'use client';

import React, { useState, useMemo } from 'react';
import { CategoryBreakdown } from './CategoryBreakdown';
import { InsightCard } from './InsightCard';
import { useStats } from '@/hooks/useStats';

interface DailyStats {
  date: string;
  helped: number;
  wordsRetyped: number;
}

interface StatsContainerProps {
  dailyStats: DailyStats[];
}

export function StatsContainer({ dailyStats }: StatsContainerProps) {
  const { stats, session, categoryStats, insights } = useStats();
  const [viewMode, setViewMode] = useState<'2weeks' | 'monthly'>('2weeks');

  const twoWeeksStats = useMemo(() => {
    const today = new Date();
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(today.getDate() - 13);
    twoWeeksAgo.setHours(0, 0, 0, 0);

    const weekData: DailyStats[] = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(twoWeeksAgo);
      date.setDate(twoWeeksAgo.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const existing = dailyStats.find(s => s.date === dateStr);
      weekData.push(existing || { date: dateStr, helped: 0, wordsRetyped: 0 });
    }
    return weekData;
  }, [dailyStats]);

  const monthlyStats = useMemo(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const monthData: DailyStats[] = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(thirtyDaysAgo.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const existing = dailyStats.find(s => s.date === dateStr);
      monthData.push(existing || { date: dateStr, helped: 0, wordsRetyped: 0 });
    }
    return monthData;
  }, [dailyStats]);

  const currentStats = viewMode === '2weeks' ? twoWeeksStats : monthlyStats;
  const maxHelped = Math.max(...currentStats.map(s => s.helped), 1);
  const maxWords = Math.max(...currentStats.map(s => s.wordsRetyped), 1);
  const maxMinutes = Math.max(...currentStats.map(s => Math.round(s.helped * 3)), 1);

  const getDayLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  const getBarHeight = (value: number, max: number) => {
    return max > 0 ? Math.max((value / max) * 100, 5) : 5;
  };

  const getYAxisLabels = (max: number) => {
    const labels = [];
    const steps = 4;
    for (let i = steps; i >= 0; i--) {
      const value = Math.ceil((max / steps) * i);
      labels.push(value);
    }
    return labels;
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatAvgTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const totalHelped = dailyStats.reduce((sum, day) => sum + day.helped, 0);
  const totalWords = dailyStats.reduce((sum, day) => sum + day.wordsRetyped, 0);
  const totalSkipped = stats?.totalSkipped || 0;
  const helpRate = (totalHelped + totalSkipped) > 0
    ? Math.round((totalHelped / (totalHelped + totalSkipped)) * 100)
    : 0;

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-2">
      {session && session.emailsCompleted > 0 && (
          <div className="bg-gray-50 dark:bg-dark-100/50 rounded-lg p-4 border border-gray-200 dark:border-dark-200 transition-colors duration-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Today's Session</h3>
            {session.streakActive && (
                <span className="text-xs font-medium text-red-600 dark:text-red-400">🔥 Streak</span>
            )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Emails</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{session.emailsCompleted}</div>
            </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Time</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{formatTime(session.timeSpent)}</div>
              </div>
            {session.avgResponseTime > 0 && (
                <div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{formatAvgTime(session.avgResponseTime)}</div>
              </div>
            )}
          </div>
        </div>
      )}

        <div className="bg-white dark:bg-dark-50 rounded-lg p-4 border border-gray-200 dark:border-dark-100 transition-colors duration-500">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Scenarios finished</span>
              <span className="font-semibold text-gray-900 dark:text-white">{totalHelped}</span>
          </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Words retyped</span>
              <span className="font-semibold text-gray-900 dark:text-white">{totalWords.toLocaleString()}</span>
          </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Time spent</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatTime(Math.round(totalHelped * 3))}</span>
          </div>
        </div>
      </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">Progress</h2>
          <div className="flex gap-1 bg-gray-100 dark:bg-dark-100 p-0.5 rounded transition-colors duration-500">
          <button
            onClick={() => setViewMode('2weeks')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              viewMode === '2weeks'
                  ? 'bg-white dark:bg-dark-200 text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
              2 Weeks
          </button>
          <button
            onClick={() => setViewMode('monthly')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              viewMode === 'monthly'
                  ? 'bg-white dark:bg-dark-200 text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
              Monthly
          </button>
        </div>
      </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg p-4 transition-colors duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Minutes spent</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">
              {currentStats.reduce((sum, s) => sum + Math.round(s.helped * 3), 0)} total
            </div>
          </div>
            <div className="flex gap-3 items-end">
              <div className="flex flex-col justify-between h-40 pr-2 border-r border-gray-200 dark:border-dark-200">
              {getYAxisLabels(maxMinutes).map((label, idx) => (
                  <span key={idx} className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
              ))}
            </div>
              <div className={`flex-1 flex ${viewMode === '2weeks' ? 'gap-2' : 'gap-1'} items-end h-40`}>
              {currentStats.map((stat) => {
                const minutes = Math.round(stat.helped * 3);
                const barHeight = getBarHeight(minutes, maxMinutes);
                const isToday = stat.date === new Date().toISOString().split('T')[0];
                return (
                  <div key={stat.date} className="flex-1 flex flex-col items-center h-full">
                    <div className="relative w-full h-full flex flex-col justify-end pb-1">
                      <div
                          className={`w-full rounded-t transition-all ${
                          minutes > 0
                              ? 'bg-gray-800 dark:bg-white'
                              : 'bg-gray-200 dark:bg-dark-200'
                          } ${isToday ? 'ring-1 ring-gray-400 dark:ring-white/50' : ''}`}
                          style={{ height: `${barHeight}%`, minHeight: minutes > 0 ? '8px' : '2px' }}
                          title={`${minutes}m${isToday ? ' (Today)' : ''}`}
                      >
                        {minutes > 0 && (
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {minutes}
                          </div>
                        )}
                      </div>
                    </div>
                      <div className={`text-xs text-gray-600 dark:text-gray-400 mt-2 ${isToday ? 'font-semibold' : ''}`}>
                      {viewMode === '2weeks' ? getDayLabel(stat.date) : getDateLabel(stat.date)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

          <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg p-4 transition-colors duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Words Typed</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">
              {currentStats.reduce((sum, s) => sum + s.wordsRetyped, 0)} total
            </div>
          </div>
            <div className="flex gap-3 items-end">
              <div className="flex flex-col justify-between h-40 pr-2 border-r border-gray-200 dark:border-dark-200">
              {getYAxisLabels(maxWords).map((label, idx) => (
                  <span key={idx} className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
              ))}
            </div>
              <div className={`flex-1 flex ${viewMode === '2weeks' ? 'gap-2' : 'gap-1'} items-end h-40`}>
              {currentStats.map((stat) => {
                const barHeight = getBarHeight(stat.wordsRetyped, maxWords);
                const isToday = stat.date === new Date().toISOString().split('T')[0];
                return (
                  <div key={stat.date} className="flex-1 flex flex-col items-center h-full">
                    <div className="relative w-full h-full flex flex-col justify-end pb-1">
                      <div
                          className={`w-full rounded-t transition-all ${
                          stat.wordsRetyped > 0
                              ? 'bg-gray-800 dark:bg-white'
                              : 'bg-gray-200 dark:bg-dark-200'
                          } ${isToday ? 'ring-1 ring-gray-400 dark:ring-white/50' : ''}`}
                          style={{ height: `${barHeight}%`, minHeight: stat.wordsRetyped > 0 ? '8px' : '2px' }}
                          title={`${stat.wordsRetyped}${isToday ? ' (Today)' : ''}`}
                      >
                        {stat.wordsRetyped > 0 && (
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {stat.wordsRetyped}
                          </div>
                        )}
                      </div>
                    </div>
                      <div className={`text-xs text-gray-600 dark:text-gray-400 mt-2 ${isToday ? 'font-semibold' : ''}`}>
                      {viewMode === '2weeks' ? getDayLabel(stat.date) : getDateLabel(stat.date)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {categoryStats && categoryStats.length > 0 && (
        <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Categories</h3>
          <CategoryBreakdown categories={categoryStats} />
        </div>
      )}

      {insights && insights.length > 0 && (
        <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Insights</h3>
            <div className="space-y-2">
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
