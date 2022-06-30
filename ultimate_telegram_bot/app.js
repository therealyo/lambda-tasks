require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const keyboard = require("./keyboard");
const currUtils = require("./currency_utils");
const weatherUtils = require("./weather_utils");


const bot = new TelegramBot(process.env['TOKEN'], {polling: true})


function getWeatherReply(id) {
    bot.sendMessage(id, "Выберите диапазон", {
        reply_markup: {
            keyboard: keyboard.weather
        }
    })
}

function getCurrencyReply(id) {
    bot.sendMessage(id, "Выберите банк", {
        reply_markup: {
            keyboard: keyboard.currency
        }
    })
}

function defaultChoice(id) {
    bot.sendMessage(id, "Сделайте выбор", {
        reply_markup: {
            keyboard: keyboard.home
        }
    });
}


bot.on("message", (msg) => {
    const {chat: {id}} = msg;
    switch (msg.text) {
        case "Прогноз погоды в Киеве":
            getWeatherReply(id);
            break;
        case "Посмотреть курс валют":
            getCurrencyReply(id);
            break
        case "Прогноз погоды на 3 часа":
            weatherUtils.get3HoursReply()
                .then((text) => {
                    bot.sendMessage(id, text);
                    defaultChoice(id);
                })

            break;
        case "Прогноз погоды на 6 часов":
            weatherUtils.get6HoursReply()
                .then((text) => {
                    bot.sendMessage(id, text);
                    defaultChoice(id);
                })

            break;
        case "Monobank":
            currUtils.getMonoReply()
                .then((text) => {
                    bot.sendMessage(id, text);
                    defaultChoice(id);
                });

            break;
        case "ПриватБанк":
            currUtils.getPrivatReply()
                .then((text) => {
                    bot.sendMessage(id, text);
                    defaultChoice(id);
                });

            break;
        default:
            defaultChoice(id);
            break;
    }

});


