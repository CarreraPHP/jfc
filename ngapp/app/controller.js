angular.module('JFC.controller', [])
    .constant('progressConfig', {
            animate: true,
            max: 100
    })
    .controller("ApplicationController", ["$scope", "$http", "$location", "$timeout", "$rootScope","$localStorage","$sessionStorage", ApplicationController])
    .controller("HomeController", ["$scope", "$route","$http","$localStorage", HomeController])
    .controller("LoginController", ["$scope", "$route","$http","$localStorage", LoginController])
    .controller("UISelectController", ["$scope", "$attrs", "progressConfig", UISelectController])
    .controller("UISearchController", ["$scope", "$attrs", "progressConfig", UISearchController]);
