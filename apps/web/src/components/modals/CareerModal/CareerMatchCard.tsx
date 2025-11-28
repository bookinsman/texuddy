'use client';

import React from 'react';
import type { CareerMatch } from '@/types/career';

interface CareerMatchCardProps {
  match: CareerMatch;
  rank: number;
}

export function CareerMatchCard({ match, rank }: CareerMatchCardProps) {
  const { career, engagement, fit_level, confidence } = match;

  const getFitColor = (fit: string) => {
    switch (fit) {
      case 'perfect': return 'bg-green-100 border-green-300 text-green-800';
      case 'good': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'moderate': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getConfidenceColor = (conf: string) => {
    switch (conf) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-blue-600';
      case 'low': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getRankEmoji = (r: number) => {
    switch (r) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${r}.`;
    }
  };

  return (
    <div className={`border-2 rounded-xl p-4 ${getFitColor(fit_level)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">{getRankEmoji(rank)}</div>
          <div>
            <h4 className="font-bold text-lg">{career.name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs px-2 py-1 bg-white/50 rounded-full capitalize">
                {fit_level.replace('_', ' ')}
              </span>
              <span className={`text-xs font-medium ${getConfidenceColor(confidence)}`}>
                {confidence} confidence
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <div className="text-xs opacity-75">Helped</div>
          <div className="font-bold">{engagement.helped}</div>
        </div>
        <div>
          <div className="text-xs opacity-75">Skipped</div>
          <div className="font-bold">{engagement.skipped}</div>
        </div>
        <div>
          <div className="text-xs opacity-75">Engagement</div>
          <div className="font-bold">{Math.round(engagement.engagement_rate * 100)}%</div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-black/10">
        <div className="flex justify-between items-center text-sm">
          <span className="opacity-75">Starting Salary</span>
          <span className="font-bold">€{career.salary_entry.toLocaleString()}/mo</span>
        </div>
      </div>
    </div>
  );
}
