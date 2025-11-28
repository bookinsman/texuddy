import type { Career, CareerEngagement, CareerMatch, EmailInteraction } from '@/types/career';

/**
 * Calculates engagement metrics for each career based on user interactions
 */
export function calculateCareerEngagements(interactions: EmailInteraction[]): CareerEngagement[] {
  const careerMap = new Map<string, { helped: number; skipped: number; total: number }>();

  // Group interactions by career
  interactions.forEach((interaction) => {
    const existing = careerMap.get(interaction.careerId) || { helped: 0, skipped: 0, total: 0 };

    if (interaction.action === 'helped') {
      existing.helped += 1;
    } else if (interaction.action === 'skipped') {
      existing.skipped += 1;
    }
    existing.total += 1;

    careerMap.set(interaction.careerId, existing);
  });

  // Convert to engagement array
  const engagements: CareerEngagement[] = Array.from(careerMap.entries()).map(([careerId, stats]) => ({
    career_id: careerId,
    helped: stats.helped,
    skipped: stats.skipped,
    total: stats.total,
    engagement_rate: stats.total > 0 ? stats.helped / stats.total : 0,
  }));

  // Sort by engagement rate
  return engagements.sort((a, b) => b.engagement_rate - a.engagement_rate);
}

/**
 * Generates career matches with fit levels and confidence scores
 */
export function generateCareerMatches(
  engagements: CareerEngagement[],
  careers: Career[]
): CareerMatch[] {
  return engagements.map((engagement) => {
    const career = careers.find((c) => c.id === engagement.career_id);

    if (!career) {
      throw new Error(`Career not found: ${engagement.career_id}`);
    }

    // Determine fit level based on engagement rate
    let fit_level: CareerMatch['fit_level'];
    if (engagement.engagement_rate >= 0.8) {
      fit_level = 'perfect';
    } else if (engagement.engagement_rate >= 0.6) {
      fit_level = 'good';
    } else if (engagement.engagement_rate >= 0.4) {
      fit_level = 'moderate';
    } else {
      fit_level = 'not_recommended';
    }

    // Determine confidence based on sample size
    let confidence: CareerMatch['confidence'];
    if (engagement.total >= 15) {
      confidence = 'high';
    } else if (engagement.total >= 8) {
      confidence = 'medium';
    } else {
      confidence = 'low';
    }

    // Calculate lifetime earnings (30-year career assumption)
    // Simplified: 5 years entry, 10 years mid, 15 years senior
    const lifetimeEarnings =
      (career.salary_entry * 12 * 5) +
      (career.salary_mid * 12 * 10) +
      (career.salary_senior * 12 * 15);

    return {
      career,
      engagement,
      fit_level,
      confidence,
      lifetime_earnings: lifetimeEarnings,
    };
  });
}

/**
 * Generates AI insights based on career engagement patterns
 */
export function generateCareerInsights(matches: CareerMatch[]): string[] {
  const insights: string[] = [];

  if (matches.length === 0) {
    return ['Complete more emails to discover your career preferences.'];
  }

  const topMatch = matches[0];
  const topRate = topMatch.engagement.engagement_rate;

  // Insight 1: Top career strength
  if (topRate >= 0.8) {
    insights.push(
      `Strong affinity for ${topMatch.career.name} - you helped ${Math.round(topRate * 100)}% of related emails.`
    );
  } else if (topRate >= 0.6) {
    insights.push(
      `Good compatibility with ${topMatch.career.name} - shows consistent interest.`
    );
  }

  // Insight 2: Pattern detection
  const helpCounts = matches.map(m => m.engagement.helped);
  const avgHelp = helpCounts.reduce((a, b) => a + b, 0) / helpCounts.length;
  const variance = helpCounts.reduce((sum, val) => sum + Math.pow(val - avgHelp, 2), 0) / helpCounts.length;

  if (variance < avgHelp * 0.5) {
    insights.push('You show consistent engagement across different career types - versatile problem solver.');
  } else {
    insights.push('You have clear preferences - selective about the work you engage with.');
  }

  // Insight 3: Comparison with others
  const highEngagementCount = matches.filter(m => m.engagement.engagement_rate >= 0.7).length;
  if (highEngagementCount >= 5) {
    insights.push(`You excel in ${highEngagementCount} different career areas - multi-talented individual.`);
  } else if (highEngagementCount >= 3) {
    insights.push(`You show strong interest in ${highEngagementCount} career paths - focused learner.`);
  } else if (highEngagementCount === 1) {
    insights.push('You have a clear specialty - deep focus on one career area.');
  }

  // Insight 4: Market demand correlation
  const topCareerDemand = topMatch.career.demand_level;
  if (topCareerDemand === 'critical' || topCareerDemand === 'high') {
    insights.push(
      `Great news! Your top match (${topMatch.career.name}) is in ${topCareerDemand} demand with ${topMatch.career.cvbankas_jobs_count} open positions.`
    );
  }

  return insights;
}
