app.config(['$stateProvider', '$mdThemingProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider) {
uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAzzmCZNBcEjUJjWhaUl-PAZK7lcJs9HxE'
    });

    	$mdThemingProvider.theme('default')
		.primaryPalette('blue', {
    		'default': '500' // by default use shade 400 from the pink palette for primary intentions
    	//	'hue-1': '900' // use shade 100 for the <code>md-hue-1</code> class
    })

		.accentPalette('yellow', {
			'default': 'A700'
			})
		.warnPalette('red', {
			'default': 'A700'
		});


  $stateProvider
    .state('home', {templateUrl: 'pages/home.html'})
    .state('presentation', {templateUrl: 'pages/presentation.html'})
    .state('locations', {templateUrl: 'pages/locations.html'})
    .state('contacts', {templateUrl: 'pages/contacts/contacts.html'})

    .state('locations-search-result', {templateUrl: 'pages/locations-search-result.html'})
    .state('locations-detail',
    {
        templateUrl: 'pages/locations-detail.html',
        params: {tab: null}
    })
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
    .state('contacts-detail', {templateUrl: 'pages/contacts/contacts-detail.html'})

    .state('feedback', {templateUrl: 'pages/feedback.html'});
}]);