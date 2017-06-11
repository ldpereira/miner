var app = angular.module('minerApp');
var prefix = "http://localhost:8084/MinerWS/service/";

app.factory('Service', ['$http', function ($http) {

    var service = {
        minerJ48: minerJ48
    };

    function minerJ48(file) {
        return $http.get(prefix + 'minerJ48/' + file);
    }

    return service;
}]);