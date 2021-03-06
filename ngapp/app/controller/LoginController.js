function LoginController($scope, $route, $http, $localStorage){
	$scope.selectedPage = $route.current.params.subpage || "username";
	$scope.application.title = "";
	$scope.application.preventToolbar = true;

	var userName = "";
	$scope.handleSubmit = function(){
		if( $scope.selectedProject!=undefined){
			$scope.application.setProject({project: $scope.selectedProject});
			userValidateSuccess();
		}
		
		if($scope.selectedEnvironment!=undefined){
			$scope.application.setProject({projectname: $scope.selectedProject, environment: $scope.selectedEnvironment});
			passwordValidateSuccess();
		}
	}
	
	function userValidateSuccess(){
		$scope.application.setPageLoading(false);
		$scope.application.navigation.goTo('Home');
	}
	
	function passwordValidateSuccess(){
		$scope.application.setPageLoading(false);				
		$scope.application.navigation.goTo('Home');  
	}
}
