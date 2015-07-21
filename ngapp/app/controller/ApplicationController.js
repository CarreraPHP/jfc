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
            troubleList: [{
                    imageName: 'question',
                    title: 'User is getting slow response',
                    chart: 'chart2',
					environment: 'DEV',
					project: 'PROJ 1',
					portal: 'PORTAL 1'
            },{
                    imageName: 'question',
                    title: 'User getting Error response from middle layer (bus,DB,batch etc..)',
                    chart: 'chart2',
					environment: 'QA',
					project: 'PROJ 1',
					portal: 'PORTAL 1'
            },{
                    imageName: 'question',
                    title: 'Web Page Not Render in user system',
                    chart: 'chart2',
					environment: 'ALT-PROD',
					project: 'PROJ 1',
					portal: 'PORTAL 1'
            },{
                    imageName: 'question',
                    title: 'Request is not reaching to application server (eBonding specific)',
                    chart: 'chart2',
					environment: 'PROD',
					project: 'PROJ 1',
					portal: 'PORTAL 1'
            },{
                    imageName: 'question',
                    title: 'Helpdesk is reporting multiple end users are unable to sign into ',
                    chart: 'chart2',
					environment: 'QA',
					project: 'PROJ 3',
					portal: 'PORTAL 1'
            },{
                    imageName: 'question',
                    title: 'Production support is reporting high CPU utilization on server VAPSBDFFRGDHGJPKAL37 ',
                    chart: 'chart',
					environment: 'QA',
					project: 'PROJ 2',
					portal: 'PORTAL 1'
            },{
                    imageName: 'question',
                    title: 'Helpdesk is reporting Voice Mail Manager, a sub-application has not been working for at least a week',
                    chart: 'chart2',
					environment: 'QA',
					project: 'PROJ 1',
					portal: 'PORTAL 1'
            }]
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
            dosignout:{
                    sout: false,
                    toggle1: function(){
                            $rootScope.application.dosignout.sout = !$rootScope.application.dosignout.sout;
                            $localStorage.$reset();
                            localStorage.clear();
                    }
            },
            showSubPageToolbarBtn: false,
	    slider:{
	    	animated:false,
	    	makeSlide: function(){
					console.log("slider triggered.....");
	    		$scope.application.slider.animated = !$scope.application.slider.animated;
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
}
