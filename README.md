# Slack_Codebot
This is a slack codebot that generates random programs using the codeforces api.

Pre-requisites:
1. Create a workspace in slack 
2. Create a classical legacy bot app in slack workspace [Slack App](https://api.slack.com/apps?new_classic_app=1 "Slack App")
3. Download axios and slackbots in the local directory `npm i axios slackbots`.

How to run:
Run the following commands on your local system

```
$git clone https://github.com/srivatsa17/slack_codebot.git
$cd slack_codebot
```

* Inside the index.js file, add your bot token.
* Run the code using the command `npm start` inside the local directory.
* In the slack workspace, type `@Codebot problem` which generates a problem in random.


