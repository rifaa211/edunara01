/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Exam, UserResult, Competitor } from '../types';
import AnalyticsView from './AnalyticsView';
import LeaderboardView from './LeaderboardView';
import { 
  Award, 
  BookOpen, 
  Clock, 
  Flame, 
  HelpCircle, 
  Search, 
  Sparkles, 
  Trophy, 
  History, 
  TrendingUp, 
  PlayCircle,
  GraduationCap
} from 'lucide-react';

interface DashboardProps {
  exams: Exam[];
  results: UserResult[];
  competitors: Competitor[];
  onSelectExam: (exam: Exam) => void;
  onOpenPembahasan: (exam: Exam, result: UserResult) => void;
  activeViewTab: 'tryout' | 'analytics' | 'leaderboard' | 'history';
  setActiveViewTab: (tab: 'tryout' | 'analytics' | 'leaderboard' | 'history') => void;
}

export default function Dashboard({
  exams,
  results,
  competitors,
  onSelectExam,
  onOpenPembahasan,
  activeViewTab,
  setActiveViewTab
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('semua');

  // Calculate statistics
  const completedCount = results.length;
  const averageScore = completedCount > 0 
    ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / completedCount) 
    : 0;
  
  // Calculate user streak (simulated based on completions)
  const studyStreak = completedCount > 0 ? Math.min(7, completedCount * 2 - 1) : 0;

  // Filter exams based on query and category
  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'semua' || exam.categories.includes(categoryFilter as any);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8" id="dashboard-container">
      {/* Dynamic Welcome Encouraging Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        {/* Abstract decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl -mb-16 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pendidikan Profesi Guru (PPG) 2026</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Tingkatkan Kesiapan Ujian UKPPG Bersama <span className="text-indigo-400">Edunara</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Persiapkan diri Anda dengan modul simulasi CAT berbasis waktu yang dirancang presisi sesuai kisi-kisi resmi Kemendikbudristek untuk materi SJT, PCK, Pedagogik, dan Profesional.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 shrink-0 text-center flex flex-col items-center justify-center min-w-[150px] sm:min-w-[180px]">
            <GraduationCap className="w-8 h-8 text-indigo-400 mb-2" />
            <span className="text-[10px] text-slate-300 block font-semibold uppercase tracking-wider">Akurasi Kelulusan</span>
            <span className="text-3xl font-black text-white mt-1">94.8%</span>
            <span className="text-[9px] text-indigo-300 mt-1 block">Rasio Sukses Alumni Edunara</span>
          </div>
        </div>
      </div>

      {/* Stats Bento Grid Card Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tryout Completed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 hidden sm:block">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Tryout Selesai</p>
            <h4 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">{completedCount} Paket</h4>
            <p className="text-[10px] text-slate-500 mt-1">Dari 3 paket yang tersedia</p>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 hidden sm:block">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Rerata Nilai</p>
            <h4 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">{averageScore}/100</h4>
            <p className="text-[10px] text-slate-500 mt-1">Target KKM Kelulusan: 75</p>
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl shrink-0 hidden sm:block">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Streak Belajar</p>
            <h4 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">{studyStreak} Hari</h4>
            <p className="text-[10px] text-slate-500 mt-1">Konsistensi membuka tryout</p>
          </div>
        </div>

        {/* Simulated Competitors Rank */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0 hidden sm:block">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Peringkat Live</p>
            <h4 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
              {completedCount > 0 ? '#12' : '--'} <span className="text-xs font-normal text-slate-400">/ 50</span>
            </h4>
            <p className="text-[10px] text-slate-500 mt-1">Peringkat regional aktif</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Layout */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-1 sm:space-x-4">
          <button
            onClick={() => setActiveViewTab('tryout')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeViewTab === 'tryout' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            Paket Tryout
          </button>
          <button
            onClick={() => setActiveViewTab('analytics')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeViewTab === 'analytics' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Analitik Performa
          </button>
          <button
            onClick={() => setActiveViewTab('leaderboard')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeViewTab === 'leaderboard' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            Peringkat Real-Time
          </button>
          <button
            onClick={() => setActiveViewTab('history')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeViewTab === 'history' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            Riwayat Simulasi
          </button>
        </nav>
      </div>

      {/* TAB CONTENT: Available Tryouts List */}
      {activeViewTab === 'tryout' && (
        <div className="space-y-6">
          {/* Search bar and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari materi tryout..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            {/* Quick category filter tags */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['semua', 'SJT', 'PCK', 'Pedagogik'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'semua' ? 'Semua Kategori' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid list of Tryouts */}
          {filteredExams.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-bold text-slate-700">Tidak ada paket Tryout ditemukan</h4>
              <p className="text-xs mt-1">Coba gunakan kata kunci pencarian atau kategori saringan lainnya.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => {
                // Find if user already has completed this exam
                const attempts = results.filter((r) => r.examId === exam.id);
                const hasCompleted = attempts.length > 0;
                const highscore = hasCompleted ? Math.max(...attempts.map(a => a.score)) : 0;

                return (
                  <div
                    key={exam.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 shadow-sm hover:shadow-md transition duration-200 p-5 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Badge row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-1">
                          {exam.categories.map((c) => (
                            <span
                              key={c}
                              className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full uppercase"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                        {hasCompleted && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                            Lunas: {highscore}/100
                          </span>
                        )}
                      </div>

                      {/* Info and title */}
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-snug hover:text-indigo-600 transition duration-150">
                          {exam.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                          {exam.description}
                        </p>
                      </div>

                      {/* Detail row (duration & questions count) */}
                      <div className="flex items-center gap-4 text-xs text-slate-400 border-t border-slate-50 pt-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-300" />
                          {exam.durationMinutes} Menit
                        </span>
                        <span className="flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
                          {exam.totalQuestions} Soal Multi-Pilihan
                        </span>
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      onClick={() => onSelectExam(exam)}
                      className="w-full mt-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Mulai Simulasi Tryout</span>
                      <PlayCircle className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeViewTab === 'analytics' && (
        <AnalyticsView results={results} onBackToDashboard={() => setActiveViewTab('tryout')} />
      )}

      {activeViewTab === 'leaderboard' && (
        <LeaderboardView competitors={competitors} userResultHistory={results} />
      )}

      {/* TAB CONTENT: Tryout History Logs */}
      {activeViewTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-500" />
              Riwayat Pembelajaran & Hasil Skor
            </h3>
            <p className="text-xs text-slate-500">
              Berikut adalah daftar skor simulasi ujian PPG yang telah Anda kerjakan. Anda dapat membuka menu Pembahasan Soal kapan saja.
            </p>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs bg-slate-50 rounded-xl border border-slate-100">
              Belum ada riwayat pengerjaan tryout. Silakan selesaikan satu tryout pada menu Paket Tryout.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 space-y-1">
              {results.slice().reverse().map((res, index) => {
                const exam = exams.find((e) => e.id === res.examId);
                return (
                  <div key={res.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="space-y-1.5">
                      <span className="font-mono bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        Simulasi Ke-{results.length - index}
                      </span>
                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{res.examTitle}</h4>
                      <p className="text-[10px] text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>Tanggal: <strong className="text-slate-600 font-mono">{res.date}</strong></span>
                        <span>Waktu Tempuh: <strong className="text-slate-600 font-mono">{Math.floor(res.timeSpentSeconds / 60)}m {res.timeSpentSeconds % 60}s</strong></span>
                        <span className="text-emerald-600 font-semibold">{res.correctCount} Benar</span>
                        <span className="text-rose-500 font-semibold">{res.incorrectCount} Salah</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Hasil Akhir</span>
                        <span className={`text-lg sm:text-xl font-extrabold font-mono ${
                          res.score >= 75 ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {res.score}/100
                        </span>
                      </div>
                      
                      <button
                        onClick={() => exam && onOpenPembahasan(exam, res)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        Buka Pembahasan
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
