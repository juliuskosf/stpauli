app.controller("TestCtrl", ['$state', '$scope', 'locationService', 'historyService', function($state, $scope, locationService,
	historyService) {

	$scope.result1 = 'initial value';
	$scope.options1 = null;
	$scope.details1 = '';

	$scope.lat = undefined;
	$scope.lng = undefined;

	$scope.save = function() {
		locationService.setLocationName($scope.vm.details.name);
		var address = locationService.convertGoogleAddressToObjectAddress($scope.vm.details.address_components);
		locationService.setAddress(address);
		locationService.setGeoPosition($scope.vm.details.geometry.location.lat(), $scope.vm.details.geometry.location.lng());
	};

	$scope.goBack = function() {
		historyService.setNavigatedBack(1);
		$state.go(historyService.getPreviousState());
	};

}]);