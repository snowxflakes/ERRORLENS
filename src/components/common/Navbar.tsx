import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  BookOpen, 
  LayoutDashboard, 
  History, 
  Award, 
  Search, 
  Flame, 
  Code2,
  HelpCircle
} from 'lucide-react';
import { ActiveView, UserStats } from '../../types';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  stats: UserStats;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  stats,
  onOpenSearch,
}) => {
  const xpInCurrentLevel = stats.xp % 150;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / 150) * 100));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#262626] bg-[#0f0f0f]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            id="brand-logo-btn"
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base tracking-tight text-[#f5f5f5] group-hover:text-white transition-colors">
                  ErrorLens
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#141414] text-indigo-400 border border-indigo-500/30">
                  EDU
                </span>
              </div>
              <p className="text-[11px] text-[#525252] font-mono hidden sm:block">
                Understand why code breaks
              </p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              id="nav-analyzer-btn"
              onClick={() => setActiveView('analyzer')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'analyzer'
                  ? 'bg-[#141414] text-[#f5f5f5] border border-[#262626] shadow-sm font-semibold'
                  : 'text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#141414]/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              Code Analyzer
            </button>

            <button
              id="nav-library-btn"
              onClick={() => setActiveView('library')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'library'
                  ? 'bg-[#141414] text-[#f5f5f5] border border-[#262626] shadow-sm font-semibold'
                  : 'text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#141414]/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              Error Library
            </button>

            <button
              id="nav-learn-btn"
              onClick={() => setActiveView('learn')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'learn'
                  ? 'bg-[#141414] text-[#f5f5f5] border border-[#262626] shadow-sm font-semibold'
                  : 'text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#141414]/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Debug Detective
            </button>

            <button
              id="nav-dashboard-btn"
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'dashboard'
                  ? 'bg-[#141414] text-[#f5f5f5] border border-[#262626] shadow-sm font-semibold'
                  : 'text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#141414]/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              Dashboard
            </button>

            <button
              id="nav-history-btn"
              onClick={() => setActiveView('history')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'history'
                  ? 'bg-[#141414] text-[#f5f5f5] border border-[#262626] shadow-sm font-semibold'
                  : 'text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#141414]/60'
              }`}
            >
              <History className="w-3.5 h-3.5 text-orange-400" />
              History
            </button>
          </nav>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-3">
          
          {/* Quick Search Button */}
          <button
            id="global-search-trigger"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-[#737373] hover:text-[#d1d1d1] hover:border-[#383838] transition-all text-xs font-mono"
            title="Search error library and concepts (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Search errors...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#1f1f1f] text-[10px] text-[#737373] border border-[#262626]">
              ⌘K
            </kbd>
          </button>

          {/* Streak Indicator */}
          <div 
            id="streak-badge"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141414] border border-amber-500/30 text-amber-400 text-xs font-mono font-medium"
            title={`${stats.streakDays} Day Debugging Streak!`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span>{stats.streakDays}d Streak</span>
          </div>

          {/* User Level & XP Capsule */}
          <button
            id="user-profile-stats-badge"
            onClick={() => setActiveView('dashboard')}
            className="hidden sm:flex items-center gap-2.5 pl-3 pr-2 py-1 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#383838] transition-colors text-left"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-semibold text-[#f5f5f5]">Lvl {stats.level}</span>
                <span className="text-[10px] text-[#737373] font-mono">({stats.xp} XP)</span>
              </div>
              <div className="w-20 h-1.5 bg-[#262626] rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </button>

        </div>

      </div>

      {/* Mobile Navigation Sub-Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#262626] bg-[#0f0f0f] px-2 py-2 text-xs">
        <button
          onClick={() => setActiveView('analyzer')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded ${
            activeView === 'analyzer' ? 'text-indigo-400 font-bold' : 'text-[#737373]'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Analyze</span>
        </button>
        <button
          onClick={() => setActiveView('library')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded ${
            activeView === 'library' ? 'text-indigo-400 font-bold' : 'text-[#737373]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Library</span>
        </button>
        <button
          onClick={() => setActiveView('learn')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded ${
            activeView === 'learn' ? 'text-indigo-400 font-bold' : 'text-[#737373]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Detective</span>
        </button>
        <button
          onClick={() => setActiveView('dashboard')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded ${
            activeView === 'dashboard' ? 'text-indigo-400 font-bold' : 'text-[#737373]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Stats</span>
        </button>
      </div>
    </header>
  );
};
