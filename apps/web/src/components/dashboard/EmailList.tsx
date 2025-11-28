'use client';

import React, { useState } from 'react';
import { Card } from '@texuddy/ui';
import { Button } from '@texuddy/ui';
import type { Email } from '@texuddy/types';

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  onShowStats: () => void;
  onSkipEmail?: (email: Email) => void;
}

export const EmailList: React.FC<EmailListProps> = ({ emails, onSelectEmail, onShowStats, onSkipEmail }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [skippingId, setSkippingId] = useState<string | null>(null);

  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Graphic Designer': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      'Retail Sales': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      'Food Service': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      'Software Developer': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      'Social Media Manager': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
      'Tutor / Educator': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
      'Photographer': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Restaurant Server': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      'Fitness Trainer': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
      'Real Estate': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
      'Veterinary Assistant': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
      'Auto Mechanic': 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
      'Marketing': 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300',
      'Hair Stylist': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
      'Event Planning': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
      'Customer Support': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
      'Corporate Intern': 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
      'Receptionist': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
      'Freelance Writer': 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300',
      'Video Editor': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      'Babysitter': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
      'Pharmacy Technician': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      'Job Interview': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      'Retail Management': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
      'Dental Assistant': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
      'Delivery Driver': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      'Music Teacher': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
      'Library Assistant': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
      'Phone Sales': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      'Administrative Assistant': 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  };

  const handleSkip = (e: React.MouseEvent, email: Email) => {
    e.stopPropagation();
    setSkippingId(email.id);

    // Vanish animation then callback
    setTimeout(() => {
      if (onSkipEmail) {
        onSkipEmail(email);
      }
      setSkippingId(null);
    }, 300);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between mb-3 sticky top-0 bg-gray-50 dark:bg-dark pb-2 z-10 transition-colors duration-500">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">Available Scenarios</h2>
        <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-dark-100 px-2 py-1 rounded-full font-medium">
          {emails.length} {emails.length === 1 ? 'scenario' : 'scenarios'}
        </span>
      </div>
      <div className="relative">
        <div className="max-h-[420px] lg:max-h-[560px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {emails.length === 0 ? (
            <Card padding="sm">
              <p className="text-gray-600 dark:text-gray-400 text-center py-6 text-sm">
                No scenarios available. Check back later!
              </p>
            </Card>
          ) : (
            emails.map((email, index) => (
          <div
            key={email.id}
            className={`
              relative bg-white dark:bg-dark-50 rounded-lg p-4 cursor-pointer
              transition-all duration-200 ease-out
              ${skippingId === email.id
                ? 'opacity-0 scale-95'
                : 'opacity-100 scale-100'
              }
              border border-gray-200 dark:border-dark-100
              ${hoveredId === email.id ? 'shadow-md' : 'shadow-sm'}
            `}
            onMouseEnter={() => setHoveredId(email.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onSelectEmail(email)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{email.subject}</h3>

                {/* Problem description */}
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                  {truncateText(email.body, 100)}
                </p>

                {/* Metadata footer with colored category */}
                <div className="flex items-center gap-2 text-xs">
                  <span className={`font-medium px-2 py-0.5 rounded ${getCategoryColor(email.category)}`}>
                    {email.category}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="capitalize text-gray-500 dark:text-gray-400">{email.difficulty}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 dark:text-gray-400">~{email.wordCount}w</span>
                </div>
              </div>

              {/* Compact buttons - always visible on hover, no height change */}
              <div
                className={`
                  flex-shrink-0 flex items-center gap-1.5 transition-opacity duration-200
                  ${hoveredId === email.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
              >
                <button
                  onClick={(e) => handleSkip(e, email)}
                  className="px-2.5 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEmail(email);
                  }}
                  className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded transition-colors"
                >
                  Practice
                </button>
              </div>
            </div>
          </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
