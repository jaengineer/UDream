
$( document ).ready(function() {
	$('body').delegate('#dni', 'focusout', function(event) {
		var dni = $('#dni').val();
		var guionIndex = dni.indexOf("-");
		if (guionIndex == 8){
			dni = dni.substring(0,guionIndex) + dni.substring(guionIndex+1);
			$('#dni').val(dni);
		}
		var tipoDNI = valida_nif_cif_nie(dni);
		//Retorna: 1 = NIF ok, 2 = CIF ok, 3 = NIE ok, -1 = NIF error, -2 = CIF error, -3 = NIE error, 0 = ??? error
		if((dni.length != 9 && dni.length != 10) || tipoDNI <= 0 || tipoDNI == 2){
//			if(!$('#dni_verify').hasClass('error')){
				$('#dni').addClass('error');
				$('#dni_verify').removeClass('ok');
				$('#dni_verify').addClass('error');



				if(dni == ""){
					$('#error_vacio_dni').removeClass('hidden');
					//$('#error_vacio_dni').addClass('valError');
					//$('#error_formato_dni').removeClass('valError');
					$('#error_formato_dni').addClass('hidden');
				} else {
					$('#error_formato_dni').removeClass('hidden');
					//$('#error_formato_dni').addClass('valError');
					//$('#error_vacio_dni').removeClass('valError');
					$('#error_vacio_dni').addClass('hidden');
				}
//			}
		} else {
			$('#dni').removeClass('error');
			$('#dni_verify').removeClass('error');
			$('#dni_verify').addClass('ok');
			//$('#error_formato_dni').removeClass('valError');
			$('#error_formato_dni').addClass('hidden');
			//$('#error_vacio_dni').removeClass('valError');
			$('#error_vacio_dni').addClass('hidden');
			if (tipoDNI == 1){

				$('#tipoDNI').val("nif");
			} else {
				$('#tipoDNI').val("");
			}
		}
		pulsarBoton(event);
	  });



    $('body').delegate('#trt', 'change', function(event) {
        var input = $('#trt');
        //var patron = /\w/;
        var valido = patron_tratamiento.test(input.val());

        if (validarVacio(input, event)){

            validaPatron(input, valido, event);
        }
      });


	$('body').delegate('#correo', 'focusout', function(event) {
		var input = $('#correo');
		input.val($.trim(input.val()));
		var valido = patron_mail_mejorado.test(input.val());
		if (validarVacio(input, event)){
			validaPatron(input, valido, event);
		}
		pulsarBotonCrearCuentaRegistro(event);
	  });

	$('body').delegate('#confirm', 'focusout', function(event) {
		var input = $('#confirm');
		var inputCorreo = $('#correo');
		input.val($.trim(input.val()));
		inputCorreo.val($.trim(inputCorreo.val()));
		var valido = patron_mail_mejorado.test(input.val());
		if (validarVacio(input, event)){
		    if(validaPatron(input, valido, event)){
                validaCampoConfirmacion(input, inputCorreo, event);
            }
		}
		pulsarBotonCrearCuentaRegistro(event);
	  });


    $('body').delegate('#pwd', 'focusout', function(event) {
        var input = $('#pwd');
        var inputConfirm = $('#repeatpwd');
       //var patron = /[0-9a-zA-ZñÑ_$#!¡@\-?¿&]{8,15}$/;
        var valido = patron_password.test(input.val());
        var validoConfirm = patron_password.test(inputConfirm.val());
        if(valido && inputConfirm.val() != null && input.val() == inputConfirm.val() ){
            validaPatron(inputConfirm, validoConfirm, event);
        }
        else if (inputConfirm.val() != "" && input.val() == inputConfirm.val()) {
            validaPatron(inputConfirm, validoConfirm, event);
        }
        if (input.val() != inputConfirm.val() && inputConfirm.val() != "") {
			validaCampoConfirmacion(inputConfirm, input, event);
		}

        if (validarVacio(input, event)){

            if(validaPatron(input, valido, event)){
            	var passValido = false;
            	if ($(".fuerzaPass").size()>0) {
            		passValido = checkform( $(this) , $(".fuerzaPass") );
            	}
            	if (passValido) {
        			quitarError(input, input.next(".verify"));
        		} else{
        			validaPatron(input, false, event);
        		}
            }
        }
        $('#pswd_info').hide();
        pulsarBotonCrearCuentaRegistro(event);
      });

    $('body').delegate('#pwd', "keyup", function(event) {
    	var passValido = false;
    	if ($(".fuerzaPass").size()>0) {
    		passValido = checkform( $(this) , $(".fuerzaPass") );
    	}
    	var input = $(this);
    	var verifyInput = $(this).next(".verify");
    	if (passValido) {
			quitarError(input, verifyInput);
		} else{
			validaPatron(input, false, event);
		}
    });

    $('body').delegate('#repeatpwd', 'focusout', function(event) {
        var input = $('#repeatpwd');
        var inputPwd = $('#pwd');
        var valido = patron_password.test(input.val()) && !inputPwd.hasClass("error");
        if (validarVacio(input, event)){

            if(validaPatron(input, valido, event)){
                validaCampoConfirmacion(input, inputPwd, event);
            }
        }
        pulsarBotonCrearCuentaRegistro(event);
      });

    $('body').delegate('#pregunta', 'focusout', function(event) {
        var input = $('#pregunta');
       // var patron = /["%()+<>\\]/;
        var valido = !patron_pregunta_secreta.test(input.val());
        if(input.val().trim().length>0){
            if (valido){
                valido = (input.val().length >= 4);
            }
        }else{
            valido = false;
        }

        if (validarVacioPreguntaCombo(input, event)){

            validaPatronPreguntaCombo(input, valido, event);
        }
        pulsarBotonCrearCuentaRegistro(event);
      });

    $('body').delegate('#respuesta', 'focusout', function(event) {
        var input = $('#respuesta');
        //var patron = /["%()+<>\\]/;
        var valido = !patron_pregunta_secreta.test(input.val());

        if(input.val().trim().length>0){
            if (valido){
                valido = (input.val().length >= 8);
            }
        }else{
            valido = false;
        }

        if (validarVacio(input, event)){

            validaPatron(input, valido, event);
        }
        pulsarBotonCrearCuentaRegistro(event);
      });

    $('body').delegate('#domicilio', 'focusout', function(event) {
        var input = $('#domicilio');
        $('#domicilio').val($('#domicilio').val().trim());
        //var patron = /["%()+<>\\]/;
        var valido = !patron_domicilio.test(input.val());

        if (validarVacio(input, event)){

            validaPatron(input, valido, event);
        }
        pulsarBotonCrearCuentaRegistro(event);
      });

    $('body').delegate('#cp', 'focusout', function(event) {

        var input = $('#cp');
       // var patron = /\d{5}/;
        var esRegistro = $('#codigoPostal').length > 0;

       if(input.val() == "98000"){
    	   if(esRegistro){
    		   cargarPuntosVentaPorCodigoPostal(input.val());
    	   }

    	   if ($('#cpNoResInput').hasClass("hidden")) {
    		   validaPatron(input, valido, event);
    	   }
       }else{
	        var resPatronCodPostal = patron_cod_postal.test(input.val());
	        var provIndex = $("#provincia").prop('selectedIndex');

	        var provValue =  $("#provincia").val();
	        var cpNoResInputOculta = $('#cpNoResInput').hasClass("hidden");


	        var valido = resPatronCodPostal && provIndex>0  ;

	        if (provValue=="98" && cpNoResInputOculta)  valido=false;

	        if (validarVacio(input, event)){

	            if(validaPatron(input, valido, event) && esRegistro ){
	                $('#codigoPostal').val(input.val());
	                if ( input.val()>=1000 && input.val()<=52999) {
	                		cargarPuntosVentaPorCodigoPostal(input.val());
	                }
	            }
	        }
        }
        pulsarBotonCrearCuentaRegistro(event);
      });

    $('body').delegate('#provincia', 'focusout', function(event) {
        var input = $('#provincia');
        //var patron = /\w/;
        var valido = patron_provincia.test(input.val());

        if (validarVacio(input, event)){

            validaPatron(input, valido, event);
        }
        pulsarBotonCrearCuentaRegistro(event);
      });

    $('body').delegate('#rFiscal', 'focusout', function(event) {
        var input = $('#rFiscal');
        //var patron = /\w/;
        var valido = patron_region_fiscal.test(input.val());

        if (validarVacio(input, event)){

            validaPatron(input, valido, event);
        }
        pulsarBotonCrearCuentaRegistro(event);
      });

    $('body').delegate('#nacionalidad', 'focusout', function(event) {
        var input = $('#nacionalidad');
        //var patron = /\w/;
        var valido = patron_nacionalidad.test(input.val());

        if (validarVacio(input, event)){

            validaPatron(input, valido, event);
        }
        pulsarBotonCrearCuentaRegistro(event);
      });

    $('body').delegate('#idioma', 'focusout', function(event) {
      //  var input = $('#idioma');
        var patron = /\w/;
        var valido = patron_idioma.test(input.val());

        if (validarVacio(input, event)){

            validaPatron(input, valido, event);
        }
        pulsarBotonCrearCuentaRegistro(event);
      });





	$('.information').addClass('hidden');
	$('.triger').click(function(){

		if($(this).parent().parent().hasClass('active')){
			$(this).parent().parent().find('.information').slideUp();
			$(this).parent().parent().removeClass('active');
			$(this).parent().parent().find('.information').addClass('hidden');
			$(this).find('span').css('background-image', 'url(/f/loterias/estaticos/imagenes/saga/ico_accordG_Down.png)');
		}else{
			$(this).parent().parent().addClass('active');
			$(this).parent().parent().find('.information').removeClass('hidden');
			$(this).parent().parent().find('.information').slideDown();
			$(this).find('span').css('background-image', 'url(/f/loterias/estaticos/imagenes/saga/ico_accordG_Up.png)');

		}

		return false;
	});


});




function validarEmail(email) {

	onsole.log(patron_mail.test(email.value));
    //expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( email.value != "" && !patron_mail.test(email.value) ){
        return false;
    }
    return true;
}



function validarMovil(movil) {
	//var expr = /^[6]\d{8}$/;
	if ( movil.value != "" && !patron_movil.test(movil.value) ){
		movil.focus;

	}

}


//Retorna: 1 = NIF ok, 2 = CIF ok, 3 = NIE ok, -1 = NIF error, -2 = CIF error, -3 = NIE error, 0 = ??? error
function valida_nif_cif_nie( a )
{
	var temp = a.toUpperCase();
	var cadenadni = "TRWAGMYFPDXBNJZSQVHLCKE";

	if( temp!= '' )
	{
		if (temp.length == 10 && patron_nie_long_10.test(temp)) {
			temp = temp.substring( 0, 1) + temp.substring(2);
			a = a.substring( 0, 1) + a.substring(2);
		}
		if( ( !/^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$/.test( temp ) && !/^[T]{1}[A-Z0-9]{8}$/.test( temp ) ) && !/^[0-9]{8}[A-Z]{1}$/.test( temp ) )
		{
			return 0;
		}

		if( /^[0-9]{8}[A-Z]{1}$/.test( temp ) )
		{
			posicion = a.substring( 8,0 ) % 23;
			letra = cadenadni.charAt( posicion );
			var letradni = temp.charAt( 8 );
			if( letra == letradni )
			{
				return 1;
			}
			else
			{
				return -1;
			}
		}


		suma = parseInt(a.charAt(2))+parseInt(a.charAt(4))+parseInt(a.charAt(6));

		for( var i = 1; i < 8; i += 2 )
		{
			temp1 = 2 * parseInt( a.charAt( i ) );
			temp1 += '';
			temp1 = temp1.substring(0,1);
			temp2 = 2 * parseInt( a.charAt( i ) );
			temp2 += '';
			temp2 = temp2.substring( 1,2 );
			if( temp2 == '' )
			{
				temp2 = '0';
			}

			suma += ( parseInt( temp1 ) + parseInt( temp2 ) );
		}
		suma += '';
		n = 10 - parseInt( suma.substring( suma.length-1, suma.length ) );

		if( /^[KLM]{1}/.test( temp ) )
		{
			if( a.charAt( 8 ) == String.fromCharCode( 64 + n ) )
			{
				return 1;
			}
			else
			{
				return -1;
			}
		}

		if( /^[ABCDEFGHJNPQRSUVW]{1}/.test( temp ) )
		{
			temp = n + '';
			if( a.charAt( 8 ) == String.fromCharCode( 64 + n ) || a.charAt( 8 ) == parseInt( temp.substring( temp.length-1, temp.length ) ) )
			{
				return 2;
			}
			else
			{
				return -2;
			}
		}

		if( /^[T]{1}[A-Z0-9]{8}$/.test( temp ) )
		{
			if( a.charAt( 8 ) == /^[T]{1}[A-Z0-9]{8}$/.test( temp ) )
			{
				return 3;
			}
			else
			{
				return -3;
			}
		}

		if( /^[XYZ]{1}/.test( temp ) )
		{
			temp = temp.replace( 'X','0' );
			temp = temp.replace( 'Y','1' );
			temp = temp.replace( 'Z','2' );
			pos = str_replace(['X', 'Y', 'Z'], 0, ['0','1','2'], temp).substring(0, 8) % 23;

			if( a.toUpperCase().charAt( 8 ) == cadenadni.substring( pos, pos + 1 ) )
			{
				return 3;
			}
			else
			{
				return -3;
			}
		}
	}

	return 0;
}

function str_replace( search, position, replace, subject )
{
	var f = search, r = replace, s = subject, p = position;
	var ra = r instanceof Array, sa = s instanceof Array, f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;

	while( j = 0, i-- )
	{
		if( s[i] )
		{
			while( s[p] = s[p].split( f[j] ).join( ra ? r[j] || "" : r[0] ), ++j in f){};
		}
	};

	return sa ? s : s[0];
}








function mostrarMensajesFormatoYVacio(valido,input,event){
	var valInput = input.val();
	var verifyInput = input.next(".verify");
	if ( input.val() == null || valInput == "" || !valido){
		input.addClass('error');
		verifyInput.removeClass('ok');
		verifyInput.addClass('error');
		if(input.val() == null || valInput == ""){
			//verifyInput.next('.vacio').addClass('valError');
			verifyInput.next('.vacio').removeClass('hidden');
			verifyInput.next('.vacio').next('.formato').addClass('hidden');
			//verifyInput.next('.vacio').next('.formato').removeClass('valError');
		} else {
			verifyInput.next('.vacio').next('.formato').removeClass('hidden');
			//verifyInput.next('.vacio').next('.formato').addClass('valError');
			//verifyInput.next('.vacio').removeClass('valError');
			verifyInput.next('.vacio').addClass('hidden');
		}
		event.preventDefault();
		event.stopPropagation();
	} else {
		input.removeClass('error');
		verifyInput.addClass('ok');
		verifyInput.removeClass('error');
		//verifyInput.next('.vacio').removeClass('valError');
		verifyInput.next('.vacio').addClass('hidden');
		//verifyInput.next('.vacio').next('.formato').removeClass('valError');
		verifyInput.next('.vacio').next('.formato').addClass('hidden');
	}
}
function mostrarMensajesFormato(valido,input,event){
	var valInput = input.val();
	var verifyInput = input.next(".verify");
	if ( input.val() == null || !valido){
		input.addClass('error');
		verifyInput.removeClass('ok');
		verifyInput.addClass('error');
		if(input.val() == null || valInput == ""){
			//verifyInput.next('.vacio').addClass('valError');
			verifyInput.next('.vacio').removeClass('hidden');
			verifyInput.next('.vacio').next('.formato').addClass('hidden');
			//verifyInput.next('.vacio').next('.formato').removeClass('valError');
		} else {
			verifyInput.next('.vacio').next('.formato').removeClass('hidden');
			//verifyInput.next('.vacio').next('.formato').addClass('valError');
			//verifyInput.next('.vacio').removeClass('valError');
			verifyInput.next('.vacio').addClass('hidden');
		}
		event.preventDefault();
		event.stopPropagation();
	} else {
		input.removeClass('error');
		verifyInput.addClass('ok');
		verifyInput.removeClass('error');
		//verifyInput.next('.vacio').removeClass('valError');
		verifyInput.next('.vacio').addClass('hidden');
		//verifyInput.next('.vacio').next('.formato').removeClass('valError');
		verifyInput.next('.vacio').next('.formato').addClass('hidden');
	}
}


function reloadCaptcha(){
    var d = new Date();
    $("#captcha_image").attr("src", "captcha2?"+d.getTime());
}

function  validaPatron(input, resultadoValido, event){
    var valido=true;
    var verifyInput = input.next(".verify");
    if (!resultadoValido){
        ponerXyError(input,verifyInput);
        verifyInput.next('.mensajeError').text($('#W02003').val());
        valido = false;
    } else {
        quitarError(input,verifyInput);
    }
    return valido;
}
function  validarVacio(input, event){
    var valInput = input.val();
    var valido=true;
    var verifyInput = input.next(".verify");

    if ( input.val() == null || valInput == ""){
        valido = false;
        ponerXyError(input,verifyInput);
        verifyInput.next('.mensajeError').text($('#W02007').val());
    } else {
        quitarError(input,verifyInput);
    }
    return valido;
}

function  validaCampoConfirmacion(inputConfirm, input, event){
    var valido=true;
    var verifyInput = inputConfirm.next(".verify");
    if (inputConfirm.val() != input.val()){
        ponerXyError(inputConfirm,verifyInput);
        verifyInput.next('.mensajeError').text($('#WJ3011').val());
        valido = false;
    } else {
        quitarError(inputConfirm,verifyInput);
    }
    return valido;
}

function ponerXyError(input,verifyInput) {
    input.addClass('error');
    verifyInput.removeClass('ok');
    verifyInput.addClass('error');
    //verifyInput.next('.mensajeError').addClass('valError');
    verifyInput.next('.mensajeError').removeClass('hidden');
}

function quitarError(input,verifyInput) {
    input.removeClass("error");
    verifyInput.removeClass('error');
    verifyInput.addClass('ok');
    verifyInput.next('.mensajeError').addClass('hidden');
    //verifyInput.next('.mensajeError').removeClass('valError');
}

function  validaPatronPreguntaCombo(input, resultadoValido, event){
    var valido=true;
    var verifyInput = input.next(".verify");
    var mensajeErrorPregunta = $('#mensajeErrorPregunta');
    if (!resultadoValido){
        ponerXyErrorPreguntaCombo(input,verifyInput);
        mensajeErrorPregunta.text($('#W02003').val());
        valido = false;
    } else {
        quitarErrorPreguntaCombo(input,verifyInput);
    }
    return valido;
}

function  validarVacioPreguntaCombo(input, event){
    var valInput = input.val();
    var valido=true;
    var verifyInput = input.next(".verify");
    var mensajeErrorPregunta = $('#mensajeErrorPregunta');

    if ( input.val() == null || valInput == ""){
        valido = false;
        ponerXyErrorPreguntaCombo(input,verifyInput);
        mensajeErrorPregunta.text($('#W02007').val());
    } else {
    	quitarErrorPreguntaCombo(input,verifyInput);
    }
    return valido;
}

function ponerXyErrorPreguntaCombo(input,verifyInput) {
	var mensajeErrorPregunta = $('#mensajeErrorPregunta');

    input.addClass('error');
    input.prev('#select_preg_secreta').addClass('error');
    verifyInput.removeClass('ok');
    verifyInput.addClass('error');
    //mensajeErrorPregunta.addClass('valError');
    mensajeErrorPregunta.removeClass('hidden');
}

function quitarErrorPreguntaCombo(input,verifyInput) {
	var mensajeErrorPregunta = $('#mensajeErrorPregunta');

    input.removeClass("error");
    input.prev('#select_preg_secreta').removeClass("error");
    verifyInput.removeClass('error');
    verifyInput.addClass('ok');
    mensajeErrorPregunta.addClass('hidden');
    //mensajeErrorPregunta.removeClass('valError');
}

function pulsarBotonCrearCuentaRegistro(event) {
    if (event.relatedTarget!=null) {

        var x = $(event.relatedTarget);
         if (x.attr("id")=="crearcuenta")
         {
        	 x.trigger("click");
         }
    }
  }
