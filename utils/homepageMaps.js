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

	$scope.options = {
		scrollwheel: false
	};

	var _options = {
		icon: {
			url: '/sources/img/icons/dropgmarkerblue.png',
			scaledSize: new google.maps.Size(42, 68)
		}
	};

	var markers = [{
		id: 0,
		coords: {
			latitude: 53.563385,
			longitude: 9.990634
		},
		options: _options,
		category: 'Three'
	}, {
		id: 1,
		coords: {
			latitude: 53.566519,
			longitude: 9.991254
		},
		options: _options,
		category: 'Three'
	}, {
		id: 2,
		coords: {
			latitude: 53.553355,
			longitude: 9.966551
		},
		options: _options,
		category: 'Two'
	}, {
		id: 3,
		coords: {
			latitude: 53.556423,
			longitude: 9.970016
		},
		options: _options,
		category: 'One'
	}, {
		id: 4,
		coords: {
			latitude: 53.553997,
			longitude: 9.986222
		},
		options: _options,
		category: 'One'
	}];

	// define the array of categories 
	$scope.categories = ['One', 'Two', 'Three'];
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