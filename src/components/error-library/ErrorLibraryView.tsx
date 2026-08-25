import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Code2, 
  ArrowRight, 
  Check, 
  X, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  HelpCircle, 
  Terminal, 
  Lightbulb, 
  ShieldCheck,
  ChevronRight,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMMON_ERRORS_DATABASE } from '../../constants/commonErrors';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import { CommonErrorDoc, LanguageId, ErrorCategory } from '../../types';

interface ErrorLibraryViewProps {
  onLoadInEditor: (code: string, lang: LanguageId) => void;
  savedErrorIds: string[];
  onToggleSave: (id: string) => void;
  onSelectConcept?: (concept: string) => void;
}

export const ErrorLibraryView: React.FC<ErrorLibraryViewProps> = ({
  onLoadInEditor,
  savedErrorIds,
  onToggleSave,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalDoc, setActiveModalDoc] = useState<CommonErrorDoc | null>(null);

  // Practice Quiz State for current modal
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const filteredErrors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return COMMON_ERRORS_DATABASE.filter(item => {
      const matchLang = selectedLang === 'all' || item.language === selectedLang;
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchLang || !matchCategory) return false;
      if (!q) return true;

      return (
        item.name.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedLang, selectedCategory]);

  const handleOpenDoc = (doc: CommonErrorDoc) => {
    setActiveModalDoc(doc);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
  };

  const handleQuizSubmit = (correctIdx: number) => {
    setQuizSubmitted(true);
    if (quizSelectedOption === correctIdx) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] tracking-tight">
              Common Errors Encyclopedia
            </h1>
          </div>
          <p className="text-sm text-[#a3a3a3]">
            A comprehensive reference of frequent compiler errors, runtime exceptions, and subtle bugs across languages.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#737373]">
          <span className="px-3 py-1.5 rounded-lg bg-[#0f0f0f] border border-[#262626]">
            📚 {COMMON_ERRORS_DATABASE.length} Documented Error Blueprints
          </span>
        </div>
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
              placeholder="Search by error name, keyword, or concept (e.g. segmentation fault, null, undefined)..."
              className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#262626] rounded-xl text-sm text-[#f5f5f5] placeholder-[#525252] focus:outline-none focus:border-indigo-500 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[#737373] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
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
              All Languages
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

      {/* Errors Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredErrors.length === 0 ? (
          <div className="col-span-full py-16 text-center text-[#737373] bg-[#0f0f0f]/50 rounded-2xl border border-[#262626]">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30 text-indigo-400" />
            <h3 className="text-base font-semibold text-[#d1d1d1]">No error articles matched</h3>
            <p className="text-xs text-[#525252] mt-1 font-mono">Try clearing your filters or changing your query</p>
          </div>
        ) : (
          filteredErrors.map(doc => {
            const isSaved = savedErrorIds.includes(doc.id);

            return (
              <div
                key={doc.id}
                onClick={() => handleOpenDoc(doc)}
                className="group p-5 rounded-2xl bg-[#0f0f0f] hover:bg-[#141414] border border-[#262626] hover:border-indigo-500/40 transition-all shadow-xl cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  
                  {/* Card Badges Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-[#141414] text-indigo-400 border border-[#262626]">
                        {doc.language}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                        doc.category === 'syntax' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        doc.category === 'runtime' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {doc.category}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(doc.id);
                      }}
                      className={`p-1 rounded-md transition-colors ${
                        isSaved ? 'text-amber-400' : 'text-[#525252] hover:text-[#a3a3a3]'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save error'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-base font-semibold text-[#f5f5f5] group-hover:text-indigo-400 transition-colors leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-[#a3a3a3] mt-1.5 line-clamp-2 leading-relaxed">
                      {doc.shortDesc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {doc.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#0a0a0a] text-[#737373] text-[10px] font-mono border border-[#262626]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Card Action Link */}
                <div className="pt-3 border-t border-[#262626] flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:text-indigo-300">
                  <span>View Detailed Breakdown</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Detailed Modal Drawer */}
      {activeModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-3xl max-h-[90vh] bg-[#0f0f0f] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="p-5 bg-[#0a0a0a] border-b border-[#262626] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono uppercase font-bold border border-indigo-500/20">
                    {activeModalDoc.language}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#141414] text-[#d1d1d1] text-xs font-semibold capitalize border border-[#262626]">
                    {activeModalDoc.category} Error
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#f5f5f5] tracking-tight">
                  {activeModalDoc.name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleSave(activeModalDoc.id)}
                  className="p-2 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-[#a3a3a3] hover:text-white border border-[#262626]"
                  title="Bookmark"
                >
                  {savedErrorIds.includes(activeModalDoc.id) ? (
                    <BookmarkCheck className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => setActiveModalDoc(null)}
                  className="p-2 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-[#a3a3a3] hover:text-white border border-[#262626]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Definition */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Definition
                </h4>
                <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] text-sm text-[#d1d1d1] leading-relaxed">
                  {activeModalDoc.definition}
                </div>
              </div>

              {/* Why It Occurs */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" /> Why It Occurs
                </h4>
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-sm text-[#d1d1d1] leading-relaxed">
                  {activeModalDoc.whyOccurs}
                </div>
              </div>

              {/* Side by Side Code Example */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#d1d1d1] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-cyan-400" /> Incorrect vs Correct Code Comparison
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  {/* Incorrect */}
                  <div className="rounded-xl border border-red-500/30 overflow-hidden bg-[#0c0c0c]">
                    <div className="px-3 py-1.5 bg-red-950/30 border-b border-red-500/30 text-red-400 text-xs font-mono font-bold flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Incorrect (Causes Bug)
                    </div>
                    <pre className="p-3 text-xs font-mono text-red-300 overflow-x-auto">
                      <code>{activeModalDoc.incorrectCode}</code>
                    </pre>
                  </div>

                  {/* Correct */}
                  <div className="rounded-xl border border-emerald-500/30 overflow-hidden bg-[#0c0c0c]">
                    <div className="px-3 py-1.5 bg-emerald-950/30 border-b border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Correct (Clean Fix)
                    </div>
                    <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto">
                      <code>{activeModalDoc.correctCode}</code>
                    </pre>
                  </div>

                </div>
              </div>

              {/* Prevention Tip */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    How to Prevent This Error
                  </h4>
                  <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">
                    {activeModalDoc.prevention}
                  </p>
                </div>
              </div>

              {/* Interactive Practice Question */}
              <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Practice Understanding Check</span>
                  </div>
                  <span className="text-xs text-indigo-400 font-mono">+25 XP</span>
                </div>

                <p className="text-sm font-semibold text-[#f5f5f5] whitespace-pre-line">
                  {activeModalDoc.practiceQuestion.question}
                </p>

                <div className="space-y-2">
                  {activeModalDoc.practiceQuestion.options.map((option, idx) => {
                    const isSelected = quizSelectedOption === idx;
                    const isCorrect = idx === activeModalDoc.practiceQuestion.correctIndex;

                    let btnStyle = 'bg-[#0a0a0a] border-[#262626] text-[#d1d1d1] hover:border-indigo-500/40';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-red-500/15 border-red-500 text-red-300 line-through';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-indigo-600/20 border-indigo-500 text-white font-medium';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizSubmitted}
                        onClick={() => setQuizSelectedOption(idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    disabled={quizSelectedOption === null}
                    onClick={() => handleQuizSubmit(activeModalDoc.practiceQuestion.correctIndex)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs transition-colors"
                  >
                    Check My Answer
                  </button>
                ) : (
                  <div className="p-3.5 rounded-xl bg-[#0a0a0a] border border-[#262626] text-xs text-[#d1d1d1] leading-relaxed">
                    <strong className="text-white block mb-1">
                      {quizSelectedOption === activeModalDoc.practiceQuestion.correctIndex ? '🎉 Spot on!' : '💡 Conceptual Explanation:'}
                    </strong>
                    {activeModalDoc.practiceQuestion.explanation}
                  </div>
                )}

              </div>

            </div>

            {/* Modal Bottom Toolbar */}
            <div className="p-4 bg-[#0a0a0a] border-t border-[#262626] flex items-center justify-between gap-3">
              <span className="text-xs text-[#737373] font-mono">
                Tags: {activeModalDoc.tags.join(', ')}
              </span>

              <button
                onClick={() => {
                  onLoadInEditor(activeModalDoc.incorrectCode, activeModalDoc.language);
                  setActiveModalDoc(null);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/25"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Test in Code Workspace</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
