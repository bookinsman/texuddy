/**
 * Career information from CVBankas integration
 */
export interface Career {
  id: string;
  name: string;
  name_lt: string; // Lithuanian name
  salary_entry: number; // Monthly salary in EUR
  salary_mid: number;
  salary_senior: number;
  cvbankas_jobs_count: number;
  demand_level: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
}

/**
 * User interaction with an email
 */
export interface EmailInteraction {
  email_id: string;
  careerId: string;
  action: 'helped' | 'skipped';
  timestamp: string;
  time_spent_seconds?: number;
  words_typed?: number;
}

/**
 * Engagement metrics for a specific career
 */
export interface CareerEngagement {
  career_id: string;
  helped: number;
  skipped: number;
  total: number;
  engagement_rate: number; // helped / total
}

/**
 * Career match result with fit analysis
 */
export interface CareerMatch {
  career: Career;
  engagement: CareerEngagement;
  fit_level: 'not_recommended' | 'moderate' | 'good' | 'perfect';
  confidence: 'low' | 'medium' | 'high';
  lifetime_earnings: number; // Estimated over 30 years
}

/**
 * Complete career discovery report
 */
export interface CareerReport {
  user_id: string;
  matches: CareerMatch[];
  insights: string[];
  total_emails_analyzed: number;
  generated_at: string;
}
