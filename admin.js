/**
 * ==============================================================================
 * IPS ADVENTURE – MODUL DATA SISWA & DASHBOARD GURU (admin.js)
 * CRUD Siswa, Manajemen Kelas, Bank Soal, Hasil Belajar,
 * Impor/Ekspor Excel, Cetak Kartu Akun Siswa & Sinkronisasi GAS
 * ==============================================================================
 */

const AdminState = {
  activeTab: 'tabSiswa',
  searchTerm: '',
  selectedClassFilter: 'ALL',
  currentPage: 1,
  pageSize: 8,
  selectedStudent: null,
  // State untuk Bank Soal 8 Jenis Game
  selectedEditorGameMode: 'mcq',
  questionSearchTerm: '',
  questionLevelFilter: 'ALL',
  questionCurrentPage: 1,
  questionPageSize: 10
};

// ==============================================================================
// 1. INISIALISASI & TAB ROUTER GURU
// ==============================================================================
function initAdminDashboard() {
  updateAdminStatsCounters();
  renderStudentTable();
  populateClassDropdowns();
  renderTeacherReportTab();
  renderQuestionsManagementTable();
}

function switchAdminTab(tabId) {
  AudioPlayer.playClick();
  AdminState.activeTab = tabId;

  document.querySelectorAll('.admin-tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.querySelectorAll('.admin-header-tabs .tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const targetTab = document.getElementById(tabId);
  const targetBtn = document.getElementById(`btn-${tabId}`);
  if (targetTab) targetTab.style.display = 'block';
  if (targetBtn) targetBtn.classList.add('active');

  if (tabId === 'tabSiswa') {
    renderStudentTable();
    updateAdminStatsCounters();
  } else if (tabId === 'tabKelas') {
    renderClassManagementTable();
  } else if (tabId === 'tabLaporan') {
    renderTeacherReportTab();
  } else if (tabId === 'tabSoal') {
    renderQuestionsManagementTable();
  } else if (tabId === 'tabPengaturan') {
    loadSettingsTab();
  }
}

// ==============================================================================
// 2. STATISTIK DASHBOARD DATA SISWA
// ==============================================================================
function updateAdminStatsCounters() {
  const students = getSavedStudents();
  const logs = getSavedGameLogs();

  const total = students.length;
  const maleCount = students.filter(s => s.gender === 'L').length;
  const femaleCount = students.filter(s => s.gender === 'P').length;
  const activeCount = students.filter(s => !s.status || s.status.toLowerCase() === 'aktif').length;

  const playedNisSet = new Set(logs.map(l => l.nis));
  const playedCount = students.filter(s => playedNisSet.has(s.nis)).length;
  const notPlayedCount = total - playedCount;

  const totalEl = document.getElementById('statTotalSiswa');
  const maleEl = document.getElementById('statSiswaLaki');
  const femaleEl = document.getElementById('statSiswaPerempuan');
  const activeEl = document.getElementById('statSiswaAktif');
  const playedEl = document.getElementById('statSudahMain');
  const notPlayedEl = document.getElementById('statBelumMain');

  if (totalEl) totalEl.textContent = total;
  if (maleEl) maleEl.textContent = maleCount;
  if (femaleEl) femaleEl.textContent = femaleCount;
  if (activeEl) activeEl.textContent = activeCount;
  if (playedEl) playedEl.textContent = playedCount;
  if (notPlayedEl) notPlayedEl.textContent = notPlayedCount;
}

// ==============================================================================
// 3. TABEL & KELOLA DATA SISWA (CRUD + PENCARIAN + PAGINASI)
// ==============================================================================
function renderStudentTable() {
  const tbody = document.getElementById('studentTableBody');
  if (!tbody) return;

  const students = getSavedStudents();
  const search = AdminState.searchTerm.toLowerCase();
  const filterClass = AdminState.selectedClassFilter;

  // Filter
  let filtered = students.filter(s => {
    const matchName = (s.nama || '').toLowerCase().includes(search) || (s.nis || '').includes(search);
    const matchClass = (filterClass === 'ALL' || s.kelas === filterClass);
    return matchName && matchClass;
  });

  // Urutkan berdasarkan nomor absen lalu nama
  filtered.sort((a, b) => (Number(a.absen) || 0) - (Number(b.absen) || 0));

  // Paginasi
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / AdminState.pageSize) || 1;
  if (AdminState.currentPage > totalPages) AdminState.currentPage = 1;

  const startIdx = (AdminState.currentPage - 1) * AdminState.pageSize;
  const paginated = filtered.slice(startIdx, startIdx + AdminState.pageSize);

  tbody.innerHTML = paginated.map(s => `
    <tr>
      <td style="font-weight: 700; color: #38bdf8;">${s.absen || '-'}</td>
      <td><strong>${s.nis}</strong></td>
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.4rem;">${s.avatar || '👦'}</span>
          <div>
            <strong style="color: #fff;">${s.nama}</strong>
            <div style="font-size: 0.75rem; color: #94a3b8;">NISN: ${s.nisn || '-'} • JK: ${s.gender || 'L'}</div>
          </div>
        </div>
      </td>
      <td><span class="status-badge status-active">${s.kelas}</span></td>
      <td>
        <div style="font-size: 0.85rem; color: #cbd5e1;">${s.wali || '-'}</div>
        <div style="font-size: 0.75rem; color: #94a3b8;">${s.hpWali || '-'}</div>
      </td>
      <td>
        <span class="status-badge ${s.status === 'Tidak Aktif' ? 'status-inactive' : 'status-active'}">
          ${s.status || 'Aktif'}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="btn-3d btn-3d-blue" style="padding: 6px 10px; font-size: 0.8rem;" title="Detail & Kartu Akun" onclick="openStudentCardModal('${s.nis}')">
            🪪 Kartu
          </button>
          <button class="btn-3d btn-3d-yellow" style="padding: 6px 10px; font-size: 0.8rem;" title="Edit Data" onclick="editStudentModal('${s.nis}')">
            ✏️
          </button>
          <button class="btn-3d btn-3d-navy" style="padding: 6px 10px; font-size: 0.8rem; color: #ef4444;" title="Hapus Data" onclick="deleteStudent('${s.nis}')">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Update info paginasi
  const pageInfo = document.getElementById('studentPageInfo');
  if (pageInfo) {
    pageInfo.textContent = `Menampilkan ${paginated.length} dari ${totalItems} Siswa (Hal ${AdminState.currentPage} / ${totalPages})`;
  }
}

function handleStudentSearch(val) {
  AdminState.searchTerm = val;
  AdminState.currentPage = 1;
  renderStudentTable();
}

function handleClassFilter(val) {
  AdminState.selectedClassFilter = val;
  AdminState.currentPage = 1;
  renderStudentTable();
}

function changeStudentPage(delta) {
  AudioPlayer.playClick();
  AdminState.currentPage += delta;
  renderStudentTable();
}

// ------------------------------------------------------------------------------
// MODAL FORM TAMBAH / EDIT SISWA
// ------------------------------------------------------------------------------
function openAddStudentModal() {
  AudioPlayer.playClick();
  document.getElementById('studentFormTitle').textContent = 'Tambah Data Siswa Baru';
  document.getElementById('formStudentNis').value = '';
  document.getElementById('formStudentNis').disabled = false;
  document.getElementById('formStudentNisn').value = '';
  document.getElementById('formStudentNama').value = '';
  document.getElementById('formStudentGender').value = 'L';
  document.getElementById('formStudentTempat').value = '';
  document.getElementById('formStudentTanggal').value = '';
  document.getElementById('formStudentAbsen').value = '';
  document.getElementById('formStudentWali').value = '';
  document.getElementById('formStudentHp').value = '';
  document.getElementById('formStudentAlamat').value = '';
  document.getElementById('formStudentUsername').value = '';
  document.getElementById('formStudentPassword').value = '123456';
  document.getElementById('formStudentStatus').value = 'Aktif';

  populateClassDropdowns();
  const modal = document.getElementById('studentFormModal');
  if (modal) modal.classList.add('active');
}

function editStudentModal(nis) {
  AudioPlayer.playClick();
  const students = getSavedStudents();
  const s = students.find(item => item.nis === nis);
  if (!s) return;

  document.getElementById('studentFormTitle').textContent = `Edit Data Siswa (${s.nama})`;
  document.getElementById('formStudentNis').value = s.nis;
  document.getElementById('formStudentNis').disabled = true; // NIS sebagai primary key unik
  document.getElementById('formStudentNisn').value = s.nisn || '';
  document.getElementById('formStudentNama').value = s.nama;
  document.getElementById('formStudentGender').value = s.gender || 'L';
  document.getElementById('formStudentTempat').value = s.tempatLahir || '';
  document.getElementById('formStudentTanggal').value = s.tanggalLahir || '';
  document.getElementById('formStudentKelas').value = s.kelas;
  document.getElementById('formStudentAbsen').value = s.absen || '';
  document.getElementById('formStudentWali').value = s.wali || '';
  document.getElementById('formStudentHp').value = s.hpWali || '';
  document.getElementById('formStudentAlamat').value = s.alamat || '';
  document.getElementById('formStudentUsername').value = s.username || s.nis;
  document.getElementById('formStudentPassword').value = s.passHash || '123456';
  document.getElementById('formStudentStatus').value = s.status || 'Aktif';

  const modal = document.getElementById('studentFormModal');
  if (modal) modal.classList.add('active');
}

function saveStudentForm(e) {
  if (e) e.preventDefault();
  AudioPlayer.playClick();

  const nis = document.getElementById('formStudentNis').value.trim();
  const nama = document.getElementById('formStudentNama').value.trim();

  if (!nis || !nama) {
    showToast('NIS dan Nama Siswa wajib diisi!', 'wrong');
    return;
  }

  const students = getSavedStudents();
  const existingIdx = students.findIndex(s => s.nis === nis);

  const studentObj = {
    nis: nis,
    nisn: document.getElementById('formStudentNisn').value.trim(),
    nama: nama,
    gender: document.getElementById('formStudentGender').value,
    tempatLahir: document.getElementById('formStudentTempat').value.trim(),
    tanggalLahir: document.getElementById('formStudentTanggal').value,
    kelas: document.getElementById('formStudentKelas').value,
    absen: parseInt(document.getElementById('formStudentAbsen').value) || 1,
    wali: document.getElementById('formStudentWali').value.trim(),
    hpWali: document.getElementById('formStudentHp').value.trim(),
    alamat: document.getElementById('formStudentAlamat').value.trim(),
    username: document.getElementById('formStudentUsername').value.trim() || nis,
    passHash: document.getElementById('formStudentPassword').value.trim() || '123456',
    status: document.getElementById('formStudentStatus').value,
    avatar: existingIdx !== -1 ? (students[existingIdx].avatar || '👦') : '👦',
    xp: existingIdx !== -1 ? (students[existingIdx].xp || 0) : 0,
    koin: existingIdx !== -1 ? (students[existingIdx].koin || 0) : 0,
    levelMax: existingIdx !== -1 ? (students[existingIdx].levelMax || 1) : 1,
    bintangTotal: existingIdx !== -1 ? (students[existingIdx].bintangTotal || 0) : 0,
    badges: existingIdx !== -1 ? (students[existingIdx].badges || ["Penjelajah Pemula"]) : ["Penjelajah Pemula"],
    nilaiTertinggi: existingIdx !== -1 ? (students[existingIdx].nilaiTertinggi || 0) : 0
  };

  if (existingIdx !== -1) {
    students[existingIdx] = studentObj;
    showToast(`Data siswa ${nama} berhasil diperbarui! ✅`);
  } else {
    // Validasi NIS ganda
    if (students.some(s => s.nis === nis)) {
      showToast('NIS sudah digunakan oleh siswa lain!', 'wrong');
      return;
    }
    students.push(studentObj);
    showToast(`Siswa baru ${nama} berhasil ditambahkan! 🎉`);
  }

  saveStudentsToStorage(students);
  closeModal('studentFormModal');
  renderStudentTable();
  updateAdminStatsCounters();

  // Sinkronisasi ke Google Apps Script jika URL terisi
  syncStudentToGAS(studentObj);
}

function deleteStudent(nis) {
  AudioPlayer.playClick();
  if (confirm(`Yakin ingin menghapus data siswa dengan NIS: ${nis}?`)) {
    let students = getSavedStudents();
    students = students.filter(s => s.nis !== nis);
    saveStudentsToStorage(students);
    renderStudentTable();
    updateAdminStatsCounters();
    showToast('Data siswa berhasil dihapus.');
  }
}

// ------------------------------------------------------------------------------
// MODAL KARTU IDENTITAS & AKUN SISWA (CETAK)
// ------------------------------------------------------------------------------
function openStudentCardModal(nis) {
  AudioPlayer.playClick();
  const students = getSavedStudents();
  const s = students.find(item => item.nis === nis);
  if (!s) return;

  const cardContainer = document.getElementById('studentIdCardPrintArea');
  if (cardContainer) {
    cardContainer.innerHTML = `
      <div class="student-id-card-preview">
        <div class="id-card-header">
          <div style="font-size: 2rem;">🏛️</div>
          <div>
            <div style="font-family: var(--font-game); font-size: 1.1rem; color: #fbbf24;">KARTU AKUN SISWA</div>
            <div style="font-size: 0.75rem; color: #94a3b8;">IPS ADVENTURE – KELAS 7 SMP/MTs</div>
          </div>
        </div>
        <div class="id-card-body">
          <div class="id-card-avatar">${s.avatar || '👦'}</div>
          <div class="id-card-details">
            <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 6px;">${s.nama}</h3>
            <p><strong>NIS:</strong> ${s.nis} | <strong>NISN:</strong> ${s.nisn || '-'}</p>
            <p><strong>Kelas:</strong> ${s.kelas} | <strong>No. Absen:</strong> ${s.absen || '-'}</p>
            <div style="background: rgba(15,23,42,0.8); border: 1px dashed rgba(56,189,248,0.4); padding: 8px 12px; border-radius: 8px; margin-top: 8px;">
              <p style="color: #38bdf8; font-size: 0.78rem;"><strong>Username:</strong> ${s.username || s.nis}</p>
              <p style="color: #fbbf24; font-size: 0.78rem;"><strong>Password:</strong> ${s.passHash || '123456'}</p>
            </div>
          </div>
        </div>
        <div style="text-align: right; margin-top: 14px; font-size: 0.72rem; color: #94a3b8;">
          Dicetak: ${new Date().toLocaleDateString('id-ID')}
        </div>
      </div>
    `;
  }

  const modal = document.getElementById('studentCardModal');
  if (modal) modal.classList.add('active');
}

function printStudentCard() {
  window.print();
}

// ------------------------------------------------------------------------------
// DOWNLOAD TEMPLATE DATA SISWA (FORMAT EXCEL .XLSX / .CSV)
// ------------------------------------------------------------------------------
function downloadStudentTemplateExcel() {
  AudioPlayer.playClick();

  const headers = [
    "NIS", "NISN", "Nama Lengkap", "Jenis Kelamin (L/P)", "Tempat Lahir",
    "Tanggal Lahir (YYYY-MM-DD)", "Kelas", "Nomor Absen", "Nama Wali", "No HP Wali",
    "Alamat", "Username", "Password", "Status (Aktif/Tidak Aktif)"
  ];

  const sampleRows = [
    [
      "1007", "0091234567", "Muhammad Rizky Pratama", "L", "Jakarta",
      "2012-06-15", "VII A", 7, "Ahmad Subarjo", "081234567801",
      "Jl. Sudirman No. 45, Jakarta", "1007", "123456", "Aktif"
    ],
    [
      "1008", "0091234568", "Siti Nurhaliza Putri", "P", "Bandung",
      "2012-09-21", "VII A", 8, "Hendra Kusuma", "081234567802",
      "Jl. Asia Afrika No. 12, Bandung", "1008", "123456", "Aktif"
    ]
  ];

  if (typeof XLSX !== 'undefined') {
    const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleRows]);
    // Set lebar kolom otomatis agar rapi saat dibuka di Microsoft Excel
    ws['!cols'] = [
      { wch: 10 }, { wch: 14 }, { wch: 28 }, { wch: 18 }, { wch: 16 },
      { wch: 24 }, { wch: 12 }, { wch: 14 }, { wch: 22 }, { wch: 16 },
      { wch: 32 }, { wch: 14 }, { wch: 14 }, { wch: 22 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DATA_SISWA");
    XLSX.writeFile(wb, "TEMPLATE_DATA_SISWA_IPS_KELAS_7.xlsx");
    showToast("Template Data Siswa Excel (.xlsx) berhasil diunduh! 📄");
  } else {
    // Fallback format CSV Excel kompatibel UTF-8 BOM
    const csvContent = "\uFEFF" + [headers.join(","), ...sampleRows.map(r => r.map(c => `"${c}"`).join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "TEMPLATE_DATA_SISWA_IPS_KELAS_7.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Template Data Siswa (.csv) berhasil diunduh! 📄");
  }
}

// ------------------------------------------------------------------------------
// EKSPOR DATA SISWA KE EXCEL (.XLSX / .CSV)
// ------------------------------------------------------------------------------
function exportStudentsToExcel() {
  AudioPlayer.playClick();
  const students = getSavedStudents();

  const headers = [
    "NIS", "NISN", "Nama Lengkap", "Jenis Kelamin", "Tempat Lahir",
    "Tanggal Lahir", "Kelas", "Nomor Absen", "Nama Wali", "No HP Wali",
    "Alamat", "Username", "Status", "XP", "Koin", "Level Maksimal"
  ];

  const rows = students.map(s => [
    s.nis,
    s.nisn || '',
    s.nama,
    s.gender || 'L',
    s.tempatLahir || '',
    s.tanggalLahir || '',
    s.kelas,
    s.absen || '',
    s.wali || '',
    s.hpWali || '',
    s.alamat || '',
    s.username || s.nis,
    s.status || 'Aktif',
    s.xp || 0,
    s.koin || 0,
    s.levelMax || 1
  ]);

  if (typeof XLSX !== 'undefined') {
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws['!cols'] = [
      { wch: 10 }, { wch: 14 }, { wch: 28 }, { wch: 14 }, { wch: 16 },
      { wch: 16 }, { wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 16 },
      { wch: 32 }, { wch: 14 }, { wch: 14 }, { wch: 10 }, { wch: 10 }, { wch: 14 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DATA_SISWA");
    XLSX.writeFile(wb, `DATA_SISWA_IPS_KELAS_7_${Date.now()}.xlsx`);
    showToast("Seluruh Data Siswa berhasil diekspor ke Excel (.xlsx)! 📊");
  } else {
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.map(c => `"${c}"`).join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DATA_SISWA_IPS_KELAS_7_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Data Siswa berhasil diekspor ke format Excel/CSV! 📊");
  }
}

function triggerImportExcel() {
  const input = document.getElementById('excelFileInput');
  if (input) {
    input.value = ''; // Reset input agar file sama bisa diunggah ulang
    input.click();
  }
}

// ------------------------------------------------------------------------------
// UPLOAD / IMPOR FILE DATA SISWA (.XLSX, .XLS, .CSV)
// ------------------------------------------------------------------------------
function handleExcelFileImport(e) {
  const file = e.target.files[0];
  if (!file) return;

  const fileName = file.name.toLowerCase();
  const isXlsx = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');

  if (isXlsx && typeof XLSX !== 'undefined') {
    // Parsing File Asli Excel (.xlsx / .xls) menggunakan SheetJS
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

        processImportedRows(rawRows);
      } catch (err) {
        console.error('Error parsing XLSX:', err);
        showToast('Gagal memproses file Excel. Pastikan format file sesuai template.', 'wrong');
      }
    };
    reader.readAsArrayBuffer(file);
  } else {
    // Parsing File CSV / Teks
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const text = evt.target.result;
        const lines = text.split(/\r\n|\n/).filter(l => l.trim().length > 0);
        const rawRows = lines.map(line => {
          return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());
        });
        processImportedRows(rawRows);
      } catch (err) {
        console.error('Error parsing CSV:', err);
        showToast('Gagal memproses file CSV.', 'wrong');
      }
    };
    reader.readAsText(file);
  }
}

// Helper Pemrosesan Baris Data Hasil Impor
function processImportedRows(rows) {
  if (!rows || rows.length <= 1) {
    showToast('File tidak memuat baris data siswa!', 'wrong');
    return;
  }

  const students = getSavedStudents();
  let addedCount = 0;
  let updatedCount = 0;

  // Lewati baris 0 (header)
  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i];
    if (!cols || cols.length < 3) continue;

    const nis = String(cols[0]).trim();
    const nama = String(cols[2]).trim();

    if (!nis || !nama) continue;

    const existingIdx = students.findIndex(s => String(s.nis) === nis);

    const newStudent = {
      nis: nis,
      nisn: String(cols[1] || '').trim(),
      nama: nama,
      gender: (String(cols[3] || 'L').toUpperCase().startsWith('P')) ? 'P' : 'L',
      tempatLahir: String(cols[4] || '').trim(),
      tanggalLahir: String(cols[5] || '').trim(),
      kelas: String(cols[6] || 'VII A').trim(),
      absen: parseInt(cols[7]) || (students.length + 1),
      wali: String(cols[8] || '').trim(),
      hpWali: String(cols[9] || '').trim(),
      alamat: String(cols[10] || '').trim(),
      username: String(cols[11] || nis).trim(),
      passHash: String(cols[12] || '123456').trim(),
      status: String(cols[13] || 'Aktif').trim(),
      avatar: existingIdx !== -1 ? (students[existingIdx].avatar || '👦') : '👦',
      xp: existingIdx !== -1 ? (students[existingIdx].xp || 0) : 0,
      koin: existingIdx !== -1 ? (students[existingIdx].koin || 0) : 0,
      levelMax: existingIdx !== -1 ? (students[existingIdx].levelMax || 1) : 1,
      bintangTotal: existingIdx !== -1 ? (students[existingIdx].bintangTotal || 0) : 0,
      badges: existingIdx !== -1 ? (students[existingIdx].badges || ["Penjelajah Pemula"]) : ["Penjelajah Pemula"],
      nilaiTertinggi: existingIdx !== -1 ? (students[existingIdx].nilaiTertinggi || 0) : 0
    };

    if (existingIdx !== -1) {
      students[existingIdx] = newStudent;
      updatedCount++;
    } else {
      students.push(newStudent);
      addedCount++;
    }
  }

  saveStudentsToStorage(students);
  renderStudentTable();
  updateAdminStatsCounters();

  showToast(`Upload Selesai: ${addedCount} siswa baru ditambah, ${updatedCount} siswa diperbarui! 🎉`);
}

// ==============================================================================
// 4. PEMBAGIAN KELAS (DATA KELAS)
// ==============================================================================
function populateClassDropdowns() {
  const classes = getSavedClasses();
  const filterSelect = document.getElementById('filterClassSelect');
  const formSelect = document.getElementById('formStudentKelas');

  if (filterSelect) {
    const currentVal = filterSelect.value;
    filterSelect.innerHTML = `<option value="ALL">Semua Kelas</option>` +
      classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    filterSelect.value = currentVal || 'ALL';
  }

  if (formSelect) {
    formSelect.innerHTML = classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  }
}

function renderClassManagementTable() {
  const tbody = document.getElementById('classTableBody');
  if (!tbody) return;

  const classes = getSavedClasses();
  const students = getSavedStudents();

  tbody.innerHTML = classes.map(c => {
    const studentCount = students.filter(s => s.kelas === c.name).length;
    return `
      <tr>
        <td style="font-weight: 700; color: #fbbf24;">${c.id}</td>
        <td><strong style="color: #fff;">${c.name}</strong></td>
        <td>${c.wali || '-'}</td>
        <td><span class="status-badge status-active">${studentCount} Siswa</span></td>
        <td>
          <div style="display: flex; gap: 8px;">
            <button class="btn-3d btn-3d-yellow" style="padding: 6px 10px; font-size: 0.8rem;" onclick="editClass('${c.id}')">✏️ Edit</button>
            <button class="btn-3d btn-3d-navy" style="padding: 6px 10px; font-size: 0.8rem; color: #ef4444;" onclick="deleteClass('${c.id}')">🗑️ Hapus</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openAddClassModal() {
  AudioPlayer.playClick();
  const name = prompt('Masukkan Nama Kelompok Kelas (Contoh: Kelas VII E):');
  if (!name) return;
  const wali = prompt('Masukkan Nama Wali Kelas (Opsional):') || '-';

  const classes = getSavedClasses();
  const newId = `VII-${String.fromCharCode(65 + classes.length)}`;
  classes.push({ id: newId, name: name, wali: wali, totalSiswa: 0 });

  saveClassesToStorage(classes);
  populateClassDropdowns();
  renderClassManagementTable();
  showToast(`Kelompok ${name} berhasil ditambahkan! 🏛️`);
}

function editClass(id) {
  AudioPlayer.playClick();
  const classes = getSavedClasses();
  const c = classes.find(item => item.id === id);
  if (!c) return;

  const newName = prompt('Ubah Nama Kelompok Kelas:', c.name);
  if (!newName) return;
  const newWali = prompt('Ubah Nama Wali Kelas:', c.wali);

  c.name = newName;
  c.wali = newWali || c.wali;
  saveClassesToStorage(classes);
  populateClassDropdowns();
  renderClassManagementTable();
  showToast('Data kelas berhasil diperbarui.');
}

function deleteClass(id) {
  AudioPlayer.playClick();
  if (confirm(`Yakin ingin menghapus kelas dengan kode: ${id}?`)) {
    let classes = getSavedClasses();
    classes = classes.filter(c => c.id !== id);
    saveClassesToStorage(classes);
    populateClassDropdowns();
    renderClassManagementTable();
    showToast('Kelas berhasil dihapus.');
  }
}

// ==============================================================================
// 5. LAPORAN GURU & HASIL BELAJAR
// ==============================================================================
function renderTeacherReportTab() {
  const tbody = document.getElementById('reportTableBody');
  if (!tbody) return;

  const logs = getSavedGameLogs();
  const students = getSavedStudents();

  // Hitung Nilai Rata-rata Kelas
  const totalScore = logs.reduce((sum, l) => sum + (Number(l.nilai) || 0), 0);
  const avgScore = logs.length > 0 ? Math.round(totalScore / logs.length) : 0;
  const highestScore = logs.length > 0 ? Math.max(...logs.map(l => Number(l.nilai) || 0)) : 0;
  const lowestScore = logs.length > 0 ? Math.min(...logs.map(l => Number(l.nilai) || 0)) : 0;

  const avgEl = document.getElementById('reportAvgScore');
  const highEl = document.getElementById('reportHighScore');
  const lowEl = document.getElementById('reportLowScore');

  if (avgEl) avgEl.textContent = avgScore;
  if (highEl) highEl.textContent = highestScore;
  if (lowEl) lowEl.textContent = lowestScore;

  tbody.innerHTML = logs.map(l => `
    <tr>
      <td style="font-size: 0.8rem; color: #94a3b8;">${l.tanggal}</td>
      <td>
        <strong style="color: #fff;">${l.nama}</strong>
        <div style="font-size: 0.75rem; color: #94a3b8;">NIS: ${l.nis} • ${l.kelas}</div>
      </td>
      <td><strong>${l.materi}</strong> (Lvl ${l.level})</td>
      <td><span class="topic-chip">${l.gameMode || 'Kuis'}</span></td>
      <td>${l.benar} / ${l.jumlahSoal}</td>
      <td style="font-weight: 800; color: ${l.nilai >= 70 ? '#34d399' : '#f87171'}; font-size: 1.1rem;">
        ${l.nilai}
      </td>
      <td>+${l.poin}</td>
      <td>${l.waktuPengerjaan}</td>
      <td>
        <span class="status-badge ${l.tuntas ? 'status-active' : 'status-inactive'}">
          ${l.tuntas ? 'Tuntas' : 'Belum'}
        </span>
      </td>
    </tr>
  `).join('');
}

function exportReportToExcel() {
  AudioPlayer.playClick();
  const logs = getSavedGameLogs();

  const headers = [
    "ID Log", "Tanggal", "NIS", "Nama Siswa", "Kelas", "Materi IPS",
    "Level", "Mode Game", "Jumlah Soal", "Benar", "Salah", "Nilai Akhir",
    "Total Poin", "Waktu Pengerjaan", "Status Ketuntasan", "Bintang"
  ];

  const rows = logs.map(l => [
    `"${l.id}"`,
    `"${l.tanggal}"`,
    `"${l.nis}"`,
    `"${l.nama}"`,
    `"${l.kelas}"`,
    `"${l.materi}"`,
    l.level,
    `"${l.gameMode || 'Kuis'}"`,
    l.jumlahSoal,
    l.benar,
    l.salah,
    l.nilai,
    l.poin,
    `"${l.waktuPengerjaan}"`,
    `"${l.tuntas ? 'Tuntas' : 'Belum Tuntas'}"`,
    l.bintang || 1
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LAPORAN_NILAI_IPS_KELAS_7_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Laporan Nilai Siswa berhasil diunduh ke Excel! 📥');
}

// ==============================================================================
// 6. KELOLA SOAL 8 JENIS PERMAINAN (CRUD, PENCARIAN & PERSISTENSI)
// ==============================================================================

// Beralih Tab Jenis Permainan yang Diedit
function switchEditorGameMode(modeKey) {
  AudioPlayer.playClick();
  AdminState.selectedEditorGameMode = modeKey;
  AdminState.questionCurrentPage = 1;

  // Update tombol active
  document.querySelectorAll('.game-mode-filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`btnModeEdit-${modeKey}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Update label tombol tambah
  const addBtn = document.getElementById('btnAddQuestionDynamicBtn');
  if (addBtn) {
    const titles = {
      mcq: '➕ Tambah Soal Pilihan Ganda',
      guess: '➕ Tambah Tebak Gambar',
      scramble: '➕ Tambah Susun Kata',
      puzzle: '➕ Tambah Puzzle',
      tf: '➕ Tambah Benar/Salah',
      match: '➕ Tambah Pasangkan Jawaban',
      adventure: '➕ Tambah Petualangan',
      duel: '➕ Tambah Soal Duel'
    };
    addBtn.innerHTML = titles[modeKey] || '➕ Tambah Soal';
  }

  renderQuestionsManagementTable();
}

// Buka Editor Langsung dari Modal Pilih Jenis Permainan (Screenshot Gambar)
function openDirectGameModeEditor(modeKey) {
  AudioPlayer.playClick();
  closeModal('gameModeChoiceModal');

  // Buka Dashboard Guru -> Tab Bank Soal
  switchView('viewAdmin');
  switchAdminTab('tabSoal');

  // Pilih mode yang sesuai
  const targetMode = (modeKey === 'current' || !modeKey) ? (AdminState.selectedEditorGameMode || 'mcq') : modeKey;
  switchEditorGameMode(targetMode);

  // Set filter level ke level yang sedang aktif
  const lvlFilter = document.getElementById('filterQuestionLevel');
  if (lvlFilter) {
    lvlFilter.value = String(AppState.currentLevel || 'ALL');
    AdminState.questionLevelFilter = lvlFilter.value;
  }

  renderQuestionsManagementTable();
  const modeNames = {
    mcq: 'Kuis Pilihan Ganda',
    guess: 'Tebak Gambar',
    scramble: 'Susun Kata',
    puzzle: 'Puzzle IPS',
    tf: 'Benar atau Salah',
    match: 'Pasangkan Jawaban',
    adventure: 'Petualangan IPS',
    duel: 'Duel Pengetahuan'
  };
  showToast(`Membuka editor soal untuk: ${modeNames[targetMode] || targetMode} ✏️`);
}

// Render Tabel Soal Dinamis Berdasarkan Mode Permainan Aktif
function renderQuestionsManagementTable() {
  const tbody = document.getElementById('questionsTableBody');
  if (!tbody) return;

  const mode = AdminState.selectedEditorGameMode || 'mcq';
  const search = (AdminState.questionSearchTerm || '').toLowerCase().trim();
  const filterLvl = AdminState.questionLevelFilter || 'ALL';

  if (mode === 'guess') {
    renderGuessTable(tbody, search, filterLvl);
  } else if (mode === 'scramble') {
    renderScrambleTable(tbody, search, filterLvl);
  } else if (mode === 'puzzle') {
    renderPuzzleTable(tbody, search, filterLvl);
  } else if (mode === 'match') {
    renderMatchTable(tbody, search, filterLvl);
  } else if (mode === 'adventure') {
    renderAdventureTable(tbody, search, filterLvl);
  } else {
    // Mode mcq, tf, duel
    renderStandardQuestionsTable(tbody, mode, search, filterLvl);
  }
}

// 1. Tabel Soal Standar (MCQ, Benar/Salah, Duel)
function renderStandardQuestionsTable(tbody, mode, search, filterLvl) {
  let list = ALL_QUESTIONS;
  if (mode === 'tf') {
    list = list.filter(q => q.type === 'tf');
  } else if (mode === 'mcq') {
    list = list.filter(q => q.type !== 'tf');
  }

  if (filterLvl !== 'ALL') {
    list = list.filter(q => q.level === parseInt(filterLvl));
  }

  if (search) {
    list = list.filter(q => {
      const matchQ = (q.q || '').toLowerCase().includes(search);
      const matchTopic = (q.topic || '').toLowerCase().includes(search);
      const matchId = String(q.id).includes(search);
      return matchQ || matchTopic || matchId;
    });
  }

  const countBadge = document.getElementById('totalQuestionsBadge');
  if (countBadge) countBadge.textContent = `${list.length} Soal Tersedia (${mode.toUpperCase()})`;

  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / AdminState.questionPageSize) || 1;
  if (AdminState.questionCurrentPage > totalPages) AdminState.questionCurrentPage = 1;

  const startIdx = (AdminState.questionCurrentPage - 1) * AdminState.questionPageSize;
  const paginated = list.slice(startIdx, startIdx + AdminState.questionPageSize);

  tbody.innerHTML = paginated.map(q => {
    const letters = ['A', 'B', 'C', 'D'];
    const answerLabel = `${letters[q.answer] || 'A'}. ${q.options[q.answer] || '-'}`;

    return `
      <tr>
        <td style="font-weight: 700; color: #38bdf8;">#${q.id}</td>
        <td><span class="status-badge status-active">Level ${q.level}</span></td>
        <td><span class="topic-chip" style="color: #cbd5e1;">${q.topic}</span></td>
        <td><span class="question-difficulty-tag diff-${q.diff || 'sedang'}">${(q.diff || 'sedang').toUpperCase()}</span></td>
        <td style="max-width: 320px; color: #fff; font-weight: 500; line-height: 1.4;">${q.q}</td>
        <td style="color: #34d399; font-weight: 700; font-size: 0.85rem;">${answerLabel}</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn-3d btn-3d-yellow" style="padding: 6px 10px; font-size: 0.8rem;" title="Edit Soal #${q.id}" onclick="openEditQuestionModal(${q.id})">
              ✏️ Edit
            </button>
            <button class="btn-3d btn-3d-navy" style="padding: 6px 10px; font-size: 0.8rem; color: #ef4444;" title="Hapus Soal #${q.id}" onclick="deleteQuestion(${q.id})">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  updateQuestionPaginationInfo(paginated.length, totalItems, totalPages);
}

// 2. Tabel Tebak Gambar
function renderGuessTable(tbody, search, filterLvl) {
  let list = GUESS_IMAGE_DATA;
  if (filterLvl !== 'ALL') list = list.filter(g => g.level === parseInt(filterLvl));
  if (search) {
    list = list.filter(g => (g.question || '').toLowerCase().includes(search) || (g.answer || '').toLowerCase().includes(search));
  }

  const countBadge = document.getElementById('totalQuestionsBadge');
  if (countBadge) countBadge.textContent = `${list.length} Soal Tebak Gambar`;

  tbody.innerHTML = list.map(g => `
    <tr>
      <td style="font-weight: 700; color: #a78bfa;">#${g.id || g.level}</td>
      <td><span class="status-badge status-active">Level ${g.level}</span></td>
      <td><span style="font-size: 1.8rem;">${g.icon}</span></td>
      <td><span class="topic-chip">${g.clue || 'Petunjuk'}</span></td>
      <td style="color: #fff;"><strong>${g.question}</strong></td>
      <td style="color: #34d399; font-weight: 700;">${g.answer}</td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="btn-3d btn-3d-yellow" style="padding: 6px 10px; font-size: 0.8rem;" onclick="openEditGuessModal(${g.id || g.level})">
            ✏️ Edit
          </button>
          <button class="btn-3d btn-3d-navy" style="padding: 6px 10px; font-size: 0.8rem; color: #ef4444;" onclick="deleteGuessItem(${g.id || g.level})">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  updateQuestionPaginationInfo(list.length, list.length, 1);
}

// 3. Tabel Susun Kata
function renderScrambleTable(tbody, search, filterLvl) {
  let list = SCRAMBLE_WORDS_DATA;
  if (filterLvl !== 'ALL') list = list.filter(s => s.level === parseInt(filterLvl));
  if (search) {
    list = list.filter(s => (s.word || '').toLowerCase().includes(search) || (s.clue || '').toLowerCase().includes(search));
  }

  const countBadge = document.getElementById('totalQuestionsBadge');
  if (countBadge) countBadge.textContent = `${list.length} Istilah Susun Kata`;

  tbody.innerHTML = list.map(s => `
    <tr>
      <td style="font-weight: 700; color: #fbbf24;">#${s.id}</td>
      <td><span class="status-badge status-active">Level ${s.level}</span></td>
      <td><span class="topic-chip">${s.topic}</span></td>
      <td><span class="question-difficulty-tag diff-sedang">${s.word.length} Huruf</span></td>
      <td style="color: #fff;"><strong style="font-family: var(--font-game); font-size: 1.15rem; color: #fbbf24; letter-spacing: 2px;">${s.word}</strong></td>
      <td style="color: #cbd5e1; font-size: 0.85rem;">"${s.clue}"</td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="btn-3d btn-3d-yellow" style="padding: 6px 10px; font-size: 0.8rem;" onclick="openEditScrambleModal(${s.id})">
            ✏️ Edit
          </button>
          <button class="btn-3d btn-3d-navy" style="padding: 6px 10px; font-size: 0.8rem; color: #ef4444;" onclick="deleteScrambleItem(${s.id})">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  updateQuestionPaginationInfo(list.length, list.length, 1);
}

// 4. Tabel Puzzle IPS
function renderPuzzleTable(tbody, search, filterLvl) {
  let list = PUZZLE_DATA;
  if (filterLvl !== 'ALL') list = list.filter(p => p.level === parseInt(filterLvl));

  const countBadge = document.getElementById('totalQuestionsBadge');
  if (countBadge) countBadge.textContent = `${list.length} Koleksi Puzzle`;

  tbody.innerHTML = list.map(p => `
    <tr>
      <td style="font-weight: 700; color: #34d399;">#${p.id || p.level}</td>
      <td><span class="status-badge status-active">Level ${p.level}</span></td>
      <td colspan="2"><strong style="color: #fff;">${p.title}</strong></td>
      <td style="font-size: 1.4rem;">${p.tiles.slice(0, 8).join(' ')}</td>
      <td style="color: #38bdf8;">Grid 3x3 (8 Ubin)</td>
      <td>
        <button class="btn-3d btn-3d-yellow" style="padding: 6px 10px; font-size: 0.8rem;" onclick="openEditPuzzleModal(${p.id || p.level})">
          ✏️ Edit
        </button>
      </td>
    </tr>
  `).join('');

  updateQuestionPaginationInfo(list.length, list.length, 1);
}

// 5. Tabel Pasangkan Jawaban
function renderMatchTable(tbody, search, filterLvl) {
  let list = MATCH_PAIRS_DATA;
  if (filterLvl !== 'ALL') list = list.filter(m => m.level === parseInt(filterLvl));

  const countBadge = document.getElementById('totalQuestionsBadge');
  if (countBadge) countBadge.textContent = `${list.length} Kelompok Pasangan`;

  tbody.innerHTML = list.map(m => `
    <tr>
      <td style="font-weight: 700; color: #38bdf8;">#${m.id || m.level}</td>
      <td><span class="status-badge status-active">Level ${m.level}</span></td>
      <td colspan="2"><strong style="color: #fff;">${m.title}</strong></td>
      <td style="color: #cbd5e1; font-size: 0.85rem;">
        ${m.pairs.map(p => `• <strong>${p.left}</strong> ➔ ${p.right}`).join('<br>')}
      </td>
      <td style="color: #34d399; font-weight: 700;">${m.pairs.length} Pasangan</td>
      <td>
        <button class="btn-3d btn-3d-yellow" style="padding: 6px 10px; font-size: 0.8rem;" onclick="openEditMatchModal(${m.id || m.level})">
          ✏️ Edit
        </button>
      </td>
    </tr>
  `).join('');

  updateQuestionPaginationInfo(list.length, list.length, 1);
}

// 6. Tabel Petualangan IPS
function renderAdventureTable(tbody, search, filterLvl) {
  let list = ADVENTURE_QUESTS;

  const countBadge = document.getElementById('totalQuestionsBadge');
  if (countBadge) countBadge.textContent = `${list.length} Misi Ekspedisi`;

  tbody.innerHTML = list.map(a => `
    <tr>
      <td style="font-weight: 700; color: #10b981;">#${a.id}</td>
      <td><span class="status-badge status-active">${a.zone}</span></td>
      <td><strong style="color: #fbbf24;">${a.title}</strong></td>
      <td><span style="font-size: 1.5rem;">${a.icon || '⛵'}</span></td>
      <td style="color: #cbd5e1; font-size: 0.85rem;">${a.desc}</td>
      <td style="color: #34d399; font-weight: 700;">${(a.questions || []).length} Soal Misi</td>
      <td>
        <button class="btn-3d btn-3d-yellow" style="padding: 6px 10px; font-size: 0.8rem;" onclick="openEditAdventureModal('${a.id}')">
          ✏️ Edit
        </button>
      </td>
    </tr>
  `).join('');

  updateQuestionPaginationInfo(list.length, list.length, 1);
}

function updateQuestionPaginationInfo(shown, total, totalPages) {
  const pageInfo = document.getElementById('questionPageInfo');
  if (pageInfo) {
    pageInfo.textContent = `Menampilkan ${shown} dari ${total} Soal (Halaman ${AdminState.questionCurrentPage} / ${totalPages})`;
  }
}

function handleQuestionSearch(val) {
  AdminState.questionSearchTerm = val;
  AdminState.questionCurrentPage = 1;
  renderQuestionsManagementTable();
}

function handleQuestionLevelFilter(val) {
  AdminState.questionLevelFilter = val;
  AdminState.questionCurrentPage = 1;
  renderQuestionsManagementTable();
}

function changeQuestionPage(delta) {
  AudioPlayer.playClick();
  AdminState.questionCurrentPage += delta;
  renderQuestionsManagementTable();
}

// Router Tombol Tambah Soal Sesuai Mode Aktif
function openAddQuestionModal() {
  AudioPlayer.playClick();
  const mode = AdminState.selectedEditorGameMode || 'mcq';

  if (mode === 'guess') {
    openAddGuessModal();
  } else if (mode === 'scramble') {
    openAddScrambleModal();
  } else if (mode === 'match') {
    openAddMatchModal();
  } else if (mode === 'puzzle') {
    openEditPuzzleModal(1);
  } else if (mode === 'adventure') {
    openEditAdventureModal('quest-1');
  } else {
    // Mode MCQ / Benar Salah / Duel
    openAddStandardMCQModal();
  }
}

// BUKA MODAL TAMBAH SOAL STANDAR
function openAddStandardMCQModal() {
  const nextId = ALL_QUESTIONS.length > 0 ? (Math.max(...ALL_QUESTIONS.map(q => q.id)) + 1) : 1;
  document.getElementById('questionFormModalTitle').textContent = `➕ Tambah Soal Baru (#${nextId})`;
  document.getElementById('formQuestionId').value = '';
  document.getElementById('formQuestionLevel').value = '1';
  document.getElementById('formQuestionTopic').value = 'Konsep Dasar Ilmu Sosial';
  document.getElementById('formQuestionDiff').value = 'sedang';
  document.getElementById('formQuestionType').value = AdminState.selectedEditorGameMode === 'tf' ? 'tf' : 'mcq';
  document.getElementById('formQuestionText').value = '';
  document.getElementById('formQuestionOptA').value = AdminState.selectedEditorGameMode === 'tf' ? 'BENAR' : '';
  document.getElementById('formQuestionOptB').value = AdminState.selectedEditorGameMode === 'tf' ? 'SALAH' : '';
  document.getElementById('formQuestionOptC').value = '';
  document.getElementById('formQuestionOptD').value = '';
  document.getElementById('formQuestionAnswer').value = '0';
  document.getElementById('formQuestionExpl').value = '';

  const btnDel = document.getElementById('btnDeleteQuestionInModal');
  if (btnDel) btnDel.style.display = 'none';

  const modal = document.getElementById('questionFormModal');
  if (modal) modal.classList.add('active');
}

// BUKA MODAL EDIT SOAL STANDAR
function openEditQuestionModal(questionId) {
  AudioPlayer.playClick();
  const q = ALL_QUESTIONS.find(item => item.id === questionId);
  if (!q) {
    showToast(`Soal #${questionId} tidak ditemukan!`, 'wrong');
    return;
  }

  document.getElementById('questionFormModalTitle').textContent = `✏️ Edit Soal #${q.id} (Level ${q.level})`;
  document.getElementById('formQuestionId').value = q.id;
  document.getElementById('formQuestionLevel').value = q.level || '1';
  document.getElementById('formQuestionTopic').value = q.topic || '';
  document.getElementById('formQuestionDiff').value = q.diff || 'sedang';
  document.getElementById('formQuestionType').value = q.type || 'mcq';
  document.getElementById('formQuestionText').value = q.q || '';
  document.getElementById('formQuestionOptA').value = q.options && q.options[0] !== undefined ? q.options[0] : '';
  document.getElementById('formQuestionOptB').value = q.options && q.options[1] !== undefined ? q.options[1] : '';
  document.getElementById('formQuestionOptC').value = q.options && q.options[2] !== undefined ? q.options[2] : '';
  document.getElementById('formQuestionOptD').value = q.options && q.options[3] !== undefined ? q.options[3] : '';
  document.getElementById('formQuestionAnswer').value = q.answer !== undefined ? q.answer : 0;
  document.getElementById('formQuestionExpl').value = q.expl || '';

  const btnDel = document.getElementById('btnDeleteQuestionInModal');
  if (btnDel) btnDel.style.display = 'inline-block';

  const modal = document.getElementById('questionFormModal');
  if (modal) modal.classList.add('active');
}

function saveQuestionForm(e) {
  if (e) e.preventDefault();
  AudioPlayer.playClick();

  const idVal = document.getElementById('formQuestionId').value;
  const level = parseInt(document.getElementById('formQuestionLevel').value) || 1;
  const topic = document.getElementById('formQuestionTopic').value.trim();
  const diff = document.getElementById('formQuestionDiff').value;
  const type = document.getElementById('formQuestionType').value;
  const qText = document.getElementById('formQuestionText').value.trim();
  const optA = document.getElementById('formQuestionOptA').value.trim();
  const optB = document.getElementById('formQuestionOptB').value.trim();
  const optC = document.getElementById('formQuestionOptC').value.trim();
  const optD = document.getElementById('formQuestionOptD').value.trim();
  const answer = parseInt(document.getElementById('formQuestionAnswer').value) || 0;
  const expl = document.getElementById('formQuestionExpl').value.trim();

  if (!qText || !optA || !optB) {
    showToast('Pertanyaan serta minimal Pilihan A dan B wajib diisi!', 'wrong');
    return;
  }

  const options = [optA, optB];
  if (optC || optD) {
    options.push(optC || '-');
    options.push(optD || '-');
  }

  if (idVal) {
    const targetId = parseInt(idVal);
    const idx = ALL_QUESTIONS.findIndex(q => q.id === targetId);
    if (idx !== -1) {
      ALL_QUESTIONS[idx] = {
        ...ALL_QUESTIONS[idx],
        level: level,
        topic: topic,
        diff: diff,
        type: type,
        q: qText,
        options: options,
        answer: answer,
        expl: expl
      };
      saveCustomQuestionsToStorage();
      showToast(`Soal #${targetId} berhasil diperbarui! ✅`);
    }
  } else {
    const newId = ALL_QUESTIONS.length > 0 ? (Math.max(...ALL_QUESTIONS.map(q => q.id)) + 1) : 1;
    const newQ = {
      id: newId,
      level: level,
      topic: topic,
      diff: diff,
      type: type,
      q: qText,
      options: options,
      answer: answer,
      expl: expl
    };
    ALL_QUESTIONS.unshift(newQ);
    saveCustomQuestionsToStorage();
    showToast(`Soal baru #${newId} berhasil ditambahkan! 🎉`);
  }

  closeModal('questionFormModal');
  renderQuestionsManagementTable();
}

function deleteQuestion(id) {
  AudioPlayer.playClick();
  if (confirm(`Yakin ingin menghapus soal #${id}?`)) {
    ALL_QUESTIONS = ALL_QUESTIONS.filter(q => q.id !== id);
    saveCustomQuestionsToStorage();
    renderQuestionsManagementTable();
    showToast(`Soal #${id} berhasil dihapus.`);
  }
}

function deleteQuestionFromModal() {
  const idVal = document.getElementById('formQuestionId').value;
  if (!idVal) return;
  deleteQuestion(parseInt(idVal));
  closeModal('questionFormModal');
}

// ------------------------------------------------------------------------------
// MODAL CRUD: TEBAK GAMBAR
// ------------------------------------------------------------------------------
function openAddGuessModal() {
  document.getElementById('guessFormModalTitle').textContent = '➕ Tambah Soal Tebak Gambar Baru';
  document.getElementById('formGuessId').value = '';
  document.getElementById('formGuessLevel').value = '1';
  document.getElementById('formGuessIcon').value = '🗿';
  document.getElementById('formGuessClue').value = '';
  document.getElementById('formGuessQuestion').value = '';
  document.getElementById('formGuessAnswer').value = '';
  document.getElementById('formGuessOptA').value = '';
  document.getElementById('formGuessOptB').value = '';
  document.getElementById('formGuessOptC').value = '';
  document.getElementById('formGuessOptD').value = '';
  document.getElementById('btnDeleteGuess').style.display = 'none';

  const modal = document.getElementById('guessFormModal');
  if (modal) modal.classList.add('active');
}

function openEditGuessModal(id) {
  AudioPlayer.playClick();
  const g = GUESS_IMAGE_DATA.find(item => (item.id === id || item.level === id));
  if (!g) return;

  document.getElementById('guessFormModalTitle').textContent = `✏️ Edit Tebak Gambar (Level ${g.level})`;
  document.getElementById('formGuessId').value = g.id || g.level;
  document.getElementById('formGuessLevel').value = g.level;
  document.getElementById('formGuessIcon').value = g.icon || '🗿';
  document.getElementById('formGuessClue').value = g.clue || '';
  document.getElementById('formGuessQuestion').value = g.question || '';
  document.getElementById('formGuessAnswer').value = g.answer || '';
  document.getElementById('formGuessOptA').value = g.options ? g.options[0] : '';
  document.getElementById('formGuessOptB').value = g.options ? g.options[1] : '';
  document.getElementById('formGuessOptC').value = g.options ? g.options[2] : '';
  document.getElementById('formGuessOptD').value = g.options ? g.options[3] : '';
  document.getElementById('btnDeleteGuess').style.display = 'inline-block';

  const modal = document.getElementById('guessFormModal');
  if (modal) modal.classList.add('active');
}

function saveGuessForm(e) {
  if (e) e.preventDefault();
  AudioPlayer.playClick();

  const idVal = document.getElementById('formGuessId').value;
  const level = parseInt(document.getElementById('formGuessLevel').value) || 1;
  const icon = document.getElementById('formGuessIcon').value.trim() || '🗿';
  const clue = document.getElementById('formGuessClue').value.trim();
  const question = document.getElementById('formGuessQuestion').value.trim();
  const answer = document.getElementById('formGuessAnswer').value.trim().toUpperCase();
  const opts = [
    document.getElementById('formGuessOptA').value.trim(),
    document.getElementById('formGuessOptB').value.trim(),
    document.getElementById('formGuessOptC').value.trim(),
    document.getElementById('formGuessOptD').value.trim()
  ];

  if (idVal) {
    const targetId = parseInt(idVal);
    const idx = GUESS_IMAGE_DATA.findIndex(g => (g.id === targetId || g.level === targetId));
    if (idx !== -1) {
      GUESS_IMAGE_DATA[idx] = { ...GUESS_IMAGE_DATA[idx], level, icon, clue, question, answer, options: opts };
      showToast('Soal Tebak Gambar berhasil diperbarui! ✅');
    }
  } else {
    const newId = GUESS_IMAGE_DATA.length + 1;
    GUESS_IMAGE_DATA.push({ id: newId, level, icon, clue, question, answer, options: opts });
    showToast('Tebak Gambar baru berhasil ditambahkan! 🎉');
  }

  localStorage.setItem('IPS_CUSTOM_GUESS', JSON.stringify(GUESS_IMAGE_DATA));
  closeModal('guessFormModal');
  renderQuestionsManagementTable();
}

function deleteGuessItem(id) {
  const targetId = id || parseInt(document.getElementById('formGuessId').value);
  if (!targetId) return;
  if (confirm('Yakin ingin menghapus soal tebak gambar ini?')) {
    GUESS_IMAGE_DATA = GUESS_IMAGE_DATA.filter(g => (g.id !== targetId && g.level !== targetId));
    localStorage.setItem('IPS_CUSTOM_GUESS', JSON.stringify(GUESS_IMAGE_DATA));
    closeModal('guessFormModal');
    renderQuestionsManagementTable();
    showToast('Soal Tebak Gambar dihapus.');
  }
}

// ------------------------------------------------------------------------------
// MODAL CRUD: SUSUN KATA
// ------------------------------------------------------------------------------
function openAddScrambleModal() {
  document.getElementById('scrambleFormModalTitle').textContent = '➕ Tambah Istilah Susun Kata';
  document.getElementById('formScrambleId').value = '';
  document.getElementById('formScrambleLevel').value = '1';
  document.getElementById('formScrambleWord').value = '';
  document.getElementById('formScrambleTopic').value = '';
  document.getElementById('formScrambleClue').value = '';
  document.getElementById('btnDeleteScramble').style.display = 'none';

  const modal = document.getElementById('scrambleFormModal');
  if (modal) modal.classList.add('active');
}

function openEditScrambleModal(id) {
  AudioPlayer.playClick();
  const s = SCRAMBLE_WORDS_DATA.find(item => item.id === id);
  if (!s) return;

  document.getElementById('scrambleFormModalTitle').textContent = `✏️ Edit Susun Kata #${s.id} (${s.word})`;
  document.getElementById('formScrambleId').value = s.id;
  document.getElementById('formScrambleLevel').value = s.level;
  document.getElementById('formScrambleWord').value = s.word;
  document.getElementById('formScrambleTopic').value = s.topic;
  document.getElementById('formScrambleClue').value = s.clue;
  document.getElementById('btnDeleteScramble').style.display = 'inline-block';

  const modal = document.getElementById('scrambleFormModal');
  if (modal) modal.classList.add('active');
}

function saveScrambleForm(e) {
  if (e) e.preventDefault();
  AudioPlayer.playClick();

  const idVal = document.getElementById('formScrambleId').value;
  const level = parseInt(document.getElementById('formScrambleLevel').value) || 1;
  const word = document.getElementById('formScrambleWord').value.trim().toUpperCase().replace(/[^A-Z]/g, '');
  const topic = document.getElementById('formScrambleTopic').value.trim();
  const clue = document.getElementById('formScrambleClue').value.trim();

  if (idVal) {
    const targetId = parseInt(idVal);
    const idx = SCRAMBLE_WORDS_DATA.findIndex(s => s.id === targetId);
    if (idx !== -1) {
      SCRAMBLE_WORDS_DATA[idx] = { ...SCRAMBLE_WORDS_DATA[idx], level, word, topic, clue };
      showToast(`Susun Kata "${word}" berhasil diperbarui! ✅`);
    }
  } else {
    const newId = SCRAMBLE_WORDS_DATA.length > 0 ? (Math.max(...SCRAMBLE_WORDS_DATA.map(s => s.id)) + 1) : 1;
    SCRAMBLE_WORDS_DATA.push({ id: newId, level, word, topic, clue });
    showToast(`Susun Kata "${word}" berhasil ditambahkan! 🎉`);
  }

  localStorage.setItem('IPS_CUSTOM_SCRAMBLE', JSON.stringify(SCRAMBLE_WORDS_DATA));
  closeModal('scrambleFormModal');
  renderQuestionsManagementTable();
}

function deleteScrambleItem(id) {
  const targetId = id || parseInt(document.getElementById('formScrambleId').value);
  if (!targetId) return;
  if (confirm('Yakin ingin menghapus istilah susun kata ini?')) {
    SCRAMBLE_WORDS_DATA = SCRAMBLE_WORDS_DATA.filter(s => s.id !== targetId);
    localStorage.setItem('IPS_CUSTOM_SCRAMBLE', JSON.stringify(SCRAMBLE_WORDS_DATA));
    closeModal('scrambleFormModal');
    renderQuestionsManagementTable();
    showToast('Istilah Susun Kata dihapus.');
  }
}

// ------------------------------------------------------------------------------
// MODAL CRUD: PASANGKAN JAWABAN
// ------------------------------------------------------------------------------
function openAddMatchModal() {
  document.getElementById('matchFormModalTitle').textContent = '➕ Tambah Kelompok Pasangkan Jawaban';
  document.getElementById('formMatchId').value = '';
  document.getElementById('formMatchLevel').value = '1';
  document.getElementById('formMatchTitle').value = '';
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`formMatchL${i}`).value = '';
    document.getElementById(`formMatchR${i}`).value = '';
  }
  document.getElementById('btnDeleteMatch').style.display = 'none';

  const modal = document.getElementById('matchFormModal');
  if (modal) modal.classList.add('active');
}

function openEditMatchModal(id) {
  AudioPlayer.playClick();
  const m = MATCH_PAIRS_DATA.find(item => (item.id === id || item.level === id));
  if (!m) return;

  document.getElementById('matchFormModalTitle').textContent = `✏️ Edit Pasangkan Jawaban (Level ${m.level})`;
  document.getElementById('formMatchId').value = m.id || m.level;
  document.getElementById('formMatchLevel').value = m.level;
  document.getElementById('formMatchTitle').value = m.title;

  for (let i = 1; i <= 4; i++) {
    const pair = m.pairs && m.pairs[i - 1] ? m.pairs[i - 1] : { left: '', right: '' };
    document.getElementById(`formMatchL${i}`).value = pair.left;
    document.getElementById(`formMatchR${i}`).value = pair.right;
  }
  document.getElementById('btnDeleteMatch').style.display = 'inline-block';

  const modal = document.getElementById('matchFormModal');
  if (modal) modal.classList.add('active');
}

function saveMatchForm(e) {
  if (e) e.preventDefault();
  AudioPlayer.playClick();

  const idVal = document.getElementById('formMatchId').value;
  const level = parseInt(document.getElementById('formMatchLevel').value) || 1;
  const title = document.getElementById('formMatchTitle').value.trim();

  const pairs = [];
  for (let i = 1; i <= 4; i++) {
    const l = document.getElementById(`formMatchL${i}`).value.trim();
    const r = document.getElementById(`formMatchR${i}`).value.trim();
    if (l && r) pairs.push({ left: l, right: r });
  }

  if (idVal) {
    const targetId = parseInt(idVal);
    const idx = MATCH_PAIRS_DATA.findIndex(m => (m.id === targetId || m.level === targetId));
    if (idx !== -1) {
      MATCH_PAIRS_DATA[idx] = { ...MATCH_PAIRS_DATA[idx], level, title, pairs };
      showToast('Pasangan Jawaban berhasil diperbarui! ✅');
    }
  } else {
    const newId = MATCH_PAIRS_DATA.length + 1;
    MATCH_PAIRS_DATA.push({ id: newId, level, title, pairs });
    showToast('Kelompok Pasangan baru ditambahkan! 🎉');
  }

  localStorage.setItem('IPS_CUSTOM_MATCH', JSON.stringify(MATCH_PAIRS_DATA));
  closeModal('matchFormModal');
  renderQuestionsManagementTable();
}

function deleteMatchItem(id) {
  const targetId = id || parseInt(document.getElementById('formMatchId').value);
  if (!targetId) return;
  if (confirm('Yakin ingin menghapus kelompok pasangan jawaban ini?')) {
    MATCH_PAIRS_DATA = MATCH_PAIRS_DATA.filter(m => (m.id !== targetId && m.level !== targetId));
    localStorage.setItem('IPS_CUSTOM_MATCH', JSON.stringify(MATCH_PAIRS_DATA));
    closeModal('matchFormModal');
    renderQuestionsManagementTable();
    showToast('Kelompok pasangan dihapus.');
  }
}

// ------------------------------------------------------------------------------
// MODAL CRUD: PUZZLE IPS
// ------------------------------------------------------------------------------
function openEditPuzzleModal(id) {
  AudioPlayer.playClick();
  const p = PUZZLE_DATA.find(item => (item.id === id || item.level === id)) || PUZZLE_DATA[0];

  document.getElementById('formPuzzleId').value = p.id || p.level;
  document.getElementById('formPuzzleLevel').value = p.level;
  document.getElementById('formPuzzleTitle').value = p.title;
  document.getElementById('formPuzzleTiles').value = p.tiles.slice(0, 8).join(', ');

  const modal = document.getElementById('puzzleFormModal');
  if (modal) modal.classList.add('active');
}

function savePuzzleForm(e) {
  if (e) e.preventDefault();
  AudioPlayer.playClick();

  const idVal = parseInt(document.getElementById('formPuzzleId').value);
  const level = parseInt(document.getElementById('formPuzzleLevel').value) || 1;
  const title = document.getElementById('formPuzzleTitle').value.trim();
  const rawTiles = document.getElementById('formPuzzleTiles').value.split(',').map(t => t.trim()).filter(t => t.length > 0);

  const tiles = [...rawTiles.slice(0, 8), ''];

  const idx = PUZZLE_DATA.findIndex(p => (p.id === idVal || p.level === idVal));
  if (idx !== -1) {
    PUZZLE_DATA[idx] = { ...PUZZLE_DATA[idx], level, title, tiles };
    showToast('Puzzle IPS berhasil diperbarui! ✅');
  } else {
    PUZZLE_DATA.push({ id: PUZZLE_DATA.length + 1, level, title, grid: 3, tiles });
    showToast('Puzzle baru berhasil ditambahkan! 🎉');
  }

  localStorage.setItem('IPS_CUSTOM_PUZZLE', JSON.stringify(PUZZLE_DATA));
  closeModal('puzzleFormModal');
  renderQuestionsManagementTable();
}

// ------------------------------------------------------------------------------
// MODAL CRUD: PETUALANGAN IPS
// ------------------------------------------------------------------------------
function openEditAdventureModal(id) {
  AudioPlayer.playClick();
  const a = ADVENTURE_QUESTS.find(item => String(item.id) === String(id)) || ADVENTURE_QUESTS[0];

  document.getElementById('formAdventureId').value = a.id;
  document.getElementById('formAdvZone').value = a.zone;
  document.getElementById('formAdvTitle').value = a.title;
  document.getElementById('formAdvDesc').value = a.desc;

  const q1 = (a.questions && a.questions[0]) ? a.questions[0] : { q: '', opts: ['', '', '', ''], ans: 0, expl: '' };
  document.getElementById('formAdvQ1Text').value = q1.q;
  document.getElementById('formAdvQ1OptA').value = q1.opts[0] || '';
  document.getElementById('formAdvQ1OptB').value = q1.opts[1] || '';
  document.getElementById('formAdvQ1OptC').value = q1.opts[2] || '';
  document.getElementById('formAdvQ1OptD').value = q1.opts[3] || '';
  document.getElementById('formAdvQ1Ans').value = q1.ans || 0;
  document.getElementById('formAdvQ1Expl').value = q1.expl || '';

  const modal = document.getElementById('adventureFormModal');
  if (modal) modal.classList.add('active');
}

function saveAdventureForm(e) {
  if (e) e.preventDefault();
  AudioPlayer.playClick();

  const idVal = document.getElementById('formAdventureId').value;
  const zone = document.getElementById('formAdvZone').value.trim();
  const title = document.getElementById('formAdvTitle').value.trim();
  const desc = document.getElementById('formAdvDesc').value.trim();

  const q1 = {
    q: document.getElementById('formAdvQ1Text').value.trim(),
    opts: [
      document.getElementById('formAdvQ1OptA').value.trim(),
      document.getElementById('formAdvQ1OptB').value.trim(),
      document.getElementById('formAdvQ1OptC').value.trim(),
      document.getElementById('formAdvQ1OptD').value.trim()
    ],
    ans: parseInt(document.getElementById('formAdvQ1Ans').value) || 0,
    expl: document.getElementById('formAdvQ1Expl').value.trim()
  };

  const idx = ADVENTURE_QUESTS.findIndex(a => String(a.id) === String(idVal));
  if (idx !== -1) {
    ADVENTURE_QUESTS[idx] = {
      ...ADVENTURE_QUESTS[idx],
      zone,
      title,
      desc,
      questions: [q1]
    };
    showToast('Misi Petualangan berhasil diperbarui! ✅');
  }

  localStorage.setItem('IPS_CUSTOM_ADVENTURE', JSON.stringify(ADVENTURE_QUESTS));
  closeModal('adventureFormModal');
  renderQuestionsManagementTable();
}

// RESET SEMUA BANK SOAL KE DEFAULT
function resetQuestionsToDefault() {
  AudioPlayer.playClick();
  if (confirm('Apakah Anda yakin ingin mereset seluruh bank soal dan konten 8 jenis game ke data standar bawaan sistem?')) {
    localStorage.removeItem('IPS_CUSTOM_QUESTIONS');
    localStorage.removeItem('IPS_CUSTOM_GUESS');
    localStorage.removeItem('IPS_CUSTOM_SCRAMBLE');
    localStorage.removeItem('IPS_CUSTOM_MATCH');
    localStorage.removeItem('IPS_CUSTOM_PUZZLE');
    localStorage.removeItem('IPS_CUSTOM_ADVENTURE');

    ALL_QUESTIONS = initQuestionBank();
    GUESS_IMAGE_DATA = DEFAULT_GUESS_DATA;
    SCRAMBLE_WORDS_DATA = DEFAULT_SCRAMBLE_DATA;
    MATCH_PAIRS_DATA = DEFAULT_MATCH_DATA;
    PUZZLE_DATA = DEFAULT_PUZZLE_DATA;
    ADVENTURE_QUESTS = DEFAULT_ADVENTURE_DATA;

    renderQuestionsManagementTable();
    showToast('Seluruh bank soal 8 jenis game berhasil direset ke standar! 🔄');
  }
}

function saveCustomQuestionsToStorage() {
  try {
    localStorage.setItem('IPS_CUSTOM_QUESTIONS', JSON.stringify(ALL_QUESTIONS));
  } catch (e) {
    console.warn('Gagal menyimpan soal kustom:', e);
  }
}

// ==============================================================================
// 7. PENGATURAN & SINKRONISASI GOOGLE APPS SCRIPT
// ==============================================================================
function loadSettingsTab() {
  const url = localStorage.getItem('IPS_GAS_URL') || '';
  const urlInput = document.getElementById('cfgGasUrl');
  if (urlInput) urlInput.value = url;
}

function saveGasUrlSettings() {
  AudioPlayer.playClick();
  const urlInput = document.getElementById('cfgGasUrl');
  if (urlInput) {
    const url = urlInput.value.trim();
    localStorage.setItem('IPS_GAS_URL', url);
    showToast('Tautan Backend Google Apps Script Disimpan! 🌐');
    testGasConnection(url);
  }
}

async function testGasConnection(url) {
  if (!url) {
    showToast('Masukkan URL Web App Google Apps Script terlebih dahulu.', 'warning');
    return;
  }
  showToast('Menguji koneksi ke Google Apps Script...');
  try {
    const res = await fetch(`${url}?action=ping`);
    const data = await res.json();
    if (data.status === 'success') {
      showToast('Koneksi ke Google Sheets Backend BERHASIL! 🟢');
    } else {
      showToast('Respon diterima namun status: ' + data.message, 'warning');
    }
  } catch (err) {
    showToast('Koneksi langsung browser ke GAS memerlukan penyebaran Web App "Execute as: Me" dan "Who has access: Anyone". Data tetap tersimpan offline!', 'warning');
  }
}

async function syncStudentToGAS(student) {
  const gasUrl = localStorage.getItem('IPS_GAS_URL');
  if (!gasUrl) return;

  try {
    fetch(gasUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'saveStudent', student: student })
    });
  } catch (e) {
    console.warn('Gagal sync ke GAS:', e);
  }
}

// Helper Tutup Modal
function closeModal(modalId) {
  AudioPlayer.playClick();
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}
