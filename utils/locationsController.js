app.controller('LocationSearchCtrl', ['$scope', '$state', 'locationService', function($scope, $state, locationService) {
	$scope.rememberName = function() {
		locationService.setSearchName($scope.searchName);
	}
}]);

// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

/* app.controller('LocationInformationCtrl', ['$scope', '$state', '$mdToast', '$timeout', '$mdDialog', 'locationService', 'designService',
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
]); */

// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

app.controller('ManualAdressCtrl', ['$scope', '$state', '$mdDialog', 'locationService', function($scope, $state, $mdDialog, locationService) {
	$scope.locationName = locationService.getLocationName();

	$scope.address = locationService.oLocation.address || {};

	$scope.showConfirm = function(event) {
		locationService.setAddress($scope.address); // next command uses it so assign it here!
		locationService.setLocationName($scope.locationName);
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

app.controller('WaterDecisionCtrl', ['$scope', '$state', 'locationService', 'designService', function($scope, $state, locationService,
	designService) {

	$scope.saveDecision = function(selectedValue) {
		var decision = locationService.oLocation.decision || {};

		switch (selectedValue) {
			case "seeYes":
				decision.already = 'X';
				decision.imagine = '';
				break;
			case "seeNo":
				decision.already = '';
				break;
			case "imagineYes":
				decision.imagine = 'X';
				break;
			case "imagineNo":
				decision.imagine = '';
				break;
			default:
		}

		locationService.setDecision(decision);
	}

	$scope.selected = [];
	if ($state.current.name === "locations-water-decision-interest") {
		$scope.reasons = locationService.getInterestReasons();
	} else if ($state.current.name === "locations-water-decision-no-interest") {
		$scope.reasons = locationService.getNoInterestReasons();
	}

	$scope.toggle = function(reason, list) {
		var idx = list.indexOf(reason);
		if (idx > -1) {
			list.splice(idx, 1);
		} else {
			list.push(reason);
		}
		list.sort(compare);
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

	$scope.sendSupporter = function() {
		$state.go('locations-create-summary');
	}

	$scope.saveSelection = function(event) {
		if(event.target.name === "glas") {
			// Save glas
		} else {
			// save plastik
		}
	}
		/*
	console.log(locationService.oLocation);


	$scope.getCategoryName = function(index) {
		return designService.getNameForCategoryIndex(index);
	};

	$scope.sLocation = locationService.getLocation();

	$scope.getSourceForIndex = function(index) {
		var x = designService.getCategoryIconSourceForIndex(index);
		return x;
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

	*/

}]);

app.controller('SummaryController', ['$scope', '$state', 'locationService', function($scope, $state, locationService) {
	$scope.waterDecision = locationService.getWaterDecision();
	//$scope.paperDecision = locationService.getPaperDecision();
	$scope.location = locationService.oLocation;

	$scope.map = {
		center: {
			latitude: 51.312801,
			longitude: 9.481544
		},
		zoom: 5
	};

	/*	$scope.toContactMenu = function() {
			locationService.setSelectedLocation($scope.newID);
			$state.go('locations-detail', {
				tab: 1
			});
		};*/

	$scope.getDecisionText = function(decisionCode) {
		return locationService.getTextForInterestDecisionCode(decisionCode);
	};
	$scope.saveLocationInfo = function() {
		// Data for Post
		var data = JSON.stringify({
			ID: "1000",
			CAPS_NAME: locationService.getLocation().name.toUpperCase(),
			NAME: locationService.getLocation().name,
			STREET: locationService.getLocation().address.street,
			AADDRESS: "",
			POSTCODE: locationService.getLocation().address.postcode,
			CITY: locationService.getLocation().address.city,
			CATEGORYID: locationService.getLocation().categoryIndex,
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
			error: function(msg, textStatus) {
				console.log(textStatus);
			},
			success: function(data) {
				console.log(data);
			}
		});
		$state.go('thankyou');
	};
	// $scope.newID = locationService.saveLocation(); // richtige ID erzeugen

}]);

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
	$scope.locations = [];

	$scope.itemPressed = function(id) {
		locationService.setSelectedLocation(id);
	};

	if (!locationService.getSearchName()) {
		// empty search string
		// action need to be evaluated
	} else {
		$.ajax({
			type: "GET",
			url: "/destinations/vca/d064868/location.xsodata/Location/?$format=json&$filter=substringof('" + locationService.getSearchName().toUpperCase() + "', CAPS_NAME)",
			cache: false,
			contentType: "application/json;charset=utf-8",
			error: function(msg, textStatus) {
				console.log("Search failed in locationSearchController with error code: " + textStatus);
			},
			success: function(data){
				$scope.$apply(function() {
					$scope.locations = data.d.results;
				});
			}
		});
	}
	// GET

	$scope.getCategoryName = function(index) {
		return designService.getNameForCategoryIndex(index);
	};

	// $scope.locations = locationService.getAllLocations();
}]);

app.controller('locationsDetailCtrl', ['$rootScope', '$scope', '$state', '$mdDialog', 'locationService', 'designService', 'contactService',
	'$stateParams',
	function($rootScope, $scope, $state, $mdDialog, locationService, designService, contactService, $stateParams) {
		$scope.tabIndex = $stateParams.tab;
		console.log($scope.selectedLocation);
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
