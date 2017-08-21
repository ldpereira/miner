"use strict";

var app = angular.module('minerApp');

app.directive('fileInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.bind('change', function () {
                $parse(attributes.fileInput)
                    .assign(scope, element[0].files[0])
                scope.$apply()
            });
        }
    };
}]);

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

        if ($scope.file) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var contents = event.target.result;
                console.log("File contents: " + contents);

                var json = angular.toJson(contents);
                sendRequest(Service.minerJ48File(json));
            };

            reader.onerror = function (event) {
                console.error("File could not be read! Code " + event.target.error.code);
            };

            reader.readAsDataURL($scope.file);
        } else {
            sendRequest(Service.minerJ48());
        }
    }

    function sendRequest(miner) {
        miner.then(function success(response) {
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