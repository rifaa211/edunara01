/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Exam, Question } from '../types';
import { Clock, Bookmark, ChevronLeft, ChevronRight, CheckSquare, AlertTriangle } from 'lucide-react';

interface ExamSimulatorProps {
  exam: Exam;
  onSubmitExam: (answers: Record<string, string>, flaggedIds: string[], timeSpentSeconds: number) => void;
  onCancelExam: () => void;
}

export default function ExamSimulator({ exam, onSubmitExam, onCancelExam }: ExamSimulatorProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(exam.durationMinutes * 60);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const questions = exam.questions;
  const currentQuestion = questions[activeIdx];

  // Timer Countdown logic
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      handleAutoSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeftSeconds]);

  const handleAutoSubmit = () => {
    const timeSpent = exam.durationMinutes * 60;
    onSubmitExam(answers, flaggedIds, timeSpent);
  };

  const handleManualSubmit = () => {
    const timeSpent = exam.durationMinutes * 60 - timeLeftSeconds;
    onSubmitExam(answers, flaggedIds, timeSpent);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Toggle answer choice
  const handleSelectOption = (questionId: string, optionKey: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  // Toggle Flag Ragu-ragu
  const handleToggleFlag = (questionId: string) => {
    setFlaggedIds((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((id) => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  // Stat counters for modal
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flaggedIds.length;
  const unansweredCount = totalQuestions - answeredCount;

  // Warning when less than 2 minutes (120 seconds)
  const isTimeLow = timeLeftSeconds <= 120;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans" id="exam-simulator-container">
      {/* Simulation Header */}
      <header className="sticky top-0 bg-indigo-700 text-white flex items-center justify-between px-6 shadow-md z-30 h-16 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
            <span className="text-indigo-700 font-bold text-xl">E</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight italic uppercase">EDUNARA</h1>
          <span className="hidden md:inline-block bg-indigo-600/50 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-indigo-500/50 uppercase tracking-widest ml-1">
            SIMULASI CAT
          </span>
        </div>

        {/* Timer and Submit Action Button */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* High Density Timer pill */}
          <div className="bg-indigo-800 px-4 py-1.5 rounded-full flex items-center gap-3 border border-indigo-500">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isTimeLow ? 'bg-red-400' : 'bg-emerald-400'}`}></div>
            <span className="font-mono text-base sm:text-lg font-medium tracking-wider text-white">{formatTime(timeLeftSeconds)}</span>
          </div>

          <div className="flex items-center gap-3 border-l border-indigo-600 pl-8 hidden lg:flex">
            <div className="text-right">
              <p className="text-xs opacity-80 uppercase font-bold tracking-wider text-indigo-200">Peserta</p>
              <p className="font-semibold text-xs text-white">marifa.k03@gmail.com</p>
            </div>
            <div className="w-9 h-9 bg-indigo-400 rounded-full border border-white overflow-hidden shrink-0">
              <img
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=user"
                alt="User Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-1.5 bg-white hover:bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
          >
            Selesai Ujian
          </button>
        </div>
      </header>

      {/* Main Simulation Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Question layout */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          
          {/* Question toolbar */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded font-bold text-xs sm:text-sm">
                SOAL {activeIdx + 1}
              </span>
              <span className="text-xs text-slate-400 italic">
                Kategori: Kompetensi {currentQuestion.category} ({currentQuestion.difficulty})
              </span>
            </div>

            {/* Bookmark Ragu-Ragu Toggle */}
            <button
              onClick={() => handleToggleFlag(currentQuestion.id)}
              className="text-amber-600 text-xs font-bold flex items-center gap-1 cursor-pointer hover:opacity-85"
            >
              <span className="text-sm">⚑</span> {flaggedIds.includes(currentQuestion.id) ? 'Tandai Selesai' : 'Tandai Ragu-ragu'}
            </button>
          </div>

          {/* Question text body */}
          <div className="p-6 sm:p-8 flex-1">
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium mb-8">
              {currentQuestion.text}
            </p>

            {/* Options container */}
            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.key;
                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelectOption(currentQuestion.id, option.key)}
                    className={`w-full text-left flex items-center p-4 rounded-lg cursor-pointer transition-all duration-150 group ${
                      isSelected
                        ? 'border-2 border-indigo-500 bg-indigo-50'
                        : 'border border-slate-200 bg-white hover:bg-indigo-50/40 hover:border-indigo-200'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold shrink-0 transition-all duration-150 ${
                      isSelected 
                        ? 'bg-indigo-500 text-white' 
                        : 'border border-slate-300 text-slate-500 group-hover:bg-white'
                    }`}>
                      {option.key}
                    </span>
                    <span className={`flex-1 text-xs sm:text-sm leading-relaxed ${
                      isSelected ? 'text-slate-800 font-semibold' : 'text-slate-700'
                    }`}>{option.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation layout */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center rounded-b-xl">
            <button
              onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeIdx === 0}
              className="px-6 py-2 border border-slate-300 rounded-lg font-bold text-slate-600 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition cursor-pointer text-xs sm:text-sm"
            >
              ← Sebelumnya
            </button>

            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              Progres: {answeredCount} / {totalQuestions} Terjawab
            </span>

            <div className="flex gap-3">
              {activeIdx < questions.length - 1 ? (
                <button
                  onClick={() => setActiveIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center gap-1 cursor-pointer text-xs sm:text-sm"
                >
                  Berikutnya →
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center gap-1 cursor-pointer text-xs sm:text-sm"
                >
                  Selesai & Kirim ✓
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Navigation panel / Question Palette */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Navigasi Soal</h2>
            <p className="text-[10px] text-slate-400 leading-normal">Klik tombol nomor di bawah untuk langsung berpindah soal.</p>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flaggedIds.includes(q.id);
              const isActive = activeIdx === idx;

              let cellStyle = 'h-8 text-[10px] flex items-center justify-center rounded bg-slate-100 text-slate-400';

              if (isAnswered) {
                cellStyle = 'h-8 text-[10px] flex items-center justify-center rounded bg-indigo-600 text-white font-bold';
              }
              if (isFlagged) {
                cellStyle = 'h-8 text-[10px] flex items-center justify-center rounded bg-amber-100 text-amber-700 font-bold border border-amber-300';
              }
              if (isActive) {
                cellStyle = 'h-8 text-[10px] flex items-center justify-center rounded border-2 border-indigo-500 bg-white text-indigo-600 font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`cursor-pointer transition duration-150 font-mono ${cellStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Palette Color legend */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Petunjuk Warna</h5>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-3 h-3 rounded bg-indigo-600 shrink-0" />
              <span>Sudah Dijawab</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 shrink-0" />
              <span>Ditandai Ragu-Ragu</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-3 h-3 rounded bg-slate-100 shrink-0" />
              <span>Belum Dijawab</span>
            </div>
          </div>

          {/* Action to quit/cancel tryout */}
          <button
            onClick={onCancelExam}
            className="w-full mt-4 py-2 bg-red-50 text-red-600 font-bold text-sm border border-red-100 rounded-lg hover:bg-red-100 transition cursor-pointer text-center"
          >
            Hentikan Ujian
          </button>
        </div>
      </main>

      {/* Confirmation Finish Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-base">Selesaikan Tryout?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Apakah Anda yakin ingin mengakhiri simulasi ujian PPG ini dan melihat hasil pembahasan detail serta peringkat Anda?
                </p>
              </div>
            </div>

            {/* Stats list inside modal */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-2.5">
              <div className="flex justify-between items-center">
                <span>Total Soal:</span>
                <span className="font-bold text-slate-800">{totalQuestions}</span>
              </div>
              <div className="flex justify-between items-center text-indigo-600">
                <span>Sudah Dijawab:</span>
                <span className="font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between items-center text-amber-600">
                <span>Ditandai Ragu-Ragu:</span>
                <span className="font-bold">{flaggedCount}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Belum Dijawab:</span>
                <span className="font-bold">{unansweredCount}</span>
              </div>
            </div>

            {/* Confirm buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-xl text-xs transition cursor-pointer"
              >
                Lanjutkan Ujian
              </button>
              <button
                onClick={handleManualSubmit}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition shadow-sm cursor-pointer"
              >
                Ya, Selesai & Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
