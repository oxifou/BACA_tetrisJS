var app = angular.module("BACA_tetrisAngularJS");



app.provider("tetris", function() {
	var largeur = 0;
	var hauteur = 0;
	var sizeOfTetriminos = 0;


	this.setLargeur = function(_largeur) {
		largeur = _largeur;
	};

	this.setHauteur = function(_hauteur) {
		hauteur = _hauteur;
	};

	this.setSizeOfTetriminos = function(_sizeOfTetriminos) {
		sizeOfTetriminos = _sizeOfTetriminos;
	};



	function Tetris(tetriminoResource) {
		this.tetriminos = tetriminoResource.query();
		this.sizeOfTetriminos = sizeOfTetriminos;
		this.tetrimino = null;
		this.tetriPosition = { };
		this.boardGrid = [];
		this.isPaused = false;




		/*
		* Initialiser le jeu
		*/
		this.init = function() {
			console.log(this.tetriminos);
			this.tetrimino = null;
			this.tetriPosition = { };
			this.boardGrid = [];
			this.isPaused = false;

			//Génération de la grille
			for (var i = 0; i < hauteur; i++) {
				this.boardGrid[i] = [];

				for (var j = 0; j < largeur; j++) {
					this.boardGrid[i][j] = 0;
				}
			}
		}





		/*
		 * Créer un Tetrimino
		 */
		this.createTetrimino = function() {
			var mySelectedTetrimino = this.tetriminos[Math.floor(Math.random() * this.tetriminos.length)];


			this.tetrimino = angular.element('<div class="tetrimino" data-figure="0" />');
			this.tetriPosition = { x: 0, y: 0 };

			this.tetrimino.data('source', mySelectedTetrimino);
			this.tetrimino.data('figures', mySelectedTetrimino.figures);

			this.drawFigure(mySelectedTetrimino.figures[0]);


			return this.tetrimino;
		};



		/*
		 * Dessiner la figure
		 */
		this.drawFigure = function(figure) {
			var that = this;


			this.tetrimino.children().remove();

			figure.blocs.forEach(function(bloc) {
				var myBloc = angular.element('<div class="bloc" />');

				myBloc.css('background-color', that.tetrimino.data('source').couleur);
				myBloc.css('top', sizeOfTetriminos * bloc.positionY);
				myBloc.css('left', sizeOfTetriminos * bloc.positionX);

				that.tetrimino.append(myBloc);
			});
		}





		/*
		 * Se déplacer à gauche
		 */
		this.moveToLeft = function() {
			this.hit({ x: this.tetriPosition.x - 1, y: this.tetriPosition.y });
		};




		/*
		 * Se déplacer à droite
		 */
		this.moveToRight = function() {
			this.hit({ x: this.tetriPosition.x + 1, y: this.tetriPosition.y });
		};




		/*
		 * Se déplacer en bas
		 */
		this.moveToBottom = function() {
			if (!this.hit({ x: this.tetriPosition.x, y: this.tetriPosition.y + 1 })) {
				this.play();
			}
		};




		/*
		 * Touche vers le haut = changement de figure
		 */
		this.changeFigure = function() {
			if (!this.isPaused) {
				var myFiguresCount = this.tetrimino.data('figures').length - 1;

				//On incrémente la figure si on a pas atteint le maximum
				if (parseInt(this.tetrimino.attr('data-figure')) < myFiguresCount) {
					this.tetrimino.attr('data-figure', parseInt(this.tetrimino.attr('data-figure')) + 1);
				}

				//Sinon on repart à 0
				else {
					this.tetrimino.attr('data-figure', 0);
				}


				//On dessine la figure
				this.drawFigure(this.tetrimino.data('figures')[this.tetrimino.attr('data-figure')]);


				//On vérifie que la nouvelle position du Tetrimino est possible
				for (var i = this.tetriPosition.y; i >= 0; i--) {
					var isOK = false;

					for (var j = this.tetriPosition.x; j >= 0; j--) {
						if (this.hit({ x: j, y: i })) {
							isOK = true;
							break;
						}
					}

					if (isOK) {
						break;
					}
				}
			}
		};





		/*
		 * Récupérer la figure du Tetrimino actuelle
		 */
		this.getFigure = function() {
			var myFigures = this.tetrimino.data('figures');
			var myFigure = myFigures[parseInt(this.tetrimino.attr('data-figure'))];

			var myHauteur = 0;
			var myLargeur = 0;
			var myFigureArray = [];


			myFigure.blocs.forEach(function(bloc) {
				if (myHauteur < bloc.positionY) {
					myHauteur = bloc.positionY;
				}

				if (myLargeur < bloc.positionX) {
					myLargeur = bloc.positionX;
				}
			});


			//On met +1 à la hauteur et à la largeur, puisque les index démarrent à 0
			myHauteur++;
			myLargeur++;


			for (var i = 0; i < myHauteur; i++) {
				myFigureArray[i] = [];

				for (var j = 0; j < myLargeur; j++) {
					myFigureArray[i][j] = 0;
				}
			}

			myFigure.blocs.forEach(function(bloc) {
				myFigureArray[bloc.positionY][bloc.positionX] = 1;
			});


			return {
				figure: myFigureArray,
				h: myHauteur,
				l: myLargeur
			};
		};







		/*
		 * Tester si le coup est jouable
		 */
		this.isPlayable = function(tetriPosition) {
			var myFigure = this.getFigure();


			//On vérifie si on peut jouer ce coup
			for (var i = tetriPosition.y; i < (tetriPosition.y + myFigure.h); i++) {
				for (var j = tetriPosition.x; j < (tetriPosition.x + myFigure.l); j++) {
					if ((!this.boardGrid[i]) || ((this.boardGrid[i][j] != 0) && (myFigure.figure[i - tetriPosition.y][j - tetriPosition.x] != 0))) {
						return false;
					}
				}
			}

			return true;
		};







		/*
		 * Jouer un coup
		 */
		this.hit = function(tetriPosition) {
			if (!this.isPaused) {
				var isPlayable = this.isPlayable(tetriPosition);


				//Si on peut jouer ce coup, alors on y va !
				if (this.isPlayable(tetriPosition)) {
					this.tetriPosition.x = tetriPosition.x;
					this.tetriPosition.y = tetriPosition.y;

					angular.element(this).trigger('hitPlayed');
				}


				return isPlayable;
			}
		};







		/*
		 * Placer le Tetrimino
		 */
		this.play = function() {
			if (!this.isPaused) {
				var myFigure = this.getFigure();
				var myBlocPositions = [];
				var isGameOver = false;

				for (var i = this.tetriPosition.y; i < this.tetriPosition.y + myFigure.h; i++) {
					for (var j = this.tetriPosition.x; j < this.tetriPosition.x + myFigure.l; j++) {
						if ((this.boardGrid[i]) && (this.boardGrid[i][j] == 0)) {
							this.boardGrid[i][j] = myFigure.figure[i - this.tetriPosition.y][j - this.tetriPosition.x];

							if (this.boardGrid[i][j] > 0) {
								myBlocPositions.push({ x: j, y: i });
							}
						}

						else {
							if (i == 0) {
								isGameOver = true;
							}
						}
					}
				}


				if (!isGameOver) {
					angular.element(this).trigger('tetriminoPut', [ myBlocPositions ]);
					this.checkCompletedRows();
				}

				else {
					angular.element(this).trigger('gameOver');
				}
			}
		};




		/*
		 * Vérifier les lignes complétées
		 */
		this.checkCompletedRows = function() {
			var isRowCompleted = true;
			var completedRows = [];

			for (var i = 0; i < this.boardGrid.length; i++) {
				var isRowCompleted = true;

				for (var j = 0; j < this.boardGrid[i].length; j++) {
					if (this.boardGrid[i][j] == 0) {
						isRowCompleted = false;
						break;
					}
				}


				if (isRowCompleted) {
					completedRows.push(i);
				}
			}


			angular.element(this).trigger('rowsCompleted', [ completedRows ]);

			for (var i = 0; i < completedRows.length; i++) {
				this.boardGrid.splice(completedRows[i], 1);
				this.boardGrid.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
			}
		};




		/*
		 * Mettre en pause
		 */
		this.pause = function() {
			this.isPaused = !this.isPaused;
		}
	};




	this.$get = function(tetriminoResource) {
		return new Tetris(tetriminoResource);
	};
});
