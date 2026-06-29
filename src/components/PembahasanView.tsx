/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Exam, UserResult, Question } from '../types';
import { CheckCircle2, XCircle, AlertCircle, ArrowLeft, Bookmark, Filter, BookOpen, Brain, Lightbulb } from 'lucide-react';

interface PembahasanViewProps {
  exam: Exam;
  result: UserResult;
  onBackToDashboard: () => void;
  onRetake: () => void;
}

type FilterType = 'all' | 'correct' | 'incorrect' | 'flagged';

export default function PembahasanView({ exam, result, onBackToDashboard, onRetake }: PembahasanViewProps) {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [filter, setFilter] = useState<FilterType>('all');

  const questions = exam.questions;
  const userAnswers = result.answers;
  const flaggedIds = result.flaggedQuestionIds || [];

  // Filter questions based on criteria
  const filteredQuestionsWithIdx = questions
    .map((q, idx) => ({ q, originalIdx: idx }))
    .filter(({ q, originalIdx }) => {
      const isCorrect = userAnswers[q.id] === q.correctKey;
      const isFlagged = flaggedIds.includes(q.id);
      
      if (filter === 'correct') return isCorrect;
      if (filter === 'incorrect') return !isCorrect && userAnswers[q.id] !== undefined;
      if (filter === 'flagged') return isFlagged;
      return true; // 'all'
    });

  // Make sure active question index points to a valid filtered question
  const currentItem = filteredQuestionsWithIdx.length > 0 
    ? (filteredQuestionsWithIdx.find(item => item.originalIdx === activeQuestionIdx) || filteredQuestionsWithIdx[0])
    : null;

  const activeQuestion = currentItem ? currentItem.q : null;
  const activeOriginalIdx = currentItem ? currentItem.originalIdx : 0;

  return (
    <div className="space-y-6" id="pembahasan-view-container">
      {/* Upper Navigation and Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-lg transition border border-slate-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Mode Pembahasan</span>
            <h2 className="text-lg font-bold text-slate-800 leading-tight mt-1 truncate max-w-[280px] sm:max-w-md md:max-w-lg">
              {exam.title}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRetake}
            className="px-4 py-2 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl transition"
          >
            Uji Ulang Simulasi
          </button>
          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 text-xs font-semibold bg-slate-900 text-slate-50 hover:bg-slate-800 rounded-xl transition"
          >
            Ke Dashboard
          </button>
        </div>
      </div>

      {/* Result score highlights */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center border-r border-slate-700/50">
          <p className="text-xs text-slate-300">Skor Tryout Anda</p>
          <h4 className="text-3xl font-extrabold text-indigo-300 mt-1">{result.score}/100</h4>
        </div>
        <div className="text-center border-r border-slate-700/50">
          <p className="text-xs text-slate-300">Benar / Total</p>
          <h4 className="text-3xl font-extrabold text-emerald-400 mt-1">{result.correctCount} / {questions.length}</h4>
        </div>
        <div className="text-center border-r border-slate-700/50">
          <p className="text-xs text-slate-300">Salah / Dilewati</p>
          <h4 className="text-3xl font-extrabold text-rose-400 mt-1">
            {result.incorrectCount} / {result.skippedCount}
          </h4>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-300">Waktu Tempuh</p>
          <h4 className="text-2xl font-extrabold text-slate-200 mt-1.5">
            {Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Question Nav & Filters */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5 h-fit">
          {/* Filters buttons */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Filter className="w-3.5 h-3.5 text-indigo-500" />
              Saring Hasil Soal
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition flex items-center justify-between ${
                  filter === 'all'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                <span>Semua</span>
                <span className="bg-slate-500/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono">{questions.length}</span>
              </button>
              <button
                onClick={() => setFilter('correct')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition flex items-center justify-between ${
                  filter === 'correct'
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100 text-emerald-700'
                }`}
              >
                <span>Benar</span>
                <span className="bg-emerald-500/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono">{result.correctCount}</span>
              </button>
              <button
                onClick={() => setFilter('incorrect')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition flex items-center justify-between ${
                  filter === 'incorrect'
                    ? 'bg-rose-600 border-rose-600 text-white'
                    : 'bg-rose-50/50 hover:bg-rose-50 border-rose-100 text-rose-700'
                }`}
              >
                <span>Salah</span>
                <span className="bg-rose-500/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono">{result.incorrectCount}</span>
              </button>
              <button
                onClick={() => setFilter('flagged')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition flex items-center justify-between ${
                  filter === 'flagged'
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'bg-amber-50/50 hover:bg-amber-50 border-amber-100 text-amber-700'
                }`}
              >
                <span>Ditandai</span>
                <span className="bg-amber-500/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono">{flaggedIds.length}</span>
              </button>
            </div>
          </div>

          {/* List of Question indices under filter */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Daftar Soal
            </label>
            {filteredQuestionsWithIdx.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs bg-slate-50 rounded-xl border border-slate-100">
                Tidak ada soal yang memenuhi filter ini.
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-2 max-h-[250px] overflow-y-auto p-1">
                {filteredQuestionsWithIdx.map(({ q, originalIdx }) => {
                  const isCorrect = userAnswers[q.id] === q.correctKey;
                  const isSelected = activeOriginalIdx === originalIdx;
                  const isFlagged = flaggedIds.includes(q.id);

                  let cellStyle = 'h-8 text-[10px] bg-slate-100 text-slate-400 border border-slate-200';
                  if (isCorrect) cellStyle = 'h-8 text-[10px] bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold';
                  else if (userAnswers[q.id] !== undefined) cellStyle = 'h-8 text-[10px] bg-rose-100 border border-rose-300 text-rose-800 font-bold';

                  if (isSelected) {
                    if (isCorrect) cellStyle = 'h-8 text-[10px] bg-emerald-600 text-white font-bold ring-2 ring-emerald-200';
                    else if (userAnswers[q.id] !== undefined) cellStyle = 'h-8 text-[10px] bg-rose-600 text-white font-bold ring-2 ring-rose-200';
                    else cellStyle = 'h-8 text-[10px] bg-slate-800 text-white font-bold ring-2 ring-slate-200';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setActiveQuestionIdx(originalIdx)}
                      className={`relative rounded flex items-center justify-center cursor-pointer transition-all duration-150 font-mono ${cellStyle}`}
                    >
                      {originalIdx + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick legend card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-300 flex shrink-0" />
              <span>Jawaban Benar</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-rose-100 border border-rose-300 flex shrink-0" />
              <span>Jawaban Salah / Kurang Tepat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-400 flex shrink-0" />
              <span>Ditandai untuk Diulas Kembali</span>
            </div>
          </div>
        </div>

        {/* Detailed Question and explanation container */}
        <div className="lg:col-span-8 space-y-6">
          {activeQuestion ? (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              {/* Question metadata row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-xl text-xs">
                    Soal {activeOriginalIdx + 1} dari {questions.length}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                    activeQuestion.difficulty === 'HOTS' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                    activeQuestion.difficulty === 'MOTS' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    'bg-slate-50 text-slate-600 border border-slate-100'
                  }`}>
                    {activeQuestion.difficulty}
                  </span>
                  <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
                    {activeQuestion.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-500">{activeQuestion.points} Poin</span>
                  {flaggedIds.includes(activeQuestion.id) && (
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded border border-amber-100">
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      <span>Ditandai</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-slate-800 font-semibold leading-relaxed text-sm sm:text-base">
                {activeQuestion.text}
              </div>

              {/* Options lists with clear answers feedback */}
              <div className="space-y-3">
                {activeQuestion.options.map((option) => {
                  const isCorrectAnswer = option.key === activeQuestion.correctKey;
                  const isUserAnswer = option.key === userAnswers[activeQuestion.id];

                  let optionStyle = 'bg-white border-slate-200 text-slate-700';
                  let iconElement = null;

                  if (isCorrectAnswer) {
                    // Correct answer (green background always)
                    optionStyle = 'bg-emerald-50/50 border-emerald-300 text-emerald-900';
                    iconElement = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                  } else if (isUserAnswer) {
                    // User got it wrong (rose background)
                    optionStyle = 'bg-rose-50/50 border-rose-300 text-rose-900';
                    iconElement = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
                  }

                  return (
                    <div
                      key={option.key}
                      className={`flex items-start gap-3 p-4 rounded-xl border text-xs sm:text-sm transition-all duration-150 ${optionStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCorrectAnswer ? 'bg-emerald-600 text-white' :
                        isUserAnswer ? 'bg-rose-600 text-white' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {option.key}
                      </span>
                      <span className="flex-1 leading-relaxed">{option.text}</span>
                      {iconElement}
                    </div>
                  );
                })}
              </div>

              {/* Expandable Explanation block (Pembahasan) */}
              <div className="border-t border-slate-100 pt-6 space-y-5">
                <div className="flex items-center gap-2 border-b border-indigo-100 pb-3">
                  <BookOpen className="w-5 h-5 text-indigo-600 animate-pulse" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Pembahasan & Landasan Teoretis</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Core pedagogic concept */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      <Brain className="w-4 h-4 text-slate-600" />
                      Konsep Inti (Teoretis)
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {activeQuestion.explanation.coreConcept}
                    </p>
                  </div>

                  {/* Exam tips */}
                  <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      Tips Ujian PPG
                    </div>
                    <p className="text-xs text-amber-950 leading-relaxed font-medium">
                      {activeQuestion.explanation.pedagogicTip}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-xl space-y-1.5">
                    <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Mengapa Jawaban ({activeQuestion.correctKey}) Benar?
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {activeQuestion.explanation.whyCorrect}
                    </p>
                  </div>

                  <div className="p-4 bg-rose-50/20 border border-rose-100 rounded-xl space-y-1.5">
                    <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5 uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-rose-500" />
                      Analisis Opsi Kurang Tepat
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {activeQuestion.explanation.whyIncorrect}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm text-slate-500">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h4 className="font-bold text-slate-700">Soal Tidak Ditemukan</h4>
              <p className="text-xs mt-1">Silakan sesuaikan filter saringan di panel sebelah kiri Anda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
