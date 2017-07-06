function openCity(evt, cityName) {
	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}

/*function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    document.getElementById(cityName).style.display = "block";  
}*/

// to hide parts of the page with jQuery
$(document).ready(function() {
	$.mobile.loading().hide();

	$("#Tabs").on("swiperight", function() {
		$(this).hide();
		$("#MeintestDu").show();
	});
	
	$("#Tabs").hide();

	$("#AdresseHinzufügen").click(function() {
		$("#Tabs").show();
		$("#Typ").show();
		$("#MeintestDu").hide();
		$("#Adresse").hide();
		$("#Produkte").hide();
		$("#Fertig").hide();
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#4D759A";
		document.getElementById("ProdukteTab").style.backgroundColor = "#4D759A";
		document.getElementById("FertigTab").style.backgroundColor = "#4D759A";
	});

	$("#TypTab").click(function() {
		$("#Typ").show();
		document.getElementById("TypTab").style.backgroundColor = "#4D759A";
		document.getElementById("AdresseTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#6fa8dc";
	});

	$("#typ1").click(function() {
		$("#Typ").hide();
		$("#Adresse").show();
		$("#adressetab1").show();
		$("#adressetab2").hide();
		$("#beerAdresseTab").show();
		$("#restaurantAdresseTab").hide();
		$("#musicAdresseTab").hide();
		$("#teaAdresseTab").hide();
		$("#kioskAdresseTab").hide();
		$("#otherAdresseTab").hide();
		
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#93bee5";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#6fa8dc";
	});
	$("#typ2").click(function() {
		$("#Typ").hide();
		$("#Adresse").show();
		$("#adressetab1").show();
		$("#adressetab2").hide();
		$("#beerAdresseTab").hide();
		$("#restaurantAdresseTab").hide();
		$("#musicAdresseTab").show();
		$("#teaAdresseTab").hide();
		$("#kioskAdresseTab").hide();
		$("#otherAdresseTab").hide();
		
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#93bee5";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#6fa8dc";
	});
	$("#typ3").click(function() {
		$("#Typ").hide();
		$("#Adresse").show();
		$("#adressetab1").show();
		$("#adressetab2").hide();
		$("#beerAdresseTab").hide();
		$("#restaurantAdresseTab").show();
		$("#musicAdresseTab").hide();
		$("#teaAdresseTab").hide();
		$("#kioskAdresseTab").hide();
		$("#otherAdresseTab").hide();
		
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#93bee5";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#6fa8dc";
	});
	$("#typ4").click(function() {
		$("#Typ").hide();
		$("#Adresse").show();
		$("#adressetab1").show();
		$("#adressetab2").hide();
		$("#beerAdresseTab").hide();
		$("#restaurantAdresseTab").hide();
		$("#musicAdresseTab").hide();
		$("#teaAdresseTab").show();
		$("#kioskAdresseTab").hide();
		$("#otherAdresseTab").hide();
		
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#93bee5";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#6fa8dc";
	});
	$("#typ5").click(function() {
		$("#Typ").hide();
		$("#Adresse").show();
		$("#adressetab1").show();
		$("#adressetab2").hide();
		$("#beerAdresseTab").hide();
		$("#restaurantAdresseTab").hide();
		$("#musicAdresseTab").hide();
		$("#teaAdresseTab").hide();
		$("#kioskAdresseTab").show();
		$("#otherAdresseTab").hide();
		
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#93bee5";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#6fa8dc";
	});
	$("#typ6").click(function() {
		$("#Typ").hide();
		$("#Adresse").show();
		$("#adressetab1").show();
		$("#adressetab2").hide();
		$("#beerAdresseTab").hide();
		$("#restaurantAdresseTab").hide();
		$("#musicAdresseTab").hide();
		$("#teaAdresseTab").hide();
		$("#kioskAdresseTab").hide();
		$("#otherAdresseTab").show();
		
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#93bee5";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#6fa8dc";
	});

	$("#AdresseTab").click(function() {
		$("#adressetab1").show();
		$("#adressetab2").hide();
		$("#beerAdresseTab").show();
		$("#restaurantAdresseTab").hide();
		$("#musicAdresseTab").hide();
		$("#teaAdresseTab").hide();
		$("#kioskAdresseTab").hide();
		$("#otherAdresseTab").hide();
		
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#93bee5";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#6fa8dc";
	});

	$("#manuell").click(function() {
		$("#adressetab2").show();
		$("#adressetab1").hide();
	});

	$("#weiterAdresse").click(function() {
		$("#Adresse").hide();
		$("#Produkte").show();
		$("#produktetab1").show();
		$("#produktetab3").hide();
		$("#produktetab2").hide();
		$("#produktetab4").hide();
		$("#produktetab5").hide();
		$("#produktetab6").hide();
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("ProdukteTab").style.backgroundColor = "#93bee5";
		document.getElementById("FertigTab").style.backgroundColor = "#6fa8dc";
	});

	$("#ProdukteTab").click(function() {
		$("#produktetab1").show();
		$("#produktetab2").hide();
		$("#produktetab3").hide();
		$("#produktetab4").hide();
		$("#produktetab5").hide();
		$("#produktetab6").hide();
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("ProdukteTab").style.backgroundColor = "#93bee5";
		document.getElementById("FertigTab").style.backgroundColor = "#6fa8dc";
	});

	$("#vorhandenWasser").click(function() {
		$("#produktetab4").show();
		$("#produktetab2").hide();
		$("#produktetab3").hide();
		$("#produktetab1").hide();
		$("#produktetab5").hide();
		$("#produktetab6").hide();
	});

	$("#InteresseWasser").click(function() {
		$("#produktetab3").show();
		$("#produktetab2").hide();
		$("#produktetab4").hide();
		$("#produktetab1").hide();
		$("#produktetab5").hide();
		$("#produktetab6").hide();
	});

	$("#keinInteresseWasser").click(function() {
		$("#produktetab2").show();
		$("#produktetab3").hide();
		$("#produktetab4").hide();
		$("#produktetab1").hide();
		$("#produktetab5").hide();
		$("#produktetab6").hide();
	});

	$("#weiterKeinInteresseWasser").click(function() {
		$("#produktetab4").show();
		$("#produktetab3").hide();
		$("#produktetab2").hide();
		$("#produktetab1").hide();
		$("#produktetab5").hide();
		$("#produktetab6").hide();
	});

	$("#VcAMitarbeiterSchicken1").click(function() {
		$("#produktetab4").show();
		$("#produktetab3").hide();
		$("#produktetab2").hide();
		$("#produktetab1").hide();
		$("#produktetab5").hide();
		$("#produktetab6").hide();
	});

	$("#vorhandenKloP").click(function() {
		$("#Produkte").hide();
		$("#Fertig").show();
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#93bee5";
	});

	$("#InteresseKloP").click(function() {
		$("#produktetab6").show();
		$("#produktetab2").hide();
		$("#produktetab4").hide();
		$("#produktetab1").hide();
		$("#produktetab5").hide();
		$("#produktetab3").hide();
	});

	$("#keinInteresseKloP").click(function() {
		$("#produktetab5").show();
		$("#produktetab3").hide();
		$("#produktetab4").hide();
		$("#produktetab1").hide();
		$("#produktetab2").hide();
		$("#produktetab6").hide();
	});

	$("#weiterKeinInteresseKloP").click(function() {
		$("#Produkte").hide();
		$("#Fertig").show();
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#93bee5";
	});

	$("#VcAMitarbeiterSchicken2").click(function() {
		$("#Produkte").hide();
		$("#Fertig").show();
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#93bee5";
	});

	$("#FertigTab").click(function() {
		$("#Fertig").show();
		document.getElementById("TypTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("AdresseTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("ProdukteTab").style.backgroundColor = "#6fa8dc";
		document.getElementById("FertigTab").style.backgroundColor = "#93bee5";
	});

});