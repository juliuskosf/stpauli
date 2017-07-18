var app = angular.module('VivaConAgua', [
    'ngMaterial',
    'ui.router'
]);

app.controller('MainController', function ($scope, $timeout, $mdSidenav, locationService) {
    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {

      return function() {
        //delete the oLocation here, too!
        locationService.oLocation = {}
        $mdSidenav(componentId).toggle();
      };
    }
});

app.directive('sideBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'utils/sidebar-component.html'
  }
});