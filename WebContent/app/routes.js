var app = angular.module("BACA_tetrisAngularJS"); 


app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "./app/components/home/home.html",
			controller: "homeController"
		})
		.when("/play", {
			templateUrl: "./app/components/tetris/tetris.html",
			controller: "homeController"
		})
		.when("/login", {
			templateUrl: "./app/components/login/login.html",
			controller: "loginController"
		})
		.when("/score", {
			templateUrl: "./app/components/score/score.html",
			controller: "scoreController"
		});	
}); 