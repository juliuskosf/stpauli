app.config(function($stateProvider, $mdThemingProvider) {

  $stateProvider
    .state('home', {templateUrl: 'home.html'})
    .state('presentation', {templateUrl: 'pages/presentation.html'})
    .state('locations', {templateUrl: 'pages/locations.html'})
    .state('contacts', {templateUrl: 'pages/contacts/contacts.html'})

    .state('locations-search-result', {templateUrl: 'pages/locations-search-result.html'})
    .state('locations-detail', {templateUrl: 'pages/locations-detail.html'})
    .state('locations-create', {templateUrl: 'pages/locations-create-category.html'})
    .state('locations-create-information', {templateUrl: 'pages/locations-create-information.html'})
    .state('locations-manual-adress', {templateUrl: 'pages/manual-adress-form.html'})

    .state('locations-water-decision', {templateUrl: 'pages/locations-water-decision.html'})
    .state('locations-water-decision-interest', {templateUrl: 'pages/locations-water-decision-interest.html'})
    .state('locations-water-decision-no-interest', {templateUrl: 'pages/locations-water-decision-no-interest.html'})

    .state('locations-toilet-paper-decision', {templateUrl: 'pages/locations-toilet-paper-decision.html'})
    .state('locations-toilet-paper-decision-interest', {templateUrl: 'pages/locations-toilet-paper-decision-interest.html'})
    .state('locations-toilet-paper-decision-no-interest', {templateUrl: 'pages/locations-toilet-paper-decision-no-interest.html'})

    .state('locations-create-summary', {templateUrl: 'pages/locations-create-summary.html'})

    .state('contacts-search-result', {templateUrl: 'pages/contacts/contacts-search-result.html'})
    .state('contacts-create', {templateUrl: 'pages/contacts/contacts-create.html'})
    .state('contacts-detail', {templateUrl: 'pages/contacts/contacts-detail.html'});
});