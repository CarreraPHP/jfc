function uichartitem() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    controller: 'UIChartItemController',
    scope: true,
    templateUrl: 'app/view/directives/uichartitem.html',
    link: function(scope, element, attrs, UISelectCtrl) {}
  };
}
