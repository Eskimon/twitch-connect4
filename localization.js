/*
  Dear translators,

  Thanks for your help to make this funny bot even more accessible to everyone.
  If you want to add a trad, simply copy a block and add a "key" for your language (like "fr" for french).
  Then, edit all the relevant strings but DO NOT change the first parameter, it is use to identify the string!
  Information between brackets like "{player}" will be automagically replace during the game, so leave it between brackets!

  Have fun!
*/

const langs = {

  'en': {
    'ORDER_INVITE_PLAY': 'Type <kbd>{playword}</kbd> to join ! ({timeout}s remaining)',
//  ^ DO NOT EDIT THAT^:  ^^^^^^^^^^^^^^^  EDIT THAT ;) ^^^^^^^^^^^^^^^
    'ERROR_NO_CHANNEL': `No channel specified`,
    'CONNECTING_TO': 'Connection to {channel}...',
    'STATE_DRAWING': 'Drawing the players...',
    'INFO_NOT_ENOUGH_PLAYERS': 'Not enough players, starting over in {timeout} seconds!',
    'SHOWMATCH': '<strong class="player red">{player1}</strong> vs. <strong class="player yellow">{player2}</strong> !',
    'RED_TURN': '<strong class="player red">{player}</strong> its your turn!',
    'YELLOW_TURN': '<strong class="player yellow">{player}</strong> you\'re up!',
    'RED_WON': '<h1 class="player red">{player} won!</h1>',
    'YELLOW_WON': '<h1 class="player yellow">{player} won!</h1>',
    'NO_WINNER': '<h1 class="player">It\'s a draw!</h1>',
    'NEW_GAME_IN': 'A new game will take place in {timeout} seconds!',
  },

  'fr': {
    'ERROR_NO_CHANNEL': 'Aucun channel spécifié !',
    'CONNECTING_TO': 'Connexion à {channel}...',
    'STATE_DRAWING': 'Tirage au sort des joueurs en cours...',
    'ORDER_INVITE_PLAY': 'Tapez <kbd>{playword}</kbd> pour jouer ! ({timeout}s restantes)',
    'INFO_NOT_ENOUGH_PLAYERS': 'Pas assez de joueurs, on recommence dans {timeout} secondes!',
    'SHOWMATCH': '<strong class="player red">{player1}</strong> affronte <strong class="player yellow">{player2}</strong> !',
    'RED_TURN': '<strong class="player red">{player}</strong> à toi de jouer !',
    'YELLOW_TURN': '<strong class="player yellow">{player}</strong> à toi de jouer !',
    'RED_WON': '<h1 class="player red">{player} à gagné !</h1>',
    'YELLOW_WON': '<h1 class="player yellow">{player} à gagné !</h1>',
    'NO_WINNER': '<h1 class="player">Match nul !</h1>',
    'NEW_GAME_IN': 'Une nouvelle partie démarre dans {timeout} secondes!',
  }

}
