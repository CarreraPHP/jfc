function ConfigController($scope, $route, $http, $localStorage, $routeParams, progressConfig) {
    $scope.portalValueField = 'portalNm';
    $scope.environmentValueField = 'environmentNm';
    $scope.projectValueField = 'moduleNm';

    $scope.$watch('editor.portal', function(newValue, oldValue){
        var idValue = -1;
        angular.forEach($scope.application.portalList, function(value, key){
            console.log(arguments, "arguments 2");
            if(value.portalNm === newValue){
                idValue = value.portalId;
            }
        });
        if(idValue !== -1){
            $scope.loadEnvironmentList(idValue);
            $scope.loadProjectList(idValue);
            console.log(arguments, "arguments");
        }
    });

    $scope.$watch('selectedPortal', function(newValue, oldValue){
        var idValue = -1;
        angular.forEach($scope.application.portalList, function(value, key){
            console.log(arguments, "arguments 2");
            if(value.portalNm === newValue){
                idValue = value.portalId;
            }
        });
        if(idValue !== -1){
            $scope.loadEnvironmentList(idValue);
            $scope.loadProjectList(idValue);
            console.log(arguments, "arguments");
        }
    });

    $scope.loadPortalList = function(){
        if($scope.application.portalList.length === 0){
            $http
                .get(progressConfig.urlPrefix + '/getPortalList')
                .success(function (data, status, headers, config) {
                    $scope.application.portalList = data;
                    if(data.length > 0){
                        $scope.loadEnvironmentList(data[0].portalId);
                        $scope.loadProjectList(data[0].portalId);
                        // console.log($scope.application.portalList);
                    }
                })
                .error(function (data, status, headers, config) {
                    $scope.application.model.toggle("We are unable to connect to the playbook webservice. Please try after some time.");
                });
        }
    }
    $scope.loadEnvironmentList = function(param){
        if($scope.application.environmentList.length === 0){
            $http
                .get(progressConfig.urlPrefix + '/getEnvironmentList?portal_id=' + param)
                .success(function (data, status, headers, config) {
                    $scope.application.environmentList = data.data.result;
                    // console.log($scope.application.environmentList, data);
                })
                .error(function (data, status, headers, config) {
                    $scope.application.model.toggle("We are unable to connect to the playbook webservice. Please try after some time.");
                });
        }
    };
    $scope.loadProjectList = function(param){
        if($scope.application.projectList.length === 0){
            $http
                .get(progressConfig.urlPrefix + '/getModuleList?portal_id=' + param)
                .success(function (data, status, headers, config) {
                    $scope.application.projectList = data.data.result;
                    // console.log($scope.application.projectList);
                })
                .error(function (data, status, headers, config) {
                    $scope.application.model.toggle("We are unable to connect to the playbook webservice. Please try after some time.");
                });
        }
    };
    $scope.handleSubmit = function(param){
        $http
            .get(progressConfig.urlPrefix + '/searchScenario?query=' + $scope.data.searchEntry)
            .success(function (data, status, headers, config) {
                $scope.data.troubleList = data.data.result;
                // console.log($scope.application.projectList);
            })
            .error(function (data, status, headers, config) {
                $scope.application.model.toggle("We are unable to connect to the playbook webservice. Please try after some time.");
            });
    };

    $scope.loadPortalList();
}
