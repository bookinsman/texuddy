'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SoloGrinderAuth() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || name.length < 2) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (!age || parseInt(age) < 9 || parseInt(age) > 18) {
      setError('Please enter a valid age (9-18)');
      setLoading(false);
      return;
    }

    // TODO: Replace with actual API call to create solo grinder account
    // Store user mode as 'solo' in localStorage or context
    localStorage.setItem('userMode', 'solo');
    localStorage.setItem('userName', name);
    localStorage.setItem('userAge', age);

    setTimeout(() => {
      // Mock success - redirect to student dashboard
      router.push('/student');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-center p-6">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, gray 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
              T
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Texuddy</span>
          </Link>

          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-5xl shadow-2xl">
            ⚡
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Solo Grinder Mode
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Start practicing independently - no parent setup needed!
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl border border-gray-200 dark:border-[#3a3a3a] p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your name"
                autoFocus
              />
            </div>

            {/* Age Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="9"
                max="18"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="9-18"
              />
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                We&apos;ll customize content based on your age
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !name || !age}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Starting...' : 'Start Grinding!'}
            </button>
          </form>

          {/* Info Text */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[#3a3a3a]">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <p className="text-sm text-orange-900 dark:text-orange-100 font-semibold mb-2">
                ⚡ Solo Grinder Mode
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed">
                Practice independently without parent setup. You&apos;ll have full access to all practice scenarios and can track your progress on the leaderboard!
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link href="/auth" className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            ← Back to role selection
          </Link>
        </div>
      </div>
    </div>
  );
}

