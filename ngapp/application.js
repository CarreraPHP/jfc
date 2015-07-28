var JFC = angular.module('JFC', [
    'JFC.controller', 
    'JFC.directives', 
    'JFC.filters', 
    'JFC.services', 
    'JFC.router',
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngMessages',
    'ngCookies',
    'ngStorage',
    'ngSanitize'
])
.run(['$rootScope', '$location', 'Auth', function afterInjectionFn($rootScope, $location, Auth) {
// 		console.log("afterInjectionFn", arguments);

        $rootScope.$on('$routeChangeStart', function (event, params) {

                if(!$rootScope.application.setProject){
                        $rootScope.application.setProject = Auth.setProject;
                }

                if(!$rootScope.application.removeProject){
                        $rootScope.application.removeProject = Auth.removeProject;
                }

                if(!$rootScope.application.getProject){
                        $rootScope.application.getProject = Auth.getProject;
                }

                if(!$rootScope.application.getEnvironment){
                        $rootScope.application.getEnvironment = Auth.getEnvironment;
                }

                $rootScope.application.showSubPageToolbarBtn = ($location.path().lastIndexOf('/') !== 0);

                /* SKIP STATIC URL like Login, Register, ForgotPassword */			
                //                 if($location.path().indexOf('Login') == -1){
//                         if (!Auth.isLoggedIn()) {
//                                 $rootScope.application.preventToolbar = true;
//                                 $rootScope.application.preventTabbar = true;
//                                 $location.path('/Login');
//                         } else {
//                                 console.log("this page was called....");
//                                 $rootScope.application.preventToolbar = false;
//                                 $rootScope.application.preventTabbar = false;
//                         }
//                 }else{
//                         $rootScope.application.preventToolbar = true;
//                         $rootScope.application.preventTabbar = true;
//                 }

                $rootScope.application.preventToolbar = false;
                $rootScope.application.preventTabbar = false;
//                 $location.path('/Home');
        });
}]);
