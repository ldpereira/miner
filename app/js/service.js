var app = angular.module('minerApp');
var prefix = "http://localhost:8084/MinerWS/service/";

app.factory('Service', ['$http', function ($http) {

    var service = {
        minerJ48: minerJ48,
        getContacts: getContacts,
        sendMessage: sendMessage
    };

    function minerJ48(teste) {
        return $http.get(prefix + 'minerJ48/' + teste);
    }

    function getContacts(group) {
        return $http.get(prefix + 'getContacts/' + group);
    }

    function sendMessage(group, message, user) {
        return $http.get(prefix + 'sendMessage/' + group + "/" + user + "/" + message);
    }

    return service;
}]);