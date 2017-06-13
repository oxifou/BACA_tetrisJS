var app = angular.module("BACA_tetrisAngularJS");

app.controller("loginController", function($scope, Page, utilisateurResource) {
	
	Page.setTitle("Login");
	$scope.connexion = function(){
		var user = {
				username : $scope.username,
				password : $scope.password
		}
		utilisateurResource.co(user)
	};
	
	

});

app.factory("utilisateurResource", function(API_URL, $resource) {
    return $resource(API_URL + '/account/auth', null, {
        'co': { method: 'POST' }
    });
});

