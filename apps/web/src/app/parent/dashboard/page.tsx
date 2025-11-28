'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ParentSidebar } from '@/components/sidebar/ParentSidebar';

// Mock data - replace with actual API data
const mockDataInitial = {
  student: {
    name: 'Jonas',
    passcode: 'ABC123',
    joinedDate: '2025-01-15'
  },
  stats: {
    timeSpentToday: 45, // minutes
    timeSpentTotal: 1240, // minutes
    wordsTypedToday: 287,
    wordsTypedTotal: 12847,
    scenariosCompleted: 12,
    scenariosInProgress: 3,
    currentWPM: 78,
    totalXP: 3420
  },
  activeGoals: [
    {
      id: 1,
      reward: 'New iPhone 15',
      requirements: {
        hours: 30,
        words: 7000,
        scenarios: 200
      },
      progress: {
        hours: 20.67,
        words: 12847,
        scenarios: 12
      },
      unlocked: false,
      color: 'slate'
    },
    {
      id: 2,
      reward: '2 hours PC time today',
      requirements: {
        hours: 1,
        words: 400,
        scenarios: 2
      },
      progress: {
        hours: 1.2,
        words: 450,
        scenarios: 3
      },
      unlocked: true,
      color: 'blue'
    },
    {
      id: 3,
      reward: '€50 Steam Gift Card',
      requirements: {
        hours: 15,
        words: 5000,
        scenarios: 50
      },
      progress: {
        hours: 15.5,
        words: 5500,
        scenarios: 52
      },
      unlocked: true,
      color: 'teal'
    },
    {
      id: 4,
      reward: 'Weekend Trip to Theme Park',
      requirements: {
        hours: 40,
        words: 10000,
        scenarios: 150
      },
      progress: {
        hours: 42,
        words: 10500,
        scenarios: 155
      },
      unlocked: true,
      color: 'cyan'
    },
    {
      id: 5,
      reward: 'New Gaming Headset',
      requirements: {
        hours: 25,
        words: 8000,
        scenarios: 100
      },
      progress: {
        hours: 26,
        words: 8500,
        scenarios: 105
      },
      unlocked: true,
      color: 'indigo'
    },
    {
      id: 6,
      reward: 'Extra Hour of Screen Time Daily',
      requirements: {
        hours: 10,
        words: 3000,
        scenarios: 30
      },
      progress: {
        hours: 12.5,
        words: 3500,
        scenarios: 35
      },
      unlocked: true,
      color: 'emerald'
    },
    {
      id: 7,
      reward: 'Choose Next Family Movie Night',
      requirements: {
        hours: 5,
        words: 2000,
        scenarios: 15
      },
      progress: {
        hours: 5.5,
        words: 2200,
        scenarios: 18
      },
      unlocked: true,
      color: 'amber'
    },
    {
      id: 8,
      reward: 'New Pair of Sneakers',
      requirements: {
        hours: 20,
        words: 6000,
        scenarios: 80
      },
      progress: {
        hours: 21,
        words: 6500,
        scenarios: 85
      },
      unlocked: true,
      color: 'violet'
    },
    {
      id: 9,
      reward: 'Pizza Night with Friends',
      requirements: {
        hours: 8,
        words: 2500,
        scenarios: 25
      },
      progress: {
        hours: 8.5,
        words: 2800,
        scenarios: 28
      },
      unlocked: true,
      color: 'emerald'
    }
  ],
  scenariosInProgress: [
    { name: 'Negotiating Salary Raise', profession: 'Psychology', progress: 65 },
    { name: 'Client Apology Email', profession: 'Marketing', progress: 40 },
    { name: 'Project Pitch Presentation', profession: 'Business', progress: 22 }
  ],
  careerInterests: [
    { profession: 'Psychology', timeSpent: 340, scenarios: 8 },
    { profession: 'Marketing', timeSpent: 280, scenarios: 6 },
    { profession: 'Business', timeSpent: 210, scenarios: 4 },
    { profession: 'Finance', timeSpent: 150, scenarios: 3 }
  ]
};

export default function ParentDashboard() {
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'activity' | 'leaderboard'>('overview');
  const [activityPeriod, setActivityPeriod] = useState<'2weeks' | 'monthly'>('2weeks');
  const [newGoal, setNewGoal] = useState({
    reward: '',
    hours: '',
    words: '',
    scenarios: ''
  });
  const [goals, setGoals] = useState(mockDataInitial.activeGoals);

  const data = mockDataInitial;

  const calculateProgress = (current: number, required: number) => {
    return Math.min(100, (current / required) * 100);
  };

  // Generate mock activity data
  const activityData = useMemo(() => {
    const days = activityPeriod === '2weeks' ? 14 : 30;
    const today = new Date();
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate random but realistic data
      const isToday = i === 0;
      const timeSpent = isToday 
        ? mockDataInitial.stats.timeSpentToday 
        : Math.floor(Math.random() * 60) + 10;
      const wordsRetyped = isToday
        ? mockDataInitial.stats.wordsTypedToday
        : Math.floor(Math.random() * 500) + 50;
      
      data.push({
        date: dateStr,
        timeSpent,
        wordsRetyped
      });
    }
    
    return data;
  }, [activityPeriod]);

  const maxTimeSpent = Math.max(...activityData.map(d => d.timeSpent), 1);
  const maxWordsRetyped = Math.max(...activityData.map(d => d.wordsRetyped), 1);

  const getBarHeight = (value: number, max: number) => {
    return max > 0 ? Math.max((value / max) * 100, 5) : 5;
  };

  const getDayLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  const getYAxisLabels = (max: number) => {
    const labels = [];
    const steps = 4;
    for (let i = steps; i >= 0; i--) {
      const value = Math.ceil((max / steps) * i);
      labels.push(value);
    }
    return labels;
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleCreateGoal = () => {
    if (!newGoal.reward.trim()) {
      alert('Please enter a reward name');
      return;
    }

    if (!newGoal.hours && !newGoal.words && !newGoal.scenarios) {
      alert('Please set at least one requirement');
      return;
    }

    const colorOptions = ['slate', 'blue', 'teal', 'cyan', 'indigo', 'emerald', 'amber', 'violet'];
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

    const goal = {
      id: Date.now(),
      reward: newGoal.reward,
      requirements: {
        hours: Number(newGoal.hours) || 0,
        words: Number(newGoal.words) || 0,
        scenarios: Number(newGoal.scenarios) || 0
      },
      progress: {
        hours: 0,
        words: 0,
        scenarios: 0
      },
      unlocked: false,
      color: randomColor
    };

    setGoals([...goals, goal]);
    setNewGoal({ reward: '', hours: '', words: '', scenarios: '' });
    setShowNewGoalModal(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'goals', label: 'Reward Goals', count: goals.length },
    { id: 'activity', label: 'Activity' },
    { id: 'leaderboard', label: 'Leaderboard' }
  ];

  // Generate leaderboard data
  const leaderboardData = useMemo(() => {
    const mockPlayers = [
      { name: "Lukas M.", username: "@PSYCH_MASTER", country: "LT", wpm: "142", xp: "12.5k", category: "Negotiating Salary Raises", words: 125000 },
      { name: "Emilija K.", username: "@MKT_NINJA", country: "LT", wpm: "138", xp: "10.2k", category: "Pitching Business Ideas", words: 118000 },
      { name: "Jonas P.", username: "@FINANCE_PRO", country: "LT", wpm: "131", xp: "9.8k", category: "Client Contract Reviews", words: 105000 },
      { name: "Gabija L.", username: "@DESIGN_FLOW", country: "LT", wpm: "128", xp: "8.9k", category: "Creative Project Briefs", words: 95000 },
      { name: "Tomas S.", username: "@ENGINEER_LT", country: "LT", wpm: "124", xp: "8.1k", category: "Technical Documentation", words: 85000 },
      { name: "Ieva M.", username: "@MED_STUDENT", country: "LT", wpm: "120", xp: "7.8k", category: "Patient Communication", words: 78000 },
      { name: "Karolis V.", username: "@LAW_KEEPER", country: "LT", wpm: "118", xp: "7.2k", category: "Legal Case Arguments", words: 72000 },
      { name: "Urte K.", username: "@BIZ_LEADER", country: "LT", wpm: "115", xp: "6.9k", category: "Team Leadership Memos", words: 65000 },
      { name: "Mantas D.", username: "@CODE_MASTER", country: "LT", wpm: "112", xp: "6.5k", category: "Code Review Feedback", words: 58000 },
      { name: "Rugile B.", username: "@ARCH_DESIGN", country: "LT", wpm: "110", xp: "6.1k", category: "Architecture Proposals", words: 52000 },
      { name: "Dovydas R.", username: "@TEACHER_LT", country: "LT", wpm: "108", xp: "5.8k", category: "Student Progress Reports", words: 48000 },
      { name: "Greta P.", username: "@NURSE_CARE", country: "LT", wpm: "105", xp: "5.4k", category: "Healthcare Protocols", words: 42000 },
      { name: "Justinas A.", username: "@ACCOUNT_PRO", country: "LT", wpm: "102", xp: "5.1k", category: "Financial Audit Reports", words: 38000 },
      { name: "Monika Z.", username: "@HR_EXPERT", country: "LT", wpm: "100", xp: "4.8k", category: "Performance Reviews", words: 34000 },
      { name: "Darius N.", username: "@SALES_KING", country: "LT", wpm: "98", xp: "4.5k", category: "Cold Outreach Emails", words: 30000 },
      { name: "Laura G.", username: "@JOURNALIST", country: "LT", wpm: "95", xp: "4.2k", category: "Interview Questions", words: 26000 },
      { name: "Rokas J.", username: "@PHOTO_ART", country: "LT", wpm: "92", xp: "3.9k", category: "Creative Pitches", words: 22000 },
      { name: "Agne T.", username: "@CHEF_LT", country: "LT", wpm: "90", xp: "3.6k", category: "Menu Descriptions", words: 18000 },
      { name: "Paulius F.", username: "@SPORT_PRO", country: "LT", wpm: "88", xp: "3.3k", category: "Training Programs", words: 15000 },
      { name: "Egle K.", username: "@MUSIC_PRO", country: "LT", wpm: "85", xp: "3.0k", category: "Music Reviews", words: 12000 },
      { name: "Martynas L.", username: "@TECH_GURU", country: "LT", wpm: "82", xp: "2.7k", category: "Tech Tutorials", words: 10000 },
      { name: "Austeja S.", username: "@FASHION_LT", country: "LT", wpm: "80", xp: "2.4k", category: "Fashion Descriptions", words: 8500 },
      { name: "Vytautas M.", username: "@SCIENCE_LT", country: "LT", wpm: "78", xp: "2.1k", category: "Research Papers", words: 7200 },
      { name: "Giedre N.", username: "@WRITER_LT", country: "LT", wpm: "75", xp: "1.8k", category: "Creative Writing", words: 6000 },
      { name: "Tadas K.", username: "@GAMER_LT", country: "LT", wpm: "72", xp: "1.5k", category: "Game Reviews", words: 5000 },
      { name: "Simona B.", username: "@FOOD_LT", country: "LT", wpm: "70", xp: "1.2k", category: "Recipe Descriptions", words: 4200 },
      { name: "Edgaras P.", username: "@TRAVEL_LT", country: "LT", wpm: "68", xp: "1.0k", category: "Travel Guides", words: 3500 },
      { name: "Viktorija R.", username: "@FITNESS_LT", country: "LT", wpm: "65", xp: "0.8k", category: "Workout Plans", words: 2800 },
      { name: data.student.name, username: "@STUDENT", country: "LT", wpm: data.stats.currentWPM.toString(), xp: (data.stats.totalXP / 1000).toFixed(1) + "k", category: "Learning Progress", words: data.stats.wordsTypedTotal, isCurrentUser: true }
    ];

    return mockPlayers
      .sort((a, b) => b.words - a.words)
      .map((player, index) => ({ ...player, rank: index + 1 }));
  }, [data]);

  return (
    <div className="h-screen bg-gray-50 dark:bg-dark flex flex-col overflow-hidden transition-colors duration-500">
      {/* Header */}
      <header className="bg-white/80 dark:bg-dark-50/80 border-b border-gray-200 dark:border-dark-100 flex-shrink-0 z-20 backdrop-blur-xl transition-colors duration-500">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {sidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 flex items-center justify-center font-bold text-white dark:text-black shadow-sm">
                  T
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Texuddy</h1>
              </Link>
              <span className="hidden md:block text-sm text-gray-400 dark:text-gray-600">|</span>
              <span className="hidden md:block text-sm font-medium text-gray-600 dark:text-gray-400">Parent Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Parent</p>
              </div>
              <ThemeToggle />
              <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-md">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="flex flex-1 overflow-hidden max-w-[1800px] mx-auto w-full relative">
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <ParentSidebar 
            studentName={data.student.name}
            studentPasscode={data.student.passcode}
            joinedDate={data.student.joinedDate}
            stats={data.stats}
          />
            </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden bg-white/50 dark:bg-dark/50">
          <div className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="h-full flex flex-col max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="mb-6 flex gap-1 border-b border-gray-200 dark:border-dark-100 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900 bg-gray-100 dark:border-white dark:text-white dark:bg-white/10'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                  } rounded-t-lg`}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`ml-2 text-xs ${
                      activeTab === tab.id
                        ? 'text-gray-600 dark:text-gray-300'
                        : 'text-gray-400 dark:text-dark-300'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
              <div className="flex-1 overflow-hidden">
            {activeTab === 'overview' && (
                  <div className="space-y-6 overflow-y-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Today', value: `${data.stats.timeSpentToday}min`, sublabel: 'practice time' },
                    { label: 'Total Time', value: `${Math.floor(data.stats.timeSpentTotal / 60)}h ${data.stats.timeSpentTotal % 60}m`, sublabel: 'all time' },
                    { label: 'Words Typed', value: data.stats.wordsTypedTotal.toLocaleString(), sublabel: `${data.stats.wordsTypedToday} today` },
                    { label: 'Scenarios', value: data.stats.scenariosCompleted, sublabel: `${data.stats.scenariosInProgress} active` }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg p-4">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">
                        {stat.label}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {stat.sublabel}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Overview Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Currently Practicing */}
                  <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                      Currently Practicing
                    </h3>
                    <div className="space-y-4">
                      {data.scenariosInProgress.map((scenario, i) => (
                        <div key={i} className="pb-4 border-b border-gray-100 dark:border-dark-100 last:border-0 last:pb-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                {scenario.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {scenario.profession}
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                              {scenario.progress}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gray-900 dark:bg-white transition-all duration-500"
                              style={{ width: `${scenario.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Career Discovery */}
                  <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                      Career Interests
                    </h3>
                    <div className="space-y-4">
                      {data.careerInterests.map((career, i) => (
                        <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-100 last:border-0 last:pb-0">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                              {career.profession}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {career.scenarios} scenarios • {Math.floor(career.timeSpent / 60)}h {career.timeSpent % 60}m
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
                  <div className="flex flex-col h-full overflow-hidden">
                    {/* Header with Instructions */}
                    <div className="flex items-start justify-between mb-4 flex-shrink-0">
                      <div className="flex-1">
                        <div className="bg-gray-50 dark:bg-dark-100 border border-gray-200 dark:border-dark-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-1">How to Set Reward Goals</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                Click &quot;+ New Goal&quot; to create a reward goal. Set at least one requirement (hours, words, or scenarios). 
                                The student will unlock the reward when they meet all requirements. You can edit or delete goals anytime.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                  <button
                    onClick={() => setShowNewGoalModal(true)}
                        className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors whitespace-nowrap ml-4"
                  >
                    + New Goal
                  </button>
                </div>

                    {/* Goals List - Scrollable */}
                    <div className="flex-1 overflow-y-auto pr-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                  {goals.map((goal: any) => {
                    const hoursProgress = goal.requirements.hours ? calculateProgress(goal.progress.hours, goal.requirements.hours) : 0;
                    const wordsProgress = goal.requirements.words ? calculateProgress(goal.progress.words, goal.requirements.words) : 0;
                    const scenariosProgress = goal.requirements.scenarios ? calculateProgress(goal.progress.scenarios, goal.requirements.scenarios) : 0;

                    const activeRequirements = [
                      goal.requirements.hours > 0,
                      goal.requirements.words > 0,
                      goal.requirements.scenarios > 0
                    ].filter(Boolean).length;

                    const totalProgress = (hoursProgress + wordsProgress + scenariosProgress) / activeRequirements;

                    // Color mapping - Professional muted palette
                    const colorClasses: Record<string, any> = {
                      slate: {
                        main: 'from-slate-600 to-slate-700',
                        border: goal.unlocked ? 'border-slate-600 dark:border-slate-400' : 'border-slate-200 dark:border-slate-700',
                        badge: 'bg-slate-600 text-white',
                        hours: 'from-slate-500 to-slate-600',
                        words: 'from-slate-600 to-slate-700',
                        scenarios: 'from-slate-700 to-slate-800'
                      },
                      blue: {
                        main: 'from-blue-600 to-blue-700',
                        border: goal.unlocked ? 'border-blue-600 dark:border-blue-400' : 'border-blue-200 dark:border-blue-800',
                        badge: 'bg-blue-600 text-white',
                        hours: 'from-blue-500 to-blue-600',
                        words: 'from-blue-600 to-blue-700',
                        scenarios: 'from-blue-700 to-blue-800'
                      },
                      teal: {
                        main: 'from-teal-600 to-teal-700',
                        border: goal.unlocked ? 'border-teal-600 dark:border-teal-400' : 'border-teal-200 dark:border-teal-800',
                        badge: 'bg-teal-600 text-white',
                        hours: 'from-teal-500 to-teal-600',
                        words: 'from-teal-600 to-teal-700',
                        scenarios: 'from-teal-700 to-teal-800'
                      },
                      cyan: {
                        main: 'from-cyan-600 to-cyan-700',
                        border: goal.unlocked ? 'border-cyan-600 dark:border-cyan-400' : 'border-cyan-200 dark:border-cyan-800',
                        badge: 'bg-cyan-600 text-white',
                        hours: 'from-cyan-500 to-cyan-600',
                        words: 'from-cyan-600 to-cyan-700',
                        scenarios: 'from-cyan-700 to-cyan-800'
                      },
                      indigo: {
                        main: 'from-indigo-600 to-indigo-700',
                        border: goal.unlocked ? 'border-indigo-600 dark:border-indigo-400' : 'border-indigo-200 dark:border-indigo-800',
                        badge: 'bg-indigo-600 text-white',
                        hours: 'from-indigo-500 to-indigo-600',
                        words: 'from-indigo-600 to-indigo-700',
                        scenarios: 'from-indigo-700 to-indigo-800'
                      },
                      emerald: {
                        main: 'from-emerald-600 to-emerald-700',
                        border: goal.unlocked ? 'border-emerald-600 dark:border-emerald-400' : 'border-emerald-200 dark:border-emerald-800',
                        badge: 'bg-emerald-600 text-white',
                        hours: 'from-emerald-500 to-emerald-600',
                        words: 'from-emerald-600 to-emerald-700',
                        scenarios: 'from-emerald-700 to-emerald-800'
                      },
                      amber: {
                        main: 'from-amber-600 to-amber-700',
                        border: goal.unlocked ? 'border-amber-600 dark:border-amber-400' : 'border-amber-200 dark:border-amber-800',
                        badge: 'bg-amber-600 text-white',
                        hours: 'from-amber-500 to-amber-600',
                        words: 'from-amber-600 to-amber-700',
                        scenarios: 'from-amber-700 to-amber-800'
                      },
                      violet: {
                        main: 'from-violet-600 to-violet-700',
                        border: goal.unlocked ? 'border-violet-600 dark:border-violet-400' : 'border-violet-200 dark:border-violet-800',
                        badge: 'bg-violet-600 text-white',
                        hours: 'from-violet-500 to-violet-600',
                        words: 'from-violet-600 to-violet-700',
                        scenarios: 'from-violet-700 to-violet-800'
                      }
                    };

                    const colors = colorClasses[goal.color || 'slate'] || colorClasses.slate;

                    return (
                      <div
                        key={goal.id}
                        className={`bg-white dark:bg-dark-50 border-2 rounded-lg p-5 transition-all shadow-sm hover:shadow-md ${
                          goal.unlocked
                            ? `${colors.border} ring-2 ring-opacity-20 ${colors.border.replace('border-', 'ring-')}`
                            : colors.border
                        }`}
                      >
                        {/* Reward Name */}
                        <div className="mb-3">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2">
                              {goal.reward}
                            </h3>
                            {goal.unlocked && (
                              <span className={`text-xs font-bold ${colors.badge} px-2 py-1 rounded flex-shrink-0 ml-2 animate-pulse`}>
                                ✓ UNLOCKED
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2.5 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${colors.main} transition-all duration-500 ${goal.unlocked ? 'shadow-lg' : ''}`}
                                style={{ width: `${totalProgress}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs font-bold ${goal.unlocked ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'} w-10 text-right`}>
                              {Math.round(totalProgress)}%
                            </span>
                          </div>
                        </div>

                        {/* Requirements */}
                        <div className="space-y-2.5">
                          {goal.requirements.hours > 0 && (
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                  <span>⏱️</span> Practice Time
                                </span>
                                <span className={`text-xs font-semibold ${hoursProgress >= 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                  {goal.progress.hours.toFixed(1)} / {goal.requirements.hours}h
                                </span>
                              </div>
                              <div className="h-1.5 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${colors.hours} transition-all duration-500 ${hoursProgress >= 100 ? 'shadow-sm' : ''}`}
                                  style={{ width: `${hoursProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {goal.requirements.words > 0 && (
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                  <span>✍️</span> Words Typed
                                </span>
                                <span className={`text-xs font-semibold ${wordsProgress >= 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                  {goal.progress.words.toLocaleString()} / {goal.requirements.words.toLocaleString()}
                                </span>
                              </div>
                              <div className="h-1.5 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${colors.words} transition-all duration-500 ${wordsProgress >= 100 ? 'shadow-sm' : ''}`}
                                  style={{ width: `${wordsProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {goal.requirements.scenarios > 0 && (
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                  <span>🎯</span> Scenarios
                                </span>
                                <span className={`text-xs font-semibold ${scenariosProgress >= 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                  {goal.progress.scenarios} / {goal.requirements.scenarios}
                                </span>
                              </div>
                              <div className="h-1.5 bg-gray-100 dark:bg-dark-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${colors.scenarios} transition-all duration-500 ${scenariosProgress >= 100 ? 'shadow-sm' : ''}`}
                                  style={{ width: `${scenariosProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-dark-100 flex gap-2">
                          {goal.unlocked ? (
                            <button className={`flex-1 py-2 bg-gradient-to-r ${colors.main} text-white rounded-lg font-semibold text-xs hover:opacity-90 transition-all shadow-md`}>
                              Mark Delivered
                            </button>
                          ) : (
                            <>
                              <button className="flex-1 py-2 border border-gray-300 dark:border-dark-200 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-xs hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                Edit
                              </button>
                              <button className="px-4 py-2 border border-gray-300 dark:border-dark-200 text-gray-500 dark:text-gray-500 rounded-lg font-semibold text-xs hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                      </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
                  <div className="flex flex-col h-full overflow-hidden">
                    {/* Period Tabs */}
                    <div className="flex items-center justify-between mb-6 flex-shrink-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Activity Charts</h3>
                      <div className="flex gap-2 bg-gray-100 dark:bg-dark-100 p-1 rounded-lg">
                        <button
                          onClick={() => setActivityPeriod('2weeks')}
                          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                            activityPeriod === '2weeks'
                              ? 'bg-white dark:bg-dark-50 text-gray-900 dark:text-white shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          2 Weeks
                        </button>
                        <button
                          onClick={() => setActivityPeriod('monthly')}
                          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                            activityPeriod === 'monthly'
                              ? 'bg-white dark:bg-dark-50 text-gray-900 dark:text-white shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          Monthly
                        </button>
                      </div>
                    </div>

                    {/* Charts */}
                    <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                      {/* Time Spent Chart */}
              <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="text-xl">⏱️</span>
                            <span>Time Spent</span>
                </h3>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {activityData.reduce((sum, d) => sum + d.timeSpent, 0)} min total
                          </div>
                        </div>
                        <div className="flex gap-4 items-end">
                          <div className="flex flex-col justify-between h-48 pr-3 border-r-2 border-gray-200 dark:border-dark-100">
                            {getYAxisLabels(maxTimeSpent).map((label, idx) => (
                              <span key={idx} className="text-xs text-gray-600 dark:text-gray-400 font-bold">
                                {label}m
                              </span>
                            ))}
                          </div>
                          <div className={`flex-1 flex ${activityPeriod === '2weeks' ? 'gap-2' : 'gap-1'} items-end h-48`}>
                            {activityData.map((stat) => {
                              const barHeight = getBarHeight(stat.timeSpent, maxTimeSpent);
                              const isToday = stat.date === new Date().toISOString().split('T')[0];
                              return (
                                <div key={stat.date} className="flex-1 flex flex-col items-center h-full group">
                                  <div className="relative w-full h-full flex flex-col justify-end pb-1">
                                    <div
                                      className={`w-full rounded-t-lg transition-all duration-300 ${
                                        stat.timeSpent > 0
                                          ? 'bg-gradient-to-t from-purple-700 via-purple-600 to-purple-500 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                                          : 'bg-gray-200 dark:bg-dark-200 opacity-40'
                                      } ${isToday ? 'ring-2 ring-purple-400 dark:ring-purple-500 ring-offset-2' : ''}`}
                                      style={{
                                        height: `${barHeight}%`,
                                        minHeight: stat.timeSpent > 0 ? '10px' : '3px'
                                      }}
                                      title={`${stat.timeSpent} min${isToday ? ' (Today)' : ''}`}
                                    >
                                      {stat.timeSpent > 0 && (
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-800 dark:text-purple-300 whitespace-nowrap bg-white dark:bg-dark-50 px-1.5 py-0.5 rounded shadow-sm">
                                          {stat.timeSpent}m
              </div>
            )}
                                    </div>
                                  </div>
                                  <div className={`text-xs text-gray-700 dark:text-gray-300 font-semibold mt-3 text-center ${isToday ? 'text-purple-600 dark:text-purple-400 font-bold' : ''}`}>
                                    {activityPeriod === '2weeks' ? getDayLabel(stat.date) : getDateLabel(stat.date)}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Words Retyped Chart */}
                      <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="text-xl">✍️</span>
                            <span>Words Retyped</span>
            </h3>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {activityData.reduce((sum, d) => sum + d.wordsRetyped, 0).toLocaleString()} total
                    </div>
                        </div>
                        <div className="flex gap-4 items-end">
                          <div className="flex flex-col justify-between h-48 pr-3 border-r-2 border-gray-200 dark:border-dark-100">
                            {getYAxisLabels(maxWordsRetyped).map((label, idx) => (
                              <span key={idx} className="text-xs text-gray-600 dark:text-gray-400 font-bold">
                                {label}
                    </span>
                            ))}
                  </div>
                          <div className={`flex-1 flex ${activityPeriod === '2weeks' ? 'gap-2' : 'gap-1'} items-end h-48`}>
                            {activityData.map((stat) => {
                              const barHeight = getBarHeight(stat.wordsRetyped, maxWordsRetyped);
                              const isToday = stat.date === new Date().toISOString().split('T')[0];
                              return (
                                <div key={stat.date} className="flex-1 flex flex-col items-center h-full group">
                                  <div className="relative w-full h-full flex flex-col justify-end pb-1">
                                    <div
                                      className={`w-full rounded-t-lg transition-all duration-300 ${
                                        stat.wordsRetyped > 0
                                          ? 'bg-gradient-to-t from-blue-700 via-blue-600 to-blue-500 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                                          : 'bg-gray-200 dark:bg-dark-200 opacity-40'
                                      } ${isToday ? 'ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-2' : ''}`}
                                      style={{
                                        height: `${barHeight}%`,
                                        minHeight: stat.wordsRetyped > 0 ? '10px' : '3px'
                                      }}
                                      title={`${stat.wordsRetyped} words${isToday ? ' (Today)' : ''}`}
                                    >
                                      {stat.wordsRetyped > 0 && (
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-800 dark:text-blue-300 whitespace-nowrap bg-white dark:bg-dark-50 px-1.5 py-0.5 rounded shadow-sm">
                                          {stat.wordsRetyped}
                  </div>
                                      )}
                </div>
            </div>
                                  <div className={`text-xs text-gray-700 dark:text-gray-300 font-semibold mt-3 text-center ${isToday ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}>
                                    {activityPeriod === '2weeks' ? getDayLabel(stat.date) : getDateLabel(stat.date)}
          </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'leaderboard' && (
                  <div className="flex flex-col h-full overflow-hidden">
                    <div className="mb-6 flex-shrink-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Global Leaderboard</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Top 30 players ranked by total words retyped</p>
                  </div>

                    <div className="flex-1 overflow-y-auto pr-2">
                      <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 dark:bg-dark-100 border-b border-gray-200 dark:border-dark-200">
                          <div className="col-span-1 text-xs font-semibold text-gray-600 dark:text-gray-400">RANK</div>
                          <div className="col-span-5 text-xs font-semibold text-gray-600 dark:text-gray-400">PLAYER</div>
                          <div className="col-span-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400">FLOW</div>
                          <div className="col-span-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400">TOTAL XP</div>
                        </div>

                        {/* Leaderboard List */}
                        <div className="divide-y divide-gray-100 dark:divide-dark-200">
                          {leaderboardData.map((player: any, i: number) => (
                            <div
                              key={i}
                              className={`px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors ${
                                player.isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
                              }`}
                            >
                              {/* Desktop Layout */}
                              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                                {/* Rank */}
                                <div className="col-span-1">
                                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
                                    i === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                    i === 1 ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                                    i === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                    player.isCurrentUser ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                  }`}>
                                    {player.rank}
                                  </div>
                                </div>

                                {/* Name & Category */}
                                <div className="col-span-5">
                                  <div className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    {player.name}
                                    {player.isCurrentUser && (
                                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">You</span>
                                    )}
                                  </div>
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

                              {/* Mobile Layout */}
                              <div className="md:hidden flex items-start gap-3">
                                <div className={`flex-shrink-0 w-12 h-12 rounded-lg font-bold text-base flex items-center justify-center ${
                                  i === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                  i === 1 ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                                  i === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                  player.isCurrentUser ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                  'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                  {player.rank}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1 leading-tight flex items-center gap-2">
                                    {player.name}
                                    {player.isCurrentUser && (
                                      <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded">You</span>
                                    )}
                                  </div>
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
                )}
        </div>
            </div>
          </div>
        </main>
      </div>

      {/* New Goal Modal */}
      {showNewGoalModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-50 border border-gray-200 dark:border-dark-100 rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Create Reward Goal
            </h2>

            <div className="space-y-4">
              {/* Reward Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Reward Description
                </label>
                <input
                  type="text"
                  value={newGoal.reward}
                  onChange={(e) => setNewGoal({ ...newGoal, reward: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-200 bg-white dark:bg-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                  placeholder="e.g., New iPhone, 2 hours PC time, €50"
                />
              </div>

              {/* Requirements */}
              <div className="pt-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Requirements (set at least one)
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Hours */}
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Hours
                  </label>
                  <input
                    type="number"
                    value={newGoal.hours}
                    onChange={(e) => setNewGoal({ ...newGoal, hours: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-dark-200 bg-white dark:bg-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                    placeholder="10"
                    min="0"
                  />
                </div>

                {/* Words */}
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Words
                  </label>
                  <input
                    type="number"
                    value={newGoal.words}
                    onChange={(e) => setNewGoal({ ...newGoal, words: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-dark-200 bg-white dark:bg-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                    placeholder="5000"
                    min="0"
                  />
                </div>

                {/* Scenarios */}
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Scenarios
                  </label>
                  <input
                    type="number"
                    value={newGoal.scenarios}
                    onChange={(e) => setNewGoal({ ...newGoal, scenarios: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-dark-200 bg-white dark:bg-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                    placeholder="20"
                    min="0"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowNewGoalModal(false);
                    setNewGoal({ reward: '', hours: '', words: '', scenarios: '' });
                  }}
                  className="flex-1 py-2 border border-gray-300 dark:border-dark-200 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGoal}
                  className="flex-1 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
