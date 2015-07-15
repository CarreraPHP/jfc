function UIChartOptionController($scope, $attrs, progressConfig, $timeout) {
    var self = this;    
    $scope.chartValueField = "id";
    
    
    $scope.chartChange = function(sItem, oItem){
        $timeout(function(){
            var a = angular.element(document.querySelector('#' + $scope.subitem.id + '-arrow-' + sItem)),
                b = a.scope();
//                ,
//                c = angular.element(document.querySelector('#' + sItem)),
//                d = c.scope();
//            console.log("%c arguments", "color:green;font-size:40px", a, b, c, d, $scope, arguments);
        
            $scope.rearrangeOption(b.subitem, b.item, b.xIndex, b.yIndex, b.$index, b.yInit, b.editor.parsedList); //, d.xIndex);
        }, 500); 
        
    };
}