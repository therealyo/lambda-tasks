import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { sayHi } from './lib/controllers/start';
import { showHelpMessage } from './lib/controllers/help';
import { listRecent } from './lib/controllers/listRecent';
import mongoose from 'mongoose';
import { handleAddToFavourite } from './lib/controllers/addFavourite';
import { handleDeleteFromFavourite } from './lib/controllers/deleteFavourite';
import { handleListFavourite } from './lib/controllers/listFavourite';
import { handleSymbolRequest } from './lib/controllers/symbol';

dotenv.config();

const bot = new TelegramBot(process.env.TOKEN!, { polling: true });
mongoose.connect(process.env.MONGODB!, () => {
    console.log('Connected to database');
});

bot.setMyCommands([
    {
        command: 'start',
        description: 'Show you welcome message'
    },
    {
        command: 'help',
        description: 'List all existing commands'
    },
    {
        command: 'list_recent',
        description: 'Show top30 most valuable'
    },
    {
        command: 'symbol',
        description: 'Show detailed info about currency for last 24 hours'
    },
    {
        command: 'add_to_favourite',
        description:
            'Add currency to your list of tracked currencies. You must provide symbol of currency you want to add (ex. /add_to_favourite BTC)'
    },
    {
        command: 'delete_from_favourite',
        description:
            'Remove currency from your list of tracked currencies.You must provide symbol of currency you want to add (ex. /delete_from_favourite BTC)'
    },
    {
        command: 'list_favourites',
        description: 'Show your list of tracked currencies'
    }
]);

bot.onText(/\/start/, (msg, match) => {
    const hi = sayHi(msg);
    bot.sendMessage(msg.chat.id, hi);
});

bot.onText(/\/help/, (msg, match) => {
    const help = showHelpMessage();
    bot.sendMessage(msg.chat.id, help);
});

bot.onText(/\/list_recent/, async (msg, match) => {
    const data = await listRecent();
    bot.sendMessage(msg.chat.id, data);
});

bot.onText(/\/list_favourites/, async (msg, match) => {
    const response = await handleListFavourite(msg.chat.id);
    bot.sendMessage(msg.chat.id, `Your Favourites:\n${response}`);
});

bot.onText(/\/add_to_favourite (.{2,5}$)/, (msg, match) => {
    const symbol = match![1].toUpperCase();
    handleAddToFavourite(msg.chat.id, symbol);
    bot.sendMessage(msg.chat.id, `/${symbol} added to favourites`);
});

bot.onText(/\/delete_from_favourite (.{2,5}$)/, (msg, match) => {
    const symbol = match![1].toUpperCase();
    handleDeleteFromFavourite(msg.chat.id, symbol);
    bot.sendMessage(msg.chat.id, `/${symbol} deleted from favourites`);
});

bot.onText(/^\/(?!start$)(?!help$).{2,5}$/, async (msg, match) => {
    const symbol = match![0].replace('/', '');
    const reply = await handleSymbolRequest(symbol);
    // console.log(reply);
    bot.sendMessage(msg.chat.id, reply);
});
