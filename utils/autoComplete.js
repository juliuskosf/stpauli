app.controller("TestCtrl",['$scope', 'locationService', function ($scope, locationService) {

    $scope.result1 = 'initial value';
    $scope.options1 = null;
    $scope.details1 = '';
    
    $scope.save = function () {
    	locationService.setLocationName($scope.vm.details.name);
    	var address = locationService.convertGoogleAddressToObjectAddress($scope.vm.details.address_components)               
    	locationService.setAddress(address)
    }
}]);
