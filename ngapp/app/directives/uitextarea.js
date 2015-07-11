function uitextarea() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    controller: 'UITextAreaController',
    scope: {
      value: '=ngModel',
    },
    templateUrl: 'app/view/directives/uitextarea.html',
    link: function(scope, element, attrs, UISelectCtrl) {}
  };
}
