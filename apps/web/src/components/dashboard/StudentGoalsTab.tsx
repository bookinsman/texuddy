'use client';

import React, { useMemo } from 'react';
import type { User } from '@texuddy/types';

interface StudentGoalsTabProps {
  user: User;
  dailyStats: Array<{ date: string; helped: number; wordsRetyped: number }>;
  totalCompleted: number;
}

export function StudentGoalsTab({ user, dailyStats, totalCompleted }: StudentGoalsTabProps) {
  // Get iPhone goal from parent (mock data for now)
  const iphoneGoal = useMemo(() => {
    const requirements = {
      hours: 30,
      words: 7000,
      scenarios: 200
    };

    // Calculate total time spent (estimate 3 minutes per email)
    const totalTimeSpent = dailyStats.reduce((sum, stat) => sum + (stat.helped * 3), 0) / 60;
    const totalWords = user.wordsRetyped || 0;
    const totalScenarios = totalCompleted;

    const unlocked = totalTimeSpent >= requirements.hours && 
                     totalWords >= requirements.words && 
                     totalScenarios >= requirements.scenarios;

    return {
      reward: 'New iPhone 15',
      requirements,
      progress: {
        hours: totalTimeSpent,
        words: totalWords,
        scenarios: totalScenarios
      },
      unlocked
    };
  }, [user, dailyStats, totalCompleted]);

  const calculateProgress = (current: number, required: number) => {
    return Math.min(100, (current / required) * 100);
  };

  const hoursProgress = calculateProgress(iphoneGoal.progress.hours, iphoneGoal.requirements.hours);
  const wordsProgress = calculateProgress(iphoneGoal.progress.words, iphoneGoal.requirements.words);
  const scenariosProgress = calculateProgress(iphoneGoal.progress.scenarios, iphoneGoal.requirements.scenarios);
  
  const activeRequirements = [
    iphoneGoal.requirements.hours > 0,
    iphoneGoal.requirements.words > 0,
    iphoneGoal.requirements.scenarios > 0
  ].filter(Boolean).length;

  const totalProgress = (hoursProgress + wordsProgress + scenariosProgress) / activeRequirements;

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6">
        <div className="bg-white dark:bg-dark-50 border-2 rounded-lg p-6 shadow-sm transition-all">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📱</span>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{iphoneGoal.reward}</h2>
              {iphoneGoal.unlocked && (
                <span className="text-xs font-bold bg-slate-600 text-white px-2 py-1 rounded mt-1 inline-block animate-pulse">
                  ✓ UNLOCKED
                </span>
              )}
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</span>
              <span className={`text-lg font-bold ${iphoneGoal.unlocked ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                {Math.round(totalProgress)}%
              </span>
            </div>
            <div className="h-3 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-slate-600 to-slate-700 transition-all duration-500 ${iphoneGoal.unlocked ? 'shadow-lg' : ''}`}
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Individual Requirements */}
          <div className="space-y-4">
            {/* Practice Time */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span>⏱️</span> Practice Time
                </span>
                <span className={`text-sm font-semibold ${hoursProgress >= 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                  {iphoneGoal.progress.hours.toFixed(1)} / {iphoneGoal.requirements.hours}h
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-500 to-slate-600 transition-all duration-500"
                  style={{ width: `${hoursProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Words Typed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span>✍️</span> Words Typed
                </span>
                <span className={`text-sm font-semibold ${wordsProgress >= 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                  {iphoneGoal.progress.words.toLocaleString()} / {iphoneGoal.requirements.words.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-600 to-slate-700 transition-all duration-500"
                  style={{ width: `${wordsProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Scenarios */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span>🎯</span> Scenarios Completed
                </span>
                <span className={`text-sm font-semibold ${scenariosProgress >= 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                  {iphoneGoal.progress.scenarios} / {iphoneGoal.requirements.scenarios}
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-700 to-slate-800 transition-all duration-500"
                  style={{ width: `${scenariosProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {iphoneGoal.unlocked && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200 font-semibold text-center">
                🎉 Congratulations! You've unlocked this reward! Your parent will be notified.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

