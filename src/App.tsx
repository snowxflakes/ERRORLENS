import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/search/SearchModal';
import { LandingHero } from './components/landing/LandingHero';
import { CodeWorkspace } from './components/code-editor/CodeWorkspace';
import { AnalysisPanel } from './components/error-analysis/AnalysisPanel';
import { ErrorLibraryView } from './components/error-library/ErrorLibraryView';
import { LearnModeView } from './components/learn/LearnModeView';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { HistoryView } from './components/history/HistoryView';

import { 
  ActiveView, 
  LanguageId, 
  ErrorAnalysis, 
  UserStats, 
  CommonErrorDoc 
} from './types';
import { SUPPORTED_LANGUAGES } from './constants/languages';
import { COMMON_ERRORS_DATABASE } from './constants/commonErrors';
import { analyzeSourceCode } from './services/analyzerEngine';
import { 
  getStoredHistory, 
  saveAnalysisToHistory, 
  clearHistory, 
  toggleBookmarkAnalysis, 
  markAnalysisSolved, 
  getStoredStats, 
  markQuizCompleted, 
  toggleSaveCommonError 
} from './services/storageService';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [language, setLanguage] = useState<LanguageId>('c');
  const [code, setCode] = useState<string>(SUPPORTED_LANGUAGES[0].sampleBuggyCode);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ErrorAnalysis | null>(null);
  
  // Storage states
  const [history, setHistory] = useState<ErrorAnalysis[]>([]);
  const [stats, setStats] = useState<UserStats>(getStoredStats());
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Load persistent history on mount
  useEffect(() => {
    setHistory(getStoredHistory());
    setStats(getStoredStats());
  }, []);

  // Handler: Analyze code
  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true);
    // Simulate brief scanning transition for UX feedback
    setTimeout(() => {
      const result = analyzeSourceCode(code, language);
      setCurrentAnalysis(result);
      setIsAnalyzing(false);

      if (result.errorType !== 'Empty Input') {
        saveAnalysisToHistory(result);
        setHistory(getStoredHistory());
        setStats(getStoredStats());
      }
    }, 400);
  }, [code, language]);

  // Handler: Load language sample
  const handleLoadSample = (langId: LanguageId) => {
    const config = SUPPORTED_LANGUAGES.find(l => l.id === langId) || SUPPORTED_LANGUAGES[0];
    setLanguage(langId);
    setCode(config.sampleBuggyCode);
    setCurrentAnalysis(null);
  };

  // Handler: Start analyzing from Hero
  const handleStartFromLanding = (langId: LanguageId = 'c') => {
    handleLoadSample(langId);
    setActiveView('analyzer');
  };

  // Handler: Load custom snippet in workspace
  const handleLoadInWorkspace = (snippet: string, langId: LanguageId) => {
    setLanguage(langId);
    setCode(snippet);
    setActiveView('analyzer');
    // auto trigger analysis on loaded snippet
    setTimeout(() => {
      const result = analyzeSourceCode(snippet, langId);
      setCurrentAnalysis(result);
      saveAnalysisToHistory(result);
      setHistory(getStoredHistory());
      setStats(getStoredStats());
    }, 300);
  };

  // Handler: Apply 1-click fix to editor
  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
    if (currentAnalysis) {
      const updated = { ...currentAnalysis, solved: true };
      setCurrentAnalysis(updated);
      setHistory(markAnalysisSolved(currentAnalysis.id));
      setStats(getStoredStats());
    }
  };

  // Handler: Toggle bookmark in history/analysis
  const handleBookmark = (id: string) => {
    const updated = toggleBookmarkAnalysis(id);
    setHistory(updated);
    if (currentAnalysis && currentAnalysis.id === id) {
      setCurrentAnalysis({ ...currentAnalysis, bookmarked: !currentAnalysis.bookmarked });
    }
  };

  // Handler: Mark analysis solved
  const handleMarkSolved = (id: string) => {
    const updated = markAnalysisSolved(id);
    setHistory(updated);
    setStats(getStoredStats());
    if (currentAnalysis && currentAnalysis.id === id) {
      setCurrentAnalysis({ ...currentAnalysis, solved: true });
    }
  };

  // Handler: Clear history
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  // Handler: Toggle save common error in library
  const handleToggleSaveCommonError = (docId: string) => {
    const updated = toggleSaveCommonError(docId);
    setStats(prev => ({ ...prev, savedErrorIds: updated }));
  };

  // Handler: Complete quiz
  const handleCompleteQuiz = (quizId: string, xp: number) => {
    const updated = markQuizCompleted(quizId, xp);
    setStats(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#d1d1d1] selection:bg-indigo-600 selection:text-white">
      
      {/* Top Main Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        stats={stats}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global CMD+K Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectError={(doc: CommonErrorDoc) => {
          handleLoadInWorkspace(doc.incorrectCode, doc.language);
        }}
        onSelectLanguageForEditor={(lang: LanguageId) => {
          handleLoadSample(lang);
          setActiveView('analyzer');
        }}
        setActiveView={setActiveView}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'landing' && (
          <LandingHero
            onStartAnalyzing={handleStartFromLanding}
            setActiveView={setActiveView}
          />
        )}

        {activeView === 'analyzer' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
            {/* Top breadcrumb header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#737373]">ErrorLens</span>
                <span className="text-[#3a3a3a]">/</span>
                <span className="text-xs font-mono font-bold text-indigo-400">Interactive Workspace</span>
              </div>
              <div className="text-xs font-mono text-[#737373] hidden sm:flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Ready</span>
                <span className="text-[#3a3a3a]">|</span>
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#141414] border border-[#262626] text-[#a3a3a3]">Ctrl + Enter</kbd> to analyze</span>
              </div>
            </div>

            {/* Split Screen Grid: Code Editor (Left) + Error Analysis (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
              
              {/* Left Column: Code Workspace */}
              <div className="lg:col-span-6 flex flex-col">
                <CodeWorkspace
                  code={code}
                  setCode={setCode}
                  language={language}
                  setLanguage={setLanguage}
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                  highlightLocation={currentAnalysis?.location}
                  onLoadSample={handleLoadSample}
                />
              </div>

              {/* Right Column: Pedagogical Error Analysis Panel */}
              <div className="lg:col-span-6 flex flex-col">
                <AnalysisPanel
                  analysis={currentAnalysis}
                  onApplyFix={handleApplyFix}
                  onBookmark={handleBookmark}
                  onMarkSolved={handleMarkSolved}
                  onSelectConcept={() => setActiveView('library')}
                />
              </div>

            </div>
          </div>
        )}

        {activeView === 'library' && (
          <ErrorLibraryView
            onLoadInEditor={handleLoadInWorkspace}
            savedErrorIds={stats.savedErrorIds}
            onToggleSave={handleToggleSaveCommonError}
          />
        )}

        {activeView === 'learn' && (
          <LearnModeView
            stats={stats}
            onCompleteQuiz={handleCompleteQuiz}
            onLoadInEditor={handleLoadInWorkspace}
          />
        )}

        {activeView === 'dashboard' && (
          <UserDashboard
            stats={stats}
            history={history}
            onOpenAnalysis={(item: ErrorAnalysis) => {
              setCode(item.originalCode);
              setLanguage(item.language);
              setCurrentAnalysis(item);
              setActiveView('analyzer');
            }}
            onOpenLibraryDoc={(docId: string) => {
              const doc = COMMON_ERRORS_DATABASE.find(d => d.id === docId);
              if (doc) {
                handleLoadInWorkspace(doc.incorrectCode, doc.language);
              }
            }}
            setActiveView={setActiveView}
          />
        )}

        {activeView === 'history' && (
          <HistoryView
            history={history}
            onOpenAnalysis={(item: ErrorAnalysis) => {
              setCode(item.originalCode);
              setLanguage(item.language);
              setCurrentAnalysis(item);
              setActiveView('analyzer');
            }}
            onBookmark={handleBookmark}
            onClearHistory={handleClearHistory}
            onLoadInWorkspace={handleLoadInWorkspace}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActiveView={setActiveView} />

    </div>
  );
}
