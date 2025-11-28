'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@texuddy/ui';

interface DailyStats {
  date: string;
  helped: number;
  wordsRetyped: number;
  points: number;
}

interface StatsProps {
  stats: DailyStats[];
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
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
      const existing = stats.find(s => s.date === dateStr);
      weekData.push(existing || { date: dateStr, helped: 0, wordsRetyped: 0, points: 0 });
    }
    return weekData;
  }, [stats]);

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
      const existing = stats.find(s => s.date === dateStr);
      monthData.push(existing || { date: dateStr, helped: 0, wordsRetyped: 0, points: 0 });
    }
    return monthData;
  }, [stats]);

  const currentStats = viewMode === '2weeks' ? twoWeeksStats : monthlyStats;
  const maxHelped = Math.max(...currentStats.map(s => s.helped), 1);
  const maxWords = Math.max(...currentStats.map(s => s.wordsRetyped), 1);
  const maxPoints = Math.max(...currentStats.map(s => s.points), 1);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Progress</h2>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('2weeks')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
              viewMode === '2weeks'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            2 Weeks
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
              viewMode === 'monthly'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="p-5 sm:p-7 bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="text-2xl">👥</span>
              <span>Scenarios finished</span>
            </h3>
            <div className="text-xs text-gray-500 font-medium">
              {currentStats.reduce((sum, s) => sum + s.helped, 0)} total
            </div>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex flex-col justify-between h-44 sm:h-52 pr-3 border-r-2 border-purple-200">
              {getYAxisLabels(maxHelped).map((label, idx) => (
                <span key={idx} className="text-xs sm:text-sm text-gray-600 font-bold">
                  {label}
                </span>
              ))}
            </div>
            <div className={`flex-1 flex ${viewMode === '2weeks' ? 'gap-2' : 'gap-1'} items-end h-44 sm:h-52`}>
              {currentStats.map((stat, idx) => {
                const barHeight = getBarHeight(stat.helped, maxHelped);
                const isToday = stat.date === new Date().toISOString().split('T')[0];
                return (
                  <div key={stat.date} className="flex-1 flex flex-col items-center h-full group">
                    <div className="relative w-full h-full flex flex-col justify-end pb-1">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          stat.helped > 0 
                            ? 'bg-gradient-to-t from-purple-700 via-purple-600 to-purple-500 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer' 
                            : 'bg-gray-200 opacity-40'
                        } ${isToday ? 'ring-2 ring-purple-400 ring-offset-2' : ''}`}
                        style={{ 
                          height: `${barHeight}%`,
                          minHeight: stat.helped > 0 ? '10px' : '3px'
                        }}
                        title={`${stat.helped} helped${isToday ? ' (Today)' : ''}`}
                      >
                        {stat.helped > 0 && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-800 whitespace-nowrap bg-white px-1.5 py-0.5 rounded shadow-sm">
                            {stat.helped}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`text-xs sm:text-sm text-gray-700 font-semibold mt-3 text-center ${isToday ? 'text-purple-600 font-bold' : ''}`}>
                      {viewMode === '2weeks' ? getDayLabel(stat.date) : getDateLabel(stat.date)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-7 bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="text-2xl">✍️</span>
              <span>Words Retyped</span>
            </h3>
            <div className="text-xs text-gray-500 font-medium">
              {currentStats.reduce((sum, s) => sum + s.wordsRetyped, 0)} total
            </div>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex flex-col justify-between h-44 sm:h-52 pr-3 border-r-2 border-blue-200">
              {getYAxisLabels(maxWords).map((label, idx) => (
                <span key={idx} className="text-xs sm:text-sm text-gray-600 font-bold">
                  {label}
                </span>
              ))}
            </div>
            <div className={`flex-1 flex ${viewMode === '2weeks' ? 'gap-2' : 'gap-1'} items-end h-44 sm:h-52`}>
              {currentStats.map((stat, idx) => {
                const barHeight = getBarHeight(stat.wordsRetyped, maxWords);
                const isToday = stat.date === new Date().toISOString().split('T')[0];
                return (
                  <div key={stat.date} className="flex-1 flex flex-col items-center h-full group">
                    <div className="relative w-full h-full flex flex-col justify-end pb-1">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          stat.wordsRetyped > 0 
                            ? 'bg-gradient-to-t from-blue-700 via-blue-600 to-blue-500 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer' 
                            : 'bg-gray-200 opacity-40'
                        } ${isToday ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
                        style={{ 
                          height: `${barHeight}%`,
                          minHeight: stat.wordsRetyped > 0 ? '10px' : '3px'
                        }}
                        title={`${stat.wordsRetyped} words${isToday ? ' (Today)' : ''}`}
                      >
                        {stat.wordsRetyped > 0 && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-800 whitespace-nowrap bg-white px-1.5 py-0.5 rounded shadow-sm">
                            {stat.wordsRetyped}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`text-xs sm:text-sm text-gray-700 font-semibold mt-3 text-center ${isToday ? 'text-blue-600 font-bold' : ''}`}>
                      {viewMode === '2weeks' ? getDayLabel(stat.date) : getDateLabel(stat.date)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-7 col-span-1 sm:col-span-2 bg-gradient-to-br from-white to-yellow-50/30 border border-yellow-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="text-2xl">⭐</span>
              <span>Points</span>
            </h3>
            <div className="text-xs text-gray-500 font-medium">
              {currentStats.reduce((sum, s) => sum + s.points, 0)} total
            </div>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex flex-col justify-between h-44 sm:h-52 pr-3 border-r-2 border-yellow-200">
              {getYAxisLabels(maxPoints).map((label, idx) => (
                <span key={idx} className="text-xs sm:text-sm text-gray-600 font-bold">
                  {label}
                </span>
              ))}
            </div>
            <div className={`flex-1 flex ${viewMode === '2weeks' ? 'gap-2' : 'gap-1'} items-end h-44 sm:h-52`}>
              {currentStats.map((stat, idx) => {
                const barHeight = getBarHeight(stat.points, maxPoints);
                const isToday = stat.date === new Date().toISOString().split('T')[0];
                return (
                  <div key={stat.date} className="flex-1 flex flex-col items-center h-full group">
                    <div className="relative w-full h-full flex flex-col justify-end pb-1">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          stat.points > 0 
                            ? 'bg-gradient-to-t from-yellow-600 via-yellow-500 to-yellow-400 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer' 
                            : 'bg-gray-200 opacity-40'
                        } ${isToday ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}`}
                        style={{ 
                          height: `${barHeight}%`,
                          minHeight: stat.points > 0 ? '10px' : '3px'
                        }}
                        title={`${stat.points} points${isToday ? ' (Today)' : ''}`}
                      >
                        {stat.points > 0 && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-800 whitespace-nowrap bg-white px-1.5 py-0.5 rounded shadow-sm">
                            {stat.points}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`text-xs sm:text-sm text-gray-700 font-semibold mt-3 text-center ${isToday ? 'text-yellow-600 font-bold' : ''}`}>
                      {viewMode === '2weeks' ? getDayLabel(stat.date) : getDateLabel(stat.date)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

