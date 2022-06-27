require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios").default;


const bot = new TelegramBot(process.env["TOKEN"], {polling: true});
console.log("Bot successfully started. Waiting for your message...");


bot.on("message", (msg) => {
    const chatID = msg.chat.id;
    const msgLower = msg.text.toLowerCase();

    if (msgLower.includes("photo")){
        axios.get("https://picsum.photos/200/300")
            .then((response) => {
                const request = response.request;
                const responseData = request['res'];
                const imgURL = responseData['responseUrl'];
                bot.sendPhoto(chatID, imgURL);
            });

    } else {
        const userData = msg.from;
        const fullName = userData['first_name'] + " " + userData['last_name'];
        console.log(`${fullName} написал ${msg.text}`);
        bot.sendMessage(chatID, `Вы написали: ${msg.text}`);
    }
})