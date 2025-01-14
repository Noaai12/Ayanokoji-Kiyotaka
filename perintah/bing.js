const axios = require('axios');
const cheerio = require('cheerio');
module.exports = {
  hady: {
    nama: "bing",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<cari>"
  },

bahasa: { 
   id: { hadi: "Cobalah cari sesuatu." }, 
   en: { hadi: "Try to find something." }
}, 

Ayanokoji: async function ({ event, args, api, bhs }) { 
    const futaro = args.join(' ');
   if (!args.join(' ')) return api.sendMessage(bhs('hadi'), event.threadID, event.messageID);

    try {
      const respon = await axios.get(`https://www.bing.com/search?q=${encodeURIComponent(args.join(' '))}`);
      const $ = cheerio.load(respon.data);

      let hadi = '';
      const itsuki = 6;
      $('li.b_algo').slice(0, itsuki).each((index, element) => {
        const judul = $(element).find('h2').text();
        const link = $(element).find('h2 > a').attr('href');
        const snippet = $(element).find('p').text();
        hadi += `${index + 1}. [${judul}](${link})\n${snippet}\n\n`;
});

    api.sendMessage(hadi, event.threadID, event.messageID);
  } catch (ayanokoji) {
    api.sendMessage('Error: ' + ayanokoji, event.threadID, event.messageID);
  }
 }
};
