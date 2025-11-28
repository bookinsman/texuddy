'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StudentAuth() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!passcode || passcode.length < 6) {
      setError('Please enter a valid 6-character passcode');
      setLoading(false);
      return;
    }

    // TODO: Replace with actual API call to verify passcode
    // Set user mode as regular student (not solo)
    localStorage.setItem('userMode', 'student');
    
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
              T
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Texuddy</span>
          </Link>

          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-5xl shadow-2xl">
            🎓
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Welcome, Student!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your passcode to start practicing
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl border border-gray-200 dark:border-[#3a3a3a] p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Passcode Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
                Enter Your Passcode
              </label>
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value.toUpperCase().slice(0, 6))}
                maxLength={6}
                className="w-full px-6 py-4 rounded-lg border-2 border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 text-center text-2xl font-bold tracking-widest uppercase focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="ABC123"
                autoFocus
              />
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-2">
                Ask your parent for this 6-character code
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
              disabled={loading || passcode.length < 6}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Verifying...' : 'Start Practicing'}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[#3a3a3a]">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100 font-semibold mb-2">
                Don't have a passcode?
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                Ask your parent to create an account first. They'll receive a unique passcode to share with you!
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
