var directionMouse = 0;

$(document).ready(function(){
			
			window.addEventListener('mousemove',mover,true);
	
			function mover(event){
				
				if (event.pageY < directionMouse) {
			        
			    	console.log('From Bottom: '+event.pageY+'Direction Mouse: '+directionMouse);
			        
			    } else {
			        
			    	console.log('From Top: '+event.pageY+'Direction Mouse: '+directionMouse);
			    	
			    }
			    		    
			    directionMouse 		= event.pageY;
				
			    mover2(event);
			    
			}
	
			function mover2(event){
				
				console.log('Nuevo evento: '+event.pageY+'Direction Mouse: '+directionMouse);
				
			}
		    
		    
});		    