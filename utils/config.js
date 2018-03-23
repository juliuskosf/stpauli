app.config(["$stateProvider", "$mdThemingProvider", "uiGmapGoogleMapApiProvider", function($stateProvider, $mdThemingProvider,
	uiGmapGoogleMapApiProvider) {

	// Extend the exitsing color palettes with new additional coors
		var newBlueMap = $mdThemingProvider.extendPalette("blue", {
	    "500": "#3faad2",
	    "50": "#295a78",
	    "100": "#95a6b3"
	});
	// 1 Register the new color palette map with the name <code>neonRed</code>
	$mdThemingProvider.definePalette("newBlue", newBlueMap);
	// Use that theme for the primary intentions
	$mdThemingProvider.theme("default")
		.primaryPalette("newBlue");
	// Extend the exitsing color palettes with new additional coors
	var newOrangeMap = $mdThemingProvider.extendPalette("orange", {
		"500": "#e68352"
	});
	// 2 Register the new color palette map with the name <code>neonRed</code>
	$mdThemingProvider.definePalette("newOrange", newOrangeMap);
	// Use that theme for the primary intentions
	$mdThemingProvider.theme("default")
		.accentPalette("newOrange");
	$mdThemingProvider.theme("default")
		.primaryPalette("newBlue", {
			"default": "500", // by default use shade 400 from the pink palette for primary intentions
			"hue-1": "50",
			"hue-2": "100"// use shade 100 for the <code>md-hue-1</code> class
		})
		.accentPalette("newOrange", {
			"default": "500"
		})
		.warnPalette("red", {
			"default": "A700"
		});
	$stateProvider
		// configuration for ui.router see: 
		.state("start", {
			templateUrl: "pages/start.html"
		})
		.state("home", {
			templateUrl: "pages/home.html"
		})
		.state("map", {
			templateUrl: "pages/map.html"
		})
		.state("presentation", {
			templateUrl: "pages/presentation.html"
		})
		.state("locations", {
			templateUrl: "pages/locations/locations.html"
		})
		.state("locations-search-result", {
			templateUrl: "pages/locations/locations-search-result.html"
		})
		// special config to handover parameter to next state
		.state("locations-detail", {
			templateUrl: "pages/locations/locations-detail.html",
			params: {
				tab: null
			}
		})
		.state("locations-create-category", {
			templateUrl: "pages/locations/locations-create-category.html"
		})
		.state("locations-create-information", {
			templateUrl: "pages/locations/locations-create-information.html"
		})
		.state("locations-manual-address", {
			templateUrl: "pages/locations/manual-address-form.html"
		})
		.state("address-not-found", {
			templateUrl: "pages/locations/address-not-found.html"
		})
		.state("locations-water-decision", {
			templateUrl: "pages/locations/locations-water-decision.html"
		})
		.state("locations-water-selection", {
			templateUrl: "pages/locations/locations-water-selection.html"
		})
		.state("locations-no-water", {
			templateUrl: "pages/locations/locations-no-water.html"
		})
		.state("locations-water-decision-interest", {
			templateUrl: "pages/locations/locations-water-decision-interest.html"
		})
		.state("locations-water-decision-no-interest", {
			templateUrl: "pages/locations/locations-water-decision-no-interest.html"
		})
		.state("locations-create-summary", {
			templateUrl: "pages/locations/locations-create-summary.html"
		})
		.state("thankyou", {
			templateUrl: "pages/locations/thankyou.html"
		})
		.state("feedback", {
			templateUrl: "pages/feedback.html"
		});
}]);