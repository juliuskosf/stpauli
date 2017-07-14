var app = angular.module('VivaConAgua', [
    'ngRoute',
    'ngMaterial',
    'ui.router'
]);

app.config(function($stateProvider, $mdThemingProvider) {

  $stateProvider
    .state('home', {templateUrl: 'home.html'})
    .state('locations', {templateUrl: 'locations.html'})
    .state('locations-create', {templateUrl: 'locations-create-category.html'})
    .state('locations-create-information', {templateUrl: 'locations-create-information.html'})
    .state('locations-manual-adress', {templateUrl: 'manual-adress-form.html'})
    .state('werbung', {templateUrl: 'werbung.html'});
});

app.controller('MainController', function ($scope, $timeout, $mdSidenav, locationService) {
    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {

      return function() {
        //delete the oLocation here to!
        locationService.oLocation = {}
        $mdSidenav(componentId).toggle();
      };
    }
});

app.directive('sideBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'sidebar-component.html'
  }
});

app.service('locationService', function() {
  var ls = this; // ls => locationService

  ls.oLocation = {}; // variable for persistence

  ls.setLocationName = function(newValue) {
    ls.oLocation.name = newValue;
  }
  ls.getLocationName = function() {
    return ls.oLocation.name;
  };

  ls.getCategoryIndex = function() {
    return ls.oLocation.categoryIndex;
  };

});

app.service('designService', function() {
  var ds = this;

  ds.tiles = [
    {
      src: "sources/img/beerjack.svg",
      name: ""
    },
    {
      src: "sources/img/music-player.svg",
      name: ""
    },
    {
      src: "sources/img/tea-cup.svg",
      name: ""
    },
    {
      src: "sources/img/restaurant.svg",
      name: ""
    },
    {
      src: "sources/img/shopping-cart.svg",
      name: ""
    },
    {
      src: "sources/img/question-mark.svg",
      name: ""
    }
  ];

  ds.getTiles = function() {
    return ds.tiles;
  };

  ds.getCategoryIconSourceForIndex = function(index) {
    return ds.tiles[index].src;
  };
});

app.controller('LocationInformationCtrl', function($scope, $state, locationService, designService) {
  $scope.locationName = locationService.getLocationName() || "";

  //test implementation
  $scope.categorySource = designService.getCategoryIconSourceForIndex(
    locationService.getCategoryIndex()
  );

  $scope.goEnterManual = function() {
    $state.go('locations-manual-adress');
  };
  //

  $scope.$watch('locationName', function() {
        locationService.setLocationName($scope.locationName);
  });
  // save automatic adress here!
});

app.controller('ManualAdressCtrl', function ($scope, locationService) {
    $scope.locationName = locationService.getLocationName();

    console.log(locationService.oLocation.address);

    $scope.address = locationService.oLocation.address || {};

    $scope.$watch('address.address', function() {
          locationService.oLocation.address = $scope.address;
    });
    $scope.$watch('address.address2', function() {
          locationService.oLocation.address = $scope.address;
    });
    $scope.$watch('address.postcode', function() {
          locationService.oLocation.address = $scope.address;
    });
    $scope.$watch('address.city', function() {
          locationService.oLocation.address = $scope.address;
    });
});

app.controller('CategorySelectionCtrl', function ($scope, $state, locationService, designService) {
  $scope.tileClicked = function(index) {
    locationService.oLocation.categoryIndex = index;
    $state.go('locations-create-information');
  };

  $scope.beforeBack = function() {
    locationService.oLocation = {};
  };

  $scope.tiles = designService.getTiles();
});
