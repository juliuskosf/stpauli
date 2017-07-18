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
