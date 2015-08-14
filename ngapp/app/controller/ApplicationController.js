function ApplicationController($scope, $http, $location,$timeOut, $rootScope,  $localStorage, $sessionStorage){
//     $scope = this;
	$scope.pageLoading = false;
	/*
	$scope.callBackpageLoading=function(){
			$pageLoading(function(){$scope.pageLoading = true;}, 400);
	}

	$scope.callBackpageLoading();
*/
	$scope.isActive=function(pathMenu){
            return ($location.path() == "/" + pathMenu) ? true : false;
	}
        
        $rootScope.data = {
            userName: 'Yogesh Surendran',
            greetingKey: 'Mr. ',
            troubleList: [],
            searchEntry: '',
            loadTroubleList: function(){
                $http
                .get('http://' + location.hostname + ':8080/getScenarioList')
                .success(function (data, status, headers, config) {
                    $scope.data.troubleList = data.data.result;
                    console.log($scope.data.troubleList);
                })
                .error(function (data, status, headers, config) {
                    $scope.application.model.toggle("We are unable to connect to the playbook webservice. Please try after some time.");
                });
            },
            loadTroubleChart: function(item){
                $location.url("/Chart/" + item.scenarioId + "/" + item.urlNm);
            }
	};

	$rootScope.application = {
	    title: "JSON Flow Chart",
            portalList: [],
            environmentList: [],
            projectList: [],
            getEnvironmentId: function(value){
                return $scope.application.getId($scope.application.environmentList, value, "environmentId", "environmentNm")
            },
            getEnvironmentId: function(value){
                return $scope.application.getId($scope.application.environmentList, value, "environmentId", "environmentNm")
            },
            getProjectId: function(value){
                return $scope.application.getId($scope.application.projectList, value, "moduleId", "moduleNm")
            },
            getPortalId: function(value){
                return $scope.application.getId($scope.application.portalList, value, "portalId", "portalNm")
            },
            getId: function(list, value, idField, valueField){
                var id = -1;
                for(var i=0; i < list.length; i++){
                    var obj = list[i];
                    if(obj[valueField] === value){
                        id = obj[idField];
                    }
                }
                return id;
            },
	    setProject: false,
	    removeProject: false,
	    getProject: false,
	    getEnvironment:false,
            preventToolbar: false,
            preventTabbar: false,
            errorMsg:"",
            futureMsg:"Thanks for your interest This option will be added as part of next release!",
            notificationsCount:"",
            model:{
                    errMsg:"",
                    visible: false,
                    toggle: function(temp){
                            $rootScope.application.model.errMsg = temp;
                            $rootScope.application.model.visible = !$rootScope.application.model.visible;
                    }
            },
            anchoredModal:{
                enabled: false,
                style: {
                    top:0,
                    left:0
                },
                toggle: function(){
                    var icon = document.querySelector('#chartTitle .icon'),
                        rect = icon.getBoundingClientRect();
                    $scope.application.anchoredModal.enabled = !$scope.application.anchoredModal.enabled;
                    $scope.application.anchoredModal.style = {
                        left: (rect.left - 200) + "px",
                        top: rect.top + "px"
                    };
                }
            },
            showSubPageToolbarBtn: false,
	    slider:{
	    	button:{
                    visible: true
                },
	    	animated:false,
	    	makeSlide: function(){
			console.log("slider triggered.....");
	    		$scope.application.slider.animated = !$scope.application.slider.animated;
	    		$scope.application.slider.button.visible = !$scope.application.slider.button.visible;
	    	}
	    },
	    navigation: {
	    	goTo: function(view){
				// Handle back button using '<' symbol.
				if(view == '<'){
					var a = $location.path(),
						b = a.lastIndexOf('/');
					if(b !== 0){
						view = a.substr(1, b-1);
					}
				}
	    		$location.path("/" + view);
	    		document.getElementById("jfc-container").scrollTop=0;
	    	},

	    	signout: function(){
	    		$scope.application.removeProject();
	    		$scope.application.slider.makeSlide();
	    		$scope.application.dosignout.sout=false;
	    		$scope.application.navigation.goTo('Login');
	    	}
	    },

		setScreenData: function(page, response){
    		$localStorage[page] = response;
    	},

    	getScreenData: function(pageType){
			var dataList = $localStorage.screen.JsonArray;
			for(var i=0; i<dataList.length; i++){
				if(!!(dataList[i].PageInfo)){
					var pType = dataList[i].PageInfo.pageType;
					if(pType == pageType){
						console.log("$localStorage", dataList[i]);
						return dataList[i];
					}
				}
			}
    	},



    	setPageLoading: function(val) {
    		//console.log("$scope.pageLoading", $scope.pageLoading);
    		//console.log("page loading.....");
    		$scope.pageLoading = val;
    	}

	};

	$scope.hamburger = {
		toggleAccordion: function(index){
			var menuList = $scope.data.troubleList;
			for(var j=0; j < menuList.length;j++){
				if(j === index){
					break;
				}
			}
			console.log("%c arguments 2", "color:red;font-size:20px;", menuList[j], arguments);
			$scope.application.navigation.goTo('Home/' + menuList[j].chart);
			history.go();
		}
	}
        
        $scope.data.loadTroubleList();
}
