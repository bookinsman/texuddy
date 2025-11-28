/**
 * Calculates points earned for completing an email
 * Formula: words typed × 1.5 multiplier
 */
export function calculateEmailPoints(wordCount: number): number {
  return Math.floor(wordCount * 1.5);
}

/**
 * Calculates points with difficulty bonus
 */
export function calculatePointsWithDifficulty(
  wordCount: number,
  difficulty: 'easy' | 'medium' | 'hard'
): number {
  const basePoints = calculateEmailPoints(wordCount);

  const difficultyMultiplier = {
    easy: 1.0,
    medium: 1.2,
    hard: 1.5,
  };

  return Math.floor(basePoints * difficultyMultiplier[difficulty]);
}

/**
 * Calculates streak bonus points
 */
export function calculateStreakBonus(streak: number): number {
  if (streak < 3) return 0;
  if (streak < 7) return 50;
  if (streak < 14) return 100;
  if (streak < 30) return 200;
  return 500; // 30+ days
}

/**
 * Calculates total points including all bonuses
 */
export function calculateTotalPoints(
  wordCount: number,
  difficulty: 'easy' | 'medium' | 'hard',
  streak: number
): number {
  const basePoints = calculatePointsWithDifficulty(wordCount, difficulty);
  const streakBonus = calculateStreakBonus(streak);

  return basePoints + streakBonus;
}
