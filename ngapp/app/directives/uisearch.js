function uisearch() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    controller: 'UISearchController',
    scope: {
      list: '=ngModel',
    },
    templateUrl: 'app/view/directives/uisearch.html',
    link: function(scope, element, attrs, UISelectCtrl) {
    }
  };
}
