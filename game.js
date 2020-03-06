class Connect4 {

  constructor(element_id, rows=6, cols=7) {
    this.rows = rows;
    this.cols = cols;
  	// 2D Array for the game state:
    //   0: empty
    //   1: player 1
    //   2: player 2
    this.board = Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = Array(this.cols).fill(0);
    }
    // integer: 1 or 2 (player id)
    this.turn = 1;
    // How many moves were played
    this.moves = 0;
    /*
      Winner id
        null: game is not over
           0: Draw
           1: Player 1 won
           2: Player 2 won
    */
    this.winner = null;

    // DOM element where to display the grid
    this.element = document.querySelector(element_id);
    // Render!
    this.render();
  }

  render() {
    let table = document.createElement('table');
    // ATTENTION, HTML is written from top to bottom so careful!
    for (let i = this.rows - 1; i >= 0; i--) {
      let tr = table.appendChild(document.createElement('tr'));
      for (let j = 0; j < this.cols; j++) {
        let td = tr.appendChild(document.createElement('td'));
        let colour = this.board[i][j];
        if (colour)
          td.className = 'player' + colour;
        td.dataset.column = j;
      }
    }
    this.element.innerHTML = '';
    this.element.appendChild(table);
  }

	set(row, column, player) {
    // Let's make the cell the right color
	  this.board[row][column] = player;
    // And increment move counter
    this.moves++;
	}

	play(column) {
    // Find the first available cell in the column
    let row;
    for (let i = 0; i < this.rows; i++) {
      if (this.board[i][column] == 0) {
        row = i;
        break;
      }
    }
    if (row === undefined) {
      return null;
    } else {
      // Play!
      this.set(row, column, this.turn);
      // Send back the row number
      return row;
    }
	}

  handle_play(column) {
    // Is the game still going on?
    if (this.winner !== null) {
  		if (window.confirm("Game over!\n\nDo you want to restart?")) {
  			this.reset();
        this.render();
			}
			return this.winner;
    }

  	if (column !== undefined) {
     	let row = this.play(parseInt(column));

      if (row === null) {
        // window.alert("Column is full!");
        return -1;
      } else {
        // Is it over?
        if (this.win(row, column, this.turn)) {
          this.winner = this.turn;
        } else if (this.moves >= this.rows * this.columns) {
          this.winner = 0;
        }
        // Next player: 3 - 2 = 1, 3 - 1 = 2
        this.turn = 3 - this.turn;

        // render!
        this.render()

        /*
        switch (this.winner) {
          case 0:
            window.alert("Null game!!");
            break;
          case 1:
            window.alert("Player 1 wins");
            break;
          case 2:
            window.alert("Player 2 wins");
            break;
        }
        */
        return this.winner;
      }
    }
  }

  /*
   Check if this is a winning move

   Return:
     true : Game is won by 'player'
     false: Game must go on
 */
	win(row, column, player) {
		// Horizontal
    let count = 0;
    for (let j = 0; j < this.cols; j++) {
      count = (this.board[row][j] == player) ? count+1 : 0;
      if (count >= 4) return true;
    }
		// Vertical
    count = 0;
    for (let i = 0; i < this.rows; i++) {
      count = (this.board[i][column] == player) ? count+1 : 0;
	    if (count >= 4) return true;
    }
		// Diagonal
    count = 0;
    let shift = row - column;
    for (let i = Math.max(shift, 0); i < Math.min(this.rows, this.cols + shift); i++) {
      count = (this.board[i][i - shift] == player) ? count+1 : 0;
    	if (count >= 4) return true;
    }
		// Anti-diagonal
    count = 0;
    shift = row + column;
    for (let i = Math.max(shift - this.cols + 1, 0); i < Math.min(this.rows, shift + 1); i++) {
      console.log(i,shift-i,shift)
      count = (this.board[i][shift - i] == player) ? count+1 : 0;
      if (count >= 4) return true;
    }

    return false;
	}

  // Reset the board
  reset() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.board[i][j] = 0;
      }
    }
		this.move = 0;
    this.winner = null;
	}
}
