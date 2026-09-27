# JEDA: Prototipe Aplikasi

Prototipe **JEDA (Jejaring Deteksi Dini dan Pendampingan Jiwa Mahasiswa)** untuk Lomba Esai NSCC 2026.
Dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework, tanpa proses build).

## Struktur folder
```
jeda-prototype/
├── index.html      # halaman utama
├── css/style.css   # tampilan
├── js/app.js       # logika layar, skoring PHQ-9/GAD-7, triase
└── README.md
```

## Menjalankan di komputer
Cukup buka `index.html` di browser, atau di VS Code pakai ekstensi **Live Server**.

## Deploy ke Vercel
**Cara 1 (paling cepat, tanpa GitHub)**
1. Buka https://vercel.com/new dan login.
2. Pilih opsi upload/deploy folder, lalu seret folder `jeda-prototype`.
3. Framework Preset: **Other**. Build Command dan Output Directory dikosongkan.
4. Klik **Deploy**.

**Cara 2 (lewat GitHub)**
1. Unggah isi folder ini ke repositori GitHub baru.
2. Di Vercel, klik **Add New > Project**, pilih repositori tersebut.
3. Framework Preset: **Other**, lalu **Deploy**.

**Cara 3 (Vercel CLI)**
```
npm i -g vercel
cd jeda-prototype
vercel
```

## Fitur di prototipe
- Persetujuan data (consent) sebelum mulai
- Beranda dengan notifikasi Cek Rutin
- Cek Rutin: 16 pertanyaan (PHQ-9 + GAD-7) dengan skoring otomatis
- Triase empat warna (hijau, kuning, oranye, merah) dan saran tindak lanjut
- Layar bantuan darurat (tombol "Butuh bantuan sekarang" di semua layar)
- Ruang Mandiri: latihan napas 4-7-8 interaktif, jurnal suasana hati, bacaan singkat
- Teman Cerita: obrolan anonim dengan konselor sebaya (simulasi balasan)
- Jadwal konseling daring/tatap muka + pemesanan ruang tenang
- Grafik perkembangan skor
- Dasbor konselor (antrean prioritas) dan dasbor pimpinan (peta panas anonim)

## Panel demo (sisi kiri layar, atau tombol "Panel demo" di ponsel)
- **Lihat sebagai**: berpindah antara Mahasiswa, Konselor, Pimpinan
- **Lompat ke layar**: langsung ke layar tertentu, praktis untuk tangkapan layar
- **Simulasikan hasil**: langsung menampilkan hasil Hijau, Kuning, Oranye, atau Merah

## Catatan
- Semua data adalah simulasi dan hanya tersimpan di memori browser (hilang saat halaman dimuat ulang).
- Butir pertanyaan adalah parafrase bahasa Indonesia dari PHQ-9 dan GAD-7 untuk keperluan prototipe.
- Hasil skrining bukan diagnosis.
