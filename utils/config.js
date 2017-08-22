app.config(['$stateProvider', '$mdThemingProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyCz8oF7ATzPWSx8hQEWeAXjR2um3VUtod4'
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
    .state('map', {templateUrl: 'pages/map.html'})
    .state('presentation', {templateUrl: 'pages/presentation.html'})
    .state('locations', {templateUrl: 'pages/locations/locations.html'})


    .state('locations-search-result', {templateUrl: 'pages/locations/locations-search-result.html'})
    .state('locations-detail',
    {
        templateUrl: 'pages/locations/locations-detail.html',
        params: {tab: null}
    })
    .state('locations-create-category', {templateUrl: 'pages/locations/locations-create-category.html'})
    .state('locations-create-information', {templateUrl: 'pages/locations/locations-create-information.html'})
    .state('locations-manual-adress', {templateUrl: 'pages/locations/manual-adress-form.html'})

    .state('locations-water-decision', {templateUrl: 'pages/locations/locations-water-decision.html'})
    .state('locations-water-selection', {templateUrl: 'pages/locations/locations-water-selection.html'})
    .state('locations-no-water', {templateUrl: 'pages/locations/locations-no-water.html'})
    .state('locations-water-decision-interest', {templateUrl: 'pages/locations/locations-water-decision-interest.html'})
    .state('locations-water-decision-no-interest', {templateUrl: 'pages/locations/locations-water-decision-no-interest.html'})
    /*
    .state('locations-toilet-paper-decision', {templateUrl: 'pages/locations-toilet-paper-decision.html'})
    .state('locations-toilet-paper-decision-interest', {templateUrl: 'pages/locations-toilet-paper-decision-interest.html'})
    .state('locations-toilet-paper-decision-no-interest', {templateUrl: 'pages/locations-toilet-paper-decision-no-interest.html'})
    */
    .state('locations-create-summary', {templateUrl: 'pages/locations/locations-create-summary.html'})

    .state('thankyou', {templateUrl: 'pages/locations/thankyou.html'})
    /*
    .state('contacts', {templateUrl: 'pages/contacts/contacts.html'})
    .state('contacts-search-result', {templateUrl: 'pages/contacts/contacts-search-result.html'})
    .state('contacts-create', {templateUrl: 'pages/contacts/contacts-create.html'})
    .state('contacts-detail', {templateUrl: 'pages/contacts/contacts-detail.html'})
    */
    .state('feedback', {templateUrl: 'pages/feedback-help.html'});
}]);
