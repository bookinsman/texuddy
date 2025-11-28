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

export default function SoloPage() {
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
  const [activeTab, setActiveTab] = useState<'available' | 'skipped' | 'completed' | 'stats' | 'progress' | 'badges' | 'leaderboard'>('available');
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
  
  // Solo grinder mode - always true
  const isSoloGrinder = true;
  
  // Get user name from localStorage if available
  const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') || 'Solo Grinder' : 'Solo Grinder';
  const userAge = typeof window !== 'undefined' ? parseInt(localStorage.getItem('userAge') || '12') : 12;
  
  // Create user object for solo grinder
  const updatedUser = useMemo(() => {
    return {
      ...mockUser,
      studentName: userName,
      studentAge: userAge,
      completedEmails: completedEmails,
      wordsRetyped: dailyStats.reduce((sum, stat) => sum + stat.wordsRetyped, 0),
    };
  }, [userName, userAge, completedEmails, dailyStats]);

  const availableEmails = useMemo(() => {
    const allEmails = getEmailsByAge(userAge);
    return allEmails.filter(
      email => 
        !completedEmails.includes(email.id) && 
        !skippedEmails.includes(email.id) &&
        !requestedEmails.includes(email.id)
    );
  }, [userAge, completedEmails, skippedEmails, requestedEmails]);

  const skippedEmailsList = useMemo(() => {
    return getEmailsByAge(userAge).filter(email => skippedEmails.includes(email.id));
  }, [userAge, skippedEmails]);

  const completedEmailsList = useMemo(() => {
    return getEmailsByAge(userAge).filter(email => completedEmails.includes(email.id));
  }, [userAge, completedEmails]);

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleSkipEmail = (email: Email) => {
    setSkippedEmails(prev => {
      const updated = [...prev, email.id];
      if (typeof window !== 'undefined') {
        localStorage.setItem('skippedEmails', JSON.stringify(updated));
      }
      return updated;
    });
    setSelectedEmail(null);
  };

  const handleComplete = (unlockCode: string) => {
    if (selectedEmail) {
      setCompletedEmails(prev => {
        const updated = [...prev, selectedEmail.id];
        if (typeof window !== 'undefined') {
          localStorage.setItem('completedEmails', JSON.stringify(updated));
        }
        return updated;
      });
      
      // Update daily stats
      const today = new Date().toISOString().split('T')[0];
      setDailyStats(prev => {
        const existing = prev.find(s => s.date === today);
        const updated = existing
          ? prev.map(s => 
              s.date === today 
                ? { ...s, helped: s.helped + 1, wordsRetyped: s.wordsRetyped + selectedEmail.wordCount }
                : s
            )
          : [...prev, { date: today, helped: 1, wordsRetyped: selectedEmail.wordCount }];
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('dailyStats', JSON.stringify(updated));
        }
        return updated;
      });
      
      setSelectedEmail(null);
    }
  };

  const handleMarkComplete = () => {
    if (selectedEmail) {
      handleComplete('');
    }
  };

  const handleBack = () => {
    setSelectedEmail(null);
  };

  const handleContinueNext = () => {
    if (selectedEmail) {
      handleComplete('');
      const currentIndex = availableEmails.findIndex(e => e.id === selectedEmail.id);
      if (currentIndex < availableEmails.length - 1) {
        setSelectedEmail(availableEmails[currentIndex + 1]);
      } else {
        setSelectedEmail(null);
      }
    }
  };

  const handleShowStats = () => {
    setActiveTab('stats');
  };

  const handleTabChange = (tab: 'available' | 'skipped' | 'completed' | 'stats' | 'progress' | 'badges' | 'goals' | 'leaderboard') => {
    // Filter out 'goals' tab for solo grinder
    if (tab !== 'goals') {
      setActiveTab(tab as 'available' | 'skipped' | 'completed' | 'stats' | 'progress' | 'badges' | 'leaderboard');
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
      onTabChange={handleTabChange}
      dailyStats={dailyStats}
      isSoloGrinder={isSoloGrinder}
    />
  );
}

