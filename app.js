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
    .state('locations-water-decision', {templateUrl: 'locations-water-decision'})
    .state('locations-water-decision-interest', {templateUrl: 'locations-water-decision-interest'})
    .state('locations-water-decision-no-interest', {templateUrl: 'locations-water-decision-no-interest'})
    .state('locations-toilet-paper-decision', {templateUrl: 'locations-toilet-paper-decision'})
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

  ls.addressToString = function() {
    if (ls.oLocation.address.address2) {
      return ls.oLocation.address.address + ' ' +
        ls.oLocation.address.address2 + ' ' +
        ls.oLocation.address.postcode + ' ' +
        ls.oLocation.address.city;
    } else {
      return ls.oLocation.address.address + ' ' +
        ls.oLocation.address.postcode + ' ' +
        ls.oLocation.address.city;
    }
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

app.controller('LocationInformationCtrl', function($scope, $state, $timeout, $mdDialog, locationService, designService) {
  $scope.locationName = locationService.getLocationName() || "";

  //test implementation
  $scope.categorySource = designService.getCategoryIconSourceForIndex(
    locationService.getCategoryIndex()
  );

  $scope.confirmAddress = function() {
    $timeout(function() { // just mock-up until google api works
      var confirm = $mdDialog.confirm()
        .title('Diese Adresse für ' + $scope.locationName + ' hinzufügen?')
        .textContent('Schloßallee 99 in 99999 Monopoly')
        .ariaLabel('Bestätigung')
        .targetEvent(event)
        .ok('Ja!')
        .cancel('Abbrechen');

      $mdDialog.show(confirm).then(function() {
        $state.go('locations-water-decision');
      }, function() {
        console.log('Declined');
      });
      // rework this with HTML Template to use more than one line
    }, 2000); // <-- TODO
  };

  $scope.goEnterManual = function() {
    $state.go('locations-manual-adress');
  };

  $scope.$watch('locationName', function() {
    locationService.setLocationName($scope.locationName);
  });
  // save automatic adress here!
});

app.controller('ManualAdressCtrl', function ($scope, $state, $mdDialog, locationService) {
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

    $scope.showConfirm = function(event) {
      var confirm = $mdDialog.confirm()
        .title('Ist das wirklich die Lokation?')
        .textContent(locationService.addressToString())
        .ariaLabel('Bestätigung')
        .targetEvent(event)
        .ok('Ja!')
        .cancel('Lieber nochmal ändern');

      $mdDialog.show(confirm).then(function() {
        $state.go('locations-water-decision');
      }, function() {
        // declined
        console.log('Declined');
      });
    }
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

app.controller('WaterDecisionCtrl', function ($scope, $state, locationService, designService) {
  $scope.goSupporterYet = function() {
    //locationService.setSupporterYet(); // this function should add "Ist bereits Supporter" flag of location
    $state.go('locations-toilet-paper-decision');
  };
});
