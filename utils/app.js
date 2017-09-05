var app = angular.module('VivaConAgua', [
	'ngMaterial',
	'ui.router',
	'uiGmapgoogle-maps',
	'ngGeolocation',
	'ngAutocomplete',
	'gm'
]);

app.run(['$rootScope', '$state', 'historyService', function($rootScope, $state, historyService) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
		$state.previous = fromState;
		historyService.addStateToHistory($state);
		console.log(historyService.getHistory());
		console.log(historyService.getIndex());
		historyService.setNavigatedBack(0);
	});
}]);