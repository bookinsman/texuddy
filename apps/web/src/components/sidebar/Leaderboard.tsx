'use client';

import React, { useMemo } from 'react';

interface LeaderboardProps {
  userWords: number;
  userName: string;
  userCompletedSubjects: string[];
}

interface LeaderboardPlayer {
  rank: number;
  name: string;
  words: number;
  scenariosCompleted: number;
  isCurrentUser: boolean;
  avatar?: string;
}

export function Leaderboard({ userWords, userName, userCompletedSubjects }: LeaderboardProps) {
  // Generate mock leaderboard data (top 20 players)
  const leaderboardData = useMemo<LeaderboardPlayer[]>(() => {
    const mockPlayers: LeaderboardPlayer[] = [];
    const scenarioCounts = [45, 42, 38, 35, 32, 30, 28, 25, 23, 20, 18, 15, 12, 10, 8, 6, 5, 4, 3, 2];
    const wordCounts = [125000, 118000, 105000, 95000, 85000, 78000, 72000, 65000, 58000, 52000, 48000, 42000, 38000, 34000, 30000, 26000, 22000, 18000, 15000, 12000];
    
    // Generate 20 players
    for (let i = 0; i < 20; i++) {
      const isCurrentUser = i === 4; // User is at rank 5
      mockPlayers.push({
        rank: i + 1,
        name: isCurrentUser ? userName : `Player ${i + 1}`,
        words: isCurrentUser ? userWords : wordCounts[i],
        scenariosCompleted: isCurrentUser ? userCompletedSubjects.length : scenarioCounts[i],
        isCurrentUser
      });
    }
    
    return mockPlayers;
  }, [userWords, userName, userCompletedSubjects]);

  const currentUserRank = leaderboardData.findIndex(p => p.isCurrentUser) + 1;
  const playerAbove = currentUserRank > 1 ? leaderboardData[currentUserRank - 2] : null;
  const wordsToNext = playerAbove ? Math.max(0, playerAbove.words - userWords + 1) : 0;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '👑';
      case 2: return '⭐';
      case 3: return '🔥';
      default: return null;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white';
    if (rank === 3) return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
    return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
  };

  return (
    <div className="h-full flex flex-col">
      {/* User's Position Card - Premium Design */}
      <div className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-white dark:from-dark-100 dark:to-dark-50 rounded-xl border border-gray-200 dark:border-dark-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${getRankBadge(currentUserRank)} flex items-center justify-center text-base font-bold shadow-md`}>
              #{currentUserRank}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{userName}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Your Position</div>
            </div>
          </div>
          {getRankIcon(currentUserRank) && (
            <span className="text-3xl">{getRankIcon(currentUserRank)}</span>
          )}
        </div>

        {playerAbove && wordsToNext > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-3 border border-purple-200/50 dark:border-purple-800/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold">↑</span>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">Words to reach #{currentUserRank - 1}</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{wordsToNext.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
          <span className="text-base">🏆</span>
          Top Players
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">20</span>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1">
        {leaderboardData.map((player) => {
          const rankIcon = getRankIcon(player.rank);
          const isTopThree = player.rank <= 3;
          
          return (
            <div
              key={player.rank}
              className={`group flex items-center gap-2.5 p-2.5 rounded-lg border transition-all ${
                player.isCurrentUser
                  ? 'bg-white dark:bg-dark-50 border-gray-200 dark:border-dark-200'
                  : isTopThree
                    ? 'bg-gradient-to-r from-white to-gray-50 dark:from-dark-50 dark:to-dark-100 border-gray-200 dark:border-dark-200 hover:shadow-md'
                    : 'bg-white dark:bg-dark-50 border-gray-100 dark:border-dark-100 hover:bg-gray-50 dark:hover:bg-dark-100'
              }`}
            >
              {/* Rank Badge */}
              <div className="flex-shrink-0">
                {rankIcon ? (
                  <div className="relative">
                    <span className="text-xl">{rankIcon}</span>
                    <span className="absolute -bottom-1 -right-1 text-[8px] font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-100 rounded-full w-4 h-4 flex items-center justify-center border border-gray-200 dark:border-dark-200">
                      {player.rank}
                    </span>
                  </div>
                ) : (
                  <div className={`w-7 h-7 rounded-lg ${getRankBadge(player.rank)} flex items-center justify-center text-xs font-bold`}>
                    {player.rank}
                  </div>
                )}
              </div>

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate mb-0.5 text-gray-900 dark:text-white">
                  {player.name}
                  {player.isCurrentUser && (
                    <span className="ml-1 text-[10px] text-gray-500 dark:text-gray-400">(You)</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-0.5">
                    <span>📝</span>
                    <span>{player.scenariosCompleted} scenarios</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <span>⌨️</span>
                    <span>{player.words.toLocaleString()} words</span>
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
