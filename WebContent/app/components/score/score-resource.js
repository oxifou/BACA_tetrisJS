var app = angular.module("BACA_tetrisAngularJS");


app.factory("scoreResource", function(API_URL, $resource) {
    return $resource(API_URL + '/score', null);
});