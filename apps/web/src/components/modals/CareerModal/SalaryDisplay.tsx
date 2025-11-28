'use client';

import React from 'react';

interface SalaryDisplayProps {
  entry: number;
  mid: number;
  senior: number;
  lifetimeEarnings: number;
}

export function SalaryDisplay({ entry, mid, senior, lifetimeEarnings }: SalaryDisplayProps) {
  const formatSalary = (amount: number) => {
    if (amount >= 1000) {
      return `€${(amount / 1000).toFixed(1)}K`;
    }
    return `€${amount}`;
  };

  const formatLifetime = (amount: number) => {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(2)}M`;
    }
    return `€${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-4">
      {/* Salary Progression */}
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <div className="text-xs text-gray-600 mb-1">Entry Level</div>
          <div className="text-2xl font-bold text-green-600">{formatSalary(entry)}</div>
          <div className="text-xs text-gray-500">0-2 years</div>
        </div>

        <div className="text-2xl text-gray-400 px-2">→</div>

        <div className="text-center flex-1">
          <div className="text-xs text-gray-600 mb-1">Mid Level</div>
          <div className="text-2xl font-bold text-blue-600">{formatSalary(mid)}</div>
          <div className="text-xs text-gray-500">3-7 years</div>
        </div>

        <div className="text-2xl text-gray-400 px-2">→</div>

        <div className="text-center flex-1">
          <div className="text-xs text-gray-600 mb-1">Senior Level</div>
          <div className="text-2xl font-bold text-purple-600">{formatSalary(senior)}</div>
          <div className="text-xs text-gray-500">8+ years</div>
        </div>
      </div>

      {/* Lifetime Earnings */}
      <div className="bg-white/50 rounded-lg p-4 border border-green-300">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            💎 Estimated Lifetime Earnings (30 years)
          </span>
          <span className="text-xl font-bold text-green-700">
            {formatLifetime(lifetimeEarnings)}
          </span>
        </div>
      </div>
    </div>
  );
}
