"use strict";

var app = angular.module('minerApp');

app.controller('J48Ctrl', ['$scope', '$location', 'Service', function ($scope, $location, Service) {

    $scope.minerJ48 = minerJ48;
    $scope.mensagem = "Clique para realizar a mineração";
    $scope.data;

    $scope.collapse = function (node) {
        if (angular.isUndefined(node.collapsed)) {
            node.collapsed = false;
        } else {
            node.collapsed = !node.collapsed;
        }
    }

    function minerJ48() {
        $scope.mensagem = "Aguardando a execução no servidor";
        Service.minerJ48(angular.isUndefined($scope.file) ? "" : $scope.file).then(function success(response) {
            $scope.mensagem = "Consulta realizada com sucesso";
            $scope.data = response.data;
            console.log("Success");
            console.log(response.data);
        }, function error(response) {
            $scope.mensagem = "Consulta retornou com erros, visualize no console";
            console.log("Error");
            console.log(response.data);
        });
    }
}]);