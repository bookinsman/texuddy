/**
 * AI Level thresholds based on emails completed
 */
export const AI_LEVEL_THRESHOLDS = [
  { level: 1, emails_required: 0 },
  { level: 2, emails_required: 10 },
  { level: 3, emails_required: 25 },
  { level: 4, emails_required: 50 },
  { level: 5, emails_required: 100 },
  { level: 6, emails_required: 150 },
  { level: 7, emails_required: 225 },
  { level: 8, emails_required: 325 },
  { level: 9, emails_required: 425 },
  { level: 10, emails_required: 500 },
] as const;

/**
 * AI Powers that unlock at different levels
 */
export const AI_POWERS = [
  {
    id: 'power-basic-help',
    name: 'Basic Assistance',
    icon: '🤖',
    description: 'AI helps you understand email context',
    unlockLevel: 1,
  },
  {
    id: 'power-spell-check',
    name: 'Spell Check',
    icon: '✍️',
    description: 'Auto-detect spelling mistakes',
    unlockLevel: 2,
  },
  {
    id: 'power-suggestions',
    name: 'Smart Suggestions',
    icon: '💡',
    description: 'Get phrase suggestions while typing',
    unlockLevel: 3,
  },
  {
    id: 'power-tone-analysis',
    name: 'Tone Analysis',
    icon: '🎭',
    description: 'Check if your response tone is appropriate',
    unlockLevel: 4,
  },
  {
    id: 'power-career-hints',
    name: 'Career Hints',
    icon: '🎯',
    description: 'See partial career insights',
    unlockLevel: 5,
  },
  {
    id: 'power-time-estimate',
    name: 'Time Estimation',
    icon: '⏱️',
    description: 'AI predicts how long emails will take',
    unlockLevel: 6,
  },
  {
    id: 'power-translation',
    name: 'Translation Help',
    icon: '🌍',
    description: 'Translate difficult professional terms',
    unlockLevel: 7,
  },
  {
    id: 'power-examples',
    name: 'Example Library',
    icon: '📚',
    description: 'Access similar response examples',
    unlockLevel: 8,
  },
  {
    id: 'power-advanced-stats',
    name: 'Advanced Analytics',
    icon: '📊',
    description: 'Detailed performance breakdown',
    unlockLevel: 9,
  },
  {
    id: 'power-full-report',
    name: 'Full Career Report',
    icon: '🎓',
    description: 'Unlock complete career assessment',
    unlockLevel: 10,
  },
] as const;
