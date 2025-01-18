const axios = require("axios");
const moment = require("moment-timezone");
const Canvas = require("canvas");
const fs = require("fs-extra");

function convertFtoC(F) {
    return Math.floor((F - 32) / 1.8);
}

function formatHours(hours) {
    return moment(hours).tz("Asia/Jakarta").format("HH[h]mm[p]");
}

module.exports = {
    hady: {
        nama: "cuaca",
        penulis: "Hady Zen",
        kuldown: 10,
        peran: 0,
        tutor: "<lokasi>",
    },

    bahasa: {
        id: {
            hadi: "Tolong masukkan lokasi",
            hady: "Lokasi tidak ditemukan: ",
            error: "Terjadi kesalahan: "
        }, 
        en: {
            hadi: "Please enter a location",
            hady: "Location not found: ",
            error: "An error has occurred: "
        }
    },

    Ayanokoji: async function ({ api, event, args, bhs }) {
        const area = args.join(" ");
        if (!area)
            return api.sendMessage(bhs("hadi"), event.threadID, event.messageID);

        let areaKey, dataWeather, areaName;

        try {
            const response = (await axios.get(`https://api.accuweather.com/locations/v1/cities/search.json?q=${encodeURIComponent(area)}&apikey=d7e795ae6a0d44aaa8abb1a0a7ac19e4&language=id-in`)).data;
            if (response.length == 0)
                return api.sendMessage(bhs("hady") + area, event.threadID, event.messageID);
            const data = response[0];
            areaKey = data.key;
            areaName = data.LocalizedName;
        } catch (err) {
            return api.sendMessage(bhs("error") + err.response.data.Message, event.threadID, event.messageID);
        }

        try {
            dataWeather = (await axios.get(`http://api.accuweather.com/forecasts/v1/daily/10day/${areaKey}?apikey=d7e795ae6a0d44aaa8abb1a0a7ac19e4&details=true&language=id`)).data;
        } catch (err) {
            return api.sendMessage(`Error: ${err.response.data.Message}`, event.threadID, event.messageID);
        }

        const dataWeatherDaily = dataWeather.DailyForecasts;
        const dataWeatherToday = dataWeatherDaily[0];
        const msg = getLang("today", areaName, dataWeather.Headline.Text, convertFtoC(dataWeatherToday.Temperature.Minimum.Value), convertFtoC(dataWeatherToday.Temperature.Maximum.Value), convertFtoC(dataWeatherToday.RealFeelTemperature.Minimum.Value), convertFtoC(dataWeatherToday.RealFeelTemperature.Maximum.Value), formatHours(dataWeatherToday.Sun.Rise), formatHours(dataWeatherToday.Sun.Set), formatHours(dataWeatherToday.Moon.Rise), formatHours(dataWeatherToday.Moon.Set), dataWeatherToday.Day.LongPhrase, dataWeatherToday.Night.LongPhrase);

        const bg = await Canvas.loadImage(__dirname + "/assets/image/bgWeather.jpg");
        const { width, height } = bg;
        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bg, 0, 0, width, height);

        let X = 100;
        ctx.fillStyle = "#ffffff";
        const data = dataWeather.DailyForecasts.slice(0, 7);
        for (const item of data) {
            const icon = await Canvas.loadImage("http://vortex.accuweather.com/adc2010/images/slate/icons/" + item.Day.Icon + ".svg");
            ctx.drawImage(icon, X, 210, 80, 80);

            ctx.font = "30px";
            const maxC = `${convertFtoC(item.Temperature.Maximum.Value)}°C `;
            ctx.fillText(maxC, X, 366);

            ctx.font = "30px";
            const minC = String(`${convertFtoC(item.Temperature.Minimum.Value)}°C`);
            const day = moment(item.Date).format("DD");
            ctx.fillText(minC, X, 445);
            ctx.fillText(day, X + 20, 140);

            X += 135;
        }

        const pathSaveImg = `./hady-zen/cuaca.png`;
        fs.writeFileSync(pathSaveImg, canvas.toBuffer());

        return api.sendMessage({
            body: msg,
            attachment: fs.createReadStream(pathSaveImg)
        }, event.threadID, event.messageID, () => fs.unlinkSync(pathSaveImg));
    }
};
