*(Note: If you like this, I think you will like my streaming management tool: [DeckyDecky](https://deckydecky.com), One tool to rule them all 😀 !)*

- 🇺🇸 For instructions in English: Stay here!
- 🇫🇷 Pour des instructions en Francais : [c'est ici](https://github.com/Eskimon/twitch-connect4/blob/master/README.fr.md) !

# Installation

EZ. Copy-paste the following link to a "browser element" in your (Streamlabs-)OBS: <https://eskimon.fr/twitch-connect4?channel=your-twitch-channel> .

And... it's done ! But read the following line to now how to connect it to your own channels 😉

When the game starts, viewers have time (see "Customization" below) to join the game.
Then, the bot draw 2 names to come and play.
During their turn, the player need to send the column number to play (1 to 7).
And that's it!

# Customization

To configure the bot, you need to tweak the URL that you paste. The simplest is to juste update the channel (i.e. your twitch channel name) for the bot to know where to connect.
To do so, simply edit the `channel` parameter in the URL, like this: `https://eskimon.fr/twitch-connect4?channel=eskimon` (in that case, the bot connect to "eskimon" channel).

Here are the possible parameters:
- `channel`: The name of the channel to connect to (**required**)
- `lang`: Language for all the user messages (optional, default = `en`, availables are `en`, `fr`, see [that file](https://github.com/Eskimon/twitch-connect4/blob/master/localization.js))
- `invite`: The timeout for players to register to play (optional, default = `60s`)
- `newgame`: The endgame timeout before a new game start (optional, default = `10`s)
- `playword`: The keyword to register (optional, default = `!play`)
- `resetword`: The keyword to force a game reset, see "Extra" (optional, default = `!reset`)

For example, if you want the bot to be working on eskimon's chat, with an invite period of 2 minutes before the game start, a pause of 30s at the end of the game and the keyphrase *!iwannaplay* to try to join the next game write this: `https://eskimon.fr/twitch-connect4?channel=eskimon&invite=120&newgame=30&playword=!iwannaplay` .

# Extra

If the game is stuck (someone left and isn't playing anymore for example), the channel owner or a channel mod can type `!reset` (or `resetword`) to reset the game.

# Contributing

Any PR and translation is welcomed!

If you have idea or want to help in some way but don't know how to write code, you can drop me a DM on Twitter [@Eskimon_fr](https://twitter.com/Eskimon_fr) 😉
