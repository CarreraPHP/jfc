function AdminController($scope, $route, $http, $localStorage){
	$scope.editor = {
            chartList: [],
            idPrefix: "ch",
            environment: "DEV",
            project: "GlobalUI",
            portal: "VEC",
            internal: {
                incrementor: 0,
                selected: {
                    id: ''
                }
            }
        };
        
        function generateID(){
            var inc = $scope.editor.internal.incrementor,
                idString = $scope.editor.idPrefix + (++$scope.editor.internal.incrementor);          
            if(arguments.length > 0){
                var selected = arguments[0];
                return [selected.id, idString].join('-');
            }
            return idString;
        }
        
	$scope.getChartTemplate = function(){
	    return {
                id: '',
                name: '',
                type: '',
                description: '',
                options: []
            };
	};
        
	$scope.getOptionTemplate = function(){
	    return {
                name: '',
                impact: -1,
                charts: ''
            };
	};
	
        $scope.addChartItem = function(){
            var chartItem = $scope.getChartTemplate();
            if($scope.editor.internal.incrementor == 0){
                chartItem.id = generateID();
                chartItem.type = "Begin";
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
                option.name = "Edit here";
                option.charts = mappedChartItem.id;
                $scope.editor.internal.selected.options.push(option);
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
}
