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

  ls.setAddress = function(address) {
    ls.oLocation.address = address
  };

  ls.convertGoogleAddressToObjectAddress = function(address_components) {
    if (address_components.length === 8) {
      address = {
        address: address_components[1].long_name + ' ' + address_components[0].long_name,
        address2: "",
        postcode: address_components[7].long_name,
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
    if (ls.oLocation.address.address2) {
      return ls.oLocation.address.address + ' ' +
        ls.oLocation.address.address2 + ' ' +
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
      name: ""
    },
    {
      src: "sources/img/music-player.svg",
      name: ""
    },
    {
      src: "sources/img/tea-cup.svg",
      name: ""
    },
    {
      src: "sources/img/restaurant.svg",
      name: ""
    },
    {
      src: "sources/img/shopping-cart.svg",
      name: ""
    },
    {
      src: "sources/img/question-mark.svg",
      name: ""
    }
  ];

  ds.getTiles = function() {
    return ds.tiles;
  };

  ds.getCategoryIconSourceForIndex = function(index) {
    return ds.tiles[index].src;
  };
});

app.service('progressService', function($state) {
  var ps = this;
  ps.getCurrentState = function() {
    return $state.current.name;
  };

  ps.getProgressAtState = function (state) {
    console.log("progress changed! from: " + state.name);
  };
});
