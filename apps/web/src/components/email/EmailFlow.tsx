'use client';

import React, { useState, useEffect } from 'react';
import { Card, KeywordSelector, RetypingInterfaceMinimal, BuildingResponse } from '@texuddy/ui';
import type { Email } from '@texuddy/types';

interface EmailFlowProps {
  email: Email;
  onComplete: (unlockCode: string) => void;
  onBack: () => void;
  onMarkComplete?: () => void;
  onContinueNext?: () => void;
}

type FlowStep = 'problem' | 'keywords' | 'building' | 'typing' | 'complete';

export const EmailFlow: React.FC<EmailFlowProps> = ({
  email,
  onComplete,
  onBack,
  onMarkComplete,
  onContinueNext
}) => {
  const [step, setStep] = useState<FlowStep>('problem');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  const handleKeywordSelect = (keywords: string[]) => {
    setSelectedKeywords(keywords);
    setStep('building');
  };

  const handleBuildingComplete = () => {
    setStep('typing');
  };

  const handleTypingComplete = (timeSpentSeconds?: number) => {
    setStep('complete');
    setHasCompleted(true);
    setTimeSpent(timeSpentSeconds || 0);
    // Mark as complete immediately but don't close yet
    if (onMarkComplete) {
      onMarkComplete();
    }
    // Call onComplete for unlock code tracking
    setTimeout(() => {
      onComplete(email.rewardCode);
    }, 100);
  };

  const handleBackClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      onBack();
    }, 300);
  };


  if (step === 'problem') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark py-2 sm:py-4 md:py-8 px-3 sm:px-4 transition-colors duration-500">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-100 hover:shadow-md transition-all"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          <div className="bg-white dark:bg-dark-50 rounded-lg border border-gray-200 dark:border-dark-100 overflow-hidden shadow-sm">
            <div className="px-4 sm:px-6 py-4 sm:py-6">
              {/* Scenario Title with Metadata */}
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-dark-100">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{email.category}</span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-xs capitalize text-gray-600 dark:text-gray-400">{email.difficulty}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{email.subject}</h2>
              </div>

              {/* The Situation */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">The Situation</div>
                <div className="bg-gray-50 dark:bg-dark-100/50 rounded-lg p-6 border border-gray-200 dark:border-dark-200">
                  <p className="text-base text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {email.body}
                  </p>
                </div>
              </div>

              {/* Practice goal */}
              <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4 mb-6">
                <div className="text-xs font-semibold text-purple-900 dark:text-purple-300 mb-1">Your Mission:</div>
                <div className="text-sm text-purple-800 dark:text-purple-400">Retype the expert response to build muscle memory (~{email.wordCount} words)</div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBack();
                  }}
                  className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-dark-100 transition-all"
                >
                  Skip
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setStep('typing');
                  }}
                  className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-dark rounded-lg text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
                >
                  Start Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'keywords') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark py-4 sm:py-8 px-4 transition-colors duration-500">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setStep('problem')}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-4 flex items-center gap-1 transition-colors"
          >
            ← Back
          </button>
          <Card className="p-4 sm:p-6 bg-white dark:bg-dark-50 border-gray-200 dark:border-dark-100">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">🤖 Help me create the perfect response!</h2>
              <KeywordSelector email={email} onSelect={handleKeywordSelect} />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'building') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark py-4 sm:py-8 px-4 transition-colors duration-500">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 sm:p-8 bg-white dark:bg-dark-50 border-gray-200 dark:border-dark-100">
            <BuildingResponse
              keywords={selectedKeywords}
              onComplete={handleBuildingComplete}
            />
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'typing') {
    return (
      <RetypingInterfaceMinimal
        response={email.response}
        onComplete={handleTypingComplete}
        onBack={() => setStep('problem')}
        scenarioTitle={email.subject}
        category={email.category}
        difficulty={email.difficulty}
      />
    );
  }

  const handleContinueNext = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onContinueNext) {
        onContinueNext();
      } else {
        onBack();
      }
    }, 300);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center py-4 px-4 ${isClosing ? 'opacity-0' : 'opacity-100'} transition-colors duration-500`}>
      <div className="w-full max-w-md mx-auto">
        <Card className="p-6 sm:p-8 bg-white dark:bg-dark-50 border-gray-200 dark:border-dark-100">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="text-4xl sm:text-5xl">✅</div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2 sm:space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Words:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">+{email.wordCount}</span>
                </div>
                {timeSpent > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Time:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {timeSpent < 60 ? `${timeSpent}s` : `${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Category:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{email.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                  <span className="font-semibold text-gray-900 dark:text-white capitalize">{email.difficulty}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={handleBackClick}
                className="w-full px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-dark rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Back to Scenarios
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
