angular.module('udream', ['ngRoute','ngSanitize', 'ngStorage','firebase','ngCordova'])

.controller('playHomeCtrl', function($scope,$http,$localStorage,$timeout,$rootScope,$firebaseArray,$cordovaGeolocation) {

	var map;//Normal google map
  var panorama;//Virtual reality view
	var flag = {url: 'img/flag2.png',};//En icon
	var imageWalking = {url: 'img/myrobot.gif'};
	var image = {url: 'img/cofre_cerrado1.png'};
	var cofreOpened = {url: 'img/cofre_abierto1.png'}
	var imageInfo = {url: 'img/info-fly.gif'};
	var imageSugerencias = {url: 'img/bombilla.gif'};
	var imageExplosion = {url: 'img/explosion1.gif'};
	var ultimaPosicionUsuario;
	var posicionActual;
	var markers = [];
	var objCofre = function(tipo_pista,description, lat, lon, pos) {
			this.tipo_pista = tipo_pista;
			this.description = description;
			this.lat = lat;
			this.lon = lon;
			this.pos = pos
	};
	var database = firebase.database();
	//End database

	//Get my Game object(latitud,longitud)
	$scope.miAventura = JSON.parse(localStorage.getItem("aventura_virtual"));
	initMap();

	$scope.back = function(){
		window.location = "main.html";
	}

	//Get all cofres from databease using ID for the game
	//var cofres = $firebaseArray(database.ref('realidadVirtual').child($scope.miAventura.$id).child('pistas'));
	//Wait to load all data from database
	/*cofres.$loaded(function() {
		$scope.myCofres = cofres;
		console.log("PREMIOS",$scope.myCofres);
		initMap();
	});*/


      function initMap() {
        var city = {lat: parseFloat($scope.miAventura.latitud), lng: parseFloat($scope.miAventura.longitud)};
        var sv = new google.maps.StreetViewService();

        panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

        // Set up the map.
        map = new google.maps.Map(document.getElementById('map'), {
          center: city,
          zoom: 16,
          streetViewControl: false
        });

        // Set the initial Street View camera to the center of the map
        sv.getPanorama({location: city, radius: 50}, processSVData);
        // Look for a nearby Street View panorama when the map is clicked.
        // getPanoramaByLocation will return the nearest pano when the
        // given radius is 50 meters or less.
        map.addListener('click', function(event) {
          sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
        });

      }

      function processSVData(data, status) {
        if (status === 'OK') {
          var marker = new google.maps.Marker({
            position: data.location.latLng,
            map: map,
						icon: flag,
            title: data.location.description
          });

          panorama.setPano(data.location.pano);
          panorama.setPov({
            heading: 270,
            pitch: 0
          });
          panorama.setVisible(true);
					//setCofres(panorama,$scope.myCofres);
					//setPremio(panorama,$scope.miAventura);

					var premios = database.ref('realidadVirtual').child($scope.miAventura.$id).child('pistas');
					//Listener para las pistas de un juego o premio
					var pos = 0;
					premios.on("child_added", function(snapshot) {
							var item = new objCofre(snapshot.val().tipo_pista,snapshot.val().description_pista, parseFloat(snapshot.val().latitud_pista),
									parseFloat(snapshot.val().longitud_pista), pos);
									pos++;
							if(snapshot.val().tipo_pista === "cofre"){
								setCofres(panorama, item);
							}else if(snapshot.val().tipo_pista === "sugerencias"){
								setSugerencias(panorama,item);
							}else{
								setInfo(panorama, item);
							}
					});

          marker.addListener('click', function() {
            var markerPanoID = data.location.pano;
            // Set the Pano to use the passed panoID.
            panorama.setPano(markerPanoID);
            panorama.setPov({
              heading: 270,
              pitch: 0
            });
            panorama.setVisible(true);
          });
        } else {
          console.error('Street View data not found for this location.');
        }
      }

			function setCofres(map, cofre) {

							var marker = new google.maps.Marker({
									position: {
											lat: parseFloat(cofre.lat),
											lng: parseFloat(cofre.lon)
									},
									map: map,
									icon: image,
									title: cofre.description,
									zIndex: cofre.pos,
									optimized: false
							});

							var contentString = cofre.description;
							var infowindow = new google.maps.InfoWindow({
									content: contentString,
									maxWidth: 200
							});
							markers.push(marker);
							marker.addListener('click', function() {
								var pos = findMarker(marker,cofre);
							});
			}


			// Sets the map on all markers in the array.
	 function setMapOnAll(map) {
		 for (var i = 0; i < markers.length; i++) {
			 markers[i].setMap(map);
		 }
	 }

			// Removes the markers from the map, but keeps them in the array.
		function clearMarkers() {
			setMapOnAll(null);
		}

			// Deletes all markers in the array by removing references to them.
		function deleteMarkers() {
			clearMarkers();
			markers = [];
		}

		//Buscar premio por KEY
function findMarker(marker,cofre){
var pos = -1;
var i = 0;
var esta = false;

while((!esta)&&(i<markers.length)){

	if(markers[i].zIndex===marker.zIndex){
		esta = true;
		pos = i;
		markers[i].setMap(null);
		markers.splice(pos,1);
		addExplosion(cofre);
	}
	else{
		i++;
	}
}
//alert("markers.length "+markers.length);
return pos;
}

//explosion when you open a COFRE for 1second
function addExplosion(cofre){
var explosion = new google.maps.Marker({
	position: {
			lat: parseFloat(cofre.lat),
			lng: parseFloat(cofre.lon)
	},
		map: panorama,
		icon: imageExplosion,
		optimized: false
});
$timeout(function() {
	explosion.setMap(null);
	addMarker(cofre);
	}, 1000);
}
//END explosion

function addMarker(cofre) {
var marker = new google.maps.Marker({
		position: {
				lat: parseFloat(cofre.lat),
				lng: parseFloat(cofre.lon)
		},
		map: panorama,
		icon: cofreOpened,
		title: cofre.description,
		zIndex: cofre.pos,
		optimized: false
});
markers.push(marker);

var contentString = cofre.description;
var infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 200
});
//marker.setAnimation(google.maps.Animation.DROP);//Drop the icon to the map
infowindow.open(panorama, marker);
marker.addListener('click', function() {
	infowindow.open(panorama, marker);
});
}

			//Set point of info in the map
			function setInfo(map, cofre) {

				var imagen = {
						url: 'img/'+cofre.tipo_pista+'.gif'
				};

							var marker = new google.maps.Marker({
									position: {
											lat: parseFloat(cofre.lat),
											lng: parseFloat(cofre.lon)
									},
									map: map,
									icon: imagen,
									title: cofre.description,
									zIndex: cofre.pos,
									optimized: false
							});

							var contentString = cofre.description;
							var infowindow = new google.maps.InfoWindow({
									content: contentString,
									maxWidth: 200
							});

							//infowindow.open(map, marker);
							marker.addListener('click', function() {
									infowindow.open(map, marker);
							});
			}

			function setSugerencias(map, cofre) {

							var marker = new google.maps.Marker({
									position: {
											lat: parseFloat(cofre.lat),
											lng: parseFloat(cofre.lon)
									},
									map: map,
									icon: imageSugerencias,
									title: cofre.description,
									zIndex: cofre.pos,
									optimized: false
							});

							var contentString = cofre.description;
							var infowindow = new google.maps.InfoWindow({
									content: contentString,
									maxWidth: 200
							});
							allMarkers.push(marker);
						//  infowindow.open(map, marker);
						marker.setAnimation(google.maps.Animation.DROP);//Drop the icon to the map
							marker.addListener('click', function() {
									infowindow.open(map, marker);
							});
			}
			//End point of Info



})
