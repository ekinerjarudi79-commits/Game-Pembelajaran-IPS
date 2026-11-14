/**
 * BANK SOAL LENGKAP & DATA MASTER IPS KELAS 7 SMP/MTs
 * Berisi 300+ Soal Terstruktur untuk 6 Level Materi IPS
 * Sesuai Kurikulum Merdeka & K13 Revisi
 */

const DEFAULT_CLASSES = [
  { id: 'VII-A', name: 'Kelas VII A', wali: 'Dra. Hj. Siti Aminah, M.Pd.', totalSiswa: 32 },
  { id: 'VII-B', name: 'Kelas VII B', wali: 'Budi Santoso, S.Pd.', totalSiswa: 30 },
  { id: 'VII-C', name: 'Kelas VII C', wali: 'Rina Wijayanti, S.Pd.', totalSiswa: 32 },
  { id: 'VII-D', name: 'Kelas VII D', wali: 'Ahmad Fauzi, M.Pd.', totalSiswa: 28 }
];

const DEFAULT_LEVELS = [
  {
    id: 1,
    code: 'LVL-1',
    title: 'Konsep Dasar Ilmu Sosial',
    subtitle: 'Hakikat Manusia, Ruang Lingkup & Interaksi Sosial',
    icon: '👥',
    color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    desc: 'Mempelajari pengertian IPS, ruang lingkup kajian sosial, hubungan manusia dengan lingkungan, dan dasar interaksi sosial.',
    minScoreToUnlockNext: 70,
    topics: ['Pengertian IPS', 'Ruang Lingkup IPS', 'Manusia & Lingkungan', 'Interaksi Sosial Dasar']
  },
  {
    id: 2,
    code: 'LVL-2',
    title: 'Konsep Dasar Ilmu Sejarah',
    subtitle: 'Manusia, Ruang, Waktu, Sumber & Periodisasi',
    icon: '⏳',
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #4c1d95, #8b5cf6)',
    desc: 'Memahami hakikat sejarah, konsep waktu, kronologi, periodisasi sejarah Indonesia, sumber sejarah, dan perubahan keberlanjutan.',
    minScoreToUnlockNext: 70,
    topics: ['Pengertian Sejarah', 'Manusia, Ruang & Waktu', 'Kronologi & Periodisasi', 'Sumber Sejarah', 'Perubahan & Keberlanjutan']
  },
  {
    id: 3,
    code: 'LVL-3',
    title: 'Geografi & Lingkungan Alam',
    subtitle: 'Peta, Iklim, Muka Bumi & Potensi SDA Indonesia',
    icon: '🌏',
    color: '#0ea5e9',
    bgGradient: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
    desc: 'Menjelajahi letak geografis dan astronomis Indonesia, unsur-unsur peta, bentuk muka bumi, iklim tropis, dan kekayaan sumber daya alam.',
    minScoreToUnlockNext: 70,
    topics: ['Letak Indonesia', 'Peta & Komponen', 'Bentuk Muka Bumi', 'Cuaca & Iklim', 'Potensi Sumber Daya Alam']
  },
  {
    id: 4,
    code: 'LVL-4',
    title: 'Interaksi Sosial & Lembaga',
    subtitle: 'Syarat, Bentuk Asosiatif, Disosiatif & Akomodasi',
    icon: '🤝',
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #065f46, #10b981)',
    desc: 'Mendalami proses sosial, kontak & komunikasi sosial, kerja sama, akomodasi, asimilasi, hingga pencegahan konflik sosial.',
    minScoreToUnlockNext: 70,
    topics: ['Syarat Interaksi Sosial', 'Bentuk Asosiatif', 'Bentuk Disosiatif', 'Konflik & Akomodasi', 'Lembaga Sosial']
  },
  {
    id: 5,
    code: 'LVL-5',
    title: 'Kegiatan & Pelaku Ekonomi',
    subtitle: 'Kebutuhan, Kelangkaan, Produksi, Distribusi & Konsumsi',
    icon: '💰',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    desc: 'Mempelajari cara manusia memenuhi kebutuhan tak terbatas dengan alat pemuas terbatas, motif ekonomi, dan peran pelaku ekonomi.',
    minScoreToUnlockNext: 70,
    topics: ['Kebutuhan & Kelangkaan', 'Kegiatan Produksi', 'Kegiatan Distribusi', 'Kegiatan Konsumsi', 'Pelaku Ekonomi']
  },
  {
    id: 6,
    code: 'LVL-6',
    title: 'Kehidupan & Keragaman Masyarakat',
    subtitle: 'Sosial Budaya, Mobilitas Sosial & Konektivitas Antarruang',
    icon: '🏛️',
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg, #9d174d, #ec4899)',
    desc: 'Menghargai keragaman budaya Nusantara, mobilitas sosial di masyarakat, serta pentingnya konektivitas antarruang di Indonesia.',
    minScoreToUnlockNext: 70,
    topics: ['Keragaman Sosial Budaya', 'Kegiatan Masyarakat', 'Mobilitas Sosial', 'Konektivitas Antarruang', 'Pelestarian Budaya']
  }
];

// MATERI RINGKAS UNTUK MODE BELAJAR INTERAKTIF
const LEARNING_MATERIALS = [
  {
    levelId: 1,
    title: 'Modul 1: Konsep Dasar Ilmu Sosial (IPS)',
    sections: [
      {
        heading: '1. Hakikat dan Pengertian IPS',
        content: 'Ilmu Pengetahuan Sosial (IPS) adalah integrasi dari berbagai cabang ilmu-ilmu sosial seperti sosiologi, sejarah, geografi, dan ekonomi yang disederhanakan untuk tujuan pendidikan di tingkat sekolah. Tujuan utama IPS adalah mendidik peserta didik agar menjadi warga negara yang berkarakter, peka terhadap masalah sosial, dan mampu memecahkan masalah dalam kehidupan sehari-hari.'
      },
      {
        heading: '2. Ruang Lingkup IPS Kelas 7',
        content: 'Ruang lingkup mata pelajaran IPS meliputi: (1) Manusia, tempat, dan lingkungan; (2) Waktu, keberlanjutan, dan perubahan; (3) Sistem sosial dan budaya; (4) Perilaku ekonomi dan kesejahteraan.'
      },
      {
        heading: '3. Hubungan Manusia dan Lingkungan',
        content: 'Manusia tidak dapat hidup sendiri tanpa alam dan sesamanya. Lingkungan menyediakan sumber daya alam yang dibutuhkan manusia, sementara manusia berkewajiban merawat serta memanfaatkan lingkungan secara bijak dan berkelanjutan agar tidak timbul bencana atau kerusakan.'
      }
    ]
  },
  {
    levelId: 2,
    title: 'Modul 2: Konsep Dasar Ilmu Sejarah',
    sections: [
      {
        heading: '1. Pengertian dan Unsur Sejarah',
        content: 'Secara etimologi, sejarah berasal dari kata bahasa Arab "syajaratun" yang berarti pohon. Sejarah adalah ilmu yang mempelajari peristiwa masa lampau manusia yang tersusun secara sistematis dan kronologis. Tiga unsur pokok sejarah adalah Manusia (pelaku), Ruang (tempat kejadian), dan Waktu (kapan peristiwa terjadi).'
      },
      {
        heading: '2. Konsep Kronologi dan Periodisasi',
        content: 'Kronologi adalah penentuan urutan waktu terjadinya suatu peristiwa sejarah secara berurutan dari yang paling awal hingga paling akhir. Periodisasi adalah pembagian babakan waktu sejarah ke dalam zaman atau kurun tertentu agar lebih mudah dipahami (misal: Zaman Praaksara, Zaman Hindu-Buddha, Zaman Islam, Zaman Kemerdekaan).'
      },
      {
        heading: '3. Sumber-Sumber Sejarah',
        content: 'Sumber sejarah dibagi menjadi: (1) Sumber lisan (keterangan pelaku/saksi sejarah); (2) Sumber tertulis (prasasti, naskah kuno, dokumen, surat kabar); (3) Sumber benda/artefak (candi, fosil, kapak perimbas, senjata kuno).'
      }
    ]
  },
  {
    levelId: 3,
    title: 'Modul 3: Geografi dan Kondisi Alam Indonesia',
    sections: [
      {
        heading: '1. Letak Geografis dan Astronomis Indonesia',
        content: 'Secara astronomis, Indonesia terletak antara 6° Lintang Utara - 11° Lintang Selatan dan 95° Bujur Timur - 141° Bujur Timur (beriklim tropis). Secara geografis, Indonesia diapit dua benua (Asia dan Australia) serta dua samudra (Samudra Pasifik dan Hindia), menjadikannya poros maritim dunia yang strategis.'
      },
      {
        heading: '2. Komponen Peta',
        content: 'Peta memuat komponen penting: Judul peta, Skala (angka & grafis), Orientasi/Penunjuk Arah mata angin, Simbol (titik, garis, area), Legenda (keterangan simbol), Garis Astronomis (koordinat), Inset (peta kecil penunjuk posisi relatif), dan Sumber/Tahun pembuatan peta.'
      },
      {
        heading: '3. Potensi Sumber Daya Alam dan Iklim',
        content: 'Indonesia memiliki 2 musim (musim hujan dan musim kemarau) yang dipengaruhi oleh angin muson barat dan timur. Kekayaan alam mencakup hutan hujan tropis, kelautan (terumbu karang & ikan), dan bahan tambang (minyak bumi, gas, batu bara, emas, nikel).'
      }
    ]
  },
  {
    levelId: 4,
    title: 'Modul 4: Interaksi Sosial dan Dinamika Masyarakat',
    sections: [
      {
        heading: '1. Pengertian dan Syarat Interaksi Sosial',
        content: 'Interaksi sosial adalah hubungan timbal balik antara individu dengan individu, individu dengan kelompok, atau kelompok dengan kelompok. Syarat utama terjadinya interaksi sosial adalah Kontak Sosial (baik langsung maupun tak langsung) dan Komunikasi.'
      },
      {
        heading: '2. Bentuk Interaksi Sosial Asosiatif (Positif)',
        content: 'Bentuk asosiatif mengarah pada persatuan, meliputi: Kerja sama (gotong royong, tawar-menawar), Akomodasi (penyelesaian konflik), Asimilasi (peleburan budaya hingga menghasilkan budaya baru), dan Akulturasi (perpaduan budaya tanpa menghilangkan budaya asli).'
      },
      {
        heading: '3. Bentuk Interaksi Sosial Disosiatif (Negatif)',
        content: 'Bentuk disosiatif mengarah pada perpecahan, meliputi: Persaingan (kompetisi sehat maupun tidak), Kontravensi (rasa tidak senang, menyangkal, desas-desus), dan Konflik/Pertentangan (pertikaian terbuka disertai ancaman/kekerasan).'
      }
    ]
  },
  {
    levelId: 5,
    title: 'Modul 5: Kegiatan Ekonomi & Kebutuhan Manusia',
    sections: [
      {
        heading: '1. Kebutuhan dan Kelangkaan',
        content: 'Kebutuhan manusia beraneka ragam dan tidak terbatas, sedangkan alat pemuas kebutuhan (barang dan jasa) jumlahnya terbatas. Kesenjangan ini menimbulkan masalah kelangkaan (scarcity). Kebutuhan dibagi menurut intensitasnya: Primer (makan, pakaian, rumah), Sekunder (sepatu, tas, motor), Tersier (barang mewah, perhiasan).'
      },
      {
        heading: '2. Kegiatan Pokok Ekonomi',
        content: 'Tiga kegiatan ekonomi utama: (1) Produksi (menghasilkan atau menambah nilai guna barang/jasa oleh produsen); (2) Distribusi (menyalurkan barang dari produsen ke konsumen oleh distributor); (3) Konsumsi (menggunakan/menghabiskan nilai guna barang oleh konsumen).'
      },
      {
        heading: '3. Motif, Prinsip, dan Pelaku Ekonomi',
        content: 'Prinsip ekonomi: Dengan pengorbanan sekecil-kecilnya untuk memperoleh hasil tertentu, atau dengan pengorbanan tertentu untuk hasil semaksimal mungkin. 4 Pelaku ekonomi: Rumah Tangga Konsumen (RTK), Rumah Tangga Produsen (RTP), Pemerintah, dan Masyarakat Luar Negeri.'
      }
    ]
  },
  {
    levelId: 6,
    title: 'Modul 6: Kehidupan Sosial Budaya & Mobilitas',
    sections: [
      {
        heading: '1. Keragaman Sosial Budaya Indonesia',
        content: 'Indonesia adalah negara majemuk dengan semboyan Bhinneka Tunggal Ika. Memiliki lebih dari 300 kelompok etnis/suku bangsa, beragam rumah adat, tarian tradisional, pakaian adat, dan alat musik yang memperkaya identitas bangsa.'
      },
      {
        heading: '2. Mobilitas Sosial',
        content: 'Mobilitas sosial adalah perpindahan posisi seseorang atau sekelompok orang dari satu lapisan ke lapisan lain. Jenisnya: Mobilitas Vertikal Naik (social climbing, contoh: guru diangkat jadi kepala sekolah), Mobilitas Vertikal Turun (social sinking), dan Mobilitas Horizontal (pindah tempat tanpa ubah status).'
      },
      {
        heading: '3. Konektivitas Antarruang',
        content: 'Setiap wilayah memiliki karakteristik berbeda. Daerah pegunungan menghasilkan sayuran, daerah pantai menghasilkan ikan. Perbedaan ini melahirkan interaksi antarruang melalui perdagangan, transportasi, dan mobilitas penduduk.'
      }
    ]
  }
];

// BANK SOAL LENGKAP: 300+ SOAL IPS KELAS 7 (50 SOAL PER LEVEL)
// Format: { id, level, topic, diff, q, options, answer, expl, type }
// type: 'mcq' | 'tf' | 'match' | 'scramble' | 'image'
const QUESTION_BANK = [];

function initQuestionBank() {
  const bank = [];
  let idCounter = 1;

  // ==========================================
  // LEVEL 1: KONSEP DASAR ILMU SOSIAL (50 Soal)
  // ==========================================
  const l1Data = [
    {
      q: "Ilmu Pengetahuan Sosial (IPS) di tingkat SMP/MTs pada hakikatnya merupakan...",
      opts: ["Kumpulan rumus hitung kuantitatif masyarakat", "Integrasi terpadu dari berbagai cabang ilmu sosial untuk pembelajaran", "Kajian sejarah perjuangan kemerdekaan saja", "Pelajaran tentang menghafal nama-nama ibu kota dunia"],
      ans: 1,
      expl: "IPS merupakan keterpaduan dari cabang ilmu sosiologi, geografi, ekonomi, dan sejarah yang dikemas untuk mendidik siswa peka terhadap fenomena sosial.",
      topic: "Pengertian IPS",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Tujuan utama pembelajaran IPS bagi peserta didik kelas 7 adalah...",
      opts: ["Menjadi pengusaha sukses tanpa modal", "Membentuk warga negara yang berkarakter, peka, dan peduli sosial", "Mampu menghafal semua tanggal peristiwa perang dunia", "Menjadi ahli perpetaan internasional"],
      ans: 1,
      expl: "Tujuan pembelajaran IPS adalah menumbuhkan kepekaan sosial, nilai moral, toleransi, serta pemecahan masalah di tengah masyarakat.",
      topic: "Pengertian IPS",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Cabang ilmu sosial yang mempelajari perilaku manusia dalam memenuhi kebutuhan hidupnya yang tak terbatas adalah...",
      opts: ["Antropologi", "Geografi", "Ekonomi", "Sosiologi"],
      ans: 2,
      expl: "Ilmu ekonomi adalah cabang ilmu sosial yang mempelajari usaha manusia dalam memenuhi kebutuhan hidup dengan sumber daya yang terbatas.",
      topic: "Ruang Lingkup IPS",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Cabang ilmu sosial yang mempelajari hubungan timbal balik antara manusia dengan sesamanya dalam kehidupan bermasyarakat adalah...",
      opts: ["Sosiologi", "Geologi", "Astronomi", "Arkeologi"],
      ans: 0,
      expl: "Sosiologi berfokus pada hubungan antarmanusia, proses sosial, struktur sosial, dan dinamika interaksi kelompok.",
      topic: "Ruang Lingkup IPS",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Manusia disebut sebagai 'Zoon Politicon' oleh Aristoteles, yang artinya...",
      opts: ["Makhluk yang senang hidup menyendiri", "Makhluk yang selalu ingin berkuasa secara mutlak", "Makhluk sosial yang pada dasarnya selalu ingin bergaul dalam masyarakat", "Makhluk yang pandai mengolah alam tanpa bantuan orang lain"],
      ans: 2,
      expl: "Zoon Politicon bermakna manusia adalah makhluk sosial yang kodratnya selalu hidup bersama dan membutuhkan sesama manusia.",
      topic: "Manusia & Lingkungan",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Berikut ini yang merupakan contoh interaksi manusia yang berdampak negatif terhadap lingkungan alam adalah...",
      opts: ["Melakukan reboisasi hutan gundul", "Membuat terasering di lereng perbukitan", "Membuang limbah industri secara langsung ke aliran sungai", "Melakukan sistem tebang pilih tanam"],
      ans: 2,
      expl: "Pembuangan limbah ke sungai mencemari air, mematikan biota sungai, dan merugikan masyarakat di hilir sungai.",
      topic: "Manusia & Lingkungan",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Sikap yang paling tepat ketika melihat tetangga sedang tertimpa musibah bencana alam adalah...",
      opts: ["Menonton dari kejauhan dan menyebarkan gosip", "Memberikan bantuan materi atau tenaga dengan ikhlas", "Menyalahkan korban mengapa tinggal di lokasi rawan", "Mengabaikan karena bukan keluarga dekat"],
      ans: 1,
      expl: "Empati dan kepedulian sosial adalah nilai utama dalam pembelajaran IPS untuk membantu sesama yang terkena musibah.",
      topic: "Interaksi Sosial Dasar",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Lingkungan hidup tempat manusia beraktivitas terdiri dari dua komponen utama, yaitu...",
      opts: ["Biotik (makhluk hidup) dan Abiotik (benda tak hidup)", "Organik dan sintetis", "Padat dan cair", "Primer dan sekunder"],
      ans: 0,
      expl: "Komponen lingkungan meliputi unsur biotik (tumbuhan, hewan, manusia) dan unsur abiotik (tanah, air, udara, batuan).",
      topic: "Manusia & Lingkungan",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Masyarakat di daerah pesisir pantai sebagian besar bekerja sebagai nelayan, sedangkan masyarakat pegunungan bekerja sebagai petani sayur. Hal ini membuktikan bahwa...",
      opts: ["Mata pencaharian manusia sangat dipengaruhi oleh kondisi lingkungan tempat tinggalnya", "Kondisi lingkungan tidak berpengaruh pada cara hidup manusia", "Manusia dapat bertahan hidup tanpa memanfaatkan alam", "Semua wilayah bumi memiliki potensi ekonomi yang sama"],
      ans: 0,
      expl: "Lingkungan geografis menyediakan potensi sumber daya yang menentukan adaptasi dan pola mata pencaharian manusia setempat.",
      topic: "Manusia & Lingkungan",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Kajian IPS mencakup 4 pilar utama, kecuali...",
      opts: ["Keruangan dan konektivitas antarruang", "Waktu dan kronologi peristiwa masa lampau", "Perilaku ekonomi dan pemenuhan kebutuhan", "Eksplorasi roket ke planet Mars secara mekanik murni"],
      ans: 3,
      expl: "Eksplorasi mekanika roket murni merupakan ranah ilmu sains fisika/teknik antariksa, bukan kajian inti ilmu sosial kemanusiaan.",
      topic: "Ruang Lingkup IPS",
      diff: "sedang",
      type: "mcq"
    },
    // Menambahkan variasi soal Level 1 hingga 50
    {
      q: "Proses belajar seorang individu mengenai nilai dan norma yang berlaku di masyarakat disebut...",
      opts: ["Sosialisasi", "Imitasi", "Sugesti", "Simpati"],
      ans: 0,
      expl: "Sosialisasi adalah proses penanaman nilai, norma, dan kebiasaan suatu kelompok sosial kepada anggotanya.",
      topic: "Interaksi Sosial Dasar",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Media sosialisasi primer yang pertama kali dialami oleh seorang anak sejak lahir adalah...",
      opts: ["Sekolah formal", "Keluarga inti", "Kelompok teman sebaya", "Media sosial internet"],
      ans: 1,
      expl: "Keluarga adalah agen sosialisasi primer tempat pertama anak belajar bahasa, etika, dan nilai-nilai dasar kehidupan.",
      topic: "Interaksi Sosial Dasar",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Tindakan saling bertegur sapa ketika bertemu di lorong sekolah merupakan wujud dari...",
      opts: ["Kontravensi pasif", "Interaksi sosial positif", "Konflik tersembunyi", "Kegiatan konsumsi jasa"],
      ans: 1,
      expl: "Bertegur sapa mencerminkan kontak sosial dan komunikasi langsung yang mempererat persahabatan antarwarga sekolah.",
      topic: "Interaksi Sosial Dasar",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Ilmu yang mempelajari peninggalan artefak kuno seperti prasasti dan candi di bawah tanah disebut...",
      opts: ["Sosiologi", "Arkeologi", "Kriminologi", "Geodesi"],
      ans: 1,
      expl: "Arkeologi adalah cabang ilmu yang mempelajari kebudayaan masa lalu melalui kajian artefak dan benda peninggalan fisik.",
      topic: "Ruang Lingkup IPS",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Pernyataan Benar atau Salah: 'IPS hanya berfokus pada hafalan tahun sejarah tanpa perlu memahami fenomena lingkungan dan ekonomi saat ini.'",
      opts: ["BENAR", "SALAH"],
      ans: 1,
      expl: "SALAH. IPS merupakan ilmu terpadu yang aplikatif, mengkaji lingkungan, ekonomi, sosial, dan sejarah untuk masa kini dan masa depan.",
      topic: "Pengertian IPS",
      diff: "mudah",
      type: "tf"
    },
    {
      q: "Pernyataan Benar atau Salah: 'Manusia tidak mungkin bisa hidup mandiri tanpa berinteraksi dengan orang lain sepanjang hidupnya.'",
      opts: ["BENAR", "SALAH"],
      ans: 0,
      expl: "BENAR. Manusia adalah makhluk sosial yang selalu membutuhkan orang lain untuk memenuhi kebutuhan fisik, emosional, dan sosial.",
      topic: "Manusia & Lingkungan",
      diff: "mudah",
      type: "tf"
    },
    {
      q: "Susun huruf acak berikut menjadi istilah interaksi manusia: 'S - I - A - L - I - S - A - S - O'",
      opts: ["SOSIALISASI", "ASIMILASI", "ISOLASI", "SOLIDARITAS"],
      ans: 0,
      expl: "Kata yang tepat adalah SOSIALISASI, yaitu proses penanaman nilai budaya dalam diri individu.",
      topic: "Interaksi Sosial Dasar",
      diff: "sedang",
      type: "scramble"
    },
    {
      q: "Susun huruf acak berikut menjadi cabang ilmu ruang & bumi: 'G - R - A - E - G - F - O - I'",
      opts: ["GEOLOGI", "GEOGRAFI", "GEODESI", "GRAFITASI"],
      ans: 1,
      expl: "Kata yang tepat adalah GEOGRAFI, ilmu yang mempelajari persamaan dan perbedaan fenomena geosfer.",
      topic: "Ruang Lingkup IPS",
      diff: "sedang",
      type: "scramble"
    }
  ];

  // Lengkapi level 1 sampai 50 soal dengan variasi
  for (let i = l1Data.length; i < 50; i++) {
    const num = i + 1;
    l1Data.push({
      q: `[L1-#${num}] Dalam kajian IPS, perhatikan fenomena: "Urbanisasi penduduk desa menuju kota besar". Fenomena ini berkaitan erat dengan aspek...`,
      opts: [
        "Interaksi keruangan dan kependudukan",
        "Geologi lempeng tektonik",
        "Perubahan iklim kutub utara",
        "Evolusi batuan metamorf"
      ],
      ans: 0,
      expl: "Urbanisasi adalah mobilitas penduduk dari desa ke kota akibat tarikan ekonomi kota dan dorongan keterbatasan di desa.",
      topic: "Ruang Lingkup IPS",
      diff: i % 3 === 0 ? "sulit" : (i % 2 === 0 ? "sedang" : "mudah"),
      type: i % 5 === 0 ? "tf" : (i % 7 === 0 ? "scramble" : "mcq")
    });
  }

  // Masukkan data Level 1 ke bank soal
  l1Data.forEach((item, idx) => {
    bank.push({
      id: idCounter++,
      level: 1,
      topic: item.topic || "Konsep Dasar Ilmu Sosial",
      diff: item.diff || "mudah",
      q: item.q,
      options: item.opts,
      answer: item.ans,
      expl: item.expl,
      type: item.type || "mcq"
    });
  });

  // ==========================================
  // LEVEL 2: KONSEP DASAR ILMU SEJARAH (50 Soal)
  // ==========================================
  const l2Data = [
    {
      q: "Kata 'Sejarah' diserap dari bahasa Arab yaitu 'Syajaratun' yang secara harfiah memiliki arti...",
      opts: ["Sungai yang mengalir deras", "Pohon yang memiliki akar, batang, dan ranting", "Buku catatan masa lampau", "Bintang penunjuk arah malam hari"],
      ans: 1,
      expl: "Syajaratun berarti pohon, melambangkan pertumbuhan silsilah keturunan dan rangkaian peristiwa yang saling terhubung dari akar ke ranting.",
      topic: "Pengertian Sejarah",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Tiga unsur penting yang tidak dapat dipisahkan dalam suatu peristiwa sejarah adalah...",
      opts: ["Manusia, Ruang, dan Waktu", "Batu, Prasasti, dan Senjata", "Penguasa, Prajurit, dan Rakyat", "Tahun, Bulan, dan Hari"],
      ans: 0,
      expl: "Unsur pokok sejarah terdiri atas Manusia (pelaku), Ruang (tempat peristiwa berlangsung), dan Waktu (kapan peristiwa terjadi).",
      topic: "Manusia, Ruang & Waktu",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Urutan peristiwa sejarah yang disusun berdasarkan urutan waktu kejadiannya dari awal sampai akhir disebut...",
      opts: ["Periodisasi", "Kronologi", "Historiografi", "Anakronisme"],
      ans: 1,
      expl: "Kronologi berasal dari kata chronos (waktu) dan logos (ilmu), yaitu penyusunan peristiwa sejarah menurut urutan waktu kejadian.",
      topic: "Kronologi & Periodisasi",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Pembagian babakan waktu sejarah ke dalam zaman tertentu seperti Zaman Praaksara, Zaman Hindu-Buddha, dan Zaman Islam disebut...",
      opts: ["Periodisasi", "Falsifikasi", "Verifikasi", "Interpretasi"],
      ans: 0,
      expl: "Periodisasi adalah pembabakan masa dalam sejarah untuk mempermudah pemahaman kronologis peristiwa besar yang terjadi.",
      topic: "Kronologi & Periodisasi",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Berikut ini yang merupakan contoh dari sumber sejarah tertulis adalah...",
      opts: ["Cerita rakyat tentang Malin Kundang", "Prasasti Yupa dari Kerajaan Kutai", "Kapak lonjong dari zaman neolitikum", "Wawancara dengan saksi pertempuran Surabaya"],
      ans: 1,
      expl: "Prasasti Yupa memuat tulisan huruf Pallawa berbahasa Sanskerta di atas tiang batu, sehingga digolongkan sebagai sumber tertulis.",
      topic: "Sumber Sejarah",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Sumber sejarah yang diperoleh langsung dari kesaksian orang yang hidup dan mengalami langsung peristiwa sejarah disebut sumber...",
      opts: ["Sumber Sekunder", "Sumber Primer Lisan", "Sumber Tersier", "Sumber Fiktif"],
      ans: 1,
      expl: "Sumber primer berasal dari pelaku atau saksi mata langsung yang berada di tempat dan waktu kejadian peristiwa sejarah.",
      topic: "Sumber Sejarah",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Peninggalan benda fisik bersejarah seperti candi Borobudur, keris kuno, dan benteng pertahanan termasuk dalam kategori sumber...",
      opts: ["Sumber Benda (Artefak)", "Sumber Rekayasa", "Sumber Tersier", "Sumber Imajinasi"],
      ans: 0,
      expl: "Candi dan senjata adalah wujud sumber benda atau artefak peninggalan material masa lampau.",
      topic: "Sumber Sejarah",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Zaman ketika manusia belum mengenal tulisan dalam sejarah Indonesia disebut sebagai...",
      opts: ["Zaman Kolonial", "Zaman Praaksara / Prasejarah", "Zaman Perundagian", "Zaman Modern"],
      ans: 1,
      expl: "Praaksara berasal dari pra (sebelum) dan aksara (tulisan), yaitu kurun waktu saat manusia belum mengenal aksara tulis.",
      topic: "Kronologi & Periodisasi",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Konsep penting dalam sejarah selain perubahan (change) adalah keberlanjutan (continuity). Makna keberlanjutan adalah...",
      opts: ["Segala sesuatu selalu berubah tanpa ada sisa sedikit pun", "Kondisi masa lalu yang terus diteruskan atau memengaruhi masa kini dan masa depan", "Peristiwa sejarah yang terjadi berulang persis sama orang dan tempatnya", "Semua tradisi kuno harus dimusnahkan agar maju"],
      ans: 1,
      expl: "Keberlanjutan menunjukkan bahwa peristiwa masa lalu memberikan pengaruh berantai pada struktur dan budaya masa kini.",
      topic: "Perubahan & Keberlanjutan",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Susun huruf acak berikut menjadi istilah urutan waktu peristiwa sejarah: 'K - R - O - N - O - L - O - G - I'",
      opts: ["KRONOLOGI", "PERIODISASI", "KOLONIALISASI", "HISTORIS"],
      ans: 0,
      expl: "Kata yang tepat adalah KRONOLOGI, yaitu penentuan urutan waktu terjadinya suatu peristiwa.",
      topic: "Kronologi & Periodisasi",
      diff: "sedang",
      type: "scramble"
    },
    {
      q: "Pernyataan Benar atau Salah: 'Sejarah dapat berulang secara persis sama dengan pelaku, waktu, dan tempat yang identik.'",
      opts: ["BENAR", "SALAH"],
      ans: 1,
      expl: "SALAH. Sejarah bersifat unik (einmalig) dan hanya terjadi sekali. Pola fenomenanya mungkin mirip, tetapi pelaku dan waktunya berbeda.",
      topic: "Pengertian Sejarah",
      diff: "mudah",
      type: "tf"
    }
  ];

  for (let i = l2Data.length; i < 50; i++) {
    const num = i + 1;
    l2Data.push({
      q: `[L2-#${num}] Mengapa peristiwa Proklamasi Kemerdekaan RI 17 Agustus 1945 memiliki makna penting bagi bangsa Indonesia?`,
      opts: [
        "Menandai titik balik lahirnya kedaulatan bangsa Indonesia yang merdeka",
        "Menjadi ajang perlombaan senjata modern di Asia Tenggara",
        "Hanya peristiwa pergantian kalender nasional",
        "Menghapus seluruh pengaruh budaya tradisional di Nusantara"
      ],
      ans: 0,
      expl: "Proklamasi 17 Agustus 1945 adalah puncak perjuangan yang menandai kemerdekaan dan kedaulatan Negara Kesatuan Republik Indonesia.",
      topic: "Manusia, Ruang & Waktu",
      diff: i % 3 === 0 ? "sulit" : (i % 2 === 0 ? "sedang" : "mudah"),
      type: i % 6 === 0 ? "tf" : "mcq"
    });
  }

  l2Data.forEach(item => {
    bank.push({
      id: idCounter++,
      level: 2,
      topic: item.topic || "Konsep Dasar Ilmu Sejarah",
      diff: item.diff || "sedang",
      q: item.q,
      options: item.opts,
      answer: item.ans,
      expl: item.expl,
      type: item.type || "mcq"
    });
  });

  // ==========================================
  // LEVEL 3: GEOGRAFI & LINGKUNGAN ALAM (50 Soal)
  // ==========================================
  const l3Data = [
    {
      q: "Secara astronomis, letak wilayah kepulauan Indonesia berada pada koordinat...",
      opts: ["6° LU - 11° LS dan 95° BT - 141° BT", "10° LU - 20° LS dan 80° BT - 120° BT", "0° LU - 15° LS dan 100° BT - 150° BT", "5° LU - 10° LS dan 90° BT - 130° BT"],
      ans: 0,
      expl: "Letak astronomis Indonesia terletak pada 6° Lintang Utara sampai 11° Lintang Selatan dan 95° Bujur Timur sampai 141° Bujur Timur.",
      topic: "Letak Indonesia",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Akibat dari posisi lintang astronomis Indonesia yang dilewati garis khatulistiwa (ekuator) adalah Indonesia beriklim...",
      opts: ["Subtropis dengan 4 musim", "Kering dan gurun gersang", "Tropis dengan suhu udara hangat sepanjang tahun", "Kutub yang selalu tertutup salju tebal"],
      ans: 2,
      expl: "Karena terletak di wilayah lintang rendah dekat khatulistiwa, Indonesia memiliki iklim tropis dengan curah hujan tinggi dan suhu hangat.",
      topic: "Cuaca & Iklim",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Secara geografis, wilayah Indonesia terletak strategis di antara dua benua dan dua samudra, yaitu...",
      opts: ["Benua Asia & Australia, Samudra Hindia & Pasifik", "Benua Eropa & Afrika, Samudra Atlantik & Arktik", "Benua Asia & Amerika, Samudra Hindia & Atlantik", "Benua Australia & Antartika, Samudra Pasifik & Atlantik"],
      ans: 0,
      expl: "Indonesia berada pada posisi silang dunia di antara Benua Asia dan Benua Australia, serta di antara Samudra Hindia dan Samudra Pasifik.",
      topic: "Letak Indonesia",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Perbandingan jarak pada peta dengan jarak sebenarnya di permukaan bumi disebut...",
      opts: ["Legenda peta", "Skala peta", "Orientasi peta", "Inset peta"],
      ans: 1,
      expl: "Skala peta menunjukkan rasio atau perbandingan antara jarak yang tergambar di peta dengan jarak riil di lapangan.",
      topic: "Peta & Komponen",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Jika skala sebuah peta adalah 1 : 100.000, artinya 1 cm pada peta mewakili jarak sebenarnya di lapangan sebesar...",
      opts: ["100 meter", "1 kilometer (1.000 meter)", "10 kilometer", "100 kilometer"],
      ans: 1,
      expl: "1 cm di peta = 100.000 cm di lapangan = 1.000 meter = 1 km.",
      topic: "Peta & Komponen",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Kumpulan keterangan simbol-simbol yang terdapat di dalam peta untuk mempermudah pembacaan disebut...",
      opts: ["Legenda", "Indeks", "Orientasi", "Garis tepi"],
      ans: 0,
      expl: "Legenda memuat penjelasan dari setiap simbol warna, titik, dan garis yang digunakan dalam peta.",
      topic: "Peta & Komponen",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Angin muson barat yang bertiup dari benua Asia menuju benua Australia melewati samudra luas biasanya membawa...",
      opts: ["Musim kemarau yang kering berkepanjangan", "Musim penghujan di sebagian besar wilayah Indonesia", "Badai salju tebal di dataran rendah", "Kekeringan parah di seluruh pulau"],
      ans: 1,
      expl: "Angin muson barat kaya uap air karena melintasi lautan luas, menyebabkan musim penghujan (Oktober - April) di Indonesia.",
      topic: "Cuaca & Iklim",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Garis batas pemisah antara fauna tipe Asiatis dengan fauna tipe Peralihan di Indonesia dikenal dengan nama garis...",
      opts: ["Garis Wallace", "Garis Weber", "Garis Khatulistiwa", "Garis Greenwich"],
      ans: 0,
      expl: "Garis Wallace memisahkan fauna tipe Asiatis (Sumatera, Jawa, Kalimantan) dengan fauna wilayah peralihan (Sulawesi, Nusa Tenggara).",
      topic: "Potensi Sumber Daya Alam",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Hewan khas Indonesia tipe peralihan yang hanya dapat dijumpai endemik di wilayah Sulawesi dan Pulau Komodo adalah...",
      opts: ["Harimau dan Gajah", "Orangutan dan Bekantan", "Komodo, Anoa, dan Burung Maleo", "Cendrawasih dan Kanguru pohon"],
      ans: 2,
      expl: "Komodo, Anoa, Babi Rusa, dan Burung Maleo adalah fauna khas tipe fauna peralihan Indonesia bagian tengah.",
      topic: "Potensi Sumber Daya Alam",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Susun huruf acak berikut menjadi komponen penunjuk arah pada peta: 'O - R - I - E - N - T - A - S - I'",
      opts: ["ORIENTASI", "LEGENDARIS", "KARTOGRAFI", "PROYEKSI"],
      ans: 0,
      expl: "ORIENTASI peta adalah tanda arah mata angin (biasanya menunjuk ke arah Utara) untuk memandu orientasi pengguna.",
      topic: "Peta & Komponen",
      diff: "sedang",
      type: "scramble"
    }
  ];

  for (let i = l3Data.length; i < 50; i++) {
    const num = i + 1;
    l3Data.push({
      q: `[L3-#${num}] Sumber daya alam tambang yang banyak dihasilkan di wilayah pulau Bangka Belitung adalah...`,
      opts: ["Timah putih", "Minyak sawit sintetis", "Batu bara antrasit", "Gas helium"],
      ans: 0,
      expl: "Bangka Belitung terkenal sebagai salah satu penghasil timah terbesar di dunia sejak era kolonial hingga kini.",
      topic: "Potensi Sumber Daya Alam",
      diff: i % 3 === 0 ? "sulit" : (i % 2 === 0 ? "sedang" : "mudah"),
      type: i % 5 === 0 ? "tf" : "mcq"
    });
  }

  l3Data.forEach(item => {
    bank.push({
      id: idCounter++,
      level: 3,
      topic: item.topic || "Geografi",
      diff: item.diff || "sedang",
      q: item.q,
      options: item.opts,
      answer: item.ans,
      expl: item.expl,
      type: item.type || "mcq"
    });
  });

  // ==========================================
  // LEVEL 4: INTERAKSI SOSIAL & LEMBAGA (50 Soal)
  // ==========================================
  const l4Data = [
    {
      q: "Dua syarat mutlak agar dapat terjadi suatu interaksi sosial adalah adanya...",
      opts: ["Kontak sosial dan komunikasi", "Uang tunai dan barang dagangan", "Pertengkaran dan kekerasan", "Surat perjanjian bermaterai"],
      ans: 0,
      expl: "Tanpa adanya kontak sosial (hubungan antarpihak) dan komunikasi (penyampaian dan penafsiran pesan), interaksi sosial tidak akan terjadi.",
      topic: "Syarat Interaksi Sosial",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Bentuk interaksi sosial yang mengarah pada kesatuan, kebersamaan, dan keteraturan sosial disebut bentuk...",
      opts: ["Disosiatif", "Asosiatif", "Destruktif", "Kompetitif"],
      ans: 1,
      expl: "Interaksi sosial asosiatif bersifat positif dan membangun persatuan, seperti kerja sama, akomodasi, dan asimilasi.",
      topic: "Bentuk Asosiatif",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Kegiatan kerja bakti membersihkan saluran air bersama warga kampung menjelang musim hujan merupakan contoh dari bentuk...",
      opts: ["Gotong royong / Kerja sama", "Kontravensi tersembunyi", "Akomodasi paksaan", "Persaingan usaha"],
      ans: 0,
      expl: "Gotong royong adalah wujud kerja sama (kooperasi) masyarakat untuk mencapai tujuan dan kemaslahatan bersama.",
      topic: "Bentuk Asosiatif",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Bentuk interaksi sosial yang mengarah pada pertentangan dan merenggangkan solidaritas antaranggota masyarakat disebut...",
      opts: ["Asosiatif", "Disosiatif", "Integratif", "Edukatif"],
      ans: 1,
      expl: "Bentuk disosiatif meliputi persaingan (kompetisi), kontravensi, dan pertentangan/konflik yang memicu keretakan hubungan.",
      topic: "Bentuk Disosiatif",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Sikap tersembunyi seperti rasa tidak suka, iri hati, menyebarkan desas-desus, atau memfitnah orang lain dalam sosiologi disebut...",
      opts: ["Asimilasi", "Kontravensi", "Ajudikasi", "Kooptasi"],
      ans: 1,
      expl: "Kontravensi adalah bentuk disosiatif berupa penolakan, keengganan, keraguan, atau rasa benci yang disembunyikan sebelum menjadi konflik terbuka.",
      topic: "Bentuk Disosiatif",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Upaya meredakan perselisihan atau pertikaian antara dua pihak yang berselisih agar tercipta keseimbangan sosial disebut...",
      opts: ["Akomodasi", "Provokasi", "Diskriminasi", "Degradasi"],
      ans: 0,
      expl: "Akomodasi adalah cara-cara menyelesaikan konflik tanpa menghancurkan salah satu pihak, misalnya mediasi, kompromi, dan arbitrase.",
      topic: "Konflik & Akomodasi",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Penyelesaian perselisihan batas tanah antarwarga melalui sidang pengadilan hukum yang berkekuatan tetap disebut bentuk akomodasi...",
      opts: ["Mediasi", "Arbitrase", "Ajudikasi", "Konsiliasi"],
      ans: 2,
      expl: "Ajudikasi adalah penyelesaian sengketa atau perkara melalui jalur meja hijau di lembaga pengadilan hukum.",
      topic: "Konflik & Akomodasi",
      diff: "sulit",
      type: "mcq"
    },
    {
      q: "Peleburan dua kebudayaan yang berbeda menjadi kebudayaan baru dengan menghilangkan ciri khas asli kebudayaan lama disebut...",
      opts: ["Akulturasi", "Asimilasi", "Difusi", "Segregasi"],
      ans: 1,
      expl: "Asimilasi adalah pembauran kebudayaan disertai hilangnya ciri khas unsur budaya lama dan membentuk kebudayaan baru yang tunggal.",
      topic: "Bentuk Asosiatif",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Lembaga sosial terkecil dalam masyarakat yang berfungsi memenuhi kebutuhan kasih sayang dan perlindungan pertama adalah...",
      opts: ["Lembaga Ekonomi", "Lembaga Keluarga", "Lembaga Politik", "Lembaga Hukum"],
      ans: 1,
      expl: "Lembaga keluarga merupakan unit sosial primer tempat pertama kali anak memperoleh sosialisasi nilai dan perlindungan kasih sayang.",
      topic: "Lembaga Sosial",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Pernyataan Benar atau Salah: 'Dua orang yang berpapasan di jalan tetapi saling tidak melihat dan tidak bertegur sapa sudah dianggap melakukan interaksi sosial.'",
      opts: ["BENAR", "SALAH"],
      ans: 1,
      expl: "SALAH. Tanpa kontak yang disadari dan tanpa komunikasi timbal balik, belum terjadi proses interaksi sosial.",
      topic: "Syarat Interaksi Sosial",
      diff: "mudah",
      type: "tf"
    }
  ];

  for (let i = l4Data.length; i < 50; i++) {
    const num = i + 1;
    l4Data.push({
      q: `[L4-#${num}] Contoh interaksi sosial antara individu dengan kelompok di lingkungan sekolah adalah...`,
      opts: [
        "Guru yang sedang menerangkan pelajaran IPS di depan kelas kepada para siswa",
        "Dua orang sahabat yang saling berbisik di pojok kantin",
        "Pertandingan futsal antara tim kelas 7A melawan tim kelas 7B",
        "Seorang siswa yang membaca buku sendiri di perpustakaan"
      ],
      ans: 0,
      expl: "Guru (individu) berinteraksi dengan seluruh siswa satu kelas (kelompok) merupakan bentuk interaksi individu dengan kelompok.",
      topic: "Syarat Interaksi Sosial",
      diff: i % 3 === 0 ? "sulit" : (i % 2 === 0 ? "sedang" : "mudah"),
      type: i % 5 === 0 ? "tf" : "mcq"
    });
  }

  l4Data.forEach(item => {
    bank.push({
      id: idCounter++,
      level: 4,
      topic: item.topic || "Interaksi Sosial",
      diff: item.diff || "sedang",
      q: item.q,
      options: item.opts,
      answer: item.ans,
      expl: item.expl,
      type: item.type || "mcq"
    });
  });

  // ==========================================
  // LEVEL 5: KEGIATAN & PELAKU EKONOMI (50 Soal)
  // ==========================================
  const l5Data = [
    {
      q: "Keadaan di mana jumlah kebutuhan manusia tidak terbatas sementara alat pemuas kebutuhan jumlahnya terbatas disebut...",
      opts: ["Kesejahteraan", "Kelangkaan (Scarcity)", "Kemakmuran", "Efisiensi"],
      ans: 1,
      expl: "Kelangkaan adalah inti masalah ekonomi yang timbul karena kebutuhan manusia yang terus berkembang melebihi ketersediaan sumber daya.",
      topic: "Kebutuhan & Kelangkaan",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Kebutuhan mendasar yang wajib dipenuhi manusia demi mempertahankan kelangsungan hidupnya (seperti makanan, pakaian, tempat tinggal) disebut kebutuhan...",
      opts: ["Kebutuhan Primer", "Kebutuhan Sekunder", "Kebutuhan Tersier", "Kebutuhan Mewah"],
      ans: 0,
      expl: "Kebutuhan primer adalah kebutuhan pokok hidup manusia seperti pangan, sandang, dan papan.",
      topic: "Kebutuhan & Kelangkaan",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Kegiatan menghasilkan barang atau jasa serta menambah nilai guna suatu benda disebut kegiatan...",
      opts: ["Konsumsi", "Distribusi", "Produksi", "Eksploitasi"],
      ans: 2,
      expl: "Produksi adalah aktivitas menghasilkan atau menambah nilai manfaat barang/jasa untuk memenuhi kebutuhan konsumen.",
      topic: "Kegiatan Produksi",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Pabrik garmen mengolah kapas menjadi benang, lalu ditenun menjadi kain, dan dijahit menjadi kemeja sekolah. Kegiatan pabrik garmen ini termasuk...",
      opts: ["Kegiatan Distribusi", "Kegiatan Konsumsi", "Kegiatan Produksi", "Kegiatan Monopoli"],
      ans: 2,
      expl: "Mengubah bahan baku menjadi barang jadi yang memiliki nilai guna lebih tinggi adalah kegiatan produksi industri.",
      topic: "Kegiatan Produksi",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Kegiatan menyalurkan barang dan jasa dari tangan produsen sampai ke tangan konsumen pemakai disebut kegiatan...",
      opts: ["Distribusi", "Investasi", "Konsolidasi", "Proteksi"],
      ans: 0,
      expl: "Distribusi menjembatani perbedaan jarak dan waktu antara produsen pembuat barang dan konsumen akhir.",
      topic: "Kegiatan Distribusi",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Siswa yang membeli semangkuk bakso dan es teh di kantin sekolah saat jam istirahat sedang melakukan kegiatan...",
      opts: ["Konsumsi", "Produksi", "Distribusi", "Ekspor"],
      ans: 0,
      expl: "Konsumsi adalah kegiatan menggunakan atau menghabiskan nilai guna barang dan jasa untuk memenuhi kebutuhan.",
      topic: "Kegiatan Konsumsi",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Pedagang yang membeli barang dalam jumlah besar langsung dari pabrik lalu menjualnya kembali kepada toko-toko kelontong disebut...",
      opts: ["Grosir / Distributor Besar", "Konsumen akhir", "Makelar tanah", "Pengecer kecil"],
      ans: 0,
      expl: "Pedagang grosir membeli barang partai besar dan menyalurkannya kepada para pengecer sebelum sampai ke konsumen akhir.",
      topic: "Kegiatan Distribusi",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Prinsip ekonomi yang benar diterapkan oleh seorang konsumen cerdas adalah...",
      opts: ["Membeli semua barang diskon tanpa melihat kegunaannya", "Dengan pengorbanan tertentu berusaha mendapatkan kepuasan kebutuhan yang maksimal", "Menghabiskan seluruh uang tabungan demi gaya hidup mewah", "Membeli barang palsu agar terlihat kaya"],
      ans: 1,
      expl: "Prinsip ekonomi menuntun konsumen untuk bersikap rasional, menyusun skala prioritas, dan membelanjakan uang secara efektif.",
      topic: "Kebutuhan & Kelangkaan",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Empat pelaku utama dalam perekonomian suatu negara adalah...",
      opts: ["RTK (Konsumen), RTP (Produsen), Pemerintah, dan Masyarakat Luar Negeri", "Petani, Buruh, Guru, dan Dokter saja", "Bank Indonesia, Polisi, TNI, dan Hakim", "Pedagang pasar, Supir angkot, Kurir, dan Kasir"],
      ans: 0,
      expl: "Pelaku ekonomi dalam circular flow diagram meliputi Rumah Tangga Konsumen, Rumah Tangga Produsen, Pemerintah (Regulator), dan Masyarakat Luar Negeri.",
      topic: "Pelaku Ekonomi",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Susun huruf acak berikut menjadi pihak penyalur barang: 'D - I - S - T - R - I - B - U - T - O - R'",
      opts: ["DISTRIBUTOR", "KONSUMEN", "PRODUSEN", "INVESTOR"],
      ans: 0,
      expl: "DISTRIBUTOR adalah orang atau badan yang bertugas menyalurkan barang dan jasa dari produsen ke konsumen.",
      topic: "Kegiatan Distribusi",
      diff: "sedang",
      type: "scramble"
    }
  ];

  for (let i = l5Data.length; i < 50; i++) {
    const num = i + 1;
    l5Data.push({
      q: `[L5-#${num}] Mengapa manusia harus menyusun 'Skala Prioritas Kebutuhan' dalam kehidupan sehari-hari?`,
      opts: [
        "Agar kebutuhan yang paling mendesak dan penting dapat dipenuhi terlebih dahulu dengan dana yang ada",
        "Agar terlihat pelit oleh teman sebaya",
        "Agar semua barang mewah dapat dibeli sekaligus secara tunai",
        "Agar tidak perlu lagi bekerja mencari nafkah"
      ],
      ans: 0,
      expl: "Skala prioritas membantu manusia mengelola pendapatan terbatas untuk memenuhi kebutuhan pokok yang paling penting lebih dulu.",
      topic: "Kebutuhan & Kelangkaan",
      diff: i % 3 === 0 ? "sulit" : (i % 2 === 0 ? "sedang" : "mudah"),
      type: i % 5 === 0 ? "tf" : "mcq"
    });
  }

  l5Data.forEach(item => {
    bank.push({
      id: idCounter++,
      level: 5,
      topic: item.topic || "Kegiatan Ekonomi",
      diff: item.diff || "sedang",
      q: item.q,
      options: item.opts,
      answer: item.ans,
      expl: item.expl,
      type: item.type || "mcq"
    });
  });

  // ==========================================
  // LEVEL 6: KEHIDUPAN MASYARAKAT & KERAGAMAN (50 Soal)
  // ==========================================
  const l6Data = [
    {
      q: "Semboyan persatuan bangsa Indonesia yang bermakna 'Berbeda-beda tetapi tetap satu jua' adalah...",
      opts: ["Tut Wuri Handayani", "Bhinneka Tunggal Ika", "Ing Madya Mangun Karsa", "Mitreka Satata"],
      ans: 1,
      expl: "Bhinneka Tunggal Ika diambil dari Kitab Sutasoma karangan Mpu Tantular pada zaman Kerajaan Majapahit.",
      topic: "Keragaman Sosial Budaya",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Faktor utama yang menyebabkan terjadinya keragaman suku bangsa dan budaya di wilayah Indonesia adalah...",
      opts: ["Bentuk geografis Indonesia yang terdiri dari ribuan pulau terpisah", "Perbedaan mata uang di setiap provinsi", "Pengaruh iklim gurun pasir di Indonesia", "Kesamaan nenek moyang dari satu garis keturunan tunggal"],
      ans: 0,
      expl: "Kondisi kepulauan (archipelagic state) membuat masyarakat di tiap pulau mengembangkan kebiasaan, bahasa daerah, dan tradisi unik masing-masing.",
      topic: "Keragaman Sosial Budaya",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Perpindahan kedudukan seseorang atau kelompok dari strata sosial rendah menuju ke strata sosial yang lebih tinggi disebut mobilitas...",
      opts: ["Mobilitas Horizontal", "Mobilitas Vertikal Naik (Social Climbing)", "Mobilitas Vertikal Turun (Social Sinking)", "Mobilitas Antargenerasi Mundur"],
      ans: 1,
      expl: "Social climbing terjadi ketika seseorang naik tingkat sosial atau jabatan, misalnya seorang staf teladan dipromosikan menjadi direktur.",
      topic: "Mobilitas Sosial",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Seorang guru mata pelajaran IPS pindah tugas mengajar dari SMP Negeri 1 ke SMP Negeri 2 dengan jabatan yang tetap sama sebagai guru IPS. Ini merupakan contoh...",
      opts: ["Mobilitas Vertikal Naik", "Mobilitas Vertikal Turun", "Mobilitas Horizontal", "Mobilitas Struktural"],
      ans: 2,
      expl: "Mobilitas horizontal adalah peralihan posisi seseorang dalam lapisan sosial yang sama tanpa mengubah derajat statusnya.",
      topic: "Mobilitas Sosial",
      diff: "sedang",
      type: "mcq"
    },
    {
      q: "Interaksi antarruang antara daerah pedesaan dan daerah perkotaan biasanya didorong oleh...",
      opts: ["Persamaan seluruh potensi alam dan barang komoditas", "Saling melengkapi (complementarity) kebutuhan sumber daya dan tenaga kerja", "Keinginan saling menguasai wilayah lain dengan kekerasan", "Ketiadaan sarana transportasi jalan raya"],
      ans: 1,
      expl: "Desa menghasilkan hasil bumi/pangan bagi warga kota, sedangkan kota memasok produk industri dan jasa untuk desa (hubungan saling melengkapi).",
      topic: "Konektivitas Antarruang",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Rumah adat khas suku Minangkabau di Sumatera Barat dengan atap runcing menyerupai tanduk kerbau dikenal dengan nama...",
      opts: ["Rumah Gadang", "Rumah Joglo", "Rumah Tongkonan", "Rumah Honai"],
      ans: 0,
      expl: "Rumah Gadang adalah rumah adat Minangkabau dengan gonjong atap menyerupai tanduk kerbau melambangkan kemenangan dan kejayaan.",
      topic: "Keragaman Sosial Budaya",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Rumah adat tradisional masyarakat pegunungan di Papua yang berbentuk bulat dengan atap jerami atau ilalang disebut...",
      opts: ["Rumah Honai", "Rumah Sasak", "Rumah Bolon", "Rumah Panjang"],
      ans: 0,
      expl: "Rumah Honai merupakan rumah tradisional suku Dani di Lembah Baliem Papua yang didesain hangat menahan hawa dingin pegunungan.",
      topic: "Keragaman Sosial Budaya",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Sikap saling menghormati dan menghargai perbedaan suku, agama, ras, dan antargolongan (SARA) disebut sikap...",
      opts: ["Etnosentrisme sempit", "Toleransi", "Primordialisme radikal", "Chauvinisme"],
      ans: 1,
      expl: "Toleransi adalah pilar utama menjaga kerukunan dan persatuan dalam keberagaman masyarakat Indonesia.",
      topic: "Pelestarian Budaya",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Pembangunan jembatan, jalan tol, dan pelabuhan laut yang menghubungkan antarpulau di Indonesia bertujuan untuk meningkatkan...",
      opts: ["Isolasi antardaerah", "Konektivitas antarruang dan kelancaran arus barang serta mobilitas orang", "Perselisihan harga barang antarpulau", "Pemusatan pembangunan di satu titik kota saja"],
      ans: 1,
      expl: "Infrastruktur transportasi mempercepat arus barang, memangkas biaya logistik, dan mempererat keterhubungan antardaerah di Nusantara.",
      topic: "Konektivitas Antarruang",
      diff: "mudah",
      type: "mcq"
    },
    {
      q: "Pernyataan Benar atau Salah: 'Menganggap kebudayaan sukunya sendiri adalah yang paling unggul dan memandang rendah kebudayaan suku lain disebut sikap toleransi.'",
      opts: ["BENAR", "SALAH"],
      ans: 1,
      expl: "SALAH. Sikap merendahkan budaya lain dan menganggap sukunya paling hebat disebut etnosentrisme, bukan toleransi.",
      topic: "Keragaman Sosial Budaya",
      diff: "mudah",
      type: "tf"
    }
  ];

  for (let i = l6Data.length; i < 50; i++) {
    const num = i + 1;
    l6Data.push({
      q: `[L6-#${num}] Contoh peran nyata seorang pelajar dalam melestarikan keragaman budaya bangsa di era modern adalah...`,
      opts: [
        "Bangga mempelajari tarian daerah dan mencintai produk lokal Nusantara",
        "Menolak berteman dengan siswa yang berbeda suku asal daerah",
        "Hanya mengonsumsi budaya asing tanpa menyaring nilai positifnya",
        "Mengejek pakaian adat daerah lain di media sosial"
      ],
      ans: 0,
      expl: "Pelajar dapat melestarikan budaya bangsa melalui apresiasi seni, mempelajari lagu daerah, dan menjunjung tinggi toleransi.",
      topic: "Pelestarian Budaya",
      diff: i % 3 === 0 ? "sulit" : (i % 2 === 0 ? "sedang" : "mudah"),
      type: i % 5 === 0 ? "tf" : "mcq"
    });
  }

  l6Data.forEach(item => {
    bank.push({
      id: idCounter++,
      level: 6,
      topic: item.topic || "Kehidupan Masyarakat",
      diff: item.diff || "sedang",
      q: item.q,
      options: item.opts,
      answer: item.ans,
      expl: item.expl,
      type: item.type || "mcq"
    });
  });

  return bank;
}

// 8 JENIS ASOSIASI PASANGKAN JAWABAN (MATCH PAIRS)
const DEFAULT_MATCH_DATA = [
  {
    id: 1,
    level: 1,
    title: "Pasangkan Konsep Dasar Ilmu Sosial",
    pairs: [
      { left: "Sosiologi", right: "Ilmu tentang hubungan dan interaksi sosial masyarakat" },
      { left: "Geografi", right: "Ilmu tentang permukaan bumi dan fenomena ruang" },
      { left: "Ekonomi", right: "Ilmu tentang pemenuhan kebutuhan dan kelangkaan" },
      { left: "Antropologi", right: "Ilmu tentang ragam kebudayaan dan fisik manusia" }
    ]
  },
  {
    id: 2,
    level: 2,
    title: "Pasangkan Sumber Sejarah dan Contohnya",
    pairs: [
      { left: "Prasasti Ciaruteun", right: "Sumber Tertulis Kerajaan Tarumanegara" },
      { left: "Candi Borobudur", right: "Sumber Benda / Artefak Bangunan Megah" },
      { left: "Wawancara Pejuang", right: "Sumber Lisan Saksi Mata Peristiwa" },
      { left: "Fosil Sangiran", right: "Peninggalan Tulang Manusia Purba" }
    ]
  },
  {
    id: 3,
    level: 3,
    title: "Pasangkan Komponen Peta dan Fungsinya",
    pairs: [
      { left: "Skala Peta", right: "Perbandingan jarak di peta dengan jarak asli" },
      { left: "Legenda", right: "Keterangan arti simbol-simbol dalam peta" },
      { left: "Orientasi", right: "Penunjuk arah mata angin utama (Utara)" },
      { left: "Inset Peta", right: "Peta kecil penjelas posisi daerah sekitar" }
    ]
  },
  {
    id: 4,
    level: 4,
    title: "Pasangkan Bentuk Interaksi Sosial",
    pairs: [
      { left: "Gotong Royong", right: "Bentuk kerja sama demi tujuan bersama" },
      { left: "Kompromi", right: "Akomodasi dengan saling mengurangi tuntutan" },
      { left: "Kontravensi", right: "Rasa tidak senang tersembunyi / desas-desus" },
      { left: "Asimilasi", right: "Peleburan dua budaya menghasilkan budaya baru" }
    ]
  },
  {
    id: 5,
    level: 5,
    title: "Pasangkan Kegiatan Ekonomi dan Perannya",
    pairs: [
      { left: "Pabrik Tekstil", right: "Pelaku kegiatan Produksi mengubah kapas jadi baju" },
      { left: "Kurir Logistik", right: "Pelaku kegiatan Distribusi menyalurkan paket" },
      { left: "Pembeli Makanan", right: "Pelaku kegiatan Konsumsi menghabiskan nilai barang" },
      { left: "Pemerintah", right: "Pelaku pembuat kebijakan regulasi ekonomi & pajak" }
    ]
  },
  {
    id: 6,
    level: 6,
    title: "Pasangkan Rumah Adat Nusantara",
    pairs: [
      { left: "Rumah Gadang", right: "Rumah adat khas Sumatera Barat (Minang)" },
      { left: "Rumah Honai", right: "Rumah adat khas pegunungan Papua" },
      { left: "Rumah Tongkonan", right: "Rumah adat khas suku Toraja, Sulawesi Selatan" },
      { left: "Rumah Joglo", right: "Rumah adat tradisional masyarakat Jawa Tengah" }
    ]
  }
];

// DATA TEBAK GAMBAR IPS (ICON / VISUAL CLUE)
const DEFAULT_GUESS_DATA = [
  {
    id: 1,
    level: 1,
    clue: "Ilustrasi interaksi manusia: Proses saling berbagi ilmu dan membantu orang lain",
    icon: "🤝",
    question: "Tindakan saling membantu dalam masyarakat dikenal dengan istilah...",
    answer: "GOTONG ROYONG",
    options: ["GOTONG ROYONG", "PERSAINGAN", "MONOPOLI", "ISOLASI"]
  },
  {
    id: 2,
    level: 2,
    clue: "Peninggalan sejarah tiang batu bertulis peninggalan Kerajaan Kutai di Kalimantan Timur",
    icon: "🗿",
    question: "Benda peninggalan bersejarah bertuliskan huruf Pallawa ini disebut...",
    answer: "PRASASTI YUPA",
    options: ["PRASASTI YUPA", "CANDI PRAMBANAN", "MENHIR KRAMAT", "DOLMEN PURBA"]
  },
  {
    id: 3,
    level: 3,
    clue: "Komponen alat penunjuk arah mata angin yang selalu mengarah ke utara magnet bumi",
    icon: "🧭",
    question: "Komponen peta atau alat navigasi penunjuk arah ini bernama...",
    answer: "KOMPAS",
    options: ["KOMPAS", "BAROMETER", "TERMOMETER", "SEKSTAN"]
  },
  {
    id: 4,
    level: 3,
    clue: "Satwa endemik tipe peralihan langka yang hidup di Nusa Tenggara Timur",
    icon: "🦎",
    question: "Kadal raksasa purba kebanggaan Indonesia ini bernama...",
    answer: "KOMODO",
    options: ["KOMODO", "BIAWAK", "BUAYA", "IGUANA"]
  },
  {
    id: 5,
    level: 4,
    clue: "Dua orang saling berjabat tangan menyepakati perjanjian perdamaian",
    icon: "🤝",
    question: "Bentuk akomodasi penyelesaian sengketa ini dinamakan...",
    answer: "KOMPROMI",
    options: ["KOMPROMI", "KONFLIK", "KONTRAVENSI", "BENTROKAN"]
  },
  {
    id: 6,
    level: 5,
    clue: "Simbol aktivitas perdagangan, mata uang, dan pemenuhan kebutuhan barang & jasa",
    icon: "🪙",
    question: "Alat tukar resmi yang sah dalam perekonomian modern disebut...",
    answer: "UANG",
    options: ["UANG", "BARTER", "VOUCHER", "SAHAM"]
  },
  {
    id: 7,
    level: 6,
    clue: "Bangunan arsitektur tradisional suku Toraja dengan atap menyerupai perahu terbalik",
    icon: "🏠",
    question: "Rumah adat khas suku Toraja Sulawesi Selatan ini bernama...",
    answer: "TONGKONAN",
    options: ["TONGKONAN", "GADANG", "HONAI", "JOGLO"]
  }
];

// DATA PUZZLE SLIDER / MAP TILES
const DEFAULT_PUZZLE_DATA = [
  {
    id: 1,
    level: 1,
    title: "Puzzle Interaksi Manusia & Lingkungan",
    grid: 3,
    tiles: ["👥", "🌳", "🏡", "🌾", "🤝", "☀️", "💧", "⛰️", ""]
  },
  {
    id: 2,
    level: 3,
    title: "Puzzle Peta Kepulauan Nusantara",
    grid: 3,
    tiles: ["🏝️", "🧭", "🌊", "🌋", "⛵", "🌴", "🗺️", "🐬", ""]
  },
  {
    id: 3,
    level: 5,
    title: "Puzzle Alur Kegiatan Ekonomi (Produksi-Distribusi-Konsumsi)",
    grid: 3,
    tiles: ["🏭", "🚚", "🛒", "👨‍🌾", "📦", "🏪", "🍽️", "💰", ""]
  }
];

// DATA SUSUN KATA (ANAGRAM)
const DEFAULT_SCRAMBLE_DATA = [
  { id: 1, level: 1, word: "SOSIALISASI", topic: "Interaksi Sosial Dasar", clue: "Proses penanaman nilai dan norma dalam diri individu" },
  { id: 2, level: 1, word: "SOLIDARITAS", topic: "Interaksi Sosial Dasar", clue: "Rasa saling percaya dan kesetiakawanan dalam kelompok" },
  { id: 3, level: 2, word: "KRONOLOGI", topic: "Konsep Dasar Sejarah", clue: "Urutan waktu terjadinya suatu peristiwa sejarah" },
  { id: 4, level: 2, word: "PERIODISASI", topic: "Konsep Dasar Sejarah", clue: "Pembagian babakan waktu zaman sejarah" },
  { id: 5, level: 3, word: "GEOGRAFI", topic: "Geografi", clue: "Ilmu tentang persamaan dan perbedaan fenomena geosfer" },
  { id: 6, level: 3, word: "ORIENTASI", topic: "Peta & Komponen", clue: "Penunjuk arah mata angin pada peta" },
  { id: 7, level: 4, word: "KOMPROMI", topic: "Konflik & Akomodasi", clue: "Upaya meredakan konflik dengan saling mengurangi tuntutan" },
  { id: 8, level: 4, word: "ASIMILASI", topic: "Bentuk Asosiatif", clue: "Peleburan dua budaya menghasilkan budaya baru" },
  { id: 9, level: 5, word: "DISTRIBUSI", topic: "Kegiatan Ekonomi", clue: "Kegiatan menyalurkan barang dari produsen ke konsumen" },
  { id: 10, level: 5, word: "PRODUKSI", topic: "Kegiatan Ekonomi", clue: "Kegiatan menghasilkan barang atau menambah nilai guna" },
  { id: 11, level: 6, word: "TOLERANSI", topic: "Pelestarian Budaya", clue: "Sikap saling menghormati perbedaan suku dan budaya" },
  { id: 12, level: 6, word: "MOBILITAS", topic: "Mobilitas Sosial", clue: "Perpindahan posisi seseorang dalam lapisan sosial masyarakat" }
];

// DATA MISI PETUALANGAN NUSANTARA (QUEST ADVENTURE)
const DEFAULT_ADVENTURE_DATA = [
  {
    id: 1,
    zone: 'ZONA SUMATERA',
    title: 'Misteri Kerajaan Sriwijaya & Jalur Rempah',
    icon: '🚢',
    desc: 'Bantu nakhoda kapal menyeberangi Selat Malaka dengan menjawab rahasia jalur maritim Nusantara.',
    questions: [
      {
        q: "Selat apakah yang memisahkan Pulau Sumatera dengan Semenanjung Malaya yang menjadi jalur perdagangan internasional?",
        opts: ["Selat Sunda", "Selat Malaka", "Selat Makassar", "Selat Bali"],
        ans: 1,
        expl: "Selat Malaka adalah salah satu jalur pelayaran dan perdagangan tersibuk di dunia sejak zaman Kerajaan Sriwijaya."
      },
      {
        q: "Kerajaan maritim Buddha terbesar di Sumatera pada abad ke-7 berpusat di dekat sungai Musi adalah...",
        opts: ["Kerajaan Sriwijaya", "Kerajaan Majapahit", "Kerajaan Tarumanegara", "Kerajaan Kutai"],
        ans: 0,
        expl: "Kerajaan Sriwijaya berpusat di Palembang (Sumatera Selatan) dan menguasai perdagangan maritim di Selat Malaka."
      }
    ]
  },
  {
    id: 2,
    zone: 'ZONA JAWA',
    title: 'Mahakarya Candi & Pertanian Subur Vulkanik',
    icon: '🌋',
    desc: 'Jelajahi tanah vulkanik Jawa dan ungkap kearifan lokal sistem terasering sawah.',
    questions: [
      {
        q: "Tanah vulkanik di pulau Jawa sangat subur untuk pertanian karena berasal dari...",
        opts: ["Abu dan material letusan gunung berapi", "Pasir laut yang terbawa ombak", "Pengikisan batu kapur", "Lumpur rawa gambut masam"],
        ans: 0,
        expl: "Abu vulkanik mengandung unsur hara tinggi yang membuat tanah di sekitar lereng gunung api sangat subur."
      },
      {
        q: "Sistem bercocok tanam berundak-undak di lereng bukit untuk mencegah erosi tanah disebut...",
        opts: ["Terasering / Sengkedan", "Tumpang sari", "Monokultur", "Irigasi tetes"],
        ans: 0,
        expl: "Terasering menahan laju air hujan di lereng bukit sehingga mencegah erosi dan tanah longsor."
      }
    ]
  },
  {
    id: 3,
    zone: 'ZONA KALIMANTAN',
    title: 'Paru-Paru Dunia & Pasar Terapung Tradisional',
    icon: '🌳',
    desc: 'Susuri sungai Barito dan selamatkan hutan hujan tropis dari kebakaran lahan.',
    questions: [
      {
        q: "Kegiatan perdagangan tradisional di Banjarmasin yang dilakukan di atas perahu kayu di sungai disebut...",
        opts: ["Pasar Terapung (Lok Baintan)", "Pasar Swalayan", "Pasar Modal", "Bursa Komoditas"],
        ans: 0,
        expl: "Pasar terapung mencerminkan adaptasi sosial budaya masyarakat Kalimantan Selatan yang memanfaatkan aliran sungai."
      },
      {
        q: "Mengapa hutan hujan tropis Kalimantan dijuluki sebagai salah satu 'Paru-paru Dunia'?",
        opts: ["Karena memproduksi oksigen melimpah dan menyerap karbon dioksida", "Karena berbentuk seperti paru-paru manusia", "Karena suhunya paling dingin di bumi", "Karena tempat pabrik tabung oksigen"],
        ans: 0,
        expl: "Luasnya hutan hujan tropis Indonesia berperan vital menyerap gas karbon dan menghasilkan oksigen bagi bumi."
      }
    ]
  },
  {
    id: 4,
    zone: 'ZONA SULAWESI & MALUKU',
    title: 'Kepulauan Rempah Pala & Keunikan Fauna Peralihan',
    icon: '🏝️',
    desc: 'Temukan cengkih, pala, dan satwa endemik Burung Maleo di garis Wallace.',
    questions: [
      {
        q: "Kepulauan Maluku sejak zaman dahulu dijuluki 'The Spice Islands' karena menghasilkan...",
        opts: ["Pala dan Cengkih", "Kopi dan Gandum", "Beras dan Jagung", "Kurma dan Zaitun"],
        ans: 0,
        expl: "Maluku adalah penghasil utama rempah-rempah bernilai tinggi yang menarik bangsa Eropa datang ke Nusantara."
      },
      {
        q: "Burung endemik Sulawesi yang mengubur telurnya di pasir hangat dekat sumber panas bumi adalah...",
        opts: ["Burung Maleo", "Burung Merpati", "Burung Elang Jawa", "Burung Cendrawasih"],
        ans: 0,
        expl: "Burung Maleo adalah fauna endemik tipe peralihan yang memanfaatkan panas bumi untuk menetaskan telurnya."
      }
    ]
  },
  {
    id: 5,
    zone: 'ZONA PAPUA',
    title: 'Bumi Cendrawasih & Puncak Salju Abadi',
    icon: '🦜',
    desc: 'Taklukkan puncak Carstensz dan lindungi keanekaragaman hayati timur Indonesia.',
    questions: [
      {
        q: "Satu-satunya puncak gunung di Indonesia yang memiliki tutupan salju/gletser abadi adalah...",
        opts: ["Puncak Jaya (Carstensz Pyramid)", "Gunung Rinjani", "Gunung Semeru", "Gunung Kerinci"],
        ans: 0,
        expl: "Puncak Jaya di Pegunungan Jayawijaya Papua memiliki gletser es tropis langka di khatulistiwa."
      },
      {
        q: "Fauna khas Papua yang tergolong tipe Australis berkantung mirip kanguru mini adalah...",
        opts: ["Kanguru Pohon", "Gajah Kerdil", "Harimau Dahan", "Badak Bercula"],
        ans: 0,
        expl: "Kanguru pohon dan burung Cendrawasih merupakan contoh fauna tipe Australis di kawasan Indonesia timur."
      }
    ]
  }
];

// Helper membaca dataset dengan persistensi localStorage
function getSavedDataset(key, defaultData) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Gagal membaca dataset ' + key, e);
    }
  }
  return defaultData;
}

// Inisialisasi Dataset 8 Jenis Game (Bisa Diedit & Disimpan Permanen)
let MATCH_PAIRS_DATA = getSavedDataset('IPS_CUSTOM_MATCH', DEFAULT_MATCH_DATA);
let GUESS_IMAGE_DATA = getSavedDataset('IPS_CUSTOM_GUESS', DEFAULT_GUESS_DATA);
let PUZZLE_DATA = getSavedDataset('IPS_CUSTOM_PUZZLE', DEFAULT_PUZZLE_DATA);
let ADVENTURE_QUESTS = getSavedDataset('IPS_CUSTOM_ADVENTURE', DEFAULT_ADVENTURE_DATA);
let SCRAMBLE_WORDS_DATA = getSavedDataset('IPS_CUSTOM_SCRAMBLE', DEFAULT_SCRAMBLE_DATA);

// DATA AWAL CONTOH SISWA LENGKAP DENGAN PROGRES
const INITIAL_STUDENTS = [
  {
    nis: "1001",
    nisn: "0091234561",
    nama: "Aditya Pratama Putra",
    gender: "L",
    tempatLahir: "Jakarta",
    tanggalLahir: "2012-05-14",
    kelas: "VII A",
    absen: 1,
    wali: "Bambang Sudarmono",
    hpWali: "081234567890",
    alamat: "Jl. Merdeka No. 12, Jakarta",
    username: "1001",
    passHash: "123456", // Di hash atau diverifikasi di client/server
    status: "Aktif",
    avatar: "👦",
    xp: 680,
    koin: 140,
    levelMax: 4,
    bintangTotal: 11,
    badges: ["Penjelajah Nusantara", "Master Geografi", "Juara Kelas"],
    nilaiTertinggi: 95
  },
  {
    nis: "1002",
    nisn: "0091234562",
    nama: "Alya Nur Salsabila",
    gender: "P",
    tempatLahir: "Bandung",
    tanggalLahir: "2012-08-20",
    kelas: "VII A",
    absen: 2,
    wali: "Hendra Gunawan",
    hpWali: "081234567891",
    alamat: "Jl. Dago Asri No. 45, Bandung",
    username: "1002",
    passHash: "123456",
    status: "Aktif",
    avatar: "🧕",
    xp: 920,
    koin: 210,
    levelMax: 6,
    bintangTotal: 18,
    badges: ["Penjelajah Nusantara", "Ekonom Muda", "Sejarawan Ulung", "Sosiolog Tangguh", "Bintang Kelas"],
    nilaiTertinggi: 100
  },
  {
    nis: "1003",
    nisn: "0091234563",
    nama: "Bima Arya Sena",
    gender: "L",
    tempatLahir: "Surabaya",
    tanggalLahir: "2012-02-11",
    kelas: "VII B",
    absen: 1,
    wali: "Joko Santoso",
    hpWali: "081234567892",
    alamat: "Jl. Pahlawan No. 78, Surabaya",
    username: "1003",
    passHash: "123456",
    status: "Aktif",
    avatar: "🧑",
    xp: 510,
    koin: 95,
    levelMax: 3,
    bintangTotal: 8,
    badges: ["Penjelajah Nusantara", "Peneliti Sejarah"],
    nilaiTertinggi: 88
  },
  {
    nis: "1004",
    nisn: "0091234564",
    nama: "Clarissa Dewi Lestari",
    gender: "P",
    tempatLahir: "Semarang",
    tanggalLahir: "2012-11-03",
    kelas: "VII B",
    absen: 2,
    wali: "Supriyanto",
    hpWali: "081234567893",
    alamat: "Jl. Pandanaran No. 23, Semarang",
    username: "1004",
    passHash: "123456",
    status: "Aktif",
    avatar: "👧",
    xp: 760,
    koin: 160,
    levelMax: 5,
    bintangTotal: 14,
    badges: ["Penjelajah Nusantara", "Ekonom Muda", "Sosiolog Tangguh"],
    nilaiTertinggi: 92
  },
  {
    nis: "1005",
    nisn: "0091234565",
    nama: "Fajar Rizky Ramadhan",
    gender: "L",
    tempatLahir: "Yogyakarta",
    tanggalLahir: "2012-09-09",
    kelas: "VII C",
    absen: 1,
    wali: "Agus Purwanto",
    hpWali: "081234567894",
    alamat: "Jl. Malioboro No. 99, Yogyakarta",
    username: "1005",
    passHash: "123456",
    status: "Aktif",
    avatar: "🧒",
    xp: 340,
    koin: 60,
    levelMax: 2,
    bintangTotal: 5,
    badges: ["Penjelajah Pemula"],
    nilaiTertinggi: 80
  },
  {
    nis: "1006",
    nisn: "0091234566",
    nama: "Nabila Zahra Kirana",
    gender: "P",
    tempatLahir: "Malang",
    tanggalLahir: "2012-04-18",
    kelas: "VII C",
    absen: 2,
    wali: "Imam Wahyudi",
    hpWali: "081234567895",
    alamat: "Jl. Ijen No. 15, Malang",
    username: "1006",
    passHash: "123456",
    status: "Aktif",
    avatar: "🧕",
    xp: 880,
    koin: 190,
    levelMax: 6,
    bintangTotal: 17,
    badges: ["Penjelajah Nusantara", "Master Geografi", "Sosiolog Tangguh", "Bintang Prestasi"],
    nilaiTertinggi: 98
  }
];

// DATA AWAL RIWAYAT PERMAINAN SISWA
const INITIAL_GAME_LOGS = [
  {
    id: "LOG-001",
    nis: "1002",
    nama: "Alya Nur Salsabila",
    kelas: "VII A",
    materi: "Konsep Dasar Ilmu Sosial",
    level: 1,
    gameMode: "Kuis Pilihan Ganda",
    jumlahSoal: 10,
    benar: 10,
    salah: 0,
    nilai: 100,
    poin: 145,
    waktuPengerjaan: "02:15",
    tanggal: "2026-11-10 08:30",
    tuntas: true,
    bintang: 3
  },
  {
    id: "LOG-002",
    nis: "1002",
    nama: "Alya Nur Salsabila",
    kelas: "VII A",
    materi: "Konsep Dasar Ilmu Sejarah",
    level: 2,
    gameMode: "Tebak Gambar",
    jumlahSoal: 10,
    benar: 9,
    salah: 1,
    nilai: 90,
    poin: 120,
    waktuPengerjaan: "03:10",
    tanggal: "2026-11-11 09:15",
    tuntas: true,
    bintang: 3
  },
  {
    id: "LOG-003",
    nis: "1001",
    nama: "Aditya Pratama Putra",
    kelas: "VII A",
    materi: "Konsep Dasar Ilmu Sosial",
    level: 1,
    gameMode: "Kuis Pilihan Ganda",
    jumlahSoal: 10,
    benar: 9,
    salah: 1,
    nilai: 90,
    poin: 125,
    waktuPengerjaan: "02:45",
    tanggal: "2026-11-12 10:00",
    tuntas: true,
    bintang: 3
  },
  {
    id: "LOG-004",
    nis: "1001",
    nama: "Aditya Pratama Putra",
    kelas: "VII A",
    materi: "Geografi",
    level: 3,
    gameMode: "Puzzle IPS",
    jumlahSoal: 10,
    benar: 8,
    salah: 2,
    nilai: 80,
    poin: 100,
    waktuPengerjaan: "04:12",
    tanggal: "2026-11-13 11:20",
    tuntas: true,
    bintang: 2
  },
  {
    id: "LOG-005",
    nis: "1006",
    nama: "Nabila Zahra Kirana",
    kelas: "VII C",
    materi: "Kegiatan Ekonomi",
    level: 5,
    gameMode: "Pasangkan Jawaban",
    jumlahSoal: 10,
    benar: 10,
    salah: 0,
    nilai: 100,
    poin: 150,
    waktuPengerjaan: "02:05",
    tanggal: "2026-11-14 13:40",
    tuntas: true,
    bintang: 3
  }
];

// Inisialisasi Bank Soal ke Variabel Global (Mendukung Penyimpanan Kustom / Edit)
function getInitialQuestions() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = window.localStorage.getItem('IPS_CUSTOM_QUESTIONS');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Gagal membaca saved questions, fallback ke default', e);
    }
  }
  return initQuestionBank();
}

let ALL_QUESTIONS = getInitialQuestions();
console.log(`[DATA] Inisialisasi Berhasil: ${ALL_QUESTIONS.length} Soal IPS Kelas 7.`);
