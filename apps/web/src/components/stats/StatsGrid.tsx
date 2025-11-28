'use client';

import React from 'react';

interface DailyStats {
  date: string;
  helped: number;
  wordsRetyped: number;
  points: number;
}

interface Stats {
  totalHelped: number;
  totalSkipped: number;
  totalWordsTyped: number;
  avgResponseTime?: number;
}

interface StatsGridProps {
  dailyStats: DailyStats[];
  stats?: Stats;
}

export function StatsGrid({ dailyStats, stats }: StatsGridProps) {
  const totalHelped = dailyStats.reduce((sum, day) => sum + day.helped, 0);
  const totalWords = dailyStats.reduce((sum, day) => sum + day.wordsRetyped, 0);
  const totalPoints = dailyStats.reduce((sum, day) => sum + day.points, 0);
  const avgWordsPerEmail = totalHelped > 0 ? Math.round(totalWords / totalHelped) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total Helped */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
        <div className="text-sm text-green-700 mb-1">✅ Emails Helped</div>
        <div className="text-3xl font-bold text-green-600">{totalHelped}</div>
        {stats && (
          <div className="text-xs text-green-600 mt-1">
            {stats.totalSkipped} skipped
          </div>
        )}
      </div>

      {/* Total Words */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
        <div className="text-sm text-blue-700 mb-1">⌨️ Words Typed</div>
        <div className="text-3xl font-bold text-blue-600">{totalWords.toLocaleString()}</div>
        <div className="text-xs text-blue-600 mt-1">
          ~{avgWordsPerEmail} per email
        </div>
      </div>

      {/* Total Points */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
        <div className="text-sm text-purple-700 mb-1">⭐ Points Earned</div>
        <div className="text-3xl font-bold text-purple-600">{totalPoints.toLocaleString()}</div>
        <div className="text-xs text-purple-600 mt-1">
          1.5x word multiplier
        </div>
      </div>

      {/* Sessions */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
        <div className="text-sm text-orange-700 mb-1">📅 Active Days</div>
        <div className="text-3xl font-bold text-orange-600">{dailyStats.length}</div>
        <div className="text-xs text-orange-600 mt-1">
          training sessions
        </div>
      </div>
    </div>
  );
}
