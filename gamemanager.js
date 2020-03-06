class GameManager {

  constructor() {
    const urlParams = new URLSearchParams(window.location.search);

    this.game = new Connect4('#game');
    this.state = 'reset';
    this.config = {
      channel: urlParams.get('channel'),
      invite: urlParams.get('invite') || 60,
      newgame: urlParams.get('newgame') || 10,
      playword: urlParams.get('playword') || '!play',
      resetword: urlParams.get('resetword') || '!reset',
      lang: urlParams.get('lang') || 'en',
    }

    this.info_elmt = document.getElementById('info');
    this.consigne_elmt = document.getElementById('consigne');
    this.leaderboard_elmt = document.getElementById('leaderboard');
    this.players_elmt = document.getElementById('players-list');
    this.infobox = document.querySelectorAll('.infobox');

    this.player1 = null;
    this.player2 = null;
    this.players_list = {};

    this.timeout = 0;
    this.interval_timer = null;
    this.current_player = null;

    this.play_column = 0;

    this.update_FSM('init');
  }

  update_FSM(new_state = null) {
    if(new_state) {
      this.state = new_state;
    }
    console.log('going to state ' + this.state);
    switch(this.state) {
      case 'init':
        if(!this.config.channel) {
          this.consigne_elmt.innerHTML = langs[this.config.lang].ERROR_NO_CHANNEL;
          return;
        }
        this.consigne_elmt.innerHTML = langs[this.config.lang].CONNECTING_TO.templatize({'channel': this.config.channel});
        this.init();
        break;
      case 'reset':
        if(this.interval_timer) {
          clearInterval(this.interval_timer);
        }

        this.player1 = null;
        this.player2 = null;
        this.players_list = {};

        this.game.reset();
        this.players_elmt.innerHTML = '';
        this.info_elmt.innerHTML = '';
        this.consigne_elmt.innerHTML = '';
        this.state = 'invite';
        // No break here, go straight to invite!

      case 'invite':
        this.timeout = this.config.invite;
        if(this.interval_timer) {
          clearInterval(this.interval_timer);
        }
        // Refresh message
        this.interval_timer = setInterval(() => {
          this.timeout -= 0.250;
          if(this.timeout < 0) {
            clearInterval(this.interval_timer);
            setTimeout(() => {
              this.consigne_elmt.innerHTML = langs[this.config.lang].STATE_DRAWING;
              this.update_FSM('pick_players');
            }, 1000);
          } else {
            this.consigne_elmt.innerHTML = langs[this.config.lang].ORDER_INVITE_PLAY.templatize({'playword': this.config.playword, 'timeout': Math.floor(this.timeout)});
          }
        }, 250);
        break;

      case 'pick_players':
        let keys = Object.keys(this.players_list);
        if(keys.length < 2) {
          console.error('Not enough players!');
          this.timeout = 5;
          if(this.interval_timer) {
            clearInterval(this.interval_timer);
          }
          // Refresh message
          this.interval_timer = setInterval(() => {
            this.timeout -= 0.250;
            if(this.timeout < 0) {
              clearInterval(this.interval_timer);
              this.update_FSM('reset');
            } else {
              this.consigne_elmt.innerHTML = langs[this.config.lang].INFO_NOT_ENOUGH_PLAYERS.templatize({'timeout': Math.floor(this.timeout)});
            }
          }, 250);
          return;
        }
        // Pick 2 differents players
        let rand1 = Math.floor((Math.random() * keys.length));
        let rand2 = rand1;
        while(rand2 === rand1) {
          rand2 = Math.floor((Math.random() * keys.length));
        }
        this.player1 = this.players_list[keys[rand1]];
        this.player2 = this.players_list[keys[rand2]];
        this.hideInfoBoxes();
        this.info_elmt.innerHTML = langs[this.config.lang].SHOWMATCH.templatize({'player1': this.player1.display, 'player2': this.player2.display});
        this.current_player = this.player1;
        this.state = 'play';
        // No need to break, let's play!

      case 'play':
        if(this.current_player == this.player1)
          this.consigne_elmt.innerHTML = langs[this.config.lang].RED_TURN.templatize({'player': this.current_player.display});
        else
          this.consigne_elmt.innerHTML = langs[this.config.lang].YELLOW_TURN.templatize({'player': this.current_player.display});
        /*
        this.timeout = 20;
        let waitTime = this.timeout;
        // Refresh message
        let interval = setInterval(() => {
          this.timeout -= 0.25;
          if(this.player1_turn)
            this.info_elmt.innerHTML = `<strong class="player yellow">${this.player1.display}</strong> à toi de jouer ! (${this.timeout}s)`;
          else
            this.info_elmt.innerHTML = `<strong class="player red">${this.player2.display}</strong> à toi de jouer ! (${this.timeout}s)`;
        }, 250);
        // update FSM after timeout
        setTimeout(() => {
          clearInterval(interval);
          this.state = 'play';
          this.update_FSM();
        }, waitTime * 1000);
        */
        break;

      case 'next_player':
        this.current_player = (this.current_player == this.player1) ? this.player2 : this.player1;
        this.update_FSM('play');
        break;

      case 'player_1_won':
        this.info_elmt.innerHTML = `<h1 class="player red">${this.player1.display} à gagné !</h1>`;
        this.info_elmt.innerHTML = langs[this.config.lang].RED_WON.templatize({'player': this.player1.display});
        this.update_FSM('new_game');
        break;

      case 'player_2_won':
        this.info_elmt.innerHTML = langs[this.config.lang].YELLOW_WON.templatize({'player': this.player2.display});
        this.update_FSM('new_game');
        break;

      case 'no_one_won':
        this.info_elmt.innerHTML = langs[this.config.lang].NO_WINNER;
        this.update_FSM('new_game');
        break;

      case 'new_game':
        this.hideInfoBoxes(false);
        this.timeout = this.config.newgame;
          if(this.interval_timer) {
            clearInterval(this.interval_timer);
          }
          // Refresh message
          this.interval_timer = setInterval(() => {
            this.timeout -= 0.250;
            if(this.timeout < 0) {
              clearInterval(this.interval_timer);
              this.update_FSM('reset');
            } else {
              this.consigne_elmt.innerHTML = langs[this.config.lang].NEW_GAME_IN.templatize({'timeout': Math.floor(this.timeout)});
            }
          }, 250);

        break;

      default:
        console.error(`${this.state} doesn't exist!`);
        break;
    }
  }

  try_move(data) {
    if(this.state !== 'play') {
      // we are not waiting for a player move
      console.error('We are not in play mode yet!');
      return;
    }
    if(data.id !== this.current_player.id) {
      // skip, the message is not emitted from the current player
      console.error('It is not this player turn yet');
      return;
    }
    // compute the move
    let column = parseInt(data.message[0]);
    if(isNaN(column)) {
      // not allowed move
      console.error(`This move is not allowed ${column}`);
      return;
    }
    column -= 1;
    if(column > 7 || column < 0) {
      // not allowed move
      console.error(`This move is not allowed ${column}`);
      return;
    }
    // Finally, try to make the move
    let ret = this.game.handle_play(column);
    if(ret === -1) {
      // wrong move, column is full
      console.error(`Column ${column} is full!`);
      return;
    }

    if(this.game.winner !== null) {
      // We have a winner! (maybe)
      if(this.game.winner === 1) {
        // Player 1 won
        console.log('Player 1 won');
        this.update_FSM('player_1_won');
      }
      else if(this.game.winner === 2) {
        // Player 2 won
        console.log('Player 2 won');
        this.update_FSM('player_2_won');
      }
      else if(this.game.winner === 0) {
        // No one won!
        console.log('No one won');
        this.update_FSM('no_one_won');
      }
    } else {
      this.update_FSM('next_player');
    }
  }

  add_player(player) {
    if(this.state !== 'invite') {
      // Not in the right state
      return;
    }
    if(this.players_list.hasOwnProperty(player.id)) {
      // Player already in the list, skip.
      return;
    }
    this.players_list[player.id] = player;
    // Add player to the list
    let li = document.createElement('li');
    li.textContent = player.display;
    this.players_elmt.appendChild(li);
  }

  hideInfoBoxes(hidden = true) {
    for(let idx = 0; idx < this.infobox.length; idx++) {
      if(hidden)
        this.infobox[idx].classList.add('hide');
      else
        this.infobox[idx].classList.remove('hide');
    }
  }

  resetGame() {
    this.update_FSM('reset');
  }

  init() {
    this.client = new tmi.Client({
      options: { debug: true },
      connection: {
        reconnect: true,
        secure: true
      },
      channels: [this.config.channel]
    });

    this.client.connect();

    this.client.on('connected', (address, port) => {
      this.update_FSM('reset');
    });

    this.client.on('message', (channel, tags, message, self) => {
      if(self)
        return;

      console.log(message);
      console.log(tags);
      if(message.startsWith(this.config.playword)) {
        this.add_player({
          'username': tags['username'],
          'display': tags['display-name'],
          'id': tags['user-id'],
        })
      } else if(message.startsWith(this.config.resetword)) {
        if((tags['mod'] === true) || tags['room-id'] === tags['user-id'])
          this.resetGame();
      } else {
        this.try_move({
          'id': tags['user-id'],
          'message': message,
        })
      }
    });
  }
}
