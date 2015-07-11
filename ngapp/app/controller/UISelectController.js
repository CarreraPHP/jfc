function UISelectController($scope, $attrs, progressConfig) {
    var self = this;

    self.list = [];
    
//    console.log(arguments);
    $scope.$watch($attrs.placeHolder, function(){
        $scope.placeholder = $attrs.placeholder;    
    });
//    $scope.$watch($attrs.valuefield, function(){
//        $scope.valuefield = $attrs.valuefield;   
//        console.log("$scope.valueField", $attrs, $scope.valuefield);
//    });
    
    $scope.expand = false;
    $scope.getPlaceHolder = function(){
        return $attrs.placeHolder;
    }
    $scope.expandList = function(){
        $scope.expand = !$scope.expand; 
//        console.log("$scope.valueField", $attrs, angular.isDefined($scope.valuefield), $scope.valuefield);
    }
    $scope.isEnabled = function(){
        return angular.isDefined($scope.valuefield);
    }
    $scope.itemSelect = function(item){
//        console.log("arguments", item, arguments);
        $scope.value = item;
        $scope.expand = false;
    }
    
//     ng-change="changeFn()"

    $scope.$watch('value', function(){
        if(angular.isDefined($scope.change)){
            console.log($scope.change, $scope.value);
            $scope.change($scope.value);
        }  
    });
}
