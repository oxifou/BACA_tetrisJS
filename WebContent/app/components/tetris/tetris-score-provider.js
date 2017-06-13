var app = angular.module("BACA_tetrisAngularJS");



app.provider("tetrisScore", function() {
	function TetrisScore() {
		this.points = 0;
		this.lines = 0;
		this.level = 1;
		
		
		this.score = function(nbRows) {
			if (nbRows) {
				this.lines += nbRows;
				
				switch (nbRows) {
					case 1: this.points += 40 * (this.level + 1); break;
					case 2: this.points += 100 * (this.level + 1); break;
					case 3: this.points += 300 * (this.level + 1); break;
					case 4: this.points += 1200 * (this.level + 1); break;
				}
				
				if (this.lines % 10 == 0) {
					this.level++;
				}
				
				$(this).trigger('scoring');
			}
		}
	}
	
	
	this.$get = function() {
		return new TetrisScore();
	}
});