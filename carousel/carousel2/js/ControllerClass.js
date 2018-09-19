/*
* Berruezo controller
*
* The controller is responsible for instantiating
* the application,
* controlling the application state, and managing keyboard events
*/

var controller;

// Creamos una instancia del objeto prototipo controller
window.onload = function(){
	console.log('window onload cargado inicializamos controller');
	controller = new Controller(null);
}

window.onresize = function(){
   	// Screen
    console.log("activamos resize");
	controller.screenWidth  = window.innerWidth;
    controller.screenHeight = window.innerHeight;
    controller.configuration();
}


// Inicalizamos jQuery
$(document).ready(function(){
	console.log('jQuery inicializado');
});

/*
 * Creamos nuestro controlador
 * Nuestras variables
 * Y nuestros estados
 */
function Controller(canvasId){

	this.iniciado = false;

	this.contador = 0;

	console.log('Estamos en controller class');
	
	// Screen
	this.screenWidth  = $(window).width();
	this.screenHeight = $(window).height();
	/*
	console.log("El width es: "+this.screenWidth);
    console.log("El height es: "+this.screenHeight);
	console.log("El width es: "+window.innerWidth);
    console.log("El height es: "+window.innerHeight);
	*/
	// Mouse
	this.mouseX = 0;
	this.mouseY = 0;

	// Activar panImage
	this.activarPanImageScroll 	 = false;
	this.activarPanImagePanel	 = false;
	this.panImageActivado    	 = false;
	// Mover Imagen Detalle ejeX y ejeY
	this.panImageX				 = false;
    this.panImageY				 = false;

	// Contar las fotos porque el jssor las duplica
	this.totalFotos   = 0;
	
	// Movil/Tablet/Desktop
	this.versionMobile 		 = false;
	
	// Navegacion clicada imagen
	this.idSeleccionado 	 		 = -1;
	this.estadoOcupado       		 = false;
    this.idAnteriorSeleccionado  	 = -1;
	this.idSeleccionadoMenuColeccion = -1;
	this.marcaSeleccionada 			 = "";
	this.rutaFotoSeleccionada		 = "";

	// Objeto Application
	this.objetoImagenesApplication;
	this.imagenesAplicacion = new Array();

	// Vector proyectos
	this.vectorProyectos = new Array();
	
	// Abierto | Cerrado Panel
	this.estadoPanelLateralAbierto  = false;
	
	// Abierto | Cerrado Informaci�n eCommerce
	this.estadoPanelInformacionAbierto = false;

	// Posicion actual de la barra scroll fotos derecha
	this.posYActualBarra		= 0;

	// Detectar Dispositivo
	//this.versionMobile = detectarDispositivo();
	
	this.states = {
		INIT: "INIT",
		APARCERLOADING: "APARCERLOADING",
		LOADINGINIT: "LOADINGINIT",
		FINALIZARLOADING: "FINALIZARLOADIN",
		MOVERDETALLE: "MOVERDETALLE",
		FINALIZARMOVERDETALLE: "FINALIZARMOVERDETALLE",
		DETALLE: "DETALLE",
		VOLVERDETALLE: "VOLVERDETALLE",
		MOVERVOLVERDETALLE: "MOVERVOLVERDETALLE",
		FINALIZARMOVERVOLVERDETALLE: "FINALIZARMOVERVOLVERDETALLE",
		LOADINGDETALLE: "LOADINGDETALLE",
		PANELABIERTO:"PANELABIERTO",
	}
	
	this.estado = this.states.INIT;
	
	this.posiciones = {
			INIT: 0,
			DETALLE: 0,
	}

	// Referente al menu colecciones
    this.vectorIndicesColeccion = new Array();
	
	var that = this;
		
	// Llamada a funciones
	this.configurationLoading();
	this.saveImagesApplicationDesktop();
}


/*
 * Configuramos el loading
 * Centrado en la pantalla
 */
Controller.prototype.configurationLoading = function(){
	
	var that = this;
	console.log('width: '+that.screenWidth);
	$('#loading').css('left',that.screenWidth / 2 - $('#loading').width() +'px');
	$('#loading').css('top',that.screenHeight / 2 - $('#loading').height() +'px');

}


/*
 * Cargamos las imágenes de la aplicación con sus rutas en el objeto
 * imagenesApplication que lo tenemos dentro de la libreria utils
 * Luego así podremos hacer el loading
 */

Controller.prototype.saveImagesApplicationDesktop = function(){
	
	var rutaServidor  = 'http://';
	var rutaLocal     = 'http://localhost/javascript/berruezo/';
		
	var that = this;

	this.objetoImagenesApplication = new imagenesApplicacion();
	//this.objetoImagenesApplication.imgApplicacion[0]  = rutaLocal + '712.gif'; 
	this.objetoImagenesApplication.imgApplicacion[0]  = rutaLocal + 'btnVer.png'; 
	this.objetoImagenesApplication.imgApplicacion[1]  = rutaLocal + 'btnVerHover.png'; 
	//this.objetoImagenesApplication.imgApplicacion[2]  = rutaLocal + 'btnContactoHover.png';
	this.objetoImagenesApplication.imgApplicacion[2]  = rutaLocal + 'fondo.png';
	this.objetoImagenesApplication.imgApplicacion[3]  = rutaLocal + 'letras.png';
	this.objetoImagenesApplication.imgApplicacion[4]  = rutaLocal + 'logo.png';
	this.objetoImagenesApplication.imgApplicacion[5]  = rutaLocal + 'menu.png';
	this.objetoImagenesApplication.imgApplicacion[6]  = rutaLocal + 'menuHover.png';
	this.objetoImagenesApplication.imgApplicacion[7]  = rutaLocal + 'triangulo.png';
	this.objetoImagenesApplication.imgApplicacion[8]  = rutaLocal + 'trianguloVolver.png';
	this.objetoImagenesApplication.imgApplicacion[9] = rutaLocal + 'volver.png';
	this.objetoImagenesApplication.imgApplicacion[10] = rutaLocal + 'volverHover.png';
	console.log('Funció saveImagesApplicationDesktop');

	// Cargamos las imagenes que tenemos en nuestro objeto
	that.loadImagesApplicationDesktop();

}

/*
 * Cargamos las imagenees que tenemos
 * En el objeto application
 */
Controller.prototype.loadImagesApplicationDesktop = function(){
	var that 		     			= this;
	var totalImagenesApplication    = 0;
	var totalImagenesB				= 0;
	var totalImagenesScroll			= 0;
	var contadorImagenes 			= 0;
	var img 			 			= 0;
	var ruta						= 'http://localhost/javascript/berruezo/';
	// Images Application
	for (key in this.objetoImagenesApplication.imgApplicacion){
		if (this.objetoImagenesApplication.imgApplicacion != ''){
			totalImagenesApplication++;
		}
	}
	// Images letter B
	for (key in this.objetoImagenesApplication.imgLetra){
		if (this.objetoImagenesApplication.imgLetra != ''){
			totalImagenesB++;
		}
	}
	// Images Scroll
	for (key in this.objetoImagenesApplication.imgScroll){
		if (this.objetoImagenesApplication.imgScrol != ''){
			totalImagenesScroll++;
		}
	}
	console.log('Imagenes Scroll: '+totalImagenesScroll+' totalImagenesB '+totalImagenesB+' totalImagenesApplication: '+totalImagenesApplication);
	// Load Images Application
	for (key in this.objetoImagenesApplication.imgApplicacion){
		if (this.objetoImagenesApplication.imgApplicacion != ''){
			img        = new Image();
			img.onload = function(){
			}
			img.onError = function(){
				console.log('Ha habido un error');
			}
			img.src = this.objetoImagenesApplication.imgApplicacion[key];
			//console.log(' contadorImagenes: '+contadorImagenes+' objeto: '+this.objetoImagenesApplication.imgApplicacion[key]);
			contadorImagenes++;
			if (contadorImagenes > totalImagenesApplication - 1) {
				//that.initGame();
				//that.detectarMobile();
				console.log('Fin imagenes Application'+totalImagenesApplication+' contadorImagenes: '+contadorImagenes);
			}
		}// End if
	}
	contadorImagenes = 0;
	
	// Imagenes Letra
	for (key in this.objetoImagenesApplication.imgLetra){
		
		if (this.objetoImagenesApplication.imgLetra != ''){
			
			img        = new Image();
			img.onload = function(){
			
			}
			
			img.src = ruta + this.objetoImagenesApplication.imgLetra[key].img;
		
			//console.log(' conadorImagenes: '+contadorImagenes+' objeto: '+this.objetoImagenesApplication.imgLetra[key].img);
			
			contadorImagenes++;
			
			if (contadorImagenes > totalImagenesB - 1) {
				//that.initGame();
				//that.detectarMobile();
				console.log('Fin imagenes Letra');
			}
	
		}
		
	}	
	
	contadorImagenes = 0;
	
	// Imagenes Scroll
	for (key in this.objetoImagenesApplication.imgScroll){
		
		if (this.objetoImagenesApplication.imgScroll != ''){
			
			img        = new Image();
			img.onload = function(){
			
			}
			
			img.src = ruta + this.objetoImagenesApplication.imgScroll[key].img;
		
			//console.log(' conadorImagenes: '+contadorImagenes+' objeto: '+this.objetoImagenesApplication.imgScroll[key].img);
		
			contadorImagenes++;
			
			if (contadorImagenes > totalImagenesScroll - 1) {
				that.cssDesktop();
				console.log('Fin imagenes Scroll');
			
			}	
			
			
		}
		
	}	

}

/*
 *  Agregamos la hoja de estilos
 *  Y hacemos load del archivo desktop2.html
 */
Controller.prototype.cssDesktop = function(){
	
	var that = this;
	
	// Cargamos los estilos desktop
	file 	   = location.pathname.split( "/" ).pop();
	link 	   = document.createElement( "link" );
	link.href  = file.substr( 0, file.lastIndexOf( "/" ) ) + "css/desktop2.css";
	link.type  = "text/css";
	link.rel   = "stylesheet";
	link.media = "screen,print";
	document.getElementsByTagName( "head" )[0].appendChild( link );

	console.log('Hola berruezo');

	// Cargamos el codigo html para desktop
	$('.container-fluid').load('desktop2.html', function( response, status, xhr ) {
		
		that.configuration();
		that.addKeyboardListeners();
		
		// Llamadas a funciones
		//leerProyectos();
		//lanzarEventoResize();
		//validaciones();
		 /*
		 that.addKeyboardListeners(); 
		 that.validaciones();
		 */
		 
	});	 

}

/*
 * Centramos todos los objetos en pantalla
 *
 */

Controller.prototype.configuration = function(){
	var that 		 = this;
	var heightScroll = 0;

	// Situamos el btn ver en el centro de la pantalla y escondido
	$('#loading').css('top',that.screenHeight / 2 - ( $('#loading').height() /2) );
	$('#loading').css('left',that.screenWidth / 2 - $('#loading').width() / 2);
	$('#loading').css('display','none');

	$('#contenedor').css('background-image','url('+that.objetoImagenesApplication.imgApplicacion[2]+')');
	$('#contenedor').css('width',that.stageWidth+'px');
	$('#contenedor').css('height',that.stageHeight+'px');

	// Colocamos el btn volver en el bottom y centrado
	$('#volver').css('top',that.screenHeight-40+'px');
	$('#volver').css('left','50%');
	/*$('#volver').css('display','none');*/


	$('#trianguloVolver').css('top',that.screenHeight / 2 - ( $('#trianguloVolver').height() / 2 - 75) );
	$('#trianguloVolver').css('left',that.screenWidth / 2 - $('#trianguloVolver').width() / 2 - 5);
	$('#trianguloVolver').css('display','none');

	// Situamos el loader en medio de la pantalla
	$('#ajaxLoader').css('top',that.screenHeight / 2 - ( $('#ajaxLoader').height() /2));
	$('#ajaxLoader').css('left'	,that.screenWidth / 2 - ( $('#ajaxLoader').width() /2));
	$('#ajaxLoader').css('display','none');


	// Situamos la el contenedor de la letra a la mitad de la pantalla
	$('#contenedorLetra').css('top',that.screenHeight / 2 - $('#contenedorLetra').height() / 2 +'px');
	$('#contenedorLetra').css('left','20px');


	$('#letras').css('top','-20px');
	//$('#letras').css('top',parseInt($('#contenedorLetra').css('top')) + $('#contenedorLetra').height() / 2 - $('#letras').height() / 2);
	$('#letras').css('left',parseInt($('#contenedorLetra').css('left')) + $('#contenedorLetra').width() - 120);

	// Menu
	// Mascara
	$('#contenedorMascara').css('left',$('#contenedorLetra').css('left'));
	$('#contenedorMascara').css('top',that.screenHeight - $('#contenedorMascara').height());

	//$('#colecciones').css('left',screenWidth / 2 - $('#contenedorMascara').width() / 2 + 4 );
	$('#colecciones').css('left',$('#contenedorMascara').css('left'));
	$('#colecciones').css('top',that.screenHeight - ($('#colecciones').height()+110));

	// Posicionamos el icono menu horizontal
	$('#menuLateralIcono').css('left','10px' );
	$('#menuLateralIcono').css('top','20px');

	/*$('#fotoGrande').css('top',that.screenHeight);
	 $('#fotoGrande').attr('src',this.objetoImagenesApplication.imgApplicacion[2]);
	 */
	console.log('Configuration Height: '+that.screenHeight);
    //console.log(this.objetoImagenesApplication.imgApplicacion[2]);

}


/*
 * Creamos los eventos de la aplicación
 *
 */
Controller.prototype.addKeyboardListeners = function(){
	var that 		 		= this;
	var heightScroll 		= 0;
	var barraLateralHeight  = 0;
	console.log('init: '+that.posiciones.INIT);
	// Creamos eventos para Scroll Foto
	$('.contenedorFoto').each(function(index){
		// Calculamos el total de alto
		heightScroll = (index * 70) + (index * 25);
		// Agregamos ID
		$(this).attr('id',index);
		// Ponemos el top (alto) correspondiente para cada imagen scroll
		$(this).css('top',index * 70 + index * 25);
		// Eventos para las imagenes
		$(this).mouseover(function(event){
			event.preventDefault();
			if (that.estado = that.states.INIT){
				//console.log('mouseover');
				TweenLite.to($(this), .5, {scaleX:1.2,left:-25+"px", scaleY:1.2, ease:Expo.easeOut});
			}// End if
		});
		$(this).mouseout(function(event){
			if (that.estado = that.states.INIT){
				event.preventDefault();
				//console.log('mouseout');
				TweenLite.to($(this), .5, {scaleX:1, scaleY:1,left:'0px', ease:Expo.easeOut});
					
			}
		});
        $(this).click(function(event){
            event.preventDefault();
            that.idSeleccionado = index;
            that.marcaSeleccionada = $(this).attr("coleccion");
            that.rutaFotoSeleccionada = $(this).find(".img-responsive").attr("src");
            //that.rutaFotoSeleccionada = $(this).attr("src");
            console.log("El idSeleccionado es: "+that.idSeleccionado);
            console.log("La ruta seleccionada es: "+that.rutaFotoSeleccionada);
            that.moveMedioPantalla();
			/*
			 //console.log('activeTypography'+activeTypography);
			 if (that.estado = that.states.INIT){
			 //cambiarIdAntiguoSeleccionado();
			 console.log('El id es: '+$(this).attr('id'));
			 idSeleccionado = parseInt($(this).attr('id'));
			 //moveScrollClick(event);
			 ponerEstado('typography');
			 }// End if
			 */
        });
	});

	// Apretamos botón volver cuando estamos en detalle
    $('#volver').click(function(){
        console.log("Apretadito 1");
    	that.volver();
    });

	if (heightScroll > this.screenHeight){
		this.activarPanImageScroll 	 = true;
	}// End if
	barraLateralHeight = $('#barraLateralIcono').height();
	if (barraLateralHeight > this.screenHeight){
		this.activarPanImagePanel	 = true;
	}// End if

	// Puesto por mi
	//this.activarPanImagePanel	 = true;

	if (this.activarPanImagePanel || this.activarPanImageScroll){
		that.eventThrowMouse('start');
	}// End if

	$('#barraScroll').css('height',heightScroll+'px');

	console.log('heightScroll: '+heightScroll);
	console.log('screenHeight: '+this.screenHeight);
	console.log('barraLateralHeight: '+barraLateralHeight);
	console.log('activarPanImageScroll: '+this.activarPanImageScroll);
	console.log('activarPanImagePanel: '+this.activarPanImagePanel);

	
	// Creamos eventos para la letra B
	$('[imagenNombre]').each(function(index){
		
		// Ponemos Z-index y id
		//$(this).css({'position': 'absolute', 'z-index':index,'cursor': 'pointer'});
		$(this).css({'z-index':index,'cursor': 'pointer'});
		$(this).attr('id',index);
		
		$(this).mouseover(function(event){
				
				if (that.estado = that.states.INIT){
				
					var el = $(this), // The box that was clicked
		            max = 0;
	
					$('[imagenNombre]').each(function() {
			            
			            var z = parseInt( $( this ).css( "z-index" ), 10 );
			            max = Math.max( max, z );
			        
					});
		
			        el.css("z-index", max + 1 );
			        TweenLite.to($(this), .3, {scaleX:1.5,scaleY:1.5, ease:Expo.easeOut});
		        
				}// End if    
			        
		});
			
		$(this).mouseout(function(event){

			if (that.estado = that.states.INIT){

				TweenLite.to($(this), .3, {scaleX:1,scaleY:1, ease:Expo.easeOut});

			}// End if

		});

		$(this).click(function(event){
			event.preventDefault();
			that.idSeleccionado = index;
			console.log("El idSeleccionado es: "+that.idSeleccionado);
            that.moveMedioPantalla();
		});

	});

	// Creamos eventos para el boton menu
	$('#menuLateralIcono').click(function(event){
		event.preventDefault();
		that.abrirCerrarPanel(null);
		//console.log('menu apretado');
	});

    // Creamos las posiciones del menu colección
    that.vectorIndicesColeccion[0]  = 0;
    that.vectorIndicesColeccion[1]  = 5;
    that.vectorIndicesColeccion[2]  = 16;
    that.vectorIndicesColeccion[3]  = 27;
    that.vectorIndicesColeccion[4]  = 38;
    that.vectorIndicesColeccion[5]  = 49;
    that.vectorIndicesColeccion[6]  = 60;
    that.vectorIndicesColeccion[7]  = 71;
    // Luego los eventos para el menú colección
	$('#menu li').each(function(index){
		if ($(this).attr('coleccion') != ''){
            $(this).click(function(event){
				//$(this).attr('coleccion')
				that.idSeleccionadoMenuColeccion = that.vectorIndicesColeccion[index-1];
            	console.log("El menu apretado es: "+that.idSeleccionadoMenuColeccion);
                that.moveSccrollMenuApretado();
            });
		}
	});
	console.log('barraLateralHeight: '+barraLateralHeight);
	console.log('heightScroll'+heightScroll);
	console.log('screenHeight'+this.screenHeight);
	console.log('estado: '+that.estado);
	console.log('activarPanImageScroll'+this.activarPanImageScroll);
	console.log('activarPanImagePanel'+this.activarPanImagePanel);
} // End function


Controller.prototype.volver = function(){
	console.log("Apretadito");
	var that = this;
	if (that.estado == "DETALLE"){
		that.estado = that.posiciones.INIT;
        $('#fotoGrande').attr('src',"");
        $('#fotoGrande').css("top","0px;");
        TweenLite.to($('#contenedor'), 1, {css:{top:0+'px'},ease:Expo.easeOut});
        TweenLite.to($('#contenedor2'), 1, {css:{top:that.screenHeight+'px'},ease:Expo.easeOut});
       	$("#contenedorScroll").css("display","block");
        $("#menu").css("display","block");
        that.panImageActivado = false;
        that.activarPanImageScroll = true;
        $('.contenedorFoto').each(function(index){
			TweenLite.to($(this), .5, {scaleX:1, scaleY:1,left:'0px', ease:Expo.easeOut});
            $(this).mouseover(function(event){
                event.preventDefault();
                if (that.estado = that.states.INIT){
                    //console.log('mouseover');
                    TweenLite.to($(this), .5, {scaleX:1.2,left:-25+"px", scaleY:1.2, ease:Expo.easeOut});
                }// End if
            });
            $(this).mouseout(function(event){
                if (that.estado = that.states.INIT){

                    event.preventDefault();
                    //console.log('mouseout');
                    TweenLite.to($(this), .5, {scaleX:1, scaleY:1,left:'0px', ease:Expo.easeOut});

                }
            });
            $(this).click(function(event){
                event.preventDefault();
                that.idSeleccionado = index;
                that.marcaSeleccionada = $(this).attr("coleccion");
                console.log("El idSeleccionado es: "+that.idSeleccionado);
                that.moveMedioPantalla();
				/*
				 //console.log('activeTypography'+activeTypography);
				 if (that.estado = that.states.INIT){
				 //cambiarIdAntiguoSeleccionado();
				 console.log('El id es: '+$(this).attr('id'));
				 idSeleccionado = parseInt($(this).attr('id'));
				 //moveScrollClick(event);
				 ponerEstado('typography');
				 }// End if
				 */
            });
        });
	}
}

/*
// Cambiar IdAntiguo seleccionado escalado y a -1
function cambiarIdAntiguoSeleccionado(){

    var objetoAntScroll = '';

    // Comprobaci�n Anterior Seleccionado diferente a nada
    if (this.idAnteriorSeleccionado != -1){

        // Para el scroll
        objetoAntScroll = $('.contenedorFoto').eq(idAnteriorSeleccionado);
        TweenLite.to(objetoAntScroll, .5, {scaleX:1,left:0+"px", scaleY:1, ease:Expo.easeOut});


        // Para el Typography
        objetoAntScroll = $('[imagenNombre]').eq(idAnteriorSeleccionado);
        TweenLite.to($(objetoAntScroll), .3, {scaleX:1,scaleY:1, ease:Expo.easeOut});

        idAnteriorSeleccionado = idSeleccionado;
        //idAnteriorSeleccionado = -1;

    }else{

        idAnteriorSeleccionado = idSeleccionado;

    }

    //return true;

}
*/


Controller.prototype.move = function(){

	var that = this;
	
	switch (this.estado){
	
		case 'INIT':
			
			TweenLite.to($("#filaElegida"), 1, {top:this.posiciones.INIT+'px',onComplete:controller.mostrarOcultarFlecha('stop'),  ease:Expo.easeOut});
			
		break;
		
		case 'PANIMAGE':
			
			TweenLite.to($("#filaElegida"), 1, {top:this.posiciones.PANIMAGE+'px', onComplete:controller.mostrarOcultarFlecha('stop'), ease:Expo.easeOut});
			
		break;
		
		case 'DETALLE':
			
			TweenLite.to($("#filaElegida"), 1, {top:this.posiciones.DETALLE+'px', onComplete:controller.mostrarOcultarFlecha('stop'), ease:Expo.easeOut});
		
		break;
		
	}
	
}

//Lanzamos evento Mouse
Controller.prototype.eventThrowMouse = function(option){
	var that = this;
	console.log('Llega al throw Mouse'+option+'estado ocupado: '+this.estadoOcupado);
	//option = 'start';
	if (option == 'start'){
		window.addEventListener('mousemove',that.movePanImage,true);
	}else if (option == 'stop'){
		window.removeEventListener('mousemove',that.movePanImage,true);
	}// End if
}// End function


// Movemos mouse
Controller.prototype.movePanImage = function(event){

	var that = this;
	
	controller.mouseX = event.pageX;
	controller.mouseY = event.pageY;
	
	controller.movePanBarraLateral();
	controller.moveScrollLateral();
	controller.moveMenu();
	controller.movePanImageDetalle();

	/*
	if (controller.activarPanImage == true && controller.estadoOcupado == false ){
				
		controller.mouseX = event.pageX;
		controller.mouseY = event.pageY;
		
		// Proportion = contenedor.width / screen Width pero queremos moverlo una pantalla mas
		var proportion = ( $('#contenedorPrueba').height() - controller.screenHeight+100) / (controller.screenHeight); 
		var movement   = event.pageY * proportion;
		var movement2  = controller.posiciones.PANIMAGE - movement;
		
		TweenLite.to($('#filaElegida'), 1, {top:movement2+'px',ease:Expo.easeOut});
		
	}
	*/
	
}

Controller.prototype.movePanImageDetalle = function(){
    var that = this;
    if (that.panImageActivado){
		if (that.panImageX){
            porcentageScrollX  = that.mouseX / that.screenWidth;
            movimientoScrollX = - (( $('#fotoGrande').width() - that.screenWidth))* porcentageScrollX;
            TweenLite.to($('#fotoGrande'), .8, {top:movimientoScrollX, ease:Expo.easeOut});
		}
		if (that.panImageY){
            porcentageScrollY  = that.mouseY / that.screenHeight;
            movimientoScrollY = - (( $('#fotoGrande').height() - that.screenHeight))* porcentageScrollY;
            TweenLite.to($('#fotoGrande'), .8, {top:movimientoScrollY, ease:Expo.easeOut});
		}
	}
}

Controller.prototype.movePanBarraLateral = function(){
    var that = this;
	if (that.estadoPanelLateralAbierto && that.activarPanImagePanel){
        porcentageScroll  = that.mouseY / that.screenHeight;
        movimientoScrollY = - (( $('#barraLateralIcono').height() - that.screenHeight))* porcentageScroll;
        movimientoScrollY = movimientoScrollY + "px";
        console.log("height: "+$('#barraLateralIcono').height()+" screenHeight:"+$('#barraLateralIcono').height());
        TweenLite.to($('#barraLateralIcono'), .8, {top:movimientoScrollY, ease:Expo.easeOut});
	}
}

Controller.prototype.moveMenu = function(){
	var that = this;
	if (that.mouseY >=  parseInt($('#contenedorMascara').css('top')) && that.mouseX > parseInt($('#contenedorMascara').css('left')) && that.mouseX < parseInt($('#contenedorMascara').css('left')) + $('#contenedorMascara').width() && !that.estadoPanelLateralAbierto){
		var porcentageMouse 	  = (that.mouseY - parseInt($('#contenedorMascara').css('top')) ) / $('#contenedorMascara').height();
		var movimientoScrollMenuY = - (( $('#contenedorMenu').height() - $('#contenedorMascara').height()))* porcentageMouse;
		TweenLite.to($('#contenedorMenu'), .8, {top:movimientoScrollMenuY, ease:Expo.easeOut});
		//console.log('MouseY: '+event.pageY+'Menu Height: '+$('#contenedorMenu').height()+' contenedorMascara: '+$('#contenedorMascara').height()+' top:'+parseInt($('#contenedorMascara').css('top')));
	}
}

Controller.prototype.moveScrollLateral = function(){
	var that = this;
    if (that.activarPanImageScroll){
        porcentageScroll  = that.mouseY / that.screenHeight;
        movimientoScrollY = - (( $('#barraScroll').height() - that.screenHeight))* porcentageScroll;
        movimientoScrollY = movimientoScrollY + "px";
		restriccionScrollX = that.screenWidth - (parseInt($('#barraScroll').width()) + parseInt($('#barraScroll').css('right')));
		if (that.mouseX > restriccionScrollX){
			//cambiarIdAntiguoSeleccionado();
			// Comprobaci�n de Ver Button activado
            //comprobacionVerBtn();
			TweenLite.to($('#barraScroll'), .8, {top:movimientoScrollY, ease:Expo.easeOut});
            that.posYActualBarra = movimientoScrollY;
		}
	}
}

Controller.prototype.moveSccrollMenuApretado = function(){
	var that = this;
	movimientoScrollY = (that.idSeleccionadoMenuColeccion * 70) + (that.idSeleccionadoMenuColeccion * 25);
    TweenLite.to($('#barraScroll'), .8, {top:-movimientoScrollY, ease:Expo.easeOut});
}

Controller.prototype.moveMedioPantalla = function(){
    var that = this;
    that.activarPanImageScroll = false;
    $('.contenedorFoto').each(function(index){
		if (index != that.idSeleccionado){
            TweenLite.to($(this), .5, {scaleX:1, scaleY:1,left:'0px', ease:Expo.easeOut});
		}else{
            TweenLite.to($(this), .5, {scaleX:1.2,left:-25+"px", scaleY:1.2, ease:Expo.easeOut});
		}
		$(this).unbind("mouseover");
        $(this).unbind("mouseout");
	});
	var posicionIndiceSeleccionado = (that.idSeleccionado * 70) + (that.idSeleccionado * 25);
	console.log("idSeleccionado: "+posicionIndiceSeleccionado);
    if (posicionIndiceSeleccionado > that.screenHeight / 2){
        posicionBarraY = -(posicionIndiceSeleccionado - that.screenHeight / 2)-62;
    }else{
        posicionBarraY = (that.screenHeight / 2 - posicionIndiceSeleccionado)-62;
    }
	TweenLite.to($('#barraScroll'), .8, {top:posicionBarraY, ease:Expo.easeOut});
    that.posYActualBarra = posicionBarraY;
    that.loadFoto();
}

Controller.prototype.loadFoto = function(){
    var that = this;
	$('#ajaxLoader').css('display','block');
    $('#ajaxLoader').css('top', $('#contenedor2').height() + 400);
	var image    = new Image();
    image.onload = function(){ // always fires the event.
       	$('#ajaxLoader').css('display','none');
        $('#fotoGrande').css("width","auto");
        $('#fotoGrande').css("height","auto");
        if ($('#fotoGrande').width() < that.screenWidth){
            var diferenciaWidth = (that.screenWidth - $('#fotoGrande').width()) / 2;
        	$('#fotoGrande').css("left",diferenciaWidth+"px");
			that.panImageX = false;
        }else{
            that.panImageX = true;
		}

        if ($('#fotoGrande').height() < that.screenHeight){
            var diferenciaHeight = (that.screenHeight - $('#fotoGrande').height()) / 2;
            $('#fotoGrande').css("top",diferenciaHeight+"px");
            that.panImageY = false;
        }else{
            that.panImageY = true;
        }
		TweenLite.to($('#contenedor'), 1, {css:{top:-that.screenHeight+'px'},ease:Expo.easeOut});
        TweenLite.to($('#contenedor2'), 1, {css:{top:-that.screenHeight+'px'},ease:Expo.easeOut});
    	$("#contenedorScroll").css("display","none");
        $("#menu").css("display","none");
        that.panImageActivado = true;
        that.estado = that.states.DETALLE;
    }
	// handle error
    image.onerror = function(){
	};
	var marca = capitalizeFirstLetter(that.marcaSeleccionada);
	//console.log("http://www.phpandfriends.com/imagenesBerruezo/"+marca+"/"+that.idSeleccionado+".jpg");
    //ImagenesScroll/Besston/2.png
	var rutaActual = that.rutaFotoSeleccionada;
    var res 	   = rutaActual.replace("ImagenesScroll", "imagenesBerruezo");
	res 		   = res.replace("png","jpg");
    var rutaImagen = "http://www.phpandfriends.com/"+res;
    //image.src = "http://www.phpandfriends.com/imagenesBerruezo/"+marca+"/"+that.idSeleccionado+".jpg";
    console.log("La ruta imagen es: "+rutaImagen);
	image.src = rutaImagen;
    $('#fotoGrande').attr('src',image.src);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Controller.prototype.mostrarOcultarFlecha = function(option){
	
	var that = this;
	
	if (option == 'start'){
		
		$('#flechaArriba').css('display','block');
		//$('#flechaArriba').on('click', ponerIdSeccion);
		this.estadoOcupado = false;
		
	}else if (option == 'stop'){
		
		$('#flechaArriba').css('display','none');
		//$('#flechaArriba').off('click',"#flechaArriba",ponerIdSeccion );
		this.estadoOcupado = false;
		
	}
	
	if (this.estado == this.states.PANIMAGE){
		
		console.log('Llega al throw mouse');
		that.eventThrowMouse('start');
		
	}else{
		
		that.eventThrowMouse('stop');
		
	}
	
	if (this.estado == this.states.DETALLE){
		
		that.loadOval();
		
	}
	
	if (this.ovalCargado){
		
		// Parar anim oval
		
	}
}

Controller.prototype.loadImagesProject = function(){
	
	
	var that 		       = this;
	var totalImagenes      = 0;
	var contadorImagenes   = 0;
	var img 			   = 0;
	var vectorImgProyectos = new Array();
	
	
	if ($('#contenedorPrueba').children()){
		
		console.log('Borramos');
		
		$('.contenedorImagenDerecho').remove();
		$('.contenedorImagenIzquierdo').remove();
	
	} // End if
	
	
	$('#loading').css('left',that.screenWidth / 2 - $('#loading').width() +'px');
	$('#loading').css('top',that.screenHeight / 2 - $('#loading').height() +'px');
	
	for (key in this.vectorProyectos[this.idSeleccionado].imagenesListado){
		
		if (this.vectorProyectos[this.idSeleccionado].imagenesListado[key] != ''){
			
			totalImagenes++;
			
		}// End if
		
		
	} // End for
	
	console.log('El numero de imagenees es: '+totalImagenes);
	
	for (key in this.vectorProyectos[this.idSeleccionado].imagenesListado){
		
		if (this.vectorProyectos[this.idSeleccionado].imagenesListado[key] != ''){
		
			img        = new Image();
			vectorImgProyectos.push(img);
			img.onload = function(){
			
				if (contadorImagenes == totalImagenes - 1) {
						
						that.crearMenuPanning(vectorImgProyectos);
					
				}
			
				contadorImagenes++;	
				
			}
			
			
			
			img.src = this.vectorProyectos[this.idSeleccionado].imagenesListado[key];
			console.log(' conadorImagenes: '+contadorImagenes+' objeto: '+this.objetoImagenesApplication.imgApplicacion[key]);
		
		}
		
		
	}
	

}

Controller.prototype.crearMenuPanning = function(vectorImgProyectos){
	
	var that = this;
	var contadorImagenes = 0;
	
	for (var i=0; i < vectorImgProyectos.length;i++){
		
		if (contadorImagenes % 2 == 0){
			
			// Copiamos contenedor derecho
			contenedorDerecho = ('<div class="contenedorImagenDerecho">'+
					 			 '<img class="imgListado" src="'+vectorImgProyectos[i].src+'" class="img-responsive" style="width:100%;height:auto;" width="250" height="250"></img>'+ 
					 			 '<div class="contenedorParrafoDerecho">'+
					 			 '<img src="img/flechaDerecha.png">'+
					 			 '<h1>'+this.vectorProyectos[this.idSeleccionado].nombre+'</h1>'+
					 			 '<p><a href="'+this.vectorProyectos[this.idSeleccionado].website+'">'+this.vectorProyectos[this.idSeleccionado].website+'</p>'+
								 '</div></div>');
			$('#contenedorPrueba').append(contenedorDerecho)
			
			//console.log('contenedorDerecho: '+contenedorDerecho);
		
		}else{
			
			// Copiamos contenedor izquierdo
			contenedorIzquierdo = ('<div class="contenedorImagenIzquierdo">'+
					'<div class="contenedorParrafoIzquierdo">'+
					'<img src="img/flechaIzquierda.png">'+
					'<div class="textoIzquierda">'+
					'<h1>'+this.vectorProyectos[this.idSeleccionado].nombre+'</h1>'+
					'<p><a href="'+this.vectorProyectos[this.idSeleccionado].website+'">'+this.vectorProyectos[this.idSeleccionado].website+'</p>'+
					'</div></div>'+
					'<img class="imgListado" src="'+vectorImgProyectos[i].src+'" class="img-responsive" style="width:100%;height:auto;" width="250" height="250"></img>'+ 
		 			'</div>'
					 );
			
			$('#contenedorPrueba').append(contenedorIzquierdo);
			
		}	// if

		$('#palo2').css('display','block');
		//$('#palo3').css('display','block');
		
		contadorImagenes++;
		
	} // End for
	
	// Crear Eventos
	$('.contenedorImagenDerecho,.contenedorImagenIzquierdo').each(function(index){
	
		if (index <  5 ){
			
			if (index % 2 == 0){
				
				var rotation = 5;
			
			}else{
				
				var rotation = -5;
			}
			
			$(this).mouseover(function(){
				
				that.rotate($(this),rotation);
				//console.log('top: '+$(this).y);
				
			});
			
			$(this).mouseout(function(){
				
				that.rotate($(this),0);
				//console.log('top: '+$(this).scrollTop);
				
			});
			
			$(this).click(function(event){
				
				//ponerIdSeccion(event);
				// Creamos eventos para todos los botones
				// Btn ver Project
				console.log('Ha entrado');
				
				if (that.estadoOcupado == false){
					
						console.log('entro');
						that.estadoOcupado = true;
						event.preventDefault();
						that.estado = that.states.DETALLE;
						that.move();
						//that.loadOval();
						
						//ponerIdSeccion(event);
						//guardarIdSeleccionado();
						//idSeccion = 3;
						//evaluarSeccion();
						// Llamamos a nuestro objeto rotacion
						//objetoRotation = new llamarFuncion();
						//objetoRotation.configuration(secciones['3'],vectorProyectos);
						
						
						//loadFotos();
						
						
				}// End function
					
			});
			
		}// End if

		
	});	
		
		
	that.move();
	that.mostrarOcultarFlecha('start');
	
	
	
}

Controller.prototype.loadOval = function(){
	
	var that 		       = this;
	var left			   = parseInt( $("#filaElegida").css("left") );
	var top				   = this.posiciones.DETALLE;
	
	console.log('Controller: '+controller+' screenWidth: '+this.screenWidth+' screenHeight: '+this.screenHeight+' vectorProyectos: '+this.vectorProyectos+' idSeleccionado: '+this.idSeleccionado);
	this.oval 			   = new Oval(controller,this.screenWidth,this.screenHeight,this.vectorProyectos,this.idSeleccionado,this.oval,left,top);
	
	
	//$("#filaElegida").css("top",that.screenHeight-500+"px");
	//$("#filaElegida").css("left",that.screenWidth/2-324+"px");
	
}

//Funcion rotar elemento
Controller.prototype.rotate = function(obj,degree){
	
	TweenLite.to($(obj), 1, {css:{rotationY:degree}, ease:Expo.easeOut});
	
}


//Abrir y cerrar Panel
Controller.prototype.abrirCerrarPanel = function(param1){
		
	if (param1 == null){
		
		var valor = 0;
		
		if (controller.estadoPanelLateralAbierto == false){
			
			valor  = 0;
			valor2 = 1;
			
		}else{
			
			valor = -400;
			valor2 = 2;
		}
		
		TweenLite.to($("#barraLateralIcono"), 1, {left:valor+'px',onComplete:controller.abrirCerrarPanel,onCompleteParams:[valor2],ease:Expo.easeOut});
	
	}else if(param1 == 1){
		
		controller.estadoPanelLateralAbierto = true;
		
	}else if(param1 == 2){
		
		controller.estadoPanelLateralAbierto = false;
		
	}
	
	
}

// Abrir y cerrar Panel Informacion
Controller.prototype.abrirCerrarPanelInformacion = function(param1){
	
	if (param1 == null){
		
		var valor = 0;
		
		if (controller.estadoPanelInformacionAbierto == false){
			
			valor  = 0;
			valor2 = 1;
			
		}else{
			
			valor = -340;
			valor2 = 2;
		}

		TweenLite.to($("#barraLateral2"), 1, {right:valor+'px',onComplete:controller.abrirCerrarPanelInformacion,onCompleteParams:[valor2],  ease:Expo.easeOut});
		
		if (valor == 0){
			
			$('#logo2').css('display','block');
		
		}else if(valor == -340){
			
			$('#logo2').css('display','none');
			
		}// End if
		
	}else if(param1 == 1){
		
		controller.estadoPanelInformacionAbierto = true;
		
	}else if(param1 == 2){
		
		controller.estadoPanelInformacionAbierto = false;
		
	}
	
	
}


//Validamos formulario
//Abrir y cerrar Panel Informacion
Controller.prototype.validaciones = function(param1){
	
	$('#formularioContacto').validate({
		onKeyup : true,
		sendForm : true,
		eachValidField : function() {

			$(this).closest('div').removeClass('error').addClass('success');
		},
		eachInvalidField : function() {

			$(this).closest('div').removeClass('success').addClass('error');
		},
		description : {
			username : {
				required : '<div class="alert alert-error">Por favor rellena tu nombre</div>',
				pattern : '<div class="alert alert-error">Pattern</div>',
				conditional : '<div class="alert alert-error">Conditional</div>',
				valid : '<div class="alert alert-success">Valid</div>'
			},
			email : {
				required : '<div class="alert alert-error">Por favor rellena tu email</div>',
				pattern : '<div class="alert alert-error">Pattern</div>',
				conditional : '<div class="alert alert-error">Conditional</div>',
				valid : '<div class="alert alert-success">Valid</div>'
			},
			comentario : {
				required : '<div class="alert alert-error">Por favor rellena tus comentarios</div>',
				pattern : '<div class="alert alert-error">Pattern</div>',
				conditional : '<div class="alert alert-error">Conditional</div>',
				valid : '<div class="alert alert-success">Valid</div>'
			}
			
		},
		
		
	});
	
}
