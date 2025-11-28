'use client';

import React from 'react';
import { AI_POWERS } from '@/lib/constants/powers';

interface PowersListProps {
  powers: number;
  level: number;
}

export function PowersList({ powers, level }: PowersListProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <h3 className="font-semibold text-gray-800 mb-3">AI Powers</h3>

      <div className="space-y-2">
        {AI_POWERS.map((power) => {
          const isUnlocked = level >= power.unlockLevel;

          return (
            <div
              key={power.id}
              className={`flex items-start space-x-3 p-2 rounded-lg transition-all ${
                isUnlocked
                  ? 'bg-purple-50 border border-purple-200'
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <div className="text-2xl">{power.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                    {power.name}
                  </span>
                  {!isUnlocked && (
                    <span className="text-xs text-gray-500">Lv.{power.unlockLevel}</span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">{power.description}</p>
              </div>
              {isUnlocked && <div className="text-green-500">✓</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
