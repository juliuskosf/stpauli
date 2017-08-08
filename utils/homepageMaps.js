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
 // $scope.map = { center: { latitude: 53.563384, longitude: 9.991794 }, zoom: 15 }; location from Hamburg
  $scope.options = {scrollwheel: false};

  var _options = {
    icon: {
        url: 'https://www.iflebenskunde.de/wp-content/uploads/2016/07/Viva-con-Agua.png',
        scaledSize: new google.maps.Size(80, 55)
    }
  };

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
}]);
