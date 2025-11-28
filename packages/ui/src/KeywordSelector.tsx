'use client';

import React, { useState } from 'react';
import type { Email } from '@texuddy/types';

interface KeywordSelectorProps {
  email: Email;
  onSelect: (keywords: string[]) => void;
}

export const KeywordSelector: React.FC<KeywordSelectorProps> = ({
  email,
  onSelect
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  
  const toggleKeyword = (keyword: string) => {
    if (selected.includes(keyword)) {
      setSelected(selected.filter(k => k !== keyword));
    } else if (selected.length < 3) {
      setSelected([...selected, keyword]);
    }
  };
  
  const handleGenerate = () => {
    if (selected.length === 3) {
      onSelect(selected);
    }
  };
  
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-700">Pick 3 topics to include:</h3>
      <div className="grid grid-cols-2 gap-2">
        {email.keywords.map((keyword) => {
          const isSelected = selected.includes(keyword);
          return (
            <button
              key={keyword}
              onClick={() => toggleKeyword(keyword)}
              className={`p-2.5 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-purple-600 bg-purple-50 scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl mb-1">{getKeywordIcon(keyword)}</div>
              <div className="text-xs font-medium">{keyword}</div>
            </button>
          );
        })}
      </div>
      <button
        onClick={handleGenerate}
        disabled={selected.length !== 3}
        className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
      >
        Generate Response
      </button>
    </div>
  );
};

function getKeywordIcon(keyword: string): string {
  const icons: Record<string, string> = {
    'Phone': '📱',
    'Brain': '🧠',
    'Time': '⏰',
    'Family': '👨‍👩‍👧',
    'Power': '💪',
    'Sleep': '😴',
    'Friends': '👥',
    'School': '📚',
    'Health': '🏥',
    'Future': '🚀'
  };
  return icons[keyword] || '📌';
}

