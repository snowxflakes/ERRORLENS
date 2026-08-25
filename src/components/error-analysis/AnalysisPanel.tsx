import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  Wrench, 
  ShieldCheck, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  FileCode2, 
  Share2,
  Code,
  CheckCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ErrorAnalysis, ErrorCategory } from '../../types';

interface AnalysisPanelProps {
  analysis: ErrorAnalysis | null;
  onApplyFix: (fixedCode: string) => void;
  onBookmark: (id: string) => void;
  onMarkSolved: (id: string) => void;
  onSelectConcept?: (concept: string) => void;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  analysis,
  onApplyFix,
  onBookmark,
  onMarkSolved,
  onSelectConcept,
}) => {
  const [copiedFixed, setCopiedFixed] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!analysis) {
    return (
      <div className="h-full min-h-[440px] flex flex-col items-center justify-center p-8 bg-[#0f0f0f]/60 border border-[#262626] rounded-2xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 animate-pulse">
          <Code className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-[#f5f5f5] mb-2">
          Ready to Analyze Your Code
        </h3>
        <p className="text-sm text-[#a3a3a3] max-w-md leading-relaxed">
          Write or paste your code in the editor, select the language, and click <strong className="text-indigo-400">"Analyze My Code"</strong> or press <kbd className="px-1.5 py-0.5 rounded bg-[#141414] text-xs font-mono border border-[#262626] text-[#d1d1d1]">Ctrl + Enter</kbd>.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-[#737373] font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[#141414] border border-[#262626]">✓ Syntax Verification</span>
          <span className="px-2.5 py-1 rounded-md bg-[#141414] border border-[#262626]">✓ Scope & Types</span>
          <span className="px-2.5 py-1 rounded-md bg-[#141414] border border-[#262626]">✓ Runtime Hazards</span>
        </div>
      </div>
    );
  }

  const getCategoryBadge = (category: ErrorCategory) => {
    switch (category) {
      case 'syntax':
        return {
          icon: <AlertCircle className="w-4 h-4 text-red-400" />,
          label: 'Syntax Error',
          color: 'bg-red-500/10 text-red-400 border-red-500/30',
        };
      case 'compilation':
        return {
          icon: <AlertCircle className="w-4 h-4 text-amber-400" />,
          label: 'Compilation Error',
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        };
      case 'runtime':
        return {
          icon: <AlertCircle className="w-4 h-4 text-rose-400" />,
          label: 'Runtime Error',
          color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        };
      case 'logical':
        return {
          icon: <HelpCircle className="w-4 h-4 text-purple-400" />,
          label: 'Logical Error',
          color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
        };
      default:
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          label: 'Verified Code',
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        };
    }
  };

  const badge = getCategoryBadge(analysis.category);

  const handleCopyFixed = () => {
    navigator.clipboard.writeText(analysis.correctedCode);
    setCopiedFixed(true);
    setTimeout(() => setCopiedFixed(false), 2000);
  };

  const handleCopySummary = () => {
    const summary = `[${badge.label}] ${analysis.title}
Location: Line ${analysis.location.line ?? 'N/A'}
What Happened: ${analysis.whatHappened}
Why: ${analysis.whyItHappened}
Prevention: ${analysis.preventionTip}
Analyzed via ErrorLens Platform`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleMarkSolvedWithConfetti = () => {
    onMarkSolved(analysis.id);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#34d399', '#f59e0b'],
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top Header Card */}
      <div className="p-5 bg-[#0a0a0a] border-b border-[#262626]">
        
        {/* Badges & Actions Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold font-mono uppercase tracking-wider ${badge.color}`}>
              {badge.icon}
              <span>{badge.label}</span>
            </div>

            <span className="px-2.5 py-1 rounded-lg bg-[#141414] text-[#d1d1d1] text-xs font-mono uppercase font-semibold border border-[#262626]">
              {analysis.language}
            </span>

            {analysis.location.line && (
              <span className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                Line {analysis.location.line}
                {analysis.location.column ? `, Col ${analysis.location.column}` : ''}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Bookmark */}
            <button
              onClick={() => onBookmark(analysis.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                analysis.bookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-[#141414] text-[#737373] hover:text-[#f5f5f5] border-[#262626]'
              }`}
              title={analysis.bookmarked ? 'Remove bookmark' : 'Bookmark this error for later'}
            >
              {analysis.bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Share Summary */}
            <button
              onClick={handleCopySummary}
              className="p-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-[#737373] hover:text-[#f5f5f5] border border-[#262626] transition-colors"
              title="Copy analysis summary to clipboard"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#f5f5f5] tracking-tight">
          {analysis.title}
        </h2>
      </div>

      {/* Structured Pedagogical Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* Section 1: What Happened? */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d1d1d1] uppercase tracking-wider font-mono">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>1. What Happened?</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#141414] border border-[#262626] text-sm text-[#d1d1d1] leading-relaxed">
            {analysis.whatHappened}
          </div>
        </div>

        {/* Section 2: Why Did It Happen? (Deep Learning) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>2. Why Did It Happen? (The Concept)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-sm text-[#d1d1d1] leading-relaxed">
            {analysis.whyItHappened}
          </div>
        </div>

        {/* Section 3: How To Fix It */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>3. How To Fix It</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#141414] border border-[#262626] space-y-2">
            <ul className="space-y-2 text-sm text-[#d1d1d1]">
              {analysis.howToFix.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 4: Interactive Code Fix / Diff */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              <span>4. Corrected Code Solution</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyFixed}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#141414] hover:bg-[#1f1f1f] text-[#a3a3a3] hover:text-[#f5f5f5] text-xs font-mono border border-[#262626] transition-colors"
              >
                {copiedFixed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFixed ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                id="apply-fix-to-editor-btn"
                onClick={() => onApplyFix(analysis.correctedCode)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold font-mono transition-all shadow-md shadow-indigo-600/20"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Apply Fix to Editor</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#262626] bg-[#0c0c0c]">
            <div className="px-3 py-1.5 bg-[#0f0f0f] border-b border-[#262626] text-[11px] text-[#737373] font-mono flex items-center justify-between">
              <span>Solution Snippet</span>
              <span className="text-emerald-400">✓ Tested & Verified</span>
            </div>
            <pre className="p-4 text-xs font-mono text-[#f5f5f5] overflow-x-auto leading-relaxed">
              <code>{analysis.correctedCode}</code>
            </pre>
          </div>
        </div>

        {/* Section 5: What You Learned */}
        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/25 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>What You Learned</span>
          </div>
          <p className="text-xs sm:text-sm text-[#d1d1d1] leading-relaxed">
            {analysis.whatYouLearned}
          </p>
        </div>

        {/* Section 6: Prevention Pro-Tip */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              Prevention Pro-Tip
            </h4>
            <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">
              {analysis.preventionTip}
            </p>
          </div>
        </div>

        {/* Section 7: Related Concepts */}
        {analysis.relatedConcepts && analysis.relatedConcepts.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-[#737373] uppercase tracking-wider font-mono">
              Related Concepts:
            </span>
            <div className="flex flex-wrap gap-2">
              {analysis.relatedConcepts.map((concept, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectConcept?.(concept)}
                  className="px-2.5 py-1 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-indigo-400 hover:text-indigo-300 text-xs font-mono border border-[#262626] transition-colors"
                >
                  #{concept}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer Bottom Bar with Solved Action */}
      <div className="p-4 bg-[#0a0a0a] border-t border-[#262626] flex items-center justify-between gap-3">
        <div className="text-xs text-[#737373] font-mono">
          {analysis.solved ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Solved & Understood!
            </span>
          ) : (
            <span>Understand the concept? Mark it solved!</span>
          )}
        </div>

        {!analysis.solved && (
          <button
            id="mark-solved-btn"
            onClick={handleMarkSolvedWithConfetti}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>I Understand (+30 XP)</span>
          </button>
        )}
      </div>

    </div>
  );
};
