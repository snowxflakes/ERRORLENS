import React from 'react';
import { 
  Award, 
  Flame, 
  CheckCircle2, 
  Terminal, 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  Bookmark, 
  ArrowRight, 
  Code2,
  BarChart3,
  Layers
} from 'lucide-react';
import { UserStats, ErrorAnalysis, ActiveView, LanguageId } from '../../types';
import { COMMON_ERRORS_DATABASE } from '../../constants/commonErrors';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

interface UserDashboardProps {
  stats: UserStats;
  history: ErrorAnalysis[];
  onOpenAnalysis: (item: ErrorAnalysis) => void;
  onOpenLibraryDoc: (docId: string) => void;
  setActiveView: (view: ActiveView) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  stats,
  history,
  onOpenAnalysis,
  onOpenLibraryDoc,
  setActiveView,
}) => {
  const xpInLevel = stats.xp % 150;
  const progressPercent = Math.min(100, Math.round((xpInLevel / 150) * 100));

  const savedErrorsList = COMMON_ERRORS_DATABASE.filter(doc =>
    stats.savedErrorIds.includes(doc.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#15102a] via-[#0f0f0f] to-[#0a0a0a] border border-indigo-500/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Developer Learning Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] tracking-tight">
            Welcome back, Developer 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#a3a3a3] max-w-xl">
            You've analyzed <strong className="text-indigo-400">{stats.totalAnalyses} error instances</strong> and mastered <strong className="text-emerald-400">{stats.errorsSolved} core concepts</strong>.
          </p>
        </div>

        {/* Level Progression Card */}
        <div className="bg-[#0a0a0a] border border-[#262626] p-4 rounded-2xl min-w-[240px] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#737373]">Level {stats.level} Developer</span>
            <span className="text-xs font-bold text-indigo-400 font-mono">{stats.xp} Total XP</span>
          </div>
          <div className="w-full h-2.5 bg-[#141414] border border-[#262626] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-[#737373]">
            <span>{xpInLevel} / 150 XP</span>
            <span>Next: Level {stats.level + 1}</span>
          </div>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Errors Analyzed */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-2">
          <div className="flex items-center justify-between text-[#737373]">
            <span className="text-xs font-mono uppercase font-bold">Errors Analyzed</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#f5f5f5]">
            {stats.totalAnalyses}
          </div>
          <p className="text-xs text-[#737373]">Total sessions executed</p>
        </div>

        {/* Card 2: Errors Solved */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-2">
          <div className="flex items-center justify-between text-[#737373]">
            <span className="text-xs font-mono uppercase font-bold">Errors Solved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">
            {stats.errorsSolved}
          </div>
          <p className="text-xs text-[#737373]">Understood & corrected</p>
        </div>

        {/* Card 3: Active Streak */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-2">
          <div className="flex items-center justify-between text-[#737373]">
            <span className="text-xs font-mono uppercase font-bold">Debugging Streak</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-400/20" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-400">
            {stats.streakDays} Days
          </div>
          <p className="text-xs text-[#737373]">Active learning consistency</p>
        </div>

        {/* Card 4: Quizzes Completed */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-2">
          <div className="flex items-center justify-between text-[#737373]">
            <span className="text-xs font-mono uppercase font-bold">Detective Quizzes</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-purple-400">
            {stats.completedQuizIds.length}
          </div>
          <p className="text-xs text-[#737373]">Challenges completed</p>
        </div>

      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Error Categories Distribution */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0f0f0f] border border-[#262626] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#f5f5f5] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" /> Error Types Encountered
            </h3>
            <span className="text-xs font-mono text-[#737373]">Distribution</span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Syntax Errors', count: stats.categoryCounts.syntax || 6, color: 'bg-red-500' },
              { label: 'Runtime Exceptions', count: stats.categoryCounts.runtime || 4, color: 'bg-rose-500' },
              { label: 'Compilation Errors', count: stats.categoryCounts.compilation || 3, color: 'bg-amber-500' },
              { label: 'Logical Inconsistencies', count: stats.categoryCounts.logical || 1, color: 'bg-purple-500' },
            ].map((cat, idx) => {
              const total = Math.max(1, stats.totalAnalyses);
              const pct = Math.round((cat.count / total) * 100);

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#d1d1d1]">{cat.label}</span>
                    <span className="text-[#737373]">{cat.count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-[#141414] border border-[#262626] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Language Distribution */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0f0f0f] border border-[#262626] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#f5f5f5] flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Language Distribution
            </h3>
            <span className="text-xs font-mono text-[#737373]">By Code Volume</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {SUPPORTED_LANGUAGES.slice(0, 4).map(lang => {
              const count = stats.languageCounts[lang.id] || 0;
              return (
                <div key={lang.id} className="p-3 rounded-xl bg-[#141414] border border-[#262626] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#d1d1d1]">{lang.name}</span>
                    <span className="text-xs font-mono text-indigo-400">{count} runs</span>
                  </div>
                  <div className="text-[11px] text-[#737373] font-mono">{lang.extension}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Recent Analyses List */}
      <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-[#262626] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[#f5f5f5] flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" /> Recent Error Analyses
          </h3>
          <button
            onClick={() => setActiveView('history')}
            className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View Full History <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {history.length === 0 ? (
          <div className="py-8 text-center text-[#737373] text-xs">
            No analyses recorded yet. Try analyzing some code in the workspace!
          </div>
        ) : (
          <div className="divide-y divide-[#262626]">
            {history.slice(0, 4).map(item => (
              <div
                key={item.id}
                onClick={() => onOpenAnalysis(item)}
                className="py-3 flex items-center justify-between gap-4 group cursor-pointer hover:bg-[#141414] px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2 py-0.5 rounded bg-[#141414] text-[#d1d1d1] border border-[#262626] font-mono text-xs font-semibold uppercase shrink-0">
                    {item.language}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-[#f5f5f5] group-hover:text-indigo-400 transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#737373] font-mono truncate">
                      {item.errorType} • Line {item.location.line ?? 1}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.solved && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                      Solved
                    </span>
                  )}
                  <button className="text-xs text-indigo-400 font-medium hidden sm:inline">
                    Inspect →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bookmarked / Saved Errors Drawer */}
      <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-[#262626] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[#f5f5f5] flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" /> Bookmarked Error Guides
          </h3>
          <button
            onClick={() => setActiveView('library')}
            className="text-xs font-mono text-indigo-400 hover:text-indigo-300"
          >
            Explore Library →
          </button>
        </div>

        {savedErrorsList.length === 0 ? (
          <p className="text-xs text-[#737373]">
            No saved errors yet. Click the bookmark icon on any error card to save it for quick revision.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedErrorsList.map(doc => (
              <div
                key={doc.id}
                onClick={() => onOpenLibraryDoc(doc.id)}
                className="p-4 rounded-xl bg-[#141414] border border-[#262626] hover:border-amber-500/50 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1f1f1f] text-indigo-400 font-semibold border border-[#262626]">
                    {doc.language}
                  </span>
                  <span className="text-xs text-amber-400 font-mono capitalize">{doc.category}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#f5f5f5] truncate">{doc.name}</h4>
                <p className="text-xs text-[#737373] line-clamp-2">{doc.shortDesc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
