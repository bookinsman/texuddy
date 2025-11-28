'use client';

import React from 'react';

export interface CategoryStat {
  category: string;
  helped: number;
  skipped: number;
  total: number;
  engagement_rate: number;
}

interface CategoryBreakdownProps {
  categories: CategoryStat[];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const getEngagementColor = (rate: number) => {
    if (rate >= 0.7) return 'bg-green-500 dark:bg-green-400';
    if (rate >= 0.5) return 'bg-gray-600 dark:bg-white';
    if (rate >= 0.3) return 'bg-yellow-500 dark:bg-yellow-400';
    return 'bg-gray-400 dark:bg-gray-500';
  };

  const getEngagementLabel = (rate: number) => {
    if (rate >= 0.7) return 'High Interest';
    if (rate >= 0.5) return 'Moderate Interest';
    if (rate >= 0.3) return 'Low Interest';
    return 'Very Low Interest';
  };

  return (
    <div className="space-y-3">
      {categories
        .sort((a, b) => b.engagement_rate - a.engagement_rate)
        .map((cat) => {
          const percentage = Math.round(cat.engagement_rate * 100);

          return (
            <div key={cat.category} className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg p-4 transition-colors duration-500">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800 dark:text-white">{cat.category}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {cat.helped} / {cat.total} ({percentage}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-dark-200 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getEngagementColor(cat.engagement_rate)}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">{getEngagementLabel(cat.engagement_rate)}</span>
                <span className="text-gray-500 dark:text-gray-500">{cat.skipped} skipped</span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
