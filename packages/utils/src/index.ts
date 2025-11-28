import type { Email, User, AICompanion, Badge } from '@texuddy/types';

export function calculateAILevel(completedEmails: number): number {
  if (completedEmails >= 100) return 5;
  if (completedEmails >= 51) return 4;
  if (completedEmails >= 26) return 3;
  if (completedEmails >= 11) return 2;
  return 1;
}

export function calculateAIPower(completedEmails: number, currentLevel: number): number {
  const levelThresholds = [0, 10, 25, 50, 100];
  const currentThreshold = levelThresholds[currentLevel - 1] || 0;
  const nextThreshold = levelThresholds[currentLevel] || 100;
  const progress = completedEmails - currentThreshold;
  const range = nextThreshold - currentThreshold;
  return Math.min(100, Math.round((progress / range) * 100));
}

export function getNextUpgradeAt(currentLevel: number): number {
  const thresholds = [10, 25, 50, 100];
  return thresholds[currentLevel - 1] || 100;
}

export function calculatePoints(email: Email): number {
  return 50;
}

export function checkStreak(lastLoginDate: string | undefined, currentDate: string): number {
  if (!lastLoginDate) return 1;
  
  const lastLogin = new Date(lastLoginDate);
  const today = new Date(currentDate);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastLogin.toDateString() === today.toDateString()) {
    return 0;
  }
  
  if (lastLogin.toDateString() === yesterday.toDateString()) {
    return 1;
  }
  
  return 0;
}

export function getUnlockCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getAIPowers(level: number): string[] {
  const powers: Record<number, string[]> = {
    1: ['smart'],
    2: ['smart', 'fast'],
    3: ['smart', 'fast', 'creative'],
    4: ['smart', 'fast', 'creative', 'empathy'],
    5: ['smart', 'fast', 'creative', 'empathy', 'professional', 'humor']
  };
  return powers[level] || powers[1];
}

