app.controller("mapController", function($scope, $element, NgMap) {

	$scope.showNavigation(true);
	$scope.initMarkerClusterer = function() {
		var mcOptions = {
			imagePath: "https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m"
		};
		$scope.markerCluster = new MarkerClusterer($scope.map, $scope.markers, mcOptions);
	};

	// Definition of category array	
	$scope.categories = ["fan shop", "fan bar", "fan club", "other"];
	$scope.searchTerm;
	$scope.clearSearchTerm = function() {
		$scope.searchTerm = "";
	};
	$element.find("input").on("keydown", function(ev) {
		ev.stopPropagation();
	});

	// Creation of empty variable for categories to be selected 
	var selectedCategories = [];
	$scope.filterChanged = function(category) {
		var idx = selectedCategories.indexOf(category);
		if (idx > -1) {
			selectedCategories.splice(idx, 1);
		} else {
			selectedCategories.push(category);
		}
		$scope.markerCluster.clearMarkers();
		$scope.markers = [];
		var location = {};
		for (var i = 0; i < selectedCategories.length; i++) {
			var selectedCategory = $scope.categories.indexOf(selectedCategories[i]);
			for (var j = 0; j < $scope.allLocations.length; j++) {
				location = $scope.allLocations[j];
				if (location.CATEGORYID === selectedCategory) {
					$scope.createMarker(location);
				}
			}
		}
		if ($scope.markers.length !== 0) {
			$scope.markerCluster.addMarkers($scope.markers);
		}
	};

	$scope.createMarker = function(location, filter) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(location.LATITUDE, location.LONGITUDE),
			title: location.NAME,
			icon: {
				url: "/sources/img/icons/marker.png",
				scaledSize: new google.maps.Size(42, 68)
			}
		});
		google.maps.event.addListener(marker, "click", function() {
			$scope.selectedLocation = location;
			$scope.map.showInfoWindow("myInfoWindow", this);
		});
		$scope.markers.push(marker);
	};

	NgMap.getMap().then(function(map) {
/* 
		NOTE: This fix determines the position (or sets default) first and then assigns map to $scope.map
		The position is handed over to the ngMap 'center' property through $scope.latitude and $scope.longitude
*/
		function getMarkers() {
			$.ajax({
				type: "GET",
				url: "/destinations/fcstpauli/FcStPauli/location.xsodata/Location",
				cache: false,
				dataType: "json",
				error: function(msg, textStatus) {
					console.log(textStatus);
				},
				success: function(data) {
					$scope.$apply(function() {
						$scope.allLocations = data.d.results;
						$scope.markers = [];
						$scope.initMarkerClusterer();
					});
				}
			});
		}

		function showPosition(position) {
			// Standard geolocation successHandler
			$scope.longitude = position.coords.longitude;
			$scope.latitude = position.coords.latitude;
			// Assign the map after determining the position
			$scope.map = map;
			// Load markers
			getMarkers();
		}

		function errorHandler() {
			// Set position to Hamburg
			$scope.longitude = 9.993682;
			$scope.latitude = 53.551085;
			// Assign map
			$scope.map = map;
			// Get markers
			getMarkers();
			// Following should be replaced with UI information
			console.log("Error");
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, errorHandler);
		} else {
			errorHandler(); // call the errorHandler too in case the browser doesn't support native GeoLocation
		}
	});
});