require("dotenv").config();
const { Command } = require("commander");
const TelegramSender = require("node-telegram-bot-api");


const program = new Command();
const bot = new TelegramSender(process.env["TOKEN"], {polling: false});


program
    .name("Telegram Sender Bot")
    .description("Simple telegram bot that sends entered messages back to you");



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
