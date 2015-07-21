angular.module('JFC.router', ['ngRoute'])
	.config(["$routeProvider", "$locationProvider", routerFn]);

function routerFn($routeProvider, $locationProvider) {
    $routeProvider
        .when('/Home', {templateUrl: 'app/view/Home.html', controller: 'HomeController'})
        .when('/Home/:subpage', {templateUrl: 'app/view/Home.html', controller: 'HomeController'})
        .when('/Chart/:id/:name', {templateUrl: 'app/view/Home.html', controller: 'HomeController'})
        .when('/Login', {templateUrl: 'app/view/Login.html', controller: 'LoginController'})
        .when('/Admin', {templateUrl: 'app/view/Admin.html', controller: 'AdminController'})
        .otherwise({
                redirectTo:'/Admin'
        });
    // configure html5 to get links working on jsfiddle
    $locationProvider.hashPrefix('!').html5Mode(false);
}