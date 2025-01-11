const fs = require('fs');
const path = require('path');

// Lokasi file JSON untuk menyimpan data
const dbPath = path.join(__dirname, 'db.json');

// Fungsi untuk mendapatkan data berdasarkan id dari db.json
async function getData(id) {
    try {
        const data = await fs.promises.readFile(dbPath, 'utf8');
        const db = JSON.parse(data);
        if (db[id]) {
            return db[id]; // Mengembalikan data yang sesuai dengan id
        } else {
            throw new Error('Data tidak ditemukan');
        }
    } catch (err) {
        throw new Error('Gagal membaca atau parsing file database');
    }
}
// Fungsi untuk mengupdate data berdasarkan id
function setData(id, nama, yen) {
    return getData(id)
        .then(() => {
            // Jika data ditemukan, kita akan mengubahnya
            return new Promise((resolve, reject) => {
                fs.readFile(dbPath, 'utf8', (err, data) => {
                    if (err) {
                        return reject('Gagal membaca file database');
                    }
                    try {
                        const db = JSON.parse(data);
                        // Mengupdate data yang ada pada id tertentu
                        db[id] = { nama, yen };
                        
                        // Menyimpan perubahan ke dalam file
                        fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
                            if (err) {
                                return reject('Gagal menulis ke file database');
                            }
                            resolve('Data berhasil diperbarui');
                        });
                    } catch (parseError) {
                        reject('Gagal parsing data');
                    }
                });
            });
        })
        .catch(() => {
            // Jika data tidak ditemukan, menolak dengan pesan
            return Promise.reject('Data tidak ditemukan untuk diupdate');
        });
}

// Fungsi untuk menambah data ke db.json
function p() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
                return reject('Gagal membaca file database');
            }
            try {
                resolve(JSON.parse(data));
            } catch (parseError) {
                reject('Gagal parsing data');
            }
        });
    });
}

// Fungsi untuk menambah data ke db.json
function addData(id, nama, yen) {
    return p()
        .then((db) => {
            // Menambahkan data baru ke dalam objek db
            db[id] = { nama, yen };
            return new Promise((resolve, reject) => {
                fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
                    if (err) {
                        return reject('Gagal menulis ke file database');
                    }
                    resolve('Data berhasil ditambahkan');
                });
            });
        })
        .catch((err) => {
            // Jika file db.json tidak ada, buat file baru dengan data baru
            const db = { [id]: { nama, yen } };
            return new Promise((resolve, reject) => {
                fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
                    if (err) {
                        return reject('Gagal menulis ke file database');
                    }
                    resolve('Data berhasil ditambahkan');
                });
            });
        });
}
module.exports = { addData, getData, setData };
