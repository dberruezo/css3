	// panImageY function
	var porcentage 		  = 0;
	var velocidad  		  = 0;
	var directionMouse    = 0;
	var sHeight     	  = 0;
	var inicialY		  = 0;
	var $elemento 		  = 0;
	var $elementoCalcular = 0;
	var mouseX			  = 0;
	
	//panImageX function
	var porcentageX 		 = 0;
	var velocidadX  		 = 0;
	var directionMouseX      = 0;
	var sWidth     	       	 = 0;
	var inicialX		   	 = 0;
	var $elementoX 		   	 = 0;
	var $elementoXCalcular 	 = 0;
	var options1			 = {};
	var restringir			 = false;
	var mouseY				 = 0;
	
	// event,screenHeight,inicialY,elemento,elementoCalcular
	function parametrosPanImageY(screenHeight,inicialY,elemento,elementoCalcular,options){
		
		sHeight 	 	  = screenHeight;
		inicialY     	  = inicialY;
		$elemento     	  = elemento;
		$elementoCalcular = elementoCalcular;
		inicialY		  = inicialY;
		options1	  	  = options;	
		
		window.addEventListener('mousemove',panImageY,true);
		
	}
	
	
	function parametrosPanImageX(screenWidth,inicialX,elemento,elementoCalcular,options){
		
		sWidth 	 	  	   = screenWidth;
		inicialX     	   = inicialX;
		$elementoX     	   = elemento;
		$elementoCalcularX = elementoCalcular;
		inicialX		   = inicialX;
		options1	       = options;
		
		window.addEventListener('mousemove',panImageX,true);
		
	}
	
	console.log ('las options son: '+options1);
	
	function panImageY(event){
		
		porcentage = directionMouse / sHeight;
		
	    if (event.pageY < directionMouse) {
	        
	    	velocidad = porcentage;
	    	//console.log('From Bottom');
	        
	    } else {
	        
	    	velocidad = 1.5 - porcentage;	
	    	//console.log('From Top');
	        
	    }
	    
	    var resultado = inicialY - (( $elementoCalcular.height() - sHeight))* porcentage;
	    //resultado = resultado + "px";
	    directionMouse = event.pageY;
	    
	    TweenLite.to($elemento, .8, {top:resultado, ease:Expo.easeOut});
	    
	    /*
	    if (options1.restringirX == 0){
	    	
	    	TweenLite.to($elemento, .8, {top:resultado, ease:Expo.easeOut});
	    	
	    }else{
	    
	    	var offset = $elemento.offset();
	    	//console.log('left: '+offset.left+' top:'+offset.top+' right:'+offset.top+' bottom:'+offset.bottom);
	    	//console.log('mouseX: '+mouseX);
	    	
	    	inicialY = offset.top;
	    	
	    	if (mouseX > offset.left -200){
		    	
		    	TweenLite.to($elemento, .8, {top:resultado, ease:Expo.easeOut});
		    }
	    	
	    }
	    */
	    
	    
	    //TweenLite.to($elemento, .8, {top:resultado, ease:Expo.easeOut});
		
	    
	    console.log('-------------- valores -----------------');
		console.log("porcentage: "+porcentage);
		console.log("directionMouse: "+directionMouse);
		console.log("resultado: "+resultado);
		console.log("event.pageY: "+event.pageY);
		console.log("$elementoCalcular.height(): "+$elementoCalcular.height());
		console.log("sHeight: "+sHeight);
		console.log("inicialY: "+inicialY);
		console.log($elemento);
		console.log($elementoCalcular);
		console.log('-----------------------------------------');
	    
		
	    
	}
	
	
	function panImageX(event){
		
		porcentageX = directionMouseX / sWidth;
		
	    if (event.pageX < directionMouseX) {
	        
	    	velocidadX = porcentageX;
	    	//console.log('From Bottom');
	        
	    } else {
	        
	    	velocidadX = 1.5 - porcentageX;
	    	//console.log('From Top');
	        
	    }
	    
	    var resultado = inicialX - (( $elementoCalcularX.width() - sWidth))* porcentageX;
	    resultado = resultado + "px";
	    
	    directionMouseX = event.pageX;
	    mouseX			= event.pageX;
	    
	    //console.log('options'+options1.restringirX)
	    
	    TweenLite.to($elementoX, .8, {left:resultado, ease:Expo.easeOut});
	    
	    /*
	    if (options1.restringirX == 0){
	    	
	    	TweenLite.to($elementoX, .8, {left:resultado, ease:Expo.easeOut});
	    	
	    }
	    */
		
	    /*
	    console.log('-------------- valores -----------------');
		console.log("porcentage: "+porcentage);
		console.log("directionMouse: "+directionMouse);
		console.log("resultado: "+resultado);
		console.log("event.pageX: "+event.pageX);
		console.log("$elementoCalcular.width(): "+$elementoCalcular.width());
		console.log("sHeight: "+sHeight);
		console.log("inicialX: "+inicialX);
		console.log('-----------------------------------------');
	    */
		
		
	}
	
	
	
	
//});

/*
function rotate(degree) {
    
	/*
	console.log("grados"+degree);

	//CSSPlugin will intercept the "css" value...
	TweenLite.to($(".box"), 1, {css:{rotationY:degree}, ease:Power3.easeOut});
	*/
	
//TweenLite.to($("#isla"), 1, {css:{top:0}, ease:Power3.easeOut});

//tween = TweenMax.to($("#isla"), .8, {offsetTop:0,  ease:Linear.easeNone});

/*
function desplazarPanel(param1,param2){
	
	//window.scrollTop = 2000;
	
	console.log("Hola");
	//var scrollYPos = 2000;
	
	
	TweenLite.to($("#contenedorIsla"), 2, {top:"-1000px", ease:Power4.easeOut});
	
	//event.preventDefault();
	//TweenLite.to($("#sky"), 2, {scrollTo:{y:scrollYPos, x:0}, ease:Power4.easeOut})
	
	//tween = TweenMax.to($("#barraLateral"), .8, {left:param2, onComplete:finalizar, ease:Linear.easeNone});
	
}
*/

