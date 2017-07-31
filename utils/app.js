var app = angular.module('VivaConAgua', [
    'ngMaterial',
    'ui.router',
    'uiGmapgoogle-maps'
]);

app.controller('MainController', function ($scope, $timeout, $state, $mdSidenav, locationService, $rootScope, progressService) {

    $state.go('home');
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
