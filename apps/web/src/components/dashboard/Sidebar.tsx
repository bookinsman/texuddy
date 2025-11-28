'use client';

import React from 'react';
import { Card } from '@texuddy/ui';
import { ProgressBar } from '@texuddy/ui';
import type { User } from '@texuddy/types';
import { calculateAIPower, getNextUpgradeAt, getAIPowers } from '@texuddy/utils';

interface SidebarProps {
  user: User;
  dailyStats?: Array<{ date: string; helped: number; wordsRetyped: number; points: number }>;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, dailyStats = [] }) => {
  const nextUpgradeAt = getNextUpgradeAt(user.aiLevel);
  const powers = getAIPowers(user.aiLevel);
  
  // Calculate totals from daily stats
  const totalHelped = dailyStats.reduce((sum, stat) => sum + stat.helped, 0) || user.completedEmails.length;
  const totalWordsRetyped = dailyStats.reduce((sum, stat) => sum + stat.wordsRetyped, 0) || user.wordsRetyped || 0;
  const totalPoints = dailyStats.reduce((sum, stat) => sum + stat.points, 0) || user.totalPoints || 0;
  
  return (
    <aside className="w-full lg:w-72 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 p-4 lg:p-6 space-y-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto custom-scrollbar">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🤖</div>
          <div className="font-bold text-lg text-gray-800">{user.aiName}</div>
          <div className="text-xs text-gray-600 mt-1">Level {user.aiLevel}</div>
        </div>
        <ProgressBar value={user.aiPower} max={100} showLabel />
        <div className="mt-3 text-xs text-gray-600 text-center bg-white/50 rounded px-2 py-1">
          Next upgrade: {nextUpgradeAt} more emails
        </div>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Powers:</div>
          <div className="space-y-1.5">
            {powers.map((power) => (
              <div key={power} className="text-xs text-gray-700 flex items-center gap-2 bg-white/60 rounded px-2 py-1">
                <span className="text-green-600">✓</span> 
                <span className="capitalize font-medium">{power}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📊</span>
          <span>Your Stats</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-white/60 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-700">Scenarios:</span>
            <span className="font-bold text-lg text-purple-600">{totalHelped}</span>
          </div>
          <div className="flex justify-between items-center bg-white/60 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-700">Words Retyped:</span>
            <span className="font-bold text-lg text-purple-600">{totalWordsRetyped}</span>
          </div>
          <div className="flex justify-between items-center bg-white/60 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-700">Points:</span>
            <span className="font-bold text-lg text-purple-600">{totalPoints}</span>
          </div>
          <div className="flex justify-between items-center bg-white/60 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-700">Streak:</span>
            <span className="font-bold text-lg text-orange-600">{user.currentStreak} 🔥</span>
          </div>
        </div>
      </Card>
      
      {user.badges.length > 0 && (
        <Card>
          <div className="text-sm font-bold text-gray-700 mb-3">🏆 Badges</div>
          <div className="flex flex-wrap gap-2">
            {user.badges.map((badge) => (
              <div key={badge.id} className="text-2xl" title={badge.name}>
                {badge.icon}
              </div>
            ))}
          </div>
        </Card>
      )}
    </aside>
  );
};

