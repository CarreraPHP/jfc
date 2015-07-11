function uitext() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    controller: 'UITextController',
    scope: {
      value: '=ngModel',
    },
    templateUrl: 'app/view/directives/uitext.html',
    link: function(scope, element, attrs, UISelectCtrl) {}
  };
}
