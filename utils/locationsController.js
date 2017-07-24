app.controller('ToiletPaperDecisionCtrl', function($scope, $state, locationService, designService) {
  var reasons = [];

  if ($state.current.name === 'locations-toilet-paper-decision-interest') {
      reasons = locationService.getInterestReasons();

  } else if ($state.current.name === 'locations-toilet-paper-decision-no-interest') {
    reasons = locationService.getNoInterestReasons();
  }

  $scope.reasons = reasons;
  $scope.selected = [];
  // Reduntanter Code!! Einfacheren Weg überlegen (Core-Funktionen auslagern)
  // -------

  $scope.toggle = function (reason, list) {
    var idx = list.indexOf(reason);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(reason);
    }
    list.sort(compare);
  };

  $scope.goSendSupporter = function() {
    var mode;
    if ($state.current.name === "locations-toilet-paper-decision-interest") {
      mode = 1
    } else if ($state.current.name === "locations-toilet-paper-decision-no-interest") {
      mode = 2
    }

    if (mode) {
        locationService.setPaperDecision(mode, $scope.selected);
    } else {
        locationService.setPaperDecision(0);
    }
    $state.go('locations-create-summary');
  };

  var compare = function(a, b) {
    if (a.id < b.id)
      return -1;
    if (a.id > b.id)
      return 1;
    return 0;
  };

  // ------
  // Reduntanter Code!! Einfacheren Weg überlegen (Core-Funktionen auslagern)

});





// -------------------------------------------
// -------------------------------------------
// -------------------------------------------






app.controller('LocationInformationCtrl', function($scope, $state, $timeout, $mdDialog, locationService, designService) {
  $scope.locationName = locationService.getLocationName() || "";

  //test implementation
  $scope.categorySource = designService.getCategoryIconSourceForIndex(
    locationService.getCategoryIndex()
  );

  $scope.loading = false;

  $scope.confirmAddress = function() {

    function getLocation() {
      $scope.loading = true;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("Error");
        }
    }

    function showPosition(position) { //async handler of geolocation
      // disable the animation when located
      $scope.loading = false;

      // instantiate url + new request()
      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyD2122kKcLcNKWAApGcKOmzoTqWXW4hznY"

      $.ajax({
        dataType: "json",
        url: url,
        data: "",
        success: successHandler
      });

      function successHandler(oData) {
        $scope.geoAddress = oData.results[0];
        var confirm = $mdDialog.confirm()
          .title('Diese Adresse für ' + $scope.locationName + ' hinzufügen?')
          .textContent(oData.results[0].formatted_address)
          .ariaLabel('Bestätigung')
          .targetEvent(event)
          .ok('Ja!')
          .cancel('Abbrechen');
        $mdDialog.show(confirm).then(function() {
          $state.go('locations-water-decision');
        }, function() {
          locationService.setAddress({});
        });
      }

    }

    $scope.$watch('geoAddress', function() {
      if ($scope.geoAddress) {
        var address = $scope.geoAddress; // read frome scope
        address = locationService.convertGoogleAddressToObjectAddress(address.address_components);
        locationService.setAddress(address);
      }
    });

    getLocation();

  };

  $scope.goEnterManual = function() {
    $state.go('locations-manual-adress');
  };

  $scope.$watch('locationName', function() {
    locationService.setLocationName($scope.locationName);
  });
});







// -------------------------------------------
// -------------------------------------------
// -------------------------------------------







app.controller('ManualAdressCtrl', function ($scope, $state, $mdDialog, locationService) {
    $scope.locationName = locationService.getLocationName();

    $scope.address = locationService.oLocation.address || {};

    $scope.$watch('address.address', function() {
          locationService.setAddress($scope.address);
    });
    $scope.$watch('address.address2', function() {
          locationService.setAddress($scope.address);
    });
    $scope.$watch('address.postcode', function() {
          locationService.setAddress($scope.address);
    });
    $scope.$watch('address.city', function() {
          locationService.setAddress($scope.address);
    });

    $scope.showConfirm = function(event) {
      var confirm = $mdDialog.confirm()
        .title('Ist das wirklich die Lokation?')
        .textContent(locationService.addressToString())
        .ariaLabel('Bestätigung')
        .targetEvent(event)
        .ok('Ja!')
        .cancel('Ändern');

      $mdDialog.show(confirm).then(function() {
        $state.go('locations-water-decision');
      }, function() {

      });
    }
});





// -------------------------------------------
// -------------------------------------------
// -------------------------------------------





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






// -------------------------------------------
// -------------------------------------------
// -------------------------------------------








app.controller('WaterDecisionCtrl', function ($scope, $state, locationService, designService) {5

  $scope.selected = [];

  if ($state.current.name === "locations-water-decision-interest") {
    $scope.reasons = locationService.getInterestReasons();
  } else if ($state.current.name === "locations-water-decision-no-interest") {
    $scope.reasons = locationService.getNoInterestReasons();
  }

  $scope.toggle = function (reason, list) {
    var idx = list.indexOf(reason);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(reason);
    }
    list.sort(compare);
  };

  $scope.goSendSupporter = function() {
    var mode;
    if ($state.current.name === "locations-water-decision-interest") {
      mode = 1
    } else if ($state.current.name === "locations-water-decision-no-interest") {
      mode = 2
    }

    if (mode) {
        locationService.setWaterDecision(mode, $scope.selected);
    } else {
        locationService.setWaterDecision(0);
    }
    $state.go('locations-toilet-paper-decision');
  };

  var compare = function(a, b) {
    if (a.id < b.id)
      return -1;
    if (a.id > b.id)
      return 1;
    return 0;
  };

});












app.controller('SummaryController', function($scope, locationService) {
  $scope.waterDecision = locationService.getWaterDecision();
  $scope.paperDecision = locationService.getPaperDecision();
  $scope.location = locationService.oLocation;

  $scope.getDecisionText = function(decisionCode) {
    return locationService.getTextForInterestDecisionCode(decisionCode);
  }
});









app.controller('locationsDetailCtrl', function($scope, locationService, designService) {
  $scope.selectedLocation = locationService.getSelectedLocation();
  $scope.getCategoryName = function (index) {
    return designService.getNameForCategoryIndex(index);
  };
});











app.controller('locationSearchController', function($scope, locationService, $state, designService) {
  $scope.itemPressed = function(id) {
    locationService.setSelectedLocation(id);
    $state.go('locations-detail');
  };

  $scope.getCategoryName = function (index) {
    return designService.getNameForCategoryIndex(index);
  };

  $scope.locations = locationService.getAllLocations();
});
