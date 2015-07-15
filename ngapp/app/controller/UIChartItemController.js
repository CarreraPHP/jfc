function UIChartItemController($scope, $attrs, progressConfig, $timeout) {
    var self = this;
    $scope.mode = 'edit'; // possible modes -> edit, display
    $scope.typeList = ['Begin', 'Activity', 'Actor', 'End'];
//    $scope.chartValueField = "id";
    
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

//    $scope.chartChange = function(sItem, oItem){
//        console.log("%c arguments", "color:green;font-size:40px", $scope.editor, arguments);
//    };
    
    $scope.doEdit = function(){        
        $scope.mode = $scope.item.internal.mode = 'edit';
    };
    
    $scope.doSubmit = function(){
        $scope.mode = $scope.item.internal.mode = 'display';
    };
    
    $scope.doDelete = function(scope){
        var item = $scope.item,
            index = $scope.editor.chartList.indexOf(item),
            excludeList = $scope.editor.chartList.splice(index, 1),
            excludeItem = excludeList[0];
        
        angular.forEach($scope.editor.chartList, function(yList, yKey){
            angular.forEach(yList.options, function(option, key){
                if(option.charts == excludeItem.id){
                    $scope.editor.chartList[yKey].options.splice(key, 1);
                }
                if(option.charts.indexOf(excludeItem.id) !== -1){
                    var idArr = excludeItem.id.split('-');
                    idArr.splice(idArr.length-1, 1);
                    var newId = idArr.join('-');
                    option.charts = option.charts.replace(new RegExp(excludeItem.id + '-', "gi"), newId);
                }
            });
            if(yList.id.indexOf(excludeItem.id) !== -1){
                var idArr = excludeItem.id.split('-');
                idArr.splice(idArr.length-1, 1);
                var newId = idArr.join('-');
                yList.id = yList.id.replace(new RegExp(excludeItem.id, "gi"), newId);                
            }
        });        
        $scope.editor.editList = [];        
//        console.log("%c $scope", "color:red;font-size:22px;", item, index, excludeList);
    }
    
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
    
//    $scope.$watch('subitem.charts', function(){
//        if(angular.isDefined($scope.chartChange)){
//            console.log($scope.subitem, $scope.subitem);
//            $scope.chartChange($scope.subitem, $scope.subitem);
//        }  
//    });
}
