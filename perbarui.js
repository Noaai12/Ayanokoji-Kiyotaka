const fs = require('fs');
const path = require('path');
const { logo } = require('./hady-zen/log');

function ayanokoji(hady) {
  fs.readFile(hady, 'utf8', (err, data) => {
    if (err) {
      return;
    }

    fs.writeFile(hady, data, 'utf8', (err) => {
      if (err) {
        console.log(logo.error + `Gagal memperbarui file ${hady}.`);
      } else {
        console.log(logo.update + `Berhasil memperbarui file ${hady}.`);
      }
    });
  });
};

function getVersionFromPackageJson() {
  try {
    const model = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    return packageJson.version;
  } catch (err) {
    console.error('Gagal membaca package.json:', err);
    return null;
  }
}

// Fungsi untuk memeriksa dan memperbarui semua file kecuali config.json, hanya jika versi berbeda
function updateFilesInCurrentDirectory() {
  const currentDirectory = __dirname; // Direktori tempat skrip berada
  const currentVersion = getVersionFromPackageJson(); // Mendapatkan versi dari package.json
  
  if (!currentVersion) {
    console.error('Versi tidak ditemukan, pembaruan dibatalkan.');
    return;
  }

  const savedVersion = '1.0.0'; // Ganti dengan versi yang sudah ada, atau ambil dari file atau variabel lain
  
  if (currentVersion === savedVersion) {
    console.log('Versi sudah sama, tidak ada pembaruan yang dilakukan.');
    return;
  }

  fs.readdir(currentDirectory, (err, files) => {
    if (err) {
      console.error(`Gagal membaca direktori: ${err}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(currentDirectory, file);

      // Mengabaikan file config.json
      if (file !== 'config.json') {
        // Mengabaikan direktori, hanya memperbarui file
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(`Gagal memeriksa status file ${filePath}: ${err}`);
            return;
          }

          if (stats.isFile()) {
            updateFile(filePath);
          }
        });
      }
    });
  });
}

// Memulai proses pembaruan file di direktori saat ini
updateFilesInCurrentDirectory();
