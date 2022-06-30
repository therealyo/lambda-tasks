require("dotenv").config();
const axios = require("axios");


const lat = 50.43;
const lon = 30.53;
const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=ru&appid=${process.env["API_KEY"]}`;
const kelvinZero = -273.15;


async function getResponse() {
    return await axios.get(endpoint);
}


async function getForecast() {
    let data;

    await getResponse()
        .then((response) => {
            data = response.data["list"];
        })
        .catch(err => {
            console.log(err);
        });

    return data;
}


async function parseDict(dict) {
    let date = new Date(dict["dt_txt"]);
    let day = date.toLocaleString()
        .replaceAll("/", ".")
        .split(".")
        .reverse()
        .slice(-2);

    return {
        temperature: (dict["main"]["temp"] + kelvinZero).toFixed(2),
        feelsLike: (dict["main"]["feels_like"] + kelvinZero).toFixed(2),
        weather: dict["weather"][0]["description"],
        date: day.join("."),
        time: date.getHours()
    }
}


async function getParsedForecast() {
    let data = await getForecast();
    let forecast = new Map();

    for (let d of data) {
        const parsed = await parseDict(d)
        if ([...forecast.keys()].includes(parsed.date)) {
            forecast.get(parsed.date).push(parsed);
        } else {
            forecast.set(parsed.date, []);
            forecast.get(parsed.date).push(parsed);
        }
    }


    return forecast;
}


async function get3HoursForecast() {
    let forecast = await getParsedForecast();
    return await createResponseMessage(forecast);
}


async function get6HoursForecast() {
    let forecast = await getParsedForecast();
    for (let day of forecast.keys()) {
        let arr = forecast.get(day);
        arr = arr.filter((el) => {
            return el["time"] % 6 === 0;
        });
        forecast.set(day, arr);
    }

    return await createResponseMessage(forecast);
}


async function createResponseMessage(forecast) {
    let msg = "";
    forecast.forEach((value, day) => {
        msg += day + ":\n";
        for (let el of value) {
            msg += `На ${el.time}:00 температура ${el.temperature}°, ощущается как ${el.feelsLike}°, ${el.weather}\n`;
        }
        msg += "\n"
    })
    return msg;
}


module.exports = {
    get3HoursReply: get3HoursForecast,
    get6HoursReply: get6HoursForecast
}