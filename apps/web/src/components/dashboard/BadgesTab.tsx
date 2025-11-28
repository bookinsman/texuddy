'use client';

import React from 'react';
import { BADGE_MILESTONES, getUnlockedBadges, getNextBadge } from '@/lib/constants/badges';

interface BadgesTabProps {
  emailsCompleted: number;
}

export function BadgesTab({ emailsCompleted }: BadgesTabProps) {
  const nextBadge = getNextBadge(emailsCompleted);
  const allBadges = BADGE_MILESTONES;

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-2">
      {nextBadge && (
          <div className="bg-gray-50 dark:bg-dark-100/50 rounded-lg p-4 border border-gray-200 dark:border-dark-200 transition-colors duration-500">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{nextBadge.emoji}</div>
            <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Next achievement: {nextBadge.name}
              </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{nextBadge.unlocks}</p>
              <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white dark:bg-dark-200 rounded-full h-1.5">
                  <div
                      className="bg-gray-800 dark:bg-white h-1.5 rounded-full transition-all"
                    style={{
                      width: `${Math.min((emailsCompleted / nextBadge.emailsRequired) * 100, 100)}%`,
                    }}
                  />
                </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {emailsCompleted} / {nextBadge.emailsRequired}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {allBadges.map((badge) => {
          const isUnlocked = emailsCompleted >= badge.emailsRequired;
          const progress = Math.min((emailsCompleted / badge.emailsRequired) * 100, 100);
          const remaining = Math.max(badge.emailsRequired - emailsCompleted, 0);

          return (
            <div
              key={badge.id}
                className={`bg-white dark:bg-dark-50 rounded-lg p-4 border transition-colors duration-500 ${
                isUnlocked
                    ? 'border-yellow-400 dark:border-yellow-500'
                    : 'border-gray-200 dark:border-dark-100'
              }`}
            >
                <div className="flex items-center justify-between mb-3">
                  <div className={`text-4xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                  {badge.emoji}
                </div>
                {isUnlocked && (
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                      ✓
                  </span>
                )}
              </div>

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{badge.description}</p>

              {!isUnlocked && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Progress</span>
                      <span className="font-semibold">{emailsCompleted} / {badge.emailsRequired}</span>
                  </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-200 rounded-full h-1.5">
                    <div
                        className="bg-gray-800 dark:bg-white h-1.5 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Remaining {remaining}
                  </div>
                </div>
              )}

              {isUnlocked && (
                  <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded p-2">
                    <div className="text-xs text-green-700 dark:text-green-400 font-medium mb-0.5">Unlocked:</div>
                    <div className="text-xs text-green-800 dark:text-green-300 font-semibold">{badge.unlocks}</div>
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
