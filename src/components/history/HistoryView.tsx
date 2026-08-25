import React, { useState, useMemo } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Trash2, 
  Play, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  ArrowRight, 
  Clock,
  Terminal,
  Layers
} from 'lucide-react';
import { ErrorAnalysis, LanguageId, ErrorCategory } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

interface HistoryViewProps {
  history: ErrorAnalysis[];
  onOpenAnalysis: (item: ErrorAnalysis) => void;
  onBookmark: (id: string) => void;
  onClearHistory: () => void;
  onLoadInWorkspace: (code: string, lang: LanguageId) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onOpenAnalysis,
  onBookmark,
  onClearHistory,
  onLoadInWorkspace,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredHistory = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return history.filter(item => {
      const matchLang = selectedLang === 'all' || item.language === selectedLang;
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchLang || !matchCategory) return false;
      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.errorType.toLowerCase().includes(q) ||
        item.whatHappened.toLowerCase().includes(q)
      );
    });
  }, [history, searchQuery, selectedLang, selectedCategory]);

  const formatTimestamp = (ts: number) => {
    const diffHours = Math.round((Date.now() - ts) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.round(diffHours / 24);
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] tracking-tight">
              Analysis History
            </h1>
          </div>
          <p className="text-sm text-[#a3a3a3]">
            Revisit your previous debugging sessions, review solutions, and track your conceptual comprehension.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear your debugging history?')) {
                onClearHistory();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f0f0f] hover:bg-red-950/30 text-[#737373] hover:text-red-400 border border-[#262626] hover:border-red-500/30 text-xs font-mono transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-[#262626] space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search previous analyses by error type or keyword..."
              className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#262626] rounded-xl text-sm text-[#f5f5f5] placeholder-[#525252] focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Language Selector Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs pb-1 md:pb-0">
            <button
              onClick={() => setSelectedLang('all')}
              className={`px-3 py-1.5 rounded-lg font-mono font-semibold transition-colors ${
                selectedLang === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-[#141414] text-[#a3a3a3] hover:text-[#f5f5f5] border border-[#262626]'
              }`}
            >
              All
            </button>
            {SUPPORTED_LANGUAGES.slice(0, 5).map(l => (
              <button
                key={l.id}
                onClick={() => setSelectedLang(l.id)}
                className={`px-3 py-1.5 rounded-lg font-mono font-semibold uppercase transition-colors ${
                  selectedLang === l.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-[#141414] text-[#a3a3a3] hover:text-[#f5f5f5] border border-[#262626]'
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>

        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono pt-1">
          <span className="text-[#525252] flex items-center gap-1">
            <Filter className="w-3 h-3" /> Category:
          </span>
          {['all', 'syntax', 'compilation', 'runtime', 'logical'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1f1f1f] text-white font-semibold border border-[#383838]'
                  : 'bg-[#0a0a0a] text-[#737373] hover:text-[#d1d1d1] border border-[#262626]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* History Items Grid */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="py-16 text-center text-[#737373] bg-[#0f0f0f]/50 rounded-2xl border border-[#262626] space-y-3">
            <History className="w-12 h-12 mx-auto opacity-30 text-indigo-400" />
            <h3 className="text-base font-semibold text-[#d1d1d1]">No matching analysis history found</h3>
            <p className="text-xs text-[#525252]">Run code analyses in the workspace to build your history log</p>
          </div>
        ) : (
          filteredHistory.map(item => (
            <div
              key={item.id}
              onClick={() => onOpenAnalysis(item)}
              className="p-5 rounded-2xl bg-[#0f0f0f] hover:bg-[#141414] border border-[#262626] hover:border-indigo-500/40 transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group shadow-xl"
            >
              <div className="space-y-2 min-w-0 flex-1">
                
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded bg-[#141414] text-indigo-400 font-mono text-xs font-bold uppercase border border-[#262626]">
                    {item.language}
                  </span>
                  
                  <span className={`px-2.5 py-0.5 rounded text-xs font-semibold capitalize ${
                    item.category === 'syntax' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    item.category === 'runtime' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.category}
                  </span>

                  {item.location.line && (
                    <span className="text-xs text-[#737373] font-mono">
                      Line {item.location.line}
                    </span>
                  )}

                  <span className="text-xs text-[#525252] font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {formatTimestamp(item.timestamp)}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[#f5f5f5] group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#a3a3a3] line-clamp-1 mt-0.5">
                    {item.whatHappened}
                  </p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#262626]">
                {item.solved && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Understood
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark(item.id);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    item.bookmarked ? 'text-amber-400' : 'text-[#525252] hover:text-[#a3a3a3]'
                  }`}
                  title="Bookmark this session"
                >
                  {item.bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLoadInWorkspace(item.originalCode, item.language);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-[#d1d1d1] border border-[#262626] text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Open in Workspace</span>
                </button>

                <div className="text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
