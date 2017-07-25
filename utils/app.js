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
    restrict: 'AE',
    scope: {
      nameModel: '=',
      vornameModel: '=',
      streetModel: '=',
      postcodeModel: '=',
      cityModel: '=',
      emailModel: '=',
      telefonModel: '=',
      stpauliModel: '='
    },
    templateUrl: 'utils/person-info-component.html'
  }

});


app.directive('locationInfoForm', function() {
  return {
    restrict: 'AE',
    scope: {
      streetModel: '=',
      postcodeModel: '=',
      additionaladdressModel: '=',
      cityModel: '=',
      formName: '='
    },
    templateUrl: 'utils/location-info-component.html'
  }

});

app.directive('supportComponent', function() {
  return {
    restrict: 'AE',
    scope: {
      interestReasons: '=',
      noInterestReasons: '=',
      decisionValueModel: '='
    },
    templateUrl: 'utils/support-component.html'
  }
})
