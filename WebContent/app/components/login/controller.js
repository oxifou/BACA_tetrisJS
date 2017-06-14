var app = angular.module("BACA_tetrisAngularJS");

app.controller("loginController", function($scope, $location, Page, utilisateurResource, userF) {
	
	Page.setTitle("Login");
	$scope.currentUser = userF.current;
	
	$scope.connexion = function(){
		var user = {
				username : $scope.username,
				password : $scope.password,
				
		}
		//utilisateurResource.co(user);
		userF.current = utilisateurResource.co(user, function() {
			$location.path("/");
		});
		
		
		//userF.current = user1;
	};
});




app.factory("utilisateurResource", function(API_URL, $resource) {
    return $resource(API_URL + '/account/auth', null, {
        'co': { method: 'POST' }
    	
    });
});

app.factory("userF", function() {
	return {
		current: false
	}
});