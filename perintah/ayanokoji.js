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
  const aya = await axios.get(`https://harmless-chisel-toothbrush.glitch.me/ayanokoji?ayanokoji=${encodeURIComponent(text)}`);
    api.sendMessage(aya.data.ayanokoji, event.threadID, event.messageID);
 }
};
