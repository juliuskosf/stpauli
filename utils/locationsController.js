<<<<<<< HEAD
app.controller('LocationSearchCtrl', ['$scope', '$state', 'locationService', 'designService', 'historyService', function($scope, $state, locationService, designService, historyService) {
=======
app.controller('LocationSearchCtrl', ['$scope', '$state', 'locationService', 'designService', function($scope, $state, locationService,
	designService) {
>>>>>>> 7872537ffde8e5bf14ed92acf8a16241028eb7ce
	$scope.rememberName = function() {
		locationService.setSearchName($scope.searchName);
	};
<<<<<<< HEAD
	
	$scope.goBack = function (){
    	// $state.go($state.previous);
    	historyService.setNavigatedBack(1);
    	$state.go(historyService.getPreviousState());
    };
    
    $scope.getIcon = function(){
    	return designService.iconContinue();
    };
=======

	$scope.goBack = function() {
		$state.go($state.previous);
	};

	$scope.getIcon = function() {
		return designService.iconContinue();
	};
>>>>>>> 7872537ffde8e5bf14ed92acf8a16241028eb7ce
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

app.controller('CategorySelectionCtrl', ['$scope', '$state', 'locationService', 'designService', 'historyService', function($scope, $state, locationService,
	designService, historyService) {
	$scope.tileClicked = function(index) {
		locationService.oLocation.categoryIndex = index;
		$state.go('locations-create-information');
	};

	/*$scope.beforeBack = function() {
		locationService.oLocation = {};
<<<<<<< HEAD
		historyService.setNavigatedBack(1);
    	$state.go(historyService.getPreviousState());
	};*/
	
	$scope.goBack = function (){
    	historyService.setNavigatedBack(1);
    	$state.go(historyService.getPreviousState());
    };
=======

		$state.go($state.previous);
	};

	$scope.goBack = function() {
		$state.go($state.previous);
	};
>>>>>>> 7872537ffde8e5bf14ed92acf8a16241028eb7ce

	$scope.tiles = designService.getTiles();
}]);

// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

app.controller('WaterDecisionCtrl', ['$scope', '$state', 'locationService', 'designService', 'historyService', function($scope, $state, locationService,
	designService, historyService) {

<<<<<<< HEAD
	$scope.goBack = function (){
    	historyService.setNavigatedBack(1);
    	$state.go(historyService.getPreviousState());
    };
    
=======
	$scope.goBack = function() {
		$state.go($state.previous);
	};

>>>>>>> 7872537ffde8e5bf14ed92acf8a16241028eb7ce
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
			if (event.target.name === "glas") {
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
		var user = "";
		if (firebase.auth().currentUser) {
			// in case login form is not active
			user = firebase.auth().currentUser.uid;
		}

		var latitude = locationService.getGeoPosition().latitude;
		var longitude = locationService.getGeoPosition().longitude;

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
			WATER: locationService.getLocation().decision.already,
			IMAGINE: locationService.getLocation().decision.imagine,
			USER: user,
			LATITUDE: latitude.toString(),
			LONGITUDE: longitude.toString()
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

<<<<<<< HEAD
app.controller('locationSearchController', ['$scope', 'locationService', '$state', 'designService', 'historyService', function($scope, locationService,
	$state, designService, historyService, $stateParams) {
=======
app.controller('locationSearchController', ['$geolocation', '$scope', 'locationService', '$state', 'designService', function($geolocation,
	$scope, locationService,
	$state, designService) {
<<<<<<< HEAD

>>>>>>> 7872537ffde8e5bf14ed92acf8a16241028eb7ce
=======
	
	$scope.showNoResults = false;
	
>>>>>>> 8ecccec8cfccefd053c1ad16c1b8afabad8be1c5
	$scope.locations = [];
	
	$scope.loading = false;

	$scope.cityName = "...";

	$scope.filteredWithCity = true;

	$scope.itemPressed = function(id) {
		locationService.setSelectedLocation(id);
	};
<<<<<<< HEAD
	
	$scope.goBack = function (){
    	historyService.setNavigatedBack(1);
    	$state.go(historyService.getPreviousState());
    };
    
    $scope.getIcon = function(){
    	return designService.iconContinue();
    };
=======
>>>>>>> 7872537ffde8e5bf14ed92acf8a16241028eb7ce

	$scope.goBack = function() {
		$state.go($state.previous);
	};

	$scope.getIcon = function() {
		return designService.iconContinue();
	};

	function _getData(sUrl) {

		$.ajax({
			type: "GET",
			url: sUrl,
			cache: false,
			contentType: "application/json;charset=utf-8",
			error: function(msg, textStatus) {
				console.log("Search failed in locationSearchController with error code: " + textStatus);
				$scope.showNoResults = true;
			},
			success: function(data) {
				$scope.loading = false;
				$scope.$apply(function() {
					$scope.locations = data.d.results;
					if ($scope.locations.length === 0) {
						$scope.showNoResults = true;
					}
				});
			}
		});
	}

	function _loadLocations(withLocation) {

		if (!locationService.getSearchName()) {
			// empty search string
			// action need to be evaluated
			$scope.filteredWithCity = false;
		} else {
			var sUrl = "";

			if (withLocation) {

				$scope.loading = true;

				// get gelocation
				$geolocation.getCurrentPosition({
					timeout: 60000,
					maximumAge: 250,
					enableHighAccuracy: true
				}).then(function(position) {

					// get city from geodata
					var geocoder = new google.maps.Geocoder;

					var geoObject = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					geocoder.geocode({
						'location': geoObject
					}, function(results, status) {
						if (status === 'OK') {
							console.log(results);
							// set location into the info control
							$scope.$apply(function() {
								$scope.cityName = locationService.convertGoogleAddressToObjectAddress(results[0].address_components).city;
							});
							sUrl = "/destinations/vca/d064868/location.xsodata/Location/?$format=json&$filter=substringof('" + locationService.getSearchName()
								.toUpperCase() +
								"', CAPS_NAME) and substringof('" + locationService.convertGoogleAddressToObjectAddress(results[0].address_components).city +
								"',CITY)";
							_getData(sUrl);
						} else {
							_loadLocations(false);
						}
						// set URL with cityName

					}); // end of geocode promise

				}); // end of geolocation promise

			} else {
				$scope.filteredWithCity = false;
				sUrl = "/destinations/vca/d064868/location.xsodata/Location/?$format=json&$filter=substringof('" + locationService.getSearchName().toUpperCase() +
					"', CAPS_NAME)";
				_getData(sUrl);
			}

		}

	}

	$scope.loadAllPressed = function() {
		_loadLocations(false);
	};

	_loadLocations(true);

	$scope.getCategoryName = function(index) {
		return designService.getNameForCategoryIndex(index);
	};

	// $scope.locations = locationService.getAllLocations();
}]);

app.controller('locationsDetailCtrl', ['$rootScope', '$scope', '$state', '$mdDialog', 'locationService', 'designService', 'contactService', 'historyService',
	'$stateParams',
	function($rootScope, $scope, $state, $mdDialog, locationService, designService, contactService, historyService, $stateParams) {
		$scope.tabIndex = $stateParams.tab;
		$scope.selectedLocation = locationService.getSelectedLocation();
		$scope.waterDecision = $scope.selectedLocation.waterDecision;

		$scope.getCategoryName = function(index) {
			return designService.getNameForCategoryIndex(index);
		};

		$scope.contactClicked = function(id) {
			contactService.setSelectedContact(id);
			$state.go('contacts-detail');
		};

		if ($scope.selectedLocation.decision.already) {
			$scope.already = (($scope.selectedLocation.decision.already === 'X') ? true : false);
		} else {
			$scope.already = false;
		}

		if ($scope.selectedLocation.decision.imagine) {
			$scope.imagine = (($scope.selectedLocation.decision.imagine === 'X') ? true : false);
		} else {
			$scope.imagine = false;
		}

		$scope.backClicked = function() {
			historyService.setNavigatedBack(1);
    		$state.go(historyService.getPreviousState());
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
