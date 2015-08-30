function HomeController($scope, $route, $http, $routeParams, progressConfig){
    $scope.chart = {
        chartList:[]
    };

    $scope.application.setAdmin(false);

    $scope.loadScenarioList = function(param){
        if($scope.chart.chartList.length === 0){
            $http
                .get(progressConfig.urlPrefix + '/getScenarioList?scenarioId=' + param)
                .success(function (data, status, headers, config) {
                    if(data.data.result.length > 0){
                        var record = data.data.result[0];
                        $scope.chart.chartList = angular.fromJson(record.jsonData);
                        $scope.chart.name = record.scenarioNm;
                        console.log(arguments);
                    }
                })
                .error(function (data, status, headers, config) {
                    $scope.application.model.toggle("We are unable to connect to the playbook webservice. Please try after some time.");
                });
        }
    }
    console.log($routeParams);
    $scope.control ={
        detail: {
            enabled: false,
            title: '',
            content: '',
            toggle: function(){
                $scope.control.detail.enabled = !$scope.control.detail.enabled;
            }
        }
    };

    $scope.loadScenarioList($routeParams.id);
}
