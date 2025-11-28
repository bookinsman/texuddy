export interface Email {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  category: string;
  icon: string;
  reward: string;
  rewardCode: string;
  body: string;
  response: string;
  wordCount: number;
  keywords: string[];
  ageLevel: 9 | 12;
  difficulty: 'easy' | 'medium' | 'hard';
  urgent?: boolean;
  parentRequested?: boolean;
}

export interface User {
  parentId: string;
  studentId: string;
  studentName: string;
  studentAge: number;
  avatar?: string;
  aiName: string;
  aiLevel: number;
  aiPower: number;
  completedEmails: string[];
  totalPoints: number;
  currentStreak: number;
  badges: Badge[];
  lastLoginDate?: string;
  wordsRetyped: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: string;
  type: 'daily' | 'weekly' | 'achievement';
}

export interface AICompanion {
  name: string;
  level: number;
  power: number;
  powers: AIPower[];
  nextUpgradeAt: number;
}

export interface AIPower {
  id: string;
  name: string;
  unlocked: boolean;
  description: string;
}

export interface Reward {
  id: string;
  type: 'candy' | 'screen_time' | 'allowance' | 'game_time' | 'bike_points' | 'custom';
  name: string;
  value?: string;
  unlockCode: string;
}

export type UserRole = 'parent' | 'student';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  parentId?: string;
}

