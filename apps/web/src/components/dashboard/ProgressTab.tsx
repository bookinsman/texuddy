'use client';

import React, { useMemo, useState } from 'react';
import { ALL_CATEGORIES } from '@/lib/constants/categories';
import type { Email } from '@texuddy/types';

const MODULES = [
  'All',
  'Careers',
  'Philosophy',
  'Psychology',
  'Sales',
  'Motivation',
  'Quotes',
  'Communications'
] as const;

const getBlackIcon = (categoryId: string): string => {
  const iconMap: Record<string, string> = {
    'it-programuotojas': '◼',
    'marketingo-specialistas': '◼',
    'klientu-aptarnavimas': '◼',
    'buhalteris': '◼',
    'hr-vadybininkas': '◼',
    'pardavimo-vadybininkas': '◼',
    'logistikos-koordinatorius': '◼',
    'grafinis-dizaineris': '◼',
    'mokytojas': '◼',
    'slaugytojas': '◼',
    'mechanikas': '◼',
    'elektrikas': '◼',
    'virejas-kulinaras': '◼',
    'prekybos-centro-vadovas': '◼',
    'nekilnojamo-turto-agentas': '◼',
    'banko-darbuotojas': '◼',
    'statybos-vadovas': '◼',
    'vaistininkas': '◼',
    'advokatas': '◼',
    'architektas': '◼',
    'turisto-gidas': '◼',
    'fotografas': '◼',
    'zurnalistas': '◼',
    'socialinis-darbuotojas': '◼',
    'projektu-vadovas': '◼',
    'duomenu-analitikas': '◼',
    'personalinis-treneris': '◼',
    'renginiu-planavimas': '◼',
    'vertejas': '◼',
    'video-redaktorius': '◼',
    'rinkodaros-tyrejas': '◼',
    'produkto-vadovas': '◼',
    'konsultantas': '◼',
    'it-palaikymas': '◼',
    'vidaus-auditorius': '◼',
    'turinio-kurėjas': '◼',
    'testavimo-inzinierius': '◼',
    'administracijos-vadovas': '◼',
    'finansu-analitikas': '◼',
    'klientu-sekmės-vadovas': '◼',
  };
  return iconMap[categoryId] || '◼';
};

interface ProgressTabProps {
  completedEmails: Email[];
}

export function ProgressTab({ completedEmails }: ProgressTabProps) {
  const [selectedModule, setSelectedModule] = useState<typeof MODULES[number]>('All');

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const categoryProgress = useMemo(() => {
    const progressMap = new Map<string, { completed: number; total: number; minutes: number; words: number }>();

    ALL_CATEGORIES.forEach(cat => {
      progressMap.set(cat.id, { completed: 0, total: cat.emailCount, minutes: 0, words: 0 });
    });

    completedEmails.forEach(email => {
      const categoryId = email.category.toLowerCase().replace(/\s+/g, '-');
      const progress = progressMap.get(categoryId);
      if (progress) {
        progress.completed += 1;
        progress.minutes += 3;
        progress.words += email.wordCount || 0;
      }
    });

    return Array.from(progressMap.entries()).map(([id, progress]) => {
      const category = ALL_CATEGORIES.find(c => c.id === id);
      return {
        id,
        name: category?.nameEn || id,
        icon: getBlackIcon(id),
        completed: progress.completed,
        total: progress.total,
        minutes: progress.minutes,
        words: progress.words,
        percentage: Math.round((progress.completed / progress.total) * 100),
      };
    });
  }, [completedEmails]);

  const totalCompleted = categoryProgress.reduce((sum, cat) => sum + cat.completed, 0);
  const totalPossible = categoryProgress.reduce((sum, cat) => sum + cat.total, 0);
  const overallPercentage = Math.round((totalCompleted / totalPossible) * 100);

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-2">
        {/* Module Filter Dropdown */}
        <div className="flex items-center gap-3 mb-4">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Module:</label>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value as typeof MODULES[number])}
            className="flex-1 px-3 py-2 text-sm bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-200 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-500"
          >
            {MODULES.map((module) => (
              <option key={module} value={module}>
                {module}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gray-50 dark:bg-dark-100/50 rounded-lg p-4 border border-gray-200 dark:border-dark-200 transition-colors duration-500">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Career Progress</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Completed</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{totalCompleted} / {totalPossible}</div>
          </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Progress</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{overallPercentage}%</div>
          </div>
        </div>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {categoryProgress.map((cat) => {
          const isComplete = cat.completed === cat.total;
          const isStarted = cat.completed > 0;
          
          return (
            <div
              key={cat.id}
                className={`bg-white dark:bg-dark-50 rounded-lg p-3 border transition-colors duration-500 ${
                isComplete
                    ? 'border-gray-400 dark:border-white'
                  : isStarted
                    ? 'border-gray-300 dark:border-dark-200'
                    : 'border-gray-200 dark:border-dark-100'
              }`}
            >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-black dark:text-white text-lg font-normal">{cat.icon}</div>
                {isComplete && (
                    <span className="text-gray-600 dark:text-white text-xs">✓</span>
                )}
              </div>
              
                <h3 className="font-medium text-gray-900 dark:text-white text-xs mb-2 line-clamp-2">
                {cat.name}
              </h3>
              
                <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Minutes spent</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatTime(cat.minutes)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Words retyped</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{cat.words.toLocaleString()}</span>
                </div>
                
                  <div className="w-full bg-gray-200 dark:bg-dark-200 rounded-full h-1.5">
                  <div
                      className={`h-1.5 rounded-full transition-all ${
                      isComplete
                          ? 'bg-gray-800 dark:bg-white'
                        : isStarted
                          ? 'bg-gray-600 dark:bg-white/80'
                        : 'bg-gray-300 dark:bg-dark-300'
                    }`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {cat.percentage}%
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
