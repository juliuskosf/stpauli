app.controller('mapController', function($scope, NgMap) {
	
	$scope.initMarkerClusterer = function() {
		/*var markers = $scope.locatons.map(function (location) {
		    return $scope.createMarker(location);
		});*/
		var mcOptions = {
			imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'
		};
		$scope.markerCluster = new MarkerClusterer($scope.map, $scope.markers, mcOptions);
	};

	// define the array of categories
	
//	$scope.categories = [0, 1, 2, 3, 4, 5];
	$scope.categories = ['retail', 'gastronomy', 'event', 'enterprise', 'public facility', 'accommodation'];
	$scope.selected = ['retail'];

	// create an empty variable for the categories which will be selected
	var selectedCategories = [];

	$scope.filterChanged = function(category) {
		var idx = selectedCategories.indexOf(category);
		console.log(idx)
		if (idx > -1) {
			selectedCategories.splice(idx, 1);
		} else {
			selectedCategories.push(category);
		}
		
		$scope.markerCluster.clearMarkers();
		
		$scope.markers = [];
		
		var location = {};
		for (var i = 0; i < selectedCategories.length; i++) {
			// selectedCategory = selectedCategories[i];
			var selectedCategory = $scope.categories.indexOf(selectedCategories[i]);
			console.log(selectedCategory)
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
				url: '/sources/img/icons/dropgmarkerblue.png',
				scaledSize: new google.maps.Size(42, 68)
			}
		});

		google.maps.event.addListener(marker, 'click', function() {
			$scope.selectedLocation = location;
			$scope.map.showInfoWindow('myInfoWindow', this);
		});
		$scope.markers.push(marker);
	};

	NgMap.getMap().then(function(map) {
		$scope.map = map;
		$.ajax({
			type: "GET",
			url: "/destinations/vca/VivaConAgua/location.xsodata/Location",
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
	});

});