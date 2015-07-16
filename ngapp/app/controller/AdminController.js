function AdminController($scope, $route, $http, $timeout){
	$scope.editor = {
            chartList: [],
            parsedList: [],
            idPrefix: "ch",
            environment: "DEV",
            project: "GlobalUI",
            portal: "VEC",
            name: "User Getting Slow",
            internal: {
                incrementor: 0,
                option:{
                    incrementor: 0
                },
                actor:{
                    incrementor: 0
                },
                selected: {
                    id: ''
                }
            },
            editList:[], // used for editing only one record at a time. In rare case we may need to edit multpile items.
            toggleEditor: function(){
                
            }
        }; 
        
        function generateID(){
            var idString = $scope.editor.idPrefix + (++$scope.editor.internal.incrementor);          
            if(arguments.length > 0){
                var selected = arguments[0];
                return [selected.id, idString].join('-');
            }
            return idString;
        }
        
        function generateOptionID(){
            var idString = 'opt' + (++$scope.editor.internal.option.incrementor);
            return idString;
        }
        
        function generateActorID(){
            var idString = 'act' + (++$scope.editor.internal.actor.incrementor);
            return idString;
        }
        
    	$scope.getChartTemplate = function(){
    	    return {
                    id: '',
                    name: '',
                    type: '',
                    description: '',
                actors: [],
                    options: [],
                    internal: {
                    style: {},
                    class: {
                        'card': true
                    }
                }
                };
    	};
            
    	$scope.getOptionTemplate = function(){
    	    return {
                id: '',
                    name: '',
                    charts: '',
                    internal: {
                        style:{},
                        class: {
                            'arrow': true,
                            'arrow-reverse': false,
                            'arrow-straight': false
                        }
                    }
                };
    	};
	
        $scope.getActorTemplate = function(){
	    return {
                id: '',
                name: '',
                contact: '',
                email: ''
            };
	};
	
        $scope.addChartItem = function(){
            var chartItem = $scope.getChartTemplate(),
                actor = $scope.getActorTemplate();
            if($scope.editor.internal.incrementor == 0){
                chartItem.id = generateID();
                chartItem.type = "Begin";
                chartItem.name = "Chart Name";
                chartItem.description = "Chart Description";
                actor.id = generateActorID();
                actor.name = "Actor Name";
                actor.contact = "Contact No";
                actor.email = "Email";
                chartItem.actors.push(actor);
                chartItem.internal.mode = 'edit';                
                chartItem.internal.style.left = 300 * (chartItem.id.split('-').length-1) + "px";
                $scope.editor.chartList.push(chartItem);
            }else{
                $scope.application.model.toggle("Please add options to the existing chartitems to add another chartitem.");
            }            
    	}
        
        $scope.addActor = function(){
            var selected = $scope.editor.internal.selected;
            if(selected.id == ''){
                $scope.application.model.toggle("Please select an existing chartitem to add actor to it.");
            }else{
                var actor = $scope.getActorTemplate();
                actor.id = generateActorID();
                actor.name = "Actor Name";
                actor.contact = "Contact No";
                actor.email = "Email";
                $scope.editor.internal.selected.actors.push(actor);
            }
        };
	
    	$scope.addOption = function(){
                var selected = $scope.editor.internal.selected;
    	    if(selected.id == ''){
                    $scope.application.model.toggle("Please select an existing chartitem to add options to it.");
                }else{
                    var option = $scope.getOptionTemplate(),
                    mappedChartItem = $scope.getChartTemplate(),
                    actor = $scope.getActorTemplate();
                    
                    mappedChartItem.id = generateID(selected);
                    mappedChartItem.type = "Activity";
                    mappedChartItem.name = "Chart Name";
                    mappedChartItem.description = "Chart Description";
                option.id = generateOptionID();
                    option.name = "Option Name";
                    option.charts = mappedChartItem.id;
                    $scope.editor.internal.selected.options.push(option);
                actor.id = generateActorID();
                actor.name = "Actor Name";
                actor.contact = "Contact No";
                actor.email = "Email";
                mappedChartItem.actors.push(actor);
                    mappedChartItem.internal.mode = 'display'; 
                    mappedChartItem.internal.style.left = 300 * (mappedChartItem.id.split('-').length-1) + "px";
                    $scope.editor.chartList.push(mappedChartItem);
                    
                    console.log("option added", option, mappedChartItem);
//                $scope.editor.internal.selected = {id: ''};
                }
    	}
        
        $scope.selectItem = function(item){
            $scope.editor.internal.selected = item;
//            console.log(arguments);
        }
        
        $scope.printChartJson = function(){
            var res = JSON.parse(angular.toJson($scope.editor));
            delete res.parsedList;
            delete res.editList;
            delete res.internal;
            delete res.parsedList;
            angular.forEach(res.chartList, function(v, k){
                angular.forEach(v.options, function(o, ok){
                    delete o.internal.yInit;
                });
                delete v.internal.mode;
                delete v.internal.yInit;
                if(v.type == "Actor"){
                    delete v.description;
                    delete v.name;
                }else {
                    delete v.actors;
        }
                v.internal.class['highlight-node'] = false;
            });
            res.id = 'chart' + (new Date()).getTime();
            console.log(angular.toJson(res));
        }
        
        $scope.$watch('editor.chartList.length', function(newLength, oldLength){
            $scope.editor.parsedList = [];
            for (var y in $scope.editor.chartList) {
                var x = $scope.editor.chartList[y],
                    x_id = x.id,
                    v = x_id.split('-'),
                    u = v.length - 1;

                if (u in $scope.editor.parsedList) {
                    $scope.editor.parsedList[u].push(x);
                } else {
                    $scope.editor.parsedList[u] = [x];
                }
            }
            
//            console.log("newList", newLength, newLength, $scope.editor.parsedList);
        });
        
        $scope.initRepeatValues = function(index, yInit){
//            $scope.xIndex = index;
//            $scope.yInit = yInit;            
//            console.log("call once", $scope.yInit);
        };
        
        $scope.rearrangeChart = function(item, xCnt, yCnt, yInit, list){
//            console.log("if this works, it will be gr8", arguments, (yCnt < 1 ? 0 : yCnt-1));
            item.internal.style.left = (xCnt * 300) + "px";
            item.internal.yInit = yInit; //list[xCnt][(yCnt < 1 ? 0 : yCnt-1)].internal.yInit || 0;
            
            $timeout((function(){               
                return function(){
//                    console.log("yInit inital value", yInit, itemHolder, itemHolder[(yCnt < 0 ? 0 : yCnt-1)]);
                    var el = document.getElementById(item.id),
                        height = el.getBoundingClientRect().height;
                    
                    item.internal.style.top = (list[xCnt][(yCnt < 1 ? 0 : yCnt-1)].internal.yInit) + "px";
                    item.internal.yInit = parseInt(item.internal.style.top) + (height + 50);
                    
                    if(yCnt === (list[xCnt].length-1)){
                        console.log("if this works, it will be gr8", item.internal.yInit, (item.internal.yInit-100)/2);
//                        console.log("if this works, it will be gr8", item, xCnt, yCnt, yInit, list[xCnt]);
                        angular.forEach(list[xCnt], function(inst, key){
                            inst.internal.style.top = (parseInt(inst.internal.style.top) - (item.internal.yInit-100)/2) + "px";
                            console.log("if this works, it will be gr8",parseInt(inst.internal.style.top), (item.internal.yInit-100)/2, inst.internal.top);
                        });
                    }
                };
            })(), 500, true, [item, xCnt, yCnt, yInit, list[xCnt]]);
        };
        
        $scope.rearrangeOption = function(subitem, item, xCnt, yCnt, cnt, yInit, list, inc){
            console.log("rearrange has been called ....", arguments);
            subitem.internal.yInit = yInit;
            
            $timeout((function(){               
                return function(){
                    function getHeight(elem){
                        if(elem !== null){
                        var elemClientRect = elem.getBoundingClientRect();
                        return elemClientRect.height;
                    }
                        return 0;
                    }
                    function getTop(elem){
                        var peerItem = false,
                            c = angular.element(elem),
                            d = c.scope()
                        
                        inc = d.xIndex;
                        var peerList = list[inc]; //xCnt+
                        for (var i=0; i < peerList.length; i++){
                            
                            if(peerList[i].id == elem.id){
                                peerItem = peerList[i];
                                break;
                            }
                        }
                        console.log(peerList);
                        console.log(peerItem.internal.style, peerItem.internal.style.top, parseInt(peerItem.internal.style.top));
                        return parseInt(peerItem.internal.style.top);
                    }
                    function getTopAdjustment(elem, options, _u) {
                        var contentHeight = 0;
                        contentHeight = getHeight(elem.querySelector('.content')) + getHeight(elem.querySelector('.title')) + getHeight(elem.querySelector('.actors'));
//                        console.log(elem.querySelector('.options > div:nth-child(' + (_u+1) + ')'), elem.querySelector('.options > div:nth-child(' + (_u) + ')'))
                        var returnVal = contentHeight + (getHeight(elem.querySelector('.options > div:nth-child(' + (_u+1) + ')')) / 2);
                        while (_u > 0) {
                            returnVal += getHeight(elem.querySelector('.options > div:nth-child(' + (_u+1) + ')'));
                            _u--;
                        }
                        return returnVal;
                    }
//                    console.log("yInit inital value", yInit, itemHolder, itemHolder[(yCnt < 0 ? 0 : yCnt-1)]);
                    var chartEl = document.getElementById(item.id),
                        height = chartEl.getBoundingClientRect().height,
                        width = chartEl.getBoundingClientRect().width,
                        arrowEl = document.querySelector('#' + subitem.id + '-arrow-' + subitem.charts),
                        peerItem = false,
                        peerEl = document.querySelector('#' + subitem.charts),
                        heightVal = 0,
                        widthVal = 0;
                
                    angular.forEach(list, function(yList, yKey){
                        angular.forEach(yList, function(inst, key){
                            if(inst.id == subitem.charts){
                                peerItem = inst;
                            }
                        });
                    });
                
                    subitem.internal.style.left = (xCnt * 300 + width) + "px";
                    widthVal = (parseInt(peerItem.internal.style.left) - parseInt(subitem.internal.style.left));
                    
                    subitem.internal.style.top = (parseInt(item.internal.style.top) + getTopAdjustment(chartEl, subitem, cnt)) + "px";
                    heightVal = -(parseInt(subitem.internal.style.top) - getTop(peerEl) - (getHeight(peerEl)/2));
                    console.log("heightVal", heightVal, arrowEl);
                    if(heightVal < -15){
                        subitem.internal.style.top = (parseInt(subitem.internal.style.top) + heightVal) + "px";
                        heightVal = heightVal * -1;
                        subitem.internal.class = {'arrow': true, 'arrow-reverse': false, 'arrow-straight': false };
                        subitem.internal.style.height = heightVal + "px";
                    }else if(heightVal > -15 && heightVal < 16){
                        subitem.internal.class = {'arrow': false, 'arrow-reverse': false, 'arrow-straight': true };
                        subitem.internal.style.height = "15px";
                    }else{
                        subitem.internal.class = {'arrow': false, 'arrow-reverse': true, 'arrow-straight': false };
                    subitem.internal.style.height = heightVal + "px";
                    }
                    
                    if(widthVal < 0){                        
                        subitem.internal.style.left = (parseInt(subitem.internal.style.left) + widthVal) + "px";
                        widthVal = widthVal * -1;
                        subitem.internal.class['arrow-flip'] = true;
                    }else{
                        subitem.internal.class['arrow-flip'] = false;
                    }
                    subitem.internal.style.width = widthVal + "px";
                };
            })(), 800, true, [subitem, item, xCnt, yCnt, yInit, list[xCnt]]);
        };
        
        $scope.selectCard = function(item, pList, editor){
            
            angular.forEach(pList, function(yList, yKey){
                angular.forEach(yList, function(inst, key){
                    inst.internal.mode = 'display'; 
                    inst.internal.class['highlight-node'] = false;
                });
            });
            item.internal.class['card'] = true;
            item.internal.class['highlight-node'] = true;
            item.internal.mode = 'edit'; 
            editor.internal.selected = item;
            editor.editList = [item];
        };
        
        $scope.highlightRelation = function(scope, enable){            
            var b = angular.element(document.querySelectorAll('[id*=' + scope.subitem.id + '-arrow-' + scope.subitem.charts +'], [id=' + scope.subitem.charts +']'));
            enable ? b.addClass('highlight-node') : b.removeClass('highlight-node');
        };
}
