var app = angular.module("BACA_tetrisAngularJS");

app.controller("scoreController", function($scope, Page, userF, scoreResource) {
	Page.setTitle("Score");
	
	//$scope.id = userF.current.id;
	
	
		$scope.username = "";
		$scope.points = 0;
		$scope.niveau = 0;
	    $scope.date = "";
	    $scope.score = scoreResource.query();
	
	    
	    $scope.addScore = function() {
	    	this.score.push(userF.create(this.username,this.points, this.niveau, this.date));
	    	
	    	this.username = "";
	    	this.points = 0;
	    	this.niveau = 0;
	    	this.date = "";
	    	
	    };
	  $scope.show =   function() {
		  return(this.username != "" && this.points != 0 && this.niveau != 0 && this.date  != "");
	  }
});

//app.factory("scoreResource", function(API_URL, $resource) {
//    return $resource(API_URL + '/score', null);
//});