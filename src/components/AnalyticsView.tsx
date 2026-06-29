/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { UserResult, Category } from '../types';
import { Award, BookOpen, Brain, Clock, ShieldAlert, TrendingUp } from 'lucide-react';

interface AnalyticsViewProps {
  results: UserResult[];
  onBackToDashboard: () => void;
}

export default function AnalyticsView({ results, onBackToDashboard }: AnalyticsViewProps) {
  const [hoveredTopic, setHoveredTopic] = useState<Category | null>(null);

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Belum Ada Data Analitik</h3>
        <p className="text-slate-500 mt-2 max-w-md">
          Selesaikan minimal satu simulasi Tryout untuk melihat analisis performa, peta kekuatan materi, dan rekomendasi belajar spesifik Anda.
        </p>
        <button
          onClick={onBackToDashboard}
          className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition shadow-sm"
        >
          Mulai Tryout Sekarang
        </button>
      </div>
    );
  }

  // Calculate average scores and counters
  const totalCompleted = results.length;
  const averageScore = Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / totalCompleted);
  const totalCorrect = results.reduce((acc, curr) => acc + curr.correctCount, 0);
  const totalQuestions = results.reduce((acc, curr) => acc + curr.correctCount + curr.incorrectCount + curr.skippedCount, 0);
  const accuracyRate = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  
  const totalSecondsSpent = results.reduce((acc, curr) => acc + curr.timeSpentSeconds, 0);
  const avgTimePerQuestion = totalQuestions > 0 ? Math.round(totalSecondsSpent / totalQuestions) : 0;

  // Calculate category averages
  const categories: Category[] = ['SJT', 'PCK', 'Pedagogik', 'Profesional'];
  const categoryStats = categories.reduce((acc, cat) => {
    let sum = 0;
    let count = 0;
    results.forEach(res => {
      if (res.categoryScores[cat] !== undefined) {
        sum += res.categoryScores[cat];
        count++;
      }
    });
    acc[cat] = count > 0 ? Math.round(sum / count) : 0;
    return acc;
  }, {} as Record<Category, number>);

  // Determine strengths and weaknesses
  const sortedCategories = [...categories].sort((a, b) => categoryStats[b] - categoryStats[a]);
  const strengthCategory = sortedCategories[0];
  const weaknessCategory = sortedCategories[sortedCategories.length - 1];

  // Specific recommendations based on weakness
  const recommendations: Record<Category, string[]> = {
    SJT: [
      'Pelajari Kode Etik Guru Indonesia khususnya terkait hubungan profesional dengan wali murid.',
      'Latih skenario Situational Judgement yang mengedepankan pembinaan persuasif dibanding tindakan punitif/keras.',
      'Utamakan keadilan akses belajar bagi seluruh siswa tanpa membeda-bedakan latar belakang sosial-ekonomi.'
    ],
    PCK: [
      'Pahami penerapan TPACK (Technological Pedagogical Content Knowledge) yang mengintegrasikan media interaktif (seperti GeoGebra/PhET) secara kognitif.',
      'Pelajari Model Perubahan Konseptual (Conceptual Change) untuk mengatasi miskonsepsi sains siswa.',
      'Gunakan rancangan scaffolding bertahap (bantuan sementara) sesuai ZPD siswa.'
    ],
    Pedagogik: [
      'Kaji ulang perbedaan utama Teori Belajar: Behaviorisme (pemberian stimulus-penguat), Kognitivisme (proses asimilasi-akomodasi), dan Konstruktivisme.',
      'Pahami prinsip penyusunan Asesmen Diagnostik awal sebelum merancang Pembelajaran Berdiferensiasi.',
      'Ingat kembali kata kerja operasional Taksonomi Bloom revisi untuk tingkatan C1 hingga C6.'
    ],
    Profesional: [
      'Perdalam analisis materi esensial mata pelajaran bidang studi pilihan Anda.',
      'Latih pemecahan kasus kontekstual terkait konsep-konsep keilmuan mutakhir.',
      'Integrasikan pemahaman teori murni dengan aplikasi aplikatif di ruang kelas.'
    ]
  };

  // Custom Line Chart coordinate generation for progress over time
  // Width: 500, Height: 200, padding: 30
  const chartWidth = 550;
  const chartHeight = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const pointsCount = results.length;
  const linePoints = results.map((res, idx) => {
    const x = paddingLeft + (pointsCount > 1 ? (idx / (pointsCount - 1)) * innerWidth : innerWidth / 2);
    // score 0 - 100 maps to innerHeight - 0
    const y = paddingTop + innerHeight - (res.score / 100) * innerHeight;
    return { x, y, score: res.score, date: res.date, title: res.examTitle };
  });

  const linePath = linePoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // SVG Radar Chart math
  // Center (150, 150), Radius: 100
  const radarCenter = 130;
  const radarRadius = 90;
  
  // SJT (0 deg -> x=center, y=center-R), PCK (90 deg -> x=center+R, y=center), 
  // Pedagogik (180 deg -> x=center, y=center+R), Profesional (270 deg -> x=center-R, y=center)
  const getRadarPoint = (index: number, scoreValue: number) => {
    const angle = (index * 2 * Math.PI) / 4 - Math.PI / 2;
    const r = (scoreValue / 100) * radarRadius;
    const x = radarCenter + r * Math.cos(angle);
    const y = radarCenter + r * Math.sin(angle);
    return { x, y };
  };

  const getLabelPoint = (index: number, offset: number = 22) => {
    const angle = (index * 2 * Math.PI) / 4 - Math.PI / 2;
    const r = radarRadius + offset;
    const x = radarCenter + r * Math.cos(angle);
    const y = radarCenter + r * Math.sin(angle);
    return { x, y };
  };

  const radarPoints = categories.map((cat, idx) => getRadarPoint(idx, categoryStats[cat]));
  const radarPolygonPath = radarPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="space-y-8" id="analytics-view-container">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            Analisis Performa Edunara
          </h2>
          <p className="text-slate-500 mt-1">
            Analisis kecerdasan belajar berdasarkan {totalCompleted} riwayat tryout yang telah Anda selesaikan.
          </p>
        </div>
        <button
          onClick={onBackToDashboard}
          className="self-start md:self-auto px-5 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-100 rounded-xl transition"
        >
          Kembali ke Dashboard
        </button>
      </div>

      {/* Stats Summary Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Rerata Nilai</p>
            <h4 className="text-2xl font-extrabold text-slate-800 mt-1">{averageScore}/100</h4>
            <span className="text-xs text-emerald-500 font-medium flex items-center gap-0.5 mt-1">
              Kualifikasi: {averageScore >= 80 ? 'Sangat Memuaskan' : averageScore >= 70 ? 'Lulus KKM' : 'Perlu Remedial'}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Akurasi Jawaban</p>
            <h4 className="text-2xl font-extrabold text-slate-800 mt-1">{accuracyRate}%</h4>
            <span className="text-xs text-slate-500 mt-1 block">
              {totalCorrect} dari {totalQuestions} soal benar
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Rerata Waktu Soal</p>
            <h4 className="text-2xl font-extrabold text-slate-800 mt-1">{avgTimePerQuestion}s</h4>
            <span className="text-xs text-slate-500 mt-1 block">
              Saran: Maksimal 60 detik per soal
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Materi Terkuat</p>
            <h4 className="text-2xl font-extrabold text-indigo-700 mt-1">{strengthCategory}</h4>
            <span className="text-xs text-emerald-600 font-medium mt-1 block">
              Penguasaan: {categoryStats[strengthCategory]}%
            </span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Map & Topic Mastery */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-500" />
              Peta Penguasaan Kompetensi
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Representasi penguasaan materi pada 4 kompetensi inti PPG.</p>
          </div>

          {/* Interactive Radar Chart */}
          <div className="flex justify-center my-6">
            <svg width={radarCenter * 2} height={radarCenter * 2} className="overflow-visible select-none">
              {/* Concentric Circle Guides */}
              {[20, 40, 60, 80, 100].map((guideScore) => (
                <circle
                  key={guideScore}
                  cx={radarCenter}
                  cy={radarCenter}
                  r={(guideScore / 100) * radarRadius}
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              ))}

              {/* Axis lines */}
              {categories.map((_, idx) => {
                const outer = getRadarPoint(idx, 100);
                return (
                  <line
                    key={idx}
                    x1={radarCenter}
                    y1={radarCenter}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                );
              })}

              {/* Guide Labels for percentage levels */}
              {[40, 80, 100].map((level) => (
                <text
                  key={level}
                  x={radarCenter + 4}
                  y={radarCenter - (level / 100) * radarRadius + 4}
                  className="fill-slate-400 font-mono text-[9px]"
                >
                  {level}%
                </text>
              ))}

              {/* Filled Radar Area */}
              <polygon
                points={radarPoints.map(p => `${p.x},${p.y}`).join(' ')}
                fill="rgba(99, 102, 241, 0.18)"
                stroke="#4f46e5"
                strokeWidth="2.5"
                className="transition-all duration-500"
              />

              {/* Radar Data points */}
              {categories.map((cat, idx) => {
                const pt = getRadarPoint(idx, categoryStats[cat]);
                const isHovered = hoveredTopic === cat;
                return (
                  <circle
                    key={cat}
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 7 : 5}
                    fill={isHovered ? '#6366f1' : '#4f46e5'}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredTopic(cat)}
                    onMouseLeave={() => setHoveredTopic(null)}
                  />
                );
              })}

              {/* Dimension Labels */}
              {categories.map((cat, idx) => {
                const pt = getLabelPoint(idx, 20);
                const isHovered = hoveredTopic === cat;
                // text-anchor adjustment
                let anchor = 'middle';
                if (idx === 1) anchor = 'start';
                if (idx === 3) anchor = 'end';
                
                return (
                  <text
                    key={cat}
                    x={pt.x}
                    y={idx === 2 ? pt.y + 4 : pt.y}
                    textAnchor={anchor}
                    className={`font-semibold text-xs select-none transition-colors duration-200 ${
                      isHovered ? 'fill-indigo-600 font-bold' : 'fill-slate-600'
                    }`}
                    style={{ fontSize: '11px' }}
                  >
                    {cat} ({categoryStats[cat]}%)
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Simple breakdown list */}
          <div className="space-y-2 mt-2">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition ${
                  hoveredTopic === cat
                    ? 'bg-indigo-50 border-indigo-200'
                    : 'bg-slate-50/50 border-slate-100'
                }`}
                onMouseEnter={() => setHoveredTopic(cat)}
                onMouseLeave={() => setHoveredTopic(null)}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    categoryStats[cat] >= 80 ? 'bg-emerald-500' : categoryStats[cat] >= 60 ? 'bg-amber-400' : 'bg-rose-400'
                  }`} />
                  <span className="text-xs font-semibold text-slate-700">{cat}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">Target: 75%</span>
                  <span className="text-xs font-extrabold text-slate-800">{categoryStats[cat]}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning History & Score Trend */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Tren Nilai Pembelajaran
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Grafik peningkatakan skor Anda dari seluruh percobaan yang diselesaikan.</p>
          </div>

          {/* Score line chart */}
          <div className="my-6 relative overflow-x-auto">
            <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet" className="min-w-[500px]">
              {/* Background horizontal grid lines */}
              {[0, 25, 50, 75, 100].map((yVal) => {
                const y = paddingTop + innerHeight - (yVal / 100) * innerHeight;
                return (
                  <g key={yVal}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={chartWidth - paddingRight}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1.5"
                    />
                    <text
                      x={paddingLeft - 10}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-slate-400 font-mono text-[10px]"
                    >
                      {yVal}
                    </text>
                  </g>
                );
              })}

              {/* Area Under Curve (Gradient) */}
              {linePoints.length > 1 && (
                <path
                  d={`${linePath} L ${linePoints[linePoints.length - 1].x} ${paddingTop + innerHeight} L ${linePoints[0].x} ${paddingTop + innerHeight} Z`}
                  fill="url(#scoreGradient)"
                />
              )}

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* The Score Line */}
              {linePoints.length > 1 ? (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : linePoints.length === 1 ? (
                <circle cx={linePoints[0].x} cy={linePoints[0].y} r="5" fill="#4f46e5" />
              ) : null}

              {/* Interactive Dots on curve */}
              {linePoints.map((p, idx) => (
                <g key={idx} className="group cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="5"
                    fill="#4f46e5"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="hover:r-7 transition-all duration-150"
                  />
                  {/* Small Score Flag label */}
                  <rect
                    x={p.x - 18}
                    y={p.y - 25}
                    width="36"
                    height="18"
                    rx="4"
                    fill="#1e293b"
                    className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  />
                  <text
                    x={p.x}
                    y={p.y - 13}
                    textAnchor="middle"
                    className="fill-white font-mono text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  >
                    {p.score}
                  </text>

                  {/* Date labels on X Axis */}
                  <text
                    x={p.x}
                    y={chartHeight - 8}
                    textAnchor="middle"
                    className="fill-slate-400 font-mono text-[9px]"
                  >
                    T-{idx + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Table list of attempts */}
          <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1">
            {results.slice().reverse().map((res, idx) => (
              <div key={res.id} className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-md">
                    Ke-{results.length - idx}
                  </span>
                  <span className="font-semibold text-slate-700 truncate max-w-[200px] sm:max-w-xs">{res.examTitle}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 font-mono">{res.date}</span>
                  <span className={`font-bold font-mono px-2 py-0.5 rounded-full ${
                    res.score >= 80 ? 'text-emerald-600 bg-emerald-50' : res.score >= 60 ? 'text-amber-600 bg-amber-50' : 'text-rose-600 bg-rose-50'
                  }`}>
                    {res.score}/100
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths, Weaknesses and Smart Recommendations */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />

        <div className="relative z-10">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            Rekomendasi Pintar Pembelajaran (AI Advisor)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Saran taktis personal berdasarkan titik kelemahan Anda di bidang kompetensi <strong className="text-indigo-400">{weaknessCategory}</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Recommendations Bullet */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Langkah Perbaikan Utama:
              </h4>
              <ul className="space-y-3">
                {recommendations[weaknessCategory]?.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5 font-bold font-mono text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diagnostic recommendation breakdown */}
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">Fokus Studi Mingguan</span>
                <h5 className="font-bold text-sm text-slate-100 mt-1">
                  Atasi Kesenjangan {weaknessCategory} Anda
                </h5>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Data menunjukkan tingkat akurasi Anda di materi <strong className="text-slate-200">{weaknessCategory}</strong> hanya sebesar {categoryStats[weaknessCategory]}%. Cobalah untuk melakukan simulasi ulang fokus pada paket {weaknessCategory} dan diskusikan pembahasan soal secara mendalam.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                <span>Rasio Lulus Nasional: <strong className="text-slate-200">76%</strong></span>
                <span>Skor Anda: <strong className={categoryStats[weaknessCategory] >= 75 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>{categoryStats[weaknessCategory]}%</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
