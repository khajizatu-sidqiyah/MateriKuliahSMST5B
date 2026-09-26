# 📱Laporan praktikum 3: Core Components dan Styling#

### Langkah 1: Import Library dab Components###

1. Buka file Appp.js yang ada di folder projek ptmn2
2. import libary dan component yang diperlukan
3. konfirmasi bukti

![alt text](<image.png>)

### Langkah 2: Membuat Array Objek ###
1. membuat objek array bernama pofile untuk wadah data profile
2. masukkan data yang diperlukan
3. konfirmasi bukti

============================================
 DATA PROFIL (objek JavaScript)
============================================
![alt text](<image2.png>)

============================================
DATA SKILLS (array of objects)
 → Akan ditampilkan dengan FlatList
============================================
![alt text](<img3.png>)

============================================
DATA RIWAYAT (sections)
 → Akan ditampilkan dengan SectionList
============================================
![alt text]( img4.png)
![alt text]( img5.png)

## 📝 LANGKAH 3 — Sub-Components (SkillCard & TimelineCard)

**Konsep:** Komponen kecil yang bertugas merender satu item list. Ini adalah praktik **component reuse**.

Tambahkan kode berikut **di antara data dan fungsi App()**:
![alt text]( img6.png)
![alt text]( img7.png)

## 📝 LANGKAH 4 — State Management dengan useState

**Konsep:** `useState` menyimpan data yang bisa berubah. Setiap perubahan state akan men-trigger re-render komponen.

Tambahkan state di dalam fungsi `App()`:
 
![alt text]( img8.png)
![alt text]( img9.png)

## 📝 LANGKAH 5 — SafeAreaView, StatusBar & Header

**Konsep:**
- `SafeAreaView` → memastikan konten tidak tertutup notch (takik kamera) atau home indicator
- `StatusBar` → mengatur tampilan bar di bagian atas perangkat
- `View` + `Switch` → membangun header bar

Ganti bagian `return (...)` di `App()`:
 
![alt text]( img10.png)

## 📝 LANGKAH 6 — ScrollView & Profil Section (View, Text,  img/image)

**Konsep:**
- `ScrollView` → membungkus konten panjang agar bisa di-scroll
- ` img/image` → menampilkan gambar dari URL (`source={{ uri: '...' }}`)
- `Text` → bisa di-styling dengan `style` prop seperti CSS

Ganti `<View><Text ...>Step 5</Text></View>` dengan:

{/* 4. ScrollView → semua konten CV dibungkus di sini */}
![alt text]( img11.png)
![alt text]( img12.png)

## 📝 LANGKAH 7 — FlatList (Daftar Skills)

**Konsep:** `FlatList` dioptimalkan untuk menampilkan daftar panjang — hanya item yang terlihat di layar yang di-render (lazy rendering / windowing).

Tambahkan kode berikut **di dalam** `<ScrollView>`, setelah section profil:

{/* ════════════════════════════════════
    SECTION SKILLS
    Komponen: FlatList
    ════════════════════════════════════ */}
![alt text]( img13.png)

## 📝 LANGKAH 8 — SectionList (Pengalaman & Pendidikan)

**Konsep:** `SectionList` seperti `FlatList` tetapi bisa mengelompokkan data berdasarkan section/kategori. Membutuhkan prop `sections` (bukan `data`) yang berisi array objek `{ title, data }`.
 
{/* ════════════════════════════════════
    SECTION RIWAYAT
    Komponen: SectionList
    ════════════════════════════════════ */}
![alt text]( img14.png)

## 📝 LANGKAH 9 — TextInput, Button & ActivityIndicator

**Konsep:**
- `TextInput` → input teks. `value` + `onChangeText` = controlled component
- `Button` → tombol paling sederhana di React Native
- `ActivityIndicator` → spinner loading

{/* ════════════════════════════════════
    SECTION FORM KONTAK
    Komponen: TextInput, Button, ActivityIndicator
    ════════════════════════════════════ */}
![alt text]( img15.png)
![alt text]( img16.png)

## 📝 LANGKAH 10 — Modal (Popup Detail)

**Konsep:** `Modal` menampilkan konten di atas (overlay) tampilan saat ini. Dikendalikan dengan prop `visible`.

Tambahkan **setelah** penutup `</ScrollView>` dan sebelum `</SafeAreaView>`:

{/* ════════════════════════════════════
    12. MODAL → popup detail riwayat
    ════════════════════════════════════ */}
![alt text]( img17.png)

## 📝 LANGKAH 11 — StyleSheet (Styling Terpusat)

**Konsep:** `StyleSheet.create()` adalah cara resmi styling di React Native. Mirip CSS tetapi menggunakan JavaScript object dengan properti camelCase.

Tambahkan kode berikut di **bawah** fungsi `App()` (paling bawah file):


// ============================================
//  PALET WARNA (konstanta warna terpusat)
// ============================================
![alt text]( img18.png)

// ============================================
//  16. StyleSheet.create() → semua style
// ============================================
![alt text]( img19.png)

  // ── HEADER BAR ────────────────────────────
  ![alt text]( img20.png)

  // ── SECTION PROFIL ─────────────────────────
  ![alt text]( img21.png)
  ![alt text]( img22.png)
  ![alt text]( img23.png)

  // ── SOSIAL MEDIA ───────────────────────────
  ![alt text]( img24.png)

  // ── PRESSABLE DOWNLOAD ─────────────────────
  ![alt text]( img25.png)

  // ── SECTION BOX (wrapper kartu) ────────────
  ![alt text]( img26.png)

  // ── SECTION LIST HEADER ────────────────────
  ![alt text]( img27.png)

  // ── SKILL CARD ─────────────────────────────
  ![alt text]( img28.png)

  // ── TIMELINE CARD ──────────────────────────
 ![alt text]( img29.png)

  // ── TEXT INPUT ─────────────────────────────
  ![alt text]( img30.png)

  // ── LOADING ROW ────────────────────────────
  ![alt text]( img31.png)

  // ── MODAL ──────────────────────────────────
  ![alt text]( img32.png)

  ## ✅ LANGKAH 12 — Verifikasi & Pengujian

Jalankan aplikasi dan pastikan semua fitur bekerja:

| # | Yang Diuji | Hasil yang Diharapkan |
|---|---|---|
| 1 | Aplikasi bisa dibuka | Layar CV tampil tanpa error |
| 2 | Foto profil tampil | Gambar dari URL terload |
| 3 | Halaman bisa di-scroll | Semua section bisa diakses |
| 4 | Toggle Switch | Badge "Open to Work" muncul/hilang |
| 5 | Progress bar skill | Bar berwarna sesuai persentase |
| 6 | Ketuk kartu riwayat | Modal popup muncul dari bawah |
| 7 | Tombol Tutup di Modal | Modal tertutup |
| 8 | Isi form & kirim | Loading 2 detik → Alert sukses |
| 9 | Kirim dengan input kosong | Alert peringatan muncul |
| 10 | Tekan Download CV | Efek visual berubah + Alert |
| 11 | Tap tombol sosmed | Alert URL muncul |

![alt text](hasil.gif)