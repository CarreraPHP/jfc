function UIChartOptionController($scope, $attrs, progressConfig, $timeout) {
    var self = this;
    $scope.mode = 'edit'; // possible modes -> edit, display
    $scope.typeList = ['Begin', 'Activity', 'Actor', 'End'];
    $scope.chartValueField = "id";
    
    $scope.$watch($scope.item.internal.mode, function(){
        $scope.mode = $scope.item.internal.mode;
    });
    
    $scope.$watch('item.name', function(){
//        console.log("arguments", arguments);
        $scope.handleChange();
    });
    
//    $scope.$watch('subitem.name', function(){
//        console.log("%c arguments", "color:green;font-size:40px", arguments);
////        $scope.handleChange();
//    });

    $scope.chartChange = function(sItem){
        console.log("%c arguments", "color:green;font-size:40px", sItem, arguments);
        
    }
    
    $scope.doEdit = function(){        
        $scope.mode = $scope.item.internal.mode = 'edit';
    };
    
    $scope.doSubmit = function(){
        $scope.mode = $scope.item.internal.mode = 'display';
    };
    
    $scope.handleChange = function(){
        var levelList = $scope.item.id.split('-');
//        $scope.item.internal.style.left = 300 * (levelList.length-1) + "px";
//        $scope.item.internal.style.top = 0 + "px";
        
        $timeout(function(){
            var el = document.getElementById($scope.item.id),
                height = el.getBoundingClientRect().height;
                
//            $scope.item.internal.style.top = (parseInt($scope.item.internal.style.top) - (height/2)) + "px";
//            console.log("Element ", $scope.item.id, document.getElementById($scope.item.id), height, angular.element(document.getElementById($scope.item.id)));
        }, 500);        
    };
}
