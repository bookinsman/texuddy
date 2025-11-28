'use client';

import React from 'react';

interface StatsCardProps {
  helped: number;
  skipped: number;
  words: number;
  points: number;
  streak: number;
}

export function StatsCard({ helped, skipped, words, points, streak }: StatsCardProps) {
  const total = helped + skipped;
  const helpRate = total > 0 ? Math.round((helped / total) * 100) : 0;

  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
      <h3 className="font-semibold text-gray-800 mb-3">Your Stats</h3>

      <div className="space-y-2">
        {/* Helped */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">✅ Helped</span>
          <span className="font-bold text-green-600">{helped}</span>
        </div>

        {/* Skipped */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">⏭️ Skipped</span>
          <span className="font-bold text-orange-600">{skipped}</span>
        </div>

        {/* Help Rate */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-600">📊 Help Rate</span>
          <span className={`font-bold ${helpRate >= 70 ? 'text-green-600' : helpRate >= 50 ? 'text-blue-600' : 'text-yellow-600'}`}>
            {helpRate}%
          </span>
        </div>

        {/* Words Typed */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">⌨️ Words Typed</span>
          <span className="font-bold text-blue-600">{words.toLocaleString()}</span>
        </div>

        {/* Points */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">⭐ Points</span>
          <span className="font-bold text-purple-600">{points.toLocaleString()}</span>
        </div>

        {/* Streak */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-600">🔥 Streak</span>
          <span className="font-bold text-red-600">{streak} days</span>
        </div>
      </div>
    </div>
  );
}
