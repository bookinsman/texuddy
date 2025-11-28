'use client';

import React from 'react';
import { Card } from '@texuddy/ui';
import type { Email } from '@texuddy/types';

interface CompletedEmailsListProps {
  emails: Email[];
}

const getSkillsFromEmail = (email: Email): string[] => {
  const skills: string[] = [];
  
  // Always add these core skills
  skills.push('Kind Tone');
  skills.push('Helpful');
  
  // Map categories to skills
  const categoryMap: Record<string, string[]> = {
    'Phone/Social Media': ['Boundaries', 'Family Support'],
    'Cyberbullying': ['Empathy', 'Support'],
    'Education': ['Education', 'Motivation'],
    'Health': ['Health', 'Family Support'],
    'Family': ['Family Support', 'Empathy'],
    'Friendship': ['Empathy', 'Social Skills'],
    'Self-esteem': ['Empathy', 'Support'],
    'Organization': ['Education', 'Boundaries'],
  };
  
  if (email.category && categoryMap[email.category]) {
    skills.push(...categoryMap[email.category]);
  }
  
  // Add skills based on keywords
  if (email.keywords) {
    if (email.keywords.some(k => ['Family', 'Sleep', 'Time'].includes(k))) {
      if (!skills.includes('Family Support')) skills.push('Family Support');
      if (!skills.includes('Boundaries')) skills.push('Boundaries');
    }
    if (email.keywords.some(k => ['Brain', 'Learn', 'Study'].includes(k))) {
      if (!skills.includes('Education')) skills.push('Education');
    }
    if (email.keywords.some(k => ['Feel', 'Worry', 'Anxious'].includes(k))) {
      if (!skills.includes('Empathy')) skills.push('Empathy');
    }
  }
  
  // Limit to 4-5 skills max
  return skills.slice(0, 5);
};

export const CompletedEmailsList: React.FC<CompletedEmailsListProps> = ({ emails }) => {
  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between mb-3 sticky top-0 bg-gray-50 dark:bg-dark pb-2 z-10 transition-colors duration-500">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">Completed</h2>
        <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-dark-100 px-2 py-1 rounded-full font-medium">
          {emails.length} {emails.length === 1 ? 'email' : 'emails'}
        </span>
      </div>
      <div className="relative">
        <div className="max-h-[420px] lg:max-h-[560px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          {emails.length === 0 ? (
            <Card padding="sm">
              <p className="text-gray-600 dark:text-gray-400 text-center py-6 text-sm">
                No completed emails yet. Start helping people to see them here!
              </p>
            </Card>
          ) : (
            emails.map((email) => {
              const skills = getSkillsFromEmail(email);
              return (
                <Card 
                  key={email.id}
                  padding="sm"
                  className="hover:shadow-lg transition-all duration-200 border-l-4 border-green-500 dark:border-green-400 bg-green-50/30 dark:bg-green-500/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                        <span className="text-lg sm:text-xl flex-shrink-0">{email.icon}</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 truncate text-sm">{email.fromName}</span>
                        <span className="text-xs bg-green-500 dark:bg-green-600 text-white px-1.5 py-0.5 rounded font-bold uppercase">
                          DONE
                        </span>
                        <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
                          <span className="text-xs bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">~{email.wordCount}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{email.subject}</h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-gray-300 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
