function UITextController($scope, $attrs, progressConfig) {
    var self = this; 
    
    $scope.readonly = false;

    $scope.$watch($attrs.placeHolder, function(){
        $scope.placeholder = $attrs.placeholder;    
    });
    
    $scope.$watch($attrs.readonly, function(){
        $scope.readonly = $attrs.readonly;    
    });
    
    $scope.getPlaceHolder = function(){
        return $attrs.placeHolder;
    }
    $scope.clearValue = function(){
        $scope.value = "";
    }
}
