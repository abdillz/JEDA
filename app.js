/* =========================================================
   JEDA: Jejaring Deteksi Dini dan Pendampingan Jiwa Mahasiswa
   Prototipe aplikasi (HTML, CSS, JavaScript murni)
   Semua data bersifat simulasi dan hanya tersimpan di memori.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------- Ikon (SVG garis) ---------------- */
  const svg = (p, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
  const I = {
    home: svg('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>'),
    leaf: svg('<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19l7-7"/>'),
    chat: svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'),
    cal: svg('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>'),
    chart: svg('<path d="M4 19V5"/><path d="M4 19h16"/><path d="M7 15l4-4 3 3 5-6"/>'),
    back: svg('<path d="M15 5l-7 7 7 7"/>'),
    check: svg('<path d="M5 12l5 5 9-10"/>'),
    lock: svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
    shield: svg('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'),
    heart: svg('<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1z"/>'),
    wind: svg('<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h15a3 3 0 1 1-3 3"/><path d="M3 16h7"/>'),
    book: svg('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>'),
    moon: svg('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'),
    pen: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),
    brain: svg('<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a3 3 0 0 0-3-1z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>'),
    send: svg('<path d="M4 12l16-8-6 16-3-7z"/>'),
    phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    bell: svg('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
    user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>')
  };

  /* ---------------- Instrumen skrining ---------------- */
  const OPTIONS = ['Tidak sama sekali', 'Beberapa hari', 'Lebih dari separuh waktu', 'Hampir setiap hari'];
  const QUESTIONS = [
    // PHQ-9 (gejala depresi)
    { set: 'PHQ', t: 'Kurang berminat atau tidak menikmati saat melakukan sesuatu' },
    { set: 'PHQ', t: 'Merasa murung, sedih, atau putus asa' },
    { set: 'PHQ', t: 'Sulit tidur, sering terbangun, atau justru tidur terlalu banyak' },
    { set: 'PHQ', t: 'Merasa lelah atau kurang bertenaga' },
    { set: 'PHQ', t: 'Nafsu makan berkurang atau makan berlebihan' },
    { set: 'PHQ', t: 'Merasa buruk tentang diri sendiri, merasa gagal, atau mengecewakan diri sendiri maupun keluarga' },
    { set: 'PHQ', t: 'Sulit berkonsentrasi, misalnya saat membaca materi kuliah atau menonton' },
    { set: 'PHQ', t: 'Bergerak atau berbicara sangat lambat sampai orang lain menyadarinya, atau sebaliknya sangat gelisah' },
    { set: 'PHQ', t: 'Terpikir bahwa lebih baik mati atau ingin menyakiti diri sendiri' },
    // GAD-7 (gejala kecemasan)
    { set: 'GAD', t: 'Merasa gugup, cemas, atau tegang' },
    { set: 'GAD', t: 'Tidak mampu menghentikan atau mengendalikan rasa khawatir' },
    { set: 'GAD', t: 'Terlalu mengkhawatirkan berbagai hal' },
    { set: 'GAD', t: 'Sulit untuk bersantai' },
    { set: 'GAD', t: 'Sangat gelisah sampai sulit duduk diam' },
    { set: 'GAD', t: 'Mudah kesal atau jengkel' },
    { set: 'GAD', t: 'Merasa takut seolah-olah sesuatu yang buruk akan terjadi' }
  ];

  const LEVEL = {
    hijau: { name: 'Hijau', title: 'Kondisimu terlihat cukup stabil', text: 'Pertahankan kebiasaan baikmu. Ruang Mandiri bisa membantumu tetap seimbang menjelang ujian.' },
    kuning: { name: 'Kuning', title: 'Kamu sedang menanggung cukup banyak beban', text: 'Gejalamu tergolong ringan. Coba latihan singkat atau ngobrol dengan Teman Cerita, lalu kita cek lagi 4 minggu lagi.' },
    oranye: { name: 'Oranye', title: 'Sebaiknya kamu bicara dengan konselor', text: 'Kamu masuk antrean prioritas. Tim konseling kampus akan menghubungimu paling lambat 72 jam, atau kamu bisa langsung pilih jadwal.' },
    merah: { name: 'Merah', title: 'Kamu tidak sendirian', text: '' }
  };

  function scoreOf(ans) {
    let phq = 0, gad = 0;
    ans.forEach((v, i) => { if (v == null) return; if (i < 9) phq += v; else gad += v; });
    return { phq, gad, item9: ans[8] || 0 };
  }
  function levelOf(s) {
    if (s.item9 > 0) return 'merah';
    const m = Math.max(s.phq, s.gad);
    if (m >= 10) return 'oranye';
    if (m >= 5) return 'kuning';
    return 'hijau';
  }
  const SIM = {
    hijau: [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    kuning: [1, 1, 2, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1],
    oranye: [2, 2, 2, 2, 1, 2, 2, 0, 0, 2, 2, 2, 1, 1, 2, 1],
    merah: [2, 2, 3, 2, 1, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2]
  };

  /* ---------------- State ---------------- */
  const today = new Date();
  const initial = () => ({
    role: 'mahasiswa',
    screen: 'login',
    prev: 'home',
    consent: { data: false, darurat: false },
    answers: new Array(QUESTIONS.length).fill(null),
    q: 0,
    result: null,
    history: [
      { label: 'Awal smt', phq: 4, gad: 3 },
      { label: 'Pra-UTS', phq: 8, gad: 7 },
      { label: 'Cek ulang', phq: 5, gad: 4 }
    ],
    chat: [{ from: 'them', text: 'Hai, terima kasih sudah mau cerita. Apa yang paling berat buatmu minggu ini?' }],
    chatStep: 0,
    typing: false,
    mood: null,
    journal: [{ when: 'Kemarin', mood: 'Lelah', text: 'Revisi proposal belum selesai, tapi tadi sempat jalan sore sebentar.' }],
    booking: { mode: 'daring', day: 1, slot: null, room: false },
    bookings: [],
    article: null,
    queueDone: {},
    breath: false
  });
  let S = initial();

  const app = document.getElementById('app');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------------- Kerangka layar ---------------- */
  const statusbar = () => `<div class="statusbar"><span>09.41</span><span class="sig"><i style="height:5px"></i><i style="height:8px"></i><i style="height:11px"></i><i style="height:14px"></i></span></div>`;
  const MAIN_TABS = ['home', 'mandiri', 'cerita', 'jadwal', 'progres'];
  const TAB_OF = { napas: 'mandiri', jurnal: 'mandiri', artikel: 'mandiri' };

  function tabbar() {
    const cur = TAB_OF[S.screen] || S.screen;
    const t = (id, ic, label) => `<button data-go="${id}" class="${cur === id ? 'is-on' : ''}" aria-label="${label}">${ic}<span>${label}</span></button>`;
    return `<nav class="tabbar">${t('home', I.home, 'Beranda')}${t('mandiri', I.leaf, 'Mandiri')}${t('cerita', I.chat, 'Cerita')}${t('jadwal', I.cal, 'Jadwal')}${t('progres', I.chart, 'Progres')}</nav>`;
  }
  const sosBtn = () => `<button class="sos" data-go="darurat">${I.heart}Butuh bantuan sekarang</button>`;
  const topbar = (title, back = 'home') => `<div class="topbar"><button class="icon-btn" data-go="${back}" aria-label="Kembali">${I.back}</button><h2>${title}</h2></div>`;

  /* ---------------- Layar mahasiswa ---------------- */
  const V = {};

  V.login = () => `
    <div class="view no-nav"><div class="login">
      <div class="login-hero">
        <div class="orb"></div>
        <h1>JEDA</h1>
        <p>Berhenti sejenak, kenali dirimu.</p>
      </div>
      <div>
        <button class="btn" data-go="consent">${I.user}Masuk dengan akun kampus</button>
        <p class="small" style="text-align:center;margin-top:12px">Prototipe untuk Universitas Brawijaya</p>
      </div>
    </div></div>`;

  V.consent = () => {
    const ok = S.consent.data;
    return `
    <div class="view no-nav">
      <h2 class="h-big" style="margin-top:14px">Sebelum mulai</h2>
      <p class="sub">JEDA membantumu memantau kondisi diri dan menghubungkanmu ke layanan konseling kampus bila perlu.</p>
      <ul class="consent-list">
        <li><span class="dot">${I.lock}</span><span>Datamu disimpan terpisah dari sistem akademik dan tidak akan memengaruhi nilaimu.</span></li>
        <li><span class="dot">${I.shield}</span><span>Hasil Cek Rutin bukan diagnosis. Diagnosis hanya dapat ditegakkan oleh tenaga profesional.</span></li>
        <li><span class="dot">${I.check}</span><span>Kamu bisa melihat dan menghapus datamu kapan saja.</span></li>
      </ul>
      <label class="check"><input type="checkbox" data-consent="data" ${S.consent.data ? 'checked' : ''}><span>Saya setuju data saya diproses untuk skrining dan pendampingan.</span></label>
      <label class="check"><input type="checkbox" data-consent="darurat" ${S.consent.darurat ? 'checked' : ''}><span>Saya setuju dihubungi petugas kampus jika hasil menunjukkan kondisi darurat.</span></label>
      <button class="btn" style="margin-top:14px" data-go="home" ${ok ? '' : 'disabled'}>Setuju dan lanjutkan</button>
    </div>`;
  };

  V.home = () => {
    const last = S.result;
    const nextBooking = S.bookings[S.bookings.length - 1];
    return `
    <div class="view">
      <div class="hello">
        <div><p>Selamat pagi,</p><h2>Hai, Rani!</h2></div>
        <div class="avatar" aria-hidden="true">R</div>
      </div>
      <div class="cek-card">
        <div>
          <h3>${last ? 'Cek Rutin selesai' : 'Ujian akhir tinggal seminggu lagi'}</h3>
          <p>${last ? 'Lihat lagi hasil dan saran untukmu.' : 'Cek Rutin semester ini sudah tersedia. Cuma 5 menit.'}</p>
          <button class="btn" data-go="${last ? 'hasil' : 'cekIntro'}">${last ? 'Lihat hasil' : 'Mulai cek'}</button>
        </div>
        <div class="orb sm" aria-hidden="true"></div>
      </div>
      <div class="shortcuts">
        <button class="shortcut" data-go="mandiri"><span class="ic ic-daun">${I.leaf}</span>Ruang Mandiri</button>
        <button class="shortcut" data-go="cerita"><span class="ic ic-lilac">${I.chat}</span>Teman Cerita</button>
        <button class="shortcut" data-go="jadwal"><span class="ic ic-senja">${I.cal}</span>Jadwal</button>
      </div>
      ${last ? `<div class="section-title">Hasil terakhir</div>
      <div class="card"><div class="status-row"><span class="status-dot" style="background:var(--${last.level})"></span><div><h3 style="margin:0">Tingkat ${LEVEL[last.level].name}</h3><p>PHQ-9: ${last.phq}, GAD-7: ${last.gad}</p></div></div></div>` : ''}
      ${nextBooking ? `<div class="section-title">Sesi mendatang</div>${bookingCard(nextBooking)}` : ''}
      <div class="section-title">Untuk minggu ujian</div>
      <button class="module" data-go="napas"><span class="thumb ic-daun">${I.wind}</span><div><h3>Napas 4-7-8</h3><p>Tenangkan diri sebelum masuk ruang ujian</p></div><span class="dur">3 mnt</span></button>
      <button class="module" data-article="tidur"><span class="thumb ic-lilac">${I.moon}</span><div><h3>Tidur cukup menjelang ujian</h3><p>Kenapa begadang justru merugikan</p></div><span class="dur">4 mnt</span></button>
    </div>`;
  };

  V.cekIntro = () => `
    <div class="view no-nav">
      ${topbar('Cek Rutin')}
      <h2 class="h-big">Bagaimana dua minggu terakhirmu?</h2>
      <p class="sub">Ada 16 pertanyaan singkat tentang suasana hati dan rasa cemas. Tidak ada jawaban benar atau salah.</p>
      <ul class="intro-points">
        <li>${I.clock}<span><b>Kurang dari 5 menit.</b> Satu pertanyaan per layar.</span></li>
        <li>${I.lock}<span><b>Rahasia.</b> Jawabanmu tidak terhubung dengan data akademik.</span></li>
        <li>${I.shield}<span><b>Bukan diagnosis.</b> Hasilnya membantumu memilih langkah yang tepat.</span></li>
      </ul>
      <button class="btn" data-action="startCek">Mulai</button>
    </div>`;

  V.cek = () => {
    const q = QUESTIONS[S.q];
    const val = S.answers[S.q];
    const pct = Math.round(((S.q + 1) / QUESTIONS.length) * 100);
    return `
    <div class="view no-nav">
      ${topbar('Cek Rutin', 'cekIntro')}
      <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>
      <div class="q-meta"><span>Pertanyaan ${S.q + 1} dari ${QUESTIONS.length}</span><span>${q.set === 'PHQ' ? 'Suasana hati' : 'Rasa cemas'}</span></div>
      <p class="q-lead">Dalam dua minggu terakhir, seberapa sering kamu...</p>
      <p class="q-text">${q.t}</p>
      ${OPTIONS.map((o, i) => `<button class="opt ${val === i ? 'is-on' : ''}" data-answer="${i}">${o}<span class="tick"></span></button>`).join('')}
      <div class="q-nav">
        ${S.q > 0 ? `<button class="btn ghost" data-action="prevQ">Kembali</button>` : ''}
        <button class="btn" data-action="nextQ" ${val == null ? 'disabled' : ''}>${S.q === QUESTIONS.length - 1 ? 'Lihat hasil' : 'Lanjut'}</button>
      </div>
    </div>`;
  };

  V.hasil = () => {
    const r = S.result;
    if (!r) return V.cekIntro();
    if (r.level === 'merah') return V.darurat(true);
    const L = LEVEL[r.level];
    let actions = '';
    if (r.level === 'hijau') actions = `<button class="btn" data-go="mandiri">Buka Ruang Mandiri</button><button class="btn ghost" data-go="progres">Lihat perkembanganku</button>`;
    if (r.level === 'kuning') actions = `<button class="btn" data-go="napas">Coba latihan napas 3 menit</button><button class="btn lilac" data-go="cerita">Ngobrol dengan Teman Cerita</button>`;
    if (r.level === 'oranye') actions = `<div class="eta">${I.clock}<span>Tim konseling akan menghubungimu paling lambat <b>72 jam</b>.</span></div><button class="btn" data-go="jadwal">Pilih jadwal konseling</button><button class="btn lilac" data-go="cerita">Ngobrol dulu dengan Teman Cerita</button>`;
    return `
    <div class="view no-nav">
      ${topbar('Hasil Cek Rutin')}
      <div class="result-hero">
        <div class="ring c-${r.level}"><span>${L.name}</span></div>
        <h2>${L.title}</h2>
        <p>${L.text}</p>
      </div>
      <div class="scores">
        <div class="score"><b>${r.phq}<small style="font-size:13px;color:var(--tinta-3)">/27</small></b><span>PHQ-9, suasana hati</span></div>
        <div class="score"><b>${r.gad}<small style="font-size:13px;color:var(--tinta-3)">/21</small></b><span>GAD-7, rasa cemas</span></div>
      </div>
      <div class="disclaimer">Hasil ini bukan diagnosis. Ini gambaran awal agar kamu tahu langkah yang bisa diambil.</div>
      ${actions}
      <button class="sos-inline" data-go="darurat">${I.heart}Butuh bantuan sekarang</button>
    </div>`;
  };

  V.darurat = (fromResult) => `
    <div class="view no-nav">
      ${topbar('Bantuan sekarang', fromResult ? 'home' : S.prev)}
      <div class="crisis">
        <h2>Kamu tidak sendirian</h2>
        <p>${fromResult ? 'Jawabanmu menunjukkan kamu sedang sangat tertekan. Petugas siaga konseling kampus sudah menerima notifikasi dan akan menghubungimu hari ini.' : 'Kalau kamu merasa tidak aman atau kewalahan sekarang, hubungi salah satu kontak di bawah ini. Kamu tidak perlu menunggu jadwal.'}</p>
        <button class="btn danger" data-toast="Menghubungi petugas siaga konseling kampus (simulasi)">${I.phone}Hubungi petugas siaga kampus</button>
        <button class="btn ghost" data-toast="Membuka layanan darurat kesehatan jiwa (simulasi)">Hubungi layanan darurat</button>
      </div>
      <div class="card">
        <h3>Sambil menunggu</h3>
        <p>Cari tempat yang tenang, ajak orang yang kamu percaya untuk menemanimu, lalu coba atur napas perlahan.</p>
      </div>
      <button class="btn ghost" data-go="napas">Latihan napas bersama</button>
      ${fromResult ? `<div class="disclaimer" style="margin-top:14px">Hasil ini bukan diagnosis. Petugas akan membantumu menentukan langkah berikutnya.</div>` : ''}
    </div>`;

  V.mandiri = () => `
    <div class="view">
      <h2 class="h-big" style="margin-top:8px">Ruang Mandiri</h2>
      <p class="sub">Latihan singkat untuk membantumu tetap seimbang. Semuanya selesai dalam 5 menit.</p>
      <button class="module" data-go="napas"><span class="thumb ic-daun">${I.wind}</span><div><h3>Napas 4-7-8</h3><p>Tarik 4 detik, tahan 7, embuskan 8</p></div><span class="dur">3 mnt</span></button>
      <button class="module" data-go="jurnal"><span class="thumb ic-senja">${I.pen}</span><div><h3>Jurnal suasana hati</h3><p>Catat perasaanmu hari ini</p></div><span class="dur">2 mnt</span></button>
      <button class="module" data-article="pikiran"><span class="thumb ic-lilac">${I.brain}</span><div><h3>Kenali pikiran otomatis</h3><p>Saat kepala bilang "aku pasti gagal"</p></div><span class="dur">5 mnt</span></button>
      <button class="module" data-article="tidur"><span class="thumb ic-daun">${I.moon}</span><div><h3>Tidur cukup menjelang ujian</h3><p>Kenapa begadang justru merugikan</p></div><span class="dur">4 mnt</span></button>
      <div class="card" style="margin-top:6px"><h3>Butuh lebih dari latihan?</h3><p>Teman Cerita siap mendengarkan, dan konselor kampus bisa kamu jadwalkan kapan saja.</p></div>
    </div>`;

  V.napas = () => `
    <div class="view">
      ${topbar('Napas 4-7-8', 'mandiri')}
      <div class="breath">
        <div class="orb" id="breathOrb"></div>
        <p class="phase" id="breathPhase">${S.breath ? 'Tarik napas' : 'Siap?'}</p>
        <p class="count" id="breathCount">${S.breath ? '' : 'Ikuti gerakan lingkaran selama beberapa putaran.'}</p>
        <button class="btn ${S.breath ? 'ghost' : ''}" data-action="${S.breath ? 'stopBreath' : 'startBreath'}">${S.breath ? 'Selesai' : 'Mulai latihan'}</button>
      </div>
    </div>`;

  const MOODS = [['Tenang', '#5BAE7C'], ['Biasa', '#8FB9C9'], ['Lelah', '#E3B23C'], ['Cemas', '#E57C3A'], ['Sedih', '#6E64A8']];
  V.jurnal = () => `
    <div class="view">
      ${topbar('Jurnal suasana hati', 'mandiri')}
      <p class="sub">Bagaimana perasaanmu hari ini?</p>
      <div class="moods">${MOODS.map(([m, c]) => `<button class="mood ${S.mood === m ? 'is-on' : ''}" data-mood="${m}"><i style="background:${c}"></i>${m}</button>`).join('')}</div>
      <textarea id="journalText" placeholder="Tulis apa saja yang sedang kamu pikirkan..."></textarea>
      <button class="btn" data-action="saveJournal">Simpan catatan</button>
      <div class="section-title" style="margin-top:20px">Catatan sebelumnya</div>
      ${S.journal.map((j) => `<div class="entry"><b>${esc(j.when)}, ${esc(j.mood)}</b><p>${esc(j.text)}</p></div>`).join('')}
    </div>`;

  const ARTICLES = {
    pikiran: {
      title: 'Kenali pikiran otomatis',
      body: `<p>Pikiran otomatis adalah kalimat yang tiba-tiba muncul di kepala, misalnya "aku pasti gagal sidang". Pikiran ini terasa benar, padahal sering kali belum tentu sesuai kenyataan.</p>
      <h3>Coba tiga langkah ini</h3>
      <ol><li>Tulis pikiran yang muncul, apa adanya.</li><li>Tanyakan: bukti apa yang mendukung dan yang membantahnya?</li><li>Susun kalimat yang lebih seimbang, misalnya "proposalku belum sempurna, tapi masih ada waktu untuk revisi".</li></ol>
      <p>Latihan ini tidak menghapus rasa cemas, tetapi membantumu melihat situasi dengan lebih jernih.</p>`
    },
    tidur: {
      title: 'Tidur cukup menjelang ujian',
      body: `<p>Begadang sering terasa produktif, padahal kurang tidur membuat konsentrasi dan daya ingat menurun di hari ujian.</p>
      <h3>Kebiasaan kecil yang membantu</h3>
      <ol><li>Usahakan jam tidur dan bangun yang sama setiap hari.</li><li>Jauhkan ponsel 30 menit sebelum tidur.</li><li>Kurangi kopi setelah sore hari.</li><li>Kalau belum bisa tidur setelah 20 menit, bangun sebentar dan lakukan hal yang menenangkan.</li></ol>`
    }
  };
  V.artikel = () => {
    const a = ARTICLES[S.article] || ARTICLES.tidur;
    return `<div class="view">${topbar(a.title, 'mandiri')}<div class="article">${a.body}</div></div>`;
  };

  V.cerita = () => `
    <div class="chat-wrap">
      <div class="chat-head">
        <button class="icon-btn" data-go="home" aria-label="Kembali">${I.back}</button>
        <div class="pp">D</div>
        <div style="flex:1"><h2>Dimas</h2><p>Konselor sebaya terlatih, disupervisi psikolog</p></div>
      </div>
      <div class="alias">Kamu tampil sebagai <b>Awan Biru</b>. Identitasmu tidak ditampilkan.</div>
      <div class="msgs" id="msgs">
        ${S.chat.map((m) => `<div class="msg ${m.from}">${esc(m.text)}</div>`).join('')}
        ${S.typing ? '<div class="typing"><i></i><i></i><i></i></div>' : ''}
      </div>
      ${S.chat.length < 3 ? `<div class="quick">
        <button data-quick="Lagi capek banget sama proposal skripsi">Capek sama skripsi</button>
        <button data-quick="Beberapa hari ini susah tidur">Susah tidur</button>
        <button data-quick="Cuma pengin cerita aja">Cuma pengin cerita</button>
      </div>` : ''}
      <form class="composer" id="composer" autocomplete="off">
        <input id="chatInput" type="text" placeholder="Tulis pesan..." aria-label="Tulis pesan">
        <button type="submit" aria-label="Kirim">${I.send}</button>
      </form>
    </div>`;

  function dayInfo(offset) {
    const d = new Date(today); d.setDate(d.getDate() + offset);
    return { d, name: d.toLocaleDateString('id-ID', { weekday: 'short' }), num: d.getDate(), month: d.toLocaleDateString('id-ID', { month: 'short' }), full: d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }) };
  }
  const SLOTS = ['09.00', '10.30', '13.00', '14.30', '16.00', '19.00'];
  const TAKEN = { 1: ['10.30'], 2: ['09.00', '14.30'], 3: ['13.00'], 4: [], 5: ['16.00'] };
  function bookingCard(b) {
    const di = dayInfo(b.day);
    return `<div class="card booking"><div class="date"><b>${di.num}</b><small>${di.month}</small></div><div><h3>Konseling ${b.mode === 'daring' ? 'daring' : 'tatap muka'}, ${b.slot}</h3><p>${b.mode === 'daring' ? (b.room ? 'Ruang tenang Gedung Kemahasiswaan sudah dipesan' : 'Tautan dikirim sebelum sesi') : 'Unit Konseling, Gedung Kemahasiswaan'}. Pengingat dikirim sehari sebelumnya.</p></div></div>`;
  }
  V.jadwal = () => {
    const B = S.booking;
    const prio = S.result && (S.result.level === 'oranye' || S.result.level === 'merah');
    const days = [1, 2, 3, 4, 5].map(dayInfo);
    const slots = SLOTS.filter((s) => B.mode === 'daring' || s !== '19.00');
    return `
    <div class="view">
      <h2 class="h-big" style="margin-top:8px">Jadwal konseling</h2>
      <p class="sub">Pilih cara dan waktu yang paling nyaman buatmu.</p>
      ${prio ? `<div class="priority">${I.bell}<span>Kamu ada di antrean prioritas. Slot terdekat disarankan untukmu.</span></div>` : ''}
      <div class="seg-in">
        <button data-mode="daring" class="${B.mode === 'daring' ? 'is-on' : ''}">Daring</button>
        <button data-mode="tatap" class="${B.mode === 'tatap' ? 'is-on' : ''}">Tatap muka</button>
      </div>
      <div class="chips">${days.map((d, i) => `<button class="chip ${B.day === i + 1 ? 'is-on' : ''}" data-day="${i + 1}"><small>${d.name}</small><b>${d.num}</b></button>`).join('')}</div>
      <div class="slots">${slots.map((s) => {
        const taken = (TAKEN[B.day] || []).includes(s);
        return `<button class="slot ${B.slot === s ? 'is-on' : ''}" data-slot="${s}" ${taken ? 'disabled' : ''}>${s}</button>`;
      }).join('')}</div>
      ${B.mode === 'daring' ? `<label class="check"><input type="checkbox" data-room ${B.room ? 'checked' : ''}><span>Pesan ruang tenang di kampus untuk sesi daring ini</span></label>` : ''}
      <button class="btn" style="margin-top:6px" data-action="book" ${B.slot ? '' : 'disabled'}>Konfirmasi jadwal</button>
      ${S.bookings.length ? `<div class="section-title" style="margin-top:22px">Sesi mendatang</div>${S.bookings.map(bookingCard).join('')}` : ''}
    </div>`;
  };

  V.progres = () => {
    const H = S.history;
    const a = H[H.length - 2], b = H[H.length - 1];
    const diff = b.phq - a.phq;
    const msg = diff < 0 ? `Skor suasana hatimu turun dari <b>${a.phq}</b> ke <b>${b.phq}</b>. Kerja bagus, terus jaga kebiasaan baikmu.` : diff > 0 ? `Skor suasana hatimu naik dari <b>${a.phq}</b> ke <b>${b.phq}</b>. Pertimbangkan ngobrol dengan Teman Cerita atau konselor.` : `Skor suasana hatimu stabil di <b>${b.phq}</b>.`;
    return `
    <div class="view">
      <h2 class="h-big" style="margin-top:8px">Perkembanganmu</h2>
      <p class="sub">Grafik dari setiap Cek Rutin yang sudah kamu isi.</p>
      <div class="delta">${msg}</div>
      <div class="chart-card">${chartSVG(H)}
        <div class="legend"><span><i style="background:var(--daun)"></i>PHQ-9</span><span><i style="background:var(--lembayung)"></i>GAD-7</span></div>
      </div>
      <button class="btn" data-action="startCek">Cek ulang sekarang</button>
      <button class="btn ghost" data-go="jurnal">Lihat catatan jurnalku</button>
    </div>`;
  };

  function chartSVG(H) {
    const W = 320, Ht = 200, pl = 28, pr = 22, pt = 10, pb = 28, max = 20;
    const x = (i) => pl + (i * (W - pl - pr)) / Math.max(H.length - 1, 1);
    const y = (v) => pt + (1 - Math.min(v, max) / max) * (Ht - pt - pb);
    const band = (from, to, color) => `<rect x="${pl}" y="${y(to)}" width="${W - pl - pr}" height="${y(from) - y(to)}" fill="${color}" opacity=".13"/>`;
    const line = (key, color) => `<polyline fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${H.map((h, i) => `${x(i)},${y(h[key])}`).join(' ')}"/>` +
      H.map((h, i) => `<circle cx="${x(i)}" cy="${y(h[key])}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"/>`).join('');
    return `<svg viewBox="0 0 ${W} ${Ht}" role="img" aria-label="Grafik skor PHQ-9 dan GAD-7">
      ${band(0, 5, '#5BAE7C')}${band(5, 10, '#E3B23C')}${band(10, 20, '#E57C3A')}
      ${[0, 5, 10, 15, 20].map((v) => `<text x="${pl - 8}" y="${y(v) + 4}" font-size="10" text-anchor="end" fill="#8A9AA1">${v}</text>`).join('')}
      ${line('gad', '#6E64A8')}${line('phq', '#2F7D6D')}
      ${H.map((h, i) => `<text x="${x(i)}" y="${Ht - 8}" font-size="10.5" text-anchor="middle" fill="#51626B">${h.label}</text>`).join('')}
    </svg>`;
  }

  /* ---------------- Layar konselor ---------------- */
  const QUEUE = [
    { id: 'A-214', info: 'Fakultas Teknik, angkatan 2022', level: 'merah', due: 'Sisa 3 jam' },
    { id: 'B-087', info: 'Fakultas Ekonomi dan Bisnis, angkatan 2021', level: 'oranye', due: 'Sisa 41 jam' },
    { id: 'C-332', info: 'FISIP, angkatan 2023', level: 'oranye', due: 'Sisa 58 jam' },
    { id: 'D-019', info: 'FILKOM, angkatan 2022', level: 'kuning', due: 'Dipantau Teman Cerita' }
  ];
  V.konselor = () => {
    const items = [...QUEUE];
    if (S.result && (S.result.level === 'oranye' || S.result.level === 'merah')) {
      items.unshift({ id: 'R-001', info: 'Rani (akun demo), FILKOM, angkatan 2022', level: S.result.level, due: S.result.level === 'merah' ? 'Sisa 6 jam' : 'Sisa 72 jam' });
    }
    items.sort((a, b) => ['merah', 'oranye', 'kuning'].indexOf(a.level) - ['merah', 'oranye', 'kuning'].indexOf(b.level));
    const merah = items.filter((i) => i.level === 'merah').length;
    return `
    <div class="view no-nav">
      <div class="dash-head">
        <p>Unit Konseling Mahasiswa</p>
        <h2>Antrean prioritas</h2>
        <div class="kpis">
          <div class="kpi"><b>${items.length}</b><span>Menunggu</span></div>
          <div class="kpi"><b>${merah}</b><span>Tingkat merah</span></div>
          <div class="kpi"><b>19 jam</b><span>Rata-rata tanggap</span></div>
        </div>
      </div>
      ${items.map((it) => {
        const done = S.queueDone[it.id];
        return `<div class="q-item l-${it.level}">
          <div class="q-top"><div><h3>Mahasiswa ${it.id}</h3><p>${it.info}</p></div><span class="pill ${done ? 'ok' : it.level}">${done ? done : LEVEL[it.level].name}</span></div>
          <p class="small" style="margin:8px 0 0">${I.clock.replace('<svg', '<svg style="width:14px;height:14px;vertical-align:-2px"')} ${it.due}</p>
          ${it.level === 'kuning' ? '' : `<div class="q-actions">
            <button data-queue="${it.id}" data-status="Sudah dihubungi" ${done ? 'disabled' : ''}>Hubungi</button>
            <button class="alt" data-queue="${it.id}" data-status="Terjadwal" ${done ? 'disabled' : ''}>Jadwalkan</button>
          </div>`}
        </div>`;
      }).join('')}
      <p class="small" style="text-align:center;margin-top:10px">Nama asli hanya terlihat oleh konselor yang menangani, sesuai persetujuan mahasiswa.</p>
    </div>`;
  };

  /* ---------------- Layar pimpinan ---------------- */
  const FAK = [['FILKOM', 1.0, 480], ['Teknik', 0.9, 520], ['FEB', 0.8, 410], ['FISIP', 0.75, 380], ['Kedokteran', 1.05, 260], ['Hukum', 0.7, 300], ['FIB', 0.65, 18]];
  const WEEKS = [2, 4, 6, 8, 10, 12, 14, 16];
  function heatVal(f, w) {
    const base = 4.2 * f;
    const exam = w === 8 ? 2.4 : w === 16 ? 3.6 : w === 14 ? 1.6 : w === 6 ? 1 : 0;
    const wobble = ((w * 7 + f * 13) % 5) * 0.25;
    return Math.round((base + exam * f + wobble) * 10) / 10;
  }
  function heatColor(v) {
    const stops = [[0, [191, 224, 206]], [5, [227, 178, 60]], [8, [229, 124, 58]], [11, [209, 73, 91]]];
    for (let i = 1; i < stops.length; i++) {
      if (v <= stops[i][0]) {
        const [a, ca] = stops[i - 1], [b, cb] = stops[i];
        const t = (v - a) / (b - a);
        const c = ca.map((x, k) => Math.round(x + (cb[k] - x) * t));
        return `rgb(${c.join(',')})`;
      }
    }
    return 'rgb(209,73,91)';
  }
  V.pimpinan = () => {
    const f0 = heatVal(FAK[0][1], 12), f1 = heatVal(FAK[0][1], 16);
    const up = Math.round(((f1 - f0) / f0) * 100);
    return `
    <div class="view no-nav">
      <div class="dash-head">
        <p>Direktorat Kemahasiswaan</p>
        <h2>Dasbor kesejahteraan</h2>
        <div class="kpis">
          <div class="kpi"><b>46%</b><span>Ikut Cek Rutin</span></div>
          <div class="kpi"><b>2.358</b><span>Responden</span></div>
          <div class="kpi"><b>87%</b><span>Tanggap ≤ 72 jam</span></div>
        </div>
      </div>
      <div class="section-title">Rata-rata skor GAD-7 per minggu kuliah</div>
      <div class="chart-card" style="padding:12px 8px">
        <table class="heat">
          <thead><tr><th></th>${WEEKS.map((w) => `<th class="${w === 8 || w === 16 ? 'mark' : ''}">${w === 8 ? 'UTS' : w === 16 ? 'UAS' : 'M' + w}</th>`).join('')}</tr></thead>
          <tbody>${FAK.map(([n, f, resp]) => `<tr><th class="fak">${n}</th>${WEEKS.map((w) => {
            if (resp < 20) return `<td class="low" title="Kurang dari 20 responden">&lt;20</td>`;
            const v = heatVal(f, w);
            return `<td style="background:${heatColor(v)}">${v.toFixed(0)}</td>`;
          }).join('')}</tr>`).join('')}</tbody>
        </table>
        <div class="scale"><span>Rendah</span><i></i><span>Tinggi</span></div>
      </div>
      <p class="small">Data anonim dan agregat. Kelompok dengan kurang dari 20 responden tidak ditampilkan agar tidak ada individu yang dapat dikenali.</p>
      <div class="insight">Skor kecemasan di FILKOM naik sekitar ${up}% menjelang UAS dibanding pekan ke-12. Pertimbangkan menambah jam konseling dan meninjau tenggat tugas di pekan 15-16.</div>
    </div>`;
  };

  /* ---------------- Render ---------------- */
  let breathTimer = null;
  function render() {
    stopBreathTimer();
    let html = statusbar();
    let screen = S.screen;
    if (S.role === 'konselor') screen = 'konselor';
    if (S.role === 'pimpinan') screen = 'pimpinan';

    html += (V[screen] || V.home)();

    const studentMain = S.role === 'mahasiswa' && (MAIN_TABS.includes(screen) || TAB_OF[screen]);
    if (studentMain) html += tabbar();
    const showSos = S.role === 'mahasiswa' && !['login', 'consent', 'darurat', 'cerita', 'cek', 'cekIntro', 'hasil'].includes(screen);
    if (showSos) html += sosBtn();
    if (!studentMain && showSos) html = html.replace('class="sos"', 'class="sos" style="bottom:22px"');

    app.innerHTML = html;
    syncPanel();

    if (screen === 'cerita') {
      const box = document.getElementById('msgs');
      if (box) box.scrollTop = box.scrollHeight;
    }
    if (screen === 'napas' && S.breath) runBreath();
    const v = app.querySelector('.view');
    if (v) v.scrollTop = 0;
  }

  function go(screen) {
    if (screen !== S.screen && screen !== 'darurat') S.prev = S.screen;
    if (screen === 'darurat' && S.screen !== 'darurat') S.prev = S.screen;
    if (screen !== 'napas') S.breath = false;
    S.screen = screen;
    render();
  }

  function toast(msg) {
    const old = app.querySelector('.toast'); if (old) old.remove();
    const t = document.createElement('div');
    t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    app.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }

  function finishCek() {
    const s = scoreOf(S.answers);
    const level = levelOf(s);
    S.result = { ...s, level };
    const last = S.history[S.history.length - 1];
    if (last.label === 'Hari ini') S.history.pop();
    S.history.push({ label: 'Hari ini', phq: s.phq, gad: s.gad });
    if (S.history.length > 5) S.history.shift();
    go('hasil');
  }

  /* ---------------- Latihan napas ---------------- */
  function stopBreathTimer() { if (breathTimer) { clearTimeout(breathTimer); breathTimer = null; } }
  function runBreath() {
    const orb = document.getElementById('breathOrb');
    const ph = document.getElementById('breathPhase');
    const ct = document.getElementById('breathCount');
    if (!orb) return;
    const steps = [['Tarik napas', 4, 1.25], ['Tahan', 7, 1.25], ['Embuskan perlahan', 8, 0.85]];
    let i = 0, round = 1;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tick = (label, secs, scale, left) => {
      ph.textContent = label;
      ct.textContent = `${left} detik, putaran ${round} dari 4`;
      if (left === secs) {
        orb.style.transitionDuration = reduce ? '0s' : secs + 's';
        orb.style.transform = `scale(${scale})`;
      }
      if (left > 1) { breathTimer = setTimeout(() => tick(label, secs, scale, left - 1), 1000); return; }
      breathTimer = setTimeout(() => {
        i = (i + 1) % steps.length;
        if (i === 0) round++;
        if (round > 4) { ph.textContent = 'Selesai. Bagaimana rasanya?'; ct.textContent = 'Kamu bisa mengulanginya kapan saja.'; S.breath = false; const b = app.querySelector('[data-action="stopBreath"]'); if (b) { b.textContent = 'Kembali ke Ruang Mandiri'; b.dataset.action = ''; b.dataset.go = 'mandiri'; } return; }
        const [l, sec, sc] = steps[i];
        tick(l, sec, sc, sec);
      }, 1000);
    };
    const [l, sec, sc] = steps[0];
    tick(l, sec, sc, sec);
  }

  /* ---------------- Teman Cerita (simulasi) ---------------- */
  const REPLIES = {
    tidur: 'Susah tidur menjelang ujian itu umum banget. Biasanya kamu tidur jam berapa, dan apa yang ada di kepala waktu mau tidur?',
    skripsi: 'Kedengarannya proposal skripsimu lagi menyita banyak tenaga. Bagian mana yang paling bikin kamu kepikiran?',
    default: [
      'Terima kasih sudah cerita. Aku di sini dan mendengarkan, pelan-pelan saja.',
      'Wajar kok merasa begitu. Kamu sudah sempat istirahat sebentar hari ini?',
      'Kalau kamu mau, aku bisa bantu atur jadwal ngobrol dengan konselor kampus juga. Kamu yang tentukan.'
    ]
  };
  function reply(text) {
    const t = text.toLowerCase();
    if (/tidur|begadang|insom/.test(t)) return REPLIES.tidur;
    if (/skripsi|proposal|tugas|revisi|dosen/.test(t)) return REPLIES.skripsi;
    const r = REPLIES.default[S.chatStep % REPLIES.default.length];
    S.chatStep++;
    return r;
  }
  function sendChat(text) {
    text = text.trim();
    if (!text || S.typing) return;
    S.chat.push({ from: 'me', text });
    S.typing = true;
    render();
    setTimeout(() => {
      S.typing = false;
      S.chat.push({ from: 'them', text: reply(text) });
      if (S.screen === 'cerita') render();
    }, 1300);
  }

  /* ---------------- Event ---------------- */
  app.addEventListener('click', (e) => {
    const el = e.target.closest('button, [data-go]');
    if (!el || el.disabled) return;
    const d = el.dataset;

    if (d.go) return go(d.go);
    if (d.article) { S.article = d.article; return go('artikel'); }
    if (d.toast) return toast(d.toast);
    if (d.answer != null) { S.answers[S.q] = +d.answer; return render(); }
    if (d.mood) { S.mood = d.mood; const txt = document.getElementById('journalText'); const keep = txt ? txt.value : ''; render(); const t2 = document.getElementById('journalText'); if (t2) t2.value = keep; return; }
    if (d.mode) { S.booking.mode = d.mode; S.booking.slot = null; return render(); }
    if (d.day) { S.booking.day = +d.day; S.booking.slot = null; return render(); }
    if (d.slot) { S.booking.slot = d.slot; return render(); }
    if (d.quick) return sendChat(d.quick);
    if (d.queue) { S.queueDone[d.queue] = d.status; render(); return toast(`Mahasiswa ${d.queue}: ${d.status.toLowerCase()}`); }

    switch (d.action) {
      case 'startCek': S.answers = new Array(QUESTIONS.length).fill(null); S.q = 0; return go('cek');
      case 'prevQ': if (S.q > 0) S.q--; return render();
      case 'nextQ':
        if (S.answers[S.q] == null) return;
        if (S.q < QUESTIONS.length - 1) { S.q++; return render(); }
        return finishCek();
      case 'startBreath': S.breath = true; return render();
      case 'stopBreath': S.breath = false; return render();
      case 'saveJournal': {
        const txt = document.getElementById('journalText');
        const v = txt ? txt.value.trim() : '';
        if (!S.mood) return toast('Pilih suasana hatimu dulu.');
        S.journal.unshift({ when: 'Hari ini', mood: S.mood, text: v || '(tanpa catatan)' });
        S.mood = null; render(); return toast('Catatan tersimpan.');
      }
      case 'book': {
        if (!S.booking.slot) return;
        S.bookings.push({ ...S.booking });
        S.booking.slot = null;
        render();
        return toast('Sesi terjadwal. Pengingat dikirim sehari sebelumnya.');
      }
    }
  });

  app.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.consent) { S.consent[t.dataset.consent] = t.checked; return render(); }
    if (t.hasAttribute('data-room')) { S.booking.room = t.checked; }
  });

  app.addEventListener('submit', (e) => {
    if (e.target.id === 'composer') {
      e.preventDefault();
      const inp = document.getElementById('chatInput');
      sendChat(inp.value);
    }
  });

  /* ---------------- Panel demo ---------------- */
  const panel = document.getElementById('demoPanel');
  const toggle = document.getElementById('demoToggle');
  function syncPanel() {
    document.querySelectorAll('#roleSwitch button').forEach((b) => b.classList.toggle('is-on', b.dataset.role === S.role));
  }
  function closePanel() { panel.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Tutup panel' : 'Panel demo';
  });
  panel.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.role) { S.role = b.dataset.role; if (S.role === 'mahasiswa' && ['login', 'consent'].includes(S.screen)) S.screen = 'home'; render(); }
    if (b.dataset.jump) {
      S.role = 'mahasiswa';
      if (b.dataset.jump !== 'consent') { S.consent.data = true; S.consent.darurat = true; }
      if (b.dataset.jump === 'cek') { S.answers = new Array(QUESTIONS.length).fill(null); S.q = 0; }
      go(b.dataset.jump);
    }
    if (b.dataset.sim) {
      S.role = 'mahasiswa'; S.consent.data = true; S.consent.darurat = true;
      S.answers = SIM[b.dataset.sim].slice(); S.q = QUESTIONS.length - 1;
      finishCek();
    }
    if (b.id === 'resetDemo') { S = initial(); render(); }
    if (window.matchMedia('(max-width: 860px)').matches && (b.dataset.role || b.dataset.jump || b.dataset.sim || b.id === 'resetDemo')) { closePanel(); toggle.textContent = 'Panel demo'; }
  });

  render();
})();
