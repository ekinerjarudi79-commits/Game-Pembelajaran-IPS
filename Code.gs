/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT BACKEND (Code.gs)
 * IPS ADVENTURE – Petualangan Belajar IPS Kelas 7 SMP/MTs
 * ==============================================================================
 * 
 * Database: Google Spreadsheet dengan 8 Sheet Utama:
 * 1. DATA_SISWA
 * 2. DATA_KELAS
 * 3. AKUN_SISWA
 * 4. HASIL_PERMAINAN
 * 5. BANK_SOAL
 * 6. DATA_MATERI
 * 7. POIN_SISWA
 * 8. PENGATURAN
 */

// NAMA SHEET DATABASE
const SHEETS = {
  SISWA: 'DATA_SISWA',
  KELAS: 'DATA_KELAS',
  AKUN: 'AKUN_SISWA',
  HASIL: 'HASIL_PERMAINAN',
  SOAL: 'BANK_SOAL',
  MATERI: 'DATA_MATERI',
  POIN: 'POIN_SISWA',
  PENGATURAN: 'PENGATURAN'
};

/**
 * Handle HTTP GET Requests
 * Mengembalikan data dalam format JSON untuk sinkronisasi client-server
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'ping';
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. PING / TEST KONEKSI
    if (action === 'ping') {
      return createJsonResponse({
        status: 'success',
        message: 'Koneksi ke backend Google Apps Script IPS ADVENTURE Aktif!',
        timestamp: new Date().toISOString()
      });
    }

    // 2. GET SEMUA DATA SISWA
    if (action === 'getStudents') {
      const sheet = ss.getSheetByName(SHEETS.SISWA);
      if (!sheet) return createJsonResponse({ status: 'error', message: 'Sheet DATA_SISWA belum dibuat' });
      const data = sheetToObjects(sheet);
      return createJsonResponse({ status: 'success', data: data });
    }

    // 3. GET DATA KELAS
    if (action === 'getClasses') {
      const sheet = ss.getSheetByName(SHEETS.KELAS);
      if (!sheet) return createJsonResponse({ status: 'error', message: 'Sheet DATA_KELAS belum dibuat' });
      const data = sheetToObjects(sheet);
      return createJsonResponse({ status: 'success', data: data });
    }

    // 4. GET HASIL PERMAINAN / LOG
    if (action === 'getGameResults') {
      const sheet = ss.getSheetByName(SHEETS.HASIL);
      if (!sheet) return createJsonResponse({ status: 'error', message: 'Sheet HASIL_PERMAINAN belum dibuat' });
      const data = sheetToObjects(sheet);
      return createJsonResponse({ status: 'success', data: data });
    }

    // 5. GET PAPAN PERINGKAT (LEADERBOARD)
    if (action === 'getLeaderboard') {
      const sheet = ss.getSheetByName(SHEETS.POIN);
      if (!sheet) return createJsonResponse({ status: 'error', message: 'Sheet POIN_SISWA belum dibuat' });
      let data = sheetToObjects(sheet);
      // Urutkan berdasarkan total poin tertinggi
      data.sort((a, b) => (Number(b.poin) || 0) - (Number(a.poin) || 0));
      return createJsonResponse({ status: 'success', data: data.slice(0, 10) });
    }

    // 6. GET BANK SOAL
    if (action === 'getQuestions') {
      const sheet = ss.getSheetByName(SHEETS.SOAL);
      if (!sheet) return createJsonResponse({ status: 'error', message: 'Sheet BANK_SOAL belum dibuat' });
      const data = sheetToObjects(sheet);
      return createJsonResponse({ status: 'success', data: data });
    }

    // Web Page Fallback (Jika dibuka langsung di browser)
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;text-align:center;padding:50px;">' +
      '<h1 style="color:#1e3a8a;">IPS ADVENTURE Backend API</h1>' +
      '<p>Google Apps Script Web App berjalan normal dan siap menerima request.</p>' +
      '</div>'
    ).setTitle('IPS ADVENTURE Backend');

  } catch (err) {
    return createJsonResponse({ status: 'error', message: err.toString() });
  }
}

/**
 * Handle HTTP POST Requests
 * Menerima payload JSON untuk operasi: login, simpan siswa, simpan skor, update soal
 */
function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action;
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. SETUP OTOMATIS DATABASE GOOGLE SHEETS
    if (action === 'setupDatabase') {
      initAllDatabaseSheets();
      return createJsonResponse({ status: 'success', message: 'Database 8 sheet berhasil diinisialisasi!' });
    }

    // 2. AUTENTIKASI SISWA (LOGIN)
    if (action === 'loginStudent') {
      const username = String(postData.username).trim();
      const password = String(postData.password).trim();
      const sheetAkun = ss.getSheetByName(SHEETS.AKUN);
      const sheetSiswa = ss.getSheetByName(SHEETS.SISWA);

      if (!sheetAkun || !sheetSiswa) {
        return createJsonResponse({ status: 'error', message: 'Database akun siswa belum diinisialisasi' });
      }

      const akunList = sheetToObjects(sheetAkun);
      const siswaList = sheetToObjects(sheetSiswa);

      const targetAkun = akunList.find(a => String(a.username) === username);
      if (!targetAkun) {
        return createJsonResponse({ status: 'error', message: 'NIS / Username tidak ditemukan!' });
      }

      const inputHash = hashPassword(password);
      if (String(targetAkun.password_hash) !== inputHash && String(targetAkun.password_hash) !== password) {
        return createJsonResponse({ status: 'error', message: 'Password salah!' });
      }

      const profilSiswa = siswaList.find(s => String(s.nis) === String(targetAkun.nis)) || {};
      if (profilSiswa.status && profilSiswa.status.toLowerCase() === 'tidak aktif') {
        return createJsonResponse({ status: 'error', message: 'Akun siswa berstatus Tidak Aktif. Hubungi Guru.' });
      }

      return createJsonResponse({
        status: 'success',
        message: 'Login Berhasil',
        user: {
          nis: profilSiswa.nis,
          nisn: profilSiswa.nisn,
          nama: profilSiswa.nama,
          kelas: profilSiswa.kelas,
          absen: profilSiswa.absen,
          avatar: profilSiswa.avatar || '👦'
        }
      });
    }

    // 3. SIMPAN HASIL PERMAINAN SISWA
    if (action === 'saveGameResult') {
      const res = postData.data;
      const sheetHasil = ss.getSheetByName(SHEETS.HASIL);
      const sheetPoin = ss.getSheetByName(SHEETS.POIN);

      if (!sheetHasil || !sheetPoin) {
        return createJsonResponse({ status: 'error', message: 'Sheet hasil/poin belum siap' });
      }

      // Catat ke HASIL_PERMAINAN
      const rowId = 'LOG-' + Utilities.formatDate(new Date(), 'GMT+7', 'yyyyMMddHHmmss');
      sheetHasil.appendRow([
        rowId,
        res.nis || '',
        res.nama || '',
        res.kelas || '',
        res.materi || '',
        res.level || '',
        res.gameMode || 'Kuis',
        res.jumlahSoal || 0,
        res.benar || 0,
        res.salah || 0,
        res.nilai || 0,
        res.poin || 0,
        res.waktuPengerjaan || '00:00',
        Utilities.formatDate(new Date(), 'GMT+7', 'yyyy-MM-dd HH:mm:ss'),
        res.tuntas ? 'Tuntas' : 'Belum Tuntas',
        res.bintang || 1
      ]);

      // Update POIN_SISWA
      updateStudentPoints(sheetPoin, res);

      return createJsonResponse({ status: 'success', message: 'Hasil permainan berhasil disimpan!' });
    }

    // 4. SIMPAN / EDIT DATA SISWA
    if (action === 'saveStudent') {
      const s = postData.student;
      const sheetSiswa = ss.getSheetByName(SHEETS.SISWA);
      const sheetAkun = ss.getSheetByName(SHEETS.AKUN);
      const sheetPoin = ss.getSheetByName(SHEETS.POIN);

      const rows = sheetSiswa.getDataRange().getValues();
      let rowIndex = -1;
      for (let i = 1; i < rows.length; i++) {
        if (String(rows[i][0]) === String(s.nis)) {
          rowIndex = i + 1;
          break;
        }
      }

      if (rowIndex > 0) {
        // Edit Siswa yang ada
        sheetSiswa.getRange(rowIndex, 1, 1, 14).setValues([[
          s.nis, s.nisn, s.nama, s.gender, s.tempatLahir, s.tanggalLahir,
          s.kelas, s.absen, s.wali, s.hpWali, s.alamat, s.username,
          s.avatar || '👦', s.status || 'Aktif'
        ]]);
      } else {
        // Tambah Siswa Baru
        sheetSiswa.appendRow([
          s.nis, s.nisn, s.nama, s.gender, s.tempatLahir, s.tanggalLahir,
          s.kelas, s.absen, s.wali, s.hpWali, s.alamat, s.username,
          s.avatar || '👦', s.status || 'Aktif'
        ]);

        // Buat Akun Siswa Baru dengan password default/diberikan
        const passHash = hashPassword(s.password || '123456');
        sheetAkun.appendRow([
          s.nis, s.username || s.nis, passHash, 'siswa', Utilities.formatDate(new Date(), 'GMT+7', 'yyyy-MM-dd HH:mm:ss')
        ]);

        // Buat Baris Poin Siswa Baru
        sheetPoin.appendRow([
          s.nis, s.nama, s.kelas, 0, 0, 1, 0, 'Aktif'
        ]);
      }

      return createJsonResponse({ status: 'success', message: 'Data siswa berhasil disimpan!' });
    }

    // 5. HAPUS SISWA
    if (action === 'deleteStudent') {
      const nis = String(postData.nis);
      const sheetSiswa = ss.getSheetByName(SHEETS.SISWA);
      const rows = sheetSiswa.getDataRange().getValues();
      for (let i = 1; i < rows.length; i++) {
        if (String(rows[i][0]) === nis) {
          sheetSiswa.deleteRow(i + 1);
          break;
        }
      }
      return createJsonResponse({ status: 'success', message: 'Siswa berhasil dihapus!' });
    }

    return createJsonResponse({ status: 'error', message: 'Aksi POST tidak dikenali' });

  } catch (err) {
    return createJsonResponse({ status: 'error', message: err.toString() });
  }
}

/**
 * Update Poin, XP, dan Level Tertinggi Siswa
 */
function updateStudentPoints(sheetPoin, res) {
  const rows = sheetPoin.getDataRange().getValues();
  let found = false;

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(res.nis)) {
      found = true;
      const currentPoin = Number(rows[i][3]) || 0;
      const currentXP = Number(rows[i][4]) || 0;
      const currentLvl = Number(rows[i][5]) || 1;
      const currentStars = Number(rows[i][6]) || 0;

      const newPoin = currentPoin + (Number(res.poin) || 0);
      const newXP = currentXP + (Number(res.nilai) || 0) * 5;
      const newLvl = Math.max(currentLvl, Number(res.level) + (res.tuntas ? 1 : 0));
      const newStars = currentStars + (Number(res.bintang) || 0);

      sheetPoin.getRange(i + 1, 4).setValue(newPoin);
      sheetPoin.getRange(i + 1, 5).setValue(newXP);
      sheetPoin.getRange(i + 1, 6).setValue(newLvl);
      sheetPoin.getRange(i + 1, 7).setValue(newStars);
      break;
    }
  }

  if (!found) {
    sheetPoin.appendRow([
      res.nis,
      res.nama,
      res.kelas,
      res.poin || 0,
      (res.nilai || 0) * 5,
      res.level || 1,
      res.bintang || 1,
      'Aktif'
    ]);
  }
}

/**
 * Inisialisasi Otomatis 8 Sheet Database dengan Kolom Lengkap
 */
function initAllDatabaseSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. DATA_SISWA
  createSheetIfNotExists(ss, SHEETS.SISWA, [
    'NIS', 'NISN', 'Nama Lengkap', 'Jenis Kelamin', 'Tempat Lahir', 'Tanggal Lahir',
    'Kelas', 'Nomor Absen', 'Nama Wali', 'No HP Wali', 'Alamat', 'Username', 'Avatar', 'Status'
  ]);

  // 2. DATA_KELAS
  createSheetIfNotExists(ss, SHEETS.KELAS, [
    'Kode Kelas', 'Nama Kelas', 'Wali Kelas', 'Jumlah Siswa'
  ]);

  // 3. AKUN_SISWA
  createSheetIfNotExists(ss, SHEETS.AKUN, [
    'NIS', 'Username', 'Password Hash', 'Peran', 'Dibuat Tanggal'
  ]);

  // 4. HASIL_PERMAINAN
  createSheetIfNotExists(ss, SHEETS.HASIL, [
    'ID Log', 'NIS', 'Nama Siswa', 'Kelas', 'Materi IPS', 'Level', 'Jenis Game',
    'Jumlah Soal', 'Jawaban Benar', 'Jawaban Salah', 'Nilai', 'Total Poin',
    'Waktu Pengerjaan', 'Tanggal & Waktu', 'Status Ketuntasan', 'Bintang'
  ]);

  // 5. BANK_SOAL
  createSheetIfNotExists(ss, SHEETS.SOAL, [
    'ID Soal', 'Level', 'Topik Materi', 'Tingkat Kesulitan', 'Pertanyaan',
    'Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D', 'Kunci Jawaban', 'Pembahasan', 'Tipe Soal'
  ]);

  // 6. DATA_MATERI
  createSheetIfNotExists(ss, SHEETS.MATERI, [
    'Level ID', 'Judul Modul', 'Sub Pokok Bahasan', 'Ringkasan Materi', 'Tautan Tambahan'
  ]);

  // 7. POIN_SISWA
  createSheetIfNotExists(ss, SHEETS.POIN, [
    'NIS', 'Nama Siswa', 'Kelas', 'Total Poin', 'XP', 'Level Tertinggi', 'Jumlah Bintang', 'Status'
  ]);

  // 8. PENGATURAN
  createSheetIfNotExists(ss, SHEETS.PENGATURAN, [
    'Kunci Konfigurasi', 'Nilai', 'Keterangan'
  ]);

  // Isi default pengaturan jika kosong
  const pSheet = ss.getSheetByName(SHEETS.PENGATURAN);
  if (pSheet.getLastRow() === 1) {
    pSheet.appendRow(['NAMA_APLIKASI', 'IPS ADVENTURE – Petualangan Belajar IPS Kelas 7', 'Nama resmi']);
    pSheet.appendRow(['KKM_MINIMAL', '70', 'Nilai kelulusan buka level']);
    pSheet.appendRow(['POIN_PER_BENAR', '10', 'Poin standar jawaban benar']);
    pSheet.appendRow(['BONUS_SPEED_MAX', '5', 'Bonus sisa waktu tercepat']);
  }
}

/**
 * Buat Sheet & Header jika belum ada
 */
function createSheetIfNotExists(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    // Format Header: Tebal dan latar belakang biru navy
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1e3a8a');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
}

/**
 * Utility: Convert Sheet ke Array of Objects
 */
function sheetToObjects(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  const rawHeaders = values[0];
  const headers = rawHeaders.map(h => String(h).toLowerCase().replace(/[^a-z0-9]/g, '_'));

  const results = [];
  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = row[c];
    }
    results.push(obj);
  }
  return results;
}

/**
 * Hash Password Menggunakan SHA-256
 */
function hashPassword(password) {
  const rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password, Utilities.Charset.UTF_8);
  let txtHash = '';
  for (let i = 0; i < rawHash.length; i++) {
    let byteVal = rawHash[i];
    if (byteVal < 0) byteVal += 256;
    let byteHex = byteVal.toString(16);
    if (byteHex.length == 1) byteHex = '0' + byteHex;
    txtHash += byteHex;
  }
  return txtHash;
}

/**
 * Response JSON Helper
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
