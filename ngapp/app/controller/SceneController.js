function SceneController($scope, $route, $http, $localStorage){
    $scope.selectCard = function(item, pList, editor){

        angular.forEach(pList, function(yList, yKey){
            if(angular.isArray(yList)){
                angular.forEach(yList, function(inst, key){
                    inst.internal.mode = 'display'; 
                    inst.internal.class['highlight-node'] = false;                    
                });
            }else if(yList.internal && yList.internal.class){
                yList.internal.class['highlight-node'] = false;
            }            
        });
        item.internal.class['card'] = true;
        item.internal.class['highlight-node'] = true;
        item.internal.mode = 'edit'; 
        
        if(angular.isDefined(editor)){
            editor.internal.selected = item;
            editor.editList = [item];
        }
        
        console.log($scope, $scope.control);
        
        if(angular.isDefined($scope.control)){
            $scope.control.detail.enabled = true;
            $scope.control.detail.title = item.name;
            $scope.control.detail.content = item.description;
        }
    };
        
    $scope.highlightRelation = function(scope, enable){
        var b = angular.element(document.querySelectorAll('[id*=' + scope.subitem.id + '-arrow-' + scope.subitem.charts +'], [id=' + scope.subitem.charts +']')),
                scene = angular.element(document.querySelector('#chartscene'));
        if(enable){
            scene.addClass('opaque-node');
            b.addClass('highlight-node');
            
        }else{
            scene.removeClass('opaque-node');
            b.removeClass('highlight-node');
        } 
        scope.item.internal.class['highlight-node'] = !!enable; 
    };
}