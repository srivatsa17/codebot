const Slackbot = require('slackbots');
const axios = require('axios');
const fs = require('fs');

const bot = new Slackbot({
    token: 'xoxb-2046280616400-2022490247106-osL7exYNKYv6OjpY5uQo3DwR',
    name: 'codebot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:' 
    };

    bot.postMessageToChannel('codebot_channel', 
        'Time for some coding with @Codebot\n', 
        params
    );
    
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
    if(message.includes(' easy')){
        easyRandomProblem();
    } else if(message.includes(' medium')){
        mediumRandomProblem();
    } else if(message.includes(' hard')){
        hardRandomProblem();
    }
} 


// Give a easy level random program
function easyRandomProblem(){
    axios.get('https://codeforces.com/api/problemset.problems')
    .then(res => {

        const params = {
            icon_emoji: ':wink:' 
        };

        const easy_problems_api = fs.readFileSync('./easy_problems_api.json')
        easy_problems = JSON.parse(easy_problems_api);

        rand = Math.floor(Math.random() * easy_problems.problems.length);
        program_contest_id = easy_problems.problems[rand].contestId;
        program_index = easy_problems.problems[rand].index;

        console.log(easy_problems.problems[rand]);

        bot.postMessageToChannel('codebot_channel', 
        `A Random Problem for you is: \nhttps://codeforces.com/problemset/problem/${program_contest_id}/${program_index}`, 
        params);

    });
    
}

//Give a medium level random problem
function mediumRandomProblem(){
    axios.get('https://codeforces.com/api/problemset.problems')
    .then(res => {

        const params = {
            icon_emoji: ':wink:' 
        };

        const medium_problems_api = fs.readFileSync('./medium_problems_api.json')
        medium_problems = JSON.parse(medium_problems_api);

        rand = Math.floor(Math.random() * medium_problems.problems.length);
        program_contest_id = medium_problems.problems[rand].contestId;
        program_index = medium_problems.problems[rand].index;

        console.log(medium_problems.problems[rand]);

        bot.postMessageToChannel('codebot_channel', 
        `A Random Problem for you is: \nhttps://codeforces.com/problemset/problem/${program_contest_id}/${program_index}`, 
        params);

    });
    
}

// Give a hard level random problem
function hardRandomProblem(){
    axios.get('https://codeforces.com/api/problemset.problems')
    .then(res => {

        const params = {
            icon_emoji: ':wink:' 
        };

        const hard_problems_api = fs.readFileSync('./hard_problems_api.json')
        hard_problems = JSON.parse(hard_problems_api);

        rand = Math.floor(Math.random() * hard_problems.problems.length);
        program_contest_id = hard_problems.problems[rand].contestId;
        program_index = hard_problems.problems[rand].index;

        console.log(hard_problems.problems[rand]);

        bot.postMessageToChannel('codebot_channel', 
        `A Random Problem for you is: \nhttps://codeforces.com/problemset/problem/${program_contest_id}/${program_index}`, 
        params);

    });
    
}
