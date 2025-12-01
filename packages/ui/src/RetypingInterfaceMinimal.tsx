'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface RetypingInterfaceMinimalProps {
  response: string;
  onComplete: (timeSpent?: number) => void;
  onBack?: () => void;
  scenarioTitle?: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

// Skip special characters (punctuation, etc.)
const isSkippedChar = (char: string) => {
  return /[^a-zA-Z0-9\s]/.test(char);
};

// Find the first index that isn't a special character
const getInitialIndex = (text: string) => {
  let i = 0;
  while (i < text.length && isSkippedChar(text[i])) {
    i++;
  }
  return i;
};

export const RetypingInterfaceMinimal: React.FC<RetypingInterfaceMinimalProps> = ({
  response,
  onComplete,
  onBack,
  scenarioTitle,
  category,
  difficulty = 'medium'
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => getInitialIndex(response));
  const [startTime, setStartTime] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(22);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wordCount = response.split(/\s+/).length;

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setKeyboardHeight(0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleResize = () => {
      // Use visualViewport API for modern browsers (iOS Safari, Chrome Android)
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const heightDiff = windowHeight - viewportHeight;
        setKeyboardHeight(Math.max(0, heightDiff));
      } else {
        // Fallback for older browsers
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.clientHeight;
        const heightDiff = windowHeight - documentHeight;
        setKeyboardHeight(Math.max(0, heightDiff));
      }
    };

    // Listen to visualViewport resize (iOS Safari, Chrome Android)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
      handleResize();
      return () => {
        window.visualViewport?.removeEventListener('resize', handleResize);
        window.visualViewport?.removeEventListener('scroll', handleResize);
      };
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      };
    }
  }, [isMobile]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Cleanup scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Stable scroll function - prevents bouncing
  const scrollToActiveChar = useCallback(() => {
    if (!activeCharRef.current || !containerRef.current || isScrollingRef.current) return;

    const container = containerRef.current;
    const element = activeCharRef.current;

    // Clear any pending scroll
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Debounce scroll to prevent rapid firing
    scrollTimeoutRef.current = setTimeout(() => {
      if (!element || !container) return;

      isScrollingRef.current = true;

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      if (isMobile && keyboardHeight > 0) {
        // Mobile with keyboard - keep text above keyboard
        const viewport = window.visualViewport;
        if (!viewport) {
          isScrollingRef.current = false;
          return;
        }

        const keyboardTop = viewport.offsetTop + viewport.height;
        const elementBottom = elementRect.bottom;
        const lineHeight = fontSize * 1.5;
        const safeZone = lineHeight * 2.5; // 2.5 lines above keyboard

        // Only scroll if element is too close to keyboard
        if (elementBottom > keyboardTop - safeZone) {
          const elementTopRelative = elementRect.top - containerRect.top + container.scrollTop;
          const visibleAreaTop = containerRect.top;
          const visibleAreaBottom = keyboardTop;
          const visibleAreaHeight = visibleAreaBottom - visibleAreaTop;
          const targetPosition = visibleAreaTop + (visibleAreaHeight * 0.35); // 35% from top
          const scrollOffset = elementRect.top - targetPosition;

          const newScrollTop = container.scrollTop + scrollOffset;

          // Use instant scroll to prevent bouncing
          container.scrollTop = Math.max(0, newScrollTop);
        }
      } else {
        // Desktop - simple scroll to keep element visible
        const containerHeight = containerRect.height;
        const elementTopRelative = elementRect.top - containerRect.top + container.scrollTop;
        const targetPosition = containerHeight * 0.35; // 35% from top
        const scrollOffset = elementTopRelative - targetPosition;

        container.scrollTop = Math.max(0, scrollOffset);
      }

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 100);
    }, 30); // Small debounce
  }, [isMobile, keyboardHeight, fontSize]);

  // Trigger scroll when currentIndex changes
  useEffect(() => {
    scrollToActiveChar();
  }, [currentIndex, scrollToActiveChar]);

  // Main typing logic with keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (!startTime) setStartTime(Date.now());

      if (e.key === 'Backspace') {
        if (currentIndex > 0) {
          let prev = currentIndex - 1;
          // Skip backwards over special characters
          while (prev > 0 && isSkippedChar(response[prev])) {
            prev--;
          }
          setCurrentIndex(prev);
        }
        return;
      }

      if (e.key.length === 1) {
        if (currentIndex >= response.length) return;

        const targetChar = response[currentIndex];
        if (!targetChar) return;

        const isMatch = e.key.toLowerCase() === targetChar.toLowerCase();

        if (isMatch) {
          let nextIndex = currentIndex + 1;
          // Skip forward over special characters
          while (nextIndex < response.length && isSkippedChar(response[nextIndex])) {
            nextIndex++;
          }
          setCurrentIndex(nextIndex);

          if (nextIndex >= response.length) {
            const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
            setTimeout(() => onComplete(timeSpent), 150);
          }
        }
        // No visual error feedback - just don't advance
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, response, onComplete, startTime]);

  // Mobile input handler
  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) setStartTime(Date.now());
    const val = e.target.value;
    if (!val) return;

    if (currentIndex >= response.length) {
      e.target.value = '';
      return;
    }

    const inputChar = val.slice(-1);
    const targetChar = response[currentIndex];

    if (targetChar && inputChar.toLowerCase() === targetChar.toLowerCase()) {
      let nextIndex = currentIndex + 1;
      while (nextIndex < response.length && isSkippedChar(response[nextIndex])) {
        nextIndex++;
      }
      setCurrentIndex(nextIndex);

      if (nextIndex >= response.length) {
        const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
        setTimeout(() => onComplete(timeSpent), 150);
      }
    }
    e.target.value = '';
  };

  const focusInput = () => inputRef.current?.focus();
  const progress = Math.round((currentIndex / response.length) * 100);

  const chars = response.split('');

  const displayText = chars.map((char, index) => {
    const isActive = index === currentIndex;
    const isCompleted = index < currentIndex;
    const isFuture = index > currentIndex;

    // Progressive opacity/blur logic for future text
    let opacityClass = 'opacity-100';
    let blurClass = 'blur-0';

    if (isFuture) {
      const distance = index - currentIndex;

      if (distance > 150) {
        opacityClass = 'opacity-0 duration-1000';
      } else if (distance > 80) {
        opacityClass = 'opacity-10 blur-[2px] duration-700';
      } else if (distance > 40) {
        opacityClass = 'opacity-40 blur-[1px] duration-500';
      } else if (distance > 15) {
        opacityClass = 'opacity-70 duration-300';
      } else {
        opacityClass = 'opacity-100';
      }
    } else if (isCompleted) {
      opacityClass = 'opacity-100';
    }

    // Regular characters - no drop cap
    return (
      <span
        key={index}
        ref={isActive ? activeCharRef : null}
        className={`relative transition-all ease-out duration-500 ${opacityClass} ${blurClass}`}
      >
        {/* Cursor BEFORE the active character */}
        {isActive && (
          <span className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-black dark:bg-white animate-pulse" />
        )}

        <span className={`
          ${isCompleted ? 'text-black dark:text-white' : ''}
          ${isFuture ? 'text-gray-400 dark:text-gray-600' : ''}
          ${isActive ? 'text-gray-400 dark:text-gray-600' : ''}
        `}>
          {char}
        </span>
      </span>
    );
  });

  return (
    <div className="min-h-screen bg-white dark:bg-dark flex flex-col transition-colors">
      {/* Main Content - Full Height */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Progress Bar with Back Button */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-dark-100 bg-white dark:bg-dark shadow-sm relative z-30 transition-colors">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2 sm:mb-3 gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="text-base font-bold text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-2 flex-shrink-0 group"
                >
                  <svg
                    className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back</span>
                </button>
              )}
              <div className="flex items-center gap-3 ml-auto">
                {/* Font Size Controls - Compact */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
                    className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-bold text-base leading-none w-5 h-5 flex items-center justify-center transition-colors"
                    title="Decrease font size"
                  >
                    −
                  </button>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[2.5rem] text-center">
                    {fontSize}px
                  </span>
                  <button
                    onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
                    className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-bold text-base leading-none w-5 h-5 flex items-center justify-center transition-colors"
                    title="Increase font size"
                  >
                    +
                  </button>
                </div>
                <div className="text-base sm:text-lg font-bold min-w-[3rem] sm:min-w-[4rem] text-right flex-shrink-0 text-black dark:text-white">
                  {progress}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-100 rounded-full h-1.5 overflow-hidden shadow-inner transition-colors">
              <div
                className="bg-gray-900 dark:bg-white h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Text Area - The Flow State */}
        <div
          className="flex-1 overflow-y-auto cursor-text relative scroll-smooth"
          onClick={focusInput}
          ref={containerRef}
          style={{
            // Ensure smooth scrolling on iOS
            WebkitOverflowScrolling: 'touch',
            // Prevent iOS bounce scrolling that can interfere
            overscrollBehavior: 'contain'
          }}
        >
          {/* Top/Bottom Fade Masks - positioned below header */}
          <div className="fixed top-[73px] sm:top-[81px] left-0 right-0 h-24 bg-gradient-to-b from-white dark:from-dark via-white/90 dark:via-dark/90 to-transparent z-10 pointer-events-none transition-colors"></div>
          <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-dark via-white/90 dark:via-dark/90 to-transparent z-10 pointer-events-none transition-colors"></div>

          <div className="min-h-full flex flex-col items-center">
            <div
              className="max-w-3xl w-full px-4 sm:px-6 md:px-16 pt-12 sm:pt-16 md:pt-24 relative z-20"
              style={{
                paddingBottom: isMobile && keyboardHeight > 0
                  ? `${Math.max(keyboardHeight + 60, 150)}px`
                  : isMobile
                    ? '100px'
                    : undefined
              }}
            >
              {/* Scenario metadata - compact header */}
              {(scenarioTitle || category || difficulty) && (
                <div className="mb-8 md:mb-12 flex items-center justify-center gap-3 text-xs opacity-50">
                  {category && (
                    <span className="font-semibold text-gray-900 dark:text-white">{category}</span>
                  )}
                  {category && difficulty && <span className="text-gray-400">•</span>}
                  {difficulty && (
                    <span className="capitalize text-gray-600 dark:text-gray-400">{difficulty}</span>
                  )}
                </div>
              )}

              {/* Main Text Block */}
              <p
                className="font-serif leading-relaxed text-left outline-none tracking-normal"
                style={{ fontSize: `${fontSize}px` }}
              >
                {displayText}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Input */}
        <input
          ref={inputRef}
          type="text"
          className="opacity-0 absolute -z-10"
          autoFocus
          inputMode="text"
          autoComplete="off"
          onChange={handleMobileInput}
        />

        {/* Footer Stats */}
        <div className="border-t border-gray-200 dark:border-dark-100 px-6 py-3 bg-gray-50 dark:bg-dark-50 transition-colors">
          <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{currentIndex} / {response.length}</span>
            <span>{wordCount} words</span>
          </div>
        </div>
      </div>
    </div>
  );
};
