var app = angular.module('VivaConAgua', [
    'ngMaterial',
    'ui.router',
    'uiGmapgoogle-maps',
    'ngGeolocation'
]);

app.controller('MainController', ['$scope', '$timeout', '$state', '$mdSidenav', 'locationService', '$rootScope', 'progressService', '$http', function ($scope, $timeout, $state, $mdSidenav, locationService, $rootScope, progressService, $http) {
  $state.go('home');
  
  /*
  	$http({
	  method: 'GET',
	  url: '/destinations/vca/d064868/location/location.xsodata/Location/?$format=json'
	}).then(function successCallback(response) {
		console.log(response.data.d.results);
	}, function errorCallback(response) {
	});
  */
  
  $scope.toggleLeft = buildToggler('left');

  function buildToggler(componentId) {

    return function() {
      locationService.oLocation = {}
      $mdSidenav(componentId).toggle();
    };
  }

  // for progress bar
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      progressService.getProgressAtState(fromState);
    })
}]);

app.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
    $state.previous = fromState;
  });
}]);