# UTS Web Service Engineering — RESTful API (Resource: students)

## Identitas
**Nama:** Muhammad Riduwan  
**NIM:** 230104040080  
**Digit Akhir NIM:** 0 → **Resource:** `students`  
**Kampus:** Universitas Islam Negeri Antasari Banjarmasin
**Mata Kuliah:** Web Service Engineering  

---

## Deskripsi Proyek
Proyek ini merupakan implementasi **UTS Web Service Engineering** dengan membangun **RESTful API** berbasis **Node.js + Express.js**.  
Resource utama adalah **`students`**, yang berfungsi untuk mengelola data mahasiswa dengan field utama berikut:

| Field | Deskripsi |
|-------|------------|
| `name` | Nama mahasiswa |
| `nim` | Nomor Induk Mahasiswa |
| `major` | Program studi atau jurusan |

Data disimpan **in-memory** tanpa database dan mendukung operasi **CRUD** (Create, Read, Update, Delete), serta endpoint informasi `/api/info`.

---

## Teknologi yang Digunakan
- **Node.js + Express.js**
- **Morgan** → Logging request
- **UUID** → Pembuatan ID unik untuk mahasiswa
- **Nodemon** → Menjalankan server otomatis saat pengembangan

---

## Struktur Folder
~~~
src/
├── app.js
├── controllers/
│ └── students.controller.js
├── data/
│ └── students.data.js
├── helpers/
│ └── response.js
├── middlewares/
│ ├── validateStudent.js
│ └── errorHandler.js
└── routes/
└── students.routes.js
~~~
yaml
Salin kode

---

## Cara Menjalankan di Visual Studio Code
1. Buka terminal pada folder proyek  
2. Jalankan perintah:
   ```bash
   npm install
   npm run dev
Server akan berjalan pada:

arduino
Salin kode
http://localhost:3000
🌐 Endpoint API
1️⃣ GET /api/students
Menampilkan semua data mahasiswa.
Response:

json
Salin kode
~~~
{
  "status": "success",
  "data": [
    { "id": "uuid", "name": "Siti Rahma", "nim": "230104040001", "major": "Teknologi Informasi" }
  ]
}
~~~
2️⃣ GET /api/students/:id
Menampilkan data mahasiswa berdasarkan ID.
Contoh URL:

bash
Salin kode
~~~
http://localhost:3000/api/students/7c4e38e1-41d3-4b2e-9f36-8df3ac39a444
Response:
~~~
json
Salin kode
~~~
{
  "status": "success",
  "data": {
    "id": "7c4e38e1-41d3-4b2e-9f36-8df3ac39a444",
    "name": "Siti Rahma",
    "nim": "230104040001",
    "major": "Teknologi Informasi"
  }
}
~~~
3️⃣ POST /api/students
Menambahkan data mahasiswa baru.
Body (JSON):

json
Salin kode
~~~
{
  "name": "Agus Pratama",
  "nim": "230104040080",
  "major": "Teknologi Informasi"
}
Response (201 Created):
~~~
json
Salin kode
~~~
{
  "status": "success",
  "message": "Student created",
  "data": {
    "id": "a9f1b5d2-2399-48d8-9e56-90d6b7e3a6cb",
    "name": "Agus Pratama",
    "nim": "230104040080",
    "major": "Teknologi Informasi"
  }
}
Jika field kurang → 400 Bad Request:
~~~
json
~~~
Salin kode
{
  "status": "fail",
  "message": "Field wajib: name, nim, major"
}
4️⃣ PUT /api/students/:id
Memperbarui data mahasiswa berdasarkan ID.
Body (JSON):
~~~
json
Salin kode
~~~
{
  "name": "Agus P.",
  "nim": "230104040080",
  "major": "Sistem Informasi"
}
Response:
~~~
json
Salin kode
~~~
{
  "status": "success",
  "message": "Student updated",
  "data": {
    "id": "a9f1b5d2-2399-48d8-9e56-90d6b7e3a6cb",
    "name": "Agus P.",
    "nim": "230104040080",
    "major": "Sistem Informasi"
  }
}
~~~
5️⃣ DELETE /api/students/:id
Menghapus data mahasiswa berdasarkan ID.
Response:

css
Salin kode
204 No Content
6️⃣ GET /api/info
Menampilkan informasi layanan dan prinsip REST API.
Response:

json
Salin kode
~~~
{
  "status": "success",
  "message": "UTS WSE — RESTful API Info",
  "data": {
    "service": "students API",
    "owner": {
      "name": "Muhammad Riduwan",
      "nim": "230104040080"
    },
    "principles": [
      "Resource-Oriented URI (/api/students)",
      "HTTP Methods (GET, POST, PUT, DELETE)",
      "Stateless",
      "Status Codes konsisten (200, 201, 204, 400, 404, 500)",
      "JSON Representation",
      "Validation & Error Handling",
      "Discoverability (/api/info)"
    ]
  }
}
~~~
7 Prinsip RESTful API (Sudah Diterapkan)
No	Prinsip	Implementasi
1	Resource-Oriented URI	/api/students menggunakan kata benda jamak
2	HTTP Methods	GET, POST, PUT, DELETE
3	Stateless	Tidak menyimpan session di server
4	Status Codes	Menggunakan 200, 201, 204, 400, 404, 500
5	JSON Representation	Semua response dalam format JSON
6	Validation & Error Handling	Middleware validateStudent dan errorHandler
7	Discoverability	Endpoint /api/info menyediakan metadata API

Pengujian di Postman
Method	Endpoint	Deskripsi	Status
GET	/api/students	Ambil semua mahasiswa	✅ 200 OK
POST	/api/students	Tambah mahasiswa baru	✅ 201 Created
GET	/api/students/:id	Ambil 1 mahasiswa	✅ 200 / 404
PUT	/api/students/:id	Perbarui data mahasiswa	✅ 200
DELETE	/api/students/:id	Hapus mahasiswa	✅ 204
GET	/api/info	Info prinsip REST API	✅ 200

🧾 Bukti Screenshot (Wajib Disertakan)
✅ GET /api/students → 200 OK

✅ POST /api/students → 201 Created

✅ GET /api/students/:id → 200 OK

✅ PUT /api/students/:id → 200 OK

✅ DELETE /api/students/:id → 204 No Content
(Opsional tambahan: 400 Bad Request & 404 Not Found)

Catatan
Jalankan server dengan perintah:

bash
Salin kode
npm run dev
Port default: 3000

Semua response dalam JSON format

Data disimpan sementara (in-memory array)

Resource sesuai ketentuan: digit akhir NIM = 0 → students

Author
Nama: Muhammad Riduwan
NIM: 230104040080
Kelas: TI 4B
Tahun: 2025

yaml
Salin kode


