app.config(function($stateProvider, $mdThemingProvider) {

  $stateProvider
    .state('home', {templateUrl: 'home.html'})
    .state('werbung', {templateUrl: 'pages/werbung.html'})
    .state('locations', {templateUrl: 'pages/locations.html'})

    .state('locations-create', {templateUrl: 'pages/locations-create-category.html'})
    .state('locations-create-information', {templateUrl: 'pages/locations-create-information.html'})
    .state('locations-manual-adress', {templateUrl: 'pages/manual-adress-form.html'})

    .state('locations-water-decision', {templateUrl: 'pages/locations-water-decision'})
    .state('locations-water-decision-interest', {templateUrl: 'pages/locations-water-decision-interest'})
    .state('locations-water-decision-no-interest', {templateUrl: 'pages/locations-water-decision-no-interest'})

    .state('locations-toilet-paper-decision', {templateUrl: 'pages/locations-toilet-paper-decision'})
    .state('locations-toilet-paper-decision-interest', {templateUrl: 'pages/locations-toilet-paper-decision-interest'})
    .state('locations-toilet-paper-decision-no-interest', {templateUrl: 'pages/locations-toilet-paper-decision-no-interest'})

    .state('locations-create-summary', {templateUrl: 'pages/locations-create-summary'});
});
