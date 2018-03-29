app.controller("LocationSearchCtrl", ["$scope", "$state", "locationService", "designService", "historyService", function($scope, $state,
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

// ---------------------------------------------------------------------------------------------------------------------------------

app.controller("manualAddressController", ["$scope", "$state", "$mdDialog", "locationService", "historyService", function($scope, $state,
	$mdDialog, locationService, historyService) {
		
	$scope.locationName = locationService.getLocationName();
	$scope.address = locationService.oLocation.address || {}; // default '{}' if locationService.oLocation.address is undefined 

	$scope.showConfirm = function(event) {
		locationService.setAddress($scope.address); // next command uses it so assign it here!
		locationService.setAddress({
			street: $scope.streetModel,
			additionalAddress: $scope.additionaladdressModel,
			postcode: $scope.postcodeModel,
			city: $scope.cityModel
		});
		locationService.setLocationName($scope.locationName); // save location name
		var confirm = $mdDialog.confirm()
			.title("Is this the right location?")
			.textContent(locationService.addressToString())
			.ariaLabel("Save")
			.targetEvent(event)
			.ok("Yes")
			.cancel("Change");
		$mdDialog.show(confirm).then(function() {
			$state.go("locations-create-category");
		});
	};

	$scope.goBack = function() {
		locationService.resetSelectedLocation();
		historyService.setNavigatedBack(1);
		$state.go(historyService.getPreviousState());
	};
}]);

// ---------------------------------------------------------------------------------------------------------------------------------

app.controller("categorySelectionController", ["$scope", "$state", "locationService", "designService", "historyService", function($scope, $state,
	locationService, designService, historyService) {

	$scope.tileClicked = function(index) { // index contains index of selected tile
		locationService.oLocation.categoryIndex = index; // assign index to categoryIndex in locationService
		// $state.go('locations-water-decision');
		$state.go('locations-create-summary');
	};

	$scope.goBack = function() {
		historyService.setNavigatedBack(1);
		$state.go(historyService.getPreviousState());
	};

	$scope.tiles = designService.getTiles(); // get all tile sources
}]);

// ---------------------------------------------------------------------------------------------------------------------------------

app.controller('WaterDecisionCtrl', ['$scope', '$state', 'locationService', 'designService', 'historyService', function($scope, $state,
	locationService, designService, historyService) {

	$scope.goBack = function() {
		historyService.setNavigatedBack(1);
		$state.go(historyService.getPreviousState());
	};

	$scope.saveDecision = function(selectedValue) {
		var decision = locationService.oLocation.decision || {}; // see above
		// fill the decision in the locationservice according to selected selectedValue
		switch (selectedValue) {
			case "seeYes":
				decision.already = "X";
				decision.imagine = "";
				break;
			case "seeNo":
				decision.already = "";
				break;
			case "imagineYes":
				decision.imagine = "X";
				break;
			case "imagineNo":
				decision.imagine = "";
				break;
			default:
		}
		locationService.setDecision(decision);
	};

	// Switch Yes/No
	$scope.data = false;

	$scope.continueTo = function() {
		if ($scope.data) {
			$state.go("locations-water-selection");
			$scope.saveDecision("seeYes");
		} else {
			$state.go("locations-no-water");
			$scope.saveDecision("seeNo");
		}
	};

	$scope.continueTo2 = function() {
		if ($scope.data) {
			$state.go("locations-water-decision-interest");
			$scope.saveDecision("imagineYes");
		} else {
			$state.go("locations-water-decision-no-interest");
			$scope.saveDecision("imagineNo");
		}
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
		locationService.setBottletypes($scope.B_330GLAS, $scope.B_500PET, $scope.B_750GLAS, $scope.B_1000PET, $scope.B_750TRIO, $scope.B_750PET);
		$state.go("locations-create-summary");
	};

	$scope.saveSelection = function(event) {
		if (event.target.name === "glas") {
			// Save glas
		} else {
			// save plastik
		}
	};
	
	// put the bottle images for selection
	//$scope.selectedImages = {};
	$scope.property = designService.getImages();
	$scope.B_330GLAS = false;
	$scope.B_500PET = false;
	$scope.B_750GLAS = false;
	$scope.B_1000PET = false;
	$scope.B_750TRIO = false;
	$scope.B_750PET = false;
	$scope.selectedImages = function(image) {
			// locationService.oLocation.bottleIndex = index;
			// designService.ds.getBottlesForIndex = index;
			// var selectedImages = {};
		var idx = designService.getImages().imageURLs.indexOf(image);
		switch (idx) {
			case 0:
				if ($scope.B_330GLAS) {
					$scope.B_330GLAS = false;
				} else {
					$scope.B_330GLAS = true;
				}
				break;
			case 1:
				if ($scope.B_500PET) {
					$scope.B_500PET = false;
				} else {
					$scope.B_500PET = true;
				}
				break;
			case 2:
				if ($scope.B_750GLAS) {
					$scope.B_750GLAS = false;
				} else {
					$scope.B_750GLAS = true;
				}
				break;
			case 3:
				if ($scope.B_1000PET) {
					$scope.B_1000PET = false;
				} else {
					$scope.B_1000PET = true;
				}
				break;
			case 4:
				if ($scope.B_750TRIO) {
					$scope.B_750TRIO = false;
				} else {
					$scope.B_750TRIO = true;
				}
				break;
			case 5:
				if ($scope.B_750PET) {
					$scope.B_750PET = false;
				} else {
					$scope.B_750PET = true;
				}
				break;
			default:
		}
	};

	$scope.tileClicked = function(index) { // index contains index of selected tile
		locationService.oLocation.categoryIndex = index; // assign index to categoryIndex in locationService
		$state.go("locations-water-decision");
	};

	// Save the reason - Why Not
	$scope.sendSupporter1 = function(index) { // index contains index of selected tile
		locationService.oLocation.reasonNoIndex = index;
		$state.go("locations-create-summary");
	};

	// Save the reason - Why Not Before
	$scope.sendSupporter2 = function(index) { // index contains index of selected tile
		locationService.oLocation.reasonYesIndex = index;
		$state.go("locations-create-summary");
	};

	// Continue button by reasons
	/*$scope.sendSupporter = function() {
		$state.go('locations-create-summary');
	};*/

}]);

// ---------------------------------------------------------------------------------------------------------------------------------

app.controller("SummaryController", ["$scope", "$state", "locationService", "historyService", function($scope, $state, locationService,
	historyService) {
	// $scope.waterDecision = locationService.getWaterDecision();
	$scope.location = locationService.oLocation;

	// $scope.getDecisionText = function(decisionCode) {
	// 	return locationService.getTextForInterestDecisionCode(decisionCode);
	// };

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
			NAME: locationService.getLocation().name.replace(/'/g, "´"),
			STREET: locationService.getLocation().address.street,
			POSTCODE: locationService.getLocation().address.postcode,
			CITY: locationService.getLocation().address.city,
			CATEGORYID: locationService.getLocation().categoryIndex,
			USER: user,
			LATITUDE: latitude.toString(),
			LONGITUDE: longitude.toString()
		});

		// POST
		$.ajax({
			type: "POST",
			url: "/destinations/fcstpauli/FcStPauli/location.xsodata/Location",
			dataType: "json",
			data: data,
			cache: false,
			contentType: "application/json;charset=unicode",
			error: function(msg, textStatus) {
				console.log(msg);
				// TODO: Error handling
			},
			success: function(data) {
				// TODO: Success handling
			}
		});
		// jump to final state
		$state.go("thankyou");
	};
}]);

// ---------------------------------------------------------------------------------------------------------------------------------

app.controller("locationSearchController", ["$scope", "locationService", "$state", "designService", "historyService", "$geolocation",
	function($scope, locationService, $state, designService, historyService, $geolocation) {
		$scope.showNoResults = false;	// Show the "no results"-Infofield when true
		$scope.locations = [];			// Empty placeholder for search results
		$scope.cityName = "...";		// Initial placehold while locating the user (will be replaced by city)
		var searchName = locationService.getSearchName().replace(/'/g, "´");
		$.ajax({
			type: "GET",
			url: "/destinations/fcstpauli/FcStPauli/location.xsodata/Location/?$filter=NAME eq '" + locationService.getSearchName().replace(/'/g,
				"´") + "' and STREET eq '" + locationService.getStreet() + "'",
			cache: false,
			contentType: "application/xml;charset=utf-8",
			error: function(msg, textStatus) {
				console.log(textStatus);
			},
			success: function(data) {
				if (data.documentElement.getElementsByTagName("d:NAME")[0] === undefined || data.documentElement.getElementsByTagName("d:STREET")[
						0] === undefined) {
					$scope.$apply(function() {
						$scope.showNoResults = true;
					});
				} else {
					$scope.$apply(function() {
						data = {
							NAME: data.documentElement.getElementsByTagName("d:NAME")[0].innerHTML,
							ID: data.documentElement.getElementsByTagName("d:ID")[0].innerHTML,
							STREET: data.documentElement.getElementsByTagName("d:STREET")[0].innerHTML,
							AADDRESS: data.documentElement.getElementsByTagName("d:AADDRESS")[0].innerHTML,
							POSTCODE: data.documentElement.getElementsByTagName("d:POSTCODE")[0].innerHTML,
							CITY: data.documentElement.getElementsByTagName("d:CITY")[0].innerHTML,
							CATEGORYID: data.documentElement.getElementsByTagName("d:CATEGORYID")[0].innerHTML,
							CAPS_NAME: data.documentElement.getElementsByTagName("d:CAPS_NAME")[0].innerHTML,
							IMAGINE: data.documentElement.getElementsByTagName("d:IMAGINE")[0].innerHTML
						};
						$scope.locations.push(data);
					});
				}
			}
		});
	
		$scope.itemPressed = function(id) {
			locationService.setSelectedLocation(id);
		};

		$scope.create = function() {
			$state.go("locations-create-category");
		};

		$scope.goBack = function() {
			locationService.resetSelectedLocation();
			historyService.setNavigatedBack(1);
			$state.go(historyService.getPreviousState());
		};

		$scope.getIcon = function() {
			return designService.iconContinue();
		};
	}
]);

// ---------------------------------------------------------------------------------------------------------------------------------

app.controller("locationsDetailController", ["$rootScope", "$scope", "$state", "$mdDialog", "locationService", "designService",
	"contactService", "historyService", "$stateParams",
	function($rootScope, $scope, $state, $mdDialog, locationService, designService, contactService, historyService, $stateParams) {

		// (obsolete) get correct tab from state parameter
		// $scope.tabIndex = $stateParams.tab;
		$scope.selectedLocation = locationService.getSelectedLocation();
		$scope.waterDecision = $scope.selectedLocation.waterDecision;
		var decision = locationService.getSelectedLocation().decision;
		// $scope.updateAlready = function() {
		// 	if ($scope.selectedLocation.decision.already) { // check if undefined
		// 		decision.already = "";
		// 	} else {
		// 		decision.already = "X";
		// 		decision.imagine = "";
		// 	}
		// 	locationService.setDecision(decision);
		// };

		// $scope.updateImagine = function() {
		// 	if ($scope.selectedLocation.decision.imagine) { // check if undefined
		// 		decision.imagine = "";
		// 	} else {
		// 		decision.imagine = "X";
		// 	}
		// 	locationService.setDecision(decision);
		// };
		
		// $scope.getCategoryName = function(index) {
		// 	return designService.getNameForCategoryIndex(index);
		// };

		// if ($scope.selectedLocation.decision.already) { // check if undefined
		// 	$scope.already = (($scope.selectedLocation.decision.already === "X") ? true : false);
		// } else {
		// 	$scope.already = false; // default
		// }

		// if ($scope.selectedLocation.decision.imagine) { // check if undefined
		// 	$scope.imagine = (($scope.selectedLocation.decision.imagine === "X") ? true : false);
		// } else {
		// 	$scope.imagine = false; // default
		// }

		$scope.backClicked = function() {
			locationService.resetSelectedLocation();
			historyService.setNavigatedBack(1);
			$state.go(historyService.getPreviousState());
		};

		$scope.goBack = function() {
			historyService.setNavigatedBack(1);
			$state.go(historyService.getPreviousState());
		};

		$scope.saveChanges = function() {
			var data = JSON.stringify({
				ID: locationService.getSelectedLocation().id,
				CAPS_NAME: locationService.getSelectedLocation().name.toUpperCase(),
				NAME: locationService.getSelectedLocation().name,
				STREET: locationService.getSelectedLocation().address.street,
				POSTCODE: locationService.getSelectedLocation().address.postcode,
				CITY: locationService.getSelectedLocation().address.city,
				CATEGORYID: locationService.getSelectedLocation().categoryIndex,
				WATER: locationService.getSelectedLocation().decision.already,
				IMAGINE: locationService.getSelectedLocation().decision.imagine,
				USER: locationService.getSelectedLocation().user,
				LATITUDE: locationService.getSelectedLocation().latitude,
				LONGITUDE: locationService.getSelectedLocation().longitude,
				WHY_NOT: locationService.getLocation().reasonNoIndex,
				WHY_NOT_BEFORE: locationService.getLocation().reasonYesIndex
			});

			// PUT
			$.ajax({
				type: "PUT",
				url: "/destinations/fcstpauli/FcStPauli/location.xsodata/Location(" + locationService.getSelectedLocation().id + ")",
				dataType: "json",
				data: data,
				cache: false,
				contentType: "application/json;charset=unicode",
				error: function(msg, textStatus) {
					// TODO: Error handling
				},
				success: function(data) {
					console.log("worked");
					// TODO: Success handling
				}
			});
		};

		$scope.interestReasons = locationService.getInterestReasons();
		$scope.noInterestReasons = locationService.getNoInterestReasons();

		$scope.getSourceForIndex = function(index) {
			var x = designService.getCategoryIconSourceForIndex(index);
			return x;
		};
	}
]);