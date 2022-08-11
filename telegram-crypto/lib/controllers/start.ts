import { Message } from 'node-telegram-bot-api';
import { showHelpMessage } from './help';

export const sayHi = (msg: Message) => {
    const name = msg.chat.first_name ? msg.chat.first_name : "unknown";
    const welcomeMessage = `Welcome to cryptoTelegramBot ${name}.\n\nUsing me, you can watch the current exchange rate of cryptocurrencies and their growth dynamics.\nYou can also track cryptocurrencies that you are interested in.\n\n`
    const helpMessage = showHelpMessage();
    return welcomeMessage + helpMessage;
};
