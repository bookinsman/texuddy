'use client';

import React, { useMemo } from 'react';
import { AI_LEVEL_THRESHOLDS } from '@/lib/constants/powers';

interface ProgressBarProps {
  current: number;
  total: number;
  level: number;
}

export function ProgressBar({ current, total, level }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);

  const nextLevelInfo = useMemo(() => {
    const nextThreshold = AI_LEVEL_THRESHOLDS.find(t => t.level > level);
    if (!nextThreshold) {
      return { progress: 100, remaining: 0, nextLevel: level };
    }

    const currentThreshold = AI_LEVEL_THRESHOLDS.find(t => t.level === level);
    const currentRequired = currentThreshold?.emails_required || 0;
    const nextRequired = nextThreshold.emails_required;
    const range = nextRequired - currentRequired;
    const progress = Math.min(((current - currentRequired) / range) * 100, 100);
    const remaining = nextRequired - current;

    return { progress, remaining, nextLevel: nextThreshold.level };
  }, [current, level]);

  return (
    <div className="space-y-4">
      {/* Overall Progress to 500 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Training Progress</span>
          <span className="text-sm font-bold text-purple-600">{current} / {total}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {total - current} emails until career report
        </div>
      </div>

      {/* Next Level Progress */}
      {nextLevelInfo.remaining > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">Next Level</span>
            <span className="text-xs font-bold text-blue-600">Lv.{nextLevelInfo.nextLevel}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${nextLevelInfo.progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {nextLevelInfo.remaining} more emails
          </div>
        </div>
      )}
    </div>
  );
}
