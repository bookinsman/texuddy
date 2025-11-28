'use client';

import React from 'react';
import { Card } from '@texuddy/ui';
import type { Email } from '@texuddy/types';

interface SkippedEmailsListProps {
  emails: Email[];
}

export const SkippedEmailsList: React.FC<SkippedEmailsListProps> = ({ emails }) => {
  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-2 max-w-xl">
      <div className="flex items-center justify-between mb-3 sticky top-0 bg-gray-50 dark:bg-dark pb-2 z-10 transition-colors duration-500">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">Skipped Emails</h2>
        <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-dark-100 px-2 py-1 rounded-full font-medium">
          {emails.length} {emails.length === 1 ? 'email' : 'emails'}
        </span>
      </div>
      <div className="relative">
        <div className="max-h-[420px] lg:max-h-[560px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          {emails.length === 0 ? (
            <Card padding="sm">
              <p className="text-gray-600 dark:text-gray-400 text-center py-6 text-sm">
                No skipped emails yet.
              </p>
            </Card>
          ) : (
            emails.map((email) => (
          <Card 
            key={email.id}
            padding="sm"
            className="hover:shadow-lg transition-all duration-200 border-l-4 border-gray-400 dark:border-dark-200 bg-gray-50/50 dark:bg-dark-100/50 opacity-75"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                  <span className="text-lg sm:text-xl flex-shrink-0">{email.icon}</span>
                  <span className="font-semibold text-gray-600 dark:text-gray-400 truncate text-sm">{email.fromName}</span>
                  <span className="text-xs bg-gray-400 dark:bg-dark-200 text-white px-1.5 py-0.5 rounded font-bold uppercase">
                    Skipped
                  </span>
                  <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
                    <span className="text-xs bg-gray-100 dark:bg-dark-200 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">~{email.wordCount} words</span>
                    <span className="text-xs bg-gray-200 dark:bg-dark-200 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded font-medium">{email.reward}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1 text-sm">{email.subject}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                  {truncateText(email.body, 70)}
                </p>
              </div>
            </div>
          </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
