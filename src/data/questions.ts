/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Exam } from '../types';

export const EXAMS_DATA: Exam[] = [
  {
    id: 'ppg-sjt-01',
    title: 'SJT (Situational Judgement Test) - Sikap & Etika Pendidik',
    description: 'Mengukur respons dan keputusan situasional Anda terhadap skenario nyata dilema moral, hubungan sosial, dan etika keguruan dalam lingkungan sekolah.',
    durationMinutes: 10,
    totalQuestions: 5,
    categories: ['SJT'],
    questions: [
      {
        id: 'sjt-q1',
        text: 'Anda sedang menjelaskan materi pelajaran di kelas, namun ada salah satu siswa yang secara konsisten mengganggu pembelajaran dengan bermain gawai (handphone). Siswa ini memiliki riwayat broken home dan sering mencari perhatian. Tindakan paling tepat yang sebaiknya Anda lakukan adalah...',
        options: [
          { key: 'A', text: 'Mengambil gawai siswa tersebut secara paksa, memarahinya di depan kelas agar siswa lain jera, dan melanjutkan pelajaran.' },
          { key: 'B', text: 'Mengabaikan perilaku siswa tersebut agar tidak membuang waktu mengajar, dan fokus mendidik siswa lain yang mau belajar.' },
          { key: 'C', text: 'Mendekati meja siswa tersebut dengan tenang sambil tetap menjelaskan materi, memberikan isyarat nonverbal untuk menyimpan gawai, lalu mengajaknya berdiskusi secara pribadi setelah kelas usai.' },
          { key: 'D', text: 'Langsung menulis surat pelanggaran disiplin untuk diserahkan ke Guru BK dan meminta siswa tersebut keluar dari ruang kelas.' },
          { key: 'E', text: 'Menyindir perilaku siswa tersebut lewat humor sarkas agar dia merasa malu dan secara sukarela menghentikan aktivitasnya.' }
        ],
        correctKey: 'C',
        explanation: {
          coreConcept: 'Pendekatan humanis dan manajemen kelas persuasif proaktif.',
          whyCorrect: 'Opsi C menunjukkan kompetensi kepribadian dan sosial yang matang. Pendidik mendekati siswa tanpa konfrontasi keras (menghargai martabat anak), menyetop gangguan menggunakan isyarat nonverbal agar KBM tetap kondusif, serta menyelesaikan akar masalah secara persuasif pasca-pembelajaran.',
          whyIncorrect: 'Opsi A merusak harga diri siswa dan berpotensi memicu defensif ekstrem. Opsi B merupakan pembiaran disiplin. Opsi D terlalu cepat melimpahkan masalah tanpa upaya intervensi guru mata pelajaran. Opsi E menggunakan sarkasme yang dilarang karena merusak relasi psikologis guru-murid.',
          pedagogicTip: 'Dalam soal SJT PPG, pilihlah jawaban yang mengedepankan pembinaan karakter, empati, penyelesaian masalah yang persuasif, tanpa mengorbankan waktu pembelajaran siswa lain.'
        },
        category: 'SJT',
        difficulty: 'HOTS',
        points: 20
      },
      {
        id: 'sjt-q2',
        text: 'Sekolah Anda menerima bantuan sarana komputer baru dari dinas pendidikan. Namun, kepala sekolah menetapkan kebijakan bahwa fasilitas tersebut hanya boleh digunakan oleh kelas unggulan agar komputer tidak cepat rusak. Rekan-rekan guru lain cenderung setuju karena tidak ingin repot mengawasi. Sikap Anda menghadapi hal ini adalah...',
        options: [
          { key: 'A', text: 'Menerima keputusan tersebut sepenuhnya demi menjaga keharmonisan hubungan kerja dengan kepala sekolah dan rekan sejawat.' },
          { key: 'B', text: 'Mengadakan forum diskusi informal dengan rekan guru untuk menyamakan persepsi tentang keadilan akses belajar, lalu bersama-sama mengusulkan jadwal giliran laboratorium komputer yang adil bagi seluruh kelas ke Kepala Sekolah.' },
          { key: 'C', text: 'Secara sembunyi-sembunyi membawa murid-murid non-unggulan menggunakan laboratorium komputer saat kepala sekolah sedang dinas luar.' },
          { key: 'D', text: 'Menulis kritik anonim mengenai diskriminasi sarana sekolah di media sosial agar mendapat perhatian dari pengawas sekolah.' },
          { key: 'E', text: 'Membiarkan aturan berjalan dan menyarankan siswa non-unggulan untuk membeli laptop pribadi atau pergi ke warnet untuk belajar komputer.' }
        ],
        correctKey: 'B',
        explanation: {
          coreConcept: 'Kompetensi Kepribadian & Kepemimpinan Pembelajaran yang Berkeadilan.',
          whyCorrect: 'Opsi B mencerminkan tindakan kolaboratif yang etis dan berorientasi pada keadilan belajar. Melalui diskusi persuasif, guru menggalang dukungan rekan sejawat dan memberikan solusi konkret berupa penjadwalan teratur untuk diajukan secara resmi.',
          whyIncorrect: 'Opsi A menunjukkan kepatuhan buta pada ketidakadilan. Opsi C melanggar integritas (sembunyi-sembunyi). Opsi D tidak profesional karena menggunakan jalur media sosial anonim. Opsi E bersikap apatis dan membebani finansial siswa.',
          pedagogicTip: 'Pilihlah jawaban yang mengutamakan musyawarah, diplomasi yang baik, kolaborasi antar-rekan kerja, serta menjunjung hak setara bagi seluruh peserta didik.'
        },
        category: 'SJT',
        difficulty: 'HOTS',
        points: 20
      },
      {
        id: 'sjt-q3',
        text: 'Seorang wali murid mendatangi Anda dengan marah-marah karena anaknya mendapatkan nilai rapor yang rendah untuk mata pelajaran Anda. Wali murid tersebut menuduh Anda tidak objektif dan membandingkan anaknya dengan keponakannya yang mendapat nilai tinggi di kelas sebelah. Tindakan Anda adalah...',
        options: [
          { key: 'A', text: 'Membalas argumen wali murid tersebut dengan nada tinggi agar mereka tahu bahwa keputusan guru tidak dapat diganggu gugat.' },
          { key: 'B', text: 'Menolak menemui wali murid dan langsung mengarahkan mereka untuk berbicara langsung dengan kepala sekolah.' },
          { key: 'C', text: 'Mendengarkan keluh kesah wali murid dengan sabar dan tenang, kemudian menyajikan data dokumentasi nilai (tugas, ulangan, portofolio) siswa secara transparan beserta rubrik penilaiannya.' },
          { key: 'D', text: 'Mengubah nilai siswa tersebut demi menghindari konflik berkepanjangan dan menjaga nama baik Anda di mata wali murid.' },
          { key: 'E', text: 'Menjelaskan kelemahan-kelemahan perilaku dan kekurangan siswa tersebut secara detail di depan umum agar orang tua menyadari kesalahannya.' }
        ],
        correctKey: 'C',
        explanation: {
          coreConcept: 'Kompetensi Sosial (Komunikasi Efektif & Transparansi Akuntabilitas Penilaian).',
          whyCorrect: 'Opsi C menempatkan guru sebagai profesional yang sabar sekaligus akuntabel. Dengan menyajikan bukti-bukti otentik (portofolio, rubrik penilaian), guru menunjukkan objektifitas penilaian secara ilmiah dan meredakan emosi wali murid lewat fakta transparan.',
          whyIncorrect: 'Opsi A tidak profesional dan memperkeruh konflik. Opsi B merupakan bentuk lari dari tanggung jawab guru mata pelajaran. Opsi D melanggar kode etik integritas penilaian. Opsi E mempermalukan anak dan orang tua.',
          pedagogicTip: 'Pendidik harus mampu mempertanggungjawabkan hasil belajar secara otentik dan komunikatif tanpa terpengaruh tekanan subjektif eksternal.'
        },
        category: 'SJT',
        difficulty: 'MOTS',
        points: 20
      },
      {
        id: 'sjt-q4',
        text: 'Ketika Anda sedang mengoreksi ujian semester, Anda menemukan salah satu lembar jawaban milik anak pejabat daerah setempat yang selalu mendukung pendanaan sekolah. Jawaban siswa tersebut hampir semuanya salah, namun jika tidak diluluskan, ada kekhawatiran hubungan baik sekolah dengan pejabat tersebut akan renggang. Tindakan Anda adalah...',
        options: [
          { key: 'A', text: 'Tetap memberikan nilai apa adanya sesuai hasil ujian objektif, lalu menyusun program remedial (perbaikan) bagi siswa tersebut sesuai prosedur baku.' },
          { key: 'B', text: 'Memberikan nilai batas lulus (KKM) langsung pada rapornya untuk mengamankan posisi donasi sekolah.' },
          { key: 'C', text: 'Mengkonsultasikan hal ini ke Kepala Sekolah dan bersiap mengikuti arahannya untuk mendongkrak nilai anak tersebut.' },
          { key: 'D', text: 'Membocorkan lembar ujian remedial kepada siswa tersebut agar ia bisa mendapatkan nilai maksimal dengan mudah saat ujian ulang.' },
          { key: 'E', text: 'Menyuruh siswa lain yang pintar untuk menulis ulang jawaban di lembar kertas milik anak pejabat tersebut demi kebaikan sekolah.' }
        ],
        correctKey: 'A',
        explanation: {
          coreConcept: 'Integritas Moral & Profesionalisme Evaluasi Hasil Belajar.',
          whyCorrect: 'Opsi A menunjukkan integritas moral yang kokoh sebagai pendidik. Nilai harus objektif berdasarkan capaian kompetensi sesungguhnya. Jika tidak tuntas, solusi pedagogisnya adalah program remedial resmi, bukan manipulasi nilai.',
          whyIncorrect: 'Opsi B, D, dan E adalah tindakan koruptif/kolusif yang melanggar integritas akademis. Opsi C menunjukkan kurangnya pendirian guru dalam menegakkan keadilan objektif.',
          pedagogicTip: 'Prinsip objektivitas, kemandirian profesi, dan akuntabilitas moral adalah pilar utama guru profesional dalam proses evaluasi.'
        },
        category: 'SJT',
        difficulty: 'HOTS',
        points: 20
      },
      {
        id: 'sjt-q5',
        text: 'Anda ditunjuk memimpin sebuah tim kerja guru untuk merancang kurikulum sekolah yang baru. Namun, dalam tim tersebut terdapat seorang guru senior yang sangat disegani namun sulit menerima teknologi baru, padahal kurikulum ini menuntut digitalisasi konten. Bagaimana Anda menyikapinya?',
        options: [
          { key: 'A', text: 'Mengeluarkan guru senior tersebut dari tim agar tidak memperlambat kinerja penyusunan kurikulum.' },
          { key: 'B', text: 'Membagi tugas secara bijak dengan menugaskan rekan guru muda untuk membantu teknis digitalisasi, sementara guru senior difokuskan pada penyelarasan konten substansi pedagogis berdasarkan pengalaman luasnya.' },
          { key: 'C', text: 'Memaksa guru senior tersebut mengikuti pelatihan digital kilat secara mandiri dan mengancam melaporkannya ke dinas jika gagal.' },
          { key: 'D', text: 'Menyerahkan seluruh pekerjaan digitalisasi kepada guru senior tersebut agar dia termotivasi untuk belajar dengan terpaksa.' },
          { key: 'E', text: 'Mengikuti pola guru senior dengan membatalkan rencana digitalisasi kurikulum agar semua pihak merasa nyaman.' }
        ],
        correctKey: 'B',
        explanation: {
          coreConcept: 'Manajemen Tim, Kepemimpinan Kolaboratif & Penghargaan Senioritas Bermartabat.',
          whyCorrect: 'Opsi B merepresentasikan kepemimpinan yang inklusif dan kolaboratif. Guru senior dihargai kebijaksanaan dan pengalamannya pada ranah konseptual substansi, sementara kesenjangan digital diatasi melalui skema mentoring sebaya (peer tutoring) dari guru muda.',
          whyIncorrect: 'Opsi A menyingkirkan kontribusi berharga guru senior. Opsi C dan D bersifat koersif tanpa pendampingan yang humanis. Opsi E mengorbankan inovasi demi zona nyaman.',
          pedagogicTip: 'Sinergi antar-generasi guru di sekolah dicapai melalui kolaborasi saling melengkapi potensi, bukan dengan menyingkirkan atau membebani secara tidak proporsional.'
        },
        category: 'SJT',
        difficulty: 'MOTS',
        points: 20
      }
    ]
  },
  {
    id: 'ppg-pck-02',
    title: 'PCK (Pedagogical Content Knowledge) - Strategi Pembelajaran',
    description: 'Menguji kemampuan mengintegrasikan pemahaman materi ajar (Content) dengan metodologi pengajaran yang mendidik (Pedagogy) sesuai karakteristik siswa.',
    durationMinutes: 10,
    totalQuestions: 5,
    categories: ['PCK'],
    questions: [
      {
        id: 'pck-q1',
        text: 'Bu Ratih ingin mengajarkan konsep "Fotosintesis" kepada siswa kelas V SD. Berdasarkan analisis awal, banyak siswa mengalami miskonsepsi bahwa tumbuhan mendapatkan makanan "dari dalam tanah" seperti halnya hewan/manusia memakan makanan. Strategi pembelajaran PCK paling efektif untuk membongkar miskonsepsi ini adalah...',
        options: [
          { key: 'A', text: 'Meminta siswa menghafalkan definisi fotosintesis dari buku paket dan mengujinya lewat kuis tertulis di awal pelajaran.' },
          { key: 'B', text: 'Melakukan demonstrasi percobaan Sach atau Ingenhousz dengan menutup sebagian daun tanaman menggunakan kertas timah, diikuti analisis data di mana energi matahari dan karbon dioksida diolah menjadi karbohidrat di daun.' },
          { key: 'C', text: 'Menampilkan video animasi 3D tentang proses aliran nutrisi dari akar ke seluruh daun tanpa penjelasan interaktif.' },
          { key: 'D', text: 'Menyuruh siswa merangkum bab fotosintesis sebanyak 3 halaman dan mengumpulkannya lewat Google Classroom.' },
          { key: 'E', text: 'Menjelaskan secara ceramah satu arah selama 2 jam pelajaran penuh dengan menuliskan persamaan reaksi kimia fotosintesis di papan tulis.' }
        ],
        correctKey: 'B',
        explanation: {
          coreConcept: 'Pembongkaran Miskonsepsi (Conceptual Change) melalui Pembelajaran Inkuiri Ilmiah.',
          whyCorrect: 'Opsi B mengintegrasikan "Pedagogy" (eksperimen langsung / sains inkuiri) dengan "Content" (fotosintesis menghasilkan karbohidrat di daun, bukan ditarik dari tanah). Melalui bukti empiris percobaan Ingenhousz/Sach, siswa melihat langsung bahwa zat makanan (amilum) diproduksi di daun dengan bantuan sinar matahari, mematahkan miskonsepsi awal mereka.',
          whyIncorrect: 'Opsi A, D, dan E hanya melatih kognitif hafalan tingkat rendah (LOTS) tanpa menyentuh konflik kognitif untuk mengubah konsep salah. Opsi C baik, namun pembelajaran sains SD jauh lebih efektif dengan pembuktian eksperimen nyata dibanding sekadar menonton pasif.',
          pedagogicTip: 'Untuk membongkar miskonsepsi dalam PCK, pilih metode "Conceptual Change Model" yang menghadapkan siswa pada konflik kognitif melalui bukti empiris atau pemodelan konkret.'
        },
        category: 'PCK',
        difficulty: 'HOTS',
        points: 20
      },
      {
        id: 'pck-q2',
        text: 'Seorang guru matematika SMA ingin mengajarkan topik "Turunan Fungsi Aljabar" dengan pendekatan TPACK (Technological Pedagogical Content Knowledge). Langkah perancangan aktivitas pembelajaran yang mencerminkan TPACK secara utuh adalah...',
        options: [
          { key: 'A', text: 'Guru menggunakan proyektor LCD untuk menampilkan slide presentasi PowerPoint statis berisi rumus-rumus turunan.' },
          { key: 'B', text: 'Guru membagikan e-book kalkulus berformat PDF lewat grup WhatsApp untuk dibaca siswa secara mandiri di rumah.' },
          { key: 'C', text: 'Siswa memanfaatkan aplikasi GeoGebra secara interaktif untuk memanipulasi garis sekan hingga mendekati garis tangen pada suatu kurva, guna memvisualisasikan limit laju perubahan nilai fungsi secara dinamis.' },
          { key: 'D', text: 'Guru menulis soal latihan turunan di papan tulis, lalu meminta siswa memotret soal tersebut dengan smartphone masing-masing.' },
          { key: 'E', text: 'Siswa diminta menonton video pembahasan soal turunan di YouTube buatan kreator lain tanpa panduan lembar kerja.' }
        ],
        correctKey: 'C',
        explanation: {
          coreConcept: 'Integrasi Teknologi Pedagogis Aktif (TPACK) dalam Pembelajaran Matematika.',
          whyCorrect: 'Opsi C memadukan Teknologi (GeoGebra), Pedagogi (Penemuan terbimbing/ visualisasi dinamis), dan Konten (Definisi limit laju turunan). Aplikasi tidak hanya jadi alat pemapar materi, tetapi sebagai media eksplorasi mental kognitif siswa dalam menemukan konsep batas garis singgung.',
          whyIncorrect: 'Opsi A, B, D, dan E menempatkan teknologi hanya sebagai pengganti kertas/papan tulis (Substitusi pada SAMR model), bukan sebagai peningkat efektivitas kognisi (Redefinisi atau Modifikasi).',
          pedagogicTip: 'Penerapan TPACK yang matang mengharuskan teknologi bertindak sebagai "cognitive tool" yang membantu siswa mengeksplorasi, mensimulasikan, atau memecahkan masalah konseptual.'
        },
        category: 'PCK',
        difficulty: 'HOTS',
        points: 20
      },
      {
        id: 'pck-q3',
        text: 'Pak Budi menyadari bahwa siswa di kelasnya kesulitan menulis esai persuasif karena mereka bingung membedakan antara opini subjektif tanpa dasar dan argumen logis berbasis data empiris. Rancangan scaffolding yang paling tepat disiapkan oleh Pak Budi adalah...',
        options: [
          { key: 'A', text: 'Menghukum siswa yang menulis argumen subjektif dengan pengurangan nilai ujian secara drastis.' },
          { key: 'B', text: 'Menyediakan "Lembar Analisis Argumen" berisi panduan pertanyaan pemandu (e.g. "Mana klaim utama?", "Mana bukti pendukung?", "Apakah data ini valid?") dan contoh paragraf terstruktur sebagai cetak biru (blueprint) penulisan awal.' },
          { key: 'C', text: 'Mendiktekan esai contoh kata demi kata agar ditulis ulang oleh seluruh siswa di buku catatan.' },
          { key: 'D', text: 'Membebaskan siswa menulis apa saja tanpa intervensi, dengan keyakinan bahwa kemampuan menulis akan berkembang alami seiring waktu.' },
          { key: 'E', text: 'Meminta siswa membaca 10 artikel jurnal ilmiah berbahasa Inggris tanpa kamus penjelas.' }
        ],
        correctKey: 'B',
        explanation: {
          coreConcept: 'Scaffolding (Bantuan Terstruktur) dalam Zone of Proximal Development (ZPD).',
          whyCorrect: 'Opsi B memberikan bentuk scaffolding yang tepat. Lembar analisis dengan pertanyaan pemandu membantu menjembatani ketidakmampuan siswa (ZPD) dalam menstrukturkan pikiran kritisnya secara mandiri, yang secara bertahap dapat dikurangi jika siswa sudah mahir.',
          whyIncorrect: 'Opsi A bersifat punitif dan tidak membantu proses belajar. Opsi C adalah rote-learning pasif. Opsi D melalaikan peran guru sebagai fasilitator terarah. Opsi E melebihi batas kemampuan siswa (frustrasi).',
          pedagogicTip: 'Scaffolding harus berupa bantuan terencana, sementara, dan terstruktur yang menuntun siswa menyelesaikan tugas rumit selangkah demi selangkah.'
        },
        category: 'PCK',
        difficulty: 'MOTS',
        points: 20
      },
      {
        id: 'pck-q4',
        text: 'Dalam mengajarkan materi "Siklus Air" di SD, Ibu Aminah ingin menerapkan asesmen otentik (authentic assessment). Penilaian yang paling sesuai dengan prinsip asesmen otentik adalah...',
        options: [
          { key: 'A', text: 'Ujian pilihan ganda sebanyak 50 soal mengenai istilah-istilah ilmiah presipitasi, kondensasi, dan evaporasi.' },
          { key: 'B', text: 'Meminta siswa menggambar diagram siklus air di kertas karton persis seperti gambar yang ada di buku paket.' },
          { key: 'C', text: 'Siswa secara berkelompok membuat diorama siklus air menggunakan bahan daur ulang, mempresentasikan cara kerjanya, lalu mengaitkannya dengan fenomena banjir lokal di lingkungan tempat tinggal mereka menggunakan rubrik kinerja.' },
          { key: 'D', text: 'Tugas menulis rangkuman istilah geografi tentang air dari Wikipedia Indonesia.' },
          { key: 'E', text: 'Tes lisan menanyakan singkatan-singkatan siklus air di akhir pelajaran secara acak.' }
        ],
        correctKey: 'C',
        explanation: {
          coreConcept: 'Asesmen Otentik berbasis Kinerja Dunia Nyata (Performance Assessment).',
          whyCorrect: 'Opsi C menuntut performa nyata dan relevan dengan lingkungan siswa (menghubungkan siklus air dengan banjir lokal). Asesmen mencakup aspek produk (diorama), proses (presentasi), dan penalaran kritis kontekstual, dinilai menggunakan rubrik penilaian performa yang terukur.',
          whyIncorrect: 'Opsi A, D, dan E menguji hapalan (LOTS) bukan kemampuan transfer pengetahuan. Opsi B hanya melatih keterampilan menyalin gambar tanpa aplikasi konseptual mendalam.',
          pedagogicTip: 'Asesmen otentik menuntut murid menerapkan ilmu pengetahuan ke dalam situasi/konteks dunia nyata yang bermakna.'
        },
        category: 'PCK',
        difficulty: 'HOTS',
        points: 20
      },
      {
        id: 'pck-q5',
        text: 'Ketika mengajarkan materi sejarah Proklamasi Kemerdekaan Indonesia, Pak Tono menghadapi tantangan berupa siswa yang merasa bosan karena materi dirasa sekadar hafalan tanggal dan nama tokoh. Pendekatan pengajaran sejarah berbasis inkuiri sosial yang paling tepat dipilih oleh Pak Tono adalah...',
        options: [
          { key: 'A', text: 'Mengganti buku cetak lama dengan buku cetak yang lebih tebal dan lengkap fotonya.' },
          { key: 'B', text: 'Memutarkan film dokumenter proklamasi tanpa memberikan tugas tindak lanjut kognitif.' },
          { key: 'C', text: 'Menugaskan siswa melakukan simulasi "Sidang BPUPKI/PPKI" atau bermain peran (role-playing) merekonstruksi perbedaan pendapat golongan muda dan tua di Rengasdengklok, disusul refleksi nilai kompromi kebangsaan.' },
          { key: 'D', text: 'Membuat tabel waktu (timeline) raksasa di papan tulis dan menyuruh siswa menyalinnya berulang kali.' },
          { key: 'E', text: 'Membagikan lembar kerja berisi teka-teki silang (TTS) nama-nama pahlawan nasional.' }
        ],
        correctKey: 'C',
        explanation: {
          coreConcept: 'Inkuiri Sosial, Role-Playing, dan Pembelajaran Sejarah Empatik.',
          whyCorrect: 'Opsi C memicu keterlibatan emosional dan kognitif (historical empathy) siswa. Melalui permainan peran rekonstruksi peristiwa Rengasdengklok, siswa mendalami dinamika argumen tokoh sejarah dan menyerap nilai luhur bangsa secara aktif, bukan menghafal tanggal pasif.',
          whyIncorrect: 'Opsi A dan D memperkuat kesan sejarah sebagai hafalan teks membosankan. Opsi B memicu pasivitas audiovisual. Opsi E hanya melatih pengenalan nama di tingkat ingatan rendah.',
          pedagogicTip: 'Buatlah sejarah menjadi hidup dengan membawa siswa masuk ke dalam perspektif pelaku sejarah melalui metode berbasis inkuiri naratif, bermain peran, atau analisis sumber primer.'
        },
        category: 'PCK',
        difficulty: 'MOTS',
        points: 20
      }
    ]
  },
  {
    id: 'ppg-pedagogik-profesional-03',
    title: 'Pedagogik & Profesional - Teori Belajar & Kurikulum',
    description: 'Mengukur pemahaman teoretis mengenai psikologi perkembangan, teori belajar (Behaviorisme, Kognitivisme, Konstruktivisme), landasan kurikulum, serta analisis materi ajar esensial.',
    durationMinutes: 10,
    totalQuestions: 5,
    categories: ['Pedagogik', 'Profesional'],
    questions: [
      {
        id: 'ped-q1',
        text: 'Pak Anton memberikan pujian dan bintang penghargaan di papan prestasi setiap kali siswanya berhasil mengumpulkan tugas tepat waktu. Alhasil, siswa-siswa di kelas Pak Anton menjadi sangat rajin mengirimkan tugas demi mendapatkan bintang tersebut. Praktik pembelajaran Pak Anton didasarkan pada implementasi teori belajar...',
        options: [
          { key: 'A', text: 'Konstruktivisme (Piaget)' },
          { key: 'B', text: 'Humanistik (Carl Rogers)' },
          { key: 'C', text: 'Behaviorisme (B.F. Skinner / Operant Conditioning)' },
          { key: 'D', text: 'Kognitivisme (Bruner)' },
          { key: 'E', text: 'Sibernetik (Landa)' }
        ],
        correctKey: 'C',
        explanation: {
          coreConcept: 'Teori Belajar Behavioristik (Operant Conditioning - Positive Reinforcement).',
          whyCorrect: 'Opsi C sangat tepat. Pemberian pujian dan bintang merupakan wujud stimulus eksternal penguat positif (positive reinforcement) untuk meningkatkan frekuensi perilaku yang diinginkan (mengumpulkan tugas tepat waktu) sesuai teori Operant Conditioning dari Skinner.',
          whyIncorrect: 'Opsi A (Konstruktivisme) menekankan rekonstruksi pengetahuan internal siswa secara mandiri. Opsi B (Humanistik) berfokus pada aktualisasi diri dan kemandirian intrinsik emosional. Opsi D (Kognitivisme) menekankan proses berpikir internal, asimilasi, dan akomodasi. Opsi E (Sibernetik) menekankan pengolahan informasi sistemik.',
          pedagogicTip: 'Ingat ciri utama behaviorisme: perubahan perilaku yang dapat diamati secara lahiriah, dipicu oleh stimulus eksternal, penguatan (reinforcement), dan hukuman (punishment).'
        },
        category: 'Pedagogik',
        difficulty: 'LOTS',
        points: 20
      },
      {
        id: 'ped-q2',
        text: 'Dalam Kurikulum Merdeka, guru diarahkan untuk melaksanakan pembelajaran berdiferensiasi (differentiated instruction). Langkah pertama yang wajib dilaksanakan guru sebelum menyusun modul ajar berdiferensiasi adalah...',
        options: [
          { key: 'A', text: 'Membeli paket modul ajar instan yang dijual di platform marketplace guru.' },
          { key: 'B', text: 'Melakukan asesmen diagnostik (non-kognitif dan kognitif) untuk mengidentifikasi profil belajar, minat, dan kesiapan (readiness) belajar siswa.' },
          { key: 'C', text: 'Membagi kelas langsung menjadi kelompok pintar dan kelompok lambat berdasarkan rangking rapor semester lalu.' },
          { key: 'D', text: 'Menetapkan standar nilai KKM tunggal yang ketat bagi seluruh siswa tanpa terkecuali.' },
          { key: 'E', text: 'Menyusun ujian akhir semester terlebih dahulu sebelum materi diajarkan.' }
        ],
        correctKey: 'B',
        explanation: {
          coreConcept: 'Prinsip Pembelajaran Berdiferensiasi & Asesmen Diagnostik.',
          whyCorrect: 'Opsi B merupakan langkah awal mutlak. Pembelajaran berdiferensiasi (baik konten, proses, maupun produk) hanya bisa dirancang secara akurat jika guru telah memetakan kesiapan, minat, serta gaya kognitif (profil belajar) siswa melalui asesmen awal diagnostik formal maupun informal.',
          whyIncorrect: 'Opsi A melanggar orisinalitas keguruan. Opsi C menimbulkan pelabelan (labeling) diskriminatif yang bertentangan dengan inklusifitas Kurikulum Merdeka. Opsi D bertentangan dengan esensi diferensiasi. Opsi E tidak sejalan dengan backward design yang berpusat pada pemetaan karakteristik murid dahulu.',
          pedagogicTip: 'Asesmen diagnostik adalah pondasi utama dari pembelajaran berdiferensiasi. Tanpa asesmen awal, diferensiasi yang dirancang guru akan kehilangan arah sasaran.'
        },
        category: 'Pedagogik',
        difficulty: 'MOTS',
        points: 20
      },
      {
        id: 'ped-q3',
        text: 'Siswa kelas VI SD kesulitan membedakan konsep "Luas Permukaan" dan "Volume" bangun ruang kubus. Banyak yang mengira bahwa luas permukaan dihitung dengan mengalikan tiga rusuknya. Berdasarkan teori tahapan perkembangan kognitif Jean Piaget, media pembelajaran manipulatif terbaik yang dapat menjembatani penalaran siswa SD (tahap operasional konkret) adalah...',
        options: [
          { key: 'A', text: 'Menggunakan jaring-jaring kubus dari kertas karton yang dapat dibuka-tutup untuk menunjukkan total luas bidang sisi (permukaan), serta kubus satuan kayu untuk mengisi rongga dalam kubus guna memahami kapasitas ruang (volume).' },
          { key: 'B', text: 'Menuliskan rumus matematika L = 6s^2 dan V = s^3 sebanyak 10 kali di buku tulis.' },
          { key: 'C', text: 'Meminta siswa membayangkan ruangan kelas sebagai kubus imajiner tanpa alat peraga fisik.' },
          { key: 'D', text: 'Menampilkan persamaan turunan kalkulus integrasi volume di layar proyektor.' },
          { key: 'E', text: 'Memberikan ceramah audio menerangkan definisi dimensi panjang, lebar, dan tinggi kubus secara verbal.' }
        ],
        correctKey: 'A',
        explanation: {
          coreConcept: 'Teori Piaget (Tahap Operasional Konkret 7-11 tahun) & Media Manipulatif Matematika.',
          whyCorrect: 'Opsi A sangat sesuai dengan psikologi kognitif Piaget. Anak SD usia 7-11 tahun berada pada fase operasional konkret; mereka membutuhkan benda fisik/manipulatif (jaring-jaring nyata yang bisa dipegang, kubus satuan kayu) untuk mengabstraksikan konsep matematis abstrak seperti perbedaan area kulit luar dan volume isi.',
          whyIncorrect: 'Opsi B dan D menyajikan simbol abstrak matematis tingkat tinggi yang melampaui kapasitas berpikir operasional konkret. Opsi C menuntut abstraksi murni tanpa sokongan visual fisik. Opsi E bersifat auditori verbal yang kurang efektif dibanding taktil fisik.',
          pedagogicTip: 'Untuk siswa SD, selalu prioritaskan opsi jawaban yang menawarkan media pembelajaran taktil (bisa diraba), manipulatif, dan konkret, guna mengonstruksi pemahaman abstrak.'
        },
        category: 'Pedagogik',
        difficulty: 'HOTS',
        points: 20
      },
      {
        id: 'ped-q4',
        text: 'Seorang guru profesional harus merancang evaluasi yang memenuhi prinsip validitas. Manakah di antara skenario berikut yang mencerminkan pelaksanaan evaluasi pembelajaran yang memenuhi prinsip VALID?',
        options: [
          { key: 'A', text: 'Tujuan pembelajaran menghendaki siswa dapat "mempraktikkan teknik servis bawah bola voli", tetapi instrumen penilaian berupa ujian tertulis pilihan ganda mengenai sejarah bola voli.' },
          { key: 'B', text: 'Tujuan pembelajaran adalah "menganalisis struktur teks prosedur", dan instrumen penilaian berupa rubrik penilaian unjuk kerja analisis struktur teks prosedur pada artikel esai terpilih.' },
          { key: 'C', text: 'Guru memberikan soal fisika yang sangat sulit melampaui kurikulum agar tidak ada satu pun siswa yang mendapat nilai sempurna.' },
          { key: 'D', text: 'Menilai keterampilan membaca puisi siswa berdasarkan kerapihan pakaian seragam sekolah saat maju ke depan kelas.' },
          { key: 'E', text: 'Guru hanya menilai murid-murid yang sering tersenyum kepadanya di kelas.' }
        ],
        correctKey: 'B',
        explanation: {
          coreConcept: 'Prinsip Evaluasi Hasil Belajar (Validitas / Keselarasan Tujuan-Asesmen).',
          whyCorrect: 'Opsi B memenuhi prinsip validitas. Valid artinya alat ukur benar-benar menilai apa yang seharusnya dinilai (keselarasan penuh). Jika tujuan pembelajaran menuntut analisis struktur (ranah kognitif C4), maka instrumen penilaian rubrik analisis adalah alat ukur yang valid.',
          whyIncorrect: 'Opsi A tidak valid (keterampilan psikomotorik diuji secara kognitif teoretis). Opsi C mengabaikan prinsip validitas cakukum kurikulum (terlalu sulit/bias). Opsi D tidak valid karena mengukur seragam untuk kemampuan bersastra puisi. Opsi E merupakan subjektivitas ekstrim.',
          pedagogicTip: 'Kunci validitas asesmen: Rumusan Tujuan Pembelajaran (TP) harus selaras lurus dengan Instrumen/Teknis Penilaian yang digunakan.'
        },
        category: 'Pedagogik',
        difficulty: 'MOTS',
        points: 20
      },
      {
        id: 'ped-q5',
        text: 'Berdasarkan teori Taksonomi Bloom revisi (Anderson & Krathwohl), indikator pencapaian kompetensi (IPK) yang berada pada tingkatan kognitif Mencipta (C6) adalah...',
        options: [
          { key: 'A', text: 'Menyebutkan nama-nama organ penyusun sistem pencernaan manusia.' },
          { key: 'B', text: 'Menjelaskan perbedaan fungsi antara pembuluh nadi (arteri) dan pembuluh balik (vena).' },
          { key: 'C', text: 'Menghitung nilai rata-rata hasil penjualan mingguan menggunakan rumus statistika dasar.' },
          { key: 'D', text: 'Mendesain sebuah poster edukasi digital mengenai kampanye gaya hidup sehat guna mencegah diabetes remaja di lingkungan perkotaan.' },
          { key: 'E', text: 'Menilai keakuratan data statistik kemiskinan pada sebuah infografis artikel berita.' }
        ],
        correctKey: 'D',
        explanation: {
          coreConcept: 'Taksonomi Bloom Revisi (Tingkat Kognitif C1-C6 - KATA KERJA OPERASIONAL).',
          whyCorrect: 'Opsi D menggunakan kata kerja "Mendesain" yang termasuk dalam kategori tingkat tinggi Mencipta (C6). Kegiatan mendesain poster menuntut orisinalitas sintesis pengetahuan siswa menjadi sebuah produk baru.',
          whyIncorrect: 'Opsi A adalah Mengingat (C1). Opsi B adalah Memahami (C2). Opsi C adalah Menerapkan (C3). Opsi E adalah Mengevaluasi (C5).',
          pedagogicTip: 'C6 (Mencipta) ditandai dengan kata kerja operasional seperti: mendesain, merancang, merakit, mengonstruksi, membuat, mengarang, memformulasikan.'
        },
        category: 'Pedagogik',
        difficulty: 'LOTS',
        points: 20
      }
    ]
  }
];
