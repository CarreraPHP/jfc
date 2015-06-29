function UISelectController($scope, $attrs, progressConfig) {
    var self = this;

    self.list = [];
    
    $scope.expand = false;
    $scope.expandList = function(){
        $scope.expand = !$scope.expand;
    }
    $scope.itemSelect = function(item){
        $scope.value = item;
        $scope.expand = false;
    }
}
