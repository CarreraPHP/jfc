function AdminController($scope, $route, $http, $timeout, $location){
	$scope.editor = {
            chartList: [],
            parsedList: [],
            idPrefix: "c",
            environment: "",
            project: "",
            portal: "",
            name: "Chart Title",
            owner: "Build Team",
            config:{
                edit: false,
                title: "Chart Configuration",
                style: {top:0,left:0},
                anchor: 'top',
                notes: '',
                toggle: function(e){
                    var icon = document.querySelector('#chartTitle .icon'),
                        rect = icon.getBoundingClientRect();
                    $scope.editor.config.edit = !$scope.editor.config.edit;
                    $scope.editor.config.style = {
                        left: (rect.left - 200) + "px",
                        top: rect.top + "px"
                    };
                }
            },
            item:{
                edit: false,
                title: "Chart Item Properties",
                style: {top:0,left:0},
                anchor: 'left',
                notes: '',
                toggle: function(el, noToggle){
                    console.log(el, "el");
                    if(typeof el !== "undefined"){
                        var rect = el.getBoundingClientRect(),
                            iHolder = el.parentNode.parentNode.parentNode.parentNode,
                            card = iHolder.querySelector('.card'),
                            cardRect = card.getBoundingClientRect();

                        $timeout(function(){
                            var modal = document.querySelector('#chartItemModal .modal-fade'),
                                modalRect = modal.getBoundingClientRect(),
                                topValue = (cardRect.top - 20 + (cardRect.height/2) - (modalRect.height/2)),
                                leftValue = (cardRect.left + cardRect.width + 20);

                            $scope.editor.item.anchor = 'left';
                            if((leftValue + modalRect.width) > window.innerWidth){
                                leftValue = (cardRect.left - modalRect.width - 30);
                                $scope.editor.item.anchor = 'right';
                            }

                            $scope.editor.item.style = {
                                left: leftValue + "px",
                                top: topValue + "px"
                            };
                            console.log(el, modal, modalRect, cardRect, $scope.editor.item.style, "el");
                        }, 100);
                    }
                    $scope.editor.item.edit = noToggle ? $scope.editor.item.edit : !$scope.editor.item.edit;
                },
                handleOption: function(item){
                    var el = document.querySelector('#' + item.id + ' .edit-card i');
                    $scope.editor.item.toggle(el, true);
                }
            },
            internal: {
                enabled: true,
                toggleConfigEditor: function(){
                    $scope.editor.internal.editconfig = !$scope.editor.internal.editconfig;
                },
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
								$scope.editor.internal.enabled = !$scope.editor.internal.enabled;
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
            if($scope.editor.chartList.length == 0){
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
									if($scope.editor.internal.selected.options.length < 5){
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
										} else {
                    	$scope.application.model.toggle("Only 5 number of Options are allowed.");
                		}
                }
    	}

        $scope.selectItem = function(item){
            $scope.editor.internal.selected = item;
//            console.log(arguments);
        }

        $scope.getEditorObject = function(){
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
            return res;
        };

        $scope.saveChartJson = function(){
            var res = $scope.getEditorObject(),
                param = {};
            param.jsonData = res.chartList;
            param.moduleNm = res.project;
            param.environmentNm = res.environment;
            param.portalNm = res.portal;
            param.scenarioNm = res.name;
            param.primaryOwner = res.owner;
            param.environmentId = $scope.application.getEnvironmentId(res.environment);
            param.portalId = $scope.application.getPortalId(res.portal);
            param.moduleId = $scope.application.getProjectId(res.project);
            param.status = 'Active';

            if(param.portalId === -1){
                $scope.application.model.toggle("Portal cannot be empty.");
                return;
            }
            if(param.environmentId === -1){
                $scope.application.model.toggle("Environment cannot be empty.");
                return;
            }
            if(param.moduleId === -1){
                $scope.application.model.toggle("Module cannot be empty.");
                return;
            }

            console.log(angular.toJson(param));
            $http({
                url: 'http://localhost:8080/saveScenario',
                method: 'POST',
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        var val = ((typeof obj[p]).toLowerCase() == "object") ? angular.toJson(obj[p]) : obj[p];
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val));
                    }
                    return str.join("&");

                },
                data: param,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data, status, headers, config) {
//                Chart
                console.log(data, data.data.result);
                var record = data.data.result;
                if(record === -1){
                    $scope.application.model.toggle("Chart Name '" + $scope.editor.name + "' has been already taken. Please choose another title.");
                }else {
                    window.open("#!/Chart/" + record.scenarioId + "/" + record.urlNm, "_blank");
                }
//                 $location.path("/Chart/" + record.scenarioId + "/" + record.urlNm);
            }).error(function (data, status, headers, config) {
                $scope.application.model.toggle("We are unable to connect to the playbook webservice. Please try after some time.");
            });
        };

        $scope.exportChartJson = function(){
            var list = $scope.editor.chartList;
            for(var i=0; i < list.length; i++){
                if(list[i].options.length === 0 && list[i].type !== 'End'){
                    $scope.application.model.toggle("Chart is incomplete, please add 'End' type chart item to last child items.");
                    return;
                }
            }
            $scope.saveChartJson();
        };

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

        $scope.deleteCard = function(scope){
        var scope = this,
            item = scope.item;
        if(item.options.length == 0 && item.type != 'Begin'){
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
            $scope.application.model.toggle("You cannot remove this item if it is of 'Begin' Type or it has child items.");
         }
				 $scope.editor.item.edit = false;
    };

    // if the list is empty at the initial moment, load the Begin cart item to it.
    if($scope.editor.chartList.length == 0){
        $scope.addChartItem();
        $scope.editor.editList.push($scope.editor.chartList[0]);
        $scope.editor.internal.selected = $scope.editor.chartList[0];
    }
}
