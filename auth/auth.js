app.controller('LoginCtrl', ['scope', '$mdDialog', '$rootScope', 'AUTH_EVENTS', function($scope, $mdDialog, $rootScope, AUTH_EVENTS) {

  $scope.login = function() {
    var email = $scope.email;
    var password = $scope.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      console.log(firebase.auth().currentUser);
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }, function(error) {
      console.log(error.code)
      console.log(error.message)
    });
  };

}]);

app.constant('AUTH_EVENTS', {
  loginSuccess : 'auth-login-success',
  loginFailed : 'auth-login-failed',
  logoutSuccess : 'auth-logout-success'
});
