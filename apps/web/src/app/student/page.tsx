'use client';

import React, { useState, useMemo } from 'react';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { EmailFlow } from '@/components/email/EmailFlow';
import { mockUser } from '@/lib/data/users';
import { getEmailsByAge, getEmailById } from '@/lib/data/emails';
import type { Email } from '@texuddy/types';

interface DailyStats {
  date: string;
  helped: number;
  wordsRetyped: number;
}

export default function StudentPage() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [requestedEmails, setRequestedEmails] = useState<string[]>([]);
  const [completedEmails, setCompletedEmails] = useState<string[]>(() => {
    // Load from localStorage on initial render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completedEmails');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse completedEmails from localStorage', e);
        }
      }
    }
    return [];
  });
  const [skippedEmails, setSkippedEmails] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'available' | 'skipped' | 'completed' | 'stats' | 'progress' | 'badges' | 'goals'>('available');
  const [dailyStats, setDailyStats] = useState<DailyStats[]>(() => {
    // Load from localStorage on initial render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dailyStats');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse dailyStats from localStorage', e);
        }
      }
    }
    return [];
  });
  
  // Check if user is in solo grinder mode
  const isSoloGrinder = typeof window !== 'undefined' && localStorage.getItem('userMode') === 'solo';

  // Save dailyStats to localStorage whenever it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined' && dailyStats.length > 0) {
      localStorage.setItem('dailyStats', JSON.stringify(dailyStats));
    }
  }, [dailyStats]);

  // Save completedEmails to localStorage whenever it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined' && completedEmails.length > 0) {
      localStorage.setItem('completedEmails', JSON.stringify(completedEmails));
    }
  }, [completedEmails]);

  // Redirect from goals tab if solo grinder
  React.useEffect(() => {
    if (isSoloGrinder && activeTab === 'goals') {
      setActiveTab('available');
    }
  }, [isSoloGrinder, activeTab]);
  
  const allEmails = getEmailsByAge(mockUser.studentAge);

  // Calculate total words retyped from dailyStats
  const totalWordsRetyped = useMemo(() => {
    return dailyStats.reduce((sum, stat) => sum + stat.wordsRetyped, 0);
  }, [dailyStats]);

  // Update mock user with current stats
  const updatedUser = useMemo(() => ({
    ...mockUser,
    wordsRetyped: totalWordsRetyped,
    currentStreak: dailyStats.length > 0 ? Math.max(1, dailyStats.length) : 0
  }), [totalWordsRetyped, dailyStats.length]);
  
  React.useEffect(() => {
    if (completedEmails.length > 0 && dailyStats.length === 0) {
      const today = new Date().toISOString().split('T')[0];
      const statsMap = new Map<string, DailyStats>();
      
      completedEmails.forEach(emailId => {
        const email = allEmails.find(e => e.id === emailId);
        if (email) {
          const wordsRetyped = email.wordCount || 0;
          
          const existing = statsMap.get(today) || { date: today, helped: 0, wordsRetyped: 0 };
          statsMap.set(today, {
            date: today,
            helped: existing.helped + 1,
            wordsRetyped: existing.wordsRetyped + wordsRetyped,
          });
        }
      });
      
      if (statsMap.size > 0) {
        setDailyStats(Array.from(statsMap.values()));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedEmails.length]);
  const availableEmails = allEmails
    .filter(email => !completedEmails.includes(email.id) && !skippedEmails.includes(email.id))
    .map((email, index) => ({
      ...email,
      parentRequested: requestedEmails.includes(email.id),
      urgent: requestedEmails.includes(email.id) || index < 2
    }));
  
  const completedEmailsList = allEmails
    .filter(email => completedEmails.includes(email.id))
    .map(email => ({ ...email }));
  
  const skippedEmailsList = allEmails
    .filter(email => skippedEmails.includes(email.id))
    .map(email => ({ ...email }));
  
  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleSkipEmail = (email: Email) => {
    setSkippedEmails(prev => [...prev, email.id]);
  };

  const handleShowStats = () => {
    setActiveTab('stats');
  };

  const handleComplete = (unlockCode: string) => {
    console.log('Email completed! Unlock code:', unlockCode);
  };

  const handleMarkComplete = () => {
    if (selectedEmail) {
      const today = new Date().toISOString().split('T')[0];
      const wordsRetyped = selectedEmail.wordCount || 0;
      
      setCompletedEmails(prev => [...prev, selectedEmail.id]);
      
      setDailyStats(prev => {
        const existing = prev.find(s => s.date === today);
        if (existing) {
          return prev.map(s => 
            s.date === today 
              ? { ...s, helped: s.helped + 1, wordsRetyped: s.wordsRetyped + wordsRetyped }
              : s
          );
        }
        return [...prev, { date: today, helped: 1, wordsRetyped }];
      });
      
      setActiveTab('completed');
    }
  };
  
  const handleBack = () => {
    setSelectedEmail(null);
  };

  const handleContinueNext = () => {
    if (selectedEmail) {
      const currentIndex = availableEmails.findIndex(e => e.id === selectedEmail.id);
      const nextEmail = availableEmails[currentIndex + 1] || availableEmails[0];
      
      if (nextEmail) {
        setSelectedEmail(nextEmail);
      } else {
        setSelectedEmail(null);
      }
    }
  };
  
  if (selectedEmail) {
    return (
      <EmailFlow
        email={selectedEmail}
        onComplete={handleComplete}
        onMarkComplete={handleMarkComplete}
        onBack={handleBack}
        onContinueNext={handleContinueNext}
      />
    );
  }
  
  return (
    <StudentDashboard
      user={updatedUser}
      emails={availableEmails}
      skippedEmails={skippedEmailsList}
      completedEmails={completedEmailsList}
      activeTab={activeTab}
      onSelectEmail={handleSelectEmail}
      onSkipEmail={handleSkipEmail}
      onShowStats={handleShowStats}
      onTabChange={setActiveTab}
      dailyStats={dailyStats}
      isSoloGrinder={isSoloGrinder}
    />
  );
}

