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

  const filteredCategories = useMemo(() => {
    if (selectedModule === 'All') return categoryProgress;
    
    // Map modules to category names
    const moduleCategoryMap: Record<string, string[]> = {
      'Careers': ['Software Developer', 'Marketing Specialist', 'Customer Service', 'Accountant', 'HR Manager', 'Sales Manager', 'Logistics Coordinator', 'Graphic Designer', 'Teacher', 'Nurse', 'Mechanic', 'Electrician', 'Chef', 'Retail Manager', 'Real Estate Agent', 'Bank Employee', 'Construction Manager', 'Pharmacist', 'Lawyer', 'Architect', 'Tour Guide', 'Photographer', 'Journalist', 'Social Worker', 'Project Manager', 'Data Analyst', 'Personal Trainer', 'Event Planning', 'Translator', 'Video Editor', 'Marketing Researcher', 'Product Manager', 'Consultant', 'IT Support', 'Internal Auditor', 'Content Creator', 'Test Engineer', 'Administrative Manager', 'Financial Analyst', 'Customer Success Manager'],
      'Philosophy': ['Philosophy'],
      'Psychology': ['Psychology'],
      'Sales': ['Sales'],
      'Motivation': ['Motivation'],
      'Quotes': ['Quotes'],
      'Communications': ['Communications']
    };
    
    const categoriesInModule = moduleCategoryMap[selectedModule] || [];
    return categoryProgress.filter(cat => categoriesInModule.includes(cat.name));
  }, [categoryProgress, selectedModule]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-4">
        {/* Module Filter - Compact Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 mr-1">Modules:</span>
          {MODULES.map((module) => (
            <button
              key={module}
              onClick={() => setSelectedModule(module)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                selectedModule === module
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                  : 'bg-white dark:bg-dark-50 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-200 hover:bg-gray-50 dark:hover:bg-dark-100'
              }`}
            >
              {module}
            </button>
          ))}
        </div>

        {/* Overall Stats - Compact */}
        <div className="bg-white dark:bg-dark-50 rounded-lg p-3 border border-gray-200 dark:border-dark-200 transition-colors duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">Completed</div>
                <div className="text-base font-bold text-gray-900 dark:text-white">{totalCompleted} / {totalPossible}</div>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-dark-200"></div>
              <div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">Progress</div>
                <div className="text-base font-bold text-gray-900 dark:text-white">{overallPercentage}%</div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-100 flex items-center justify-center">
              <div className="text-xs font-bold text-gray-900 dark:text-white">{overallPercentage}%</div>
            </div>
          </div>
        </div>

        {/* Module Cards - Compact Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
        {filteredCategories.map((cat) => {
          const isComplete = cat.completed === cat.total;
          const isStarted = cat.completed > 0;
          
          return (
            <div
              key={cat.id}
              className={`bg-white dark:bg-dark-50 rounded-lg p-2.5 border transition-all duration-200 hover:shadow-sm ${
                isComplete
                  ? 'border-gray-400 dark:border-white'
                  : isStarted
                  ? 'border-gray-300 dark:border-dark-200'
                  : 'border-gray-200 dark:border-dark-100'
              }`}
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="text-black dark:text-white text-base">{cat.icon}</div>
                {isComplete && (
                  <span className="text-gray-600 dark:text-white text-[10px] font-bold">✓</span>
                )}
              </div>
              
              <h3 className="font-medium text-gray-900 dark:text-white text-[11px] mb-1.5 line-clamp-2 leading-tight">
                {cat.name}
              </h3>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-500 dark:text-gray-400">Time</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatTime(cat.minutes)}</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-dark-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all ${
                      isComplete
                        ? 'bg-gray-800 dark:bg-white'
                        : isStarted
                        ? 'bg-gray-600 dark:bg-white/80'
                        : 'bg-gray-300 dark:bg-dark-300'
                    }`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-500 dark:text-gray-400">{cat.completed}/{cat.total}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{cat.percentage}%</span>
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
