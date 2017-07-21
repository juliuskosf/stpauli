var app = angular.module('VivaConAgua', [
    'ngMaterial',
    'ui.router'
]);

app.controller('MainController', function ($scope, $timeout, $mdSidenav, locationService, $rootScope, progressService) {
    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {

      return function() {
        //delete the oLocation here, too!
        locationService.oLocation = {}
        $mdSidenav(componentId).toggle();
      };
    }

    // for progress bar
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        progressService.getProgressAtState(fromState);
      })
    });

app.directive('sideBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'utils/sidebar-component.html'
  }
});

app.directive('personInfoForm', function() {
  return {
    restrict: 'E',
    templateUrl: 'utils/person-info-component.html'
  }

});
