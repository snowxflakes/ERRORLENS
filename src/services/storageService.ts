import { ErrorAnalysis, UserStats, LanguageId, ErrorCategory } from '../types';

const STORAGE_KEYS = {
  HISTORY: 'errorlens_history_v1',
  STATS: 'errorlens_stats_v1',
  SAVED_ERRORS: 'errorlens_saved_errors_v1',
  SETTINGS: 'errorlens_settings_v1',
};

const DEFAULT_STATS: UserStats = {
  totalAnalyses: 14,
  errorsSolved: 9,
  xp: 450,
  level: 3,
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  languageCounts: {
    c: 4,
    python: 5,
    javascript: 3,
    java: 2,
    cpp: 0,
  },
  categoryCounts: {
    syntax: 6,
    compilation: 3,
    runtime: 4,
    logical: 1,
    warning: 0,
  },
  savedErrorIds: ['c-missing-semicolon', 'py-name-error', 'js-type-error-undefined'],
  completedQuizIds: ['quiz-c-semicolon', 'quiz-py-nameerror'],
};

// Initial sample history if first time visiting
const SAMPLE_HISTORY: ErrorAnalysis[] = [
  {
    id: 'hist-1',
    language: 'python',
    errorType: 'NameError: name \'count\' is not defined',
    category: 'runtime',
    title: 'NameError: undefined identifier in average calculation',
    location: { line: 4, column: 15, snippet: 'average = total / count' },
    whatHappened: 'Referenced variable count which was never declared.',
    whyItHappened: 'Python LEGB scope lookup failed.',
    howToFix: ['Use len(scores) instead of count'],
    originalCode: 'def avg(scores):\n    return sum(scores) / count',
    correctedCode: 'def avg(scores):\n    return sum(scores) / len(scores)',
    whatYouLearned: 'Python variable scope and identifier resolution.',
    preventionTip: 'Double check variable names before calculations.',
    relatedConcepts: ['Scope', 'LEGB', 'Built-in len()'],
    difficulty: 'beginner',
    timestamp: Date.now() - 3600 * 1000 * 2, // 2 hours ago
    solved: true,
  },
  {
    id: 'hist-2',
    language: 'c',
    errorType: 'SyntaxError: Missing Semicolon',
    category: 'syntax',
    title: 'Expected \';\' before printf on line 5',
    location: { line: 4, column: 28, snippet: 'printf("Hello")' },
    whatHappened: 'Statement lacked terminating semicolon.',
    whyItHappened: 'C grammar demands semicolons as statement delimiters.',
    howToFix: ['Add semicolon at end of printf line'],
    originalCode: 'printf("Hello")\nprintf("World");',
    correctedCode: 'printf("Hello");\nprintf("World");',
    whatYouLearned: 'Statement termination rules in C grammar.',
    preventionTip: 'Always terminate instructions with a semicolon in C.',
    relatedConcepts: ['C Grammar', 'Parser Tokens'],
    difficulty: 'beginner',
    timestamp: Date.now() - 3600 * 1000 * 8, // 8 hours ago
    solved: true,
  },
  {
    id: 'hist-3',
    language: 'javascript',
    errorType: 'TypeError: Cannot read properties of undefined',
    category: 'runtime',
    title: 'Unchecked property access on undefined user',
    location: { line: 2, column: 18, snippet: 'user.details.city' },
    whatHappened: 'Tried to access .city on undefined details.',
    whyItHappened: 'Primitive undefined has no prototype properties.',
    howToFix: ['Use user?.details?.city optional chaining'],
    originalCode: 'console.log(user.details.city);',
    correctedCode: 'console.log(user?.details?.city ?? "N/A");',
    whatYouLearned: 'Defensive programming with modern optional chaining in JS.',
    preventionTip: 'Always use optional chaining (?.) for API responses.',
    relatedConcepts: ['Optional Chaining', 'Nullish Coalescing'],
    difficulty: 'intermediate',
    timestamp: Date.now() - 3600 * 1000 * 24, // 1 day ago
    bookmarked: true,
    solved: true,
  },
];

export function getStoredHistory(): ErrorAnalysis[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(SAMPLE_HISTORY));
      return SAMPLE_HISTORY;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_HISTORY;
  }
}

export function saveAnalysisToHistory(analysis: ErrorAnalysis): void {
  try {
    const history = getStoredHistory();
    const filtered = history.filter(h => h.id !== analysis.id);
    const updated = [analysis, ...filtered].slice(0, 50); // keep up to 50
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));

    // Update stats
    updateStatsOnAnalysis(analysis.language, analysis.category);
  } catch (e) {
    console.error('Failed to save analysis to history:', e);
  }
}

export function clearHistory(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
  } catch (e) {
    console.error(e);
  }
}

export function toggleBookmarkAnalysis(id: string): ErrorAnalysis[] {
  const history = getStoredHistory();
  const updated = history.map(item => {
    if (item.id === id) {
      return { ...item, bookmarked: !item.bookmarked };
    }
    return item;
  });
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  return updated;
}

export function markAnalysisSolved(id: string): ErrorAnalysis[] {
  const history = getStoredHistory();
  const updated = history.map(item => {
    if (item.id === id) {
      return { ...item, solved: true };
    }
    return item;
  });
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  
  // Award XP
  addXP(30);
  return updated;
}

export function getStoredStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(DEFAULT_STATS));
      return DEFAULT_STATS;
    }
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATS;
  }
}

export function updateStatsOnAnalysis(lang: LanguageId, category: ErrorCategory): void {
  try {
    const stats = getStoredStats();
    stats.totalAnalyses += 1;
    stats.languageCounts[lang] = (stats.languageCounts[lang] || 0) + 1;
    stats.categoryCounts[category] = (stats.categoryCounts[category] || 0) + 1;

    // Check streak
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate !== today) {
      stats.streakDays += 1;
      stats.lastActiveDate = today;
    }

    // Award XP
    stats.xp += 15;
    stats.level = Math.floor(stats.xp / 150) + 1;

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (e) {
    console.error(e);
  }
}

export function addXP(amount: number): UserStats {
  const stats = getStoredStats();
  stats.xp += amount;
  stats.level = Math.floor(stats.xp / 150) + 1;
  stats.errorsSolved += 1;
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  return stats;
}

export function markQuizCompleted(quizId: string, xpEarned: number): UserStats {
  const stats = getStoredStats();
  if (!stats.completedQuizIds.includes(quizId)) {
    stats.completedQuizIds.push(quizId);
    stats.xp += xpEarned;
    stats.level = Math.floor(stats.xp / 150) + 1;
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }
  return stats;
}

export function toggleSaveCommonError(errorDocId: string): string[] {
  const stats = getStoredStats();
  if (stats.savedErrorIds.includes(errorDocId)) {
    stats.savedErrorIds = stats.savedErrorIds.filter(id => id !== errorDocId);
  } else {
    stats.savedErrorIds.push(errorDocId);
  }
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  return stats.savedErrorIds;
}
