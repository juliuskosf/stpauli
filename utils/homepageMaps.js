app.controller('HomeLocationCtrl', function($scope, $mdToast) {
  $scope.map = { center: { latitude: 53.551086, longitude: 9.993682 }, zoom: 15 };
  
  $scope.confirmAddress = function() {

    function getLocation() {
      $scope.loading = true;

      if (navigator.geolocation) {
        // Get position using geolocation api
        navigator.geolocation.getCurrentPosition(successHandler, errorHandlerGeo, {timeout: 7000});
      } else {
        errorHandler();
      }
    }

    // some error in Geolocating
    function errorHandlerGeo() {
      if ($scope.loading == true) {
        console.log("Using Google API!");
        // use google api
        var url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCegJ74_T3HkjEpaLthv92YTG3xZpjG7bs";

        $.ajax({
          dataType: "json",
          url: url,
          data: "",
          success: successHandler,
          method: "POST",
          error: errorHandler
        });
      } else {
        // navigator.geolocation API acts stupid...!
        // errorHandler of navigator.geolocation triggers twice ...
        // we need to analyse this behavior
        // see the stack overflow question below as a reference:
        // https://stackoverflow.com/questions/9738167/issue-with-geolocation-timeout-callback-firing-whether-response-received-or-not/9740300#9740300
        console.log("Triggered twice");
      }
    }

    function errorHandler() {
      $scope.loading = false;
      $mdToast.show(
        $mdToast.simple()
          .textContent('Unable to find you!')
          .hideDelay(3000)
      );
      console.log("error");
    }

    function successHandler(position) {
      var lat, lng;

      $scope.loading = false;

      if (position.location && position.location) {
        lat = position.location.lat;
        lng = position.location.lng;
      } else if (position.coords && position.coords) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      } else {
        errorHandler();
      }

      if (lat && lng) {
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyD2122kKcLcNKWAApGcKOmzoTqWXW4hznY"

        $.ajax({
          dataType: "json",
          url: url,
          data: "",
          success: showPosition,
          error: errorHandler
        });
      }
    }
  }
  })