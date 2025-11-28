export const AI_LEVEL_THRESHOLDS = [0, 10, 25, 50, 100];

export const AI_LEVEL_NAMES = {
  1: 'Basic Helper',
  2: 'Smart Helper',
  3: 'Expert Helper',
  4: 'Master Helper',
  5: 'Genius Helper'
};

export const POINTS_PER_EMAIL = 50;

export const BADGES = {
  HELPER: { id: 'helper', name: 'Helper', icon: '⭐', threshold: 5 },
  EXPERT: { id: 'expert', name: 'Expert', icon: '🌟', threshold: 10 },
  MASTER: { id: 'master', name: 'Master', icon: '✨', threshold: 25 },
  GENIUS: { id: 'genius', name: 'Genius', icon: '🏆', threshold: 50 }
};

export const REWARD_TYPES = {
  CANDY: 'candy',
  SCREEN_TIME: 'screen_time',
  ALLOWANCE: 'allowance',
  GAME_TIME: 'game_time',
  BIKE_POINTS: 'bike_points',
  CUSTOM: 'custom'
} as const;

