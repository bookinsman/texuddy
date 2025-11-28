'use client';

import React from 'react';
import Link from 'next/link';

interface ParentSidebarProps {
  studentName?: string;
  studentPasscode?: string;
  joinedDate?: string;
  stats?: {
    timeSpentToday: number;
    timeSpentTotal: number;
    wordsTypedToday: number;
    wordsTypedTotal: number;
    scenariosCompleted: number;
    scenariosInProgress: number;
    currentWPM?: number;
    totalXP?: number;
  };
}

export function ParentSidebar({ studentName, studentPasscode, joinedDate, stats }: ParentSidebarProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="w-full lg:w-72 bg-white dark:bg-dark-50/50 border-r border-gray-200 dark:border-dark-100 flex flex-col overflow-hidden h-full">
      <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
        <div className="bg-white dark:bg-dark-50 rounded-lg p-4 border border-gray-200 dark:border-dark-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">👨‍👩‍👧‍👦</span>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Parent Dashboard</h3>
          </div>
          {studentName && (
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Monitoring: <span className="font-semibold text-gray-900 dark:text-white">{studentName}</span>
            </div>
          )}
          
          {joinedDate && (
            <div className="text-xs text-gray-500 dark:text-gray-500 mb-3">
              Active since {new Date(joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          )}

          {studentPasscode && (
            <div className="pt-3 border-t border-gray-100 dark:border-dark-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-500">Student Passcode</p>
                <button className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white px-2 py-0.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded transition-colors">
                  Reset
                </button>
              </div>
              <p className="text-lg font-mono font-bold text-gray-900 dark:text-white tracking-wider">{studentPasscode}</p>
            </div>
          )}
        </div>

        {stats && (
          <div className="bg-white dark:bg-dark-50 rounded-lg p-4 border border-gray-200 dark:border-dark-100">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-dark-100">
                <span className="text-xs text-gray-600 dark:text-gray-400">Today</span>
                <span className="font-semibold text-gray-900 dark:text-white text-xs">{formatTime(stats.timeSpentToday)}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-dark-100">
                <span className="text-xs text-gray-600 dark:text-gray-400">Total Time</span>
                <span className="font-semibold text-gray-900 dark:text-white text-xs">{formatTime(stats.timeSpentTotal)}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-dark-100">
                <span className="text-xs text-gray-600 dark:text-gray-400">Words Typed</span>
                <span className="font-semibold text-gray-900 dark:text-white text-xs">{stats.wordsTypedTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-xs text-gray-600 dark:text-gray-400">Scenarios</span>
                <span className="font-semibold text-gray-900 dark:text-white text-xs">{stats.scenariosCompleted}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-dark-50 rounded-lg p-4 border border-gray-200 dark:border-dark-100">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3">Quick Actions</h3>
          <div className="space-y-1.5">
            <Link
              href="/parent/dashboard"
              className="flex items-center gap-2.5 px-2.5 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Overview</span>
            </Link>
            <Link
              href="/parent/dashboard?tab=goals"
              className="flex items-center gap-2.5 px-2.5 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span>Reward Goals</span>
            </Link>
            <Link
              href="/parent/dashboard?tab=activity"
              className="flex items-center gap-2.5 px-2.5 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Activity</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-dark-100 bg-white dark:bg-dark-50 flex-shrink-0">
        <div className="p-4 space-y-1">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-2 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded transition-colors"
          >
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Back Home</span>
          </Link>
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

