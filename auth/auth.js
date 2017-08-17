app.controller('LoginCtrl', ['scope', '$mdDialog', '$rootScope', 'AUTH_EVENTS', function($scope, $mdDialog, $rootScope, AUTH_EVENTS) {

  $scope.login = function() {
    console.log("login");
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
  };

}]);

app.constant('AUTH_EVENTS', {
  loginSuccess : 'auth-login-success',
  loginFailed : 'auth-login-failed',
  logoutSuccess : 'auth-logout-success'
});
