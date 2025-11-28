'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PricingSection } from '@/components/pricing/PricingSection';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for scroll animations
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const sections = document.querySelectorAll('.reveal-on-scroll');
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      sections.forEach((section) => observerRef.current?.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-purple-500 selection:text-white overflow-x-hidden font-sans transition-colors duration-500">
      {/* Dynamic Background - Light vs Dark Split */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* LIGHT MODE: Solid & Clean */}
        <div className="absolute inset-0 bg-[#F8F9FC] dark:hidden"></div>

        {/* DARK MODE: Geometric Mesh (The one you like) */}
        <div className="absolute inset-0 hidden dark:block">
          {/* Animated gradient mesh with geometric shapes */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-blue-950/30"></div>
          
          {/* Large animated orbs */}
          <div 
            className="absolute top-[-15%] left-[-10%] w-[900px] h-[900px] rounded-full bg-gradient-to-br from-purple-500/15 to-purple-700/10 blur-3xl animate-float-slow"
            style={{ transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` }}
          />
          <div 
            className="absolute bottom-[-15%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-500/15 to-blue-700/10 blur-3xl animate-float-slow-delayed"
            style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
          />
          
        </div>
      </div>

      {/* Navigation - Modern & Clean */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className={`w-full transition-all duration-300 ${
          scrollY > 20 
            ? 'bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-sm'
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo - Minimalist */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-lg shadow-lg group-hover:scale-110 transition-transform duration-200">
                    T
                  </div>
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Texuddy</span>
              </Link>

              {/* Navigation Links - Clean */}
              <div className="hidden md:flex items-center gap-8">
                {['Features', 'How it Works', 'Pricing'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative py-2 group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Link
                  href="/student"
                  className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  Start Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-600 mb-8 backdrop-blur-sm dark:bg-white/5 dark:border-white/10 dark:text-purple-300 shadow-sm dark:shadow-none">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                Practice Makes Permanent
              </div>

              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 dark:text-white">
                Stop Sounding <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 animate-gradient-x">
                  Like a Kid
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-xl">
                Practice real arguments, real negotiations, real confidence-builders. Type them once, own them forever. While your friends fumble for words, you&apos;ll already know what to say.
              </p>

              <div>
                <Link
                  href="/auth"
                  className="group relative inline-block px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg transition-transform duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  Start Now — Free
                  <div className="absolute inset-0 rounded-full ring-2 ring-gray-900/50 dark:ring-white/50 ring-offset-2 ring-offset-white dark:ring-offset-black group-hover:ring-purple-500 transition-all duration-300" />
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 text-sm text-gray-500 dark:text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">●</span> Win Arguments
            </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 dark:text-blue-400">●</span> Sound Confident
                    </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500 dark:text-purple-400">●</span> Dominate Conversations
                                </div>
                              </div>
                            </div>

            {/* Hero Visual - 3D-like Card Stack */}
            <div className="relative h-[600px] hidden lg:block reveal-on-scroll opacity-0 translate-x-10 transition-all duration-1000 delay-300 ease-out">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px]">
                {/* Background Cards for Depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 rounded-3xl transform rotate-[-6deg] translate-x-[-20px] scale-95 blur-sm border border-gray-100 dark:border-white/5"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-800/40 dark:to-blue-800/40 rounded-3xl transform rotate-[-3deg] translate-x-[-10px] scale-95 backdrop-blur-sm border border-gray-200 dark:border-white/10"></div>
                
                {/* Main Interactive Card */}
                <div className="absolute inset-0 bg-white dark:bg-[#0A0A0A] rounded-3xl border border-gray-100 dark:border-white/10 shadow-2xl dark:shadow-none overflow-hidden transform transition-transform duration-500 hover:scale-[1.02] hover:-rotate-1">
                  {/* Glass Header */}
                  <div className="h-14 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 backdrop-blur-md flex items-center px-6 justify-between">
                      <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/50"></div>
                    </div>
                    <div className="text-xs font-mono text-gray-400 dark:text-gray-500">professional_response.ts</div>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* Problem Section */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase">Incoming Challenge</div>
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                        &quot;We need to renegotiate the contract terms. The current pricing doesn&apos;t work for our budget anymore.&quot;
                      </div>
                    </div>

                    {/* Solution Arrow */}
                    <div className="flex justify-center text-purple-500 dark:text-purple-500">
                      <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>

                    {/* Response Section - Typing Effect */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold tracking-widest text-green-600 dark:text-green-500 uppercase">Your Response</div>
                        <div className="text-[10px] px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">Perfect Match</div>
                      </div>
                      <div className="relative p-4 rounded-xl bg-gradient-to-b from-green-50 to-transparent border border-green-100 dark:from-green-500/10 dark:to-transparent dark:border-green-500/20">
                        <p className="text-sm text-green-900 dark:text-green-50 font-medium leading-relaxed">
                          &quot;I understand budget constraints are a priority. Let&apos;s review the scope to find a solution that aligns with your targets while maintaining quality...&quot;
                          <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse align-middle"></span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Leaderboard Section - CALM & PLEASANT */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black overflow-hidden">
        {/* Soft pleasant background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gentle gradient orbs */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-100/30 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-100/30 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
              Right Now, Someone Your Age Is<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Winning</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              While you scroll, they&apos;re practicing scenario #47. You&apos;re falling behind.
            </p>
          </div>

          {/* Leaderboard Container */}
          <div className="grid lg:grid-cols-12 gap-4 md:gap-6 mb-20">
            {/* Left - Stats Cards (Monkeytype style) */}
            <div className="lg:col-span-4 space-y-3 md:space-y-4 reveal-on-scroll opacity-0 translate-x-10 transition-all duration-1000">
              {[
                { label: "ACTIVE OPERATIVES", number: "156", sublabel: "students learning" },
                { label: "WORDS INTERNALIZED", number: "12,847", sublabel: "total retyped" },
                { label: "SCENARIOS COMPLETE", number: "847", sublabel: "finished today" }
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-[#2a2a2a] rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-[#3a3a3a] hover:border-gray-300 dark:hover:border-[#4a4a4a] transition-all">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                    <div className="text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                  <div className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-1 tracking-tight">
                    {stat.number.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-500">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Clean Leaderboard Table */}
            <div className="lg:col-span-8 reveal-on-scroll opacity-0 translate-x-10 transition-all duration-1000 delay-200">
              <div className="bg-white dark:bg-[#2a2a2a] rounded-xl md:rounded-2xl border border-gray-200 dark:border-[#3a3a3a] overflow-hidden">
                {/* Header */}
                <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 dark:border-[#3a3a3a] bg-gray-50 dark:bg-[#252525]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">Top Learners</div>
                      <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-green-500 text-white text-[10px] md:text-xs font-bold">LIVE</span>
                    </div>
                    <div className="hidden md:block text-sm text-gray-500 dark:text-gray-500 font-mono">GLOBAL RANKINGS</div>
                  </div>
                </div>

                {/* Table Header - MOBILE RESPONSIVE */}
                <div className="hidden md:block px-6 py-3 bg-gray-50 dark:bg-[#252525] border-b border-gray-200 dark:border-[#3a3a3a]">
                  <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                    <div className="col-span-1">POS</div>
                    <div className="col-span-5">OPERATIVE</div>
                    <div className="col-span-3 text-right">FLOW</div>
                    <div className="col-span-3 text-right">TOTAL XP</div>
                  </div>
                </div>

                {/* Scrollable List - MOBILE OPTIMIZED */}
                <div className="h-[400px] md:h-[500px] overflow-y-auto custom-scrollbar">
                  {[
                    { name: "Lukas M.", username: "@PSYCH_MASTER", country: "LT", wpm: "142", xp: "12.5k", category: "Negotiating Salary Raises", color: "blue" },
                    { name: "Emilija K.", username: "@MKT_NINJA", country: "LT", wpm: "138", xp: "10.2k", category: "Pitching Business Ideas", color: "purple" },
                    { name: "Jonas P.", username: "@FINANCE_PRO", country: "LT", wpm: "131", xp: "9.8k", category: "Client Contract Reviews", color: "green" },
                    { name: "Gabija L.", username: "@DESIGN_FLOW", country: "LT", wpm: "128", xp: "8.9k", category: "Creative Project Briefs", color: "pink" },
                    { name: "Tomas S.", username: "@ENGINEER_LT", country: "LT", wpm: "124", xp: "8.1k", category: "Technical Documentation", color: "indigo" },
                    { name: "Ieva M.", username: "@MED_STUDENT", country: "LT", wpm: "120", xp: "7.8k", category: "Patient Communication", color: "red" },
                    { name: "Karolis V.", username: "@LAW_KEEPER", country: "LT", wpm: "118", xp: "7.2k", category: "Legal Case Arguments", color: "amber" },
                    { name: "Urte K.", username: "@BIZ_LEADER", country: "LT", wpm: "115", xp: "6.9k", category: "Team Leadership Memos", color: "cyan" },
                    { name: "Mantas D.", username: "@CODE_MASTER", country: "LT", wpm: "112", xp: "6.5k", category: "Code Review Feedback", color: "violet" },
                    { name: "Rugile B.", username: "@ARCH_DESIGN", country: "LT", wpm: "110", xp: "6.1k", category: "Architecture Proposals", color: "orange" },
                    { name: "Dovydas R.", username: "@TEACHER_LT", country: "LT", wpm: "108", xp: "5.8k", category: "Student Progress Reports", color: "teal" },
                    { name: "Greta P.", username: "@NURSE_CARE", country: "LT", wpm: "105", xp: "5.4k", category: "Healthcare Protocols", color: "rose" },
                    { name: "Justinas A.", username: "@ACCOUNT_PRO", country: "LT", wpm: "102", xp: "5.1k", category: "Financial Audit Reports", color: "emerald" },
                    { name: "Monika Z.", username: "@HR_EXPERT", country: "LT", wpm: "100", xp: "4.8k", category: "Performance Reviews", color: "fuchsia" },
                    { name: "Darius N.", username: "@SALES_KING", country: "LT", wpm: "98", xp: "4.5k", category: "Cold Outreach Emails", color: "lime" },
                    { name: "Laura G.", username: "@JOURNALIST", country: "LT", wpm: "95", xp: "4.2k", category: "Interview Questions", color: "sky" },
                    { name: "Rokas J.", username: "@PHOTO_ART", country: "LT", wpm: "92", xp: "3.9k", category: "Creative Pitches", color: "purple" },
                    { name: "Agne T.", username: "@CHEF_LT", country: "LT", wpm: "90", xp: "3.6k", category: "Menu Descriptions", color: "amber" },
                    { name: "Paulius F.", username: "@SPORT_PRO", country: "LT", wpm: "88", xp: "3.3k", category: "Training Programs", color: "blue" },
                    { name: "Your Teen", username: "@JOIN_NOW", country: "LT", wpm: "0", xp: "0", category: "Start Your Journey", color: "gray", highlight: true }
                  ].map((player, i) => (
                    <div
                      key={i}
                      className={`px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 dark:border-[#3a3a3a] hover:bg-gray-50 dark:hover:bg-[#333] transition-colors ${
                        player.highlight ? 'bg-purple-50 dark:bg-purple-950/20' : ''
                      }`}
                    >
                      {/* DESKTOP LAYOUT */}
                      <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                        {/* Position */}
                        <div className="col-span-1">
                          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
                            i === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            i === 1 ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                            i === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                            'text-gray-500 dark:text-gray-500'
                          }`}>
                            {player.highlight ? '?' : `${i + 1}`.padStart(2, '0')}
                          </div>
                        </div>

                        {/* Name & Category */}
                        <div className="col-span-5">
                          <div className="font-bold text-gray-900 dark:text-gray-100">{player.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 font-mono mb-1">
                            {player.username} • {player.country}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 italic">
                            Currently: {player.category}
                          </div>
                        </div>

                        {/* WPM */}
                        <div className="col-span-3 text-right">
                          <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">FLOW</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{player.wpm} WPM</div>
                        </div>

                        {/* XP */}
                        <div className="col-span-3 text-right">
                          <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">TOTAL XP</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{player.xp}</div>
                        </div>
                      </div>

                      {/* MOBILE LAYOUT */}
                      <div className="md:hidden flex items-start gap-3">
                        {/* Position Badge */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg font-bold text-base flex items-center justify-center ${
                          i === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          i === 1 ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                          i === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                          player.highlight ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                          'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {player.highlight ? '?' : i + 1}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1 leading-tight">{player.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 italic mb-2 leading-tight">
                            {player.category}
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500 dark:text-gray-500 text-[10px]">WPM:</span>
                              <span className="font-bold text-gray-900 dark:text-gray-100">{player.wpm}</span>
                            </div>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500 dark:text-gray-500 text-[10px]">XP:</span>
                              <span className="font-bold text-gray-900 dark:text-gray-100">{player.xp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* The Problem Section - BOLD & EMOTIONAL */}
      <section className="relative py-24 md:py-32 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 text-center mb-16 md:mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-4 text-gray-900 dark:text-white leading-tight">
              The <span className="relative inline-block">
                <span className="text-red-500">Gap</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C60 2, 140 2, 198 10" stroke="currentColor" strokeWidth="3" className="text-red-500" strokeLinecap="round"/>
                </svg>
              </span> is Real.
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
              Every day without these skills is a missed opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {[
              {
                number: "01",
                title: "They Can Hear You're Inexperienced",
                desc: "That nervous pause. The &apos;umm...&apos; before answering. Using &apos;like&apos; every sentence. It screams amateur—and costs you respect, opportunities, money.",
                color: "red",
                gradient: "from-red-500 to-rose-600",
                bgGradient: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20"
              },
              {
                number: "02",
                title: "You Always Lose Arguments (And You Know Why)",
                desc: "Your parents shut you down. Teachers ignore your points. You KNOW you&apos;re right, but you can&apos;t articulate it. So you lose. Again.",
                color: "orange",
                gradient: "from-orange-500 to-amber-600",
                bgGradient: "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20"
              },
              {
                number: "03",
                title: "The Difference? You&apos;ve Already Said It Before",
                desc: "Most people freeze because it&apos;s NEW. You won&apos;t—because you&apos;ve already typed those exact words. Arguing with parents. Asking for extension. Defending your point in class. When the moment comes, you&apos;re just repeating.",
                color: "purple",
                gradient: "from-purple-500 to-violet-600",
                bgGradient: "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative h-full">
                  {/* Glow effect on hover */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition duration-500`}></div>

                  {/* Card */}
                  <div className={`relative h-full bg-gradient-to-br ${item.bgGradient} backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 shadow-lg group-hover:shadow-2xl`}>
                    {/* Number badge */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} text-white font-bold text-xl mb-6 shadow-lg`}>
                      {item.number}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">{item.desc}</p>

                    {/* Decorative corner accent */}
                    <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${item.gradient} opacity-10 rounded-tl-full`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bold CTA below */}
          <div className="mt-16 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000" style={{ transitionDelay: '600ms' }}>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Unless you do something about it.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gray-900 dark:via-white to-transparent mx-auto"></div>
          </div>
        </div>
      </section>

      {/* The Solution - Split View */}
      <section id="demo" className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 dark:bg-transparent">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 dark:from-black dark:via-purple-900/20 dark:to-black"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 order-2 lg:order-1">
              {/* Comparison Card */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-gray-900 dark:bg-black rounded-xl border border-white/10 p-8 overflow-hidden">
                  <div className="flex flex-col gap-8">
                    {/* Old Way */}
                    <div className="opacity-50 blur-[1px] transition-all duration-500 hover:opacity-100 hover:blur-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-xs font-mono text-red-400">OLD METHOD: READING</span>
                      </div>
                      <p className="text-lg text-gray-400 line-through decoration-red-500/50">
                        Passively reading about negotiation...
            </p>
          </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    {/* New Way */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-mono text-green-400">NEW METHOD: RETYPING</span>
                      </div>
                      <div className="space-y-2 font-mono text-lg">
                        <span className="text-white">I appreciate the offer. </span>
                        <span className="text-white/50">However, based on...</span>
                        <span className="inline-block w-2 h-5 bg-green-500 animate-blink align-middle ml-1"></span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400">Muscle Memory</span>
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400">Vocabulary</span>
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400">Syntax</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

            <div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Reading Doesn&apos;t Work. <br/>
                <span className="text-purple-400">Retyping Does.</span>
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-400 mb-8 leading-relaxed">
                Reading about negotiation won&apos;t make you a negotiator. But retyping 50 expert negotiations? That <strong className="text-white">installs the pattern</strong> directly into your subconscious. Your fingers learn. Your brain absorbs. The words become yours.
              </p>
              <ul className="space-y-4">
                {[
                  "Every word you type builds neural pathways",
                  "Professional vocabulary becomes automatic",
                  "Confidence comes from muscle memory, not theory"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios ticker - PREMIUM */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black border-y border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-200/15 dark:bg-purple-500/8 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/2 right-0 w-72 h-72 bg-blue-200/15 dark:bg-blue-500/8 rounded-full blur-3xl animate-float-slow-delayed"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 mb-12 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">Real scenarios, real results</h3>
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">40 Professions • 800+ Scenarios</p>
        </div>

        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 z-10 pointer-events-none"></div>

        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex gap-3 whitespace-nowrap py-4">
            {[
              "Negotiating Salary", "Declining an Offer", "Client Apology", "Project Pitch",
              "Asking for Raise", "Conflict Resolution", "Cold Email", "Partnership Proposal",
              "Feedback Request", "Resignation Letter", "Contract Review", "Crisis Management"
            ].map((item, i) => (
              <div
                key={i}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 text-gray-900 dark:text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {item}
              </div>
            ))}
            {/* Duplicate for smooth loop */}
            {[
              "Negotiating Salary", "Declining an Offer", "Client Apology", "Project Pitch",
              "Asking for Raise", "Conflict Resolution", "Cold Email", "Partnership Proposal",
              "Feedback Request", "Resignation Letter", "Contract Review", "Crisis Management"
            ].map((item, i) => (
              <div
                key={`dup-${i}`}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 text-gray-900 dark:text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer - Premium Design */}
      <footer className="relative border-t border-gray-200/50 dark:border-gray-800/50 py-20 bg-gradient-to-b from-white via-purple-50/20 to-white dark:from-black dark:via-purple-950/10 dark:to-black overflow-hidden">
        {/* Dynamic background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/15 to-purple-500/10 dark:from-purple-500/8 dark:to-purple-700/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-300/15 to-blue-500/10 dark:from-blue-500/8 dark:to-blue-700/5 rounded-full blur-3xl animate-float-slow-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-purple-300/20 to-transparent dark:via-purple-500/10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-black text-white text-xl shadow-xl group-hover:scale-110 transition-transform duration-200">
                    T
                  </div>
                </div>
                <span className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Texuddy</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed text-lg">
                Practice professional communication until it becomes instinct. Build the career advantage others can&apos;t copy.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Instagram'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="group relative w-12 h-12 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label={platform}
                  >
                    <span className="font-bold text-sm">{platform[0]}</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-widest">Product</h4>
              <ul className="space-y-4">
                {['Features', 'Pricing', 'Scenarios', 'How It Works'].map((item) => (
                  <li key={item}>
                    <a href="#" className="group text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-purple-500 transition-colors"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-widest">Company</h4>
              <ul className="space-y-4">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="group text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-purple-500 transition-colors"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t-2 border-gray-200/50 dark:border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 dark:text-gray-500 font-medium">© 2025 Texuddy. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-500 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="text-gray-500 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow 18s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
