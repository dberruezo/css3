	/*
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			return window.setTimeout(callback, 1000/60);
		});
	}else{
		
		console.log('Hay request');
		
		
	}
	*/
		
	function Cuadrado (radio,grados,top,left,nueva){
	
		this.radio  = radio;
		this.grados = grados;
		this.top	= top;
		this.left   = left;
		this.nueva  = nueva;
		
	}
	
	function CuadradoMovimiento (radio,grados,top,left,nueva){
		
		this.radio  = radio;
		this.grados = grados;
		this.top	= top;
		this.left   = left;
		this.nueva  = nueva;
		
	}
	
	
$(document).ready(function(){
	
	var stageHeight 	  = window.innerHeight;
	var stageWidth  	  = window.innerWidth;
	var radio 			  = 0;
	var radioGrande		  = 0;
	var radioEnano		  = 50;
	var contadorGrados    = 0;
	var contadorRadio	  = 0;
	var contadorRadio     = 0;
	var contadorVueltas   = 0;
	var contadorSegundos  = 0;
	var miInterval  	  = 0;
	var numero			  = 0;
	var contadorInterval  = 0;
	var fps 			  = 100000;
	var mouseX			  = 0;
	var mouseY			  = 0;
	var primera     	  = 0;
	var margenHeight	  = 200;
	var vectorObjetos 			= new Array();
	var vectorObjetosMovimiento = new Array();
	var nCuadros 		  = 10;
	var grados			  = 360 / nCuadros;
	var graditos		  = 0;
	var selectId		  = 0;
	
	
	// Llamamos a las funciones
	configuration();
	keepAnglesInObject();
	eventsStartAndStop();
	throwMouseMoveEvent();
	//throwRadiusLittle();
	
	
	function crearNuevoTimer(){
		
		var lastTime = 0;
	    var vendors = ['webkit', 'moz'];
	    
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame =
	          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };

	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };

		
	}
	
	// Set up Application
	function configuration(){
		
		// Calculate Radius
		radioGrande = (stageHeight - margenHeight * 2) / 2;
		radio		= radioGrande;
		
		console.log('radioGrande'+radioGrande);
		
		$('#contenedorCuadros').css('width',radioGrande*2);
		$('#contenedorCuadros').css('height',radioGrande*2);
		$('#contenedorCuadros').css('left',stageWidth/2 - radioGrande / 2);
		$('#contenedorCuadros').css('top',stageHeight/2 - radioGrande / 2);
		
	
	}
	
	
	// Save angles in a object
	function keepAnglesInObject(){
		
		$('.cuadro').each(function(index){
			
			var adjRatio = radioGrande * Math.cos(contadorGrados*(Math.PI/180)); // CAH
			var oppRatio = radioGrande * Math.sin(contadorGrados*(Math.PI/180)); // SOH
			
			console.log('top: '+oppRatio+' left: '+adjRatio+' degree'+contadorGrados+' index: '+index);
			
			var objeto1 = new Cuadrado(200,contadorGrados,oppRatio,adjRatio,0);
			vectorObjetos.push(objeto1);
			
			var temp = index * 36 + contadorGrados;
			
			
			$(this).mouseover(function(){
				  
				  selectId = index;	
				
				  
				  //TweenLite.to($(this), .3, {rotation:-temp,scaleX:1.5,scaleY:1.5, ease:Expo.easeOut});
				  
				  /*
				  $(this).css('WebkitTransform', 'rotate(' +temp+ 'deg)');
				  $(this).css('-ms-transform', 'rotate(' + temp + 'deg)');
				  $(this).css('transform', 'rotate(' + temp + 'deg)');
				 */
				  
			});
			
			$(this).mouseout(function(){
				
				selectId = -1;
				
				  
				  //TweenLite.to($(this), .3, {rotation:-temp,scaleX:1,scaleY:1, ease:Expo.easeOut});
				  
				  /*
				  $(this).css('WebkitTransform', 'rotate(' + temp + 'deg)');
				  $(this).css('-ms-transform', 'rotate(' + temp + 'deg)');
				  $(this).css('transform', 'rotate(' + temp + 'deg)');
				  */
				
			});
			
			$(this).click(function(event){
				
				console.log('grados'+graditos);
				
			});
			
			
			contadorGrados = index * nCuadros;
			
		});
		
		contadorGrados = 0;
		
	}
	
	// Parar y Empezar
	function eventsStartAndStop(){
		
		$('#parar,#start').click(function(event){
			
			if (event.target.id == 'parar'){
				
				window.cancelAnimationFrame(miInterval);
			
			}else if(event.target.id == 'start'){
				
				//var startTime = date.now();
				miInterval = requestAnimationFrame(draw);
				
			}
			
			
		});
		
	}
	
	function pruebasFunciones(){
		
		// Tipos de funciones
		
		(function(){console.log('pedro');})();

		(function(window, document, undefined){
			
			window.close();
			console.log('Hola');
			
		})(window,window.document,'pepe')
		
	}
	
	function throwMouseMoveEvent(){
		
		window.addEventListener('mousemove',captureMouse,true);
		
	}
	
	function throwRadiusLittle(){
		
		var myVar = setInterval(function(){ radiusLittle() }, 10);
		
	}
	
	
	function radiusLittle(){
		
		console.log('Hola');
		
		if (contadorSegundos > 5){
		
			if (contadorRadio < 100){
				
				$('.cuadro').each(function(index){
					
					var adjRatio = contadorRadio * Math.cos(contadorGrados*(Math.PI/180)); // CAH
					var oppRatio = contadorRadio * Math.sin(contadorGrados*(Math.PI/180)); // SOH
					
					$(this).css('WebkitTransform', 'rotate(' + contadorGrados + 'deg)');
					$(this).css('-ms-transform', 'rotate(' + contadorGrados + 'deg)');
					$(this).css('transform', 'rotate(' + contadorGrados + 'deg)');
						
					
					$(this).css('top',oppRatio+'px');
					$(this).css('left',adjRatio+'px');
					
					contadorGrados += 360 / nCuadros;
					
					$(this).click(function(event){
						
						
						
					});
					
				});
				
				contadorRadio++;
				
			}else{	
				
				var myVar = setTimeout(throwRadiusLittle, 1);
				
			}
			
			contadorSegundos++;
			
		}
		
		contadorSegundos++;
		
	}
	
	function moverIzquierda(){
		
		
		
	}
	
	//Capture Mouse
	function captureMouse(event){
		
		mouseX = event.pageX;
		mouseY = event.pageY;
		
	}
	
	// Cancel Mouse
	function cancelAnimationFrame(){
		
		console.log('------------- Valores '+contadorVueltas+' ------------');
		window.cancelAnimationFrame(miInterval);
		
	}
	
	//console.log('left'+$('#contenedorCuadros').css('left'));
	//console.log('right'+$('#contenedorCuadros').css('top'));
	
	console.log('-----------------------------------');
	
	function draw(){
		
		if (contadorInterval < .5){
			
			$('.cuadro').each(function(index){
				
				if (contadorGrados < 360){
					
					graditos = index * 36 + contadorGrados;
					
						//var distX = (mouseX - parseInt($(this).css('left'))) - parseInt($('#contenedorCuadros').css('left'));
						//var distY = (mouseY - parseInt($(this).css('top'))) - parseInt($('#contenedorCuadros').css('top'));
						var distX = mouseX - parseInt($('#contenedorCuadros').css('left'));
						var distY = mouseY - parseInt($('#contenedorCuadros').css('top'));
						var dist  = Math.sqrt(distX * distX + distY * distY);
						
						var anguloX = parseInt($(this).css('left'));
						var anguloY = parseInt($(this).css('top'));
						var radianes = Math.atan2(anguloX, anguloY);
						radianes = radianes * Math.PI / 180;
						
						//console.log('radianes de '+index+': '+radianes);
						
						if (Math.abs(distY) > 0 && Math.abs(distY) < 115 && radioGrande < radio * 2){
						
							radioGrande += Math.abs(distY) / 2 * .01;	
							$('');
							
						}else if(Math.abs(distY) > 115 && radioGrande > radio){
							
							radioGrande -= Math.abs(distY) / 2 * .01;	
							
						}
						
					// x e y triangle
					var adjRatio = radioGrande * Math.cos(graditos*(Math.PI/180)); // CAH
					var oppRatio = radioGrande * Math.sin(graditos*(Math.PI/180)); // SOH
					
					$(this).click(function(event){
						
						
						
					});
					
					/*
					$(this).mouseover(function(){
						  
						  selectId = index;	
						
						  
						  //TweenLite.to($(this), .3, {scaleX:1.5,scaleY:1.5, ease:Expo.easeOut});
						  
						  
						  $(this).css('WebkitTransform', 'scaleX(2)');
						  $(this).css('-ms-transform', 'scaleX(2)');
						  $(this).css('transform', 'scaleX(2)');
						  
						  $(this).css('WebkitTransform', 'scaleY(2)');
						  $(this).css('-ms-transform', 'scaleY(2)');
						  $(this).css('transform', 'scaleY(2)');
						  
					});
					
					$(this).mouseout(function(){
						
						selectId = -1;
						
						  //TweenLite.to($(this), .3, {scaleX:1,scaleY:1, ease:Expo.easeOut});
						  
						 
						  $(this).css('WebkitTransform', 'scaleX(1)');
						  $(this).css('-ms-transform', 'scaleX(1)');
						  $(this).css('transform', 'scaleX(1)');
						
						  $(this).css('WebkitTransform', 'scaleY(1)');
						  $(this).css('-ms-transform', 'scaleY(1)');
						  $(this).css('transform', 'scaleY(1)');
						  
						  
					});
					*/
					
					$(this).css('WebkitTransform', 'rotate(' + graditos + 'deg)');
					$(this).css('-ms-transform', 'rotate(' + graditos + 'deg)');
					$(this).css('transform', 'rotate(' + graditos + 'deg)');
						
					
					$(this).css('top',oppRatio+'px');
					$(this).css('left',adjRatio+'px');
					
					contadorGrados = contadorGrados + parseFloat(.10);
				
					if (index == 0){
						//console.log('mouseY: '+mouseY+'mouseX: '+mouseX+'contenedoCuadros top:'+$('#contenedorCuadros').css('top')+'contenedoCuadros left:'+$('#contenedorCuadros').css('left')+'top: '+oppRatio+' left: '+adjRatio+' vectorGrados: '+vectorObjetos[index].grados+' index: '+index+' gradosTotal: '+graditos+' contador: '+contadorGrados+' contadorInterval: '+contadorInterval+'dist: '+dist+' distX: '+distX+' distY: '+distY);
					}
					
				}else{	
					
					if (contadorVueltas == 0){
						
						cancelAnimationFrame();
						
					}
					
					//console.log('-----------------------------------');
					//console.log('------------- Valores '+contadorVueltas+' ------------');
					contadorVueltas ++;
					
					contadorGrados = 0;
					//contadorGrados = parseInt(contadorGrados)
					
				}// End if
				
				
				
			});
		
			//console.log('Entra aqui');
			contadorInterval = 0;
			
		}
		
		miInterval = requestAnimationFrame(draw);
		contadorInterval = contadorInterval + 0.4;
		
	}

	
});






function devolverGrados(vectorGrados){
	
	//var tr		 = elemento.css('-webkit-transform') || elemento.css('transform') || elemento.css('-o-transform') || elemento.css('-moz-transform');
	var vector	 = new Array();
	var values 	 = vectorGrados.split('(')[1],
	values 	 	 = values.split(')')[0],
	values 	 	 = values.split(',');	
	
	var a = values[0]; // 0.866025
	var b = values[1]; // 0.5
	var c = values[2]; // -0.5
	var d = values[3]; // 0.866025
	
	var angleA  = Math.round(Math.asin(a) * (180/Math.PI));
	var angleB  = Math.round(Math.asin(b) * (180/Math.PI));
	var angleC  = Math.round(Math.asin(c) * (180/Math.PI));
	var angleD  = Math.round(Math.asin(d) * (180/Math.PI));
	
	vector[0]	= angleA;
	vector[1]	= angleB;
	vector[2]	= angleC;
	vector[3]	= angleD;
	
	//var angle2 = getGrades(b);
	//console.log('angleA: '+angleA+'angleB: '+angleB+'angleC: '+angleC,'angleD: '+angleD);
	
	//console.log(values);
	
	return (vector[1]);
	
}

function seno(grade){
	
	var radians = Math.sin(grade * Math.PI / 180)
	
	return radians;
	
}

function coseno(grade){
	
	var radians = Math.cos(grade * Math.PI / 180)
	
	return radians;
	
}

function arcoseno(seno){
	
	var grados = Math.asin(seno);
	
	return grados;
}

function arcocoseno(coseno){
	
	var grados = Math.acos(coseno);
	
	return grados;
}

function getRadians(degrees){
	
	var radians = degrees * Math.PI / 180
	return (radians);
	
}

function getGrades(radians){
	
	var degrees = radians * 180 / Math.PI
	return (degrees);
	
}

