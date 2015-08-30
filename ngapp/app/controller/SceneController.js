function SceneController($scope, $route, $http, $localStorage){
    $scope.selectCard = function(event, item, pList, editor){
        console.log("Mouse Event ", event, arguments);
        angular.forEach(pList, function(yList, yKey){
            if(angular.isArray(yList)){
                angular.forEach(yList, function(inst, key){
                    inst.internal.mode = 'edit';
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

            editor.item.toggle(event.target);
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

    $scope.manageConfig = function(){
        $scope.application.anchoredModal.toggle();
    };

    $scope.addOption = function(){
        var scope = this;
        $scope.editor.internal.selected = scope.item;
        $scope.editor.internal.enabled = true;
        $scope.$parent.addOption();
    };

    $scope.addActor = function(){
        var scope = this;
        $scope.editor.internal.selected = scope.item;
        $scope.editor.internal.enabled = true;
        $scope.$parent.addActor();
    };
}
