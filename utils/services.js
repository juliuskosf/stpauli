app.service('locationService', function() {
  var ls = this; // ls => locationService

  ls.oLocation = {}; // variable for persistence

  ls.getTextForInterestDecisionCode = function(dc) {
    var textForCode = ["Bereits Supporter", "Interesse", "Kein Intresse"];
    return textForCode[dc];
  }

  ls.setLocationName = function(newValue) {
    ls.oLocation.name = newValue;
  }
  ls.getLocationName = function() {
    return ls.oLocation.name;
  };

  ls.getCategoryIndex = function() {
    return ls.oLocation.categoryIndex;
  };

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
    },
    {
      id: 1,
      text: "Anderer Lieferant"
    },
    {
      id: 2,
      text: "Vorher nie gehört"
    },
    {
      id: 3,
      text: "Andere"
    }
    ];
  };

  ls.getNoInterestReasons = function() {
    return [{
        id: 0,
        text: "Zu teuer"
      },
      {
        id: 1,
        text: "Blöd"
      },
      {
        id: 3,
        text: "Andere"
      }
    ];
  };


  ls.locations = [{
      name: "Die Schenke",
      id: 0,
      address: {
        street: "Rathausplatz",
        additionalAddress: "2. Etage",
        postcode: "45219",
        city: "Essen"
      },
      categoryIndex: 0,
      // adapt to right format!!
      waterDecision: 1,
      paperDecision: 2
  },
  {
    name: "Henriks",
    id: 1,
    address: {
      street: "Tesdorpfstraße 6",
      additionalAddress: "",
      postcode: "23441",
      city: "Hamburg",
    },
    categoryIndex: 3,
    // s.o.
    waterDecision: 1,
    paperDecision: 2
  }];

  ls.getAllLocations = function() {
    return ls.locations;
  };

  ls.setSelectedLocation = function(id) {
    ls.selectedLocation = ls.locations[id];
  };

  ls.getSelectedLocation = function () {
    return ls.selectedLocation;
  };

  ls.setAddress = function(address) {
    ls.oLocation.address = address
  };

  ls.convertGoogleAddressToObjectAddress = function(address_components) {
    if (address_components.length === 8) {
      address = {
        address: address_components[1].long_name + ' ' + address_components[0].long_name,
        additionalAddress: "",
        postcode: parseInt(address_components[7].long_name),
        city: address_components[5].long_name
      }
    }
    return address;
  }

  ls.getPaperDecision = function() {
    return ls.oLocation.paperDecision;
  }

  ls.setWaterDecision = function (dc, reasons) {
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
      return ls.oLocation.address.address + ' ' +
        ls.oLocation.address.additionalAddress + ' ' +
        ls.oLocation.address.postcode + ' ' +
        ls.oLocation.address.city;
    } else {
      return ls.oLocation.address.address + ' ' +
        ls.oLocation.address.postcode + ' ' +
        ls.oLocation.address.city;
    }
  };

});

/* ------------

   ------------ */

app.service('designService', function() {
  var ds = this;

  ds.tiles = [
    {
      src: "sources/img/beerjack.svg",
      name: "Kneipe"
    },
    {
      src: "sources/img/music-player.svg",
      name: "Club"
    },
    {
      src: "sources/img/tea-cup.svg",
      name: "Cafe"
    },
    {
      src: "sources/img/restaurant.svg",
      name: "Restaurant"
    },
    {
      src: "sources/img/shopping-cart.svg",
      name: "Geschäft"
    },
    {
      src: "sources/img/question-mark.svg",
      name: "Andere"
    }
  ];

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

  cs.contacts = [
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  cs.getAllContacts = function() {
    return cs.contacts;
  };

  cs.clearSelectedContact = function() {
    cs.selectedContact = {};
  }

  cs.setSelectedContact = function (id) {
    cs.selectedContact = cs.contacts[id];
  };

  cs.selectedContact;

  cs.getSelectedContact = function () {
    return cs.selectedContact;
  };
});

app.service('progressService', function($state) {
  var ps = this;
  ps.getCurrentState = function() {
    return $state.current.name;
  };

  ps.getProgressAtState = function (state) {
  };
});
