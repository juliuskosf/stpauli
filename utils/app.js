var app = angular.module('VivaConAgua', [
    'ngMaterial',
    'ui.router',
    'uiGmapgoogle-maps',
    'ngGeolocation'
]);

app.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
    $state.previous = fromState;
  });
}]);
