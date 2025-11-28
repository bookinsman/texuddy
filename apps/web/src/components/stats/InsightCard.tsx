'use client';

import React from 'react';

export interface Insight {
  type: 'strength' | 'pattern' | 'suggestion';
  title: string;
  description: string;
  icon: string;
}

interface InsightCardProps {
  insight: Insight;
}

export function InsightCard({ insight }: InsightCardProps) {
  const getColorScheme = (type: string) => {
    switch (type) {
      case 'strength':
        return 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30 text-green-800 dark:text-green-300';
      case 'pattern':
        return 'bg-gray-50 dark:bg-dark-100 border-gray-200 dark:border-dark-200 text-gray-800 dark:text-gray-200';
      case 'suggestion':
        return 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-gray-50 dark:bg-dark-100 border-gray-200 dark:border-dark-200 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className={`border rounded-xl p-4 transition-colors duration-500 ${getColorScheme(insight.type)}`}>
      <div className="flex items-start space-x-3">
        <div className="text-3xl">{insight.icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{insight.title}</h4>
          <p className="text-sm opacity-90">{insight.description}</p>
        </div>
      </div>
    </div>
  );
}
