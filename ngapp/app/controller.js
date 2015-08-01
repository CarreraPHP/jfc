angular.module('JFC.controller', [])
    .constant('progressConfig', {
            animate: true,
            max: 100
    })
    .controller("ApplicationController", ["$scope", "$http", "$location", "$timeout", "$rootScope","$localStorage","$sessionStorage", ApplicationController])
    .controller("HomeController", ["$scope", "$route","$http","$routeParams", HomeController])
    .controller("ConfigController", ["$scope", "$route","$http","$localStorage", "$routeParams", ConfigController])    
    .controller("AdminController", ["$scope", "$route","$http","$timeout", "$location", "$routeParams", AdminController])
    .controller("SceneController", ["$scope", "$route","$http","$localStorage", SceneController])
    .controller("LoginController", ["$scope", "$route","$http","$localStorage", LoginController])
    .controller("UISelectController", ["$scope", "$attrs", "progressConfig", UISelectController])
    .controller("UISearchController", ["$scope", "$attrs", "progressConfig", UISearchController])
    .controller("UITextController", ["$scope", "$attrs", "progressConfig", UITextController])
    .controller("UITextAreaController", ["$scope", "$attrs", "progressConfig", UITextAreaController])
    .controller("UIChartItemController", ["$scope", "$attrs", "progressConfig", "$timeout", UIChartItemController])
    .controller("UIChartOptionController", ["$scope", "$attrs", "progressConfig", "$timeout", UIChartOptionController])
    .controller("UIAnchoredModalController", ["$scope", "$attrs", "progressConfig", "$timeout", UIAnchoredModalController]);
