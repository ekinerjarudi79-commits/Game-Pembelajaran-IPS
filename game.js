/**
 * ==============================================================================
 * IPS ADVENTURE – GAME ENGINE (game.js)
 * Mengelola 8 Mode Game, Web Audio API Synthesizer, Confetti Engine,
 * Sistem Level, Poin, Bintang, XP, dan Sinkronisasi Data Siswa
 * ==============================================================================
 */

// STATE UTAMA APLIKASI
const AppState = {
  currentUser: null,
  currentLevel: 1,
  currentGameMode: 'mcq', // 'mcq' | 'guess' | 'scramble' | 'puzzle' | 'tf' | 'match' | 'adventure' | 'duel'
  isStudyMode: false, // true = tanpa batas waktu, false = mode ujian bertenggat
  soundEnabled: true,
  bgmEnabled: false,
  questionsQueue: [],
  currentIndex: 0,
  score: 0,
  points: 0,
  correctCount: 0,
  wrongCount: 0,
  timerInterval: null,
  timeLeft: 20,
  maxTime: 20,
  duelCombo: 0,
  startTime: null
};

// ==============================================================================
// 1. WEB AUDIO API SYNTHESIZER (ZERO-DEPENDENCY SOUND ENGINE)
// ==============================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmOscillator = null;
    this.bgmGain = null;
    this.bgmInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type, duration, startTime = 0, gainVal = 0.2) {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    } catch (e) {
      console.warn('Audio playTone error:', e);
    }
  }

  playCorrect() {
    this.playTone(523.25, 'triangle', 0.15, 0, 0.25); // C5
    this.playTone(659.25, 'triangle', 0.25, 0.12, 0.25); // E5
    this.playTone(783.99, 'triangle', 0.4, 0.24, 0.3); // G5
  }

  playWrong() {
    this.playTone(220, 'sawtooth', 0.2, 0, 0.3); // A3
    this.playTone(185, 'sawtooth', 0.3, 0.18, 0.3); // F#3
  }

  playClick() {
    this.playTone(800, 'sine', 0.04, 0, 0.15);
  }

  playLevelUp() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.3, idx * 0.12, 0.3);
    });
  }

  toggleBgm() {
    AppState.bgmEnabled = !AppState.bgmEnabled;
    const btn = document.getElementById('bgmToggleBtn');
    if (btn) {
      btn.innerHTML = AppState.bgmEnabled ? '🎵 Musik: ON' : '🔇 Musik: OFF';
      btn.classList.toggle('active', AppState.bgmEnabled);
    }

    if (AppState.bgmEnabled) {
      this.startSimpleBgm();
      showToast('Musik Latar Diaktifkan 🎶');
    } else {
      this.stopSimpleBgm();
      showToast('Musik Latar Dimatikan 🔇');
    }
  }

  startSimpleBgm() {
    this.init();
    if (!this.ctx) return;
    this.stopSimpleBgm();

    const melody = [
      261.63, 329.63, 392.00, 523.25, 392.00, 329.63,
      293.66, 369.99, 440.00, 587.33, 440.00, 369.99
    ];
    let noteIdx = 0;

    this.bgmInterval = setInterval(() => {
      if (!AppState.bgmEnabled) {
        this.stopSimpleBgm();
        return;
      }
      this.playTone(melody[noteIdx], 'sine', 0.25, 0, 0.04);
      noteIdx = (noteIdx + 1) % melody.length;
    }, 400);
  }

  stopSimpleBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

const AudioPlayer = new SoundEngine();

// ==============================================================================
// 2. CANVAS CONFETTI CELEBRATION ENGINE
// ==============================================================================
class ConfettiCannon {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animationId = null;
    this.colors = ['#38bdf8', '#fbbf24', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#ffffff'];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  shoot(count = 80) {
    if (!this.canvas || !this.ctx) return;
    this.resize();
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 2 + (Math.random() - 0.5) * 100,
        w: Math.random() * 10 + 6,
        h: Math.random() * 8 + 4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 1.2) * 16,
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.35,
        opacity: 1
      });
    }

    if (!this.animationId) {
      this.loop();
    }
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rSpeed;
      p.opacity -= 0.008;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.loop());
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

let ConfettiEngine = null;

// ==============================================================================
// 3. STORAGE & STATE HELPERS
// ==============================================================================
function getSavedStudents() {
  const data = localStorage.getItem('IPS_STUDENTS');
  if (data) {
    try { return JSON.parse(data); } catch (e) {}
  }
  localStorage.setItem('IPS_STUDENTS', JSON.stringify(INITIAL_STUDENTS));
  return INITIAL_STUDENTS;
}

function saveStudentsToStorage(list) {
  localStorage.setItem('IPS_STUDENTS', JSON.stringify(list));
}

function getSavedClasses() {
  const data = localStorage.getItem('IPS_CLASSES');
  if (data) {
    try { return JSON.parse(data); } catch (e) {}
  }
  localStorage.setItem('IPS_CLASSES', JSON.stringify(DEFAULT_CLASSES));
  return DEFAULT_CLASSES;
}

function saveClassesToStorage(list) {
  localStorage.setItem('IPS_CLASSES', JSON.stringify(list));
}

function getSavedGameLogs() {
  const data = localStorage.getItem('IPS_GAME_LOGS');
  if (data) {
    try { return JSON.parse(data); } catch (e) {}
  }
  localStorage.setItem('IPS_GAME_LOGS', JSON.stringify(INITIAL_GAME_LOGS));
  return INITIAL_GAME_LOGS;
}

function saveGameLogsToStorage(list) {
  localStorage.setItem('IPS_GAME_LOGS', JSON.stringify(list));
}

// Current User Login Session
function getCurrentStudent() {
  if (sessionStorage.getItem('IPS_IS_LOGGED_OUT') === 'true') {
    return null;
  }
  const data = sessionStorage.getItem('IPS_CURRENT_USER');
  if (data) {
    try { return JSON.parse(data); } catch (e) {}
  }
  // Default ke siswa pertama jika belum pernah login
  const students = getSavedStudents();
  return students[0] || null;
}

function setCurrentStudent(student) {
  AppState.currentUser = student;
  sessionStorage.removeItem('IPS_IS_LOGGED_OUT');
  sessionStorage.setItem('IPS_CURRENT_USER', JSON.stringify(student));
  updateUserInterfaceNavbar();
}

// Handler Klik Pill Akun Siswa (Buka Profil jika login, atau Buka Login jika belum)
function handleUserPillClick() {
  const user = AppState.currentUser || getCurrentStudent();
  if (!user) {
    switchView('viewLogin');
  } else {
    switchView('viewProfile');
  }
}

// Handler Logout Akun Siswa
function handleLogout() {
  AudioPlayer.playClick();
  AppState.currentUser = null;
  sessionStorage.removeItem('IPS_CURRENT_USER');
  sessionStorage.setItem('IPS_IS_LOGGED_OUT', 'true');
  updateUserInterfaceNavbar();
  showToast('Anda telah berhasil logout. Silakan login kembali! 👋');
  switchView('viewLogin');
}

// Update Top Navbar Profile & Stats
function updateUserInterfaceNavbar() {
  const user = AppState.currentUser || getCurrentStudent();
  const avatarEl = document.getElementById('navUserAvatar');
  const nameEl = document.getElementById('navUserName');
  const xpEl = document.getElementById('navUserXP');
  const coinsEl = document.getElementById('navUserCoins');
  const logoutBtn = document.getElementById('navLogoutBtn');
  const loginBtn = document.getElementById('navLoginBtn');

  // Update Hero Character Card di Home
  const heroAvatar = document.getElementById('homeCharacterAvatar');
  const heroName = document.getElementById('homeCharacterName');
  const heroRole = document.getElementById('homeCharacterRole');
  const heroAccountBtn = document.getElementById('homeAccountBtn');
  const heroLogoutBtn = document.getElementById('homeLogoutBtn');

  if (!user) {
    if (avatarEl) avatarEl.textContent = '👤';
    if (nameEl) nameEl.textContent = 'Belum Login';
    if (xpEl) xpEl.textContent = '0 XP';
    if (coinsEl) coinsEl.textContent = '0 🪙';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'inline-flex';

    if (heroAvatar) heroAvatar.textContent = '🎒';
    if (heroName) heroName.textContent = 'Silakan Login Siswa';
    if (heroRole) heroRole.textContent = 'Klik tombol Login untuk masuk';
    if (heroAccountBtn) heroAccountBtn.textContent = '🔑 Login Siswa';
    if (heroLogoutBtn) heroLogoutBtn.style.display = 'none';
    return;
  }

  if (avatarEl) avatarEl.textContent = user.avatar || '👦';
  if (nameEl) nameEl.textContent = `${user.nama} (${user.kelas})`;
  if (xpEl) xpEl.textContent = `${user.xp || 0} XP`;
  if (coinsEl) coinsEl.textContent = `${user.koin || 0} 🪙`;
  if (logoutBtn) logoutBtn.style.display = 'inline-flex';
  if (loginBtn) loginBtn.style.display = 'none';

  if (heroAvatar) heroAvatar.textContent = user.avatar || '👦';
  if (heroName) heroName.textContent = user.nama || 'Penjelajah Muda IPS';
  if (heroRole) heroRole.textContent = `Kelas ${user.kelas || 'VII'} • Absen ${user.absen || '-'}`;
  if (heroAccountBtn) heroAccountBtn.textContent = '🔑 Ganti Akun';
  if (heroLogoutBtn) heroLogoutBtn.style.display = 'inline-block';
}

// Toast Notifier
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🔔</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==============================================================================
// 4. VIEW NAVIGATION / ROUTER
// ==============================================================================
function switchView(viewId) {
  AudioPlayer.playClick();
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Refresh data khusus view tertentu
  if (viewId === 'viewLevelSelect') {
    renderLevelGrid();
    initShuffleSettings();
  } else if (viewId === 'viewLeaderboard') {
    renderLeaderboardView();
  } else if (viewId === 'viewProfile') {
    renderProfileView();
  } else if (viewId === 'viewAdmin') {
    initAdminDashboard();
  } else if (viewId === 'viewMaterials') {
    renderMaterialsView();
  } else if (viewId === 'viewDailyChallenge') {
    renderDailyChallengeView();
  } else if (viewId === 'viewLogin') {
    initLoginStudentFilters();
  }
}

// ==============================================================================
// 5. GAME ENGINE: START, TIMER & QUESTION FLOW
// ==============================================================================
function startGame(levelId, gameMode = 'mcq', isStudy = false) {
  AudioPlayer.playClick();
  AppState.currentLevel = levelId;
  AppState.currentGameMode = gameMode;
  AppState.isStudyMode = isStudy;
  AppState.score = 0;
  AppState.points = 0;
  AppState.correctCount = 0;
  AppState.wrongCount = 0;
  AppState.currentIndex = 0;
  AppState.duelCombo = 0;
  AppState.startTime = new Date();

  // Filter bank soal sesuai Level atau Campuran Semua Level
  let pool = ALL_QUESTIONS;
  let lvlMeta = { title: 'Tantangan Acak Campuran (Level 1 - 6)', code: 'MIX' };

  if (levelId && levelId > 0) {
    pool = ALL_QUESTIONS.filter(q => q.level === levelId);
    if (pool.length === 0) pool = ALL_QUESTIONS;
    lvlMeta = DEFAULT_LEVELS.find(l => l.id === levelId) || DEFAULT_LEVELS[0];
  }

  // Cek pengaturan acak soal
  const shuffleQ = localStorage.getItem('IPS_SHUFFLE_QUESTIONS') !== 'false';
  if (shuffleQ) {
    pool = [...pool].sort(() => Math.random() - 0.5);
  }

  // Ambil 10-15 soal
  const questionCount = levelId === 0 ? 15 : 10;
  AppState.questionsQueue = pool.slice(0, questionCount);

  // Masuk ke view Game Arena
  switchView('viewGameArena');

  // Set info judul & indikator
  const titleEl = document.getElementById('arenaLevelTitle');
  const modeEl = document.getElementById('arenaModeTag');

  if (titleEl) {
    titleEl.textContent = levelId === 0 ? `🎲 ${lvlMeta.title}` : `Level ${levelId}: ${lvlMeta.title}`;
  }
  if (modeEl) {
    modeEl.textContent = getModeName(gameMode) + (isStudy ? ' (Mode Belajar)' : '');
  }

  // Render game sesuai mode
  renderCurrentQuestion();
}

function getModeName(modeKey) {
  const map = {
    mcq: 'Kuis Pilihan Ganda',
    guess: 'Tebak Gambar',
    scramble: 'Susun Kata',
    puzzle: 'Puzzle IPS',
    tf: 'Benar atau Salah',
    match: 'Pasangkan Jawaban',
    adventure: 'Petualangan IPS',
    duel: 'Duel Pengetahuan'
  };
  return map[modeKey] || 'Kuis IPS';
}

function renderCurrentQuestion() {
  clearInterval(AppState.timerInterval);

  if (AppState.currentIndex >= AppState.questionsQueue.length) {
    finishGame();
    return;
  }

  const q = AppState.questionsQueue[AppState.currentIndex];
  const container = document.getElementById('arenaGameBody');
  const progressFill = document.getElementById('arenaProgressBar');
  const counterEl = document.getElementById('arenaQuestionCounter');
  const scoreBadge = document.getElementById('arenaCurrentScore');
  const timerBadge = document.getElementById('arenaTimerBadge');

  // Update progress bar & score counter
  const pct = ((AppState.currentIndex + 1) / AppState.questionsQueue.length) * 100;
  if (progressFill) progressFill.style.width = `${pct}%`;
  if (counterEl) counterEl.textContent = `Soal ${AppState.currentIndex + 1} / ${AppState.questionsQueue.length}`;
  if (scoreBadge) scoreBadge.textContent = `${AppState.points} Poin`;

  // Start Timer jika bukan mode belajar
  if (!AppState.isStudyMode) {
    AppState.timeLeft = (AppState.currentGameMode === 'duel') ? 12 : 25;
    AppState.maxTime = AppState.timeLeft;
    if (timerBadge) {
      timerBadge.style.display = 'flex';
      timerBadge.classList.remove('urgent');
      timerBadge.innerHTML = `⏱️ <span>${AppState.timeLeft}s</span>`;
    }
    AppState.timerInterval = setInterval(() => {
      AppState.timeLeft--;
      if (timerBadge) {
        timerBadge.innerHTML = `⏱️ <span>${AppState.timeLeft}s</span>`;
        if (AppState.timeLeft <= 5) timerBadge.classList.add('urgent');
      }
      if (AppState.timeLeft <= 0) {
        clearInterval(AppState.timerInterval);
        handleTimeOut();
      }
    }, 1000);
  } else {
    if (timerBadge) timerBadge.style.display = 'none';
  }

  // Render berdasarkan mode permainan
  if (AppState.currentGameMode === 'match') {
    renderMatchPairsMode(container, AppState.currentLevel);
  } else if (AppState.currentGameMode === 'scramble') {
    renderScrambleMode(container, q);
  } else if (AppState.currentGameMode === 'puzzle') {
    renderPuzzleMode(container, AppState.currentLevel);
  } else if (AppState.currentGameMode === 'guess') {
    renderGuessImageMode(container, q);
  } else if (AppState.currentGameMode === 'adventure') {
    renderAdventureMode(container, AppState.currentLevel);
  } else {
    // Default: MCQ, True/False, Duel
    renderStandardMCQMode(container, q);
  }
}

// ------------------------------------------------------------------------------
// MODE 1 & 5 & 8: KUIS PILIHAN GANDA / BENAR-SALAH / DUEL
// ------------------------------------------------------------------------------
function renderStandardMCQMode(container, q) {
  // Acak pilihan jawaban jika MCQ dan opsi acak diaktifkan
  const shuffleOpt = localStorage.getItem('IPS_SHUFFLE_OPTIONS') !== 'false';
  let optionsWithIndex = q.options.map((opt, idx) => ({ text: opt, originalIdx: idx }));
  if (q.type !== 'tf' && shuffleOpt) {
    optionsWithIndex = optionsWithIndex.sort(() => Math.random() - 0.5);
  }

  const letters = ['A', 'B', 'C', 'D'];

  container.innerHTML = `
    <div class="question-box">
      <span class="question-difficulty-tag diff-${q.diff}">${q.diff.toUpperCase()} • ${q.topic}</span>
      <h3 class="question-text">${q.q}</h3>
    </div>
    <div class="options-grid" id="optionsGridContainer">
      ${optionsWithIndex.map((opt, i) => `
        <button class="option-btn" onclick="submitAnswer(${opt.originalIdx}, this)">
          <div class="option-letter">${letters[i] || (i + 1)}</div>
          <div class="option-text">${opt.text}</div>
        </button>
      `).join('')}
    </div>
    <div class="explanation-card" id="questionExplanationBox">
      <h4>💡 Pembahasan</h4>
      <p id="explanationContent">${q.expl || 'Pemahaman konsep penting pada topik IPS ini.'}</p>
      <div style="margin-top: 14px; text-align: right;">
        <button class="btn-3d btn-3d-yellow" onclick="nextQuestion()">Lanjut Soal Berikutnya ➡️</button>
      </div>
    </div>
  `;
}

// ------------------------------------------------------------------------------
// MODE 2: TEBAK GAMBAR IPS (ICON / CLUE VISUAL)
// ------------------------------------------------------------------------------
function renderGuessImageMode(container, q) {
  const guessItem = GUESS_IMAGE_DATA.find(g => g.level === AppState.currentLevel) || GUESS_IMAGE_DATA[0];
  const options = guessItem.options.sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="question-box">
      <span class="question-difficulty-tag diff-sedang">TEBAK GAMBAR & PETUNJUK IPS</span>
      <div style="font-size: 5rem; margin: 15px 0; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.3));">${guessItem.icon}</div>
      <p style="color: #cbd5e1; margin-bottom: 10px; font-style: italic;">"${guessItem.clue}"</p>
      <h3 class="question-text">${guessItem.question}</h3>
    </div>
    <div class="options-grid">
      ${options.map((opt, i) => `
        <button class="option-btn" onclick="submitGuessAnswer('${opt}', '${guessItem.answer}', this)">
          <div class="option-letter">${String.fromCharCode(65 + i)}</div>
          <div class="option-text">${opt}</div>
        </button>
      `).join('')}
    </div>
    <div class="explanation-card" id="questionExplanationBox">
      <h4>💡 Pembahasan Tebak Gambar</h4>
      <p>Jawaban yang benar adalah <strong>${guessItem.answer}</strong>. ${guessItem.clue}</p>
      <div style="margin-top: 14px; text-align: right;">
        <button class="btn-3d btn-3d-yellow" onclick="nextQuestion()">Lanjut Soal Berikutnya ➡️</button>
      </div>
    </div>
  `;
}

function submitGuessAnswer(selected, correct, btnEl) {
  clearInterval(AppState.timerInterval);
  const isCorrect = selected.toUpperCase() === correct.toUpperCase();
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  if (isCorrect) {
    btnEl.classList.add('selected-correct');
    AudioPlayer.playCorrect();
    AppState.correctCount++;
    AppState.points += 10 + (AppState.isStudyMode ? 0 : Math.min(5, Math.floor(AppState.timeLeft / 4)));
    showToast('+10 Poin! Tebakan Tepat! 🎉');
  } else {
    btnEl.classList.add('selected-wrong');
    AudioPlayer.playWrong();
    AppState.wrongCount++;
    showToast('Tebakan belum tepat, coba perhatikan kembali.', 'wrong');
  }

  document.getElementById('questionExplanationBox').classList.add('show');
}

// ------------------------------------------------------------------------------
// MODE 3: SUSUN KATA (ANAGRAM SCRAMBLE)
// ------------------------------------------------------------------------------
let scrambleState = {
  originalWord: "",
  placedLetters: [],
  tiles: []
};

function renderScrambleMode(container, q) {
  let pool = SCRAMBLE_WORDS_DATA.filter(w => w.level === AppState.currentLevel);
  if (pool.length === 0) pool = SCRAMBLE_WORDS_DATA;
  const targetItem = pool[AppState.currentIndex % pool.length] || pool[0];
  const targetWord = (targetItem.word || 'SOSIALISASI').toUpperCase();
  scrambleState.originalWord = targetWord;
  scrambleState.placedLetters = [];

  const shuffledLetters = targetWord.split('').sort(() => Math.random() - 0.5);
  scrambleState.tiles = shuffledLetters.map((char, id) => ({ id, char, used: false }));

  container.innerHTML = `
    <div class="question-box">
      <span class="question-difficulty-tag diff-sedang">SUSUN KATA ISTILAH IPS</span>
      <h3 class="question-text">Susun huruf-huruf di bawah ini menjadi istilah IPS yang tepat:</h3>
      <p style="color: #fbbf24; font-size: 0.95rem; margin-top: 6px;">💡 Petunjuk: "${targetItem.clue}"</p>
    </div>
    
    <div class="scramble-target-row" id="scrambleTargetRow">
      ${targetWord.split('').map((_, i) => `<div class="target-slot" id="slot-${i}">_</div>`).join('')}
    </div>

    <div class="scramble-slots" id="scrambleLetterTiles">
      ${scrambleState.tiles.map((tile) => `
        <div class="scramble-tile" id="tile-${tile.id}" onclick="handleTileClick(${tile.id})">${tile.char}</div>
      `).join('')}
    </div>

    <div style="display: flex; justify-content: center; gap: 14px; margin-top: 15px;">
      <button class="btn-3d btn-3d-navy" onclick="resetScrambleWord()">🔄 Ulangi Huruf</button>
      <button class="btn-3d btn-3d-green" onclick="verifyScrambleWord()">✅ Periksa Jawaban</button>
    </div>

    <div class="explanation-card" id="questionExplanationBox">
      <h4>💡 Pembahasan</h4>
      <p>Kata yang tepat adalah: <strong>${targetWord}</strong>. ${targetItem.clue}</p>
      <div style="margin-top: 14px; text-align: right;">
        <button class="btn-3d btn-3d-yellow" onclick="nextQuestion()">Lanjut Soal Berikutnya ➡️</button>
      </div>
    </div>
  `;
}

// ------------------------------------------------------------------------------
// MODE 7: PETUALANGAN IPS (ZONA NUSANTARA EXPEDITION)
// ------------------------------------------------------------------------------
function renderAdventureMode(container, levelId) {
  let quests = ADVENTURE_QUESTS.filter(a => a.id === levelId);
  if (quests.length === 0) quests = ADVENTURE_QUESTS;
  const quest = quests[0] || ADVENTURE_QUESTS[0];
  const qList = quest.questions || [];
  const qItem = qList[AppState.currentIndex % qList.length] || qList[0];

  const letters = ['A', 'B', 'C', 'D'];

  container.innerHTML = `
    <div class="question-box">
      <span class="question-difficulty-tag diff-sedang">⛵ ${quest.zone}</span>
      <h3 style="color: #fbbf24; font-family: var(--font-game); font-size: 1.4rem; margin: 8px 0;">${quest.title}</h3>
      <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.5; margin-bottom: 14px;">"${quest.desc}"</p>
      <div style="border-top: 1px dashed rgba(56,189,248,0.3); padding-top: 14px; font-weight: 600; font-size: 1.15rem; color: #fff;">
        ${qItem.q}
      </div>
    </div>
    <div class="options-grid">
      ${qItem.opts.map((opt, i) => `
        <button class="option-btn" onclick="submitAdventureAnswer(${i}, ${qItem.ans}, this)">
          <div class="option-letter">${letters[i]}</div>
          <div class="option-text">${opt}</div>
        </button>
      `).join('')}
    </div>
    <div class="explanation-card" id="questionExplanationBox">
      <h4>💡 Catatan Misi Ekspedisi</h4>
      <p>${qItem.expl || 'Misi berhasil diselesaikan dengan baik!'}</p>
      <div style="margin-top: 14px; text-align: right;">
        <button class="btn-3d btn-3d-yellow" onclick="nextQuestion()">Lanjut Soal Berikutnya ➡️</button>
      </div>
    </div>
  `;
}

function submitAdventureAnswer(chosenIdx, correctIdx, btnEl) {
  clearInterval(AppState.timerInterval);
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  if (chosenIdx === correctIdx) {
    btnEl.classList.add('selected-correct');
    AudioPlayer.playCorrect();
    AppState.correctCount++;
    AppState.points += 15;
    showToast('Tantangan Petualangan Berhasil Diselesaikan! +15 Poin ⛵');
  } else {
    btnEl.classList.add('selected-wrong');
    AudioPlayer.playWrong();
    AppState.wrongCount++;
    allBtns[correctIdx].classList.add('selected-correct');
    showToast('Jawaban ekspedisi belum tepat!', 'wrong');
  }

  document.getElementById('questionExplanationBox').classList.add('show');
}

function handleTileClick(tileId) {
  AudioPlayer.playClick();
  const tile = scrambleState.tiles.find(t => t.id === tileId);
  if (!tile || tile.used) return;

  tile.used = true;
  scrambleState.placedLetters.push(tile);

  const tileEl = document.getElementById(`tile-${tile.id}`);
  if (tileEl) tileEl.style.opacity = '0.2';

  updateScrambleSlots();
}

function updateScrambleSlots() {
  for (let i = 0; i < scrambleState.originalWord.length; i++) {
    const slot = document.getElementById(`slot-${i}`);
    if (slot) {
      slot.textContent = scrambleState.placedLetters[i] ? scrambleState.placedLetters[i].char : '_';
    }
  }
}

function resetScrambleWord() {
  AudioPlayer.playClick();
  scrambleState.placedLetters = [];
  scrambleState.tiles.forEach(t => t.used = false);
  document.querySelectorAll('.scramble-tile').forEach(el => el.style.opacity = '1');
  updateScrambleSlots();
}

function verifyScrambleWord() {
  clearInterval(AppState.timerInterval);
  const result = scrambleState.placedLetters.map(l => l.char).join('');
  const isCorrect = result === scrambleState.originalWord;

  if (isCorrect) {
    AudioPlayer.playCorrect();
    AppState.correctCount++;
    AppState.points += 15;
    showToast('Hebat! Susunan Kata Tepat! +15 Poin 🎉');
  } else {
    AudioPlayer.playWrong();
    AppState.wrongCount++;
    showToast(`Kurang tepat! Kata yang benar adalah: ${scrambleState.originalWord}`, 'wrong');
  }

  document.getElementById('questionExplanationBox').classList.add('show');
}

// ------------------------------------------------------------------------------
// MODE 4: PUZZLE IPS (SLIDING TILES)
// ------------------------------------------------------------------------------
let puzzleTiles = [];
function renderPuzzleMode(container, levelId) {
  const pData = PUZZLE_DATA.find(p => p.level === levelId) || PUZZLE_DATA[0];
  puzzleTiles = [...pData.tiles];

  container.innerHTML = `
    <div class="question-box">
      <span class="question-difficulty-tag diff-sedang">PUZZLE INTERAKTIF IPS</span>
      <h3 class="question-text">${pData.title}</h3>
      <p style="color: #cbd5e1; font-size: 0.88rem; margin-top: 6px;">Susun ikon/potongan gambar ini ke posisi yang harmonis!</p>
    </div>
    
    <div class="puzzle-board" id="puzzleBoardGrid">
      ${puzzleTiles.map((tile, i) => `
        <div class="puzzle-tile ${tile === '' ? 'empty' : ''}" id="pTile-${i}" onclick="swapPuzzleTile(${i})">
          ${tile}
        </div>
      `).join('')}
    </div>

    <div style="text-align: center; margin-top: 20px;">
      <button class="btn-3d btn-3d-green" onclick="completePuzzle()">Selesaikan Puzzle ✨</button>
    </div>

    <div class="explanation-card" id="questionExplanationBox">
      <h4>💡 Harmoni Pengetahuan</h4>
      <p>Selamat! Kamu telah merangkai simbol-simbol edukasi IPS dengan teratur.</p>
      <div style="margin-top: 14px; text-align: right;">
        <button class="btn-3d btn-3d-yellow" onclick="nextQuestion()">Lanjut Soal Berikutnya ➡️</button>
      </div>
    </div>
  `;
}

function swapPuzzleTile(idx) {
  AudioPlayer.playClick();
  const emptyIdx = puzzleTiles.indexOf('');
  const canSwap = [idx - 1, idx + 1, idx - 3, idx + 3].includes(emptyIdx);

  if (canSwap) {
    const temp = puzzleTiles[idx];
    puzzleTiles[idx] = puzzleTiles[emptyIdx];
    puzzleTiles[emptyIdx] = temp;

    // Render ulang tiles
    const b1 = document.getElementById(`pTile-${idx}`);
    const b2 = document.getElementById(`pTile-${emptyIdx}`);
    if (b1 && b2) {
      b1.innerHTML = puzzleTiles[idx];
      b1.className = `puzzle-tile ${puzzleTiles[idx] === '' ? 'empty' : ''}`;
      b2.innerHTML = puzzleTiles[emptyIdx];
      b2.className = `puzzle-tile ${puzzleTiles[emptyIdx] === '' ? 'empty' : ''}`;
    }
  }
}

function completePuzzle() {
  clearInterval(AppState.timerInterval);
  AudioPlayer.playCorrect();
  AppState.correctCount++;
  AppState.points += 20;
  showToast('Puzzle Berhasil Diselesaikan! +20 Poin 🧩');
  document.getElementById('questionExplanationBox').classList.add('show');
}

// ------------------------------------------------------------------------------
// MODE 6: PASANGKAN JAWABAN (MATCH PAIRS)
// ------------------------------------------------------------------------------
let matchState = {
  selectedLeft: null,
  matchesMade: 0,
  totalPairs: 4
};

function renderMatchPairsMode(container, levelId) {
  const matchGroup = MATCH_PAIRS_DATA.find(m => m.level === levelId) || MATCH_PAIRS_DATA[0];
  matchState.selectedLeft = null;
  matchState.matchesMade = 0;
  matchState.totalPairs = matchGroup.pairs.length;

  const leftItems = matchGroup.pairs.map((p, i) => ({ id: i, text: p.left }));
  const rightItems = matchGroup.pairs.map((p, i) => ({ id: i, text: p.right })).sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="question-box">
      <span class="question-difficulty-tag diff-sedang">PASANGKAN JAWABAN</span>
      <h3 class="question-text">${matchGroup.title}</h3>
      <p style="color: #cbd5e1; font-size: 0.88rem; margin-top: 6px;">Pilih istilah di sisi kiri, lalu klik pengertian yang tepat di sisi kanan!</p>
    </div>

    <div class="match-pairs-container">
      <div class="match-column" id="matchColLeft">
        ${leftItems.map(item => `
          <div class="match-item" id="left-item-${item.id}" onclick="handleMatchLeftClick(${item.id})">
            ${item.text}
          </div>
        `).join('')}
      </div>
      <div class="match-column" id="matchColRight">
        ${rightItems.map(item => `
          <div class="match-item" id="right-item-${item.id}" onclick="handleMatchRightClick(${item.id})">
            ${item.text}
          </div>
        `).join('')}
      </div>
    </div>

    <div class="explanation-card" id="questionExplanationBox">
      <h4>💡 Konsep Pasangan Sempurna</h4>
      <p>Semua pasangan istilah dan pengertian IPS telah berhasil kamu cocokkan dengan akurat!</p>
      <div style="margin-top: 14px; text-align: right;">
        <button class="btn-3d btn-3d-yellow" onclick="nextQuestion()">Lanjut Soal Berikutnya ➡️</button>
      </div>
    </div>
  `;
}

function handleMatchLeftClick(id) {
  AudioPlayer.playClick();
  document.querySelectorAll('#matchColLeft .match-item').forEach(el => el.classList.remove('active-left'));
  const el = document.getElementById(`left-item-${id}`);
  if (el && !el.classList.contains('matched')) {
    el.classList.add('active-left');
    matchState.selectedLeft = id;
  }
}

function handleMatchRightClick(id) {
  if (matchState.selectedLeft === null) {
    showToast('Pilih dulu istilah di sisi kiri!', 'warning');
    return;
  }

  const leftEl = document.getElementById(`left-item-${matchState.selectedLeft}`);
  const rightEl = document.getElementById(`right-item-${id}`);

  if (matchState.selectedLeft === id) {
    // Cocok!
    AudioPlayer.playCorrect();
    leftEl.classList.remove('active-left');
    leftEl.classList.add('matched');
    rightEl.classList.add('matched');
    matchState.selectedLeft = null;
    matchState.matchesMade++;
    AppState.points += 5;
    showToast('Pasangan Cocok! +5 Poin ✨');

    if (matchState.matchesMade >= matchState.totalPairs) {
      clearInterval(AppState.timerInterval);
      AppState.correctCount++;
      document.getElementById('questionExplanationBox').classList.add('show');
    }
  } else {
    // Salah
    AudioPlayer.playWrong();
    showToast('Belum tepat! Coba pasangkan dengan yang lain.', 'wrong');
  }
}

// ------------------------------------------------------------------------------
// SUBMISSION & TRANSITION LOGIC
// ------------------------------------------------------------------------------
function submitAnswer(chosenIdx, btnElement) {
  clearInterval(AppState.timerInterval);
  const q = AppState.questionsQueue[AppState.currentIndex];
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  const isCorrect = chosenIdx === q.answer;

  if (isCorrect) {
    btnElement.classList.add('selected-correct');
    AudioPlayer.playCorrect();
    AppState.correctCount++;

    // Bonus kecepatan (hingga +5 poin)
    let speedBonus = 0;
    if (!AppState.isStudyMode && AppState.timeLeft > 0) {
      speedBonus = Math.min(5, Math.ceil(AppState.timeLeft / 5));
    }

    if (AppState.currentGameMode === 'duel') {
      AppState.duelCombo++;
      AppState.points += (10 + speedBonus) * AppState.duelCombo;
      showToast(`COMBO x${AppState.duelCombo}! +${(10 + speedBonus) * AppState.duelCombo} Poin 🔥`);
    } else {
      AppState.points += 10 + speedBonus;
      showToast(speedBonus > 0 ? `Benar! +10 Poin (+${speedBonus} Bonus Kecepatan ⚡)` : '+10 Poin! Jawaban Tepat 🎉');
    }
  } else {
    btnElement.classList.add('selected-wrong');
    AudioPlayer.playWrong();
    AppState.wrongCount++;
    AppState.duelCombo = 0;

    // Tampilkan tombol yang benar
    allBtns.forEach(b => {
      const onclickAttr = b.getAttribute('onclick');
      if (onclickAttr && onclickAttr.includes(`submitAnswer(${q.answer},`)) {
        b.classList.add('selected-correct');
      }
    });

    showToast('Jawaban Kurang Tepat!', 'wrong');
  }

  // Tampilkan kotak pembahasan
  const expBox = document.getElementById('questionExplanationBox');
  if (expBox) expBox.classList.add('show');
}

function handleTimeOut() {
  AudioPlayer.playWrong();
  AppState.wrongCount++;
  showToast('⏰ Waktu Habis!', 'wrong');
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);
  const expBox = document.getElementById('questionExplanationBox');
  if (expBox) expBox.classList.add('show');
}

function nextQuestion() {
  AudioPlayer.playClick();
  AppState.currentIndex++;
  renderCurrentQuestion();
}

// ------------------------------------------------------------------------------
// GAME OVER & RESULT SUMMARY
// ------------------------------------------------------------------------------
function finishGame() {
  clearInterval(AppState.timerInterval);
  AudioPlayer.playLevelUp();

  const totalQuestions = AppState.questionsQueue.length;
  const scorePercent = Math.round((AppState.correctCount / totalQuestions) * 100);
  const isPassed = scorePercent >= 70;

  // Bintang: 70-79 (1), 80-89 (2), 90-100 (3)
  let stars = 0;
  if (scorePercent >= 90) stars = 3;
  else if (scorePercent >= 80) stars = 2;
  else if (scorePercent >= 70) stars = 1;

  if (isPassed && ConfettiEngine) {
    ConfettiEngine.shoot(120);
  }

  // Catat Durasi
  const elapsedSec = AppState.startTime ? Math.round((new Date() - AppState.startTime) / 1000) : 60;
  const m = Math.floor(elapsedSec / 60);
  const s = elapsedSec % 60;
  const durationStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  // Update profil siswa yang sedang login
  const student = AppState.currentUser || getCurrentStudent();
  if (student) {
    student.xp = (student.xp || 0) + (scorePercent * 5);
    student.koin = (student.koin || 0) + Math.round(AppState.points / 2);
    student.bintangTotal = (student.bintangTotal || 0) + stars;
    if (scorePercent > (student.nilaiTertinggi || 0)) {
      student.nilaiTertinggi = scorePercent;
    }

    // Buka level berikutnya jika tuntas
    if (isPassed && student.levelMax <= AppState.currentLevel && AppState.currentLevel < 6) {
      student.levelMax = AppState.currentLevel + 1;
      showToast(`Level ${student.levelMax} Berhasil Terbuka! 🔓`);
    }

    // Update list di localStorage
    const students = getSavedStudents();
    const idx = students.findIndex(s => s.nis === student.nis);
    if (idx !== -1) {
      students[idx] = student;
      saveStudentsToStorage(students);
    }
    setCurrentStudent(student);
  }

  // Buat Log Permainan Baru
  const newLog = {
    id: 'LOG-' + Date.now().toString().slice(-6),
    nis: student ? student.nis : '1001',
    nama: student ? student.nama : 'Aditya Pratama Putra',
    kelas: student ? student.kelas : 'VII A',
    materi: DEFAULT_LEVELS[AppState.currentLevel - 1].title,
    level: AppState.currentLevel,
    gameMode: getModeName(AppState.currentGameMode),
    jumlahSoal: totalQuestions,
    benar: AppState.correctCount,
    salah: AppState.wrongCount,
    nilai: scorePercent,
    poin: AppState.points,
    waktuPengerjaan: durationStr,
    tanggal: new Date().toLocaleString('id-ID'),
    tuntas: isPassed,
    bintang: stars
  };

  const logs = getSavedGameLogs();
  logs.unshift(newLog);
  saveGameLogsToStorage(logs);

  // Tampilkan Modal Hasil Permainan
  showResultModal(newLog);
}

function showResultModal(log) {
  const modal = document.getElementById('gameResultModal');
  if (!modal) return;

  const starStr = '⭐'.repeat(log.bintang) + '☆'.repeat(3 - log.bintang);

  document.getElementById('modalResultScore').textContent = `${log.nilai}`;
  document.getElementById('modalResultStars').textContent = starStr;
  document.getElementById('modalResultCorrect').textContent = `${log.benar} / ${log.jumlahSoal}`;
  document.getElementById('modalResultPoints').textContent = `+${log.poin} Poin`;
  document.getElementById('modalResultTime').textContent = log.waktuPengerjaan;

  const statusBadge = document.getElementById('modalResultStatus');
  if (statusBadge) {
    if (log.tuntas) {
      statusBadge.textContent = '🎉 TUNTAS! LEVEL BERIKUTNYA TERBUKA';
      statusBadge.className = 'status-badge status-active';
    } else {
      statusBadge.textContent = '⚠️ BELUM TUNTAS (MINIMAL NILAI 70)';
      statusBadge.className = 'status-badge status-inactive';
    }
  }

  modal.classList.add('active');
}

function closeResultModalAndBack() {
  AudioPlayer.playClick();
  const modal = document.getElementById('gameResultModal');
  if (modal) modal.classList.remove('active');
  switchView('viewLevelSelect');
}

function retryGame() {
  AudioPlayer.playClick();
  const modal = document.getElementById('gameResultModal');
  if (modal) modal.classList.remove('active');
  startGame(AppState.currentLevel, AppState.currentGameMode, AppState.isStudyMode);
}

// ==============================================================================
// 6. LEVEL SELECTION VIEW RENDERER
// ==============================================================================
function renderLevelGrid() {
  const grid = document.getElementById('levelSelectionGrid');
  if (!grid) return;

  const student = AppState.currentUser || getCurrentStudent();
  const maxLevel = student ? student.levelMax : 1;

  grid.innerHTML = DEFAULT_LEVELS.map(lvl => {
    const isUnlocked = lvl.id <= maxLevel;
    const isCurrent = lvl.id === maxLevel;

    return `
      <div class="level-card ${isUnlocked ? '' : 'locked'}">
        <div class="level-card-header">
          <div class="level-icon-badge" style="background: ${lvl.bgGradient};">${lvl.icon}</div>
          <div class="level-info">
            <span class="level-badge-tag">${lvl.code}</span>
            <h3>${lvl.title}</h3>
          </div>
        </div>
        <p style="font-size: 0.85rem; color: #94a3b8; min-height: 40px;">${lvl.desc}</p>
        <div class="level-topics-list">
          ${lvl.topics.map(t => `<span class="topic-chip">${t}</span>`).join('')}
        </div>
        <div class="level-footer-stats">
          <div class="level-stars">${isUnlocked ? '⭐⭐⭐' : '<span style="color: #f87171; font-weight: 600; font-size: 0.92rem;">🔒 Terkunci</span>'}</div>
          <div style="display: flex; gap: 8px; align-items: center;">
            ${isUnlocked ? `
              <button class="btn-3d btn-3d-yellow" onclick="openGameModeModal(${lvl.id})">
                Bermain 🎮
              </button>
            ` : `
              <button class="btn-3d btn-3d-green" onclick="unlockLevel(${lvl.id})" title="Klik untuk membuka kunci level ini sekarang">
                🔓 Buka Kunci
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Buka kunci level spesifik
function unlockLevel(levelId) {
  AudioPlayer.playClick();
  const student = AppState.currentUser || getCurrentStudent();
  if (!student) return;

  if ((student.levelMax || 1) < levelId) {
    student.levelMax = levelId;
  }

  // Simpan progres ke storage
  const students = getSavedStudents();
  const idx = students.findIndex(s => s.nis === student.nis);
  if (idx !== -1) {
    students[idx].levelMax = Math.max(students[idx].levelMax || 1, levelId);
    saveStudentsToStorage(students);
  }

  setCurrentStudent(student);
  AudioPlayer.playCorrect();
  if (window.ConfettiEngine) ConfettiEngine.burst();
  showToast(`Level ${levelId} berhasil dibuka! 🔓 Silakan mulai bermain.`);
  renderLevelGrid();
}

// Buka kunci semua level 1-6 sekaligus
function unlockAllLevels() {
  AudioPlayer.playClick();
  const student = AppState.currentUser || getCurrentStudent();
  if (!student) return;

  student.levelMax = 6;

  const students = getSavedStudents();
  const idx = students.findIndex(s => s.nis === student.nis);
  if (idx !== -1) {
    students[idx].levelMax = 6;
    saveStudentsToStorage(students);
  }

  setCurrentStudent(student);
  AudioPlayer.playCorrect();
  if (window.ConfettiEngine) ConfettiEngine.burst();
  showToast('Semua level (Level 1 s/d 6) berhasil dibuka! 🔓🎉');
  renderLevelGrid();
}

// ------------------------------------------------------------------------------
// PENGATURAN ACAK SOAL (SHUFFLE CONTROLS)
// ------------------------------------------------------------------------------
function initShuffleSettings() {
  const chkQ = document.getElementById('chkShuffleQuestions');
  const chkOpt = document.getElementById('chkShuffleOptions');
  const badge = document.getElementById('shuffleStatusBadge');

  const shuffleQ = localStorage.getItem('IPS_SHUFFLE_QUESTIONS') !== 'false';
  const shuffleOpt = localStorage.getItem('IPS_SHUFFLE_OPTIONS') !== 'false';

  if (chkQ) chkQ.checked = shuffleQ;
  if (chkOpt) chkOpt.checked = shuffleOpt;

  if (badge) {
    if (shuffleQ || shuffleOpt) {
      badge.textContent = 'AKTIF';
      badge.style.background = '#10b981';
    } else {
      badge.textContent = 'NONAKTIF';
      badge.style.background = '#64748b';
    }
  }
}

function toggleShuffleSettings() {
  AudioPlayer.playClick();
  const chkQ = document.getElementById('chkShuffleQuestions');
  const chkOpt = document.getElementById('chkShuffleOptions');
  const badge = document.getElementById('shuffleStatusBadge');

  const shuffleQ = chkQ ? chkQ.checked : true;
  const shuffleOpt = chkOpt ? chkOpt.checked : true;

  localStorage.setItem('IPS_SHUFFLE_QUESTIONS', shuffleQ ? 'true' : 'false');
  localStorage.setItem('IPS_SHUFFLE_OPTIONS', shuffleOpt ? 'true' : 'false');

  if (badge) {
    if (shuffleQ || shuffleOpt) {
      badge.textContent = 'AKTIF';
      badge.style.background = '#10b981';
    } else {
      badge.textContent = 'NONAKTIF';
      badge.style.background = '#64748b';
    }
  }

  const statusMsg = `Acak Soal: ${shuffleQ ? 'Aktif' : 'Nonaktif'} | Acak Opsi: ${shuffleOpt ? 'Aktif' : 'Nonaktif'}`;
  showToast(statusMsg);
}

function startRandomMixedQuiz() {
  AudioPlayer.playClick();
  openGameModeModal(0);
}

// Modal Pilih 8 Jenis Game
function openGameModeModal(levelId) {
  AudioPlayer.playClick();
  AppState.currentLevel = levelId;
  const modal = document.getElementById('gameModeChoiceModal');
  if (modal) modal.classList.add('active');
}

function selectAndStartGameMode(modeKey) {
  const modal = document.getElementById('gameModeChoiceModal');
  if (modal) modal.classList.remove('active');
  const isStudy = document.getElementById('chkStudyMode') ? document.getElementById('chkStudyMode').checked : false;
  startGame(AppState.currentLevel, modeKey, isStudy);
}

// ==============================================================================
// 7. LEADERBOARD / PAPAN PERINGKAT
// ==============================================================================
function renderLeaderboardView() {
  const tableBody = document.getElementById('leaderboardTableBody');
  if (!tableBody) return;

  const students = getSavedStudents();
  // Urutkan siswa berdasarkan total XP / nilai tertinggi
  const sorted = [...students].sort((a, b) => (b.xp || 0) - (a.xp || 0));

  tableBody.innerHTML = sorted.slice(0, 10).map((s, idx) => {
    let rankBadge = `${idx + 1}`;
    if (idx === 0) rankBadge = '🥇 Juara 1';
    else if (idx === 1) rankBadge = '🥈 Juara 2';
    else if (idx === 2) rankBadge = '🥉 Juara 3';

    return `
      <tr>
        <td style="font-weight: 800; color: #fbbf24;">${rankBadge}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.5rem;">${s.avatar || '👦'}</span>
            <div>
              <strong>${s.nama}</strong>
              <div style="font-size: 0.75rem; color: #94a3b8;">NIS: ${s.nis}</div>
            </div>
          </div>
        </td>
        <td><span class="status-badge status-active">${s.kelas}</span></td>
        <td style="font-weight: 700; color: #38bdf8;">${s.xp || 0} XP</td>
        <td>Level ${s.levelMax || 1}</td>
        <td style="color: #fbbf24;">${'⭐'.repeat(Math.min(3, Math.floor((s.bintangTotal || 0) / 3)))} (${s.bintangTotal || 0})</td>
        <td>
          ${(s.badges || []).slice(0, 2).map(b => `<span class="topic-chip" style="color: #fbbf24;">🏷️ ${b}</span>`).join(' ')}
        </td>
      </tr>
    `;
  }).join('');
}

// ==============================================================================
// 8. PROFIL PEMAIN & SERTIFIKAT DIGITAL
// ==============================================================================
function renderProfileView() {
  const student = AppState.currentUser || getCurrentStudent();
  if (!student) return;

  const avatarEl = document.getElementById('profAvatar');
  const nameEl = document.getElementById('profName');
  const nisEl = document.getElementById('profNis');
  const classEl = document.getElementById('profClass');
  const xpEl = document.getElementById('profXp');
  const coinsEl = document.getElementById('profCoins');
  const starsEl = document.getElementById('profStars');
  const badgesGrid = document.getElementById('profBadgesContainer');
  const certBtn = document.getElementById('btnOpenCertificate');

  if (avatarEl) avatarEl.textContent = student.avatar || '👦';
  if (nameEl) nameEl.textContent = student.nama;
  if (nisEl) nisEl.textContent = `NIS: ${student.nis} | NISN: ${student.nisn || '-'}`;
  if (classEl) classEl.textContent = student.kelas;
  if (xpEl) xpEl.textContent = `${student.xp || 0} XP`;
  if (coinsEl) coinsEl.textContent = `${student.koin || 0}`;
  if (starsEl) starsEl.textContent = `${student.bintangTotal || 0} ⭐`;

  if (badgesGrid) {
    const allBadges = student.badges || ["Penjelajah Nusantara"];
    badgesGrid.innerHTML = allBadges.map(b => `
      <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(251,191,36,0.3); border-radius: 14px; padding: 14px; text-align: center;">
        <div style="font-size: 2.2rem; margin-bottom: 6px;">🏅</div>
        <strong style="font-size: 0.85rem; color: #fbbf24;">${b}</strong>
      </div>
    `).join('');
  }

  // Tombol Sertifikat Aktif jika sudah selesai level 6 atau skor tinggi
  if (certBtn) {
    if (student.levelMax >= 6 || (student.xp && student.xp >= 600)) {
      certBtn.disabled = false;
      certBtn.style.opacity = '1';
      certBtn.innerHTML = '🎓 Buka Sertifikat Kelulusan Digital';
    } else {
      certBtn.disabled = true;
      certBtn.style.opacity = '0.6';
      certBtn.innerHTML = '🔒 Selesaikan Semua Level untuk Sertifikat';
    }
  }
}

// Buka Modal Sertifikat Digital
function openCertificateModal() {
  AudioPlayer.playClick();
  const student = AppState.currentUser || getCurrentStudent();
  const modal = document.getElementById('certificateModal');
  if (!modal || !student) return;

  document.getElementById('certStudentName').textContent = student.nama.toUpperCase();
  document.getElementById('certStudentNis').textContent = `NIS: ${student.nis} • Kelas: ${student.kelas}`;
  document.getElementById('certDate').textContent = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  modal.classList.add('active');
  if (ConfettiEngine) ConfettiEngine.shoot(80);
}

function printCertificate() {
  window.print();
}

// Ganti Avatar Karakter Siswa
function changeAvatar(emoji) {
  AudioPlayer.playClick();
  const student = AppState.currentUser || getCurrentStudent();
  if (student) {
    student.avatar = emoji;
    const students = getSavedStudents();
    const idx = students.findIndex(s => s.nis === student.nis);
    if (idx !== -1) {
      students[idx] = student;
      saveStudentsToStorage(students);
    }
    setCurrentStudent(student);
    renderProfileView();
    showToast(`Avatar diperbarui menjadi ${emoji}!`);
  }
}

// ==============================================================================
// 9. MATERI PEMBELAJARAN INTERAKTIF
// ==============================================================================
function renderMaterialsView() {
  const container = document.getElementById('materialsContainer');
  if (!container) return;

  container.innerHTML = LEARNING_MATERIALS.map(mod => `
    <div style="background: rgba(30,41,59,0.8); border: 1px solid rgba(56,189,248,0.25); border-radius: 20px; padding: 24px; margin-bottom: 24px;">
      <h3 style="font-family: var(--font-game); font-size: 1.3rem; color: #fbbf24; margin-bottom: 14px;">
        📖 ${mod.title}
      </h3>
      ${mod.sections.map(sec => `
        <div style="margin-bottom: 14px;">
          <h4 style="color: #38bdf8; font-size: 1.05rem; margin-bottom: 6px;">${sec.heading}</h4>
          <p style="color: #e2e8f0; font-size: 0.92rem; line-height: 1.6;">${sec.content}</p>
        </div>
      `).join('')}
      <div style="margin-top: 16px; text-align: right;">
        <button class="btn-3d btn-3d-yellow" onclick="startGame(${mod.levelId}, 'mcq', true)">
          Latihan Soal Materi Ini (Mode Santai) 🎯
        </button>
      </div>
    </div>
  `).join('');
}

// ==============================================================================
// 10. TANTANGAN HARIAN (DAILY CHALLENGE)
// ==============================================================================
function renderDailyChallengeView() {
  const box = document.getElementById('dailyChallengeContent');
  if (!box) return;

  const todayStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  box.innerHTML = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="font-size: 4rem; margin-bottom: 10px;">🌟</div>
      <h3 style="font-family: var(--font-game); font-size: 1.8rem; color: #fbbf24;">Misi Khusus: ${todayStr}</h3>
      <p style="color: #cbd5e1; max-width: 600px; margin: 10px auto;">
        Taklukkan 5 soal acak lintas materi IPS hari ini untuk mendapatkan bonus <strong>+50 XP</strong> dan <strong>10 Koin Emas</strong>!
      </p>
    </div>
    <div style="display: flex; justify-content: center; gap: 14px;">
      <button class="btn-3d btn-3d-yellow" onclick="startDailyChallenge()">
        Mulai Tantangan Harian Sekarang 🔥
      </button>
    </div>
  `;
}

function startDailyChallenge() {
  AudioPlayer.playClick();
  AppState.currentLevel = Math.floor(Math.random() * 6) + 1;
  startGame(AppState.currentLevel, 'duel', false);
}

// ==============================================================================
// 11. LOGIN & AUTENTIKASI SISWA (DENGAN FILTER KELAS & NAMA)
// ==============================================================================

function switchLoginMode(mode) {
  AudioPlayer.playClick();
  const btnFilter = document.getElementById('tabBtnFilterLogin');
  const btnManual = document.getElementById('tabBtnManualLogin');
  const secFilter = document.getElementById('loginFilterModeSection');
  const secManual = document.getElementById('loginManualModeSection');

  if (mode === 'filter') {
    if (btnFilter) btnFilter.classList.add('active');
    if (btnManual) btnManual.classList.remove('active');
    if (secFilter) secFilter.style.display = 'block';
    if (secManual) secManual.style.display = 'none';
    initLoginStudentFilters();
  } else {
    if (btnFilter) btnFilter.classList.remove('active');
    if (btnManual) btnManual.classList.add('active');
    if (secFilter) secFilter.style.display = 'none';
    if (secManual) secManual.style.display = 'block';
  }
}

function initLoginStudentFilters() {
  const classSelect = document.getElementById('loginFilterClass');
  if (!classSelect) return;

  const currentClassVal = classSelect.value || 'all';
  const classes = getSavedClasses();
  const students = getSavedStudents();

  // Kumpulkan semua kelas unik (dari master kelas dan data siswa)
  const classSet = new Set(classes.map(c => c.nama));
  students.forEach(s => {
    if (s.kelas) classSet.add(s.kelas);
  });

  const sortedClasses = Array.from(classSet).sort();

  let html = '<option value="all">🌟 Semua Kelas</option>';
  sortedClasses.forEach(c => {
    html += `<option value="${c}">${c}</option>`;
  });
  classSelect.innerHTML = html;

  if (sortedClasses.includes(currentClassVal)) {
    classSelect.value = currentClassVal;
  } else {
    classSelect.value = 'all';
  }

  // Pre-fill filter search jika belum ada
  const searchInput = document.getElementById('loginFilterSearch');
  if (searchInput && !searchInput.value) {
    searchInput.value = '';
  }

  filterLoginStudents();
}

function filterLoginStudents() {
  const classVal = document.getElementById('loginFilterClass')?.value || 'all';
  const query = (document.getElementById('loginFilterSearch')?.value || '').toLowerCase().trim();
  const studentSelect = document.getElementById('loginSelectStudent');
  const countEl = document.getElementById('loginFilteredCount');
  if (!studentSelect) return;

  const students = getSavedStudents();

  // Filter siswa berdasarkan kelas dan pencarian nama / NIS / NISN
  const filtered = students.filter(s => {
    const matchClass = (classVal === 'all' || s.kelas === classVal);
    const matchText = !query || 
      (s.nama && s.nama.toLowerCase().includes(query)) || 
      (s.nis && s.nis.toString().toLowerCase().includes(query)) ||
      (s.nisn && s.nisn.toString().toLowerCase().includes(query));
    return matchClass && matchText;
  });

  // Urutkan berdasarkan kelas, lalu nomor absen, lalu nama
  filtered.sort((a, b) => {
    if (a.kelas !== b.kelas) return (a.kelas || '').localeCompare(b.kelas || '');
    const numA = parseInt(a.absen, 10) || 999;
    const numB = parseInt(b.absen, 10) || 999;
    if (numA !== numB) return numA - numB;
    return (a.nama || '').localeCompare(b.nama || '');
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} siswa ditemukan`;
  }

  if (filtered.length === 0) {
    studentSelect.innerHTML = '<option value="">-- Tidak ada siswa yang cocok dengan filter --</option>';
    updateLoginStudentPreview(null);
    return;
  }

  // Cari siswa yang sedang aktif untuk di-preselect
  const current = AppState.currentUser || getCurrentStudent();
  let selectedNis = filtered[0].nis;
  if (current && filtered.some(s => s.nis === current.nis)) {
    selectedNis = current.nis;
  }

  studentSelect.innerHTML = filtered.map(s => {
    const isSelected = s.nis === selectedNis ? 'selected' : '';
    const absenTag = s.absen ? `Absen ${s.absen}` : 'No Absen';
    const statusTag = s.status === 'Tidak Aktif' ? ' [Nonaktif]' : '';
    return `<option value="${s.nis}" ${isSelected}>[${s.kelas || '-'}] ${s.nama} • NIS: ${s.nis} (${absenTag})${statusTag}</option>`;
  }).join('');

  onLoginStudentSelected();
}

function onLoginStudentSelected() {
  const select = document.getElementById('loginSelectStudent');
  if (!select) return;
  const nis = select.value;
  const students = getSavedStudents();
  const target = students.find(s => s.nis === nis);
  updateLoginStudentPreview(target);
}

function updateLoginStudentPreview(student) {
  const card = document.getElementById('loginSelectedStudentCard');
  const submitBtn = document.getElementById('btnLoginFilterSubmit');

  if (!student) {
    if (card) card.style.opacity = '0.4';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '❌ Siswa Tidak Ditemukan';
    }
    return;
  }

  if (card) card.style.opacity = '1';

  const avatarEl = document.getElementById('loginPreviewAvatar');
  const nameEl = document.getElementById('loginPreviewName');
  const badgeEl = document.getElementById('loginPreviewClassBadge');
  const nisEl = document.getElementById('loginPreviewNIS');
  const absenEl = document.getElementById('loginPreviewAbsen');
  const statusEl = document.getElementById('loginPreviewStatus');
  const starsEl = document.getElementById('loginPreviewStars');
  const xpEl = document.getElementById('loginPreviewXP');
  const coinsEl = document.getElementById('loginPreviewCoins');

  if (avatarEl) avatarEl.textContent = student.avatar || '👦';
  if (nameEl) nameEl.textContent = student.nama || '-';
  if (badgeEl) badgeEl.textContent = student.kelas || '-';
  if (nisEl) nisEl.textContent = student.nis || '-';
  if (absenEl) absenEl.textContent = student.absen || '-';

  if (statusEl) {
    const isInactive = student.status && student.status.toLowerCase() === 'tidak aktif';
    statusEl.textContent = student.status || 'Aktif';
    statusEl.style.color = isInactive ? '#ef4444' : '#4ade80';
  }

  if (starsEl) starsEl.textContent = student.bintangTotal || 0;
  if (xpEl) xpEl.textContent = student.xp || 0;
  if (coinsEl) coinsEl.textContent = student.koin || 0;

  if (submitBtn) {
    const isInactive = student.status && student.status.toLowerCase() === 'tidak aktif';
    if (isInactive) {
      submitBtn.disabled = true;
      submitBtn.textContent = '⛔ Akun Siswa Ini Tidak Aktif';
    } else {
      submitBtn.disabled = false;
      const firstName = (student.nama || 'Siswa').split(' ')[0];
      submitBtn.textContent = `🚀 Masuk Sebagai ${firstName}`;
    }
  }
}

function handleStudentLoginFromFilter() {
  AudioPlayer.playClick();
  const select = document.getElementById('loginSelectStudent');
  const nis = select?.value;

  if (!nis) {
    showToast('Silakan pilih salah satu siswa dari daftar!', 'wrong');
    return;
  }

  const students = getSavedStudents();
  const target = students.find(s => s.nis === nis);

  if (!target) {
    showToast('Data akun siswa tidak ditemukan!', 'wrong');
    return;
  }

  if (target.status && target.status.toLowerCase() === 'tidak aktif') {
    showToast('Akun ini berstatus Tidak Aktif. Hubungi Guru IPS.', 'wrong');
    return;
  }

  // Masuk langsung tanpa perlu input password
  setCurrentStudent(target);
  showToast(`Berhasil masuk sebagai: ${target.nama}! 🎉`);
  switchView('viewHome');
}

function togglePasswordVisibility(inputId) {
  AudioPlayer.playClick();
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

function handleStudentLogin(e) {
  if (e) e.preventDefault();
  AudioPlayer.playClick();

  const userVal = document.getElementById('loginUsername')?.value.trim();
  const students = getSavedStudents();
  const target = students.find(s => s.username === userVal || s.nis === userVal);

  if (!target) {
    showToast('NIS / Username tidak ditemukan!', 'wrong');
    return;
  }

  if (target.status && target.status.toLowerCase() === 'tidak aktif') {
    showToast('Akun ini berstatus Tidak Aktif. Hubungi Guru.', 'wrong');
    return;
  }

  setCurrentStudent(target);
  showToast(`Selamat datang kembali, ${target.nama}! 🎉`);
  switchView('viewHome');
}

// Inisialisasi saat window dimuat
window.addEventListener('DOMContentLoaded', () => {
  ConfettiEngine = new ConfettiCannon('confettiCanvas');
  const student = getCurrentStudent();
  if (student) {
    setCurrentStudent(student);
  } else {
    updateUserInterfaceNavbar();
    switchView('viewLogin');
  }
  updateUserInterfaceNavbar();
  initLoginStudentFilters();
});
