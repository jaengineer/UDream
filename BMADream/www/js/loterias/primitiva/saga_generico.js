
	var d = new Date();
	var n = d.getTime();
	var chacheoServicioV3TS = localStorage.getItem('chacheoServicioV3TS');
	var chacheoServicioCabeceraCMSTS = localStorage.getItem('chacheoServicioCabeceraCMSTS');
	var chacheoPerfilAmpliadoTS = localStorage.getItem('chacheoPerfilAmpliadoTS');


$( document ).ready(function() {


	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#volver-arriba').fadeIn();
			} else {
				$('#volver-arriba').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#volver-arriba a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});



	if ((chacheoServicioV3TS!=null && chacheoServicioV3TS!='' ) || (chacheoServicioCabeceraCMSTS!=null && chacheoServicioCabeceraCMSTS!='' ) ){
		in_time_cacheo = parseInt(chacheoServicioV3TS);
		dateTS = new Date(in_time_cacheo);
		 datePlusOneHour =new Date(dateTS.setHours(dateTS.getHours()+1));

		 dateToday = new Date();


		 if (datePlusOneHour.getTime()<dateToday.getTime()) {

				 localStorage.clear();
		 }

	}


	   $('.vermas a').on('touchend', function(e) {
		      var el = $(this);
		      var link = el.attr('href');
		      window.location = link;
		   });


	//en segundos ;
	var tiempo_maximo_espera_session =  $("#tiempo_maximo_espera_session").val();



	contadorIniciarSession();

	reloadButtons();


	$.ajaxSetup({
		complete: function() {

			 primeraCargaLoadButtons=1;
			$(".velo").addClass("hidden");
 		$(".cargando").addClass("hidden");

 			reloadButtonsAjax();
 			reiniciarContadorSession();

 		if ($(".general_pop_up").length > 0){
 			  centrarVentanaEmergente();
 		}

 	}
		});

	if ( $(".item-mensajes").length ) {
		 var cadena = "<i class='notificaciones'>"+$(".notificaciones").html()+"</i>";
		 $(".item-mensajes").find(".item-submenu li:first").prepend(cadena);
		 $(".menu-users").prepend(cadena);
	}

	$('#idIniSesion').click(function(event){
		event.stopPropagation();
		event.preventDefault();
		$(".veloLogin").toggleClass("hidden");
		$(".cargandoLogin").toggleClass("hidden");
		$("#frmSesion").submit();
	});

	$('#b_aviso_session').click(function(event){
		location.reload();
	});

	$('.content').click(function(event){
		event.stopPropagation();
		acordeon();
		if ($(".listadoJuegos").is(":visible")) {
		  $(".listadoJuegos").toggleClass("oculta");
		}
		if ($(".item-list-users").is(":visible")) {
		  $(".item-list-users").toggleClass("oculta");
		}
	});

	$('.menuItem').mouseover(function() {
		console.log("DESPLEGAR MENU");
		$(this).addClass("active").find('div.desplegableMenu').removeClass('ocultaWeb');
	});
	$('.menuItem').mouseout(function(e) {
			console.log("DESPLEGAR MENU2");
		$(this).removeClass("active").find('div.desplegableMenu').addClass('ocultaWeb');
	});





	$( ".menu-users>a" ).click(function(e) {
		e.preventDefault();

		if (!$(".menu-users").hasClass("selected")) {
			$( ".menu-users" ).addClass("selected");
		} else {
			$( ".menu-users" ).removeClass("selected");
		}

		if($(".item-list-no-users, .item-list-users" ).hasClass("oculta")){
			$(".item-list-no-users, .item-list-users").addClass("selected");
			$(".item-list-no-users, .item-list-users").removeClass("oculta");
		} else{
			$(".item-list-no-users, .item-list-users").removeClass("selected");
			$(".item-list-no-users, .item-list-users").addClass("oculta");
		}


		if ($(".item-list-games, .listadoJuegos").is(":visible")) {


			$( ".item-list-games, .listadoJuegos" ).addClass('oculta');

		}

	});

	$( ".menu-games>a, .menuJuegos>a" ).click(function(e) {
		console.log("MENU JUEGOS SERVICES");
		e.preventDefault();
	   $( ".menu-users" ).removeClass("selected");

		$(".item-list-no-users, .item-list-users").removeClass('desoculta');
		$(".item-list-no-users, .item-list-users").addClass('oculta');



		if ($(".item-list-games, .listadoJuegos").is(":visible")) {

			$( ".item-list-games, .listadoJuegos" ).addClass('oculta');
			$( ".menu-games, .menuJuegos" ).removeClass("selected");
		}
		else  {
			$( ".item-list-games, .listadoJuegos" ).removeClass("oculta");

			$( ".menu-games, .menuJuegos" ).addClass("selected");
		}
	});




	$( ".item-submenu" ).addClass("ocultaWeb");
	$( ".item-submenu" ).addClass("oculta");

	 $('ul.item-list-users li:not(.item-salir) > a').click(function (e){
		acordeon(this);
	});









	if ($(".general_pop_up").length > 0){
		  centrarVentanaEmergente();
	}





	$('.desplegablePie').click(function (event){
		event.preventDefault();
		 if ($(this).siblings('ul').hasClass("oculta_mobile")){
			addOcultaMobileAndActive();
			$(this).siblings('ul').removeClass("oculta_mobile").prev().addClass( 'active');
		  }
		  else {
			addOcultaMobileAndActive();
			$(this).siblings('ul').addClass("oculta_mobile");
		  }
	});

	function addOcultaMobileAndActive(){
		$(".contenidoDesplegable").addClass("oculta_mobile").prev().removeClass('active') ;
}



	 $(window).resize(function(){
		 centrarVentanaEmergente();
	 });









	$('body').delegate('.trigger', 'click', function(e) {
				 if (!$(this).next().is(":visible")  ||  $(this).next().is(":hidden")){
			$(this).next().slideDown('fast').prev().toggleClass( 'active' );
		  }
		  else {
			$(this).next().slideUp('fast').prev().toggleClass( 'active' );
		  }
	  });


});

/*!
 * accounting.js v0.4.2, copyright 2014 Open Exchange Rates, MIT license, http://openexchangerates.github.io/accounting.js
 */
(function(p,z){function q(a){return!!(""===a||a&&a.charCodeAt&&a.substr)}function m(a){return u?u(a):"[object Array]"===v.call(a)}function r(a){return"[object Object]"===v.call(a)}function s(a,b){var d,a=a||{},b=b||{};for(d in b)b.hasOwnProperty(d)&&null==a[d]&&(a[d]=b[d]);return a}function j(a,b,d){var c=[],e,h;if(!a)return c;if(w&&a.map===w)return a.map(b,d);for(e=0,h=a.length;e<h;e++)c[e]=b.call(d,a[e],e,a);return c}function n(a,b){a=Math.round(Math.abs(a));return isNaN(a)?b:a}function x(a){var b=c.settings.currency.format;"function"===typeof a&&(a=a());return q(a)&&a.match("%v")?{pos:a,neg:a.replace("-","").replace("%v","-%v"),zero:a}:!a||!a.pos||!a.pos.match("%v")?!q(b)?b:c.settings.currency.format={pos:b,neg:b.replace("%v","-%v"),zero:b}:a}var c={version:"0.4.1",settings:{currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}}},w=Array.prototype.map,u=Array.isArray,v=Object.prototype.toString,o=c.unformat=c.parse=function(a,b){if(m(a))return j(a,function(a){return o(a,b)});a=a||0;if("number"===typeof a)return a;var b=b||".",c=RegExp("[^0-9-"+b+"]",["g"]),c=parseFloat((""+a).replace(/\((.*)\)/,"-$1").replace(c,"").replace(b,"."));return!isNaN(c)?c:0},y=c.toFixed=function(a,b){var b=n(b,c.settings.number.precision),d=Math.pow(10,b);return(Math.round(c.unformat(a)*d)/d).toFixed(b)},t=c.formatNumber=c.format=function(a,b,d,i){if(m(a))return j(a,function(a){return t(a,b,d,i)});var a=o(a),e=s(r(b)?b:{precision:b,thousand:d,decimal:i},c.settings.number),h=n(e.precision),f=0>a?"-":"",g=parseInt(y(Math.abs(a||0),h),10)+"",l=3<g.length?g.length%3:0;return f+(l?g.substr(0,l)+e.thousand:"")+g.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+e.thousand)+(h?e.decimal+y(Math.abs(a),h).split(".")[1]:"")},A=c.formatMoney=function(a,b,d,i,e,h){if(m(a))return j(a,function(a){return A(a,b,d,i,e,h)});var a=o(a),f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format);return(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal))};c.formatColumn=function(a,b,d,i,e,h){if(!a)return[];var f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format),l=g.pos.indexOf("%s")<g.pos.indexOf("%v")?!0:!1,k=0,a=j(a,function(a){if(m(a))return c.formatColumn(a,f);a=o(a);a=(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal));if(a.length>k)k=a.length;return a});return j(a,function(a){return q(a)&&a.length<k?l?a.replace(f.symbol,f.symbol+Array(k-a.length+1).join(" ")):Array(k-a.length+1).join(" ")+a:a})};if("undefined"!==typeof exports){if("undefined"!==typeof module&&module.exports)exports=module.exports=c;exports.accounting=c}else"function"===typeof define&&define.amd?define([],function(){return c}):(c.noConflict=function(a){return function(){p.accounting=a;c.noConflict=z;return c}}(p.accounting),p.accounting=c)})(this);

//function DisableBack() {
//	console.log(window.location.href );
//    window.history.forward();
//}
//DisableBack();
//window.onload = DisableBack;
//window.onpageshow = function (evt) {
//    if (evt.persisted) DisableBack();
//}
//window.onunload = function () { void (0); }


var seed;
var mt;


var c = 0;
var t;
var timer_is_on = 0;



var reloadButtonsCargados=0;




var c_session;
var objContSession;
var timer_is_on_session = 0;

//var tiempo_maximo_espera_session = 1200 ;




function tituloConDetalle($elDiv){

	$elDiv.parent().next().slideToggle();
}




function centrarVentanaEmergente() {

		   $.fn.center = function ()
		    {

		        this.css("position","fixed");
		        this.css("top", ($(window).height() / 2) - (this.outerHeight() / 2));
		        this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));
		        return this;
		    },

		    $("#botonesErrorOK").addClass("hidden");
			$("#botonesConfirm").addClass("hidden");
			$('.message_error').center();

	}


function tiempoContado() {
    c = c+1;
    t = setTimeout(function(){tiempoContado()}, 1000 );
    if (c==time_out_compra || c>time_out_compra) {
      	$("#f_timeOut").submit();

    }

}

function contadorIniciar() {
    if (!timer_is_on) {
        timer_is_on = 1;
        tiempoContado();
    }
}





var time_out_compra=0;
$( document ).ready(function($) {


	time_out_compra =  $("#time_out_compra").val();
	var idiomaCookie =  $("#cookieLangSpring").val();

	/**
	 * Add decimals dots
	 *
	 * @param p
	 * @returns {String}
	 */
	function addDots(p) {
		if (p == null || p == undefined)
			return '';
		p = Math.floor(p);
		p = p * 100;
		p = '' + p;
		var miles = '.';
		if (p.length < 3) {
			p = '0';
		} else {
			p = p.substr(0, p.length - 2);
		}
		return p.replace(/\B(?=(\d{3})+(?!\d))/g, miles);
	}


	/**
	 *
	 * @param str
	 * @returns {Date}
	 */
	function createDateFromString(str) {
		try {
			if (str) {
				if (new Date(str).getTime()) {
					return (new Date(str));
				} else {
					var dateSrt = str.split(' ')[0] + 'T' + str.split(' ')[1];
					return (new Date(dateSrt));
				}
			} else {
				return null;
			}
		} catch (err) {
			return null;
		}

	}


	function formatDate(date, languageCode) {

		date = createDateFromString(date);
		var result = "";
		var months;
		var days;
		if (date != null && date != undefined && date != "") {

			switch (languageCode) {
			case 'en':

				months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
				days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
				result = days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
				break;
			case 'ca':
				// Catalan (dimarts, 2/marÃ§/2000)
				months = [ "gener", "febrer", "mar\347", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre" ];
				days = [ "diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte" ];
				result = days[date.getDay()] + ", " + date.getDate() + "/" + months[date.getMonth()] + "/" + date.getFullYear();

				break;
			case 'eu':

				months = [ "urtarrilla", "otsaila", "martxoa", "apirila", "maiatza", "ekaina", "uztaila", "abuztua", "iraila", "urria", "azaroa", "abendua" ];
				days = [ "igandea", "astelehena", "asteartea", "asteazkena", "osteguna", "ostirala", "larunbata" ];
				result = days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

				break;
			case 'gl':

				months = [ "Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro" ];
				days = [ "Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado" ];
				result = days[date.getDay()] + " " + date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear();

				break;

			case 'vl':

				months = [ "Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro" ];
				days = [ "Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado" ];
				result = days[date.getDay()] + " " + date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear();

				break;

			default:

				months = [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ];
				days = [ "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado" ];
				result = days[date.getDay()] + " " + date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear();

				break;
			}
		}

		return result;
	}


	/**
	 *
	 * @param url
	 * @returns {Boolean}
	 */
	function starWithhttp(url) {
		   if (!/^(f|ht)tps?:\/\//i.test(url)) {
			   return false
		   }
		   return true;
		}


	/**
	 *
	 * @param url
	 * @returns {String}
	 */
	function comoponerURLImageBote(url) {
			url = "http://";
		   return url;
		}


	/**
	 *
	 * @param url
	 * @returns {Boolean}
	 */
	function addhttp(url) {
		   if (!/^(f|ht)tps?:\/\//i.test(url)) {
		      url = "http://" + url;
		   }
		   return url;
		}

	$(document).ready(function() {
		 var urlServicioCabeceraCMS = $("#urlServicioCabeceraCMS").val();
		 var perfil_ampliado_ts = $("#perfil_ampliado_ts").val();
		 var reponsePerfilAmpliadoTOStore;
		 if (chacheoPerfilAmpliadoTS!=perfil_ampliado_ts) {

				 if (urlServicioCabeceraCMS!="") {
					  try{
							$.jsonp({

					    	    url: urlServicioCabeceraCMS,
					    	    crossDomain: true,
					    	    cache:false,
					            contentType: "application/json",
					            dataType: 'jsonp',
					            async: false,
					            callback: "jsonpCallback",

							    beforeSend: function(msg){
								},
					    	    success: function( response ) {
					    	    	reponsePerfilAmpliadoTOStore = JSON.stringify(response);
					    	    	successfulCallSagaMenuJSONService(response);

					    	    },

					    	    complete: function(response) {
							    	localStorage.setItem('chacheoPerfilAmpliadoTS', perfil_ampliado_ts);
							    	localStorage.setItem('chacheoPerfilAmpliadoJSON', reponsePerfilAmpliadoTOStore);
							    },


					    	    error: function(d,msg) {

					    	    	//successfulCallSagaMenuJSONService(errorData);
					    	      },

					    	});
					    } catch (e) {
					        //successfulCallSagaMenuJSONService(errorData);
					    }



				}

		 }

		 else {
			 successfulCallSagaMenuJSONService(JSON.parse(localStorage.getItem('chacheoPerfilAmpliadoJSON')));


		 }

		   function successfulCallSagaMenuJSONService (response) {
			    //console.log(response);
			   if (response!=null) {
			    if (response.participanteID!='') {


			    	 $("#horaPlataforma").simpleClock();
			    	 $("#horaPlataformaResponsive").simpleClock();

    	        	$("#headerLogado").removeClass("hidden");
    	        	$("#valorSaldo").prepend(response.saldoLotobolsa);
    	        	$(".datosUsuario-nombre").prepend(response.nombreUsuario);

                 	 $("#loginPrevio").prepend(response.loginPrevio);
                 	 $("#loginPrevioResponsive").prepend(response.loginPrevio);

                 	// $("#horaPlataforma").prepend(response.horaPlataforma);
                 	// $("#horaPlataformaResponsive").prepend(response.horaPlataforma);
                     var mensajesNoLeidos = response.mensajesNoLeidos;

                     if (mensajesNoLeidos>0 ) {
                    	 $(".notificaciones").prepend(response.mensajesNoLeidos);
                    	 $(".notificaciones").removeClass("hidden");
                     }

    	        }
    	         else {
//    	        	 var mostrarCaptcha = response.mostrarCaptcha;
//                     if (mostrarCaptcha) {
//                    	 $("#message-captcha").removeClass("hidden");
//
//                     }
//                     else {
                    	// $("#campos-IniSesion").removeClass("hidden");
//                     }
    	         }

			   }
		    }





		   chacheoServicioV3 = localStorage.getItem('chacheoServicioV3');

		  if (chacheoServicioV3!='cached') {
			  var errorText = '{"estadoPlataforma":"ERROR","ultimoLogin":"ERROR","saldoLotobolsa":"ERROR","horaPlataforma":null,"participanteID":"ERROR","mensajesNoLeidos":null}';
				var errorData = JSON.parse(errorText);
				var reponseTOStore;
				 var urlServicioV3 = $("#urlServicioV3").val();
					try{
						$.jsonp({
					    url: urlServicioV3,
					    cache:false,
					    crossDomain: true,
					    contentType: "application/json",
			            dataType: 'jsonp',
			            async: false,
				        callback: "jsonpCallback",
							 beforeSend: function(msg){

						 },


					    success: function( response ) {
					    	reponseTOStore = JSON.stringify(response);
					    	successReponseV3(response);


					    },
					    complete: function(response) {
					    	localStorage.setItem('chacheoServicioV3', 'cached');
					    	//console.log("guardando fecha: "+new Date().getTime());
					    	localStorage.setItem('chacheoServicioV3TS', new Date().getTime());
					    	localStorage.setItem('v3JSON',reponseTOStore);
					    },

					    error: function(d,msg) {

					    	//successReponseV3(errorData);
					      },

					});
				} catch (e) {
					//successReponseV3(errorData);
				}


		  }

		  else {
			  if( localStorage.getItem('v3JSON') != 'undefined'){
				  successReponseV3(JSON.parse(localStorage.getItem('v3JSON')) );
				};
		  }

		  function successReponseV3(response) {

				 $.each(response, function(arrayID,group) {

			            var idJuego = group.game_id;

			            var fechaApertura = createDateFromString(group.apertura);
			            var  fechaCierre =  createDateFromString(group.cierre);
			            var  fechaActual = new Date();

			            	 if (group.premio_bote == 'null' || group.premio_bote ===null) {

						  	 }
			            	 else {
			            		 if (fechaApertura <= fechaActual && fechaActual <= fechaCierre) {
								   $("#urlJackPot_"+idJuego).removeClass("hidden");
								   var boteFormateado = addDots(group.premio_bote);
								   boteFormateado=boteFormateado+" &euro;";
								   $("#valor_bote_"+idJuego).empty();
								   $("#valor_bote_"+idJuego).append(boteFormateado);

								   fecha_formateada = formatDate(group.fecha,idiomaCookie);
								   $("#fechaBote_"+idJuego).empty();
					    	       $("#fechaBote_"+idJuego).prepend(fecha_formateada);

			            		 }

			            	 }



					});
			}


	var errorText = '{"estadoPlataforma":"ERROR","ultimoLogin":"ERROR","saldoLotobolsa":"ERROR","horaPlataforma":null,"participanteID":"ERROR","mensajesNoLeidos":null}';
	var errorData = JSON.parse(errorText);
	 var urlServicioCacebera = $("#urlServicioCacebera").val();


	 chacheoServicioCabeceraCMS = localStorage.getItem('chacheoServicioCabeceraCMS');

	  if (chacheoServicioCabeceraCMS!='cached') {
		  var reponseCabeceraCMSTOStore;

			try{
				$.jsonp({
			    url: urlServicioCacebera,
			    cache:false,
			    crossDomain: true,
			    contentType: "application/json",
	            dataType: 'jsonp',
	            async: false,
		        callback: "jsonpCallback",

			    success: function( response ) {
			    	reponseCabeceraCMSTOStore = JSON.stringify(response);
			    	successServicioCaceberaJSONService(response);


			    },
			    complete: function(response) {
			    	localStorage.setItem('chacheoServicioCabeceraCMS', 'cached');
			    	localStorage.setItem('chacheoServicioCabeceraCMSTS', new Date().getTime());
			    	localStorage.setItem('cabeceraCMSJSON',reponseCabeceraCMSTOStore);

			    },
			    error: function(xhr,d,msg) {

			    	//successfulCallSagaMenuJSONService(errorData);
			      },

			});
		} catch (e) {
		   // successfulCallSagaMenuJSONService(errorData);
		}

	  }

	  else {

		  if( localStorage.getItem('cabeceraCMSJSON') != 'undefined'){
			  successServicioCaceberaJSONService(JSON.parse(localStorage.getItem('cabeceraCMSJSON')));
			};
	  }


	function successServicioCaceberaJSONService (response) {

		var hostPortCMS = $("#hostPortCMS").val();



		var x="";
		x= hostPortCMS.substring(0,hostPortCMS.length - 4);

    	$.each(response.bono, function(arrayID,group) {
    		 if ("imageLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {
                            urlPc= group.urlPC;
    				 		if (urlPc.match("^http") || urlPc.match("^https")) {
    				 			  $("#enlaceImgBote_BONO").attr("href", group.urlPC);
    				 		}
    				 		else  {
    				 			 $("#enlaceImgBote_BONO").attr("href", x+group.urlPC);
    				 		}


    				 	}
    			    });

    		 }
    		 if ("title"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {
    				 		 $("#textoEditorBote_BONO").append(group);
    				 	}
    			    });

    		 }


    		 if ("jackpotLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		  $("#urlJackPot_BONO").attr("href", group.urlPC);
    				 	}
    			    });

    		 }



		});

    	$.each(response.emil, function(arrayID,group) {
    		 if ("imageLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		 urlPc= group.urlPC;
     				 		if (urlPc.match("^http") || urlPc.match("^https")) {
     				 			  $("#enlaceImgBote_EMIL").attr("href", group.urlPC);
     				 		}
     				 		else  {
     				 			 $("#enlaceImgBote_EMIL").attr("href", x+group.urlPC);
     				 		}

    				 	}
    			    });

    		 }
    		 if ("title"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {
    				 		 $("#textoEditorBote_EMIL").append(group);
    				 	}
    			    });

    		 }

    		 if ("jackpotLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		  $("#urlJackPot_EMIL").attr("href", group.urlPC);
    				 	}
    			    });

    		 }

		});

    	$.each(response.lotu, function(arrayID,group) {
	    		 if ("imageLink"==arrayID) {
	    			 $.each(group, function (index, group) {

	    				 	if (idiomaCookie==index) {
	    				 		 urlPc= group.urlPC;
	      				 		if (urlPc.match("^http") || urlPc.match("^https")) {
	      				 			  $("#enlaceImgBote_LOTU").attr("href", group.urlPC);
	      				 		}
	      				 		else  {
	      				 			 $("#enlaceImgBote_LOTU").attr("href", x+group.urlPC);
	      				 		}
	    				 	}
	    			    });

	    		 }
	    		 if ("title"==arrayID) {
	    			 $.each(group, function (index, group) {

	    				 	if (idiomaCookie==index) {
	    				 		 $("#textoEditorBote_LOTU").append(group);
	    				 	}
	    			    });

	    		 }

	    		 if ("jackpotLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		  $("#urlJackPot_LOTU").attr("href", group.urlPC);
    				 	}
    			    });

    		 }

			});


    	$.each(response.lapr, function(arrayID,group) {
	    		 if ("imageLink"==arrayID) {
	    			 $.each(group, function (index, group) {

	    				 	if (idiomaCookie==index) {
	    				 		 urlPc= group.urlPC;
		      				 		if (urlPc.match("^http") || urlPc.match("^https")) {
		      				 			  $("#enlaceImgBote_LAPR").attr("href", group.urlPC);
		      				 		}
		      				 		else  {
		      				 			 $("#enlaceImgBote_LAPR").attr("href", x+group.urlPC);
		      				 		}

	    				 	}
	    			    });

	    		 }
	    		 if ("title"==arrayID) {
	    			 $.each(group, function (index, group) {

	    				 	if (idiomaCookie==index) {
	    				 		 $("#textoEditorBote_LAPR").append(group);
	    				 	}
	    			    });

	    		 }

	    		 if ("jackpotLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		  $("#urlJackPot_LAPR").attr("href", group.urlPC);
    				 	}
    			    });

    		 }

			});

    	$.each(response.elgr, function(arrayID,group) {
    		 if ("imageLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		 urlPc= group.urlPC;
	      				 		if (urlPc.match("^http") || urlPc.match("^https")) {
	      				 			  $("#enlaceImgBote_ELGR").attr("href", group.urlPC);
	      				 		}
	      				 		else  {
	      				 			 $("#enlaceImgBote_ELGR").attr("href", x+group.urlPC);
	      				 		}


    				 	}
    			    });

    		 }
    		 if ("title"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {
    				 		 $("#textoEditorBote_ELGR").append(group);
    				 	}
    			    });

    		 }
    		 if ("jackpotLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		  $("#urlJackPot_ELGR").attr("href", group.urlPC);
    				 	}
    			    });

    		 }
		});

    	$.each(response.laqu, function(arrayID,group) {
    		 if ("imageLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

   				 		 urlPc= group.urlPC;
	      				 		if (urlPc.match("^http") || urlPc.match("^https")) {
	      				 			  $("#enlaceImgBote_LAQU").attr("href", group.urlPC);
	      				 		}
	      				 		else  {
	      				 			 $("#enlaceImgBote_LAQU").attr("href", x+group.urlPC);
	      				 		}



    				 	}
    			    });

    		 }
    		 if ("title"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {
    				 		 $("#textoEditorBote_LAQU").append(group);
    				 	}
    			    });

    		 }

    		 if ("jackpotLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		  $("#urlJackPot_LAQU").attr("href", group.urlPC);
    				 	}
    			    });

    		 }

		});

    	$.each(response.qgol, function(arrayID,group) {
	    		 if ("imageLink"==arrayID) {
	    			 $.each(group, function (index, group) {

	    				 	if (idiomaCookie==index) {
	    				 		if (urlPc.match("^http") || urlPc.match("^https")) {
	      				 			  $("#enlaceImgBote_QGOL").attr("href", group.urlPC);
	      				 		}
	      				 		else  {
	      				 			 $("#enlaceImgBote_QGOL").attr("href", x+group.urlPC);
	      				 		}

	    				 	}
	    			    });

	    		 }
	    		 if ("title"==arrayID) {
	    			 $.each(group, function (index, group) {

	    				 	if (idiomaCookie==index) {
	    				 		 $("#textoEditorBote_QGOL").append(group);
	    				 	}
	    			    });

	    		 }

	    		if ("jackpotLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		  $("#urlJackPot_QGOL").attr("href", group.urlPC);
    				 	}
    			    });

    		 }

			});

    	$.each(response.qupl, function(arrayID,group) {
	    		 if ("imageLink"==arrayID) {
	    			 $.each(group, function (index, group) {

	    				 	if (idiomaCookie==index) {
	    				 		if (urlPc.match("^http") || urlPc.match("^https")) {
	      				 			  $("#enlaceImgBote_QUPL").attr("href", group.urlPC);
	      				 		}
	      				 		else  {
	      				 			 $("#enlaceImgBote_QUPL").attr("href", x+group.urlPC);
	      				 		}

	    				 	;
	    				 	}
	    			    });

	    		 }
	    		 if ("title"==arrayID) {
	    			 $.each(group, function (index, group) {

	    				 	if (idiomaCookie==index) {
	    				 		 $("#textoEditorBote_QUPL").append(group);
	    				 	}
	    			    });

	    		 }

	    		if ("jackpotLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		  $("#urlJackPot_QUPL").attr("href", group.urlPC);
    				 	}
    			    });

    		 }

			});


    	$.each(response.lnac, function(arrayID,group) {
    		 if ("imageLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		if (urlPc.match("^http") || urlPc.match("^https")) {
    				 			  $("#enlaceImgBote_LNAC").attr("href", group.urlPC);
    				 		}
    				 		else  {
    				 			 $("#enlaceImgBote_LNAC").attr("href", x+group.urlPC);
    				 		}

    				 	}
    			    });

    		 }
    		 if ("title"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {
    				 		 $("#textoEditorBote_LNAC").append(group);
    				 	}
    			    });

    		 }

    		 if ("jackpotLink"==arrayID) {
    			 $.each(group, function (index, group) {

    				 	if (idiomaCookie==index) {

    				 		  $("#urlJackPot_LNAC").attr("href", group.urlPC);
    				 	}
    			    });

    		 }


		});



	}




	});




	var cookieLang = $.cookie('usr-lang');




	var cookieSpringLang = $("#cookieLangSpring").val();


	var langParameterValue=getUrlParameter("lang");
	if (langParameterValue!="" && langParameterValue!=null) {cookieLang=langParameterValue}

	$( "#changeLanguage" ).change(function(e) {
		e.preventDefault();
		var seleccionado = $( this ).val();
		var url = removeURLParameter(window.location.href,"lang");


		$.cookie("usr-lang", seleccionado, {
			   expires : 10,
			   path    : '/',
			   secure  : true
			});


		if(url.indexOf('?') === -1)
		{
			location.replace(url+"?lang="+seleccionado);
		}

		else {
		location.replace(url+"&lang="+seleccionado);
		}
	});





	$("#changeLanguage option[value='"+cookieLang+"']").prop("selected",true);



	if(typeof cookieLang === 'undefined'){

		cookieLang = cookieSpringLang;
		$.cookie("usr-lang", cookieLang, {
			   expires : 10,
			   path    : '/',
			   secure  : true
			});


		 }
	else {
		$.cookie("usr-lang", cookieSpringLang, {
			   expires : 10,
			   path    : '/',
			   secure  : true


			});

	}



	var cookies_policy = $.cookie('Cookies_policy');
	if(typeof cookies_policy === 'undefined'){
		$("#contenedorCookies").removeClass("hidden");

		 };




			$('#botonAceptarCookies').click(function(event){
				event.preventDefault();
				$("#contenedorCookies").addClass("hidden");
				$.cookie("Cookies_policy", "approved", {
					   expires : 10,
					   path    : '/',
					   secure  : true
					});

			});

});




function acordeon(e) {


	$("ul.item-list-users li.active").removeClass('active');
	$('.item-submenu.active').slideUp('fast').removeClass('active');

	if (!$(e).next('.item-submenu').is(":visible")){


		if ($(e).next('.item-submenu').length) {
			$(e).next('.item-submenu').addClass('active').slideDown('fast');
			$( e ).parent().toggleClass( "active" );
		}
	}

	else {
		$( e ).parent().toggleClass( "active" );
		$('.item-submenu').slideUp('fast').removeClass('active');
		$('ul.item-list-users li.active').removeClass('active');
	}
}


function cogerContratoActivo(urlContratoActivo){
	$.ajax({

		url : urlContratoActivo,
		success : function(salida) {
			$("#text_contrato_activo").val(salida);
		},
		error : function() {
		}

	});
}


function cogerAvisoLegal(urlAvisoLegal){

	$.ajax({
		url : urlAvisoLegal,
		success : function(salida) {
			$("#text_aviso_legal").val(salida);
		},
		error : function() {
		}
	});
}




$('.trigger2, .desplegablePie').click(function (event){
	event.preventDefault();
	 if ($(this).siblings('ul').hasClass("oculta_mobile")){
		addOcultaMobileAndActive();
		$(this).siblings('ul').removeClass("oculta_mobile").prev().addClass( 'active');
	  }
	  else {
		addOcultaMobileAndActive();
		$(this).siblings('ul').addClass("oculta_mobile");
	  }
});






var simbolos="-_";

function numero(mitesxt,cuantos){
  var contadorNum = 0;
  if ( mitesxt.match(/\d/) ) {
	$('#number').removeClass('invalid').addClass('valid');
	if ( cuantos === 2 ) {
		for(i=0; i<mitesxt.length; i++){
			if ( mitesxt.charAt(i).match(/\d/)  )  contadorNum ++;
		}
		if ( contadorNum >= 2 ) {
			return true;
		}else{
			return false;
		}
	}
	return true;
  }
  $('#number').removeClass('valid').addClass('invalid');
  return false;
}

function mayuscula(mitesxt,cuantos){
  var contadorMax = 0;
  if ( mitesxt.match(/[A-Z\u00D1]/) ) {
	$('#capital').removeClass('invalid').addClass('valid');
	if ( cuantos === 2 ) {
		for(i=0; i<mitesxt.length; i++){
			if ( mitesxt.charAt(i).match(/[A-Z\u00D1]/)    ) {
				contadorMax ++;
			}
		}
		if ( contadorMax >= 2 ) {
			return true;
		}else{
			return false;
		}
	}
	return true;
  }
  $('#capital').removeClass('valid').addClass('invalid');
  return false;
}

function minuscual(mitesxt,cuantos){
  var contadorMin = 0;
  if ( mitesxt.match(/[a-z\u00F1]/) ) {
	$('#letter').removeClass('invalid').addClass('valid');
	if ( cuantos === 2 ) {
		for(i=0; i<mitesxt.length; i++){
			if ( mitesxt.charAt(i).match(/[a-z\u00F1]/)    )  contadorMin ++;
		}
		if ( contadorMin >= 2 ) {
			return true;
		}else{
			return false;
		}
	}
	return true;
  }
  $('#letter').removeClass('valid').addClass('invalid');
  return false;
}

function tamano(mitesxt,min,max){
  if (mitesxt.length >= min && mitesxt.length <= max){
	$('#length').removeClass('valid').addClass('valid');
	return true;
  }
  $('#length').removeClass('valid').addClass('invalid');
  return false;
}

function tiene_simbolos(texto){
   for(i=0; i<texto.length; i++){
      if (simbolos.indexOf(texto.charAt(i),0)!=-1){
         return 1;
      }
   }
   return 0;
}


function checkform(miObjeto, obPinto){

	var pswdlength = false;
	var pswdletter = false;
	var pswduppercase = false;
	var pswdnumber = false;
	var seguridad = 0; seguridad = 0;
	var isLong , isLetra , isLetraMay , isLetraMin , isNumber = false;
	var pswd = $(miObjeto).val();
	var position =  obPinto.position();
	var correcto = [];
	var valido;

		if (tamano(pswd,8,15)) 	{
			seguridad += 12.5;
			correcto.push("1");
			}
		if (minuscual(pswd,1)) 	{
			seguridad += 12.5;
			correcto.push("1");}
		if (mayuscula(pswd,1))  {
			seguridad += 12.5;
			correcto.push("1");}
		if (numero(pswd,1)) 	{
			seguridad += 12.5;
			correcto.push("1");}

		if (correcto.length==4){
			valido = true;
			if (pswd.length >= 10 )  	{
				seguridad += 20;
				}
			if (tiene_simbolos( pswd ))	{
				seguridad += 15;
				}
			if (minuscual(pswd,2)) 		{
				seguridad += 5;  }
			if (mayuscula(pswd,2))  	{
				seguridad += 5;
				}
			if (numero(pswd,2)) 	 	{
				seguridad += 5;
				}

		} else {
			valido = false;
		}

		$('#pswd_info').show();

	if (seguridad === 0 ){
		seguridad = "nada";
		cuantoClase="";
		cuanto="";
	}else if ( (seguridad > 0) && (seguridad < 21) ) {
		seguridad = "casipoco";
		cuantoClase="";
		cuanto=$("#fortalezaMuyDebil").val();
	}else if ( (seguridad > 21) && (seguridad < 41) ) {
		seguridad = "poco";
		cuantoClase="cuanto25";
		cuanto=$("#fortalezaDebil").val();
	}else if ((seguridad > 41) &&  (seguridad < 61) ){
		seguridad = "normal";
		cuantoClase="cuanto50";
		cuanto=$("#fortalezaBuena").val();
	}else if ((seguridad > 61) &&  (seguridad < 81) ){
		seguridad = "casi";
		cuantoClase="cuanto75";
		cuanto=$("#fortalezaFuerte").val();
	}else if (seguridad > 81)  {
		seguridad = "full";
		cuantoClase="cuanto100";
		cuanto=$("#fortalezaMuyFuerte").val();
	}

	if (seguridad === 0 ){
		seguridad = "nada";
		cuantoClase=""; cuanto="";}

	 $(obPinto).removeClass("nada casipoco poco normal casi full").addClass(seguridad);
	 $(".cuanto").removeClass("cuanto25 cuanto50 cuanto75 cuanto100").addClass(cuantoClase).html(cuanto);

	 $('#pswd_info').css("top",position.top-220);

	if( pswdlength && pswdletter && pswduppercase && pswdnumber){
		$('#pswd_info').show();
	}else{
		$('#pswd_info').show();
	}
	return valido;
}









function reloadButtons() {


	if( $(".guardarFavorita").length ){
		$(".guardarFavorita").parent().hide();
	}

    $('input.inputChexbox[type="checkbox"]').each(function(){
        var inputTypeCheckbox = $(this);
        var divCheckbox = $(inputTypeCheckbox).closest('div').find('.checkbox');
        $(divCheckbox).show().click(function(){
        	$(divCheckbox).toggleClass('checked');
          if ($(inputTypeCheckbox).is(':checked')) {
        	  $(inputTypeCheckbox).attr('checked', false);

          } else {
            $(inputTypeCheckbox).attr('checked',true);

          }
          if ($(this).parent().parent().find(".contenedor_detalle_definitions fieldset").hasClass('guardarFavorita') ) {
  			tituloConDetalle($(this));
  			}

        });


        });

}


function reloadButtonsAjax() {


	if( $(".guardarFavorita").length ){
		$(".guardarFavorita").parent().hide();
	}

    $('input.inputChexbox[type="checkbox"]').each(function(){
    	  var inputTypeCheckbox = $(this);
    	if (!(inputTypeCheckbox).hasClass("reloaded")) {

        inputTypeCheckbox.addClass("reloaded");
        var divCheckbox = $(inputTypeCheckbox).closest('div').find('.checkbox');
        $(divCheckbox).show().click(function(){
        	$(divCheckbox).toggleClass('checked');
          if ($(inputTypeCheckbox).is(':checked')) {
        	  $(inputTypeCheckbox).attr('checked', false);

          } else {
            $(inputTypeCheckbox).attr('checked',true);

          }
          if ($(this).parent().parent().find(".contenedor_detalle_definitions fieldset").hasClass('guardarFavorita') ) {
  			tituloConDetalle($(this));
  			}

        });

    	  }
        });


}

function calAleatorio(inferior , superior){

	var miNumAleatorio = mt.genrand_real3();



	var rang=superior-inferior;
	var faleat=Math.floor(miNumAleatorio * 1000);
	var aleat=faleat%rang;




	return aleat+inferior;

}

function calAleatorioAlto(inferior , superior){

	var miNumAleatorio = mt.genrand_real3();

	var rang=superior-inferior;
	var faleat=Math.floor(miNumAleatorio * rang);
	var aleat=faleat%rang;

	return aleat+inferior;
}



function removeURLParameter(url, parameter) {

    var urlparts= url.split('?');
    if (urlparts.length>=2) {

        var prefix= encodeURIComponent(parameter)+'=';
        var pars= urlparts[1].split(/[&;]/g);


        for (var i= pars.length; i-- > 0;) {

            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        url= urlparts[0]+'?'+pars.join('&');
        var urlparts= url.split('?');

        if (urlparts[1].length==0) {

        	var nuevaUrl = url.substr(0, url.length-1);

        	 url = nuevaUrl;
        }
        return url;
    } else {
        return url;
    }
}

function contadorIniciarSession() {

    if (!timer_is_on_session) {
    	timer_is_on_session = 1;
    	c_session = 0;
        tiempoContadoSession();
    }
}

function reiniciarContadorSession() {

    if (timer_is_on_session == 1) {
    	timer_is_on_session = 0;
    	clearTimeout(objContSession);
    	contadorIniciarSession();
    }
}

function tiempoContadoSession() {
	c_session = c_session+1;
	var tiempo_max_espera_session = $("#tiempo_maximo_espera_session").val();
    objContSession = setTimeout(function(){tiempoContadoSession()}, 1000 );
    if (c_session==tiempo_max_espera_session || c_session>tiempo_max_espera_session) {
    	timer_is_on_session = 0;
    	clearTimeout(objContSession);
    	 var perfil_ampliado_ts = $("#perfil_ampliado_ts").val();
    	 var urlServicioCabeceraCMS = $("#urlServicioCabeceraCMS").val();
    	try{
			$.jsonp({

	    	    url: urlServicioCabeceraCMS,
	    	    crossDomain: true,
	    	    cache:false,
	            contentType: "application/json",
	            dataType: 'jsonp',
	            async: false,
	            callback: "jsonpCallback",

			    beforeSend: function(msg){
				},
	    	    success: function( response ) {

	    	    	if (response.participanteID=='' && perfil_ampliado_ts!='') {

	    	    		var urlPopup =  $(".item-salir>a").attr('href');
	    	    		window.location.replace(urlPopup);


	    	    	}
	    	    	else if (perfil_ampliado_ts=='') {
	    	    		//item-salir

	    	    		$("#popup_session").removeClass("hidden");
	    	    		$("#TextoSessionWeb").removeClass("hidden");
	    	    	}

	    	    },



	    	    error: function(d,msg) {


	    	      },

	    	});
	    } catch (e) {

	    }


    }


}



(function ($) {

    $.fn.simpleClock = function ( ) {

    	  var horaPlataformaMillis = parseInt($("#horaPlataformaMillis").val());

      var clock = this;
      var hour;
      var minute;
      var segundos=0;
      // getTime - Where the magic happens ...
      function getTime() {

    	  horaPlataformaMillis=horaPlataformaMillis+1;
        var date = new Date(horaPlataformaMillis);

         hour = date.getHours();
         minute= date.getMinutes();
        return {

          date: date.getDate(),
         // hour: appendZero(hour),
          hour:hour,
          minute: date.getMinutes(),

        };
      }

      // appendZero - If the number is less than 10, add a leading zero.
      function appendZero(num) {
        if (num < 10) {
          return "0" + num;
        }
        return num;
      }

      // refreshTime - Build the clock.
      function refreshTime(clock_id) {
        segundos++;
        if (segundos == 60) {
        	segundos=0;
        	if (minute==59) {
        		minute=0;
        		if (hour==59) hour=0;
        		else hour++;
        	}
        	else {
        		minute++;
        	}

        	  clock = $.find('#'+clock_id);
              //$(clock).find('.date').html(now.day + ', ' + now.date + '. ' + now.month + ' ' + now.year);
              $(clock).html( appendZero(hour) + ":" + appendZero(minute));
        }



      }

      // Get individual clock_id
      var clock_id = $(this).attr('id');
      var now = getTime(horaPlataformaMillis);
      clock = $.find('#'+clock_id);
      //$(clock).find('.date').html(now.day + ', ' + now.date + '. ' + now.month + ' ' + now.year);
      $(clock).html(appendZero(now.hour) + ":" + appendZero(now.minute));
      setInterval( function() { refreshTime(clock_id) }, 1000);

    };
  })(jQuery);


/***********************************************
* Bookmark site script- © The Tech. Diary (www.tech4sky.com)
* This notice MUST stay intact for legal use
* Visit us at http://w3guy.com/ for full source code
***********************************************/

/* Modified to support Opera */
function bookmarksite(title,url){
if (window.sidebar) // firefox
    window.sidebar.addPanel(title, url, "");
else if(window.opera && window.print){ // opera
    var elem = document.createElement('a');
    elem.setAttribute('href',url);
    elem.setAttribute('title',title);
    elem.setAttribute('rel','sidebar');
    elem.click();
}
else if(document.all)// ie
    window.external.AddFavorite(url, title);
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

/**
 * Devuelve true si el valor pasado como argumento no es undefined o null
 * @param valor
 * @returns {Boolean}
 */
function existe(valor) {
	if (typeof valor != 'undefined' && valor!=null) {
	    return true;
	} else {
		return false;
	}
};

/*
 * Devuelve la fecha en formato YYYYMMDD a partir de una fecha de entrada DD/MM/YYYY
 */
function formatearfechaCorta (fechaEntrada) {

	var fechas=fechaEntrada.split('/');
	var anio=fechas[2];
	var mes=fechas[1];
	var dia=fechas[0];
	var fecha_corto=anio+mes+dia;

	return fecha_corto;
};

/**
 * Devuelve la variable rellenada por la izquierda con el caracter indicado
 * @param valor
 * @param ancho
 * @param relleno
 * @returns valor completando hasta 'ancho' tamaño por la izquierda con el caracter 'relleno'
 */
function pad (valor, ancho, relleno) {
    valor = valor.toString();
    while(valor.length < ancho)
    	valor = relleno + valor;
return valor;
}
