

//--------------INICIO CMS--------------//

$(document).ready(function() {

		var owl = $('#owl-demo');
		var owlEncontrado = owl.length;
		var nItems = $('div.item').length;
		if (owlEncontrado > 0) {
			owl.owlCarousel({
				items : nItems,
				itemsDesktop : [ 1000, 5 ],
				itemsDesktopSmall : [ 900, 3 ],
				itemsTablet : [ 600, 2 ],
				itemsMobile : false,
				pagination : true,
				paginationNumbers : false,
				responsiveBaseWidth : '#owl-demo'
			});

			$('.next').click(function() {
				owl.trigger('owl.next');
			});
			$('.prev').click(function() {
				owl.trigger('owl.prev');
			});
		}

});


//--------------FIN CMS--------------//


    $(document).ready(function() {

      $("#owl-demo-detalle").owlCarousel({

          navigation : true, // Show next and prev buttons
          slideSpeed : 300,
          paginationSpeed : 400,
          rewindNav : false,
          pagination : false,
          singleItem:true
      });

      // Si pulsamos anterior o siguiente, cerramos los desplegables
      // de rifas si alguno estuviera abierto
      $('.owl-prev').click(function() {
    	  $( "div.listadoGanadores a.trigger").not(".active").trigger( "click" );
      });

      $('.owl-next').click(function() {
			$( "div.listadoGanadores a.trigger" ).not(".active").trigger( "click" );
      });


    });
