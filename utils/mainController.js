app.controller("MainController", ["$state", "$scope", "$mdDialog", "$timeout", "$state", "$mdSidenav", "locationService", "$rootScope",
	"progressService", "$http", "AUTH_EVENTS",
	function($state, $scope, $mdDialog, $timeout, $state, $mdSidenav, locationService, $rootScope, progressService, $http, AUTH_EVENTS) {
		
		var showLoginDialog = function(ev) {
			$mdDialog.show({
				controller: "LoginCtrl",
				templateUrl: "auth/login.html",
				escapeToClose: false,
				parent: angular.element(document.body),
				targetEvent: ev
			});
		};

		var setCurrentUser = function() {
			$scope.showNavigation(true);
			$scope.currentUser = $rootScope.currentUser;
			$state.go("home"); 
			$mdDialog.hide();
		};
	
		// Initial start
		// Home
		$state.go("start"); 
	
		function switchBackground(to) {
			if (to === "dark") {
				$scope.myStyle = {
					"background-color": "#624837",	
					"background-size": "cover"
				};
			} else {
				$scope.myStyle = {
					"background-color": "#ffffff",
					"background-size": "cover"
				};
			}
		}

		switchBackground("dark");

		//showLoginDialog()

		$scope.logout = function() {
			firebase.auth().signOut().then(
				function() {
					$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
				}
			).catch(function(error) {
				// TBD
			});
		};

		$scope.toggleLeft = buildToggler("left");

		function buildToggler(componentId) {
			return function() {
				locationService.oLocation = {};
				$mdSidenav(componentId).toggle();
			};
		}
		
		$scope.navigation = true; // Default visibility state

        $scope.showNavigation = function(show) {
            $scope.navigation = show;
        };
		$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
		$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);

		// For progress bar
		$rootScope.$on("$stateChangeStart",
			function(event, toState, toParams, fromState, fromParams) {
				if (toState.name === "home" || toState.name === "start") {
					switchBackground("dark");	
				} else {
					switchBackground("light");
				}
				progressService.getProgressAtState(fromState);
			}
		);
	}
]);

app.controller("homeController", ["$scope", "$mdDialog", "$timeout", "$state", "$mdSidenav", "locationService", "$rootScope", "progressService",
	"historyService", "$http", "AUTH_EVENTS",
	function($scope, $mdDialog, $timeout, $state, $mdSidenav, locationService, $rootScope, progressService, historyService, $http,
		AUTH_EVENTS) {}
]);