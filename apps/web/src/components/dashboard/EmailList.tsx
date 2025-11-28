'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@texuddy/ui';
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
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        <div 
          ref={scrollContainerRef}
          className={`${isMobile ? 'space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto' : 'max-h-[420px] lg:max-h-[560px] overflow-y-auto pr-2 space-y-3 custom-scrollbar'}`}
        >
          {emails.length === 0 ? (
            <Card padding="sm">
              <p className="text-gray-600 dark:text-gray-400 text-center py-6 text-sm">
                No scenarios available. Check back later!
              </p>
            </Card>
          ) : (
            <>
              {emails.map((email) => (
                <EmailCard
                  key={email.id}
                  email={email}
                  onSelectEmail={onSelectEmail}
                  onSkipEmail={handleSkip}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  skippingId={skippingId}
                  isMobile={isMobile}
                  truncateText={truncateText}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface EmailCardProps {
  email: Email;
  onSelectEmail: (email: Email) => void;
  onSkipEmail: (e: React.MouseEvent, email: Email) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  skippingId: string | null;
  isMobile: boolean;
  truncateText: (text: string, maxLength?: number) => string;
  getCategoryColor: (category: string) => string;
}

const EmailCard: React.FC<EmailCardProps> = ({
  email,
  onSelectEmail,
  onSkipEmail,
  hoveredId,
  setHoveredId,
  skippingId,
  isMobile,
  truncateText,
  getCategoryColor
}) => {
  const [clickedId, setClickedId] = useState<string | null>(null);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.stopPropagation();
      if (clickedId === email.id) {
        // Second click - open email
        onSelectEmail(email);
        setClickedId(null);
      } else {
        // First click - show buttons
        setClickedId(email.id);
      }
    } else {
      onSelectEmail(email);
    }
  };

  const showButtons = isMobile ? clickedId === email.id : hoveredId === email.id;

  return (
    <div
      className={`
        relative bg-white dark:bg-dark-50 rounded-lg ${isMobile ? 'p-3' : 'p-4'} cursor-pointer
        transition-all duration-200 ease-out
        ${skippingId === email.id
          ? 'opacity-0 scale-95'
          : 'opacity-100 scale-100'
        }
        border border-gray-200 dark:border-dark-100
        ${showButtons ? 'shadow-md' : 'shadow-sm'}
        ${isMobile ? 'w-full' : ''}
      `}
      onMouseEnter={() => !isMobile && setHoveredId(email.id)}
      onMouseLeave={() => !isMobile && setHoveredId(null)}
      onClick={handleCardClick}
    >
      <div className={`flex items-start justify-between ${isMobile ? 'flex-col gap-2' : 'gap-3'}`}>
        <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-0'}`}>
          <h3 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-sm'} mb-2`}>{email.subject}</h3>
          <p className={`text-xs text-gray-600 dark:text-gray-400 ${isMobile ? 'line-clamp-3' : 'line-clamp-2'} mb-2`}>
            {isMobile ? email.body : truncateText(email.body, 100)}
          </p>
          <div className={`flex items-center gap-2 text-xs ${isMobile ? 'flex-wrap' : ''}`}>
            <span className={`font-medium px-2 py-0.5 rounded ${getCategoryColor(email.category)}`}>
              {email.category}
            </span>
            <span className="text-gray-400">•</span>
            <span className="capitalize text-gray-500 dark:text-gray-400">{email.difficulty}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 dark:text-gray-400">~{email.wordCount}w</span>
          </div>
        </div>

        {/* Buttons - Show on hover (desktop) or click (mobile) */}
        {isMobile ? (
          showButtons && (
            <div className="flex-shrink-0 flex items-center gap-2 w-full pt-2 border-t border-gray-200 dark:border-dark-100">
              <button
                onClick={(e) => onSkipEmail(e, email)}
                className="flex-1 px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded transition-colors"
              >
                Skip
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEmail(email);
                }}
                className="flex-1 px-3 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded transition-colors"
              >
                Practice
              </button>
            </div>
          )
        ) : (
          <div
            className={`
              flex-shrink-0 flex items-center gap-1.5 transition-opacity duration-200
              ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
          >
            <button
              onClick={(e) => onSkipEmail(e, email)}
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
        )}
      </div>
    </div>
  );
};
