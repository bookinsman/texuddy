'use client';

import React, { useState, useEffect } from 'react';
import { ProgressBar } from './ProgressBar';

interface BuildingResponseProps {
  onComplete: () => void;
  keywords: string[];
}

export const BuildingResponse: React.FC<BuildingResponseProps> = ({
  onComplete,
  keywords
}) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const duration = 3000;
    const steps = 100;
    const interval = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += 1;
      setProgress(current);
      
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => onComplete(), 500);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [onComplete]);
  
  const getStatusMessage = () => {
    if (progress < 20) return 'Analyzing keywords...';
    if (progress < 40) return 'Crafting response structure...';
    if (progress < 60) return 'Writing thoughtful advice...';
    if (progress < 80) return 'Polishing the message...';
    if (progress < 100) return 'Finalizing response...';
    return 'Response ready!';
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">🤖</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thinkmate is crafting your response...</h2>
        <p className="text-gray-600">{getStatusMessage()}</p>
      </div>
      
      <div className="space-y-4">
        <ProgressBar value={progress} max={100} showLabel />
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
          <div className="text-sm font-semibold text-gray-700 mb-2">Using keywords:</div>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={keyword}
                className="bg-white px-3 py-1 rounded-full text-xs font-medium text-purple-700 border border-purple-200"
                style={{
                  opacity: progress > (index + 1) * 20 ? 1 : 0.5,
                  transform: progress > (index + 1) * 20 ? 'scale(1)' : 'scale(0.9)',
                  transition: 'all 0.3s ease'
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

