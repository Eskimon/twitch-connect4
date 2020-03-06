*(Note: If you like this, I think you will like my streamin management tool: [DeckyDecky](https://deckydecky.com), One tool to rule them all :D !)*

# Installation

EZ. Copy-paste the following link to a "browser element" in your (Streamlabs-)OBS: <https://eskimon.com/twitch-connect4?channel=your-channel-name> .

And... it's done ! But read the following line to now how to connect it to your own channels :D

# Customization

To configure the bot, you need to tweak the URL that you paste. The simplest is to juste update the channel (i.e. your twitch channel name) for the bot to know where to connect.
To do so, simply add a `channel` parameter to the URL like so: `https://eskimon.com/twitch-connect4?channel=eskimon` (in that case, the bot connect to "eskimon" channel).

Here are the possible parameters:
- `channel`: The name of the channel to connect to (default = empty, required)
- `invite`: The timeout for players to register to play (optional, default = `60s`)
- `newgame`: The endgame timeout before a new game start (optional, default = `10`s)
- `playword`: The keyword to register (optional, default = `!play`)

For example, if you want the bot to be working on eskimon's chat, with an invite period of 2 minutes before the game start, a pause of 30s at the end of the game and the keyphrase *!iwannaplay* to try to join the next game write this: `https://eskimon.com/twitch-connect4?channel=eskimon&invite=120&newgame=30&playword=!iwannaplay` .

# Contributing

Any PR and translation is welcomed!

If you have idea or want to help in some way but don't know how to write code, you can drop me a DM on twitter [@Eskimon_fr](https://twitter.com/Eskimon_fr) :)
