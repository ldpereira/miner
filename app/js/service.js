var app = angular.module('minerApp');
var prefix = "http://localhost:8084/MinerWS/service/";

app.factory('Service', ['$http', function ($http) {

    var service = {
        minerJ48: minerJ48,
        minerJ48File: minerJ48File
    };

    function minerJ48() {
        return $http.get(prefix + 'minerJ48');
    }

    function minerJ48File(file) {
        return $http.post(prefix + 'minerJ48File', file, {'Content-Type': 'application/x-www-form-urlencoded'});
    }

    return service;
}]);