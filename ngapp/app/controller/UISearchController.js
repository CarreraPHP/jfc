function UISearchController($scope, $attrs, progressConfig) {
    var self = this;

    self.list = [];
    // console.log(arguments);
    $scope.$watch($attrs.placeHolder, function(){
        $scope.placeholder = $attrs.placeholder;    
    });
    
    
    $scope.expand = false;
    $scope.getPlaceHolder = function(){
        return $attrs.placeHolder;
    }
    $scope.expandList = function(){
        $scope.expand = !$scope.expand;
    }
    $scope.itemSelect = function(item){
        $scope.value = item;
        $scope.expand = false;
    }
}
