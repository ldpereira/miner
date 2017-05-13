"use strict";

var app = angular.module('minerApp');

app.controller('J48Ctrl', ['$scope', '$location', 'Service', function($scope, $location, Service) {
    
    $scope.minerJ48 = minerJ48;
    $scope.mensagem = "Clique para realizar a mineração";

    function minerJ48() {
        $scope.mensagem = "Aguardando a execução no servidor";
        Service.minerJ48('teste').then(function success(response) {
            $scope.mensagem = response.data;
            console.log("Success");
            console.log(response);
        }, function error(response) {
            $scope.mensagem = response.data;
            console.log("Error");
            console.log(response);
        });
    }
}]);