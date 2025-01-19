const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { custom, logo } = require('./hady-zen/log');

async function ayanokoji(hady) {
  const { data } = await axios.get(`https://raw.githubusercontent.com/HadyZen/Ayanokoji-Kiyotaka/refs/heads/main/${hady}`);

    fs.writeFile(hady, data, 'utf8', (err) => {
      if (err) {
        console.log(logo.error + `Gagal memperbarui file ${hady}.`);
      } else {
        console.log(logo.update + `Berhasil memperbarui file ${hady}.`);
      }
    });
  });
};

async function kiyotaka() {
  const { version } = fs.readFile('package.json');
  const { data } = await axios.get('https://raw.githubusercontent.com/HadyZen/Ayanokoji-Kiyotaka/refs/heads/main/package.json');
  
  if (!version) {
    console.log(logo.error + 'Versi tidak ditemukan, pembaruan dibatalkan.');
    return;
  } 
  if (version == data.version) {
    console.log(logo.update + 'Kamu sudah menggunakan versi terbaru.');
    return;
  }

  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.log(logo.error + `Gagal membaca direktori: ${err.message}`);
      return;
    }

    files.forEach((file) => {
      if (file !== 'kiyotaka.json' || file !== 'akun.txt') {
        fs.stat(path.join(__dirname, file), (err, stats) => {
          if (err) {
            console.log(logo.error + `Gagal memeriksa status file ${file}: ${err}`);
            return;
          }
          if (stats.isFile()) {
            ayanokoji(path.join(__dirname, file));
          }
        });
      }
    });
  });
};

kiyotaka();
