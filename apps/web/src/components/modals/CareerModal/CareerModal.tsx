'use client';

import React from 'react';
import { CareerMatchCard } from './CareerMatchCard';
import { SalaryDisplay } from './SalaryDisplay';
import { useCareers } from '@/hooks/useCareers';

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalEmailsCompleted: number;
}

export function CareerModal({ isOpen, onClose, totalEmailsCompleted }: CareerModalProps) {
  const { report, isLoading } = useCareers();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Career Discovery Report</h2>
            <p className="text-sm text-gray-600 mt-1">Based on {totalEmailsCompleted} emails analyzed</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Warning if insufficient data */}
          {totalEmailsCompleted < 50 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">⚠️</div>
                <div>
                  <h3 className="font-semibold text-yellow-800">Limited Data</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    You&apos;ve only completed {totalEmailsCompleted} emails. For more accurate career insights,
                    we recommend completing at least 50 emails (currently {Math.round((totalEmailsCompleted / 50) * 100)}% there).
                  </p>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-500">Analyzing your career preferences...</div>
            </div>
          ) : report && report.matches.length > 0 ? (
            <div className="space-y-6">
              {/* Top Career Matches */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Your Top Career Matches
                </h3>
                <div className="space-y-4">
                  {report.matches.slice(0, 5).map((match, index) => (
                    <CareerMatchCard
                      key={match.career.id}
                      match={match}
                      rank={index + 1}
                    />
                  ))}
                </div>
              </div>

              {/* Salary Comparison */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  💰 Salary Potential (Top Match)
                </h3>
                {report.matches[0] && (
                  <SalaryDisplay
                    entry={report.matches[0].career.salary_entry}
                    mid={report.matches[0].career.salary_mid}
                    senior={report.matches[0].career.salary_senior}
                    lifetimeEarnings={report.matches[0].lifetime_earnings}
                  />
                )}
              </div>

              {/* Career Insights */}
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  🎯 Your Career Personality
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  {report.insights && report.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-purple-500">•</span>
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Market Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">Jobs Available (CVBankas)</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {report.matches[0]?.career.cvbankas_jobs_count || 0}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-sm text-gray-600 mb-1">Market Demand</div>
                  <div className="text-2xl font-bold text-green-600 capitalize">
                    {report.matches[0]?.career.demand_level || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500">No career data available yet. Keep practicing!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
