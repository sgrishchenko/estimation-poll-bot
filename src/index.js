const Telegraf = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN || "861074090:AAGwj5x6Hto9q1izTW-n_1O_rrTUToL6BDc";
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "https://estimation-poll-bot.herokuapp.com/";

const bot = new Telegraf(BOT_TOKEN);

bot.command('newestimate', (ctx) => {
    ctx.replyWithPoll('Estimation', [
        '1 story point',
        '2 story points',
        '3 story points',
        '5 story points',
        '8 story points',
        '13 story points',
        '21 story points',
    ], {
        is_anonymous: false,
    });
});

bot.command('help', (ctx) => {
    return ctx.reply('This bot will help you create polls for task estimation. Send /newestimate to create a new estimation poll.');
});

bot.telegram.setWebhook(`${URL}/bot`)
    .then(() => {
        bot.startWebhook('/bot', null, PORT);
        return bot.launch();
    })
    .then(() =>{
        console.log('Estimation Poll Bot is started!');
    });
