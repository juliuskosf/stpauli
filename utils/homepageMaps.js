app.controller('HomeLocationCtrl', ['$geolocation', '$scope', function($geolocation, $scope) {
	// In the first round we do not get the result, therefore we have to give another starting coordinates.
	// When the map updates, it will show the approximate geolocation.
	// https://github.com/ninjatronic/ngGeolocation
	
	$geolocation.getCurrentPosition({
		timeout: 60000,
		maximumAge: 250,
		enableHighAccuracy: true
	}).then(function(position) {
		$scope.myPosition = position;
		if ($scope.myPosition) {
			$scope.map = {
				center: {
					latitude: $scope.myPosition.coords.latitude,
					longitude: $scope.myPosition.coords.longitude
				},
				zoom: 12
			};
		}
	});

	$scope.map = {
		center: {
			latitude: 51.312801,
			longitude: 9.481544
		},
		zoom: 5
	};
	
	var markers;

	var fill_markers = function() {
		markers = [];
		for (i = 0; i < $scope.locations.length; i++) {
			marker = {
				id: $scope.locations[i].ID,
				coords: {
					latitude: parseFloat($scope.locations[i].LATITUDE),
					longitude: parseFloat($scope.locations[i].LONGITUDE)
				},
				options: _options,
				category: $scope.locations[i].CATEGORYID
			};
			markers.push(marker);
		}
	};

	$scope.options = {
		scrollwheel: false
	};

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
				$scope.locations = data.d.results;
				fill_markers();
			});
		}
	});
	
	

	var _options = {
		icon: {
			url: '/sources/img/icons/dropgmarkerblue.png',
			scaledSize: new google.maps.Size(42, 68)
		}
	};
	
	// define the array of categories
	//	$scope.categories = ['Bar', 'Shop', 'Restaurant'];
	$scope.categories = [0, 1, 2, 3, 4, 5];
	$scope.selected = [1];

	// create an empty variable for the categories which will be selected
	var selectedCategories = [];

	$scope.markers = [];

	// filter the categories and bind with the right marker from our markers array.
	$scope.filterChanged = function(category) {
		// check the selected categories
		var idx = selectedCategories.indexOf(category);
		if (idx > -1) {
			selectedCategories.splice(idx, 1);
		} else {
			selectedCategories.push(category);
		}
		// compare the selected category/ies with markers
		// when selecting more than one categories, we cannot add the same markers again and again therefore
		// clear the markers from the previous time and continue
		$scope.markers = [];
		for (i = 0; i < selectedCategories.length; i++) {
			selectedCategory = selectedCategories[i];
			for (j = 0; j < markers.length; j++) {
				marker = markers[j];
				if (marker.category === selectedCategory) {
					$scope.markers.push(marker);
				}
			}

		}
	};
}]);