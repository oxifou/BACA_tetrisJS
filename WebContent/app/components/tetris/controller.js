var app = angular.module("BACA_tetrisAngularJS");


app.controller("tetrisController", function($scope, Page, tetris, tetrisGhost, tetrisScore) {
	Page.setTitle("Jouer");

	$scope.autoTetris = null;




	$scope.start = function() {
		angular.element('.board').children().remove();
		tetrisGhost.setBoard(angular.element('.board'));

		tetris.init();
		angular.element('.board').append(tetris.createTetrimino());

		this.nextMove();
	}


	$scope.nextMove = function() {
		var that = this;

		if (angular.element('.next-tetrimino .tetrimino').length) {
			angular.element('.board').append(angular.element('.next-tetrimino .tetrimino'));
		}

		angular.element('.next-tetrimino').children().remove();
		angular.element('.next-tetrimino').append(tetris.createTetrimino());

		tetris.tetrimino = angular.element('.board .tetrimino');
		tetrisGhost.update();


		clearInterval(this.autoTetris);
		this.autoTetris = setInterval(function() {
			tetris.moveToBottom();
		}, (1000 / tetrisScore.level));
	}




	/*
	 * Interception des touches
	 */
	angular.element(document).on('keydown', function(e) {
		var prevent = true;

		switch (e.keyCode) {
			case 13: tetris.pause(); break;
			case 37: tetris.moveToLeft(); break;
			case 38: tetris.changeFigure(); break;
			case 39: tetris.moveToRight(); break;
			case 40: tetris.moveToBottom(); break;
			case 32:
				tetris.hit(tetrisGhost.tetriPosition);
				tetris.moveToBottom();
				break;
			default: prevent = false; break;
		}

		if (prevent) {
			e.preventDefault();
		}
	});





	/*
	 * Interception d'un coup joué
	 */
	angular.element(tetris).on('hitPlayed', function() {
		tetris.tetrimino.css('top', (tetris.tetriPosition.y * tetris.sizeOfTetriminos) + 'px');
		tetris.tetrimino.css('left', (tetris.tetriPosition.x * tetris.sizeOfTetriminos) + 'px');
	});







	/*
	 * Interception d'un Tetrimino placé
	 */
	angular.element(tetris).on('tetriminoPut', function(e, blocPositions) {
		blocPositions.forEach(function(blocPosition) {
			var myNewBloc = tetris.tetrimino.find('.bloc:nth-child(1)').clone();

			myNewBloc.attr('data-ligne', blocPosition.y);
			myNewBloc.css('background', tetris.tetrimino.find('.bloc:nth-child(1)').css('background'));
			myNewBloc.css('top', (blocPosition.y * tetris.sizeOfTetriminos));
			myNewBloc.css('left', (blocPosition.x * tetris.sizeOfTetriminos));

			angular.element('.board').append(myNewBloc);
		});


		angular.element('.board .tetrimino').remove();
		$scope.nextMove();
	});



	/*
	 * Interception d'une (ou plusieurs) ligne(s) complétée(s)
	 */
	angular.element(tetris).on('rowsCompleted', function(e, completedRows) {
		tetrisScore.score(completedRows.length);

		completedRows.forEach(function(row) {
			angular.element('.bloc[data-ligne="' + row + '"]').addClass('removing');
		});


		setTimeout(function() {
			completedRows.forEach(function(row) {
				angular.element('.bloc[data-ligne="' + row + '"]').remove();


				for (var i = row + 1; i > 0; i--) {
					angular.element('.bloc[data-ligne="' + (i - 1) + '"]').each(function() {
						angular.element(this).attr('data-ligne', i);
						angular.element(this).css('top', (i * tetris.sizeOfTetriminos));
					});
				}
			});
		}, 250);
	});



	/*
	 * Interception d'une modification du score
	 */
	angular.element(tetrisScore).on('scoring', function() {
		angular.element('.score > span').html(tetrisScore.points);
		angular.element('.score > small > span').html(tetrisScore.lines);
	});
});
