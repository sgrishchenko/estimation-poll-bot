const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const Telegraf = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN || "861074090:AAGwj5x6Hto9q1izTW-n_1O_rrTUToL6BDc";
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "https://estimation-poll-bot.herokuapp.com/";

const bot = new Telegraf(BOT_TOKEN);

bot.command('newestimate', (ctx) => ctx.reply('Here will be a poll.'));

bot.telegram.setWebhook(`${URL}/bot`)
    .then(() => {
        bot.startWebhook(`/bot`, null, PORT);
        console.log('Estimation Poll Bot is started!');
    });

// axios
//     .post(
//         'https://api.telegram.org/bot861074090:AAGwj5x6Hto9q1izTW-n_1O_rrTUToL6BDc/sendPoll',
//         {
//             chat_id: message.chat.id,
//             is_anonymous: false,
//             question: 'Estimation',
//             options: [
//                 '1 story point',
//                 '2 story points',
//                 '3 story points',
//                 '5 story points',
//                 '8 story points',
//                 '13 story points',
//                 '21 story points',
//             ]
//         }
//     )
//     .then(() => {
//         console.log('Poll posted');
//         res.end('ok')
//     })
//     .catch(err => {
//         console.log('Error: ', err);
//         res.end('Error: ' + err)
//     })
