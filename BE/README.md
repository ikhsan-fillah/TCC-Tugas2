# Tugas 2 - Backend Notes

## 1. Install dependency

npm install

## 2. Setup environment

Copy .env.example menjadi .env, lalu isi sesuai database Cloud SQL.

Contoh:
DB_NAME=users_sequelize
DB_USER=admin
DB_PASS=mypassword
DB_HOST=34.45.103.182
DB_PORT=3306
PORT=3000

Penting:

- Pastikan IP laptop kamu sudah dimasukkan ke authorized networks Cloud SQL.
- Pastikan DB_USER punya akses ke DB_NAME yang digunakan.

## 3. Jalankan server

npm run dev

## 4. Endpoint utama

- GET `/api/v1/notes`
- GET `/api/v1/notes/:id`
- POST `/api/v1/notes`
- PUT `/api/v1/notes/:id`
- DELETE `/api/v1/notes/:id`

## 5. Testing

Gunakan file api.rest (REST Client) atau Postman.

## 6. Troubleshooting koneksi Cloud SQL

1. Error connect ETIMEDOUT:

- Cek DB_HOST dan DB_PORT.
- Cek authorized networks.
- Cek instance status RUNNABLE.

2. Error Access denied:

- Cek DB_USER/DB_PASS.
- Cek permission user ke DB_NAME.
