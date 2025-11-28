import { AI_LEVEL_THRESHOLDS } from '@/lib/constants/powers';

/**
 * Calculates the AI level based on the number of emails completed
 */
export function calculateAILevel(emailsCompleted: number): number {
  // Find the highest level threshold that has been reached
  let currentLevel = 1;

  for (const threshold of AI_LEVEL_THRESHOLDS) {
    if (emailsCompleted >= threshold.emails_required) {
      currentLevel = threshold.level;
    } else {
      break;
    }
  }

  return currentLevel;
}

/**
 * Calculates the AI power value based on level and completion rate
 */
export function calculateAIPower(level: number, emailsCompleted: number): number {
  // Base power from level
  const basePower = level * 100;

  // Bonus power from total emails (1 point per email)
  const bonusPower = emailsCompleted;

  return basePower + bonusPower;
}

/**
 * Gets the next level threshold information
 */
export function getNextLevelInfo(currentLevel: number, emailsCompleted: number) {
  const nextThreshold = AI_LEVEL_THRESHOLDS.find(t => t.level > currentLevel);

  if (!nextThreshold) {
    return {
      isMaxLevel: true,
      emailsNeeded: 0,
      nextLevel: currentLevel,
      progress: 100,
    };
  }

  const currentThreshold = AI_LEVEL_THRESHOLDS.find(t => t.level === currentLevel);
  const currentRequired = currentThreshold?.emails_required || 0;
  const nextRequired = nextThreshold.emails_required;

  const emailsNeeded = nextRequired - emailsCompleted;
  const range = nextRequired - currentRequired;
  const progress = Math.min(((emailsCompleted - currentRequired) / range) * 100, 100);

  return {
    isMaxLevel: false,
    emailsNeeded,
    nextLevel: nextThreshold.level,
    progress: Math.max(0, progress),
  };
}
