export interface BadgeMilestone {
  id: string;
  name: string;
  description: string;
  emoji: string;
  emailsRequired: number;
  unlocks: string;
}

export const BADGE_MILESTONES: BadgeMilestone[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'First achievement!',
    emoji: '🎉',
    emailsRequired: 5,
    unlocks: 'First achievement',
  },
  {
    id: 'getting-started',
    name: 'Beginner',
    description: 'Great progress!',
    emoji: '🌱',
    emailsRequired: 25,
    unlocks: 'Beginner level',
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'Unlocked intermediate situations',
    emoji: '⭐',
    emailsRequired: 50,
    unlocks: 'Intermediate situations',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Unlocked advanced situations',
    emoji: '🌟',
    emailsRequired: 100,
    unlocks: 'Advanced situations',
  },
  {
    id: 'complex',
    name: 'Complex',
    description: 'Unlocked complex situations',
    emoji: '💎',
    emailsRequired: 200,
    unlocks: 'Complex situations',
  },
  {
    id: 'skilled',
    name: 'Skilled',
    description: 'Excellent achievement!',
    emoji: '🎯',
    emailsRequired: 300,
    unlocks: 'Skilled level',
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Unlocked expert level situations',
    emoji: '👑',
    emailsRequired: 400,
    unlocks: 'Expert level situations',
  },
  {
    id: 'master',
    name: 'Master',
    description: 'Incredible achievement!',
    emoji: '🔥',
    emailsRequired: 500,
    unlocks: 'Master level',
  },
  {
    id: 'grand-master',
    name: 'Grand Master',
    description: 'Perfectly done!',
    emoji: '💫',
    emailsRequired: 600,
    unlocks: 'Grand Master level',
  },
  {
    id: 'certificate',
    name: 'Completion Certificate',
    description: 'You earned the completion certificate!',
    emoji: '🏆',
    emailsRequired: 800,
    unlocks: 'Completion certificate',
  },
];

export function getUnlockedBadges(emailsCompleted: number): BadgeMilestone[] {
  return BADGE_MILESTONES.filter(badge => emailsCompleted >= badge.emailsRequired);
}

export function getNextBadge(emailsCompleted: number): BadgeMilestone | null {
  return BADGE_MILESTONES.find(badge => emailsCompleted < badge.emailsRequired) || null;
}

