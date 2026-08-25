import React from 'react';
import { 
  Play, 
  BookOpen, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  Lightbulb, 
  ShieldCheck, 
  Code2, 
  Layers,
  Cpu,
  Flame,
  Award
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import { ActiveView, LanguageId } from '../../types';

interface LandingHeroProps {
  onStartAnalyzing: (lang?: LanguageId) => void;
  setActiveView: (view: ActiveView) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartAnalyzing,
  setActiveView,
}) => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 text-center max-w-4xl mx-auto px-4">
        
        {/* Subtle glowing backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Educational Developer Tool for Students & Beginners</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#f5f5f5] leading-[1.15] mb-6">
          Understand Your Code. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
            Learn From Your Errors.
          </span>
        </h1>

        {/* Manifesto Quote */}
        <p className="text-lg sm:text-xl text-[#a3a3a3] max-w-2xl mx-auto leading-relaxed mb-8">
          Don't just copy-paste a quick fix — understand <em>why</em> it broke. 
          Paste your code, isolate the bug, and receive plain-English conceptual explanations, step-by-step fixes, and prevention tips.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            id="hero-analyze-cta"
            onClick={() => onStartAnalyzing('c')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            <span>Analyze My Code</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-library-cta"
            onClick={() => setActiveView('library')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-[#141414] hover:bg-[#1f1f1f] text-[#d1d1d1] border border-[#262626] hover:border-[#383838] transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Explore Common Errors</span>
          </button>
        </div>

        {/* Supported Languages Ribbon */}
        <div className="pt-6 border-t border-[#262626]">
          <p className="text-xs uppercase tracking-wider font-mono text-[#737373] mb-4">
            Supports All Major Programming Curriculums
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => onStartAnalyzing(lang.id)}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] hover:border-indigo-500/40 text-xs font-mono text-[#a3a3a3] hover:text-[#f5f5f5] transition-all shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500 group-hover:bg-purple-400 transition-colors" />
                <span className="font-semibold">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* Interactive Hero Demo Preview Card */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-[#262626] bg-[#0f0f0f] shadow-2xl overflow-hidden">
          
          {/* Mock Window Header */}
          <div className="px-4 py-3 bg-[#0a0a0a] border-b border-[#262626] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-[#737373]">
                demo_analysis.c — ErrorLens Interactive Workbench
              </span>
            </div>
            <div className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Live Preview
            </div>
          </div>

          {/* Side by Side Preview Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#262626]">
            
            {/* Left Code Editor Preview */}
            <div className="lg:col-span-6 p-5 bg-[#0c0c0c] font-mono text-xs text-[#a3a3a3] space-y-1">
              <div className="text-[#525252]">// 1. Notice the missing semicolon on line 4</div>
              <div className="text-purple-400">#include &lt;stdio.h&gt;</div>
              <div className="text-purple-400">int <span className="text-blue-400">main</span>() &#123;</div>
              <div className="text-[#d1d1d1]">&nbsp;&nbsp;&nbsp;&nbsp;printf(<span className="text-emerald-400">"Welcome to ErrorLens\\n"</span>)</div>
              <div className="p-1 -mx-1 bg-red-500/15 border-l-2 border-red-500 text-[#f5f5f5]">
                &nbsp;&nbsp;&nbsp;&nbsp;printf(<span className="text-emerald-400">"Mastering C Fundamentals\\n"</span>);
              </div>
              <div className="text-[#d1d1d1]">&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-amber-400">0</span>;</div>
              <div className="text-purple-400">&#125;</div>

              <div className="pt-6">
                <button
                  onClick={() => onStartAnalyzing('c')}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Try Interactive Analysis Now
                </button>
              </div>
            </div>

            {/* Right Explanation Breakdown Preview */}
            <div className="lg:col-span-6 p-5 bg-[#0f0f0f] space-y-4">
              
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] font-bold">
                  ❌ Syntax Error
                </span>
                <span className="text-xs font-mono text-[#737373]">Line 4, Col 42</span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#f5f5f5] mb-1">
                  Expected ';' before end of statement
                </h4>
                <p className="text-xs text-[#a3a3a3] leading-relaxed">
                  In C grammar, instructions require an explicit semicolon to terminate each statement so the compiler parser knows where the next instruction begins.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                <strong>💡 How To Fix:</strong> Append a <code className="bg-[#0a0a0a] px-1 py-0.5 rounded font-mono text-emerald-400 border border-emerald-500/30">;</code> to the end of <code className="bg-[#0a0a0a] px-1 py-0.5 rounded font-mono text-emerald-400 border border-emerald-500/30">printf(...)</code>.
              </div>

              <div className="flex items-center justify-between text-xs text-[#737373] font-mono pt-1">
                <span>Concept: C Statement Termination</span>
                <span className="text-indigo-400 font-semibold">+30 XP</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* The 8-Step Pedagogical Anatomy Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] mb-3">
            The ErrorLens 8-Step Pedagogical Framework
          </h2>
          <p className="text-sm text-[#737373] max-w-xl mx-auto">
            Traditional tools just output a cryptic error log. ErrorLens deconstructs every bug into an actionable mental model.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] hover:border-indigo-500/40 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="font-semibold text-sm text-[#f5f5f5]">Error Type & Category</h3>
            <p className="text-xs text-[#737373]">
              Clear categorization across Syntax, Compilation, Runtime, and Logical defects.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] hover:border-indigo-500/40 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="font-semibold text-sm text-[#f5f5f5]">Pinpoint Location</h3>
            <p className="text-xs text-[#737373]">
              Precise line and column highlighting with editor gutter markers and context.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] hover:border-indigo-500/40 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="font-semibold text-sm text-[#f5f5f5]">What Happened?</h3>
            <p className="text-xs text-[#737373]">
              Plain-English, beginner-friendly translation of cryptic compiler error messages.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] hover:border-indigo-500/40 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono font-bold text-sm">
              04
            </div>
            <h3 className="font-semibold text-sm text-[#f5f5f5]">Why Did It Happen?</h3>
            <p className="text-xs text-[#737373]">
              Under-the-hood computing concepts (memory allocation, scope rules, parser trees).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] hover:border-indigo-500/40 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
              05
            </div>
            <h3 className="font-semibold text-sm text-[#f5f5f5]">Step-by-Step Fix</h3>
            <p className="text-xs text-[#737373]">
              Clear, numbered checklist guiding you to correct your own mistakes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] hover:border-indigo-500/40 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm">
              06
            </div>
            <h3 className="font-semibold text-sm text-[#f5f5f5]">1-Click Apply Code</h3>
            <p className="text-xs text-[#737373]">
              Side-by-side corrected snippet with 1-click apply directly back to your workspace.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] hover:border-indigo-500/40 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
              07
            </div>
            <h3 className="font-semibold text-sm text-[#f5f5f5]">What You Learned</h3>
            <p className="text-xs text-[#737373]">
              Core conceptual takeaways to solidify your mental model for future coding challenges.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] hover:border-indigo-500/40 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center font-mono font-bold text-sm">
              08
            </div>
            <h3 className="font-semibold text-sm text-[#f5f5f5]">Prevention Pro-Tip</h3>
            <p className="text-xs text-[#737373]">
              Defensive coding patterns and IDE configurations to avoid the error in future projects.
            </p>
          </div>

        </div>
      </section>

      {/* Gamified Learning Mode Highlight */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-[#0f0f0f] border border-indigo-500/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          
          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Interactive Learning Mode</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5]">
              Debug Detective: Put Your Skills to the Test
            </h2>
            <p className="text-sm text-[#a3a3a3] leading-relaxed">
              Sharpen your intuition by spotting bugs in realistic code snippets across C, Python, JavaScript, Java, and C++. Earn XP, build streaks, and level up!
            </p>
            <button
              onClick={() => setActiveView('learn')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Play Debug Detective</span>
            </button>
          </div>

          <div className="w-full md:w-auto p-5 rounded-2xl bg-[#141414] border border-[#262626] shadow-xl space-y-3 min-w-[280px]">
            <div className="flex items-center justify-between text-xs text-[#737373] font-mono">
              <span>Detective Status</span>
              <span className="text-amber-400 font-semibold">Level 3</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-[#f5f5f5]">
                <span>XP Progress</span>
                <span className="text-indigo-400 font-mono">450 / 600 XP</span>
              </div>
              <div className="h-2 rounded-full bg-[#262626] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-3/4 rounded-full" />
              </div>
            </div>
            <div className="pt-2 flex items-center justify-around text-center text-xs">
              <div>
                <div className="font-bold text-[#f5f5f5] text-base">48</div>
                <div className="text-[#737373] text-[10px] font-mono">Errors Analyzed</div>
              </div>
              <div className="w-px h-8 bg-[#262626]" />
              <div>
                <div className="font-bold text-emerald-400 text-base">32</div>
                <div className="text-[#737373] text-[10px] font-mono">Errors Solved</div>
              </div>
              <div className="w-px h-8 bg-[#262626]" />
              <div>
                <div className="font-bold text-amber-400 text-base">4d</div>
                <div className="text-[#737373] text-[10px] font-mono">Streak</div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
