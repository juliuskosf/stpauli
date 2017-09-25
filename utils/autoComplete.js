app.controller("TestCtrl", ['$state', '$scope', 'locationService', 'historyService', function($state, $scope, locationService,
	historyService) {

	$scope.result1 = ''; // result of query
	$scope.options1 = {
      country: 'de', // filter based on country
      types: 'establishment' // filter based on company
    }; 
	$scope.details1 = ''; // complete address in detail
	
	// latitude and longitude of the result
	$scope.lat = undefined;
	$scope.lng = undefined;
	
	// saves the location info before moving forward
	$scope.save = function() {
		locationService.setLocationName($scope.details1.name);
		var address = locationService.convertGoogleAddressToObjectAddress($scope.details1.address_components);
		locationService.setAddress(address);
		locationService.setGeoPosition($scope.details1.geometry.location.lat(), $scope.details1.geometry.location.lng());
	};
	
	// back navigation logic
	$scope.goBack = function() {
		historyService.setNavigatedBack(1);
		$state.go(historyService.getPreviousState());
	};

}]);