'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  const [filteredAvailableEmails, setFilteredAvailableEmails] = useState<Email[]>([]);
  const [currentModule, setCurrentModule] = useState<'Mixed' | 'Careers' | 'Philosophy' | 'Psychology' | 'Sales' | 'Motivation' | 'Quotes' | 'Communications'>('Mixed');
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

  // Recalculate filtered emails whenever availableEmails or module changes
  useEffect(() => {
    if (currentModule === 'Mixed') {
      setFilteredAvailableEmails(availableEmails);
      return;
    }
    
    const moduleCategoryMap: Record<string, string[]> = {
      'Careers': ['Graphic Designer', 'Retail Sales', 'Food Service', 'Software Developer', 'Social Media Manager', 'Tutor / Educator', 'Photographer', 'Restaurant Server', 'Fitness Trainer', 'Real Estate', 'Veterinary Assistant', 'Auto Mechanic', 'Marketing', 'Hair Stylist', 'Event Planning', 'Customer Support', 'Corporate Intern', 'Receptionist', 'Freelance Writer', 'Video Editor', 'Babysitter', 'Pharmacy Technician', 'Job Interview', 'Retail Management', 'Dental Assistant', 'Delivery Driver', 'Music Teacher', 'Library Assistant', 'Phone Sales', 'Administrative Assistant', 'Careers'],
      'Philosophy': ['Philosophy'],
      'Psychology': ['Psychology'],
      'Sales': ['Sales'],
      'Motivation': ['Motivation'],
      'Quotes': ['Quotes'],
      'Communications': ['Communications']
    };
    
    const categoriesInModule = moduleCategoryMap[currentModule] || [];
    const filtered = availableEmails.filter(email => categoriesInModule.includes(email.category));
    setFilteredAvailableEmails(filtered);
  }, [availableEmails, currentModule]);

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
    // Don't set selectedEmail to null here - let EmailFlow show completion screen
    // The completion screen will handle going back via onBack or onContinueNext
  };

  const handleMarkComplete = () => {
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
    }
  };

  const handleBack = () => {
    setSelectedEmail(null);
  };

  const handleContinueNext = () => {
    if (selectedEmail) {
      // Always use filteredAvailableEmails (it's kept in sync with availableEmails and module)
      const emailsToUse = filteredAvailableEmails.length > 0 ? filteredAvailableEmails : availableEmails;
      
      // Ensure we have valid emails to work with
      if (!emailsToUse || emailsToUse.length === 0) {
        setSelectedEmail(null);
        return;
      }
      
      // Find current email index - if not found (was just completed), start from beginning
      const currentIndex = emailsToUse.findIndex(e => e && e.id === selectedEmail.id);
      
      if (currentIndex >= 0 && currentIndex < emailsToUse.length - 1) {
        // Found current email and there's a next one
        const nextEmail = emailsToUse[currentIndex + 1];
        if (nextEmail && nextEmail.id && nextEmail.subject && nextEmail.body) {
          setSelectedEmail(nextEmail);
          return;
        }
      } else if (currentIndex === -1 && emailsToUse.length > 0) {
        // Current email not found (was completed), go to first available
        const firstEmail = emailsToUse[0];
        if (firstEmail && firstEmail.id && firstEmail.subject && firstEmail.body) {
          setSelectedEmail(firstEmail);
          return;
        }
      }
      
      // No more emails available, go back to dashboard
      setSelectedEmail(null);
    } else {
      setSelectedEmail(null);
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
      onFilteredEmailsChange={(emails) => {
        setFilteredAvailableEmails(emails);
      }}
      onModuleChange={setCurrentModule}
    />
  );
}

