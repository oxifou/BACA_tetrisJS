var app = angular.module("BACA_tetrisAngularJS");

app.factory('TetrisPartieProvider', [ '$resource', 'API_URL',
		function($resource, API_URL) {
			return $resource(API_URL + '/partie', null, {
				'add' : {
					method : 'PUT'
				}
			});
		} ]);
