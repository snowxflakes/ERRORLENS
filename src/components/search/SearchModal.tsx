import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, Code2, ArrowRight, CornerDownLeft, Sparkles, Filter } from 'lucide-react';
import { COMMON_ERRORS_DATABASE } from '../../constants/commonErrors';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import { CommonErrorDoc, LanguageId, ActiveView } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectError: (doc: CommonErrorDoc) => void;
  onSelectLanguageForEditor: (lang: LanguageId) => void;
  setActiveView: (view: ActiveView) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectError,
  onSelectLanguageForEditor,
  setActiveView,
}) => {
  const [query, setQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    return COMMON_ERRORS_DATABASE.filter(item => {
      const matchLang = selectedLang === 'all' || item.language === selectedLang;
      if (!matchLang) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q)) ||
        item.language.toLowerCase().includes(q)
      );
    });
  }, [query, selectedLang]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-[#0f0f0f] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-[#262626] flex items-center gap-3 bg-[#0a0a0a]">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search error types (e.g. segmentation fault, name error, missing semicolon)..."
            className="w-full bg-transparent text-[#f5f5f5] placeholder-[#525252] text-sm focus:outline-none font-mono"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-[#737373] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-[#141414] text-[#737373] border border-[#262626] hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 border-b border-[#262626] bg-[#0a0a0a]/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#525252] flex items-center gap-1 font-mono text-[11px]">
            <Filter className="w-3 h-3" /> Lang:
          </span>
          <button
            onClick={() => setSelectedLang('all')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedLang === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'bg-[#141414] text-[#737373] hover:text-[#d1d1d1] border border-[#262626]'
            }`}
          >
            All
          </button>
          {SUPPORTED_LANGUAGES.slice(0, 5).map(l => (
            <button
              key={l.id}
              onClick={() => setSelectedLang(l.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase transition-colors ${
                selectedLang === l.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-[#141414] text-[#737373] hover:text-[#d1d1d1] border border-[#262626]'
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#0f0f0f]">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-[#525252]">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30 text-indigo-400" />
              <p className="text-sm font-medium text-[#737373]">No error patterns matched "{query}"</p>
              <p className="text-xs text-[#525252] mt-1 font-mono">
                Try searching for 'null', 'semicolon', 'index', 'type', or 'memory'
              </p>
            </div>
          ) : (
            filteredResults.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectError(item);
                  onClose();
                }}
                className="group p-3 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] hover:border-indigo-500/40 transition-all cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#1f1f1f] text-indigo-400 font-mono border border-[#262626]">
                      {item.language}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.category === 'syntax' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      item.category === 'runtime' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-[#737373] font-mono capitalize">
                      {item.difficulty}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#f5f5f5] group-hover:text-indigo-400 transition-colors truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#737373] line-clamp-1">
                    {item.shortDesc}
                  </p>
                </div>
                <div className="shrink-0 pt-2 text-[#525252] group-hover:text-indigo-400 transition-colors">
                  <CornerDownLeft className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 border-t border-[#262626] bg-[#0a0a0a] flex items-center justify-between text-[11px] text-[#525252] font-mono">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#141414] border border-[#262626] text-[#737373]">↵</kbd> to view</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-[#141414] border border-[#262626] text-[#737373]">ESC</kbd> to close</span>
          </div>
          <button
            onClick={() => {
              setActiveView('library');
              onClose();
            }}
            className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 font-sans"
          >
            Browse Full Library <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
