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
	//	$scope.categories = ['Bar', 'Shop', 'Restaurant'];
	$scope.categories = [0, 1, 2, 3, 4, 5];
	$scope.selected = [1];

	// create an empty variable for the categories which will be selected
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
		for (i = 0; i < selectedCategories.length; i++) {
			selectedCategory = selectedCategories[i];
			for (j = 0; j < $scope.allLocations.length; j++) {
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
			url: "/destinations/vca/d064868/location.xsodata/Location",
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
	/*
		$scope.cities = [{
			id: 1,
			name: 'Oslo',
			pos: [59.923043, 10.752839]
		}, {
			id: 2,
			name: 'Stockholm',
			pos: [59.339025, 18.065818]
		}, {
			id: 3,
			name: 'Copenhagen',
			pos: [55.675507, 12.574227]
		}, {
			id: 4,
			name: 'Berlin',
			pos: [52.521248, 13.399038]
		}, {
			id: 5,
			name: 'Paris',
			pos: [48.856127, 2.346525]
		}];
	*/
	/*
	        $scope.initMarkerClusterer = function () {
	            var markers = $scope.cities.map(function (city) {
	                return $scope.createMarker(city);
	            });
	            var mcOptions = { imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m' };
	            return new MarkerClusterer($scope.map, markers, mcOptions);
	        };


	        $scope.createMarker = function (city) {
	            var marker = new google.maps.Marker({
	                position: new google.maps.LatLng(city.pos[0], city.pos[1]),
	                title: city.name
	            });
	            google.maps.event.addListener(marker, 'click', function () {
	                $scope.selectedCity = city;
	                $scope.map.showInfoWindow('myInfoWindow', this);
	            });
	            return marker;
	        };
	*/

});