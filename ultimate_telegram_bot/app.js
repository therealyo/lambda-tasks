require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const keyboard = require("./config/keyboard");
const currency = require("./utils/currency");
const weather = require("./utils/weather");

const bot = new TelegramBot(process.env["TOKEN"], { polling: true });

function getWeatherReply(id) {
    bot.sendMessage(id, "Выберите диапазон", {
        reply_markup: {
            keyboard: keyboard.weather,
        },
    });
}

function getCurrencyReply(id) {
    bot.sendMessage(id, "Выберите банк", {
        reply_markup: {
            keyboard: keyboard.currency,
        },
    });
}

function defaultChoice(id) {
    bot.sendMessage(id, "Сделайте выбор", {
        reply_markup: {
            keyboard: keyboard.home,
        },
    });
}

bot.on("message", (msg) => {
    const {
        chat: { id },
    } = msg;
    switch (msg.text) {
        case "Прогноз погоды в Киеве":
            getWeatherReply(id);
            break;
        case "Посмотреть курс валют":
            getCurrencyReply(id);
            break;
        case "Прогноз погоды на 3 часа":
            weather.get3HoursReply().then((text) => {
                bot.sendMessage(id, text).then((r) => {
                    defaultChoice(id);
                });
            });

            break;
        case "Прогноз погоды на 6 часов":
            weather.get6HoursReply().then((text) => {
                bot.sendMessage(id, text).then((r) => {
                    defaultChoice(id);
                });
            });

            break;
        case "Monobank":
            currency.getMonoReply().then((text) => {
                bot.sendMessage(id, text).then((r) => {
                    defaultChoice(id);
                });
            });

            break;
        case "ПриватБанк":
            currency.getPrivatReply().then((text) => {
                bot.sendMessage(id, text).then((r) => {
                    defaultChoice(id);
                });
            });

            break;
        default:
            defaultChoice(id);
            break;
    }
});
