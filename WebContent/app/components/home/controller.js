var app = angular.module("BACA_tetrisAngularJS");


app.controller("homeController", function($scope, Page, userF) {
	Page.setTitle("Accueil");
	
	$scope.username = userF.current.prenom;
});