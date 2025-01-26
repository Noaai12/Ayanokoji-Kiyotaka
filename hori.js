const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hori.db');

// Fungsi untuk menyimpan data pengguna Facebook ke dalam database
async function saveUserFacebook(data) {
  try {
    const user = await db.get(`SELECT * FROM users WHERE id_costum = ?`, [data.id_costum]);
    if (!user) {
      await db.run(`
        INSERT INTO users (nama_fb, id_costum, yen, exp, level)
        VALUES (?, ?, ?, ?, ?);
      `, [data.nama_fb, data.id_costum, data.yen, data.exp, data.level]);
      console.log(`Data pengguna Facebook berhasil disimpan: ${data.nama_fb}`);
    } else {
      console.log(`Data pengguna Facebook sudah ada: ${data.nama_fb}`);
    }
  } catch (error) {
    console.error(error);
  }
}

// Contoh penggunaan fungsi saveUserFacebook
const dataPengguna = {
  nama_fb: 'John Doe',
  id_costum: '1234567890',
  yen: 1000,
  exp: 500,
  level: 10
};
saveUserFacebook(dataPengguna);
