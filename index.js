// Mengimpor modul yang dibutuhkan
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');

// Membuat instance aplikasi Express
const app = express();

// Menginisialisasi middleware multer untuk menangani unggahan file
const upload = multer();

// Menggunakan middleware cors untuk mengizinkan permintaan lintas domain
app.use(cors());

// Mengizinkan akses ke direktori 'public' secara statis melalui rute '/public'
app.use('/public', express.static(process.cwd() + '/public'));

// Mengatur rute utama, mengirimkan file HTML saat permintaan ke rute root ('/')
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Menangani permintaan POST ke '/api/fileanalyse' dengan menggunakan multer untuk mengunggah file tunggal
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname, // Nama asli file yang diunggah
    type: req.file.mimetype, // Tipe MIME file
    size: req.file.size // Ukuran file dalam byte
  });
});

// Mengatur port server yang akan digunakan, mengambil nilai dari variabel lingkungan PORT jika tersedia, jika tidak, menggunakan port 3000
const port = process.env.PORT || 3000;

// Memulai server dan mendengarkan pada port yang ditentukan
app.listen(port, () => {
  console.log('Aplikasi Anda mendengarkan pada port ' + port);
});
