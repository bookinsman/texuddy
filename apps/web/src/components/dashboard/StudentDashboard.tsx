'use client';

import React, { useState, useMemo } from 'react';
import { SidebarContainer } from '@/components/sidebar/SidebarContainer';
import { Leaderboard } from '@/components/sidebar/Leaderboard';
import { EmailList } from './EmailList';
import { SkippedEmailsList } from './SkippedEmailsList';
import { CompletedEmailsList } from './CompletedEmailsList';
import { StatsContainer } from '@/components/stats/StatsContainer';
import { ProgressTab } from './ProgressTab';
import { BadgesTab } from './BadgesTab';
import { StudentGoalsTab } from './StudentGoalsTab';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { User, Email } from '@texuddy/types';

interface StudentDashboardProps {
  user: User;
  emails: Email[];
  skippedEmails: Email[];
  completedEmails: Email[];
  activeTab: 'available' | 'skipped' | 'completed' | 'stats' | 'progress' | 'badges' | 'goals';
  onSelectEmail: (email: Email) => void;
  onSkipEmail?: (email: Email) => void;
  onShowStats: () => void;
  onTabChange: (tab: 'available' | 'skipped' | 'completed' | 'stats' | 'progress' | 'badges' | 'goals') => void;
  dailyStats: Array<{ date: string; helped: number; wordsRetyped: number }>;
  isSoloGrinder?: boolean;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  emails,
  skippedEmails,
  completedEmails,
  activeTab,
  onSelectEmail,
  onSkipEmail,
  onShowStats,
  onTabChange,
  dailyStats,
  isSoloGrinder = false
}) => {
  const totalCompleted = completedEmails.length;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Calculate completed email subjects for current user
  const userCompletedSubjects = useMemo(() => {
    return completedEmails.map(email => email.subject);
  }, [completedEmails]);

  const tabs = [
    { id: 'available', label: 'Available', count: emails.length },
    ...(isSoloGrinder ? [] : [{ id: 'goals', label: 'Goals' }]),
    { id: 'skipped', label: 'Skipped', count: skippedEmails.length },
    { id: 'stats', label: 'Stats' },
    { id: 'progress', label: 'Progress' },
    { id: 'badges', label: 'Achievements' },
    { id: 'completed', label: 'Completed', count: completedEmails.length },
  ];

  return (
    <div className="h-screen bg-gray-50 dark:bg-dark flex flex-col overflow-hidden transition-colors duration-500">
      <header className="bg-white/80 dark:bg-dark-50/80 border-b border-gray-200 dark:border-dark-100 flex-shrink-0 z-20 backdrop-blur-xl transition-colors duration-500">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {sidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 flex items-center justify-center font-bold text-white shadow-sm">
                  T
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Texuddy</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Streak:</span>
                <span className="font-semibold text-gray-900 dark:text-white px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                  🔥 {user.currentStreak || 0} days
                </span>
              </div>
              <ThemeToggle />
              <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-md">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-[1800px] mx-auto w-full relative">
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className={`
          fixed lg:static inset-y-0 left-0 z-40 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <SidebarContainer
            user={user}
            totalCompleted={totalCompleted}
            dailyStats={dailyStats}
            completedEmails={completedEmails}
            isSoloGrinder={isSoloGrinder}
          />
        </div>

        <main className="flex-1 min-w-0 flex flex-col overflow-hidden bg-white/50 dark:bg-dark/50">
          <div className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="h-full flex flex-col max-w-4xl mx-auto">
              <div className="mb-6 flex gap-1 border-b border-gray-200 dark:border-dark-100 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id as any)}
                    className={`px-4 py-2 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-gray-900 text-gray-900 bg-gray-100 dark:border-white dark:text-white dark:bg-white/10'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                    } rounded-t-lg`}
                  >
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className={`ml-2 text-xs ${
                        activeTab === tab.id 
                          ? 'text-gray-600 dark:text-gray-300' 
                          : 'text-gray-400 dark:text-dark-300'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-hidden">
                {activeTab === 'stats' ? (
                  <StatsContainer dailyStats={dailyStats} />
                ) : activeTab === 'progress' ? (
                  <ProgressTab completedEmails={completedEmails} />
                ) : activeTab === 'badges' ? (
                  <BadgesTab emailsCompleted={totalCompleted} />
                ) : activeTab === 'goals' ? (
                  <StudentGoalsTab user={user} dailyStats={dailyStats} totalCompleted={totalCompleted} />
                ) : activeTab === 'completed' ? (
                  <CompletedEmailsList emails={completedEmails} />
                ) : activeTab === 'available' ? (
                  <EmailList emails={emails} onSelectEmail={onSelectEmail} onSkipEmail={onSkipEmail} onShowStats={onShowStats} />
                ) : (
                  <SkippedEmailsList emails={skippedEmails} />
                )}
              </div>
            </div>
          </div>
        </main>

        <aside className="hidden lg:flex w-96 bg-white/80 dark:bg-dark-50/80 border-l border-gray-200 dark:border-dark-100 flex-col overflow-hidden backdrop-blur-xl">
          <div className="flex-1 p-4 sm:p-6 overflow-hidden flex flex-col">
            <Leaderboard 
              userWords={user.wordsRetyped || 0} 
              userName={user.studentName}
              userCompletedSubjects={userCompletedSubjects}
            />
          </div>
        </aside>
      </div>

    </div>
  );
};
