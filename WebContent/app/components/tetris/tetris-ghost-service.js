var app = angular.module("BACA_tetrisAngularJS");


app.service("tetrisGhost", function(tetris) {
	var myGhostTetrimino = null;
	var that = this;
	
	
	this.board = null;
	this.tetriPosition = null;
	
	
	/*
	 * Indiquer qu'elle board on utilise
	 */
	this.setBoard = function(board) {
		this.board = board;
	};
	
	
	
	/*
	 * Mettre à jour le fantôme
	 */
	this.update = function() {
		if (myGhostTetrimino) {
			myGhostTetrimino.remove();
		}
		
		myGhostTetrimino = tetris.tetrimino.clone();
		myGhostTetrimino.addClass('ghost');
		this.board.append(myGhostTetrimino);
		
		
		var myFigure = tetris.getFigure();
		
		for (var i = tetris.boardGrid.length - 1; i >= 0; i--) {
			this.tetriPosition = { x: tetris.tetriPosition.x, y: (i - myFigure.h + 1) };
			if (tetris.isPlayable(this.tetriPosition)) {
				myGhostTetrimino.css('top', (this.tetriPosition.y * tetris.sizeOfTetriminos) + 'px');
				break;
			}
		}
		
		myGhostTetrimino.css('left', (tetris.tetriPosition.x * tetris.sizeOfTetriminos) + 'px');
	};
	
	
	$(tetris).on('hitPlayed', function() {
		that.update();
	});
});