

var controlRefresco = 1;
var columnaBorrar;
var totalNumero;

$( document ).ready(function() {



	totalNumero = 50;



	var valor =$("#tipoPrimitiva").val();

	  switch (valor){

	  	case '1':
	  		$("#gAleatoria").addClass("hidden");
	  		$("#textoParaSimples").removeClass("hidden");
	  		$("#contenedorBloqueAleatoria").removeClass("multiple");
		break;

	  	case '2':
	  		$("#gAleatoria").removeClass("hidden");
	  		$("#textoParaSimples").addClass("hidden");
	  		$("#contenedorBloqueAleatoria").addClass("multiple");
		break;

  }
  	if ($("#pronostico").length > 0){
		$("#pronostico").val("");

	}


	$('body').delegate('.ayuda a', 'click', function(e) {
		ga('send', 'event', 'PrimitivaApuesta', 'Ayuda','Clic');


	});


	$('body').delegate('.item-list-estadisticas a', 'click', function(e) {
		ga('send', 'event', 'PrimitivaApuesta', 'MasInformacion','EstadisticasJuego');


	});

	$('body').delegate('.item-list-apuestas a', 'click', function(e) {
		ga('send', 'event', 'PrimitivaApuesta', 'MasInformacion','ApuestasAutorizadas');


	});

	$('body').delegate('#botonSiguiente', 'click', function(e) {


		  e.preventDefault();

		  var pronostico = $("#pronostico").val();
		  if(existenPronosticos() && pronostico==''){
			  //$("#action").val('suscripcion');
				$(".velo").toggleClass("hidden");
	    		$(".cargando").toggleClass("hidden");
	    		ga('send', 'event', 'PrimitivaApuesta', 'Siguiente','Éxito');
			  $("#formBoleto").submit();

		  }
		  else{
			  ga('send', 'event', 'PrimitivaApuesta', 'Siguiente','ErrorSinBloque');
			  if ($(".general_pop_up").length > 0){
				  centrarVentanaEmergente();

				$("#option_pop_up").removeClass("hidden");
				$("#botonesErrorOK").removeClass("hidden");
				$("#p_opcion").html(WJ1001);
			}
		  }
	  });




		$('body').delegate('#borrarTodo', 'click', function(event) {
			ga('send', 'event', 'PrimitivaApuesta', 'Pronosticos','LimpiarTodo');



		if ($("#option_pop_up").length > 0){
			  centrarVentanaEmergente();
			$("#option_pop_up").removeClass("hidden");
			$("#botonesConfirm").removeClass("hidden");
			$("#option_pop_up").attr("accion","borrarTodo");
			$("#p_opcion").html(WJ1009);
		}


		 event.stopPropagation();
		});





		$('body').delegate('#simpleTab', 'click', function(e) {
			ga('send', 'event', 'PrimitivaApuesta', 'Tipo','Simple');

			e.preventDefault();
			var liSimpleTab = $('#simpleTab').parent();
			var liMultipleTab = $('#multipleTab').parent();
			if($("#columna").val()>0){
				if(liMultipleTab.hasClass('selected')){
					ga('send', 'event', 'PrimitivaApuesta', 'Tipo','ConfirmaCambioTipo');

					centrarVentanaEmergente();
					$("#option_pop_up").attr("accion","borrarTodo");
					$("#option_pop_up").removeClass("hidden");
					$("#botonesConfirm").removeClass("hidden");
					$("#contentpopup-title").removeClass("hidden");
					$("#p_opcion").html(WJ1014);
				}
			}else{
				if (! liSimpleTab.hasClass('selected')) {

					$('#tipoPrimitivaEliminarTodo').val('simpleTab');
					liSimpleTab.addClass('selected');
					liMultipleTab.removeClass('selected');
					$('#tipoPrimitiva').val('1');
					changeSimpleAndMultipleTabs();
				}
			}
		});



		$('body').delegate('#multipleTab', 'click', function(e) {
			ga('send', 'event', 'PrimitivaApuesta', 'Tipo','Multiple');

			e.preventDefault();
			var liMultipleTab = $('#multipleTab').parent();
			var liSimpleTab = $('#simpleTab').parent();
			if($("#columna").val()>0){
				if(liSimpleTab.hasClass('selected')){
					ga('send', 'event', 'PrimitivaApuesta', 'Tipo','ConfirmaCambioTipo');

					centrarVentanaEmergente();
					$('#tipoPrimitivaEliminarTodo').val('multipleTab');
					$("#option_pop_up").attr("accion","borrarTodo");
					$("#option_pop_up").removeClass("hidden");
					$("#botonesConfirm").removeClass("hidden");
					$("#contentpopup-title").removeClass("hidden");
					$("#p_opcion").html(WJ1014);
				}
			}else{
				if (!$('#multipleTab').hasClass('selected')) {
					liMultipleTab.addClass('selected');
					liSimpleTab.removeClass('selected');
					$('#tipoPrimitiva').val('2');
					changeSimpleAndMultipleTabs();
				}
			}

		});



		 $('body').delegate('#nombre_favorita', 'focusout', function(event) {
				var input = $('#nombre_favorita').val();
				var novalido = patronNombreFavorita.test(input);
				if($("#favoritas_input").is(':checked') && input.trim() == ""){
					mostrarErrorFormatoFavoritaVacio();
				} else if (novalido || input.indexOf(" ")!=-1) {
					mostrarErrorFormatoFavorita();
				} else {
					 $("#nombre_favorita").removeClass("error");
					 $("#cruz_error_favorita").removeClass('error');
					 $("#txt_error_favorita").addClass("hidden");
					 $("#txt_error_favorita_vacio").addClass("hidden");
				}
			  });

			$('body').delegate('#boton_favorita','click',function(event) {
				event.preventDefault();
					var errorFav = false;
					var input = $('#nombre_favorita').val();
					var novalido = patronNombreFavorita.test(input);
					if(input=="" || input.trim() == ""){
						errorFav = true;
						ga('send', 'event', 'PrimitivaApuesta', 'Confirmar','ErrorSinNombreFavorita');
						mostrarErrorFormatoFavoritaVacio();
					} else if (novalido) {
						ga('send', 'event', 'PrimitivaApuesta', 'Confirmar','ErrorNombreFavorita');
						mostrarErrorFormatoFavorita();
						errorFav = true;
					}
					if(errorFav == false ) {
						ga('send', 'event', 'PrimitivaApuesta', 'Confirmar','GuardarFavorita');
						 $("#nombre_favorita").removeClass("error");
						 $("#cruz_error_favorita").removeClass('error');
						 $("#txt_error_favorita").addClass("hidden");
						 $("#txt_error_favorita_vacio").addClass("hidden");
						 $("#formFavorita").submit();
					}
			});

		$('body').delegate('#botobAceptarGuardarFavorita', 'click', function(e) {
			 $("#option_pop_up_favorita_guardada").addClass("hidden");

		});

		$('body').delegate('#botobAceptarGuardarFavorita', 'click', function(e) {
			 $("#option_pop_up_favorita_guardada").addClass("hidden");

		});
		$('body').delegate('#generarAleatoria', 'click', function(e) {

			  var pronostico = new Array();
			  borrarBoleto();
			  if ($("#gAleatoria").is(":visible") ) {


				  ga('send', 'event', 'PrimitivaApuesta', 'Aleatoria','Multiple');
				  var valor =$("#gAleatoria").val();


				  switch (valor){


				  	case '2':
				  		pronostico = generaApuesta(5);
					break;

				  	case '3':
				  		pronostico = generaApuesta(7);
					break;

				  	case '4':
				  		pronostico = generaApuesta(8);
					break;

				  	case '5':
				  		pronostico = generaApuesta(9);
					break;

				  	case '6':
				  		pronostico = generaApuesta(10);
					break;

				  	case '7':
				  		pronostico = generaApuesta(11);
				  	break;
				  }

			  }
			  else {

				  ga('send', 'event', 'PrimitivaApuesta', 'Aleatoria','Simple');
					pronostico = generaApuesta(6);
			  }




			  $("#pronostico").val(pronostico.toString());
			  $('body, html').animate({ scrollTop: $("#confirmarColumna").offset().top-$( window ).height() +($(".content-botones button").height()*2+40)}, 800);

		});



		$( "#apuesta_aleatoria" ).change(function() {

			 var pronostico = new Array();
			  var valor =$("#apuesta_aleatoria").val();

			  borrarBoleto();
			  switch (valor){

			  	case '1':
			  		pronostico = generaApuesta(6);
				break;

			  	case '2':
			  		pronostico = generaApuesta(5);
				break;

			  	case '3':
			  		pronostico = generaApuesta(7);
				break;

			  	case '4':
			  		pronostico = generaApuesta(8);
				break;

			  	case '5':
			  		pronostico = generaApuesta(9);
				break;

			  	case '6':
			  		pronostico = generaApuesta(10);
				break;

			  	case '7':
			  		pronostico = generaApuesta(11);
			  	break;
			  }



			  $("#pronostico").val(pronostico.toString());

		});

	$('body').delegate('#limpiarBoleto', 'click', function() {
		  borrarBoleto();
	});






	$('body').delegate('#confirmarColumna', 'click', function(event) {

		event.preventDefault();
	    centrarVentanaEmergente();
		var pronostico = $("#pronostico").val().split(',');
		if(esApuestaOK()){
			ga('send', 'event', 'PrimitivaApuesta', 'Pronosticos','AñadirBloque');
			if(pronostico=='' || pronostico.length==6){
				confirmaColumna();
			}else{
				confirmaColumna();
			}
		}
		else{
			ga('send', 'event', 'PrimitivaApuesta', 'Pronosticos','ErrorApuestaIncorrecta');
			$("#p_opcion").html(WJ1002);

			error();
		}

	  });


	$( "#comprarApuesta" ).click(function() {
		  confirmaColumna();
	});


	$('body').delegate('#botonOkOpcion', 'click', function(event) {

		$("#option_pop_up").addClass("hidden");


		var accion = $("#option_pop_up").attr("accion");


		if(accion=="joker"){
			eliminarJoker();
		}
		if(accion=="columna"){
			columnaBorrar++;
			eliminarColumna(columnaBorrar);
		}
		if(accion=="borrarTodo"){
			eliminarTodo();
		}
		if(accion=="confirmaColumna"){
			confirmaColumna();
		}

		 event.stopPropagation();
	  });

	$('body').delegate('#botonCancelarOpcion', 'click', function(event) {

		$("#option_pop_up").addClass("hidden");

	  });

	$('body').delegate('#eliminarJoker', 'click', function(event) {


		if ($("#option_pop_up").length > 0){

			  centrarVentanaEmergente();
			  $("#option_pop_up").removeClass("hidden");
				$("#botonesConfirm").removeClass("hidden");
			     $("#option_pop_up").attr("accion","joker");

				$("#p_opcion").html(WJ1010);

				 event.stopPropagation();
		}




	  });


	$('body').delegate('#botonError', 'click', function() {

		$("#option_pop_up").addClass("hidden");

		});
	function error(){

		$("#option_pop_up").removeClass("hidden");
		$("#botonesConfirm").addClass("hidden");
		$("#botonesErrorOK").removeClass("hidden");

	}


	$('body').delegate('.eliminar.bloque','click',function(event) {
		ga('send', 'event', 'PrimitivaApuesta', 'Pronosticos','EliminarBloque');
		 centrarVentanaEmergente();

		columnaBorrar = $( ".eliminar.bloque" ).index( this );
		$("#option_pop_up").removeClass("hidden");
		$("#botonesConfirm").removeClass("hidden");

		$("#option_pop_up").attr("accion","columna");
		$("#p_opcion").html(WJ1010);
		 event.stopPropagation();

	  });



	$('body').delegate('.botonBoleto', 'click', function() {
		 var pronostico = new Array();
		 var bloquear=false;
		 var valor =$("#tipoPrimitiva").val();
		  $("#automatica").val("false");
		  switch (valor){

		  	case '1':
		  		var arr = [ 6 ];
			break;

		  	case '2':
		  		var arr = [5,7,8,9,10,11 ];
			break;

		  }

		 if ($("#pronostico").length > 0){
			 if($("#pronostico").val()!=""){
				 pronostico = $("#pronostico").val().split(',');
				 var columna = document.getElementById("columna").getAttribute("value");
				 if(valor==1){
					 if((pronostico.length >=6)&&(!$(this).hasClass('marcado'))){
		   				 bloquear=true;
		   			 }
		   			 else{
		   				 bloquear=false;
		   			 }
				 }

			 }
		 }
		if(bloquear==false){
		if($(this).hasClass('marcado')){
		  pronostico.splice(pronostico.indexOf($(this).val()), 1);
			 $(this).removeClass('marcado');
		 $(this).addClass('noMarcado');
	 	}else{
		 	if(pronostico==null || pronostico.length<11){
		 		pronostico.push($(this).val());
		 		$(this).addClass('marcado');
		 		$(this).removeClass('noMarcado');
		 	}
		}
		}
		pronostico.sort(function(a,b){return a-b});
		if ($("#pronostico").length > 0){
				$("#pronostico").val(pronostico.toString());
		}
	  });

	$('body').delegate('#confirmarJokerAjax', 'click', function(event) {
		ga('send', 'event', 'PrimitivaApuesta', 'Pronosticos','AñadirJoker');
		  centrarVentanaEmergente();
		confirmarJoker();

	  });



	$('body').delegate('#boton_diaria', 'click', function() {

		ga('send', 'event', 'PrimitivaApuesta', 'Sorteo ',$('#boton_diaria').val());

		if($('#boton_diaria').hasClass('tabs_inactive_left')){
			 $('#boton_diaria').removeClass('tabs_inactive_left');
			 $('#boton_diaria').addClass('tabs_active_left');
			 $("#boton_diaria").prepend("<img src='/f/loterias/estaticos/imagenes/saga/ico_success.png' alt='Icono confirmaci&oacute;n'/>");
			 $('#boton_semanal').removeClass('tabs_active_right');
			 $('#boton_semanal').addClass('tabs_inactive_right');

			 $("button#boton_semanal > img").remove();
			 var urlPaso1Compra =  $("#urlPaso1Compra").val();



				 if ($("#accion").length > 0){
					$("#accion").val("paso1.sorteo");
				}
				var tipoPrimitivaSeleccionado = $('#tipoPrimitiva').val();
			  var parametros = {
						 "sorteo" : "DIARIA",
						 "accionController" : "paso1.sorteo",
				   };
			  $.ajax({
			  	    data:  parametros,
			    	url:urlPaso1Compra,
			    	type: "POST",
			    	dataType:"html",
			    	cache: false,
			    	beforeSend: function() {

			    		$(".velo").toggleClass("hidden");
			    		$(".cargando").toggleClass("hidden");

			    	},

			    	success: function(salida) {

			    		  $('#recargaZonaJuego').html(salida);
			    		 comprobarYcambiarAmultiple(tipoPrimitivaSeleccionado);
			    	}
			    });
			 }

	});



	$('body').delegate('#boton_semanal', 'click', function() {

		ga('send', 'event', 'PrimitivaApuesta', 'Sorteo ','Semanal');

		if($('#boton_semanal').hasClass('tabs_inactive_right')){
			 $('#boton_semanal').removeClass('tabs_inactive_right');
			 $('#boton_semanal').addClass('tabs_active_right');
			 $("#boton_semanal").prepend("<img src='/f/loterias/estaticos/imagenes/saga/ico_success.png' alt='Icono confirmaci&oacute;n'/>");
			 $('#boton_diaria').removeClass('tabs_active_left');
			 $('#boton_diaria').addClass('tabs_inactive_left');
			 var urlPaso1Compra = $("#urlPaso1Compra").val();
			 $("button#boton_diaria > img").remove();


				if ($("#accion").length > 0){
					$("#accion").val("paso1.sorteo");
				}
				var tipoPrimitivaSeleccionado = $('#tipoPrimitiva').val();
				var parametros = {
						 "sorteo" : "SEMANAL",
						 "accionController" : "paso1.sorteo",
			   };
			  $.ajax({
			  	    data:  parametros,
			    	url:urlPaso1Compra,
			    	type: "POST",
			    	dataType:"html",
			    	cache: false,
			    	beforeSend: function() {
			    		$(".velo").toggleClass("hidden");
			    		$(".cargando").toggleClass("hidden");

			    	},
			    	success: function(salida) {

			    		 $('#recargaZonaJuego').html(salida);
			    		 comprobarYcambiarAmultiple(tipoPrimitivaSeleccionado);
			    	}
			    });
			 }

	});


	$('body').delegate('#botonErrorApuestaInvalida', 'click', function() {
		  $('#option_pop_up_apuesta_invalida').addClass('hidden');
	});


});



  function generaApuesta(numero){

	  $("#automatica").val("true");

	  var i = 0;
	  var pronostico = new Array();


		 if($("#pronostico").val()!=""){
			 var coincidencias = $("#pronostico").val().match('=');
			 var numcars = coincidencias ? coincidencias.length : 0;

			 if(numcars>1){
				 pronostico = $("#pronostico").val().split(',');
			 }
		 };
	  var valor;

	  for(i=0;i<numero;i++){
		  var salir=false;
		  while(salir!=true){


		  	valor =  calAleatorio ( 1 , totalNumero  );


		  	if(pronostico.indexOf(valor) == -1){
		  		pronostico[i] = valor;

		  		salir=true;
		  	}
	  	  }
		  var elemento = document.getElementById("boton_" + pronostico[i]);
		  elemento.removeAttribute('class');
		  elemento.setAttribute('class','botonBoleto marcado');
	  }
	  pronostico.sort(function(a,b){return a-b});
	  return(pronostico);
  }


  function confirmarJoker(){

			 var urlAcccionValidar = $("#urlAcccionValidar").val();

			 if ($("#accion").length > 0){
					$("#accion").val("primitiva.joker");

				}

			  if(existenPronosticos()){


			  var parametros = {
						 "joker" : true,
						 "action" : "primitiva.joker",
				   };
			  $.ajax({
				  	    data:  parametros,

				    	url:urlAcccionValidar,
				    	type: "POST",
				    	beforeSend: function() {
				    		var altoColumna= $( '#columna_boleto' ).height();
				    		$( '#columna_boleto' ).height(altoColumna);
				    		$(".velo").toggleClass("hidden");
				    		$(".cargando").toggleClass("hidden");
				    		},
				    	success: function(salida) {
				    		var altoColumna= $( '#columna_boleto' ).height();
				    		$( '#columna_boleto' ).height(altoColumna);

				    		 $('#recargaZonaJuego').html(salida);
				    		 if($(".content-botones button").length > 0){
				    			 $('body, html').animate({ scrollTop: $("#botonSiguiente").offset().top-$( window ).height() +($(".content-botones button").height()*2)}, 800);
				    		 } else {
				    			 $('body, html').animate({ scrollTop: $("#recargaZonaJuego").offset().top-$( window ).height() +($(".content-botones button").height()*2+20)}, 800);
				    		 }
				    	}

				    });
			  }
			  else{
				  $("#p_opcion").html(WJ1004);

				  $("#option_pop_up").removeClass("hidden");
				  $("#botonesErrorOK").removeClass("hidden");
				  $("#botonesConfirm").addClass("hidden");
				  controlRefresco=1;
			  }




  }




  function confirmaColumna(){
		 if ($("#accion").length > 0){
				$("#accion").val("primitiva.valida");
			}
		 if(esApuestaOK()){
			 var urlAccion = $("#urlAcccionValidar").val();
			 var sorteoSeleccionado;
			 if($('#boton_diaria').hasClass('tabs_active_left')){
				 sorteoSeleccionado = "DIARIA";
			 }else{
				 sorteoSeleccionado = "SEMANAL";
			 }
			 var parametros = {

					 "pronostico" : $("#pronostico").val(),
					 "automatica" : $("#automatica").val(),
					 "action" : "primitiva.valida",
					 "sorteo" : sorteoSeleccionado

			   };
			 $.ajax({
			  	    data:  parametros,

			    	url:urlAccion,
			    	type: "POST",
			    	beforeSend: function() {
			    		var altoColumna= $( '#columna_boleto' ).height();
			    		$( '#columna_boleto' ).height(altoColumna);
			    		$(".velo").toggleClass("hidden");
			    		$(".cargando").toggleClass("hidden");
			    		},
			    	success: function(salida) {
			    		 $('#recargaZonaJuego').html(salida);
			    		 if($(".content-botones button").length > 0){
			    			 $('body, html').animate({ scrollTop: $("#botonSiguiente").offset().top-$( window ).height() +($(".content-botones button").height()*2+20)}, 800);
			    		 } else {
			    			 $('body, html').animate({ scrollTop: $("#recargaZonaJuego").offset().top-$( window ).height() +($(".content-botones button").height()*2+20)}, 800);
			    		 }
			    	}
			    });
		 }
		 else{
			  $("#p_opcion").html(WJ1002);
			  error();
			  controlRefresco=1;
		 }



  }

function existenPronosticos(){
	  columnas = $("#columna").val();

	  if(columnas>=1){
		  return true;
	  }
	  else{
		  return false;
	  }
}
  function esApuestaOK(pronositico){
	  var pronostico = $("#pronostico").val().split(',');
	  var tamanoPronostico = pronostico.length;



	  columnas = $("#columna").val();

	  var arr = new Array();
	  var valor =$("#tipoPrimitiva").val();


	 		  switch (valor){

	 		  	case '1':
	 		  		 arr = [ 6 ];
	 			break;

	 		  	case '2':
	 		  		 arr = [5,7,8,9,10,11 ];
	 			break;

	 		  }



	 		 if  ($.inArray(parseInt(parseInt(pronostico.length)), arr)==-1) {
				 return false;
			 }


	  if(columnas>=1){
		  if(tamanoPronostico==6){
			  return true;
		  }
		  else{
			  return false;
		  }
	  }else{

		  if(tamanoPronostico<=11 && tamanoPronostico>=5){
			  return true;
		  }
		  else{
			  return false;
		  }
	  }
  }

  function borrarBoleto(){
	  $('button[name=botonBoleto]').removeClass('marcado').addClass('noMarcado');
	  $('button[name=botonBoletoCaballos]').removeClass('marcado').addClass('noMarcado');
	  $("#pronostico").val("");
	  $("#numeros").val("");
	  $("#caballos").val("");

  }

  function borrarBoleto() {

  	var i = 0;


  	var valor = $("#gAleatoria").val();
  	$('button[name=botonBoleto]').removeClass('marcado').addClass('noMarcado');
  	$('button[name=botonBoletoClave]').removeClass('marcado').addClass('noMarcado');

  	if ($("#pronostico").val("") != "") {
  		$("#numeros").val("");
  	} else {
  		$("#numeros").val("");
  		$("#clave").val("");
  	}

  }

  function eliminarColumna(columna)
  {


			 controlRefresco = 0;
			 $("#pronostico").val("");
			      var eliminarColumnaURL = $("#urlAcccionValidar").val();
				 var parametros = {
						 "columna" : columna,
						 "action" : "primitiva.borrarColumna",
				   };

			  $.ajax({
				  	    data:  parametros,
				    	url:eliminarColumnaURL,
				    	type: "POST",
				    	beforeSend: function() {
				    		var altoColumna= $( '#columna_boleto' ).height();
				    		$( '#columna_boleto' ).height(altoColumna);
				    		$(".velo").toggleClass("hidden");
				    		$(".cargando").toggleClass("hidden");
				    		},
				    	success: function(salida) {

				    		$('#recargaZonaJuego').html(salida);
				    		$(".velo").toggleClass("hidden");
				    		$(".cargando").toggleClass("hidden");
				    		jQuery('body, html').animate({ scrollTop: jQuery("#recargaZonaJuego").offset().top -43}, 800);
				    	},

				    	error: function() {

				    	}

				    });

  }
  function eliminarTodo()
  {

			 controlRefresco = 0;
			 var tipoPrimitivaEliminarTodo = $('#tipoPrimitivaEliminarTodo').val();
			 if ($("#accion").length > 0){
					$("#accion").val("primitiva.limpiar");
				}
			 var urlAccion = $("#urlAcccionValidar").val();
			  var parametros = {
						 "pronostico" : $("#pronostico").attr("value"),
						 "tipoPrimitiva" : $("#tipoPrimitiva").attr("value"),
						 "action" : "primitiva.limpiar",
						 "tipoPrimitivaEliminarTodo" :  tipoPrimitivaEliminarTodo

				   };

			  $.ajax({
			  	    data:  parametros,
			    	url:urlAccion,
			        cache: false,
			    	type: "POST",
			    	beforeSend: function() {
			    		var altoColumna= $( '#columna_boleto' ).height();
			    		$( '#columna_boleto' ).height(altoColumna);

			    		$(".velo").toggleClass("hidden");
			    		$(".cargando").toggleClass("hidden");
			    	},
			    	success: function(salida) {

		    		 $('#recargaZonaJuego').html(salida);

		    		 comprobarYcambiarAmultiple(tipoPrimitivaEliminarTodo);
		    		 jQuery('body, html').animate({ scrollTop: jQuery("#recargaZonaJuego").offset().top -43}, 800);
			    	},

			    	error: function() {

						$('#tipoPrimitivaEliminarTodo').val('1');
			    	}
			 });

  }


  function comprobarYcambiarAmultiple(tipoPrimitivaEliminarTodo){
  	if(tipoPrimitivaEliminarTodo == 'multipleTab' || tipoPrimitivaEliminarTodo == '2'){
		$('#tipoPrimitiva').val('2');
		$('#multipleTab').parent().addClass('selected');
		$('#simpleTab').parent().removeClass('selected');
		changeSimpleAndMultipleTabs();
	 }
  }

  function eliminarJoker()
  {


		 var urlAccion = $("#urlAcccionValidar").val();
	   if ($("#joker").length > 0){

			$("#joker").val("false");



		}
  		var parametros = {
			 "joker" : false,
			 "action" : "primitiva.joker",

	   };
	    $.ajax({
	  	data:  parametros,

	    	url:urlAccion,
	    	type: "POST",
	    	beforeSend: function() {


	    		var altoColumna= $( '#columna_boleto' ).height();
	    		$( '#columna_boleto' ).height(altoColumna);

	    		$(".velo").toggleClass("hidden");
	    		$(".cargando").toggleClass("hidden");

	    	},
	    	success: function(salida) {

    		 $('#recargaZonaJuego').html(salida);
    		 jQuery('body, html').animate({ scrollTop: jQuery("#recargaZonaJuego").offset().top -43}, 800);
	    	},


	    });

  }




  function changeSimpleAndMultipleTabs(){
		var valor =$("#tipoPrimitiva").val();

    	borrarBoleto();
	  switch (valor){
	  	case '1':
	  		$("#gAleatoria").addClass("hidden");
	  		$("#textoParaSimples").removeClass("hidden");
	  		$("#contenedorBloqueAleatoria").removeClass("multiple");
		break;
	  	case '2':
	  		$("#gAleatoria").removeClass("hidden");
	  		$("#textoParaSimples").addClass("hidden");
	  		$("#contenedorBloqueAleatoria").addClass("multiple");
		break;

	  }

	}


  function mostrarErrorFormatoFavorita(){
	  $("#nombre_favorita").addClass("error");
	  $("#txt_error_favorita").removeClass("hidden");
	  $("#txt_error_favorita_vacio").addClass("hidden");
	  $("#cruz_error_favorita").removeClass("hidden");
	  $("#cruz_error_favorita").addClass("error");
	  $("#nombre_apuesta").focus();
}
  function mostrarErrorFormatoFavoritaVacio(){
	  $("#nombre_favorita").addClass("error");
	  $("#txt_error_favorita_vacio").removeClass("hidden");
	  $("#txt_error_favorita").addClass("hidden");
	  $("#cruz_error_favorita").removeClass("hidden");
	  $("#cruz_error_favorita").addClass("error");
	  $("#nombre_apuesta").focus();
}
