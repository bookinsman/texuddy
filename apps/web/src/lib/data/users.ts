import type { User } from '@texuddy/types';

export const mockUser: User = {
  parentId: 'parent-1',
  studentId: 'student-1',
  studentName: 'Alex',
  studentAge: 10,
  avatar: '👤',
  aiName: 'Thinkmate',
  aiLevel: 1,
  aiPower: 0,
  completedEmails: [],
  totalPoints: 0,
  currentStreak: 0,
  badges: [],
  wordsRetyped: 0
};

export function updateUserProgress(user: User, emailId: string, points: number, wordsRetyped: number): User {
  return {
    ...user,
    completedEmails: [...user.completedEmails, emailId],
    totalPoints: user.totalPoints + points,
    currentStreak: user.currentStreak + 1,
    wordsRetyped: (user.wordsRetyped || 0) + wordsRetyped
  };
}

