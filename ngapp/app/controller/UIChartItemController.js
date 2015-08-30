function UIChartItemController($scope, $attrs, progressConfig, $timeout) {
    var self = this;
    $scope.mode = 'edit'; // possible modes -> edit, display
    $scope.typeList = ['Activity', 'Actor', 'End']; //There can be only one Begin Chart Item 'Begin',

//    console.log("%c item", "color:red;font-size:20px;", $scope.item);
//    $scope.$watch($scope.item.internal.mode, function(){
//        $scope.mode = $scope.item.internal.mode;
//    });

    $scope.$watch('item.name', function(){
        $scope.handleChange();
    });

    $scope.doEdit = function(){
        $scope.mode = $scope.item.internal.mode = 'edit';
    };

    $scope.doSubmit = function(){
        $scope.mode = $scope.item.internal.mode = 'display';
    };

    $scope.handleChange = function(){};

    $scope.showAllCustomiseTool = function(e, enabled){
        var scope = this,
            ct = angular.element(document.querySelectorAll('.customise-tool')),
            ctinfo = angular.element(document.querySelectorAll('.customise-tool .card-info'));
        (enabled) ? ct.removeClass('jfc-hide') : ct.addClass('jfc-hide');
        (!enabled) ? ctinfo.removeClass('large') : ctinfo.addClass('large');
    };
}
