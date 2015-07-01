angular.module('JFC.directives', [])
    .directive('popup',function(){
    	return {
    	    restrict: 'EA',
    	    replace: true,
    	    transclude: true,
    	    //controller: 'ProgressController',
    	    scope: {
    	      value: '=',
    	      type: '='
    	    },
    	    templateUrl: 'app/view/directives/popup.html',
    	    link: function(scope, element, attrs, popupCtrl) {
    	    	//popupCtrl.addBar(scope, angular.element(element.children()[0]));
    	    }
    	  };
    })
    .directive('uiselect', uiselect)
    .directive('uisearch', uisearch);
