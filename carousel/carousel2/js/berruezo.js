$(document).ready(function(){
	
	// Navegadores
	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
	var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
	var userAgent = navigator.userAgent;
	
	console.log('----------- Navegadores ----------');
	console.log('Opera: '+isOpera);
	console.log('Firefox: '+isFirefox);
	console.log('Safari: '+isSafari);
	console.log('Chrome: '+isChrome);
	console.log('IE: '+isIE);
	console.log('Agente: '+userAgent);
	console.log('----------------------------------');
	
	// Referente a estado Aplicaci�n
	var estadoActual 	= '';
	
	// Referente a pantalla
	var screenWidth     = $(window).width();
	var screenHeight 	= $(window).height();
	
	// Referente a PanImage
	var porcentageScroll   = 0;
	var porcentageImagenX  = 0;
	var porcentageImagenY  = 0;
	var restriccionScrollX = 0;
	var movimientoScrollY  = 0;
	var movimientoImagenX  = 0;
	var movimientoImagenY  = 0;
	
	// Referente a ScrollFoto
	var posYActualBarra		= 0;
	
	// Rererente a clickado
	var idSeleccionado     		= -1;
	var idAnteriorSeleccionado  = -1;
	
	// Referente a vecto objetos url imagenes
	//var  		= new Array();
	
	// Referente al menu
	var objetoMenu = function(seccion,indice){
			
		this.seccion = seccion;
		this.indice  = indice;
			
	}
	
	var vectorObjetoMenu = new Array();
	
	// Ventana abierta | panel abierto
	var estadoPanelLateralAbierto = false;
	var estadoPanelInformacionAbierto
	
	// Referente a diferentes estados de la aplicaci�n
	var activeVer			= false;
	var activeTypography    = true;
	var activeScroll		= true;
	var activeMouseMoveFast = true;
	
	// Version movil
	var versionMobile 			= false;
	var versionAndroid	  		= false;
	var incluimosCss      		= false;
	
	
	// Llamamos a las funciones
	configuration();
	detectarNavegador();
	esAndroid();
	eventTypography();
	eventScroll();
	eventVeryVolverFoto();
	eventVolverFoto();
	eventMenu();
	eventsBarrasLaterales();
	eventNavBar();
	lanzarEventoResize();
	prepararLanzarMouse('start');
	clonarImagenes();
	clonarContactar();
	validaciones();
	
	// Capturamos todos los estados de la aplicaci�n
	function ponerEstado(estado){
		
		if (estado == 'typography' || estado == 'scrollClick'){
			
			// Funci�n
			moveScrollClick(estado);
			
			// Parametros el estado
			activeTypography = false;
			activeScroll     = false;
			activeMouseMoveFast = false;
				
		}else if (estado == 'finTypographyScrollClick'){
			
			// Parametros del estado | aparece ver btn
			activeVer = true;
			activeTypography = false;
			activeScroll     = false;
			activeMouseMoveFast = false;
		
			// Funci�n
			activeVerBtn(null);
			
			
		}else if(estado == 'verFoto'){
			
			// Parametros del estado
			activeVer = true;
			activeTypography = false;
			activeScroll     = false;
			activeMouseMoveFast = false;
			
		}else if(estado == 'finActvieVerFoto'){
			
			// Parametros del estado
			activeVer 		    = false;
			activeTypography    = true;
			activeScroll        = true;
			activeMouseMoveFast = true;
			
			// Funci�n
			activeVerBtn('null');
		
		}else if(estado == 'cargarFoto'){	
			
			// Parametros del estado
			activeVer 		    = false;
			activeTypography    = false;
			activeScroll        = false;
			activeMouseMoveFast = false;
			
			// Funci�n
			activeVerBtn('loadFoto');
		
		}else if(estado == 'loadFoto'){	
			
			// Parametros del estado
			activeVer 		    = false;
			activeTypography    = false;
			activeScroll        = false;
			activeMouseMoveFast = false;
			
			// Funci�n
			loadFoto();
			
		}else if(estado == 'visorActivado'){
			
			// Parametros
			activeVer 		    = false;
			activeTypography    = false;
			activeScroll        = true;
			activeMouseMoveFast = true;
			
			// Funci�n
			estadoActual = estado;
			
		}else if(estado == 'inicial'){
			
			// Parametros
			activeTypography    = true;
			activeScroll        = true;
			activeMouseMoveFast = true;
			activeVer			= false;
			estadoActual 		= '';	
			
		}
		
		console.log('-------- Valores ---------');
		console.log('estado: '+estado);
		console.log('estadoActual'+estadoActual)
		console.log('activeVer: '+activeVer);
		console.log('activeTypography: '+activeTypography);
		console.log('activeScroll: '+activeScroll);
		console.log('activeMouseMoveFast: '+activeMouseMoveFast);
		console.log('---------------------------');
		
	}
	
	function configuration(){
		
		// Situamos el btn ver en el centro de la pantalla y escondido
		$('#loading').css('top',screenHeight / 2 - ( $('#loading').height() /2) );
		$('#loading').css('left',screenWidth / 2 - $('#loading').width() / 2);
		$('#loading').css('display','none');
		
		$('#trianguloVolver').css('top',screenHeight / 2 - ( $('#trianguloVolver').height() / 2 - 75) );
		$('#trianguloVolver').css('left',screenWidth / 2 - $('#trianguloVolver').width() / 2 - 5);
		$('#trianguloVolver').css('display','none');
		
		// Situamos el loader en medio de la pantalla
		$('#ajaxLoader').css('top',screenHeight / 2 - ( $('#ajaxLoader').height() /2));
		$('#ajaxLoader').css('left',screenWidth / 2 - ( $('#ajaxLoader').width() /2));
		$('#ajaxLoader').css('display','none');
		
		
		// Situamos la el contenedor de la letra a la mitad de la pantalla
		$('#contenedorLetra').css('top',screenHeight / 2 - $('#contenedorLetra').height() / 2);
	
		//$('#letras').css('top',parseInt($('#contenedorLetra').css('top')) + $('#contenedorLetra').height() / 2 - $('#letras').height / 2 );
		$('#letras').css('top',parseInt($('#contenedorLetra').css('top')) + $('#contenedorLetra').height() / 2 - $('#letras').height() / 2);
		$('#letras').css('left',parseInt($('#contenedorLetra').css('left')) + $('#contenedorLetra').width() - 120 );
		
		// Colcoamos el contenedor 2 debajo del contenedor 1
		if (screenWidth <= 768){
			
			configurationMobile();
			//versionMobile = true;
			versionMobile = false;

		}else{
		
			versionMobile = false;
			configurationTablet();
			
		}
		
		$('#fotoGrande').css('top',screenHeight);
		
		// Colocamos el btn volver en el contenedor 2
		$('#volver').css('top',screenHeight-40+'px');
		$('#volver').css('left','50%');
		$('#volver').css('display','none');
	
		// Menu
		// Mascara
		$('#contenedorMascara').css('left',$('#contenedorLetra').css('left'));
		$('#contenedorMascara').css('top',screenHeight - $('#contenedorMascara').height());
		
		//$('#colecciones').css('left',screenWidth / 2 - $('#contenedorMascara').width() / 2 + 4 );
		$('#colecciones').css('left',$('#contenedorMascara').css('left'));
		$('#colecciones').css('top',screenHeight - ($('#colecciones').height()+110));
		
		// Posicionamos el icono menu horizontal
		$('#menuLateralIcono').css('left','10px' );
		$('#menuLateralIcono').css('top','20px');

	}
	
	// Detect browser
	// Navegadores
	function detectarNavegador(){
		
		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
		var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		// At least Safari 3+: "[object HTMLElementConstructor]"
		var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
		var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
		var userAgent = navigator.userAgent;
		
		// Detectamos si hay la palabra Android
		var str = userAgent;
		var n   = str.search('Android'); 
		
		if (n!= -1){
			
			console.log('Es Android');
			versionAndroid = true;
			
			
		}else{
			
			console.log('No es Android');
			versionAndroid = false;
			
		}
		
		
		console.log('----------- Navegadores ----------');
		console.log('Opera: '+isOpera);
		console.log('Firefox: '+isFirefox);
		console.log('Safari: '+isSafari);
		console.log('Chrome: '+isChrome);
		console.log('IE: '+isIE);
		console.log('Agente: '+userAgent);
		console.log('----------------------------------');
			
		
	}
	
	function esAndroid(){
		
		var valorY = parseInt( $('#contenedor2').css('top') ) + $('#contenedor2').height();
		
		if (versionAndroid){
			
			includeCss();
			/*$('#fotoGrande').css('display','block');*/
			
			$('#fotoGrande').css('top',  valorY);
			
			//$('#detalleProyecto').css('left',0+'px');
			
		}// End if
		
	}
	
	function includeCss(){
		
		file = location.pathname.split( "/" ).pop();
		
		link = document.createElement( "link" );
		link.href = file.substr( 0, file.lastIndexOf( "/" ) ) + "css/tablet.css";
		 
		link.type  = "text/css";
		link.rel   = "stylesheet";
		link.media = "screen,print";
		
		//console.log('El link es: '+file);
		console.log('El link es: '+link);
		
		document.getElementsByTagName( "head" )[0].appendChild( link );
		
		console.log('Sobrescrivimos css');	
		
		incluimosCss = true;
		
		//eventThrowMouse('stop');
		
	}
	
	$('.navbar-brand').click(function(event){
		
		borrarIncludeCss();
		
	});
	
	function borrarIncludeCss(){
		
		$("LINK[href*='estilos2.css']").remove();
		
	}

	
	
	// Guardar imagenes en vector
	function clonarImagenes(){
		
		// Vectores
		var vectorObjetosImg     = new Array();
		var vectorColeccion		 = new Array();
		
		// Contadores y capas
		var totalObjetos  		 = 0;
		var coleccionTemp		 = 0;
		var lista 				 = '';
		var tituloDiv 			 = '';
		
		// Capitalize nombre colecci�n
		var capitalizeColeccion  = ''
		
		// Copiamos fotos
		$('.contenedorFoto').each(function(index){
		    
			var $img 		= $(this).find('img').clone();
			var $coleccion  = $(this).attr('coleccion');
			
			$('#contenedor2').append('<div class="contenedorFotoMovil" id="'+index+'"></div>');
			
			vectorObjetosImg.push($img);
			vectorColeccion.push($coleccion);			
			
		});
		
		// Total objetos
		totalObjetos = $('.contenedorFotoMovil').length;
		
		//<h1 class="tituloColeccionMovil"></h1>
		
		lista = '<ul>'
		
		// Pegamos fotos en capa
		$('.contenedorFotoMovil').each(function(index){
			
			if (index < totalObjetos - 1){
				
				if (index != 0){
					
					if (vectorColeccion[index] != vectorColeccion[index-1]){
						
						//$(this).append('<h1 class="tituloColeccionMovil" style="clear:both;width:100%;">'+vectorColeccion[index]+'</h1>');
						
						capitalizeColeccion = capitalizeFirstLetter(vectorColeccion[index]);
						lista = lista + '<li><h1 class="tituloColeccionMovil">'+capitalizeColeccion+'</h1></li>';
					
					}// End if
					
				}else{
					
					//$(this).append('<h1 class="tituloColeccionMovil" style="clear:both;width:100%;">'+vectorColeccion[index]+'</h1>');
					capitalizeColeccion = capitalizeFirstLetter(vectorColeccion[index]);
					lista = lista + '<li><h1 class="tituloColeccionMovil">'+capitalizeColeccion+'</h1></li>'	
				
				}
				
				$(this).append(vectorObjetosImg[index]);	
				
			}// End if
			
			$(this).click(function(event){
				
				console.log('Hola click imagen');
				
				idSeleccionado = parseInt($(this).attr('id'));
				
				loadFoto();
				
				$('html,body').animate({
					  scrollTop: $('#contenedor2').height()
					}, 800).promise().then(function() {
					  console.log("runs once!")
				});
				
			});
			
		});
		
		lista = lista + '</ul>'
		tituloDiv = '<h1 id="listadoColecciones" style="font-size:14px;">Listado de colecciones</h1>';
		$('#marcas').append(tituloDiv);
		$('#marcas').append(lista);	
		
		
	}// End function
	
	// Poner letra mayuscula
	function capitalizeFirstLetter(string) {
	
		return string.charAt(0).toUpperCase() + string.slice(1);
	
	}
	
	
	function clonarContactar(){
		
		var tituloDiv = '<h1 id="listadoColecciones" style="font-size:14px;">Contacta con nosotros</h1>'; 
		
		$objetoAClonar = $('#contenedorFormulario').clone();
		$('#contactar').append(tituloDiv);
		$('#contactar').append($objetoAClonar);
		$('#contactar').css('display','block');
		
	}
	
	
	// Lanzamos escuchador resize
	function lanzarEventoResize(){
		
		window.addEventListener("resize", comprobarParaMovil);
		//window. = comprobarParaMovil();
		
	}

	// Comprobacion para movil
	function comprobarParaMovil(event){
		
		console.log('comprobamos para el movil');
		
		screenWidth     = $(window).width();
		screenHeight 	= $(window).height();
		
		if (screenWidth <= 768){
		
			configurationMobile();
			console.log ('version mobil');
			
		}else{
			
			configurationTablet();
			console.log ('version desktop');
			
		}
		
	}
	
	// Assignamos caracteristicas Tablet
	function configurationTablet(){
		
		versionMobile = false;
		prepararLanzarMouse('start');
		$('#contenedor2').css('top',screenHeight);
		$('#contactar').css('display','none');
		$('#fotoGrande').css('display','block');
		$('#fotoGrande').css('top',screenHeight);
		
		
	}
	
	// Assignamos caracteristicas Mobile
	function configurationMobile(){
	
		var valorY = parseInt( $('#contenedor2').css('top') ) + $('#contenedor2').height();
		
		versionMobile = true;
		prepararLanzarMouse('stop');	
		$('#contenedor2').css('top','0px');
		$('#contactar').css('display','block');
		$('#fotoGrande').css('display','block');
		$('#fotoGrande').css('top',valorY);
		$('#barraLateralIcono').css('display','none');
		

	}
	
	// Estamos preparados para lanzar mouse
	function prepararLanzarMouse(option){
		
		if (option == 'start'){
			
			// Lanzamos escuchador evento mousemove
			window.addEventListener('mousemove',lanzarMouse,true);	
			
		}else if (option == 'stop'){
			
			// Lanzamos escuchador evento mousemove
			window.removeEventListener('mousemove',lanzarMouse,true);	
			
			
		}// End if

	}
	
	// Capturamos mouseMove event y enviamos evento a todas las funciones
	function lanzarMouse(event){
		
		moveScroll(event);
		moveImageY(event);
		moveImageX(event);
		moverMenu(event);
		
	}
	
	
	// Eventos movil navbar | Rollover
	function eventNavBar(){
		
		$('.navbar-nav li').mouseover(function(event){
			
			console.log('Hola');
			
			var object = $(this);
			
			if ($(this).attr('class') != 'active'){
				
				$(this).addClass('active');
				
				$('.navbar-nav li').each(function(index){
					
					if (object != $(this)){
						
						$(this).removeClass('active');
					}
					
				});
			}
			
			
		});// End mouseover
		
		$('.navbar-nav li').mouseover(function(event){
			
			if ($(this).attr('class') != 'active'){
				
				$(this).removeClass('active');
				
			}
			
		});// End mouseover
		
		// Click animaci�n y carga imagen grande
		$('.navbar-nav li').click(function(event){
			
			
			$('html,body').animate({
				  scrollTop: $(document).height()
				}, 800).promise().then(function() {
				  console.log("runs once!")
			});
			
			
		});
		
		
	}// End function
	
	// Eventos del menu
	function eventMenu(){
		
		// Creamos las posiciones de los menues
		var vectorIndices = new Array();
		vectorIndices[0]  = 0;
		vectorIndices[1]  = 5;
		vectorIndices[2]  = 16;
		vectorIndices[3]  = 27;
		vectorIndices[4]  = 38;
		vectorIndices[5]  = 49;
		vectorIndices[6]  = 60;
		vectorIndices[7]  = 71;
		
		$('#menu li').each(function(index){
			
			if ($(this).attr('coleccion') != ''){
				
				var miObjetoMenu  = new objetoMenu( $(this).attr('coleccion'),vectorIndices[index-1]);
				vectorObjetoMenu.push(miObjetoMenu);
				
				$(this).click(function(event){
					
					event.preventDefault();
					
					console.log('activeTypography'+activeTypography);
					
					if (chequearEstadoAntesClick('typography')){
					
						cambiarIdAntiguoSeleccionado();
						
						console.log('El id es: '+$(this).attr('id'));
						idSeleccionado = vectorIndices[index-1];
						//moveScrollClick(event);
						ponerEstado('typography');
					
					}// End if
					
				});
				
			}
			
			
		});
		
	}
	
	function eventsBarrasLaterales(){
		
		$('#menuLateralIcono').click(function(event){
			
			event.preventDefault();
			abrirCerrarPanel(null);
			console.log('menu apretado');
			
		});
		
	}
	
	function eventsBarrasContacto(){
		
		
		
	}
	
	function eventTypography(){
		
		// Ponemos Ids en todas las imagenes de la B
		// Y creamos Eventos
		
		console.log('n� imagenes tipograficas: '+$('[imagenNombre]').length);
		
		$('[imagenNombre]').each(function(index){
			
			// Ponemos Z-index y id
			$(this).css({'position': 'absolute', 'z-index':index,'cursor': 'pointer'});
			$(this).attr('id',index);
			
				$(this).mouseover(function(event){
					
					if (chequearEstadoAntesClick('typography')){
					
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
				
					if (chequearEstadoAntesClick('typography')){	
					
						TweenLite.to($(this), .3, {scaleX:1,scaleY:1, ease:Expo.easeOut});
					
					}// End if
					
				});
				
				$(this).click(function(event){
					
					event.preventDefault();
					
					console.log('activeTypography'+activeTypography);
					
					if (chequearEstadoAntesClick('typography')){
					
						cambiarIdAntiguoSeleccionado();
						
						console.log('El id es: '+$(this).attr('id'));
						idSeleccionado = parseInt($(this).attr('id'));
						//moveScrollClick(event);
						ponerEstado('typography');
					
					}// End if
					
				});
			
			
		});

		
	}
	
	// Chequea estado antes de poner idSeleccionado a true 
	function chequearEstadoAntesClick(estado){
		var respuesta = false;
		
		if (estado == 'typography' && activeTypography == true){
			
			respuesta = true;
			
		}else if (estado == 'typography' && activeTypography == false){
			
			respuesta = false;
		
		}else if (estado == 'scrollClick' && activeScroll == true){
			
			respuesta = true;
			
		}else if(estado == 'scrollClick' && activeScroll == false){
			
			respuesta = false;
			
		}
		return respuesta;
	}


	// Chequea antes del mouse Over y Mouse out para el mouseover rapidismo no interactue
	function chequearEstadoActiveMouseMove(){
		
		return activeMouseMoveFast;
		
	}
	
	
	function eventScroll(){
		
		// Ponemos Id en la barra de las fotos
		// Y creamos eventos
		// Damos el total del height de la barraScroll
		
		var heightScroll = 0;
		console.log('n� imagenes scroll: '+$('.contenedorFoto').length);
		$('.contenedorFoto').each(function(index){
			// Agregamos imagen grande al objeto foto
			var etiquetaUrlImagen  = $(this).find('img').attr('src');
			var etiqueta2 		   = etiquetaUrlImagen.substring(15, etiquetaUrlImagen.length-3); 
			var url = 'http://www.davidberruezo.com/'+etiqueta2+'jpg';
			var objetoImagenGrande = new ImagenGrande($(this).attr('coleccion'),url,index);
			.push(objetoImagenGrande);
			// Calculamos el total de alto
			heightScroll = (index * 70) + (index * 25) ;
			// Agregamos ID
			$(this).attr('id',index);
			// Ponemos el top (alto) correspondiente para cada imagen scroll
			$(this).css('top',index * 70 + index * 25);
			$(this).mouseover(function(event){
				event.preventDefault();
				if (chequearEstadoAntesClick('scrollClick')){
					if (chequearEstadoActiveMouseMove()){
						console.log('mouseover');
						TweenLite.to($(this), .5, {scaleX:1.2,left:-25+"px", scaleY:1.2, ease:Expo.easeOut});
					}
				}// End if
			});
			$(this).mouseout(function(event){
				event.preventDefault();
				if (chequearEstadoAntesClick('scrollClick')){
					if (chequearEstadoActiveMouseMove()){
						console.log('mouseout');
						TweenLite.to($(this), .5, {scaleX:1, scaleY:1,left:'0px', ease:Expo.easeOut});
					}
				}
			});
			$(this).click(function(event){
				console.log('click');
				activeMouseMoveFast = false;
				//event.preventDefault();
				if (chequearEstadoAntesClick('scrollClick')){
					//var temp = [[index]];
					console.log('El indice pinchado es: '+[index]['indice']);
					//idVisionado = [index]['indice'];
				 	console.log('EL fondo es:'+$('#fondo').css('background-position'));
					//TweenLite.to($('#fondo'), .5, {top:-100+'%',left:0+'%', ease:Expo.easeOut});
					//TweenLite.to($('#fondo'), 1, {css:{backgroundPosition:0+'px '-500+'px'}, ease:Power3.easeOut});
					//cargarImagen(index);
					idSeleccionado = parseInt($(this).attr('id'));
					console.log('cual es el estado actual: '+estadoActual);
					if (estadoActual == 'visorActivado'){
						console.log('Esta en visor Activado');
						loadFoto()
					}else{
						ponerEstado('scrollClick');
					}
				}
				
			});
			
		});
		
		$('#barraScroll').css('height',heightScroll+'px');
		
	}
		
	function eventVeryVolverFoto(){
		
		
		$('#loading').click(function(event){
			
			console.log('click ver foto');
			event.preventDefault();
			ponerEstado('cargarFoto');
			
		});
		
		
		$('#trianguloVolver a').click(function(event){
			
			console.log('click');
			event.preventDefault();
			ponerEstado('finActvieVerFoto');
			
		});
		
		
	}
	
	function loadFoto(){
		if (versionMobile == false && versionAndroid == false){
			$('#ajaxLoader').css('display','block');
			$('#ajaxLoader').css('top',screenHeight / 2 - ( $('#ajaxLoader').height() /2));
			$('#ajaxLoader').css('left',screenWidth / 2 - ( $('#ajaxLoader').width() /2));
		}else{
			$('#ajaxLoader').css('display','block');
			$('#ajaxLoader').css('top', $('#contenedor2').height() + 400);
		}
		var image    = new Image();
		image.onload = function(){ // always fires the event.
			if (versionMobile == false){
				
				$('#ajaxLoader').css('display','none');
				image = calcularFoto(image);
				
				var valor = -screenHeight;
				
				if (estadoActual != 'visorActivado'){
					
					TweenLite.to($('#contenedor'), 1, {css:{top:valor+'px'},onComplete:mostrarFoto, ease:Power3.easeOut});
					
				}else{
					
					mostrarFoto();
				}
				
				
			}else{
				
				$('#ajaxLoader').css('display','none');
				
			}// End if
			
			
		}
		
		// handle error
		image.onerror = function(){

		};
		
		console.log('url'+[idSeleccionado]['imagen']);
		image.src = [idSeleccionado]['imagen'];
		
		if (versionMobile == false && versionAndroid == false){
		
			$('#fotoGrande').attr('src',image.src);
			
		}else{
			
			$('#fotoGrandeMovilFoto').attr('src',image.src);
			
		}// End if
	}
	
	function calcularFoto(image){
		
		var diffWidth   = 0;
		var diffHeight = 0;
		var tantoPorcientoDiff = image.width / image.height;
		
		if (image.width < screenWidth){
				
			diffWidth  = screenWidth - image.width;
			diffWidth  = diffWidth + image.width;
			diffHeight = diffWidth / tantoPorcientoDiff;
			
			$('#fotoGrande').css('width',diffWidth+' px');
			$('#fotoGrande').css('height',diffHeight+' px');
			
			console.log('width final: '+diffWidth);
			console.log('height final: '+diffHeight);
					
		}
		
		return (image);
		
	}
	
	function mostrarFoto(){
		
		$('#fotoGrande').css('display','block');
		
		ponerEstado('visorActivado');
		$('#volver').css('display','block');
		
	}
	
	function eventVolverFoto(){
		
		$('#volver').click(function(event){
			
			event.preventDefault();
			
			TweenLite.to($('#contenedor'), 1, {css:{top:0+'px'},onComplete:ponerEstado,onCompleteParams:['inicial'], ease:Power3.easeOut});
			$('#volver').css('display','none');
			$('#fotoGrande').css('display','none');
			$('#ajaxLoader').css('display','none');
			
			
		});
		
	}

	function moverMenu(event){
		
		if (event.pageY >=  parseInt($('#contenedorMascara').css('top')) && event.pageX > parseInt($('#contenedorMascara').css('left')) && event.pageX < parseInt($('#contenedorMascara').css('left')) + $('#contenedorMascara').width() ){
			
			var porcentageMouse 	  = (event.pageY - parseInt($('#contenedorMascara').css('top')) ) / $('#contenedorMascara').height();
			var movimientoScrollMenuY = - (( $('#contenedorMenu').height() - $('#contenedorMascara').height()))* porcentageMouse;
			
			TweenLite.to($('#contenedorMenu'), .8, {top:movimientoScrollMenuY, ease:Expo.easeOut});
			
			console.log('MouseY: '+event.pageY+'Menu Height: '+$('#contenedorMenu').height()+' contenedorMascara: '+$('#contenedorMascara').height()+' top:'+parseInt($('#contenedorMascara').css('top')));
			
		}
		
	}
	
	function moveScroll(event){
		
		if (activeScroll == true){
				
			porcentageScroll  = event.pageY / screenHeight;
			movimientoScrollY = - (( $('#barraScroll').height() - screenHeight))* porcentageScroll;
			movimientoScrollY = movimientoScrollY + "px";
			
			restriccionScrollX = screenWidth - (parseInt($('#barraScroll').width()) + parseInt($('#barraScroll').css('right')));
			
			if (event.pageX > restriccionScrollX){
					
				cambiarIdAntiguoSeleccionado();
				
				// Comprobaci�n de Ver Button activado
				//comprobacionVerBtn();
				
				TweenLite.to($('#barraScroll'), .8, {top:movimientoScrollY, ease:Expo.easeOut});
				posYActualBarra = movimientoScrollY;
				
			}
		
		}// End if
		
		
	}
	
	function moveScrollClick(estado){
		
		if (activeScroll != false || activeTypography != false){
		
			// Variables
			var posY 		    = (idSeleccionado * 70 + idSeleccionado * 25);
			var posCentrar	    = screenHeight / 2 - 25;
			var movimiento      = - posY + posCentrar;
			var objetoScroll    = $('.contenedorFoto').eq(idSeleccionado);
			
			
			TweenLite.to($('#barraScroll'), .8, {top:movimiento,onComplete:ponerEstado,onCompleteParams:['finTypographyScrollClick'], ease:Expo.easeOut});
			TweenLite.to(objetoScroll, .5, {scaleX:1.2,left:-25+"px", scaleY:1.2, ease:Expo.easeOut});
			
			cambiarIdAntiguoSeleccionado();
			
			//idAnteriorSeleccionado = idSeleccionado;
			
			posYActualBarra = movimiento;
		
			
		}// End if
		
	}
	
	// Cambiar IdAntiguo seleccionado escalado y a -1
	function cambiarIdAntiguoSeleccionado(){
		
		var objetoAntScroll = '';
		
		// Comprobaci�n Anterior Seleccionado diferente a nada
		if (idAnteriorSeleccionado != -1){
			
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
	
	// Activar el Btn Ver
	function activeVerBtn(estado){
		
		// Comprobaci�n de Ver Button activado
		if (activeVer == false){
			
			TweenLite.to($('#loading'), .5, {display:'none',onComplete:ponerEstado,onCompleteParams:[estado], ease:Expo.easeOut});
			TweenLite.to($('#trianguloVolver'), .5, {display:'none', ease:Expo.easeOut});
			
			
		}else if(activeVer == true) {
			
			TweenLite.to($('#loading'), .5, {display:'block', onComplete:ponerEstado,onCompleteParams:['verFoto'],ease:Expo.easeOut});
			TweenLite.to($('#trianguloVolver'), .5, {display:'block', ease:Expo.easeOut});
			
			
		}
		
	}
	
	function moveImageY(event){
		
		if ($('#fotoGrande').height() > screenHeight){
			
			//if (activeScroll == true){
			
			porcentageImagenY  = event.pageY / screenHeight;
			movimientoImagenY = - (( $('#fotoGrande').height() - screenHeight))* porcentageImagenY;
			movimientoImagenY = movimientoImagenY + "px";
			
			var restriccionImagenY = screenWidth - (parseInt($('#barraScroll').width()) + parseInt($('#barraScroll').css('right')));
			
			if (event.pageX < restriccionImagenY){
					
				//cambiarIdAntiguoSeleccionado();
				
				// Comprobaci�n de Ver Button activado
				//comprobacionVerBtn();
				
				TweenLite.to($('#fotoGrande'), .8, {top:movimientoImagenY, ease:Expo.easeOut});
				
				//posYActualBarra = movimientoScrollY;
				
			}
		
		//}// End if
			
			
		}
		
	}  
			
	function moveImageX(event){
				
			
		if ($('#fotoGrande').width() > screenWidth){
			
			//if (activeScroll == true){
				
				porcentageImagenX  = event.pageX / screenWidth;
				movimientoImagenX = - (( $('#fotoGrande').width() - screenWidth))* porcentageImagenX;
				movimientoImagenX = movimientoImagenX + "px";
				
				var restriccionImagenX = screenWidth - (parseInt($('#barraScroll').width()) + parseInt($('#barraScroll').css('right')));;
				
				if (event.pageX < restriccionImagenX){
						
					//cambiarIdAntiguoSeleccionado();
					
					// Comprobaci�n de Ver Button activado
					//comprobacionVerBtn();
					
					TweenLite.to($('#fotoGrande'), .8, {top:movimientoImagenX, ease:Expo.easeOut});
					//posYActualBarra = movimientoScrollY;
					
				}
			
			//}// End if
			
			
		}
		
	}
	
	
	function abrirCerrarPanel(param1){
		
		if (param1 == null){
			
			var valor = 0;
			
			if (estadoPanelLateralAbierto == false){
				
				valor  = 0;
				valor2 = 1;
				
				
			}else{
				
				valor = -400;
				valor2 = 2;
				
			}
			
			console.log('Entra dentro');
			
			TweenLite.to($("#barraLateralIcono"), .8, {left:valor+'px',onComplete:abrirCerrarPanel,onCompleteParams:[valor2],  ease:Expo.easeOut});
		
		}else if(param1 == 1){
			
			estadoPanelLateralAbierto = true;
			
		}else if(param1 == 2){
			
			estadoPanelLateralAbierto = false;
			
		}
		
		
	}
	
	
	function abrirCerrarPanelInformacion(param1){
		
		if (param1 == null){
			
			var valor = 0;
			
			if (estadoPanelInformacionAbierto == false){
				
				valor  = 0;
				valor2 = 1;
				
			}else{
				
				valor = -340;
				valor2 = 2;
			}
			
			console.log('Entra dentro');
			TweenLite.to($("#barraLateral2"), 1, {right:valor+'px',onComplete:abrirCerrarPanelInformacion,onCompleteParams:[valor2],  ease:Expo.easeOut});
		
		}else if(param1 == 1){
			
			estadoPanelInformacionAbierto = true;
			
		}else if(param1 == 2){
			
			estadoPanelInformacionAbierto = false;
			
		}
		
		
	}
	
	// Validamos formulario
	function validaciones(){
		
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
	
	
	
});
