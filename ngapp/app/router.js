angular.module('JFC.router', ['ngRoute'])
	.config(["$routeProvider", "$locationProvider", routerFn]);

function routerFn($routeProvider, $locationProvider) {
    $routeProvider
            .when('/Home', {templateUrl: 'app/view/Home.html', controller: 'HomeController'})
            .when('/Login', {templateUrl: 'app/view/Login.html', controller: 'LoginController'})
            .when('/Login/:subpage', {templateUrl: 'app/view/Login.html', controller: 'LoginController'})
            .otherwise({
                    redirectTo:'/Home'
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
