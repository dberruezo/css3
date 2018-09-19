$(function() {
	
		// Screen
		var screenWidth  = $(window).width();
		var screenHeight = $(window).height();
		var options		 = {'restringirX':-200};
		
		//restringirX();
		
		lanzarPanImage();
		
		
		function restringirX(){
			
			var options = {
					
				'restringirX':-200,
						
			};
			
			options = this.options;
			
		}
		
		//console.log('options'+options.restringirX)
		
		function lanzarPanImage(){
			
			parametrosPanImageY(screenHeight,0,$('#foto'),$('#foto'),options);
			parametrosPanImageX(screenWidth,0,$('#foto'),$('#foto'),options);
			
		};
		
		//scalarImagen();
		
		function scalarImagen(){
			
			$("#barraScroll img").each(function(index){
				
				$(this).mouseover(function(){
					
					console.log('mouseover');
					TweenLite.to($(this), .5, {scaleX:1.5, scaleY:1.5, ease:Expo.easeOut});
					
				});
				
				$(this).mouseout(function(){
					
					console.log('mouseout');
					TweenLite.to($(this), .5, {scaleX:1, scaleY:1, ease:Expo.easeOut});
					
				});
				
				
			});
			
			//console.log('options'+options.restringirX);
			
			parametrosPanImageY(screenHeight,0,$('#barraScroll'),$('#barraScroll'),options);
			parametrosPanImageX(screenWidth,0,$('#barraScroll'),$('#barraScroll'),options);
			
		} 
		
		
		
	      
});