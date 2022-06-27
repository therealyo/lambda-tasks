require("dotenv").config();
const { Command } = require("commander");
const TelegramSender = require("node-telegram-bot-api");


const program = new Command();
const token = "5445242861:AAFvKOv91wQy4U5qhfOuZ8hhGyM8Jlz7df4";
const bot = new TelegramSender(token, {polling: false});


program
    .name("Telegram Sender Bot")
    .description("Simple telegram bot that sends entered messages back to you");


program.command("t <string>")
    .action((str) => {
        for (let i = 0; i <= 10; i++){
            bot.sendMessage(process.env["CHAT_ID"], str);
        }
    });


program.command("m <string>")
    .description("Sending your entered message back to you via bot")
    .action((str) => {
        bot.sendMessage(process.env["CHAT_ID"], str);
    });


program.command("p <path>")
    .description("Sending photo back to you by entered path via bot. To use it simply drag image to console.")
    .action((path) => {
        bot.sendPhoto(process.env["CHAT_ID"], path);
    });


program.parse();
