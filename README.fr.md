*(Note : Si vous aimez ceci, alors vous aimerez sûrement mon outil de management de stream : [DeckyDecky](https://deckydecky.com) 😉 )*

🇺🇸 For instructions in English: [Go there](https://github.com/Eskimon/twitch-connect4/blob/master/README.md)!
🇫🇷 Pour des instructions en Francais : c'est ici !

# Installation

Facile. Copier-Coller le lien suivant dans un élément "navigateur" dans votre outil de streaming comme (Streamlabs-)OBS: <https://eskimon.fr/twitch-connect4?channel=votre-chaine-twitch> .

Et voilà. C'est fini ! Mais lisez quand même la suite pour savoir un peu mieux comment configurer l'outil 😀 .

## Déroulement d'une partie

Quand le jeu commence, les viewers ont du temps (cf. "Customisation") pour rejoindre la partie.
Ensuite, le bot va choisir deux joueurs qui vont se défier.
Chacun leur tour, les joueurs vont devoir envoyer le numéro de la colonne qu'ils souhaitent jouer.
Et voila !

# Customisation

Le bot peut-être configuré. Il suffira pour cela de modifier l'URL copiée dans le logiciel de streaming.
La modification la plus importante est de préciser votre nom de chaîne Twitch pour que le bot puisse s'y connecter et lire le chat.

Pour cela, éditez simplement le paramètre `channel` dans l'URL : `https://eskimon.fr/twitch-connect4?channel=eskimon` (se connectera par exemple à la chaîne "eskimon")

Il y a aussi d'autres paramètres modifiables:
- `channel`: Le nom de la chaîne sur laquelle se connecter  (**nécessaire**)
- `lang`: La langue à utiliser (optionel, par défaut = `en`, les langues disponibles sont are `en` et `fr`, voire [ce fichier](https://github.com/Eskimon/twitch-connect4/blob/master/localization.js))
- `invite`: Le temps d'attente pour que les joueurs puissent s'inscrire en début de partie (optionnel, par défaut = `60s`)
- `newgame`: Le temps d'attente en fin de partie, avant le lancement d'une nouvelle partie (optionnel, par défaut = `10`s)
- `playword`: Le mot-clé pour s'inscrire à une partie (optionnel, par défaut = `!play`)
- `resetword`: Le mot-clé pour relancer une partie, voire la partie "Extra" (optionnel, par défaut = `!reset`)

Par example, si vous voulez que le bot fonctionne sur la chaîne d'Eskimon, en français, avec une période d'inscriptions de 2 minutes avant le début de chaque partie, une période de 30 en fin de partie et le mot-clé `!jeveuxjouer` pour s'inscrire alors il faudra utiliser l'URL : `https://eskimon.fr/twitch-connect4?channel=eskimon&invite=120&newgame=30&playword=!jeveuxjouer` .

# Extra

Si le jeu est bloqué (un joueur est AFK ou a quitté le chat par exemple), un modo ou le propriétaire de la channel peut envoyer la commande `!reset` (ou `resetword`) pour redémarrer une partie.

# Contribuer

Toute contribution est la bienvenue !

Si vous avez des idées ou voulez aider mais ne savez pas coder, vous pouvez toujours m'envoyer un DM sur Twitter [@Eskimon_fr](https://twitter.com/Eskimon_fr) 😉
