export type LanguageId =
  | 'c'
  | 'cpp'
  | 'python'
  | 'java'
  | 'javascript'
  | 'typescript'
  | 'go'
  | 'rust';

export type ErrorCategory =
  | 'syntax'
  | 'compilation'
  | 'runtime'
  | 'logical'
  | 'warning';

export type ErrorDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ErrorLocation {
  line?: number;
  column?: number;
  snippet?: string;
  endLine?: number;
}

export interface ErrorAnalysis {
  id: string;
  language: LanguageId;
  errorType: string;
  category: ErrorCategory;
  title: string;
  location: ErrorLocation;
  whatHappened: string;
  whyItHappened: string;
  howToFix: string[];
  originalCode: string;
  correctedCode: string;
  whatYouLearned: string;
  preventionTip: string;
  relatedConcepts: string[];
  difficulty: ErrorDifficulty;
  timestamp: number;
  bookmarked?: boolean;
  solved?: boolean;
}

export interface LanguageConfig {
  id: LanguageId;
  name: string;
  extension: string;
  monacoLang: string;
  badgeColor: string;
  iconName: string;
  sampleBuggyCode: string;
  sampleDescription: string;
  popularErrors: string[];
}

export interface CommonErrorDoc {
  id: string;
  language: LanguageId;
  name: string;
  category: ErrorCategory;
  shortDesc: string;
  definition: string;
  whyOccurs: string;
  incorrectCode: string;
  correctCode: string;
  prevention: string;
  difficulty: ErrorDifficulty;
  tags: string[];
  practiceQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface QuizQuestion {
  id: string;
  language: LanguageId;
  category: ErrorCategory;
  difficulty: ErrorDifficulty;
  title: string;
  codeSnippet: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  concept: string;
  xp: number;
}

export interface UserStats {
  totalAnalyses: number;
  errorsSolved: number;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  languageCounts: Record<string, number>;
  categoryCounts: Record<ErrorCategory, number>;
  savedErrorIds: string[];
  completedQuizIds: string[];
}

export type ActiveView =
  | 'landing'
  | 'analyzer'
  | 'library'
  | 'dashboard'
  | 'history'
  | 'learn';
