var app = angular.module('VivaConAgua', [
    'ngMaterial',
    'ui.router',
    'uiGmapgoogle-maps',
    'ngGeolocation'
]);

app.controller('MainController', ['$scope', '$timeout', '$state', '$mdSidenav', 'locationService', '$rootScope', 'progressService', '$http', function ($scope, $timeout, $state, $mdSidenav, locationService, $rootScope, progressService, $http) {
  $state.go('home');
	
  	var data = JSON.stringify({
		ID: "1000",
		FIRSTNAME: "Benedikt",
		NAME: "Bosshammer"
	});
	
	$.ajax({
		type: "POST",
		url: "/destinations/vca/d064868/contact/contact.xsodata/Contact",
		dataType: "json",
		data: data,
		cache: false, 
		contentType: "application/json",
		error : function(msg, textStatus) {
			console.log(textStatus);
		},
		success : function(data) {
			console.log(data);
		}
	});
	
  
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