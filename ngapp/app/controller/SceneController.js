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
        var b = angular.element(document.querySelectorAll('[id*=' + scope.subitem.id + '-arrow-' + scope.subitem.charts +'], [id=' + scope.subitem.charts +'], [id=' + scope.subitem.charts +'] .card')),
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
    
    $scope.showCustomiseTool = function(e, enabled){
        var scope = this,
            ct = angular.element(document.querySelector('#' + scope.item.id + ' .customise-tool'));
        (enabled) ? ct.removeClass('jfc-hide') : ct.addClass('jfc-hide');
    };
    
    $scope.deleteCard = function(){
        var scope = this,
            item = scope.item;
        if(item.options.length == 0){
            var index = $scope.editor.chartList.indexOf(item),
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
        } else {
            $scope.application.model.toggle("You cannot remove this item until its child items are removed.");
        }   
    };
    
    $scope.manageConfig = function(){
        $scope.editor.internal.toggleConfigEditor();
    };
    
    $scope.addOption = function(){
        
    };
    
    $scope.addActor = function(){
        
    };
}