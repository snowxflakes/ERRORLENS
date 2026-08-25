import React from 'react';
import { Terminal, Shield, Code2, BookOpen, Sparkles, Heart } from 'lucide-react';
import { ActiveView } from '../../types';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  return (
    <footer className="w-full border-t border-[#262626] bg-[#0f0f0f] mt-16 text-[#737373] text-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Platform Vision */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-semibold text-[#f5f5f5] text-base">ErrorLens</span>
            </div>
            <p className="text-xs leading-relaxed text-[#737373]">
              An educational developer platform built for computer science students and engineers. Don't just fix the code — master why errors happen.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-500 font-mono">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Client-Side Private Analysis</span>
            </div>
          </div>

          {/* Col 2: Supported Languages */}
          <div>
            <h4 className="font-semibold text-[#f5f5f5] text-xs uppercase tracking-wider mb-3 font-mono">
              Supported Languages
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-[#a3a3a3]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                C & C++ (Pointers, Memory, Semicolons)
              </li>
              <li className="flex items-center gap-1.5 text-[#a3a3a3]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Python 3 (LEGB Scope, Indentation)
              </li>
              <li className="flex items-center gap-1.5 text-[#a3a3a3]">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Java (JVM Exceptions, NullPointer)
              </li>
              <li className="flex items-center gap-1.5 text-[#a3a3a3]">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                JavaScript & TypeScript (Async, TDZ)
              </li>
            </ul>
          </div>

          {/* Col 3: Educational Modules */}
          <div>
            <h4 className="font-semibold text-[#f5f5f5] text-xs uppercase tracking-wider mb-3 font-mono">
              Learning Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => setActiveView('analyzer')} 
                  className="hover:text-indigo-400 text-[#a3a3a3] transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Interactive Code Workspace
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('library')} 
                  className="hover:text-indigo-400 text-[#a3a3a3] transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-400" /> Common Errors Encyclopedia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('learn')} 
                  className="hover:text-indigo-400 text-[#a3a3a3] transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Debug Detective Quizzes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Pedagogical Manifesto */}
          <div className="bg-[#141414] rounded-xl p-4 border border-[#262626] space-y-2">
            <h4 className="text-xs font-semibold text-[#f5f5f5] uppercase tracking-wider font-mono">
              Educational Philosophy
            </h4>
            <p className="text-xs text-[#a3a3a3] italic">
              "Errors are not failures — they are the compiler actively teaching you the rules of computation."
            </p>
            <div className="pt-2 text-[11px] text-indigo-400 font-mono">
              8-Step Pedagogical Anatomy
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#525252] font-mono">
          <p>© {new Date().getFullYear()} ErrorLens. Engineered for CS students & beginners.</p>
          <div className="flex items-center gap-1">
            <span>Elegant Dark Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
