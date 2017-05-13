angular.module('udream', ['ionic','ngRoute', 'ngSanitize', 'ngStorage', 'firebase', 'ngCordova'])

/*.run(function($ionicPlatform,$cordovaNativeAudio) {


  $ionicPlatform.ready(function() {
    $cordovaNativeAudio.loop('img/explosion.mp3')


    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})*/

    .controller('promotionCtrl', function($scope, $http, $localStorage, $timeout, $rootScope, $firebaseArray) {

        $scope.city = localStorage.getItem("city");
        $scope.prov = localStorage.getItem("prov");

        $scope.promo = [];
        $scope.premios = [];
        var database = firebase.database();
        var referencia = database.ref('promociones');
        $firebaseArray(referencia);

        var obj = function(key, val) {
            this.key = key;
            this.val = val;
        };

        referencia.on("child_added", function(snapshot) {
            $scope.promo.push(snapshot.val());
            console.log(snapshot.val());
        });

        var database = firebase.database();
        var premios = database.ref('realidadVirtual');
        $firebaseArray(premios);

        premios.on("child_added", function(snapshot) {
            console.log("El premio actual es ", snapshot.val());
            //$scope.premios.push(snapshot.val());

            var item = new obj(snapshot.key, snapshot.val());
            $scope.premios.push(item);
        });


        $scope.sendPromotion = function() {
            // A post entry.
            var postData = {
                city: $scope.city,
                company: $scope.company,
                description: $scope.description,
                price_discount: $scope.price_discount,
                price_before: $scope.price_before,
                url_image: $scope.url_image,
                phone: $("#phone_number").val(),
                dates_range: $("#id-date-range-picker-1").val(),
                time: $("#timepicker1").val(),
                date: new Date().getTime()
            };

            var database = firebase.database();
            var ref = database.ref('promociones');
            ref.push(postData);

            ref.on("child_added", function(snapshot) {
                console.log("El juego actual es ", snapshot.val());
                //	console.log("El id actual es ", snapshot.key());
            });
        }

        $scope.seeOffer = function(offer) {
            localStorage.setItem("offer", JSON.stringify(offer));
        }

        $scope.verAventuraVirtual = function(aventura_virtual) {
            console.log("aventura_virtual", aventura_virtual);
            localStorage.setItem("aventura_virtual", JSON.stringify(aventura_virtual));
        }

    })

    .controller('myofferCtrl', function($scope, $http, $localStorage, $timeout, $rootScope, $firebaseArray) {
        $scope.myoffer = JSON.parse(localStorage.getItem("offer"));
        console.log("MY OFFER", $scope.myoffer);
    })


    .controller('miAventuraVirtualCtrl', function($scope, $http, $localStorage, $timeout, $rootScope, $firebaseArray, $firebaseArray, $cordovaGeolocation) {

        //VARIABLES
				var allMarkers = [];
        var map;
        var markerPosition;
        var imageWalking = {
            url: 'img/myrobot.gif'
        };
        var image = {
            url: 'img/cofre_cerrado1.png'
        };
        var cofreOpened = {
            url: 'img/cofre_abierto1.png'
        }
        var imageInfo = {
            url: 'img/info-fly.gif'
        };
        var imageSugerencias = {
            url: 'img/bombilla.gif'
        };
        var imageExplosion = {
            url: 'img/explosion1.gif'
        };

        var ultimaPosicionUsuario;
        var posicionActual;
        var registrandoPosicion = false;
        var idRegistroPosicion;
        var database = firebase.database();
        $scope.miAventura = JSON.parse(localStorage.getItem("aventura_virtual"));

        $scope.back = function(){
          window.location = "main.html";
        }
        /*var pist = $firebaseArray(database.ref('realidadVirtual').child($scope.miAventura.$id).child('pistas'));
        var pistas;
        pist.$loaded(function() {
            pistas = pist;
						initMap(51.4666889,-0.0576778);
        });*/
        //End variables
				//initMap(51.4666889,-0.0576778);


				var cofres = [];
        var markers = [];
        var objCofre = function(tipo_pista,valor_premio,titulo_pista,description,
          imagen_pista,address_pista,phone_pista,email_pista,boton_pista ,lat, lon, pos) {
            this.tipo_pista = tipo_pista;
            this.valor_premio = valor_premio;
            this.titulo_pista = titulo_pista;
            this.description = description;
            this.imagen_pista = imagen_pista;
            this.address_pista = address_pista;
            this.phone_pista = phone_pista;
            this.email_pista = email_pista;
            this.boton_pista = boton_pista;
            this.lat = lat;
            this.lon = lon;
            this.pos = pos
        };

        //GET CURRENT POSITION
        //maximumAge, nos sirve para indicar el tiempo (en milisegundos) entre cada medición
        var posOptions = {timeout: 10000,enableHighAccuracy: true,maximumAge: 3000};
        $cordovaGeolocation.getCurrentPosition(posOptions)
            .then(function(position) {

                lat = position.coords.latitude;
                long = position.coords.longitude;
                ultimaPosicionUsuario = new google.maps.LatLng(lat, long);
                initMap(lat, long);

            }, function(err) {}); //END CURRENT POSITION

        var watchOptions = {
            timeout: 9000,
            enableHighAccuracy: true, // may cause errors if true
            maximumAge: 10000
        };

        //Registrar position
        function registrarPosicion() {
            if (registrandoPosicion) {
                registrandoPosicion = false;
                idRegistroPosicion.clearWatch();
                limpiarUbicacion();
            } else {
                idRegistroPosicion = $cordovaGeolocation.watchPosition(watchOptions);
                idRegistroPosicion.then(
                    null,
                    function(err) {
                        //Error
                    },
                    function(position) {
                        exitoRegistroPosicion(position);
                    });
            }
        }
        //End registrar position

        function exitoRegistroPosicion(position) {

            if (!registrandoPosicion) {
                // Es la primera vez
                registrandoPosicion = true;
                ultimaPosicionUsuario = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                markerPosition = new google.maps.Marker({
                    position: ultimaPosicionUsuario,
                    map: map,
                    icon: imageWalking,
                    optimized: false
                });
            } else {
                var posicionActual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var dist = google.maps.geometry.spherical.computeDistanceBetween(posicionActual, ultimaPosicionUsuario);
                if (dist > 1) { // Metros
                    ultimaPosicionUsuario = posicionActual;
                    markerPosition.setPosition(posicionActual);
                } else {

                }
            }
            map.panTo(ultimaPosicionUsuario);

        }


        //INIT THE MAP VIEW
        function initMap(lat, long) {

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 18,
                //disableDefaultUI: true,
                rotateControl: true,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_RIGHT
                },
                minZoom:18,
                scaleControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                gestureHandling: 'none',
                center: {
                    lat: parseFloat(lat),
                    lng: parseFloat(long)
                },
                styles: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#333739"
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2ecc71"
                    }]
                }, {
                    "featureType": "poi",
                    "stylers": [{
                        "color": "#2ecc71"
                    }, {
                        "lightness": -7
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2ecc71"
                    }, {
                        "lightness": -28
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2ecc71"
                    }, {
                        "visibility": "on"
                    }, {
                        "lightness": -15
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2ecc71"
                    }, {
                        "lightness": -18
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2ecc71"
                    }, {
                        "lightness": -34
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#333739"
                    }, {
                        "weight": 0.8
                    }]
                }, {
                    "featureType": "poi.park",
                    "stylers": [{
                        "color": "#2ecc71"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#333739"
                    }, {
                        "weight": 0.3
                    }, {
                        "lightness": 10
                    }]
                }]
            });
						//setCofres(map, pistas);
            //setPosition(map,lat,long);
						registrarPosicion();
						var premios = database.ref('realidadVirtual').child($scope.miAventura.$id).child('pistas');
            //Listener para las pistas de un juego o premio
            var pos = 0;
            premios.on("child_added", function(snapshot) {
                var item = new objCofre(snapshot.val().tipo_pista,snapshot.val().valor_premio,snapshot.val().titulo_pista,snapshot.val().description_pista,
                snapshot.val().imagen_pista,snapshot.val().address_pista,snapshot.val().phone_pista,snapshot.val().email_pista,
                snapshot.val().boton_pista,parseFloat(snapshot.val().latitud_pista),
                    parseFloat(snapshot.val().longitud_pista), pos);
                    pos++;

                  console.log(snapshot.val());
               if((snapshot.val().tipo_pista === "cofre")||(snapshot.val().tipo_pista === "premio")){
                  setCofres(map, item);
                }else if(snapshot.val().tipo_pista === "sugerencias"){
                  setSugerencias(map,item);
                }else{
                  setInfo(map, item);
                }
            });

        }
        //End map

        //Set current location
        function setPosition(map, lat, long) {
            markerPosition = new google.maps.Marker({
                position: {
                    lat: parseFloat(lat),
                    lng: parseFloat(long)
                },
                map: map,
                icon: imageWalking,
                optimized: false
            });

        } //End current location

        //se encarga de deshacernos de cualquier rastro de la actividad del usuario, vaciando el marcador y la posición del usuario
        function limpiarUbicacion() {
            ultimaPosicionUsuario = new google.maps.LatLng(0, 0);
            if (markerPosition) {
                markerPosition.setMap(null);
                markerPosition = null;
            }

            deleteMarkers();

        } //End limpiar ubicacion

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
                    //alert("COFRE CLICKED "+marker.zIndex);
                    var dist = google.maps.geometry.spherical.computeDistanceBetween(marker.position, ultimaPosicionUsuario);
                    if(dist>15){
                      var distancia = Math.round(dist);
                      $.gritter.add({
                        title: 'Cofres sorpresa',
                        text: 'Este cofre esta demasiado lejos, a '+distancia+' metros .Acercate para abrirlo',
                        image: 'img/cofre_cerrado1.png',
                        sticky: false,
                        time: '',
                        class_name: ('gritter-light')
                      });

                    }else{
                    var pos = findMarker(marker,cofre);
                  }
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
      map: map,
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
      map: map,
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

  var texto;
  if(cofre.tipo_pista === "cofre"){
  texto = $.gritter.add({
    text:  getContentCofre(cofre),
    sticky: true,
    time: '',
    class_name: ('gritter-info')
  });
}else{

  /*$('.gritter-notice-wrapper').css({'position' : 'absolute','top':'119px','width':'100%','padding':'0px 25px','right':'inherit'});
  texto = $.gritter.add({
    text: getContentPremio(cofre),
    sticky: true,
    time: '',
    class_name: ('gritter-info')
  });*/
  texto = $.gritter.add({
    text:  getContentNewPremio(cofre),
    sticky: true,
    time: '',
    class_name: ('gritter-info')
  });
  $('.gritter-item-wrapper.gritter-info').css({'background' : 'none','box-shadow':'none'});

}

  //marker.setAnimation(google.maps.Animation.DROP);//Drop the icon to the map
  //infowindow.open(map, marker);
  marker.addListener('click', function() {
    //infowindow.open(map, marker);
    if(cofre.tipo_pista === "cofre"){
    texto = $.gritter.add({
      text:  getContentCofre(cofre),
      sticky: true,
      time: '',
      class_name: ('gritter-info')
    });
  }else{
    /*texto = $.gritter.add({
      text: getContentPremio(cofre),
      sticky: true,
      time: '',
      class_name: ('gritter-info')
    });*/
    texto = $.gritter.add({
      text:  getContentNewPremio(cofre),
      sticky: true,
      time: '',
      class_name: ('gritter-info')
    });
    $('.gritter-item-wrapper.gritter-info').css({'background' : 'none','box-shadow':'none'});

  }
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



                var contentString = '<div id="iw-container">' +
                    '<div class="iw-title">Porcelain Factory of Vista Alegre</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">History</div>' +
                      '<img src="http://cdn2.hubspot.net/hub/1995901/file-4125735603-jpg/blog-files/cruc-blog-ronda_grande.jpg"  height="83" width="83">' +
                      '<p>Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become "the first example of free enterprise" in Portugal.</p>' +
                      '<div class="iw-subTitle">Contacts</div>' +
                      '<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>'+
                      '<br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>'+
                    '</div>' +
                    '<div class="iw-bottom-gradient"></div>' +
                  '</div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 350
                });
								allMarkers.push(marker);
                //infowindow.open(map, marker);
                marker.addListener('click', function() {
                    //infowindow.open(map, marker);
                    $.gritter.add({
                      text:  '<div id="iw-container">' +
                          '<div class="iw-title">'+cofre.titulo_pista +'</div>'+
                          '<div class="iw-content">' +
                            '<div class="iw-subTitle">información</div>' +
                            '<img src="'+cofre.imagen_pista+'"  height="83" width="83">' +
                            '<p>'+cofre.description+'</p>' +
                            '<div class="iw-subTitle">Contacto</div>' +
                            '<p>'+cofre.address_pista+'<br>'+
                            '<br>'+cofre.phone_pista+'<br>'+cofre.email_pista+'</p>'+
                          '</div>' +
                        '</div>',
                      sticky: true,
                      time: '',
                      class_name: ('gritter-light')
                    });

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

    .controller('miAventuraVirtualCtrl2', function($scope, $http, $localStorage, $timeout, $rootScope, $firebaseArray, $firebaseArray, $cordovaGeolocation) {

        var map;
        var markerPosition;
        var imageWalking = {
            //url: 'img/icon-walking.gif'
            url: 'img/sony_running.gif'
        };
        var cofres = [];
        var objCofre = function(description, lat, lon, pos) {
            this.description = description;
            this.lat = lat;
            this.lon = lon;
            this.pos = pos
        };
        var database = firebase.database();

        $scope.buttonPressed = true;
        $scope.miAventura = JSON.parse(localStorage.getItem("aventura_virtual"));
        console.log("MI AVENTURA", $scope.miAventura);
        //initMap(51.4665977,-0.058205);
        var lat;
        var long;
        var myLocation = "";
        var geocoder = new google.maps.Geocoder();
        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: true,
            maximumAge: 3000
        };

        function updatePosition(marker) {
            $cordovaGeolocation.getCurrentPosition(posOptions)
                .then(function(position) {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                    marker.setMap(null);
                    setMarkers(map, lat, long);

                }, function(err) {

                });
        }

        setInterval(function() {
            updatePosition(markerPosition);
            console.log("UPADATE_POSITION")
        }, 3000);


        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;

                if ($scope.miAventura.typeGame === "GeoStreetView") {
                    initialize();
                } else {
                    initMap(lat, long);
                }

                var LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                //showLocation(LatLng);
                reverseGeocode(LatLng);
                //console.log("position",lat);
                //alert(lat);
            }, function(err) {
                // error
                //console.log("ERROR");
                //alert("ERROR");
            });

        function showLocation(LatLng) {
            geocoder.geocode({
                'latLng': LatLng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    myLocation = results[0].formatted_address;
                    alert(myLocation);
                }
            })
        }

        function reverseGeocode(latlng) {
            geocoder.geocode({
                'latLng': latlng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var level_1;
                    var level_2;
                    for (var x = 0, length_1 = results.length; x < length_1; x++) {
                        for (var y = 0, length_2 = results[x].address_components.length; y < length_2; y++) {
                            var type = results[x].address_components[y].types[0];
                            if (type === "administrative_area_level_1") {
                                level_1 = results[x].address_components[y].long_name;
                                if (level_2) break;
                            } else if (type === "locality") {
                                level_2 = results[x].address_components[y].long_name;
                                if (level_1) break;
                            }
                        }
                    }
                    updateAddress(level_2, level_1);
                }
            });
        }

        function updateAddress(city, prov) {
            //alert(city);
            //alert(prov);
            // do what you want with the address here
        }


        // Data for the markers consisting of a name, a LatLng and a zIndex for the
        // order in which these markers should display on top of each other.
        var beaches = [
            ['Bondi Beach', parseFloat($scope.miAventura.latitud), parseFloat($scope.miAventura.longitud), 4],
            ['Coogee Beach', 36.430219, -5.1518064, 5],
            ['Cronulla Beach', 36.430219, -5.1518064, 3],
            ['Manly Beach', 36.429930, -5.148105, 2],
            ['Maroubra Beach', 36.430564, -5.146795, 1]
        ];

        var info = [
            ['info1', 36.430819, -5.148105, 6]
        ];

        // The following example creates complex markers to indicate beaches near
        // Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
        // to the base of the flagpole.

        var panorama;

        function initialize() {
            panorama = new google.maps.StreetViewPanorama(
                document.getElementById('map'), {
                    position: {
                        lat: parseFloat(lat),
                        lng: parseFloat(long)
                    },
                    pov: {
                        heading: 165,
                        pitch: 0
                    },
                    zoom: 1
                });

            var premios = database.ref('realidadVirtual').child($scope.miAventura.$id).child('pistas');

            //Listener para las pistas de un juego o premio
            premios.on("child_added", function(snapshot) {

                var item = new objCofre(snapshot.val().description_pista, parseFloat(snapshot.val().latitud_pista),
                    parseFloat(snapshot.val().longitud_pista), 1);
                //cofres.push([snapshot.val().description_pista,parseFloat(snapshot.val().latitud_pista),
                //parseFloat(snapshot.val().longitud_pista),1]);
                setCofres(panorama, item);
            });

        }


        function initMap(lat, long) {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 18,
                disableDefaultUI: true,
                rotateControl: true,
                gestureHandling: 'none',

                //center: {lat: parseFloat($scope.miAventura.latitud), lng: parseFloat($scope.miAventura.longitud)},
                center: {
                    lat: parseFloat(lat),
                    lng: parseFloat(long)
                },
                //center: {lat: 51.4665977, lng: -0.058205},
                styles: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#333739"
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2ecc71"
                    }]
                }, {
                    "featureType": "poi",
                    "stylers": [{
                        "color": "#2ecc71"
                    }, {
                        "lightness": -7
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2ecc71"
                    }, {
                        "lightness": -28
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2ecc71"
                    }, {
                        "visibility": "on"
                    }, {
                        "lightness": -15
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2ecc71"
                    }, {
                        "lightness": -18
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2ecc71"
                    }, {
                        "lightness": -34
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#333739"
                    }, {
                        "weight": 0.8
                    }]
                }, {
                    "featureType": "poi.park",
                    "stylers": [{
                        "color": "#2ecc71"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#333739"
                    }, {
                        "weight": 0.3
                    }, {
                        "lightness": 10
                    }]
                }]

            });


            setMarkers(map, lat, long);
            //setMarkersInfo(map);

            var premios = database.ref('realidadVirtual').child($scope.miAventura.$id).child('pistas');

            //Listener para las pistas de un juego o premio
            premios.on("child_added", function(snapshot) {

                var item = new objCofre(snapshot.val().description_pista, parseFloat(snapshot.val().latitud_pista),
                    parseFloat(snapshot.val().longitud_pista), 1);
                //cofres.push([snapshot.val().description_pista,parseFloat(snapshot.val().latitud_pista),
                //parseFloat(snapshot.val().longitud_pista),1]);
                setCofres(map, item);

            });
        }

        //Listener para pistas borradas
        /*premios.on("child_added", function(snapshot){

        		var item = new objCofre(snapshot.val().description_pista,parseFloat(snapshot.val().latitud_pista),
        			parseFloat(snapshot.val().longitud_pista),1);
        		//cofres.push([snapshot.val().description_pista,parseFloat(snapshot.val().latitud_pista),
        		//parseFloat(snapshot.val().longitud_pista),1]);
        		setCofres(map,item);
        	});*/



        function setMarkersInfo(map) {

            var image = {
                url: 'img/info.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
            // Shapes define the clickable region of the icon. The type defines an HTML
            // <area> element 'poly' which traces out a polygon as a series of X,Y points.
            // The final coordinate closes the poly by connecting to the first coordinate.
            var shape = {
                coords: [1, 1, 1, 20, 18, 20, 18, 1],
                type: 'poly'
            };
            for (var i = 0; i < info.length; i++) {
                var beach = info[i];
                var marker = new google.maps.Marker({
                    position: {
                        lat: beach[1],
                        lng: beach[2]
                    },
                    map: map,
                    icon: image,
                    shape: shape,
                    title: beach[0],
                    zIndex: beach[3]
                });
            }
        }

        var image = {
            url: 'img/cofre_cerrado1.png'
        };

        function setCofres(map, cofre) {
            // Adds cofres to the map.
            var marker = new google.maps.Marker({
                position: {
                    lat: cofre.lat,
                    lng: cofre.lon
                },
                map: map,
                icon: image,
                title: cofre.description,
                zIndex: cofre.pos
            });

            var contentString = cofre.description;
            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 200
            });
            marker.addListener('click', function() {
                image.url = 'img/cofre_abierto1.png';
                marker.setMap(null);
                setCofres(map, cofre);
                infowindow.open(map, marker);
            });
        }



        //Set current location
        function setMarkers(map, lat, long) {

            /*var image = {
              url: 'img/cofre3D.png',
              size: new google.maps.Size(152, 125),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(0, 152)
            };*/

            /* var shape = {
               coords: [1, 1, 1, 20, 18, 20, 18, 1],
               type: 'poly'
             };*/

            //To see animated gifs you need to set optimized = false on your marker
            markerPosition = new google.maps.Marker({
                position: {
                    lat: parseFloat(lat),
                    lng: parseFloat(long)
                },
                map: map,
                icon: imageWalking,
                optimized: false
            });

            //marker.setAnimation(google.maps.Animation.DROP);//Drop the icon to the map
            //marker.setAnimation(google.maps.Animation.BOUNCE);//Animate the icon

        } //End current location

    })
