function AUTHProvider($cookies, $localStorage, $sessionStorage){
	var project = false;
	return{
		setProject : function(options){
			project = options;
			$cookies.projectname = options.projectname;
			$cookies.environment = options.environment;
		},
		removeProject : function(){
			$cookies.projectname = "";
			$cookies.environment = "";
			project = false;
		},
		getProject: function(){
// 			console.log("project name fetched", project, project.projectname);
			return (project && project !== "false") ? project.projectname : "";
		},
		getEnvironment : function(){
			return (project && project !== "false") ? project.environment : "";
		},
		isLoggedIn : function(){
			project = project ? project : {projectname: $cookies.projectname, environment: $cookies.environment}; 
			return (project && project.projectname) ? project : false;
		},
		setScreenData: function (response){
			$localStorage.data =  response.JsonArray[0];
		},
		clearScreenData: function (){
			$localStorage.clear();
		}
	}
}
