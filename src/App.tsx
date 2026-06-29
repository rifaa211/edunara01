/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { EXAMS_DATA } from './data/questions';
import { Exam, UserResult, Competitor, Category } from './types';
import Dashboard from './components/Dashboard';
import ExamSimulator from './components/ExamSimulator';
import PembahasanView from './components/PembahasanView';
import AnalyticsView from './components/AnalyticsView';
import LeaderboardView from './components/LeaderboardView';
import { 
  GraduationCap, 
  Trophy, 
  TrendingUp, 
  BookOpen, 
  History, 
  User, 
  Calendar, 
  Flame, 
  CheckCircle,
  LogOut,
  Sparkles
} from 'lucide-react';

const INITIAL_COMPETITORS: Competitor[] = [
  { id: 'c-1', name: 'Budi Santoso, S.Pd.', school: 'SDN 1 Sleman', region: 'DI Yogyakarta', score: 95, averageTimeSeconds: 42, avatarSeed: 'budi' },
  { id: 'c-2', name: 'Sri Wahyuni, S.Pd.', school: 'SMPN 3 Malang', region: 'Jawa Timur', score: 90, averageTimeSeconds: 48, avatarSeed: 'sri' },
  { id: 'c-3', name: 'Ahmad Fauzi, M.Pd.', school: 'SMAN 1 Garut', region: 'Jawa Barat', score: 85, averageTimeSeconds: 52, avatarSeed: 'ahmad' },
  { id: 'c-4', name: 'Dewi Lestari, S.Pd.', school: 'SDN 2 Solo', region: 'Jawa Tengah', score: 85, averageTimeSeconds: 55, avatarSeed: 'dewi' },
  { id: 'c-5', name: 'Siti Aminah, S.Pd.SD', school: 'SDIT Al-Ihsan', region: 'DKI Jakarta', score: 80, averageTimeSeconds: 46, avatarSeed: 'siti' },
  { id: 'c-6', name: 'I Made Sukra, S.Pd.', school: 'SMAN 2 Denpasar', region: 'Bali', score: 75, averageTimeSeconds: 59, avatarSeed: 'made' },
  { id: 'c-7', name: 'Andi Pratama, S.Kom.', school: 'SMKN 1 Makassar', region: 'Sulawesi Selatan', score: 70, averageTimeSeconds: 61, avatarSeed: 'andi' },
  { id: 'c-8', name: 'Rian Hidayat, S.Pd.', school: 'SMPN 5 Medan', region: 'Sumatera Utara', score: 70, averageTimeSeconds: 63, avatarSeed: 'rian' },
  { id: 'c-9', name: 'Mega Utami, S.Si.', school: 'SMAN 3 Semarang', region: 'Jawa Tengah', score: 65, averageTimeSeconds: 57, avatarSeed: 'mega' },
  { id: 'c-10', name: 'Eko Purwanto, S.Pd.', school: 'SDN 4 Surabaya', region: 'Jawa Timur', score: 60, averageTimeSeconds: 68, avatarSeed: 'eko' },
  { id: 'c-11', name: 'Anisa Rahmawati, S.Pd.', school: 'SMAN 1 Yogyakarta', region: 'DI Yogyakarta', score: 55, averageTimeSeconds: 65, avatarSeed: 'anisa' },
  { id: 'c-12', name: 'Heryanto, S.Pd.', school: 'SMPN 1 Kupang', region: 'Nusa Tenggara Timur', score: 50, averageTimeSeconds: 72, avatarSeed: 'hery' }
];

export default function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState<'dashboard' | 'exam' | 'pembahasan' | 'analytics' | 'leaderboard'>('dashboard');
  const [dashboardTab, setDashboardTab] = useState<'tryout' | 'analytics' | 'leaderboard' | 'history'>('tryout');
  
  // Selection states for simulation and review
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedResult, setSelectedResult] = useState<UserResult | null>(null);

  // Dynamic result history, synchronized with LocalStorage
  const [resultsHistory, setResultsHistory] = useState<UserResult[]>([]);

  // load from localstorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('edunara_results_history_v1');
    if (saved) {
      try {
        setResultsHistory(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse edunara history', err);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  const saveResults = (newHistory: UserResult[]) => {
    setResultsHistory(newHistory);
    localStorage.setItem('edunara_results_history_v1', JSON.stringify(newHistory));
  };

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
    setCurrentView('exam');
  };

  const handleCancelExam = () => {
    setSelectedExam(null);
    setCurrentView('dashboard');
  };

  // Process completed tryout
  const handleSubmitExam = (
    answers: Record<string, string>, 
    flaggedIds: string[], 
    timeSpentSeconds: number
  ) => {
    if (!selectedExam) return;

    const questions = selectedExam.questions;
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    // Track detailed performance per category
    const categoryTotals: Record<Category, { total: number; correct: number }> = {
      SJT: { total: 0, correct: 0 },
      PCK: { total: 0, correct: 0 },
      Pedagogik: { total: 0, correct: 0 },
      Profesional: { total: 0, correct: 0 }
    };

    questions.forEach((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctKey;
      
      // Category count increments
      categoryTotals[q.category].total += 100; // base max score scale 100 per category
      if (isCorrect) {
        categoryTotals[q.category].correct += 100;
      }

      if (selected === undefined) {
        skippedCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    // Calculate overall percentage score
    const totalQuestions = questions.length;
    const finalScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Calculate category-specific percentages
    const categoryScores = {} as Record<Category, number>;
    (Object.keys(categoryTotals) as Category[]).forEach((cat) => {
      const { total, correct } = categoryTotals[cat];
      categoryScores[cat] = total > 0 ? Math.round(correct / total * 100) : 0;
    });

    // Generate date string
    const dateObj = new Date();
    const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;

    const newResult: UserResult = {
      id: `res-${Date.now()}`,
      examId: selectedExam.id,
      examTitle: selectedExam.title,
      score: finalScore,
      correctCount,
      incorrectCount,
      skippedCount,
      date: formattedDate,
      timeSpentSeconds,
      categoryScores,
      answers,
      flaggedQuestionIds: flaggedIds
    };

    const updatedHistory = [...resultsHistory, newResult];
    saveResults(updatedHistory);
    setSelectedResult(newResult);

    // Navigate straight to detailed Pembahasan
    setCurrentView('pembahasan');
  };

  const handleOpenPembahasan = (exam: Exam, result: UserResult) => {
    setSelectedExam(exam);
    setSelectedResult(result);
    setCurrentView('pembahasan');
  };

  const handleRetakeExam = () => {
    if (selectedExam) {
      setCurrentView('exam');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus seluruh riwayat simulasi Tryout Anda?')) {
      saveResults([]);
      setCurrentView('dashboard');
      setDashboardTab('tryout');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800" id="edunara-app-root">
      {/* Upper Navigation Header Bar */}
      {currentView !== 'exam' && (
        <nav className="sticky top-0 bg-indigo-700 text-white border-b border-indigo-800 z-40 py-3 px-4 sm:px-6 shadow-md shrink-0">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Branding Logo */}
            <div 
              onClick={() => {
                setCurrentView('dashboard');
                setDashboardTab('tryout');
              }}
              className="flex items-center gap-2.5 cursor-pointer self-start sm:self-auto"
            >
              <div className="w-10 h-10 bg-white text-indigo-700 rounded-lg flex items-center justify-center font-bold text-xl shadow-md">
                <span className="text-indigo-700 font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight italic text-white flex items-center gap-1.5">
                  EDUNARA
                  <span className="bg-indigo-600/50 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border border-indigo-500/50">PRO</span>
                </h1>
                <p className="text-[10px] text-indigo-200 font-semibold uppercase tracking-wider">Tryout & CAT PPG</p>
              </div>
            </div>

            {/* Quick view access nav buttons */}
            <div className="hidden md:flex items-center gap-1 bg-indigo-800 border border-indigo-600/50 p-1 rounded-xl">
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setDashboardTab('tryout');
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'dashboard' && dashboardTab === 'tryout'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-600/30'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Tryout
              </button>
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setDashboardTab('analytics');
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'dashboard' && dashboardTab === 'analytics'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-600/30'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Analitik
              </button>
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setDashboardTab('leaderboard');
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'dashboard' && dashboardTab === 'leaderboard'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-600/30'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                Peringkat Live
              </button>
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setDashboardTab('history');
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'dashboard' && dashboardTab === 'history'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-600/30'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                Riwayat
              </button>
            </div>

            {/* Profile badge with dynamic calendar time & metadata user info */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Reset button for testing */}
              {resultsHistory.length > 0 && (
                <button
                  onClick={handleResetData}
                  className="p-2 text-indigo-200 hover:text-rose-400 hover:bg-indigo-800 rounded-xl border border-indigo-600/50 transition duration-150 cursor-pointer hidden sm:block"
                  title="Hapus Seluruh Riwayat"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}

              {/* Date */}
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[10px] text-indigo-200 font-bold uppercase flex items-center gap-1 justify-end">
                  <Calendar className="w-3 h-3 text-indigo-300" />
                  Senin, 29 Juni 2026
                </span>
                <span className="text-[9px] text-indigo-300 opacity-80 mt-0.5">WIB (Waktu Indonesia Barat)</span>
              </div>

              {/* User profile avatar */}
              <div className="flex items-center gap-3 pl-6 border-l border-indigo-600">
                <div className="text-right">
                  <p className="text-xs opacity-80 uppercase font-bold tracking-wider text-indigo-200">Peserta</p>
                  <p className="font-semibold text-sm text-white">marifa.k03@gmail.com</p>
                </div>
                <div className="w-10 h-10 bg-indigo-400 rounded-full border-2 border-white overflow-hidden shrink-0">
                  <img
                    src="https://api.dicebear.com/7.x/adventurer/svg?seed=user"
                    alt="User Profile"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Container Stage Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Core Router */}
        {currentView === 'dashboard' && (
          <Dashboard
            exams={EXAMS_DATA}
            results={resultsHistory}
            competitors={INITIAL_COMPETITORS}
            onSelectExam={handleStartExam}
            onOpenPembahasan={handleOpenPembahasan}
            activeViewTab={dashboardTab}
            setActiveViewTab={setDashboardTab}
          />
        )}

        {currentView === 'exam' && selectedExam && (
          <ExamSimulator
            exam={selectedExam}
            onSubmitExam={handleSubmitExam}
            onCancelExam={handleCancelExam}
          />
        )}

        {currentView === 'pembahasan' && selectedExam && selectedResult && (
          <PembahasanView
            exam={selectedExam}
            result={selectedResult}
            onBackToDashboard={() => {
              setCurrentView('dashboard');
              setDashboardTab('history');
            }}
            onRetake={handleRetakeExam}
          />
        )}
      </div>

      {/* Elegant Footer and Credits */}
      {currentView !== 'exam' && (
        <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center mt-12 text-slate-400 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="font-medium text-slate-500">
              © 2026 <strong>Edunara</strong>. Platform Edukatif Sukses Seleksi Akademik PPG Indonesia.
            </p>
            <div className="flex items-center justify-center gap-4 text-slate-400">
              <span className="hover:text-indigo-600 cursor-pointer transition">Ketentuan Penggunaan</span>
              <span>•</span>
              <span className="hover:text-indigo-600 cursor-pointer transition">Kebijakan Privasi</span>
              <span>•</span>
              <span className="hover:text-indigo-600 cursor-pointer transition">Bantuan KBM</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
