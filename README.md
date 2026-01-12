# Website Resmi Dinas Perikanan Kabupaten Pamekasan

Website profil resmi untuk Dinas Perikanan Kabupaten Pamekasan, dibangun dengan teknologi web modern untuk memberikan informasi publik yang transparan, cepat, dan mudah diakses.

## Fitur Utama

### 1. Informasi Publik
- **Profil Dinas**: Visi, Misi, dan Struktur Organisasi interaktif.
- **Berita Terkini**: Artikel dan pengumuman terbaru seputar kegiatan dinas.
- **Agenda Kegiatan**: Jadwal kegiatan dinas yang terintegrasi.
- **Galeri Foto**: Dokumentasi kegiatan visual.
- **Layanan Bidang**: Informasi detail mengenai 4 bidang utama (Tangkap, Budidaya, Pengawasan, Pengolahan).

### 2. Fitur Khusus
- **Update Harga Ikan**: Widget harga ikan harian di halaman depan yang membantu nelayan memantau harga pasar.
- **Direktori Pegawai**: Daftar pegawai yang dapat dicari berdasarkan nama atau NIP.
- **Struktur Organisasi**: Bagan interaktif yang menampilkan detail tugas pokok dan fungsi setiap jabatan.

### 3. Admin Panel (CMS)
- Dashboard pengelolaan konten (Berita, Agenda, Galeri, Harga Ikan).
- **Keamanan**: Fitur konfirmasi hapus data (Delete Confirmation) untuk mencegah ketidaksengajaan.
- **Validasi**: Sistem validasi input untuk memastikan integritas data.
- **Real-time**: Perubahan data langsung tampil di halaman publik tanpa perlu refresh (Client-side State).

## Teknologi

Project ini dibangun menggunakan:
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: Custom components dengan Radix UI primitives.

## Cara Menjalankan Project (Lokal)

1.  **Install Dependencies**:
    ```bash
    npm install
    # atau
    yarn install
    ```

2.  **Jalankan Server Development**:
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

3.  **Build untuk Produksi**:
    ```bash
    npm run build
    npm start
    ```

## Deployment

Untuk panduan deployment ke Vercel atau cPanel, silakan baca file [DEPLOYMENT.md](./DEPLOYMENT.md).

## Struktur Folder

- `/app`: Halaman-halaman website (Fitur Next.js App Router).
- `/components`: Komponen UI yang dapat digunakan kembali (Navbar, Footer, Button, dll).
- `/context`: Manajemen state global (AppContext) untuk data dinamis.
- `/public`: Aset statis seperti gambar dan icon.
