app.controller('MainController', ['$scope', '$mdDialog', '$timeout', '$state', '$mdSidenav', 'locationService', '$rootScope', 'progressService', '$http', 'AUTH_EVENTS', function ($scope, $mdDialog, $timeout, $state, $mdSidenav, locationService, $rootScope, progressService, $http, AUTH_EVENTS) {
  var showLoginDialog = function(ev) {
    $mdDialog.show({
      controller: 'LoginCtrl',
      templateUrl: 'auth/login.html',
      parent: angular.element(document.body),
      targetEvent: ev
    });
  };

  var setCurrentUser = function() {
    $scope.currentUser = $rootScope.currentUser;
    $state.go('home');
    $mdDialog.hide();
  };
  // initial start

  $state.go('home');
  /* ---- Enable this for authentication form

  showLoginDialog()

  ---- */


	/*

	// GET
	$.ajax({
		type: "GET",
		url: "/destinations/vca/d064868/location.xsodata/Location",
		cache: false,
		contentType: "application/json;charset=utf-8",
		error : function(msg, textStatus) {
			console.log(textStatus);
		},
		success : function(data) {
			console.log(data);
		}
	});

	// Data for Post
	var data = JSON.stringify({
		ID: "1000",
		NAME: "Henriks",
		STREET: "Tesdorpfstraße 8",
		AADDRESS: null,
		POSTCODE: 20148,
		CITY: "Hamburg",
		CATEGORYID: 0,
		WATER: "X"
	});

	// POST
	$.ajax({
		type: "POST",
		url: "/destinations/vca/d064868/location.xsodata/Location",
		dataType: "json",
		data: data,
		cache: false,
		contentType: "application/json;charset=utf-8",
		error : function(msg, textStatus) {
			console.log(textStatus);
		},
		success : function(data) {
			console.log(data);
		}
	});
	*/

  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }).catch(function(error) {
      // TBD
    });
  };

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(componentId) {

    return function() {
      locationService.oLocation = {}
      $mdSidenav(componentId).toggle();
    };
  }

  $rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
  $rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);

  // for progress bar
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      progressService.getProgressAtState(fromState);
    })
}]);