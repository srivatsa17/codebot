# Slack Codebot
This is a slack bot that generates random programs using the codeforces api.

Pre-requisites:
* Create a workspace in slack 
* Create a classical legacy bot app in slack workspace [Slack App](https://api.slack.com/apps?new_classic_app=1 "Slack App")
* In the slack workspace, create a channel with the name `codebot_channel` 


How to run:<br/>
Run the following commands on your local system

```
$ git clone https://github.com/srivatsa17/slack_codebot.git

$ cd slack_codebot
```

* Download axios and slackbots in the local directory `npm i axios slackbots`
* Inside the index.js file, add your bot token.
* Run the code using the command `npm start` inside the local directory.
* Type `@Codebot problem` which generates a problem of codeforces to be solved.

Note - local directory: `slack_codebot`
