app.service('designService', function($state) {
	var ds = this;

	ds.iconContinue = function() {
		switch ($state.current.name) {
			case "locations":
				return "sources/img/icons/search.svg";
			case "locations-create-category":
				return "sources/img/icons/save.svg";
			case "locations-create-information":
				return "sources/img/icons/save.svg";
			case "locations-search-result":
				return "sources/img/icons/edit.svg";
			case "locations-water-decision":
				return "sources/img/icons/continue.svg";
			case "locations-water-selection":
				return "sources/img/icons/continue.svg";
			case "locations-no-water":
				return "sources/img/icons/continue.svg";
			case "locations-water-decision-interest":
				return "sources/img/icons/continue.svg";
			case "locations-water-decision-no-interest":
				return "sources/img/icons/continue.svg";
			default:
				return "";
		}
	};

	ds.continueFunction = function() {
		switch ($state.current.name) {
			case "locations":
				console.log("location");
				break;
			default:
				console.log("default");
		}
	};

	ds.tiles = [{
		src: "sources/img/beerjack.svg",
		name: "bar"
	}, {
		src: "sources/img/music-player.svg",
		name: "club"
	}, {
		src: "sources/img/tea-cup.svg",
		name: "café"
	}, {
		src: "sources/img/restaurant.svg",
		name: "restaurant"
	}, {
		src: "sources/img/shopping-cart.svg",
		name: "shop"
	}, {
		src: "sources/img/question-mark.svg",
		name: "other"
	}];

	/*ds.waterBottles = [{
		src: "sources/img/water/VcA_330ml.png",
		name: "330"
	}, {
		src: "sources/img/water/VcA_500ml.png",
		name: "500"
	}, {
		src: "sources/img/water/VcA_750ml.png",
		name: "750"
	}, {
		src: "sources/img/water/VcA_1000ml.png",
		name: "1000"
	}, {
		src: "sources/img/water/VcA_Flasche_750ml_TRIO.png",
		name: "750trio"
	}, {
		src: "sources/img/water/VcA_750ml_Leise_PET.png",
		name: "750pet"
	}];*/
	
	ds.getNameForCategoryIndex = function(index) {
		return ds.tiles[index].name;
	};

	ds.getTiles = function() {
		return ds.tiles;
	};

	ds.getCategoryIconSourceForIndex = function(index) {
		return ds.tiles[index].src;
	};
});