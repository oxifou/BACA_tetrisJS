var app = angular.module("BACA_tetrisAngularJS"); 


app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "./app/components/home/home.html",
			controller: "homeController"
		})
		.when("/play", {
			templateUrl: "./app/components/tetris/tetris.html",
			controller: "tetrisController"
		});	
}); 