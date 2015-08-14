function uianchoredmodal() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    controller: 'UIAnchoredModalController',
    scope: {
        title: '=',
        anchor: '=',
        show: '=',
        uistyle: '=',
        overlayclick: '=',
        notes: '='
    },
    templateUrl: 'app/view/directives/uianchoredmodal.html',
    link: function(scope, element, attrs, UISelectCtrl) {}
  };
}
