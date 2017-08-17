app.controller('ToiletPaperDecisionCtrl', ['$scope', '$state', 'locationService', 'designService', function($scope, $state, locationService,
	designService) {
	var reasons = [];

	if ($state.current.name === 'locations-toilet-paper-decision-interest') {
		reasons = locationService.getInterestReasons();

	} else if ($state.current.name === 'locations-toilet-paper-decision-no-interest') {
		reasons = locationService.getNoInterestReasons();
	}

	$scope.reasons = reasons;
	$scope.selected = [];
	// Reduntanter Code!! Einfacheren Weg überlegen (Core-Funktionen auslagern)
	// -------

	$scope.toggle = function(reason, list) {
		var idx = list.indexOf(reason);
		if (idx > -1) {
			list.splice(idx, 1);
		} else {
			list.push(reason);
		}
		list.sort(compare);
	};

	$scope.goSendSupporter = function() {
		var mode;
		if ($state.current.name === "locations-toilet-paper-decision-interest") {
			mode = 1;
		} else if ($state.current.name === "locations-toilet-paper-decision-no-interest") {
			mode = 2;
		}

		if (mode) {
			locationService.setPaperDecision(mode, $scope.selected);
		} else {
			locationService.setPaperDecision(0);
		}
		$state.go('locations-create-summary');
	};

	var compare = function(a, b) {
		if (a.id < b.id) {
			return -1;
		}
		if (a.id > b.id) {
			return 1;
		}
		return 0;
	};

	// ------
	// Reduntanter Code!! Einfacheren Weg überlegen (Core-Funktionen auslagern)

}]);

// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

app.controller('LocationInformationCtrl', ['$scope', '$state', '$mdToast', '$timeout', '$mdDialog', 'locationService', 'designService',
	function($scope, $state, $mdToast, $timeout, $mdDialog, locationService, designService) {
		$scope.locationName = locationService.getLocationName() || "";

		//test implementation
		$scope.categorySource = designService.getCategoryIconSourceForIndex(
			locationService.getCategoryIndex()
		);

		$scope.loading = false;

		$scope.confirmAddress = function() {

			function calcAddress() {
				$scope.loading = true;
				var url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCt1roauwbqBAC2qyqiQ2S2kboxLi-XXPw";

				$.ajax({
					dataType: "json",
					url: url,
					data: "",
					success: successHandler,
					method: "POST",
					error: errorHandler
				});

			}

			function errorHandler() {
				$scope.loading = false;
				$mdToast.show(
					$mdToast.simple()
					.textContent('Unable to find you!')
					.hideDelay(3000)
				);
				console.log("error");
			}

			function successHandler(position) {
				var lat, lng;

				$scope.loading = false;

				if (position.location && position.location) {
					lat = position.location.lat;
					lng = position.location.lng;
				} else {
					errorHandler();
				}

				if (lat && lng) {
					var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng +
						"&key=AIzaSyDUZ4ALqWtdH4aSR8xagxdnk0OafAYmUPk";

					$.ajax({
						dataType: "json",
						url: url,
						data: "",
						success: showPosition,
						error: errorHandler
					});
				} else {
					errorHandler();
				}
			}

			function showPosition(oData) {
				saveAddress(oData.results[0]);
				var confirm = $mdDialog.confirm()
					.title('Diese Adresse für ' + $scope.locationName + ' hinzufügen?')
					.textContent(oData.results[0].formatted_address)
					.ariaLabel('Bestätigung')
					.targetEvent(event)
					.ok('Ja!')
					.cancel('Bearbeiten');
				$mdDialog.show(confirm).then(function() {
					$state.go('locations-water-decision');
				}, function() {
					saveAddress(oData.results[0]);
					$state.go('locations-manual-adress');
				});
			}

			function saveAddress(address) {
				address = locationService.convertGoogleAddressToObjectAddress(address.address_components);
				if (address.error) {
					errorHandler();
					log(address.error);
				}
				locationService.setAddress(address);
			}

			calcAddress();

		};

		$scope.goEnterManual = function() {
			$state.go('locations-manual-adress');
		};

		$scope.$watch('locationName', function() {
			locationService.setLocationName($scope.locationName);
		});
	}
]);

// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

app.controller('ManualAdressCtrl', ['$scope', '$state', '$mdDialog', 'locationService', function($scope, $state, $mdDialog, locationService) {
	$scope.locationName = locationService.getLocationName();

	$scope.address = locationService.oLocation.address || {};

	$scope.showConfirm = function(event) {
		locationService.setAddress($scope.address); // next command uses it so assign it here!
		var confirm = $mdDialog.confirm()
			.title('Ist das wirklich die Lokation?')
			.textContent(locationService.addressToString())
			.ariaLabel('Bestätigung')
			.targetEvent(event)
			.ok('Ja!')
			.cancel('Ändern');

		$mdDialog.show(confirm).then(function() {
			$state.go('locations-water-decision');
		});
	};

	$scope.deletePressed = function() {
		$scope.address = {};
		locationService.setAddress({});
	};
}]);

// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

app.controller('CategorySelectionCtrl', ['$scope', '$state', 'locationService', 'designService', function($scope, $state, locationService,
	designService) {
	$scope.tileClicked = function(index) {
		locationService.oLocation.categoryIndex = index;
		$state.go('locations-create-information');
	};

	$scope.beforeBack = function() {
		locationService.oLocation = {};
	};

	$scope.tiles = designService.getTiles();
}]);

// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

app.controller('WaterDecisionCtrl', ['$scope', '$state', 'locationService', 'designService', function($scope, $state, locationService, designService) {

	console.log(locationService.oLocation);
	$scope.selected = [];
	if ($state.current.name === "locations-water-decision-interest") {
		$scope.reasons = locationService.getInterestReasons();
	} else if ($state.current.name === "locations-water-decision-no-interest") {
		$scope.reasons = locationService.getNoInterestReasons();
	}

	$scope.getCategoryName = function(index) {
		return designService.getNameForCategoryIndex(index);
	};

	$scope.sLocation = locationService.getLocation();

	$scope.getSourceForIndex = function(index) {
		var x = designService.getCategoryIconSourceForIndex(index);
		return x;
	};

	$scope.toggle = function(reason, list) {
		var idx = list.indexOf(reason);
		if (idx > -1) {
			list.splice(idx, 1);
		} else {
			list.push(reason);
		}
		list.sort(compare);
	};

	$scope.goSendSupporter = function() {
		var mode;
		if ($state.current.name === "locations-water-decision-interest") {
			mode = 1;
		} else if ($state.current.name === "locations-water-decision-no-interest") {
			mode = 2;
		}

		if (mode) {
			locationService.setWaterDecision(mode, $scope.selected);
		} else {
			locationService.setWaterDecision(0);
		}
		$state.go('locations-create-summary');
	};

	var compare = function(a, b) {
		if (a.id < b.id) {
			return -1;
		}
		if (a.id > b.id) {
			return 1;
		}
		return 0;
	};

}]);

app.controller('SummaryController', ['$scope', '$state', 'locationService', function($scope, $state, locationService) {
	$scope.waterDecision = locationService.getWaterDecision();
	//$scope.paperDecision = locationService.getPaperDecision();
	$scope.location = locationService.oLocation;

	$scope.newID = locationService.saveLocation(); // richtige ID erzeugen

	$scope.map = {
		center: {
			latitude: 51.312801,
			longitude: 9.481544
		},
		zoom: 5
	};

	$scope.toContactMenu = function() {
		locationService.setSelectedLocation($scope.newID);
		$state.go('locations-detail', {
			tab: 1
		});
	};

	$scope.getDecisionText = function(decisionCode) {
		return locationService.getTextForInterestDecisionCode(decisionCode);
	};
}]);

app.controller('locationsDetailCtrl', ['$rootScope', '$scope', '$state', '$mdDialog', 'locationService', 'designService', 'contactService',
	'$stateParams',
	function($rootScope, $scope, $state, $mdDialog, locationService, designService, contactService, $stateParams) {
		$scope.tabIndex = $stateParams.tab;

		$scope.selectedLocation = locationService.getSelectedLocation();
		console.log($scope.selectedLocation);
		$scope.waterDecision = $scope.selectedLocation.waterDecision;

		$scope.getCategoryName = function(index) {
			return designService.getNameForCategoryIndex(index);
		};

		$scope.contactClicked = function(id) {
			contactService.setSelectedContact(id);
			$state.go('contacts-detail');
		};

		$scope.backClicked = function() {
			$state.go($state.previous);
		};

		$scope.interestReasons = locationService.getInterestReasons();

		$scope.noInterestReasons = locationService.getNoInterestReasons();

		$scope.contacts = getContactsOfLocation();

		function getContactsOfLocation() {
			// just for mockup! we will use ids to match or something simuliar
			var indexes = $scope.selectedLocation.partners || [];
			var allPartners = contactService.getAllContacts();
			var partners = [];
			for (var i = 0; i < indexes.length; i++) {
				partners.push(allPartners[indexes[i]]);
			}
			return partners;
		}

		$scope.getSourceForIndex = function(index) {
			var x = designService.getCategoryIconSourceForIndex(index);
			return x;
		};

		$scope.addContactClicked = function(ev, contactId) {
			$scope.allContacts = contactService.getAllContacts();
			var locationId = $scope.selectedLocation.id;

			$mdDialog.show({
				controller: 'addContactDialogCtrl',
				templateUrl: 'templates/addContactDialog.html',
				bindToController: true,
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				locals: {
					selectedLocation: $scope.selectedLocation
				},
				onRemoving: function() {
					$scope.contacts = getContactsOfLocation();
				}
			});
		};
	}
]);

app.controller('addContactDialogCtrl', ['$scope', '$state', '$mdDialog', 'contactService', 'locationService', 'selectedLocation', function(
	$scope, $state, $mdDialog, contactService, locationService, selectedLocation) {
	$scope.allContacts = contactService.getAllPossibleContactsForSelectedLocation(selectedLocation);
	$scope.contactPressed = function(contactId) {
		locationService.addContactToSelectedLocation(contactId);
		$mdDialog.hide();
	};
	$scope.addNewContact = function() {
		$mdDialog.hide();
		$state.go('contacts-create');
	};
}]);

app.controller('locationSearchController', ['$scope', 'locationService', '$state', 'designService', function($scope, locationService,
	$state, designService, $stateParams) {
	$scope.itemPressed = function(id) {
		locationService.setSelectedLocation(id);
		$state.go('locations-detail', {
			tab: null
		});
	};

	$scope.getCategoryName = function(index) {
		return designService.getNameForCategoryIndex(index);
	};

	$scope.locations = locationService.getAllLocations();
}]);
