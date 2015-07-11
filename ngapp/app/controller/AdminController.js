        
    	$scope.getChartTemplate = function(){
    	    return {
                    id: '',
                    name: '',
                    type: '',
                    description: '',
                    options: [],
                    internal: {
                        style: {}
                    }
                };
    	};
            
    	$scope.getOptionTemplate = function(){
    	    return {
                    name: '',
                    impact: -1,
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
	
        $scope.addChartItem = function(){
            var chartItem = $scope.getChartTemplate();
            if($scope.editor.internal.incrementor == 0){
                chartItem.id = generateID();
                chartItem.type = "Begin";
                chartItem.name = "Chart Name";
                chartItem.description = "Chart Description";
                chartItem.internal.mode = 'edit';                
                chartItem.internal.style.left = 300 * (chartItem.id.split('-').length-1) + "px";
                $scope.editor.chartList.push(chartItem);
            }else{
                $scope.application.model.toggle("Please add options to the existing chartitems to add another chartitem.");
            }            
    	}
        
    	$scope.addOption = function(){
                var selected = $scope.editor.internal.selected;
    	    if(selected.id == ''){
                    $scope.application.model.toggle("Please select an existing chartitem to add options to it.");
                }else{
                    var option = $scope.getOptionTemplate(),
                        mappedChartItem = $scope.getChartTemplate();
                    
                    mappedChartItem.id = generateID(selected);
                    mappedChartItem.type = "Activity";
                    mappedChartItem.name = "Chart Name";
                    mappedChartItem.description = "Chart Description";
                    option.name = "Option Name";
                    option.charts = mappedChartItem.id;
                    $scope.editor.internal.selected.options.push(option);
                    mappedChartItem.internal.mode = 'display'; 
                    mappedChartItem.internal.style.left = 300 * (mappedChartItem.id.split('-').length-1) + "px";
                    $scope.editor.chartList.push(mappedChartItem);
                    
                    console.log("option added", option, mappedChartItem);
                    $scope.editor.internal.selected = {id: ''};
                }
    	}
        
        $scope.selectItem = function(item){
            $scope.editor.internal.selected = item;
            console.log(arguments);
        }
        
        $scope.printChartJson = function(){
            console.log($scope.editor.chartList);
            console.log(JSON.stringify($scope.editor.chartList));
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
        
        $scope.rearrangeOption = function(subitem, item, xCnt, yCnt, cnt, yInit, list){
            
            subitem.internal.yInit = yInit;
            
            $timeout((function(){               
                return function(){
                    function getHeight(elem){
                        var elemClientRect = elem.getBoundingClientRect();
                        return elemClientRect.height;
                    }
                    function getTop(elem){
                        var peerItem = false,
                            peerList = list[xCnt+1];
                        for (var i=0; i < peerList.length; i++){
                            
                            if(peerList[i].id == elem.id){
                                peerItem = peerList[i];
                                break;
                            }
                        }
                        console.log(peerList[i], peerItem.internal.style, peerItem.internal.style.top, parseInt(peerItem.internal.style.top));
                        return parseInt(peerItem.internal.style.top);
                    }
                    function getTopAdjustment(elem, options, _u) {
                        var contentHeight = getHeight(elem.querySelector('.content')) + getHeight(elem.querySelector('.title'));
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
                        arrowEl = document.querySelector('#' + subitem.charts + '-arrow'),
                        peerItem = false,
                        peerEl = document.querySelector('#' + subitem.charts),
                        heightVal = 0;
                
                    angular.forEach(list, function(yList, yKey){
                        angular.forEach(yList, function(inst, key){
                            if(inst.id == subitem.charts){
                                peerItem = inst;
                            }
                        });
                    });
                
                    subitem.internal.style.left = (xCnt * 300 + width) + "px";
                    subitem.internal.style.width = (parseInt(peerItem.internal.style.left) - parseInt(subitem.internal.style.left)) + "px";
                    
                    subitem.internal.style.top = (parseInt(item.internal.style.top) + getTopAdjustment(chartEl, subitem, cnt)) + "px";
                    heightVal = -(parseInt(subitem.internal.style.top) - getTop(peerEl) - (getHeight(peerEl)/2));
                    console.log("heightVal", heightVal, arrowEl);
                    if(heightVal < -9){
                        subitem.internal.style.top = (parseInt(subitem.internal.style.top) + heightVal) + "px";
                        heightVal = heightVal * -1;
                        subitem.internal.class = {'arrow': true, 'arrow-reverse': false, 'arrow-straight': false };
                    }else if(heightVal > -9 && heightVal < 9){
                        subitem.internal.class = {'arrow': false, 'arrow-reverse': false, 'arrow-straight': true };
                    }else{
                        subitem.internal.class = {'arrow': false, 'arrow-reverse': true, 'arrow-straight': false };
                    }
                    subitem.internal.style.height = heightVal + "px";
                    
//                    console.log("subitem.internal.style.height", peerEl.getBoundingClientRect(), getTop(peerEl), getHeight(peerEl), subitem.internal.style, subitem.internal.style.height);
                    
                    if(yCnt === (list[xCnt].length-1)){
//                        console.log("if this works, it will be gr8", item.internal.yInit, (item.internal.yInit-100)/2);
//                        console.log("if this works, it will be gr8", item, xCnt, yCnt, yInit, list[xCnt]);
                        angular.forEach(list[xCnt], function(inst, key){
//                            inst.internal.style.top = (parseInt(inst.internal.style.top) - (item.internal.yInit-100)/2) + "px";
//                            console.log("if this works, it will be gr8",parseInt(inst.internal.style.top), (item.internal.yInit-100)/2, inst.internal.top);
                        });
                    }
                };
            })(), 800, true, [subitem, item, xCnt, yCnt, yInit, list[xCnt]]);
        };
}
