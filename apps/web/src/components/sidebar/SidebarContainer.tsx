'use client';

import React, { useMemo } from 'react';
import { BADGE_MILESTONES, getUnlockedBadges, getNextBadge } from '@/lib/constants/badges';
import { ALL_CATEGORIES } from '@/lib/constants/categories';
import type { User } from '@texuddy/types';

interface SidebarContainerProps {
  user: User;
  totalCompleted: number;
  dailyStats: Array<{ date: string; helped: number; wordsRetyped: number }>;
  completedEmails?: Array<{ category: string }>;
  isSoloGrinder?: boolean;
}

interface GoalProgress {
  reward: string;
  requirements: {
    hours: number;
    words: number;
    scenarios: number;
  };
  progress: {
    hours: number;
    words: number;
    scenarios: number;
  };
  unlocked: boolean;
}

export function SidebarContainer({ user, totalCompleted, dailyStats, completedEmails = [], isSoloGrinder = false }: SidebarContainerProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayStats = dailyStats.find(s => s.date === today);
  const emailsToday = todayStats?.helped || 0;
  const wordsToday = todayStats?.wordsRetyped || 0;
  const timeSpent = Math.round((emailsToday * 3) || 0);

  // Calculate iPhone goal progress
  const calculateGoalProgress = (): GoalProgress => {
    // iPhone goal requirements from parent dashboard
    const requirements = {
      hours: 30,
      words: 7000,
      scenarios: 200
    };

    // Calculate total time spent (estimate 3 minutes per email)
    const totalTimeSpent = dailyStats.reduce((sum, stat) => sum + (stat.helped * 3), 0) / 60; // Convert to hours
    const totalWords = user.wordsRetyped || 0;
    const totalScenarios = totalCompleted;

    // Check if unlocked
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
  };

  const iphoneGoal = calculateGoalProgress();

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

  const completedCategories = useMemo(() => {
    const categoryCounts = new Map<string, number>();
    
    completedEmails.forEach(email => {
      const categoryId = email.category.toLowerCase().replace(/\s+/g, '-');
      categoryCounts.set(categoryId, (categoryCounts.get(categoryId) || 0) + 1);
    });

    return ALL_CATEGORIES.map(cat => {
      const completed = categoryCounts.get(cat.id) || 0;
      return {
        ...cat,
        completed,
        isComplete: completed >= cat.emailCount
      };
    }).filter(cat => cat.isComplete);
  }, [completedEmails]);

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="w-full lg:w-80 bg-white dark:bg-dark-50/50 border-r border-gray-200 dark:border-dark-100 flex flex-col overflow-hidden h-full">
      <div className="flex-1 p-4 lg:p-6 space-y-4 overflow-hidden flex flex-col">
        {/* iPhone Goal Progress - Hidden for Solo Grinders */}
        {!isSoloGrinder && (
        <div className={`bg-white dark:bg-dark-50 rounded-lg p-4 border-2 shadow-sm transition-all ${
          iphoneGoal.unlocked 
            ? 'border-slate-600 dark:border-slate-400 ring-2 ring-opacity-20 ring-slate-600' 
            : 'border-slate-200 dark:border-slate-700'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📱</span>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Reward Goal</h3>
            {iphoneGoal.unlocked && (
              <span className="text-xs font-bold bg-slate-600 text-white px-2 py-0.5 rounded ml-auto animate-pulse">
                ✓ UNLOCKED
              </span>
            )}
          </div>

          <div className="mb-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{iphoneGoal.reward}</h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-slate-600 to-slate-700 transition-all duration-500 ${iphoneGoal.unlocked ? 'shadow-lg' : ''}`}
                  style={{ width: `${totalProgress}%` }}
                ></div>
              </div>
              <span className={`text-xs font-bold ${iphoneGoal.unlocked ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'} w-10 text-right`}>
                {Math.round(totalProgress)}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {/* Practice Time */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <span>⏱️</span> Practice Time
                </span>
                <span className={`text-xs font-semibold ${hoursProgress >= 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                  {iphoneGoal.progress.hours.toFixed(1)} / {iphoneGoal.requirements.hours}h
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-500 to-slate-600 transition-all duration-500"
                  style={{ width: `${hoursProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Words Typed */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <span>✍️</span> Words Typed
                </span>
                <span className={`text-xs font-semibold ${wordsProgress >= 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                  {iphoneGoal.progress.words.toLocaleString()} / {iphoneGoal.requirements.words.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-600 to-slate-700 transition-all duration-500"
                  style={{ width: `${wordsProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Scenarios */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <span>🎯</span> Scenarios
                </span>
                <span className={`text-xs font-semibold ${scenariosProgress >= 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                  {iphoneGoal.progress.scenarios} / {iphoneGoal.requirements.scenarios}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-700 to-slate-800 transition-all duration-500"
                  style={{ width: `${scenariosProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        )}

        <div className="bg-white dark:bg-dark-50 rounded-lg p-4 border border-gray-200 dark:border-dark-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Today&apos;s Progress</h3>
            {user.currentStreak > 0 && (
              <span className="text-xs bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-gray-300 px-2 py-1 rounded font-medium">
                🔥 {user.currentStreak} day streak
              </span>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-dark-100">
              <span className="text-xs text-gray-600 dark:text-gray-400">Scenarios finished</span>
              <span className="font-semibold text-gray-900 dark:text-white">{emailsToday}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-dark-100">
              <span className="text-xs text-gray-600 dark:text-gray-400">Words retyped</span>
              <span className="font-semibold text-gray-900 dark:text-white">{wordsToday.toLocaleString('en-US')}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">Time spent</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatTime(timeSpent)}</span>
            </div>
          </div>
        </div>

        {completedCategories.length > 0 && (
          <div className="bg-white dark:bg-dark-50 rounded-lg p-4 border border-gray-200 dark:border-dark-100 shadow-sm">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3">Completed Themes</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {completedCategories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2 py-1.5">
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-4">{cat.name.charAt(0)}</span>
                  <span className="text-xs text-gray-700 dark:text-gray-300 flex-1 truncate">{cat.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">✓</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-dark-100 bg-white dark:bg-dark-50">
        <div className="p-4">
          <button className="w-full flex items-center gap-3 px-2 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded transition-colors">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Return Home</span>
          </button>
          <button className="w-full flex items-center gap-3 px-2 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded transition-colors">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-2 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded transition-colors">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile</span>
          </button>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 dark:border-dark-100 flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-gray-500">v1.0.6</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}

