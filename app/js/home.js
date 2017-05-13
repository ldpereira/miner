"use strict";

var app = angular.module('minerApp');

app.controller('HomeCtrl', ['$scope','$location', 'Service', function($scope, $location, Service) {
    //$rootScope.activeTab = $location.path();
    $scope.click = click;

    function click() {        
    }
}]);