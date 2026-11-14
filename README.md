# IPS ADVENTURE – Petualangan Belajar IPS Kelas 7 SMP/MTs 🌍🚀

Aplikasi **Game Edukasi Interaktif Mata Pelajaran Ilmu Pengetahuan Sosial (IPS) Kelas 7 SMP/MTs** dengan desain modern, visual 3D gamified, responsif, kaya animasi, audio synthesizer bawaan, bank soal 300+ soal, dan terintegrasi dengan Google Sheets & Google Apps Script sebagai backend database.

---

## 🌟 Fitur Utama Aplikasi

### 1. Halaman Utama & Desain Visual 3D
- **Palet Warna**: Biru Navy (`#0f172a`, `#1e3a8a`), Biru Muda (`#38bdf8`), Putih (`#ffffff`), dan Kuning Emas (`#f59e0b`, `#fbbf24`).
- **Dashboard Modern**: Gaya *glassmorphism* dan *claymorphism* dengan tombol tactile 3D interaktif.
- **Audio Synthesizer Bawaan (Web Audio API)**: Efek suara jawaban benar, jawaban salah, naik level/fanfare, serta musik latar (BGM) lo-fi yang dapat diaktifkan/dinonaktifkan tanpa dependensi file eksternal.
- **Efek Konfeti**: Animasi konfeti canvas perayaan ketika siswa menyelesaikan level atau mencetak rekor baru.
- **Responsif**: Nyaman dimainkan di layar Smartphone (HP), Tablet, Laptop, maupun Komputer Proyektor Kelas.

### 2. 6 Level Materi IPS Kelas 7 SMP/MTs
1. **Level 1: Konsep Dasar Ilmu Sosial** (Pengertian IPS, Ruang Lingkup, Hubungan Manusia & Lingkungan, Interaksi Sosial).
2. **Level 2: Konsep Dasar Ilmu Sejarah** (Pengertian Sejarah, Manusia, Ruang, Waktu, Kronologi, Periodisasi, Sumber Sejarah, Perubahan & Keberlanjutan).
3. **Level 3: Geografi & Lingkungan Alam** (Letak Indonesia, Komponen Peta, Bentuk Muka Bumi, Cuaca, Iklim, Potensi Sumber Daya Alam).
4. **Level 4: Interaksi Sosial & Lembaga** (Syarat Kontak & Komunikasi, Bentuk Asosiatif, Bentuk Disosiatif, Konflik & Akomodasi, Lembaga Sosial).
5. **Level 5: Kegiatan & Pelaku Ekonomi** (Kebutuhan & Kelangkaan, Produksi, Distribusi, Konsumsi, Motif, Prinsip, dan Pelaku Ekonomi).
6. **Level 6: Kehidupan & Keragaman Masyarakat** (Keragaman Budaya, Mobilitas Sosial Vertikal/Horizontal, Konektivitas Antarruang, Pelestarian Budaya).

### 3. 8 Jenis Permainan Edukasi
1. **Kuis Pilihan Ganda**: Memilih 1 dari 4 pilihan jawaban (A, B, C, D) dengan pengacakan otomatis dan pembahasan materi langsung.
2. **Tebak Gambar (Visual Clue)**: Mengidentifikasi peninggalan sejarah, simbol navigasi peta, dan konsep IPS berdasarkan petunjuk visual.
3. **Susun Kata (Anagram Scramble)**: Menyusun huruf-huruf acak menjadi istilah baku IPS (misal: SOSIALISASI, DISTRIBUSI, dsb).
4. **Puzzle IPS (Sliding Tiles)**: Menata ubin gambar peta dan siklus ekonomi ke susunan yang harmonis.
5. **Benar atau Salah (True or False)**: Uji ketajaman berpikir kritis menentukan validitas pernyataan ilmiah IPS secara cepat.
6. **Pasangkan Jawaban (Match Pairs)**: Menghubungkan istilah di kolom kiri dengan definisi atau contoh nyatanya di kolom kanan.
7. **Petualangan IPS (Quest Nusantara)**: Misi penjelajahan pulau-pulau besar Indonesia (Sumatera, Jawa, Kalimantan, Sulawesi, Papua).
8. **Duel Pengetahuan (Speed Duel)**: Ujian kecepatan menjawab soal dengan sistem *combo multiplier* untuk poin maksimal.

### 4. Sistem Level, Skor, XP & Bintang
- **Poin**: +10 Poin per jawaban benar + Bonus Kecepatan (hingga +5 Poin ekstra).
- **Ambang Kelulusan**: Siswa wajib meraih nilai minimal **70** untuk membuka level berikutnya.
- **Rating Bintang**:
  - Nilai 70 – 79 = ⭐ 1 Bintang
  - Nilai 80 – 89 = ⭐⭐ 2 Bintang
  - Nilai 90 – 100 = ⭐⭐⭐ 3 Bintang
- **XP, Koin & Lencana**: Siswa mengumpulkan XP dan lencana penghargaan (seperti *Penjelajah Nusantara*, *Master Geografi*, *Ekonom Muda*).
- **Sertifikat Digital**: Otomatis dapat dicetak atau disimpan ke PDF dengan nama siswa, NIS, dan tanda tangan digital guru pembimbing setelah menuntaskan level.

### 5. Modul Data Siswa Lengkap (Section 14)
- **14 Kolom Data Siswa**: NIS, NISN, Nama Lengkap, Jenis Kelamin, Tempat Lahir, Tanggal Lahir, Kelas, Nomor Absen, Nama Wali, No HP Wali, Alamat, Username, Password, dan Status Keaktifan (Aktif/Tidak Aktif).
- **Fitur Pengelolaan**:
  - Tambah, Edit, Hapus, dan Lihat Detail Siswa.
  - Pencarian *real-time* berdasarkan Nama atau NIS.
  - Filter pengelompokan berdasarkan Rombongan Kelas (VII A, VII B, VII C, VII D, dst).
  - Paginasi tabel modern.
  - **Impor & Ekspor Excel (CSV/XLSX)** dengan 1 klik.
  - **Cetak Kartu Identitas Akun Siswa**: Dilengkapi avatar karakter, nomor identitas, dan kredensial login siswa.
  - Statistik komprehensif: Jumlah total siswa, perbandingan L/P, siswa aktif, jumlah siswa yang sudah bermain vs belum bermain.

### 6. Dashboard & Laporan Guru
- Rekapitulasi nilai otomatis setiap sesi permainan.
- Analisis nilai rata-rata kelas, nilai tertinggi, dan nilai terendah.
- Riwayat pengerjaan siswa terinci (tanggal, durasi pengerjaan, skor, ketuntasan).
- Fitur unduh rekap nilai ke format spreadsheet Excel.
- Editor Bank Soal untuk menambah dan mengedit soal.

---

## 📁 Struktur Berkas

```
Game Pembelajaran/
│
├── index.html       # Antarmuka utama aplikasi (Single Page Application responsif)
├── style.css        # Desain gaya 3D gamified, glassmorphism, claymorphism & responsif
├── game.js          # Mesin game, Web Audio API, Canvas Confetti, dan alur 8 mode game
├── admin.js         # Modul Data Siswa (CRUD, Impor/Ekspor Excel, Cetak Kartu, Rekap Guru)
├── data.js          # Bank Soal 300+ soal IPS Kelas 7, rangkuman materi & data master
├── Code.gs          # Skrip Backend Google Apps Script (doGet, doPost, hashing, Google Sheets)
└── README.md        # Panduan instalasi dan dokumentasi aplikasi
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Menjalankan Langsung di Komputer (Mode Offline-First)
Aplikasi ini dirancang dengan arsitektur **Offline-First**. Anda tidak memerlukan server khusus untuk langsung menggunakannya:
1. Buka folder `Game Pembelajaran`.
2. Klik dua kali berkas `index.html` (akan terbuka di browser seperti Google Chrome, Microsoft Edge, atau Mozilla Firefox).
3. Aplikasi langsung dapat dimainkan dengan data siswa dan bank soal yang sudah terisi otomatis!

### 2. Menghubungkan ke Google Sheets & Google Apps Script
Jika Anda ingin seluruh data tersimpan secara terpusat di Google Spreadsheet guru:

1. Buka [Google Sheets](https://sheets.new) baru pada akun Google Guru.
2. Beri nama spreadsheet, misalnya: `DATABASE_IPS_ADVENTURE_KELAS_7`.
3. Klik menu **Ekstensi** > **Apps Script**.
4. Hapus kode bawaan di `Code.gs`, lalu salin seluruh isi berkas `Code.gs` dari folder proyek ini dan tempelkan.
5. Pada editor Apps Script, pilih fungsi `initAllDatabaseSheets` lalu klik **Run (Jalankan)** untuk membuat 8 sheet secara otomatis:
   - `DATA_SISWA`
   - `DATA_KELAS`
   - `AKUN_SISWA`
   - `HASIL_PERMAINAN`
   - `BANK_SOAL`
   - `DATA_MATERI`
   - `POIN_SISWA`
   - `PENGATURAN`
6. Klik tombol **Deploy (Terapkan)** di pojok kanan atas > **Penerapan Baru (New Deployment)**.
7. Pilih jenis: **Aplikasi Web (Web App)**.
8. Konfigurasikan:
   - **Jalankan sebagai (Execute as)**: *Saya (Me / email guru)*.
   - **Yang memiliki akses (Who has access)**: *Siapa saja (Anyone)*.
9. Klik **Deploy** dan salin **URL Aplikasi Web (Web App URL)** yang dihasilkan (berakhiran `/exec`).
10. Buka aplikasi di browser, masuk ke **Dashboard Guru** > Tab **⚙️ Pengaturan & Sheets**, lalu tempelkan URL tersebut dan klik **Simpan URL**.

---

## 🔑 Akun Uji Coba Default

### Akun Siswa (Bawaan):
| NIS / Username | Nama Siswa | Kelas | Password |
|---|---|---|---|
| `1001` | Aditya Pratama Putra | VII A | `123456` |
| `1002` | Alya Nur Salsabila | VII A | `123456` |
| `1003` | Bima Arya Sena | VII B | `123456` |
| `1004` | Clarissa Dewi Lestari | VII B | `123456` |
| `1005` | Fajar Rizky Ramadhan | VII C | `123456` |
| `1006` | Nabila Zahra Kirana | VII C | `123456` |

*Catatan: Guru dapat menambahkan siswa baru kapan saja melalui tombol **Tambah Siswa** atau mengimpor file Excel/CSV.*

---

## 📖 Hak Cipta & Lisensi
Media pembelajaran ini dikembangkan untuk mendukung pembelajaran aktif, kreatif, dan menyenangkan pada mata pelajaran **IPS Kelas 7 SMP/MTs** sesuai Kurikulum Merdeka dan Kurikulum 2013 Revisi.
