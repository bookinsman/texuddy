'use client';

import React from 'react';

interface SessionCardProps {
  emailsToday: number;
  timeSpent: number; // in minutes
  avgResponseTime: number; // in seconds
  streakActive: boolean;
}

export function SessionCard({ emailsToday, timeSpent, avgResponseTime, streakActive }: SessionCardProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatAvgTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Today's Session</h3>
        {streakActive && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">🔥 Active</span>}
      </div>

      <div className="space-y-2">
        {/* Emails Today */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">📧 Emails</span>
          <span className="font-bold text-purple-600">{emailsToday}</span>
        </div>

        {/* Time Spent */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">⏱️ Time</span>
          <span className="font-bold text-blue-600">{formatTime(timeSpent)}</span>
        </div>

        {/* Average Response Time */}
        {avgResponseTime > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">⚡ Avg/Email</span>
            <span className="font-bold text-green-600">{formatAvgTime(avgResponseTime)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
