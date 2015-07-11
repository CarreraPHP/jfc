function UITextController($scope, $attrs, progressConfig) {
    var self = this;    

    $scope.$watch($attrs.placeHolder, function(){
        $scope.placeholder = $attrs.placeholder;    
    });
    
    $scope.getPlaceHolder = function(){
        return $attrs.placeHolder;
    }
    $scope.clearValue = function(){
        $scope.value = "";
    }
}
