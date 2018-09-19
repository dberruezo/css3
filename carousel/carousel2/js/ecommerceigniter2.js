$(function() {
	
		// Screen
		var screenWidth  = $(window).width();
		var screenHeight = $(window).height();
		var options		 = {'restringirX':-200};
		
		// ScrollFotos
		var totalAlto	   = 0;
		var idSeleccionado = -1;
		var idAnteriorSeleccionado = -1;
		var scrollMovido   = false;
		
		// PanImage
		// Scroll
		var porcentage 		  = 0;
		var velocidad  		  = 0;
		var directionMouse    = 0;
		var mouseX			  = 0;
		var mouseY			  = 0;
		var posYActual		  = 50;
		var posYActualScroll  = 0;
		var scrollPanMovido   = false;
		var posYScale		  = 0;
		
		// Pan Image
		// Foto
		var porcentageX		  = 0;
		var porcentageY		  = 0;
		var directionMouseX   = 0;
		var directionMouseY   = 0;
		var resultadoX        = 0;
		var resultadoY        = 0;
		var mouseFotoY		  = 0;
		var mouseFotoX        = 0;
		
		var idVisionado       = 0;
		
		// Posición de la imagen letras erruezo
		var posYBerruezo = screenHeight / 2 - $('#contenedorLetra').height() / 2;
		
		posYScale = posYBerruezo =  + 100;
		
		$('#contenedorLetra').css('top',posYBerruezo);
		
		console.log('posYBerruezo'+posYBerruezo);
		
		var vectorImagenGrande = new Array();
		
		function configuration(){
			
		}
		
		
		function eventTypography(){
			
		}
		
		function eventScroll(){
			
		}
		
		
		function moveImageY(){
			
		}  
		
		function moveImageX(){
			
			
		}
		
		// Ponemos Ids en todas las imagenes de la B
		// Y creamos Eventos
		$('.imagen').each(function(index){
			
			// Ponemos Z-index y id
			$(this).css({'position': 'absolute', 'z-index':index});
			$(this).attr('id',index);
			
			$(this).mouseover(function(event){
				
				var el = $(this), // The box that was clicked
	            max = 0;

				$('.imagen').each(function() {
		            
		            var z = parseInt( $( this ).css( "z-index" ), 10 );
		            max = Math.max( max, z );
		        
				});
	
		        el.css("z-index", max + 1 );
		        TweenLite.to($(this), .3, {scaleX:1.5,scaleY:1.5, ease:Expo.easeOut});
		        
			});
			
			$(this).mouseout(function(event){
			
				TweenLite.to($(this), .3, {scaleX:1,scaleY:1, ease:Expo.easeOut});
				
			});
			
			$(this).click(function(event){
				
				event.preventDefault();
				console.log('El id es: '+$(this).attr('id'));
				
				idSeleccionado = parseInt($(this).attr('id'));
				
				scrollMovido   = true;
				
				moverBarraPosicion();
				
				
			});
			
		});
		
		// Ponemos Id en la barra de las fotos
		// Y creamos eventos
		$('.contenedorFoto').each(function(index){
			
			// Agregamos imagen grande al objeto foto
			var etiquetaUrlImagen  = $(this).find('img').attr('src');
			var etiqueta2 		   = etiquetaUrlImagen.substring(15, etiquetaUrlImagen.length-3); 
			var url = 'http://www.davidberruezo.com/'+etiqueta2+'jpg';
			var objetoImagenGrande = new ImagenGrande($(this).attr('coleccion'),url,index);
			
			vectorImagenGrande.push(objetoImagenGrande);
			
			// Calculamos el total de alto
			totalAlto = (index * 70) + (index * 25) ;
			
			$(this).attr('id',index);
			$(this).css('top',index * 70 + index * 25);
			
			//console.log('totalAncho: '+totalAlto)
			
			$(this).mouseover(function(){
				
				console.log('mouseover');
				
				var antiguoWidth = $(this).width();
				var nuevoWidth   = $(this).width() * 1.2;
				var resWidth     = nuevoWidth - antiguoWidth;
				console.log('El resWidth vale: '+resWidth);
				
				TweenLite.to($(this), .5, {scaleX:1.2,left:-25+"px", scaleY:1.2, ease:Expo.easeOut});
				
			});
			
			$(this).mouseout(function(){
				
				console.log('mouseout');
				TweenLite.to($(this), .5, {scaleX:1, scaleY:1,left:'0px', ease:Expo.easeOut});
				
			});
			
			$(this).click(function(event){
				
				var temp = vectorImagenGrande[vectorImagenGrande[index]];
				console.log('El indice pinchado es: '+vectorImagenGrande[index]['indice']);
				
				idVisionado = vectorImagenGrande[index]['indice'];
				
				console.log('EL fondo es:'+$('#fondo').css('background-position'));
				
				//TweenLite.to($('#fondo'), .5, {top:-100+'%',left:0+'%', ease:Expo.easeOut});
				//TweenLite.to($('#fondo'), 1, {css:{backgroundPosition:0+'px '-500+'px'}, ease:Power3.easeOut});
				
				cargarImagen(index);
				
			});
			
			var resTop = $(this).css('top');
			console.log('.contenedorFoto '+index+' :'+resTop);
			
		
		});
		
		// Ejemplo 1 carga
		function cargarImagen(index){
			
			var haEntrado = false;
			
			$('#loading').css('top',screenHeight / 2 - $('#loading').height());
			$('#loading').css('left',screenWidth / 2 - $('#loading').width());
			$('#loading').css('display','block');
			
			//loading.style.display = 'block';
			
			var image    = new Image();
			image.onload = function(){ // always fires the event.
			    
				// ...
				loading.style.display = 'none';
				
				console.log('El width es: '+$('#fotoGrande').width()+' El height es: '+$('#fotoGrande').height());
				
				if ($('#fotoGrande').width() > screenWidth){
					
					if ($('#fotoGrande').height() > screenHeight){
						
						//panImageXfoto();
						//panImageYfoto();
						
						console.log('lanzamos evento');
						window.addEventListener('mousemove',panImageYfoto,true);
						
						
					}
					
					haEntrado = true;
					window.addEventListener('mousemove',panImageXfoto,true);
					
				}else{
					
					if ($('#fotoGrande').height() > screenHeight){
						
						//panImageXfoto();
						//panImageYfoto();
						
						haEntrado = true;
						console.log('lanzamos evento');
						window.addEventListener('mousemove',panImageYfoto,true);
						
						
					}
					
				}
			
			
			};
			
			// handle failure
			image.onerror = function(){

			};
			
			image.src = vectorImagenGrande[index]['imagen'];
			//var contenedor = document.getElementById('contenedorImagen');
			$('#fotoGrande').attr('src',image.src);
			//contenedor.appendChild(image);
			
			
			if (image.width == $('#fotoGrande').width() && haEntrado == false){
				
				if (image.width > screenWidth){
					
					if (image.height > screenHeight){
						
						//panImageXfoto();
						//panImageYfoto();
						
						console.log('lanzamos evento');
						window.addEventListener('mousemove',panImageYfoto,true);
						
						
					}
					
					window.addEventListener('mousemove',panImageXfoto,true);
					
				}else{
					
					if (image.height > screenHeight){
						
						//panImageXfoto();
						//panImageYfoto();
						
						
						console.log('lanzamos evento');
						window.addEventListener('mousemove',panImageYfoto,true);
						
						
					}
					
				}	
				
			}
			
			
			
			
		}
		
		// Damos el tamaño exacto de alto a la barra
		totalAlto = totalAlto + 150;
		$('#barraScroll').css('height',totalAlto+'px');
		
		console.log('El total Alto es: '+totalAlto);
		
		lanzarPanImage();
		
		function lanzarPanImage(){
			
			var posYInicial = 0;
			var calculo 	= 0;
			
			scrollPanMovido = true;
			
			if (scrollMovido == true){
				
				posYInicial = (index * 70) + (index * 25);
				calculo 	= posYInicial - ( (idSeleccionado * 70) + (idSeleccionado * 25)) + posYScale;
				alert('calculo:'+calculo);
				console.log('calculo:'+calculo);
				calculo     = calculo * -1;
				console.log('calculo:'+calculo);
				alert('calculo:'+calculo);
			}
			
			window.addEventListener('mousemove',panImageY,true);
			
			//parametrosPanImageY(screenHeight,calculo,$('#barraScroll'),$('#barraScroll'),options);
			//parametrosPanImageX(screenWidth,0,$('#foto'),$('#foto'),options);
			
		};
		
		function moverBarraPosicion(){
			
			var posYInicial      = 0;
			var posYSeleccionado = 0;
			var resultado 		 = 0;
			var objetoEscalar    = 0;
			
			$('.contenedorFoto').each(function(index){
				
				// Formulas
				posYInicial = (index * 70) + (index * 25);
				calculo 	= posYInicial - ( (idSeleccionado * 70) + (idSeleccionado * 25)) + posYScale;
				
				posYActual = calculo;
				
				//console.log('posYBerrueo: '+posYBerruezo)
				//console.log('resultado:'+calculo);
				
				TweenLite.to($(this), .8, {top:calculo, ease:Expo.easeOut});
				
				if (idSeleccionado == index){
					
					TweenLite.to($(this), .5, {scaleX:1.2,left:-25+"px", scaleY:1.2, ease:Expo.easeOut});
					
				}
				
				if (idAnteriorSeleccionado == index){
					
					TweenLite.to($(this), .5, {scaleX:1,left:0+"px", scaleY:1, ease:Expo.easeOut});
					idAnteriorSeleccionado = idSeleccionado;
				}
				
				if (index == idSeleccionado){
					
					objetoEscalar = $(this);
						
				}
				
			});
			
			posYActual = (idSeleccionado * 70) + (idSeleccionado * 25) - posYScale;
			console.log('La posicion actual es:'+posYActual);
			
			if (scrollPanMovido == true){
				
				TweenLite.to($('#barraScroll'), .8, {top:'0px', ease:Expo.easeOut});
			
			}
			
			//TweenLite.to(objetoEscalar, .5, {scaleX:1.2,left:-25+"px", scaleY:1.2, ease:Expo.easeOut});
			
		}
		
		function panImageY(event){
			
			porcentage = directionMouse / screenHeight;
			
		    if (event.pageY < directionMouse) {
		        
		    	velocidad = porcentage;
		    	//console.log('From Bottom');
		        
		    } else {
		        
		    	velocidad = 1.5 - porcentage;	
		    	//console.log('From Top');
		        
		    }
		    
		    var resultado = posYActual - (( $('#barraScroll').height() - screenHeight))* porcentage;
		    resultado = resultado + "px";
		    posYActualScroll = resultado;
		    
		    //console.log('posYActualScroll'+posYActualScroll);
		    
		    //resultado = resultado + "px";
		    
		    directionMouse 		= event.pageY;
		    var mouseX			= event.pageX;
		    
		    var posX = screenWidth - (parseInt($('#barraScroll').width()) + parseInt($('#barraScroll').css('right')));
		    
		    
		    if (mouseX > posX){
		    	
		    	//console.log('entra');
		    	TweenLite.to($('#barraScroll'), .8, {top:resultado, ease:Expo.easeOut});
		    	
		    }
		
		
		} 
		
		
		function panImageYfoto(event){
			
			console.log('El width es: '+$('#fotoGrande').width()+' El height es: '+$('#fotoGrande').height());
			
			porcentageY = directionMouseY / screenHeight;
			
		    if (event.pageY < directionMouseY) {
		        
		    	//velocidad = porcentage;
		    	//console.log('From Bottom');
		        
		    } else {
		        
		    	//velocidad = 1.5 - porcentage;	
		    	//console.log('From Top');
		        
		    }
		    
		    //var posYActualFoto = $('#fotoGrande').css('top');
		    var resultadoY =  - (( $('#fotoGrande').height() - screenHeight))* porcentageY;
		    resultadoY = resultadoY + "px";
		    
		    //resultado = resultado + "px";
		    
		    directionMouseY 	= event.pageY;
		    var mouseX			= event.pageX;
		    
		    var posX = screenWidth - (parseInt($('#barraScroll').width()) + parseInt($('#barraScroll').css('right')));
		    
		    if (mouseFotoX < posX){
		    	
		    	//console.log('entra');
		    	TweenLite.to($('#fotoGrande'), .8, {top:resultadoY, ease:Expo.easeOut});
		    	
		    }
		    
		    /*
			console.log('---------- valores ----------');
		    console.log('resultado: '+resultado);
		    console.log('diferencia: '+( $('#fotoGrande').height() - screenHeight));
		    console.log('sceenHeight '+screenHeight);
		    console.log('fotoGrande: '+$(fotoGrande).height());
		    console.log('porcentage: '+porcentage);
			console.log('-----------------------------');
		    */
		    
		} 
		
		function panImageXfoto(event){
			
			porcentageX = directionMouseX / screenWidth;
			
		    if (event.pageX < directionMouseX) {
		        
		    	//velocidad = porcentage;
		    	console.log('From Bottom');
		        
		    } else {
		        
		    	//velocidad = 1.5 - porcentage;
		    	console.log('From Top');
		        
		    }
		    
		    var resultadoX = -($('#fotoGrande').width() - screenWidth )* porcentageX;
		    resultadoX = resultadoX + "px";
		    
		    directionMouseX = event.pageX;
		   
		    
		    //console.log('options'+options1.restringirX)
		    
		    var posX = screenWidth - (parseInt($('#barraScroll').width()) + parseInt($('#barraScroll').css('right')));
		    
		    TweenLite.to($('#fotoGrande'), .8, {left:resultadoX, ease:Expo.easeOut});
		    
		    /*
		    if (directionMouse < posX){
		    	
		    	console.log('entra');
		    	TweenLite.to($('#fotoGrande'), .8, {left:resultado, ease:Expo.easeOut});
		    	
		    	
		    }
		    */
		    
		    /*
		    console.log('-------------- valores -----------------');
			console.log("porcentage: "+porcentageX);
			console.log("directionMouse: "+directionMouseX);
			console.log("resultado: "+resultadoX);
			console.log("event.pageX: "+event.pageX);
			console.log('fotoGrande width()'+$('#fotoGrande').width());
			console.log("sWidth: "+screenWidth);
			console.log('-----------------------------------------');
		   */
			
		}
		
		
		/*
		function restringirX(){
			
			var options = {
					
				'restringirX':-200,
						
			};
			
			options = this.options;
			
		}
		
		//console.log('options'+options.restringirX)
		*/
		
		  
});