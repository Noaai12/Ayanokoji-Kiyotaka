const axios = require('axios');
module.exports = {
hady: { 
  nama: "ayanokoji",
  penulis: "Hady Zen", 
  kuldown: 10,
  peran: 0,
  tutor: "<pertanyaan>"
}, 

bahasa: {
  id: { hadi: "Kamu belum memasukkan pertanyaan nya." }, 
  en: { hadi: "You haven't given her a question yet." }
}, 
  
Ayanokoji: async function ({ api, event, args, bhs }) { 
  const text = args.join(' ');
  if (!text) return api.sendMessage(bhs('hadi'), event.threadID, event.messageID);
  
  const hady = `kamu harus role play menjadi Ayanokoji Kiyotaka. User input: ${text}`;
  const aya = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(hady)}`);
    api.sendMessage(aya.data.answer, event.threadID, event.messageID);
 }
};