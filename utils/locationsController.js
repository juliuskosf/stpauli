app.controller('LocationSearchCtrl', ['$scope', '$state', 'locationService', 'designService', 'historyService', function($scope, $state,
	locationService, designService, historyService) {

	$scope.rememberName = function() {
		// (obsolete) save entered name for search on next screen
		locationService.setSearchName($scope.searchName);
	};

	// navBack logic
	$scope.goBack = function() {
		historyService.setNavigatedBack(1);
		$state.go(historyService.getPreviousState());
	};

	// dynamic source for correct icon in each state
	$scope.getIcon = function() {
		return designService.iconContinue();
	};

}]);

// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

app.controller('ManualAdressCtrl', ['$scope', '$state', '$mdDialog', 'locationService', function($scope, $state, $mdDialog, locationService) {
	$scope.locationName = locationService.getLocationName();

	$scope.address = locationService.oLocation.address || {}; // default '{}' if locationService.oLocation.address is undefined 

	$scope.showConfirm = function(event) {
		locationService.setAddress($scope.address); // next command uses it so assign it here!
		locationService.setLocationName($scope.locationName); // save location name

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

app.controller('CategorySelectionCtrl', ['$scope', '$state', 'locationService', 'designService', 'historyService', function($scope, $state,
	locationService,
	designService, historyService) {

	$scope.tileClicked = function(index) { // index contains index of selected tile
		locationService.oLocation.categoryIndex = index; // assign index to categoryIndex in locationService
		$state.go('locations-water-decision');
	};

	$scope.goBack = function() {
		historyService.setNavigatedBack(1);
		$state.go(historyService.getPreviousState());
	};

	$scope.tiles = designService.getTiles(); // get all tile sources
}]);

// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

app.controller('WaterDecisionCtrl', ['$scope', '$state', 'locationService', 'designService', 'historyService', function($scope, $state,
	locationService,
	designService, historyService) {

	$scope.goBack = function() {
		historyService.setNavigatedBack(1);
		$state.go(historyService.getPreviousState());
	};

	$scope.saveDecision = function(selectedValue) {
		var decision = locationService.oLocation.decision || {}; // see above

		// fill the decision in the locationservice according to selected selectedValue
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
	};

	$scope.selected = []; // empty array as placeholder for selected reasons

	// fetch reasons for interest or no interest according to current states name
	if ($state.current.name === "locations-water-decision-interest") {
		$scope.reasons = locationService.getInterestReasons();
	} else if ($state.current.name === "locations-water-decision-no-interest") {
		$scope.reasons = locationService.getNoInterestReasons();
	}

	// add or remove selected reason
	$scope.toggle = function(reason, list) {

		// list contains reference to selected

		var idx = list.indexOf(reason);
		if (idx > -1) {
			list.splice(idx, 1);
		} else {
			list.push(reason);
		}
		list.sort(compare);
	};

	// sort function
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
	};

	$scope.saveSelection = function(event) {
		if (event.target.name === "glas") {
			// Save glas
		} else {
			// save plastik
		}
	};

}]);

app.controller('SummaryController', ['$scope', '$state', 'locationService', 'historyService', function($scope, $state, locationService,
	historyService) {
	$scope.waterDecision = locationService.getWaterDecision();
	$scope.location = locationService.oLocation;

	$scope.getDecisionText = function(decisionCode) {
		return locationService.getTextForInterestDecisionCode(decisionCode);
	};

	$scope.goBack = function() {
		historyService.setNavigatedBack(1);
		$state.go(historyService.getPreviousState());
	};

	$scope.saveLocationInfo = function() {
		// this function fetches all information from locationService and puts them together to push to DB

		var user = "";
		if (firebase.auth().currentUser) {
			// in case login form is active assign Firebase userId to user field in DB
			user = firebase.auth().currentUser.uid;
		}

		// get latitude and longitude from locationService

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
			url: "/destinations/vca/VivaConAgua/location.xsodata/Location",
			dataType: "json",
			data: data,
			cache: false,
			contentType: "application/json;charset=unicode",
			error: function(msg, textStatus) {
				// TODO: Error handling
			},
			success: function(data) {
				// TODO: Success handling
			}
		});
		// jump to final state
		$state.go('thankyou');
	};
}]);

app.controller('locationSearchController', ['$scope', 'locationService', '$state', 'designService', 'historyService', '$geolocation',
	function($scope, locationService, $state, designService, historyService, $geolocation) {

		// show the "no results"-Infofield when true
		$scope.showNoResults = false;

		// empty placeholder for search results
		$scope.locations = [];

		// initial placehold while locating the user (will be replaced by city)
		$scope.cityName = "...";

		$.ajax({
			type: "GET",
			url: "/destinations/vca/VivaConAgua/location.xsodata/Location/?$filter=substringof('" + locationService.getSearchName()
				.toUpperCase() + "', CAPS_NAME) and STREET eq '" + locationService.getStreet() + "'",
			cache: false,
			contentType: "application/xml;charset=utf-8",
			error: function(msg, textStatus) {
				console.log(textStatus);
			},
			success: function(data) {
				console.log(data)
				var data = data;
				if (data.documentElement.getElementsByTagName('d:NAME')[0] === undefined) {
					$scope.$apply(function() {
						$scope.showNoResults = true;
					});
					
					
				} else {

					$scope.$apply(function() {

						console.log(data)
						data = {
							NAME: data.documentElement.getElementsByTagName('d:NAME')[0].innerHTML,
							ID: data.documentElement.getElementsByTagName('d:ID')[0].innerHTML,
							STREET: data.documentElement.getElementsByTagName('d:STREET')[0].innerHTML,
							AADDRESS: data.documentElement.getElementsByTagName('d:AADDRESS')[0].innerHTML,
							POSTCODE: data.documentElement.getElementsByTagName('d:POSTCODE')[0].innerHTML,
							CITY: data.documentElement.getElementsByTagName('d:CITY')[0].innerHTML,
							CATEGORYID: data.documentElement.getElementsByTagName('d:CATEGORYID')[0].innerHTML,
							CAPS_NAME: data.documentElement.getElementsByTagName('d:CAPS_NAME')[0].innerHTML,
							IMAGINE: data.documentElement.getElementsByTagName('d:IMAGINE')[0].innerHTML
						};

						$scope.locations.push(data);

					});
				}
			}
		});

		/*	$.ajax({
				type: "GET",
				url: "/destinations/vca/VivaConAgua/location.xsodata/Location/?$filter=substringof('" + locationService.getSearchName()
					.toUpperCase() +
					"', CAPS_NAME) and STREET eq '" + locationService.getStreet() + "'",
				cache: false,
				contentType: "application/json;charset=utf-8",
				error: function(msg, textStatus) {
					console.log("Search failed in locationSearchController with error code: " + textStatus);
					$scope.showNoResults = true;
				},
				success: function(data) {
					console.log(data)
					// console.log($("object").contents().find('entry'))
					$scope.loading = false;
					$scope.$apply(function() {
						$scope.locations = data.d.results;
						if ($scope.locations.length === 0) {
							$scope.showNoResults = true;
						}
					});
				}
			});*/

		$scope.itemPressed = function(id) {
			locationService.setSelectedLocation(id);
		};

		$scope.goBack = function() {
			historyService.setNavigatedBack(1);
			$state.go(historyService.getPreviousState());
		};

		$scope.getIcon = function() {
			return designService.iconContinue();
		};

		/*	function _getData(sUrl) {
				// function for GET Request
				
				$.ajax({
					type: "GET",
					url: sUrl,
					cache: false,
					contentType: "application/xml;charset=utf-8",
					error: function(msg, textStatus) {
						console.log("Search failed in locationSearchController with error code: " + textStatus);
						$scope.showNoResults = true;
					},
					success: function(data) {

						console.log(data.getProperty('#document/entry'))
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
				
				// withLocation = false -> load all locations without city filter
				// withLocation = false -> load all locations with city filter
				
				if (!locationService.getSearchName()) {
					// empty search string
					
					$scope.filteredWithCity = false;
					$scope.loading = false;
					$scope.showNoResults = true;

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
							// position contains current position of the user
							
							// get google-Geocoder
							var geocoder = new google.maps.Geocoder;
							
							// create object with latitude and longitude
							var geoObject = {
								lat: position.coords.latitude,
								lng: position.coords.longitude
							};
							
							geocoder.geocode({
								'location': geoObject
							}, function(results, status) {
								
								// results contains all results for the geodata
								
								if (status === 'OK') {
									// set location into the info control
									$scope.$apply(function() {
										
										var result = results[0];
										var addressComponents = result.address_components;
										var city = locationService.convertGoogleAddressToObjectAddress(addressComponents).city;
										
										$scope.cityName = city;
									});
									
									// build URL with search string and city name
							
									sUrl = "/destinations/vca/VivaConAgua/location.xsodata/Location/?$format=xml&$filter=substringof('" + locationService.getSearchName()
										.toUpperCase() +
										"', CAPS_NAME) and STREET eq '" + locationService.getStreet() + "'";
										
									// fetch data with URL	
									_getData(sUrl);
								} else {
									_loadLocations(false);
								}
								
							}); // end of geocode promise

						});

					} else {
						$scope.filteredWithCity = false;

						sUrl=  "/destinations/vca/VivaConAgua/location.xsodata/Location/?$format=xml&$filter=CAPS_NAME eq '" + locationService.getSearchName().toUpperCase() + "' and STREET eq '" + locationService.getStreet() + "'";
						_getData(sUrl);
					}

				}

			}*/

		/*	$scope.loadAllPressed = function() {
				_loadLocations(false);
			};*/

		// _loadLocations(true);
		/*
				$scope.getCategoryName = function(index) {
					return designService.getNameForCategoryIndex(index);
				};*/
	}
]);

app.controller('locationsDetailCtrl', ['$rootScope', '$scope', '$state', '$mdDialog', 'locationService', 'designService',
	'contactService',
	'historyService', '$stateParams',
	function($rootScope, $scope, $state, $mdDialog, locationService, designService, contactService, historyService, $stateParams) {

		// (obsolete) get correct tab from state parameter
		$scope.tabIndex = $stateParams.tab;

		$scope.selectedLocation = locationService.getSelectedLocation();

		$scope.waterDecision = $scope.selectedLocation.waterDecision;

		$scope.getCategoryName = function(index) {
			return designService.getNameForCategoryIndex(index);
		};

		if ($scope.selectedLocation.decision.already) { // check if undefined
			$scope.already = (($scope.selectedLocation.decision.already === 'X') ? true : false);
		} else {
			$scope.already = false; // default
		}

		if ($scope.selectedLocation.decision.imagine) { // check if undefined
			$scope.imagine = (($scope.selectedLocation.decision.imagine === 'X') ? true : false);
		} else {
			$scope.imagine = false; // default
		}

		$scope.backClicked = function() {
			historyService.setNavigatedBack(1);
			$state.go(historyService.getPreviousState());
		};

		$scope.interestReasons = locationService.getInterestReasons();

		$scope.noInterestReasons = locationService.getNoInterestReasons();

		$scope.getSourceForIndex = function(index) {
			var x = designService.getCategoryIconSourceForIndex(index);
			return x;
		};
	}
]);