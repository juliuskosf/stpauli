// Initialize the AngularJS App
var app = angular.module("FcStPauli", [
	"ngMaterial",
	"ui.router",
	"uiGmapgoogle-maps",
	"ngGeolocation",
	"ngAutocomplete",
	"gm",
	"ngMap",
	"multipleSelection"
]);

// Routine for backtracking logic
app.run(["$rootScope", "$state", "historyService", function($rootScope, $state, historyService) {
	// catch the event that is triggered when $state changes
	$rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState) {
		$state.previous = fromState;
		historyService.addStateToHistory($state);
		historyService.setNavigatedBack(0);
	});
}]);