# Checklist Tugas 2 - Aplikasi Notes (Cloud SQL)

## 1. Jalankan backend

1. Masuk ke folder BE.
2. Jalankan npm install.
3. Pastikan file .env sudah berisi host Cloud SQL.
4. Jalankan npm run dev.

## 2. Jalankan frontend

1. Masuk ke folder FE.
2. Buka index.html di browser.

## 3. Uji API (wajib screenshot)

- GET all notes
- GET note by id
- POST create note
- PUT update note
- DELETE note

Gunakan file BE/api.rest atau Postman.

## 4. Alur Cloud SQL (wajib screenshot)

1. Buat instance MySQL Cloud SQL di GCP.
2. Catat Public IP instance.
3. Tambahkan authorized networks agar IP laptop kamu boleh konek.
4. Buat database (contoh: users_sequelize atau notes_app).
5. Buat user MySQL dan password.
6. Update .env backend sesuai nilai Cloud SQL.
7. Jalankan backend dan pastikan endpoint GET /api/v1/notes bisa diakses.

## 5. Migrasi SQL ke Cloud SQL

1. Export dari database lokal:
   mysqldump -u root -p notes_app > notes_backup.sql
2. Import ke Cloud SQL lewat salah satu cara:
   - mysql client langsung ke Public IP instance
   - Cloud SQL import dari file SQL di Cloud Storage
3. Verifikasi tabel notes sudah ada di Cloud SQL.
4. Jalankan ulang backend dan tes endpoint lagi.

## 6. Troubleshooting cepat

1. Jika muncul error connect ETIMEDOUT:
   - cek Public IP instance benar.
   - cek authorized networks sudah memasukkan IP publik laptop.
   - cek port MySQL 3306 bisa diakses.
   - cek instance Cloud SQL status RUNNABLE.
2. Jika muncul Access denied:
   - cek DB_USER dan DB_PASS di .env.
   - cek user tersebut punya akses ke DB_NAME yang dipakai.

## 7. Struktur bukti di PDF

- Struktur tabel notes.
- Aplikasi lokal berjalan.
- Database lokal sebelum migrasi.
- Proses export/import SQL.
- Database di Cloud SQL.
- Pengujian endpoint API.
- Bonus: frontend diakses lewat IP publik VM.
