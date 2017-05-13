angular.module('udream', ['ngRoute','ngSanitize', 'ngStorage','firebase','ngCordova'])

.controller('premiosCtrl', function($scope,$http,$localStorage,$timeout,$rootScope,$firebaseArray,$firebaseAuth,$cordovaGeolocation) {

	$scope.premios = [];
	var database = firebase.database();
	var premios = $firebaseArray(database.ref('realidadVirtual'));

	premios.$loaded(function() {
		$scope.premios = premios.reverse();
		console.log("PREMIOS",$scope.premios);
	});

	$scope.verAventuraVirtual = function(aventura_virtual){

		console.log("aventura_virtual",aventura_virtual.typeGame);
		localStorage.setItem("aventura_virtual",JSON.stringify(aventura_virtual));

		if(aventura_virtual.typeGame === "playAtHome"){
			window.location = "playAtHome.html";
		}else{
			window.location = "juegoVirtual2.html";
		}

	}

	/*var auth = $firebaseAuth();
	$scope.signOut = function(){
		auth.$signOut();
	}

	//Listens for changes to the client's authentication state
	auth.$onAuthStateChanged(function(firebaseUser) {
		if (firebaseUser) {
		console.log("Signed in as:", firebaseUser.email);
	} else {
		console.log("Signed out");
		window.location = "index.html";
	}
})*/
//End listener

//Geolocation Get current location: City and Prov or country
$scope.city = "Obteniendo ubicación";
$scope.prov = "...";
var lat;
var long;
var myLocation = "";
var geocoder = new google.maps.Geocoder();
var posOptions = {timeout: 10000, enableHighAccuracy: false};

$cordovaGeolocation.getCurrentPosition(posOptions)
	.then(function (position) {

		 var LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		 reverseGeocode(LatLng);

	}, function(err) {
		// error
	});

	function reverseGeocode(latlng){
geocoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
					var level_1;
					var level_2;
					for (var x = 0, length_1 = results.length; x < length_1; x++){
						for (var y = 0, length_2 = results[x].address_components.length; y < length_2; y++){
								var type = results[x].address_components[y].types[0];
									if ( type === "administrative_area_level_1") {
										level_1 = results[x].address_components[y].long_name;
										if (level_2) break;
									} else if (type === "locality"){
										level_2 = results[x].address_components[y].long_name;
										if (level_1) break;
									}
							}
					}
					updateAddress(level_2, level_1);
		 }
});
}

function updateAddress(city, prov){

// do what you want with the address here
$scope.city = city;
$scope.prov = prov;
localStorage.setItem("city",city);
localStorage.setItem("prov",prov);

}

/*$scope.premios.$watch(function(e) {
	console.log('Something changed');
	console.log(e);
});*/

$scope.citySelected = function(){
	console.log("MY CITY",$scope.myCity);
}


})
