function uiselect() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    controller: 'UISelectController',
    scope: {
      list: '=',
      value: '=ngModel',
      valuefield: '=?valuefield',
      change: '=?change'    
    },
    templateUrl: 'app/view/directives/uiselect.html',
    link: function(scope, element, attrs, UISelectCtrl) {
//       UISelectCtrl.addBar(scope, angular.element(element.children()[0]));
    }
  };
}
