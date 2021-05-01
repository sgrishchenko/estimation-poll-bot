import 'dotenv/config.js';
import {createServer} from 'http';
import {Telegraf} from 'telegraf';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const PORT = Number(process.env.PORT) ?? 3000;

const BOT_URL = process.env.BOT_URL ?? '';
const BOT_TOKEN = process.env.BOT_TOKEN ?? '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('newestimate', (ctx) => {
    ctx.replyWithPoll('Estimation', [
        'Show results',
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

const requestListener = (request, response) => {
    if (request.url === '/') {
        bot.telegram.getWebhookInfo().then((webhookInfo) => {
            const result = {
                telegramIsHooked: webhookInfo.url.includes(BOT_URL),
            };

            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(result, null, 2));
        });
    } else {
        bot.webhookCallback(`/bot${BOT_TOKEN}`)(request, response);
    }
};

if (NODE_ENV === 'production') {
    bot.telegram.setWebhook(`${BOT_URL}/bot${BOT_TOKEN}`).then(() => {
        const server = createServer(requestListener);
        server.listen(PORT, () => {
            console.log('Estimation Poll Bot is started!');
        })
    });
} else {
    bot.launch().then(() => {
        console.log('Estimation Poll Bot is started!');
    });
}
