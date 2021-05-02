const Slackbot = require('slackbots');
const axios = require('axios');

const bot = new Slackbot({
    token: 'xoxb-2046280616400-2022490247106-Syk137gZUsBDUtTVkT5ytlhQ',
    name: 'codebot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:' 
    };

    bot.postMessageToChannel('codebot_channel', 'Time for some coding with @codebot', params)
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
    if(data.type != 'message') {
        return;
    }

    handleMessage(data.text);
});


// Respond to data
function handleMessage(message){
    if(message.includes(' problem')){
        randomProgram();
    }
}

// Function to print random index
function randomIndex(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

// Give a random program
function randomProgram(){
    axios.get('https://codeforces.com/api/problemset.problems')
    .then(res => {

        arr_length = res.data.result.problems.length;
        // console.log(arr_length);

        const random_index = randomIndex(0, arr_length);
        const program_contest_id = res.data.result.problems[random_index].contestId;
        const program_index = res.data.result.problems[random_index].index;

        const params = {
            icon_emoji: ':wink:' 
        };

        bot.postMessageToChannel('codebot_channel', 
        `A Random Problem for you is: \nhttps://codeforces.com/problemset/problem/${program_contest_id}/${program_index}`, 
        params);

    });
    
}