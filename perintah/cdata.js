module.exports = {
  config: { 
    nama: "cdata", 
    penulis: "Hady Zen", 
    kuldown: 4,
    peran: 0,
    tutor: ""
  }, 
  Alya: async function ({ api, event, getData }) {
    api.sendMessage(getData(event.senderID), event.threadID, event.messageID);
  }
};
