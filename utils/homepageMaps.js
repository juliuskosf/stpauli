app.controller('HomeLocationCtrl', ['$geolocation', '$scope', function($geolocation, $scope) {
// In the first round we do not get the result, therefore we have to give another starting coordinates.
// When the map updates, it will show the approximate geolocation.
// https://github.com/ninjatronic/ngGeolocation

	$geolocation.getCurrentPosition({
<<<<<<< HEAD
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
				  zoom: 13
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
=======
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

>>>>>>> f5ab20a483c4aa8784842dc94eaa6dab9746a8b7
 // $scope.map = { center: { latitude: 53.563384, longitude: 9.991794 }, zoom: 15 }; location from Hamburg
  $scope.options = {scrollwheel: false};

  var _options = {
    icon: {
        url: '/sources/img/icons/dropgmarkerblue.png',
        scaledSize: new google.maps.Size(42,68)
    }
  };
// https://www.iflebenskunde.de/wp-content/uploads/2016/07/Viva-con-Agua.png 
  $scope.markers = [{
    id: 0,
    coords: {
      latitude: 53.563385,
      longitude: 9.990634 },
    options: _options
  },
  {
    id: 1,
    coords: {
      latitude: 53.566519,
      longitude: 9.991254 },
    options: _options
  }];
<<<<<<< HEAD
}]);
=======
}]);
>>>>>>> f5ab20a483c4aa8784842dc94eaa6dab9746a8b7
