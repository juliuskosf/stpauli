app.service('locationService', function($state) {
	var ls = this; // ls => locationService

	ls.setDecision = function(decision) {
		ls.oLocation.decision = decision;
	}

	ls.oLocation = {}; // variable for persistence

	ls.getTextForInterestDecisionCode = function(dc) {
		var textForCode = ["Bereits Supporter", "Interesse", "Kein Intresse"];
		return textForCode[dc];
	}

	ls.getLocation = function() {
		return ls.oLocation;
	};

	ls.setLocationName = function(newValue) {
		ls.oLocation.name = newValue;
	}
	ls.getLocationName = function() {
		return ls.oLocation.name;
	};

	ls.getCategoryIndex = function() {
		return ls.oLocation.categoryIndex;
	};

	ls.setSearchName = function(newValue) {
		ls.searchName = newValue;
	}

	ls.getSearchName = function() {
		return ls.searchName;
	}

	ls.setPaperDecision = function(dc, reasons) {
		ls.oLocation.paperDecision = {
			decisionCode: dc,
			reasons: reasons
		}
	};

	ls.getInterestReasons = function() {
		return [{
			id: 0,
			text: "Zu teuer"
		}, {
			id: 1,
			text: "Anderer Lieferant"
		}, {
			id: 2,
			text: "Vorher nie gehört"
		}, {
			id: 3,
			text: "Andere"
		}];
	};

	ls.getNoInterestReasons = function() {
		return [{
			id: 0,
			text: "Zu teuer"
		}, {
			id: 1,
			text: "Blöd"
		}, {
			id: 3,
			text: "Andere"
		}];
	};

	ls.addContactToSelectedLocation = function(contactId) {
		if (ls.selectedLocation.partners) {
			ls.selectedLocation.partners.push(contactId);
		} else {
			ls.selectedLocation.partners = [contactId];
		}

		function sortNumber(a, b) {
			return a - b;
		}
		// sorting increases the performance when searching for possiblePartners
		ls.selectedLocation.partners.sort(sortNumber);
	}

	ls.saveLocation = function() {

		// mockup until xsodata is implemented
		var highestLocation = ls.locations[ls.locations.length - 1];
		ls.oLocation.id = highestLocation.id + 1;
		ls.locations.push(ls.oLocation);
		// mockup until xsodata is implemented
		ls.oLocation = {};
		return highestLocation.id + 1;
	}

	ls.locations = [{
		name: "Die Schenke",
		id: 0,
		address: {
			street: "Rathausplatz",
			additionalAddress: "2. Etage",
			postcode: "45219",
			city: "Essen"
		},
		partners: [0],
		categoryIndex: 0,
		// adapt to right format!!
		waterDecision: {
			decisionCode: 1
		},
		paperDecision: {
			decisionCode: 0
		}
	}, {
		name: "Henriks",
		id: 1,
		address: {
			street: "Tesdorpfstraße 6",
			additionalAddress: "",
			postcode: "23441",
			city: "Hamburg",
		},
		partners: [1],
		categoryIndex: 3,
		// s.o.
		waterDecision: {
			decisionCode: 1
		},
		paperDecision: {
			decisionCode: 2
		}
	}, {
		name: "Edeka",
		id: 2,
		address: {
			street: "Kaiserstraße 15",
			additionalAddress: "",
			postcode: "76133",
			city: "Karlsruhe",
		},
		partners: [2],
		categoryIndex: 4,
		// s.o.
		waterDecision: {
			decisionCode: 1
		},
		paperDecision: {
			decisionCode: 1
		}
	}];

	ls.getAllLocations = function() {
		for (var i = 0; i < ls.locations.length; i++) {
			parseInt(ls.locations[i].address.postcode);
		}
		return ls.locations;
	};

	ls.setSelectedLocation = function(id) {

		/*	ls.selectedLocation = {
				name: "",
				id: "",
				address: {
					street: "",
					additionalAddress: "",
					postcode: "",
					city: ""
				},
				partners: null,
				categoryIndex: null,
				waterDecision: {
					decisionCode: null
				},
				paperDecision: {
					decisionCode: null
				}
			};*/

		// GET
		$.ajax({
			type: "GET",
			url: "/destinations/vca/d064868/location.xsodata/Location(" + id + ")?$format=json",
			cache: false,
			contentType: "application/json;charset=utf-8",
			error: function(msg, textStatus) {
				console.log(textStatus);
			},
			success: function(data) {
				// console.log(data);
				/*ls.selectedLocation.name = data.d.NAME;
				ls.selectedLocation.id = id;
				ls.selectedLocation.additionalAddress = data.d.AADDRESS;
				ls.selectedLocation.address.street = data.d.STREET;
				ls.selectedLocation.address.city = data.d.CITY;
				ls.selectedLocation.address.postcode = data.d.POSTCODE;
				ls.selectedLocation.categoryIndex = data.d.CATEGORYID;*/
				ls.selectedLocation = {
					name: data.d.NAME,
					id: data.d.ID,
					address: {
						street: data.d.STREET,
						additionalAddress: data.d.AADDRESS,
						postcode: data.d.POSTCODE,
						city: data.d.CITY
					},
					partners: null,
					categoryIndex: data.d.CATEGORYID,
					waterDecision: {
						decisionCode: 0
					},
					paperDecision: {
						decisionCode: null
					}
				};
				console.log(ls.getSelectedLocation());
				$state.go('locations-detail', {
					tab: null
				});
			}
		});
	};

	ls.getSelectedLocation = function() {
		ls.selectedLocation.address.postcode =
			parseInt(ls.selectedLocation.address.postcode); // temporary work around!
		// we will face this problem later depending on how the backend field looks like
		return ls.selectedLocation;
	};

	ls.setAddress = function(address) {
		ls.oLocation.address = address;
		parseInt(ls.oLocation.address.postcode);
	};

	ls.convertGoogleAddressToObjectAddress = function(address_components) {

		if (address_components.length === 8) {
			address = {
				street: address_components[1].long_name + ' ' + address_components[0].long_name,
				additionalAddress: "",
				postcode: parseInt(address_components[7].long_name),
				city: address_components[3].long_name
			}
		} else if (address_components.length === 7) {
			address = {
				street: address_components[1].long_name + ' ' + address_components[0].long_name,
				additionalAddress: "",
				postcode: parseInt(address_components[6].long_name),
				city: address_components[3].long_name
			}
		} else if (address_components.length === 6) {
			address = {
				street: address_components[1].long_name + ' ' + address_components[0].long_name,
				additionalAddress: "",
				postcode: parseInt(address_components[5].long_name),
				city: address_components[2].long_name
			}
		} else {
			address = {
				error: "Google API convertion failed!"
			};
		}

		return address;
	}

	ls.getPaperDecision = function() {
		return ls.oLocation.paperDecision;
	}

	ls.setWaterDecision = function(dc, reasons) {
		ls.oLocation.waterDecision = {
			decisionCode: dc,
			reasons: reasons
		}
	}

	ls.getWaterDecision = function() {
		return ls.oLocation.waterDecision;
	}

	ls.addressToString = function() {
		if (ls.oLocation.address.additionalAddress) {
			return ls.oLocation.address.street + ' ' +
				ls.oLocation.address.additionalAddress + ' ' +
				ls.oLocation.address.postcode + ' ' +
				ls.oLocation.address.city;
		} else {
			return ls.oLocation.address.street + ' ' +
				ls.oLocation.address.postcode + ' ' +
				ls.oLocation.address.city;
		}
	};

});

/* ------------

   ------------ */

app.service('designService', function() {
	var ds = this;

	ds.tiles = [{
		src: "sources/img/beerjack.svg",
		name: "Kneipe"
	}, {
		src: "sources/img/music-player.svg",
		name: "Club"
	}, {
		src: "sources/img/tea-cup.svg",
		name: "Cafe"
	}, {
		src: "sources/img/restaurant.svg",
		name: "Restaurant"
	}, {
		src: "sources/img/shopping-cart.svg",
		name: "Geschäft"
	}, {
		src: "sources/img/question-mark.svg",
		name: "Andere"
	}];

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

app.service('contactService', function() {
	var cs = this;

	cs.contacts = [{
		id: 0,
		vorname: "Hans",
		name: "Peter",
		job: "Bauer",
		source: "sources/mock/ansprechpartnerBilder/bauer.jpg",
		address: {
			street: "Landstraße 1",
			postCode: "55112",
			city: "Frankfurt"
		},
		email: "hans.peter@bauernhof.de",
		telefon: "016376338911"
	}, {
		id: 1,
		vorname: "Guido",
		name: "Hip",
		job: "Barkeeper",
		source: "sources/mock/ansprechpartnerBilder/hipster.jpg",
		address: {
			street: "Schloßstraße 763",
			postCode: "11123",
			city: "Berlin"
		},
		email: "gh@gmx.de",
		telefon: "015156123901"
	}, {
		id: 2,
		vorname: "Hubert",
		name: "Schmitz",
		job: "Filialleiter EDEKA",
		source: "sources/mock/ansprechpartnerBilder/filialleiter.jpg",
		address: {
			street: "Kaiserstraße 6",
			postCode: "76133",
			city: "Karlsruhe"
		},
		email: "hubert.schmitz@edeka.de",
		telefon: "017233351321"
	}];

	cs.addNewContact = function(contact) {
		cs.contacts.push(contact);
	}

	cs.getAllContacts = function() {
		return cs.contacts;
	};

	cs.clearSelectedContact = function() {
		cs.selectedContact = {};
	}

	cs.getAllPossibleContactsForSelectedLocation = function(location) {
		var possiblePartners = [];
		for (var i = 0; i < cs.contacts.length; i++) {
			contactId = cs.contacts[i].id;
			// jQuery.inArray returns index of value in array
			// Returns -1 if array does not contain value.
			if ($.inArray(contactId, location.partners) == -1) {
				possiblePartners.push(cs.contacts[i]);
			}
		}
		return possiblePartners;
	}

	cs.setSelectedContact = function(id) {
		cs.selectedContact = cs.contacts[id];
	};

	cs.selectedContact;

	cs.getSelectedContact = function() {
		return cs.selectedContact;
	};
});

app.service('progressService', function($state) {
	var ps = this;
	ps.getCurrentState = function() {
		return $state.current.name;
	};

	ps.getProgressAtState = function(state) {};
});