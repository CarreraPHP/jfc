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
		pathMenu = "/"+pathMenu;
		if($location.path() == pathMenu){
			return true;
		}
		else{
			return false;
		}
		
	}
        
        $rootScope.data = {
            userName: 'Yogesh Surendran',
            greetingKey: 'Mr. ',
            troubleList: [{
                    imageName: 'question',
                    title: 'User is getting slow response'
            },{
                    imageName: 'question',
                    title: 'User getting Error response from middle layer (bus,DB,batch etc..)'
            },{
                    imageName: 'question',
                    title: 'Web Page Not Render in user system'
            },{
                    imageName: 'question',
                    title: 'Request is not reaching to application server (eBonding specific)'
            },{
                    imageName: 'question',
                    title: 'Helpdesk is reporting multiple end users are unable to sign into '
            },{
                    imageName: 'question',
                    title: 'Production support is reporting high CPU utilization on server VAPSBDFFRGDHGJPKAL37 '
            },{
                    imageName: 'question',
                    title: 'Helpdesk is reporting Voice Mail Manager, a sub-application has not been working for at least a week'
            }]
	};

	$rootScope.application = {
	    title: "JSON Flow Chart",
	    setUser: false,
	    removeUser: false,
	    getUser: false,
	    getPassword:false,
		currentDeviceIndex:0,
		preventToolbar: false,
		preventTabbar: false,
		paymentMethod : "",
		amountToPay:"",
		dateToPay:"",
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
	    		$scope.application.removeUser();
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
		menuList: [],
		toggleAccordion: function(index){
			var menuList = $scope.hamburger.menuList;
// 			console.log("%c arguments", "color:red;font-size:20px;", arguments);			
			for(var j=0; j < menuList.length;j++){
				if(j !== index){
					menuList[j].subMenuVisible = false;
				}else{
					menuList[index].subMenuVisible = !!!menuList[index].subMenuVisible;
				}		
			}
		}
	}

	$scope.handleMenuClick = function(pageType, prev_menu){
		$scope.application.slider.makeSlide();
		$scope.hamburger.toggleAccordion(prev_menu);
		if(pageType == "payment"){
			$scope.application.navigation.goTo('Payment');			
		}
		else if(pageType == "deviceDetailsList"){
			$scope.application.navigation.goTo('Device');			
		}
		else if(pageType == "profileDetailSuccess"){
			$scope.application.navigation.goTo('MyProfile');			
		}
		else if(pageType == "custSupport"){
			$scope.application.navigation.goTo('Support');			
		}
		else if(pageType == "shop"){
			$scope.application.navigation.goTo('Shop');			
		}		
		else{
			$scope.application.model.toggle();
			$scope.application.slider.makeSlide();
		}					
	}   

	/*var menuObject = $scope.application.getScreenData("MainTable");
	$scope.hamburger.menuList = menuObject.tpLelevlMenu.mainTable;
	*/
}
