# Deployment Guide (Dinas Perikanan Pamekasan)

Panduan ini akan membantu Anda mengonlinekan website ini menggunakan Vercel (Rekomendasi) atau Hosting cPanel biasa.

## Opsi 1: Deploy ke Vercel (Rekomendasi - Gratis & Cepat)
Vercel adalah pembuat Next.js, sehingga kompatibilitasnya 100%.

1.  **Siapkan Akun GitHub**:
    *   Buat akun di [github.com](https://github.com).
    *   Download [Git](https://git-scm.com/downloads) dan install di komputer Anda.
2.  **Upload Project ke GitHub**:
    *   Buka terminal di folder project ini.
    *   Jalankan perintah berikut berurutan:
        ```bash
        git init
        git add .
        git commit -m "Initial commit website dinas perikanan"
        ```
    *   Buat repository baru di GitHub, lalu ikuti instruksi untuk push code.
3.  **Hubungkan ke Vercel**:
    *   Buka [vercel.com](https://vercel.com) dan login dengan GitHub.
    *   Klik "Add New" -> "Project".
    *   Pilih repository yang baru Anda buat.
    *   Klik "Deploy". Tunggu 1-2 menit.
    *   Selesai! Website Anda sudah online dengan domain `project-name.vercel.app`.

## Opsi 2: Deploy ke Hosting cPanel (Node.js Support)
Jika Anda menggunakan hosting pemerintah (.go.id) yang menggunakan cPanel, pastikan hosting tersebut mendukung **Node.js**.

1.  **Build Project**:
    *   Di terminal, jalankan: `npm run build`
    *   Ini akan membuat folder `.next`.
2.  **Siapkan File**:
    *   Anda perlu mengupload semua file **kecuali** `node_modules`.
    *   Termasuk `.next`, `public`, `package.json`, `next.config.mjs`.
3.  **Setup di cPanel**:
    *   Masuk menu "Setup Node.js App".
    *   Create Application.
    *   Set **Application startup file** ke `node_modules/next/dist/bin/next` (atau ikuti panduan spesifik provider hosting).
    *   Run `npm install` di dalam cPanel (via terminal atau UI).
    *   Start App.

## Catatan Penting
*   **Data Persistence**: Karena website ini menggunakan state lokal (tanpa database SQL), data yang diinput lewat Admin Panel **akan reset** jika hosting direstart/redeploy. Untuk solusi permanen, Anda perlu menghubungkan ke Database (PostgreSQL/MySQL) di masa depan.
*   **SEO**: Pastikan mengisi `metadata` yang sesuai di setiap halaman agar mudah ditemukan di Google.

## Struktur Folder Project
Saat Anda mengunduh project ini, pastikan strukturnya seperti ini:
- `app/` (Halaman website)
- `components/` (Elemen UI - Navbar, Footer, dll)
- `context/` (Manajemen Data)
- `public/` (Gambar & Aset)
