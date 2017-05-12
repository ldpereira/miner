var app = angular.module('minerApp', ['ngRoute']);

//Config route
app.config(function ($routeProvider, $locationProvider) {
     //remove o # da url
    $locationProvider.html5Mode(false);

    $routeProvider
		.when('/', {
			templateUrl: 'view/home.html',
			controller: 'HomeCtrl'
		})
		.when('/settings', {
			templateUrl: 'view/settings.html',
			controller: 'SettingsCtrl'
		})
		.when('/j48', {
			templateUrl: 'view/j48.html',
			controller: 'J48Ctrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});