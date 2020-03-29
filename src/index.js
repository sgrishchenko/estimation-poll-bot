const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/', (req, res) => {
    res.send('Estimation Poll Bot is working!');
});

app.post('/new-message', (req, res) => {
    const {message} = req.body;

    if (!message || message.text.toLowerCase().indexOf('marco') < 0) {
        return res.end()
    }

    axios
        .post(
            'https://api.telegram.org/bot861074090:AAGwj5x6Hto9q1izTW-n_1O_rrTUToL6BDc/sendPoll',
            {
                chat_id: message.chat.id,
                question: 'Estimation',
                options: [
                    '1 story point',
                    '2 story points',
                    '3 story points',
                    '5 story points',
                    '8 story points',
                    '13 story points',
                    '21 story points',
                ]
            }
        )
        .then(() => {
            console.log('Poll posted');
            res.end('ok')
        })
        .catch(err => {
            console.log('Error: ', err);
            res.end('Error: ' + err)
        })
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Estimation Poll Bot is started on port 3000!')
});
