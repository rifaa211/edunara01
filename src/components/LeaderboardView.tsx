/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Competitor, LiveActivity } from '../types';
import { Award, Trophy, Users, Globe, MapPin, Building, Sparkles, MessageSquare, Flame } from 'lucide-react';

interface LeaderboardViewProps {
  competitors: Competitor[];
  userResultHistory: { examTitle: string; score: number }[];
}

// Initial mock live activities in Indonesian language
const INITIAL_ACTIVITIES: LiveActivity[] = [
  { id: 'act-1', competitorName: 'Yuni Lestari, S.Pd.', examTitle: 'PCK - Strategi Pembelajaran', score: 80, timestamp: '1 menit yang lalu' },
  { id: 'act-2', competitorName: 'Bambang Widjojo, S.Si.', examTitle: 'Pedagogik & Profesional', score: 90, timestamp: '3 menit yang lalu' },
  { id: 'act-3', competitorName: 'Andi Wijaya, S.Pd.', examTitle: 'SJT - Sikap & Etika Pendidik', score: 95, timestamp: '5 menit yang lalu' },
  { id: 'act-4', competitorName: 'Dewi Sartika, S.Hum.', examTitle: 'PCK - Strategi Pembelajaran', score: 75, timestamp: '7 menit yang lalu' },
];

export default function LeaderboardView({ competitors, userResultHistory }: LeaderboardViewProps) {
  const [filterType, setFilterType] = useState<'nasional' | 'regional' | 'sekolah'>('nasional');
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'activity'>('leaderboard');
  const [liveActivities, setLiveActivities] = useState<LiveActivity[]>(INITIAL_ACTIVITIES);
  const [leaderboardList, setLeaderboardList] = useState<Competitor[]>([]);

  // Build the list of competitors, injecting the user if they have scores
  useEffect(() => {
    // Calculate user's highest score or average score
    const userBestScore = userResultHistory.length > 0 
      ? Math.max(...userResultHistory.map(h => h.score))
      : 0;

    // Create copy of competitors
    let combined = competitors.map(c => ({ ...c }));

    if (userBestScore > 0) {
      // Find current user index if already exists or update it
      const userIndex = combined.findIndex(c => c.isCurrentUser);
      if (userIndex !== -1) {
        combined[userIndex].score = userBestScore;
      } else {
        combined.push({
          id: 'user-current',
          name: 'Anda (Guru Profesional)',
          school: 'SDN Nusantara Mandiri',
          region: 'DI Yogyakarta',
          score: userBestScore,
          averageTimeSeconds: 45,
          avatarSeed: 'user',
          isCurrentUser: true,
        });
      }
    }

    // Sort descending by score, then ascending by averageTimeSeconds
    combined.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.averageTimeSeconds - b.averageTimeSeconds;
    });

    setLeaderboardList(combined);
  }, [competitors, userResultHistory]);

  // Simulate real-time ticking activities & rank changes to motivate the user
  useEffect(() => {
    const names = [
      'Sri Mulyani, S.Pd.', 'Ahmad Fauzi, M.Pd.', 'Siti Aminah, S.Pd.SD', 
      'Hendra Wijaya, S.T.', 'Indah Permata, S.Pd.', 'Rian Pratama, S.Kom.', 
      'Mega Utami, S.Si.', 'Eko Santoso, M.Si.', 'Anisa Rahmawati, S.Pd.'
    ];
    const schools = [
      'SMAN 1 Bandung', 'SMPN 2 Surabaya', 'SDN 3 Malang', 
      'SMKN 4 Yogyakarta', 'SDIT Al-Hikmah', 'SMP Kristen 1 Surakarta', 
      'MAN 2 Jakarta'
    ];
    const regions = [
      'Jawa Barat', 'Jawa Timur', 'Jawa Tengah', 
      'DKI Jakarta', 'DI Yogyakarta', 'Banten', 'Bali'
    ];
    const exams = [
      'SJT - Sikap & Etika Pendidik', 
      'PCK - Strategi Pembelajaran', 
      'Pedagogik & Profesional - Teori Belajar & Kurikulum'
    ];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomSchool = schools[Math.floor(Math.random() * schools.length)];
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      const randomExam = exams[Math.floor(Math.random() * exams.length)];
      // Random high score
      const randomScore = [60, 70, 80, 85, 90, 95, 100][Math.floor(Math.random() * 7)];

      // 1. Add to Live Activity Feed
      const newActivity: LiveActivity = {
        id: `act-${Date.now()}`,
        competitorName: randomName,
        examTitle: randomExam,
        score: randomScore,
        timestamp: 'Baru saja'
      };

      setLiveActivities(prev => [newActivity, ...prev.slice(0, 7)]);

      // 2. Randomly update leaderboard slightly to simulate other users climbing ranks
      setLeaderboardList(prev => {
        // Find a random mock competitor (not the user) and slightly boost or drop their score
        const listCopy = prev.map(item => ({ ...item }));
        const nonUsers = listCopy.filter(item => !item.isCurrentUser);
        if (nonUsers.length > 0) {
          const luckyItem = nonUsers[Math.floor(Math.random() * nonUsers.length)];
          const itemIdx = listCopy.findIndex(item => item.id === luckyItem.id);
          
          if (itemIdx !== -1) {
            // Give them a new realistic score
            listCopy[itemIdx].score = Math.min(100, Math.max(40, listCopy[itemIdx].score + (Math.random() > 0.5 ? 5 : -5)));
            // Sort list again
            listCopy.sort((a, b) => {
              if (b.score !== a.score) return b.score - a.score;
              return a.averageTimeSeconds - b.averageTimeSeconds;
            });
          }
        }
        return listCopy;
      });

    }, 8000); // ticks every 8 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter leaderboard based on tab (Regional / Sekolah)
  const getFilteredLeaderboard = () => {
    if (filterType === 'regional') {
      // Filter by Yogyakarta or Jawa Tengah regions for mock categorization
      return leaderboardList.filter(item => item.region.includes('Yogyakarta') || item.region.includes('Jawa Tengah') || item.isCurrentUser);
    }
    if (filterType === 'sekolah') {
      // Filter items that have school name of 'SDN' or 'SD'
      return leaderboardList.filter(item => item.school.startsWith('SD') || item.isCurrentUser);
    }
    return leaderboardList;
  };

  const activeFilteredList = getFilteredLeaderboard();
  const currentUserRank = activeFilteredList.findIndex(item => item.isCurrentUser) + 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="leaderboard-view-container">
      {/* Left side: Immersive Leaderboard List */}
      <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              Peringkat Live Edunara
            </h3>
            <p className="text-xs text-slate-500">
              Sistem peringkat kompetisi real-time antar peserta PPG se-Indonesia.
            </p>
          </div>

          {/* Leaderboard filters */}
          <div className="flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100 self-start sm:self-auto">
            <button
              onClick={() => setFilterType('nasional')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
                filterType === 'nasional' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Nasional
            </button>
            <button
              onClick={() => setFilterType('regional')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
                filterType === 'regional' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Regional
            </button>
            <button
              onClick={() => setFilterType('sekolah')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
                filterType === 'sekolah' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              Sekolah / SD
            </button>
          </div>
        </div>

        {/* User rank badge alert */}
        {userResultHistory.length > 0 && currentUserRank > 0 ? (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center font-black text-lg">
                #{currentUserRank}
              </div>
              <div>
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">Selamat! Anda masuk daftar peringkat</h5>
                <p className="text-xs text-slate-500 mt-0.5">
                  Anda berada di peringkat <strong className="text-amber-600 font-bold">#{currentUserRank}</strong> dari {activeFilteredList.length} peserta teraktif.
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>GURU HEBAT</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-500 text-center">
            Anda belum memiliki skor tryout resmi. Selesaikan minimal satu simulasi tryout untuk mendaftarkan nama Anda di sistem peringkat nasional.
          </div>
        )}

        {/* Competitor list */}
        <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto pr-2 space-y-1">
          {activeFilteredList.map((item, idx) => {
            const rank = idx + 1;
            const isCurrentUser = item.isCurrentUser;

            // Highlight top 3 beautifully
            let rankElement = <span className="font-bold font-mono text-slate-400 w-6 text-center">{rank}</span>;
            let rowStyle = 'bg-white hover:bg-slate-50/50';

            if (rank === 1) {
              rankElement = (
                <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shadow-sm">
                  <Trophy className="w-3.5 h-3.5 fill-current" />
                </div>
              );
            } else if (rank === 2) {
              rankElement = (
                <div className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shadow-sm">
                  <Award className="w-3.5 h-3.5 fill-current" />
                </div>
              );
            } else if (rank === 3) {
              rankElement = (
                <div className="w-6 h-6 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center shadow-sm">
                  <Award className="w-3.5 h-3.5 fill-current" />
                </div>
              );
            }

            if (isCurrentUser) {
              rowStyle = 'bg-indigo-50/50 border border-indigo-200/60 rounded-2xl ring-2 ring-indigo-500/20';
            }

            return (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 transition ${rowStyle}`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank */}
                  <div className="w-6 flex items-center justify-center">
                    {rankElement}
                  </div>

                  {/* Avatar */}
                  <img
                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${item.avatarSeed}`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-xl bg-slate-100 shrink-0 object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Candidate Info */}
                  <div>
                    <h5 className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${isCurrentUser ? 'text-indigo-800' : 'text-slate-800'}`}>
                      {item.name}
                      {isCurrentUser && (
                        <span className="bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                          ANDA
                        </span>
                      )}
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-semibold text-slate-500">{item.school}</span>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span className="text-slate-400 flex items-center gap-0.5">
                        <MapPin className="w-2.5 h-2.5 text-slate-300" />
                        {item.region}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Performance stats */}
                <div className="text-right flex items-center gap-4">
                  <div className="hidden sm:block">
                    <span className="text-[10px] text-slate-400 font-mono">Kecepatan</span>
                    <p className="text-xs font-semibold text-slate-600 font-mono">{item.averageTimeSeconds}s / soal</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block sm:hidden">Skor</span>
                    <span className={`text-sm sm:text-base font-black font-mono px-3 py-1 rounded-xl ${
                      item.score >= 80 ? 'bg-emerald-50 text-emerald-600' : item.score >= 60 ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.score}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side: Real-time Live Tryout Activity Feed */}
      <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between h-fit space-y-6 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-bold text-sm tracking-wide flex items-center gap-1.5 uppercase">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Live Feed Aktivitas
            </h4>
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Pantau aktivitas tryout rekan sejawat guru lainnya secara langsung di seluruh wilayah nusantara.
          </p>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {liveActivities.map((act) => (
              <div key={act.id} className="bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800/80 hover:border-slate-700/50 transition duration-150 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-extrabold text-indigo-300 truncate max-w-[150px]">
                    {act.competitorName}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded shrink-0">
                    {act.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  Selesai merampungkan <span className="text-slate-100 font-semibold">{act.examTitle}</span>.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/40 text-[10px]">
                  <span className="text-slate-500">Hasil Akhir:</span>
                  <span className={`font-bold font-mono px-2 py-0.5 rounded ${
                    act.score >= 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {act.score}/100
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational quote widget */}
        <div className="bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-900/50 p-4 rounded-2xl flex items-start gap-3 relative z-10">
          <MessageSquare className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-indigo-300 block mb-0.5">Motivasi Guru</span>
            <p className="text-slate-400 italic leading-relaxed">
              &ldquo;Mengajar adalah belajar dua kali. Setiap tryout yang Anda jalani adalah modal berharga menghadirkan pendidikan terbaik untuk generasi masa depan.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
