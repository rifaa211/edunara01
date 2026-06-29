/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'SJT' | 'PCK' | 'Pedagogik' | 'Profesional';

export interface Option {
  key: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctKey: string;
  explanation: {
    coreConcept: string;
    whyCorrect: string;
    whyIncorrect: string;
    pedagogicTip: string;
  };
  category: Category;
  difficulty: 'HOTS' | 'MOTS' | 'LOTS';
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  categories: Category[];
  questions: Question[];
}

export interface UserResult {
  id: string;
  examId: string;
  examTitle: string;
  score: number; // percentage or scale
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  date: string;
  timeSpentSeconds: number;
  categoryScores: Record<Category, number>;
  answers: Record<string, string>; // questionId -> selectedOptionKey
  flaggedQuestionIds: string[];
}

export interface Competitor {
  id: string;
  name: string;
  school: string;
  region: string;
  score: number;
  averageTimeSeconds: number;
  avatarSeed: string;
  isCurrentUser?: boolean;
}

export interface LiveActivity {
  id: string;
  competitorName: string;
  examTitle: string;
  score: number;
  timestamp: string; // e.g. "Baru saja", "2 menit yang lalu"
}
