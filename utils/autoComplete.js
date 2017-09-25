app.controller("TestCtrl", ['$state', '$scope', 'locationService', 'historyService', function($state, $scope, locationService,
	historyService) {

	$scope.result1 = ''; // result of query
	$scope.options1 = {
      country: 'de',
      types: 'establishment'
    }; // filter based on country
	$scope.details1 = ''; // complete address in detail
	
	// latitude and longitude of the result
	$scope.lat = undefined;
	$scope.lng = undefined;
	
	// saves the location info before moving forward
	$scope.save = function() {
		locationService.setLocationName($scope.vm.details.name);
		var address = locationService.convertGoogleAddressToObjectAddress($scope.vm.details.address_components);
		locationService.setAddress(address);
		locationService.setGeoPosition($scope.vm.details.geometry.location.lat(), $scope.vm.details.geometry.location.lng());
	};
	
	// back navigation logic
	$scope.goBack = function() {
		historyService.setNavigatedBack(1);
		$state.go(historyService.getPreviousState());
	};

}]);