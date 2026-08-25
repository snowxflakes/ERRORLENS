import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Check, 
  X, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  BrainCircuit, 
  Zap,
  Terminal,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LEARNING_QUIZZES } from '../../constants/learningQuizzes';
import { QuizQuestion, UserStats, LanguageId } from '../../types';

interface LearnModeViewProps {
  stats: UserStats;
  onCompleteQuiz: (quizId: string, xpEarned: number) => void;
  onLoadInEditor: (code: string, lang: LanguageId) => void;
}

export const LearnModeView: React.FC<LearnModeViewProps> = ({
  stats,
  onCompleteQuiz,
  onLoadInEditor,
}) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentQuiz = LEARNING_QUIZZES[currentQuizIndex];
  const isCompleted = stats.completedQuizIds.includes(currentQuiz?.id || '');

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    setIsAnswered(true);

    const isCorrect = selectedOption === currentQuiz.correctIndex;
    if (isCorrect) {
      setScore(s => s + 1);
      onCompleteQuiz(currentQuiz.id, currentQuiz.xp);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#6366f1', '#10b981', '#38bdf8'],
      });
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuizIndex < LEARNING_QUIZZES.length - 1) {
      setCurrentQuizIndex(i => i + 1);
    } else {
      setCurrentQuizIndex(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-[#0f0f0f] border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Debugging Arena</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] tracking-tight">
            Debug Detective Challenge
          </h1>
          <p className="text-xs sm:text-sm text-[#a3a3a3] max-w-md">
            Train your engineering eye to spot runtime traps, scope errors, and subtle grammar bugs before the compiler does.
          </p>
        </div>

        {/* User Stats Pill */}
        <div className="flex items-center gap-4 bg-[#141414] border border-[#262626] p-3.5 rounded-2xl">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            <div>
              <div className="text-xs text-[#737373] font-mono">Streak</div>
              <div className="text-sm font-bold text-[#f5f5f5]">{stats.streakDays} Days</div>
            </div>
          </div>

          <div className="w-px h-8 bg-[#262626]" />

          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-indigo-400" />
            <div>
              <div className="text-xs text-[#737373] font-mono">Total XP</div>
              <div className="text-sm font-bold text-indigo-400">{stats.xp} XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Stepper Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[#737373]">
        <div className="flex items-center gap-2">
          <span>Question {currentQuizIndex + 1} of {LEARNING_QUIZZES.length}</span>
          <span className="text-[#383838]">|</span>
          <span className="uppercase text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            {currentQuiz.language}
          </span>
          <span className="capitalize text-[#a3a3a3]">
            {currentQuiz.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <Zap className="w-4 h-4 fill-amber-400" />
          <span>+{currentQuiz.xp} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-[#1f1f1f] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-300"
          style={{ width: `${((currentQuizIndex + 1) / LEARNING_QUIZZES.length) * 100}%` }}
        />
      </div>

      {/* Interactive Question Card */}
      <div className="p-6 rounded-3xl bg-[#0f0f0f] border border-[#262626] shadow-2xl space-y-6">
        
        {/* Title & Question */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#737373] uppercase tracking-wider">
              Target Concept: {currentQuiz.concept}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solved
              </span>
            )}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#f5f5f5]">
            {currentQuiz.question}
          </h2>
        </div>

        {/* Code Snippet Box */}
        <div className="rounded-2xl overflow-hidden border border-[#262626] bg-[#0c0c0c]">
          <div className="px-4 py-2 bg-[#0a0a0a] border-b border-[#262626] flex items-center justify-between text-xs font-mono text-[#737373]">
            <span>Buggy Snippet ({currentQuiz.language})</span>
            <button
              onClick={() => onLoadInEditor(currentQuiz.codeSnippet, currentQuiz.language)}
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" /> Inspect in Workspace
            </button>
          </div>
          <pre className="p-4 text-xs sm:text-sm font-mono text-[#f5f5f5] overflow-x-auto leading-relaxed">
            <code>{currentQuiz.codeSnippet}</code>
          </pre>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuiz.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuiz.correctIndex;

            let cardStyle = 'bg-[#141414] border-[#262626] hover:border-indigo-500/40 text-[#d1d1d1]';
            if (isAnswered) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-semibold';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-red-500/15 border-red-500 text-red-200 line-through';
              }
            } else if (isSelected) {
              cardStyle = 'bg-indigo-600/20 border-indigo-500 text-white font-medium';
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-center justify-between gap-4 ${cardStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#1f1f1f] text-[#d1d1d1] text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-[#262626]">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </div>

                {isAnswered && isCorrect && (
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <X className="w-5 h-5 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card when answered */}
        {isAnswered && (
          <div className={`p-4 rounded-2xl border animate-fade-in ${
            selectedOption === currentQuiz.correctIndex
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-950/20 border-amber-500/30 text-amber-300'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              <BrainCircuit className="w-4 h-4" />
              <span>
                {selectedOption === currentQuiz.correctIndex
                  ? '🎉 Brilliant! That is correct.'
                  : '💡 Not quite — Here is why:'}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-[#d1d1d1]">
              {currentQuiz.explanation}
            </p>
          </div>
        )}

        {/* Action Bottom Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
          <div className="text-xs font-mono text-[#737373]">
            Score this session: <span className="text-white font-bold">{score}</span> / {currentQuizIndex + (isAnswered ? 1 : 0)}
          </div>

          {!isAnswered ? (
            <button
              disabled={selectedOption === null}
              onClick={handleCheckAnswer}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/25"
            >
              Verify Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuiz}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-emerald-600/25"
            >
              <span>Next Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
