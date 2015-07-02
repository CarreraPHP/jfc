angular.module('JFC.router', ['ngRoute'])
	.config(["$routeProvider", "$locationProvider", routerFn]);

function routerFn($routeProvider, $locationProvider) {
    $routeProvider
            .when('/Home', {templateUrl: 'app/view/Home.html', controller: 'HomeController'})
            .when('/Home/:subpage', {templateUrl: 'app/view/Home.html', controller: 'HomeController'})
            .when('/Login', {templateUrl: 'app/view/Login.html', controller: 'LoginController'})
            .when('/Admin', {templateUrl: 'app/view/Admin.html', controller: 'AdminController'})
            .otherwise({
                    redirectTo:'/Home/select'
            });
    // configure html5 to get links working on jsfiddle
    $locationProvider.hashPrefix('!').html5Mode(false);
}

/*resolve: {
    // I will cause a 1 second delay
    delay: function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 1000);
            return delay.promise;
    }
}*/
