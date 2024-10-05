from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
import requests
import random
from decouple import config

SLACK_APP_TOKEN = config("SLACK_APP_TOKEN")
SLACK_BOT_TOKEN = config("SLACK_BOT_TOKEN")
CODEFORCES_PROBLEMSET_API = "https://codeforces.com/api/problemset.problems"

app=App(token=SLACK_BOT_TOKEN)

def get_rating_range(difficulty):
    if difficulty == "easy":
        return (800, 1199)
    elif difficulty == "medium":
        return (1200, 1599)
    elif difficulty == "hard":
        return (1600, 3500)
    else:
        return None

def get_problem(difficulty_level):
    response = requests.get(CODEFORCES_PROBLEMSET_API)
    
    if not response:
        return None
    
    data = response.json()

    if data["status"] != "OK":
        return None

    problems = data["result"]["problems"]
    rating_range = get_rating_range(difficulty_level)
    
    if not rating_range:
        return None
    
    filtered_problems = [problem for problem in problems if "rating" in problem and rating_range[0] <= problem["rating"] <= rating_range[1]]
    
    if not filtered_problems:
        return None
    
    return random.choice(filtered_problems)

@app.event("app_mention")
def mention_handler(body, say):
    if not body["event"]["text"]:
        say("Please enter a valid text. Usage: @CodeBot easy/medium/hard")
        return
    
    difficulty_level = body["event"]["text"].split()[1]

    if difficulty_level not in ["easy", "medium", "hard"]:
        say("Please enter a valid text. Usage: @CodeBot easy/medium/hard")
        return

    problem = get_problem(difficulty_level)
    
    if not problem:
        say("Oops! Unable to get a fetch problem from codeforces. Try again!")
        return
    
    slack_msg = f"Hi. A Random Problem for you is: \nhttps://codeforces.com/problemset/problem/{problem['contestId']}/{problem['index']}"
    say(slack_msg)
    return

if __name__ == "__main__":
    handler = SocketModeHandler(app, SLACK_APP_TOKEN)
    handler.start()