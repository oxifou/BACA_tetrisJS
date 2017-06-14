var app = angular.module("BACA_tetrisAngularJS");

app.controller("scoreController", function($scope, Page, userF) {
	Page.setTitle("Score");
	
	$scope.id = userF.current.id;
});