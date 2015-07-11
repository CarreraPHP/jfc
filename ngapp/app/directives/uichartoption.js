function uichartoption() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    controller: 'UIChartOptionController',
    scope: true,
    templateUrl: 'app/view/directives/uichartoption.html',
    link: function(scope, element, attrs, UISelectCtrl) {}
  };
}
