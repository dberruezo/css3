var contadorGrados1 = 0;

/* ************************************************* Listado de funciones ************************************************ */
// Capturamos Mouse y devolvemos las coordenadas
var captureMouse = function (element) {

	console.log(element);
	
	// Propiedades del objeto
	var mouse = {
		x:0,
		y:0,
		
	}

	// Lanzamos evento del objeto
	element.addEventListener('mousemove',function(event){
	
		//captureMouse.x = event.pageX;
		//captureMouse.y = event.pageY;
		
		if (event.pageX || event.pageY) {
			
			mouse.x = event.pageX;
			mouse.y = event.pageY;
		
		} else {
			
			mouse.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			mouse.y = event.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
		}
		
		mouse.x -= element.offsetLeft;
		mouse.y -= element.offsetTop;
		
	},true);
	
	return (mouse);

}	

	
// Parsea color a numero
parseColor = function (color, toNumber) {
	
	if (toNumber === true) {
	
		if (typeof color === 'number') {
			return (color | 0); //chop off decimal
		}
		
		if (typeof color === 'string' && color[0] === '#') {
			color = color.slice(1);
		}
		
		
		return window.parseInt(color, 16);
		
	} else {
		
		if (typeof color === 'number') {
			//make sure our hexadecimal number is padded out
			color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
		
		}
	
		return color;
	}

} // End function

// Crea un arco iris de colores
function rainbow(numOfSteps, step) {
    
	// This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distiguishable vibrant markers in Google Maps and other apps.
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    // Adam Cole, 2011-Sept-14
    
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1, g = f, b = 0; break;
        case 1: r = q, g = 1, b = 0; break;
        case 2: r = 0, g = 1, b = f; break;
        case 3: r = 0, g = q, b = 1; break;
        case 4: r = f, g = 0, b = 1; break;
        case 5: r = 1, g = 0, b = q; break;
    }
    
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

// Gris

function grayscale(src) {
	
	var supportsCanvas = !!document.createElement('canvas').getContext;
	
	if (supportsCanvas) {
		
		var canvas = document.createElement('canvas'), 
		context = canvas.getContext('2d'), 
		imageData, px, length, i = 0, gray, 
		img = new Image();
		
		img.src = src;
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0, 0);
			
		imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		px = imageData.data;
		length = px.length;
		
		for (; i < length; i += 4) {
			gray = px[i] * .3 + px[i + 1] * .59 + px[i + 2] * .11;
			px[i] = px[i + 1] = px[i + 2] = gray;
		}
				
		context.putImageData(imageData, 0, 0);
		return canvas.toDataURL();
	} else {
		return src;
	}
}

// Detectar Dispositivo
var detectarDispositivo = function(){
	
	/*
	this.info = '';
	
	// Saber si es MOBILE | TABLET | PC
	if (WURFL.is_mobile){
		
		versionMobile = true;		
		this.info = 'mobile';
		
	}else{
		
		versionMobile = false;
		this.info = 'desktop';
		
	}
	*/
	
	this.info = 'desktop';
	
	return this.info;
		
}

/* ***************************************** Listado de objetos ***************************************** */
//Objeto Ball
var Ball = function(radius, color) {
	
	if (radius === undefined) { 
		
		radius = 40; 
	
	}
	
	if (color === undefined) { 
		
		color = "#ff0000"; 
	
	}
		
	this.x = 0;
	this.y = 0;
	this.radius = radius;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = parseColor(color);
	this.lineWidth = 1;


}// End object

// Method object

Ball.prototype.draw = function (context) {
		
		context.save();
		context.translate(this.x, this.y);
		context.scale(this.scaleX, this.scaleY);
		context.lineWidth = this.lineWidth;
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
		context.closePath();
		context.fill();
	
		if (this.lineWidth > 0) {
		
			context.stroke();
		
		}
		
		context.restore();
	

} // Ball method draw

var Ball2 = function(radius, color) {
		
	this.x = 0;
	this.y = 0;
	this.radius = .5;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = parseColor(color);
	this.lineWidth = 1;


}// End object 

Ball2.prototype.draw = function (context) {
	
	context.save();
	context.translate(this.x, this.y);
	context.beginPath();
	context.arc(0,0,1,0,360);
	context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
	
	context.restore();

}


// Cuadrado
var cuadradoGrande = function(x, y, width, height,angle,radius,scaleX,scaleY,alpha,skewX,zpos) {
	
	this.x 		= x;
	this.y 		= y;
	this.width  = width;
	this.height = height;
	this.angle  = angle;
	this.radius = radius;
	this.scaleX = scaleX;
	this.scaleY = scaleY;
	this.alpha  = alpha;
	this.skewX  = skewX;
	this.zpos   = zpos;
	
} // End Object

/*
cuadradoGrande.prototype.draw(context){
	
	context.save();
	context.translate(this.x, this.y);
	context.beginPath();
	context.arc(0,0,1,0,360);
	context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
	
	context.restore();
	
}
*/

// Objeto Proyecto
var objetoProyecto = function(id,nombre,website){
	
	this.id 	 = id;
	this.nombre  = nombre;
	this.website = website; 
	
	this.imagenesListado = {
			
			0:'',
			1:'',
			2:'',
			3:'',
			4:'',
			5:'',
			7:'',
			8:'',
			9:'',
			10:'',
	
	};
	
	this.imagenesDetalle = {
			
			0:'',
			1:'',
			2:'',
			3:'',
			4:'',
			5:'',
			7:'',
			8:'',
			9:'',
			10:'',
			
	}
	
	this.imagenesCabecera = {
			
			0:'',
			1:'',
			2:'',
			3:'',
			4:'',
			5:'',
			7:'',
			8:'',
			9:'',
			10:'',
			
	}
	
	
}// End Object

var triangle = function (x1,y1,x2,y2,x3,y3){
	
	
	
}

var caracteristicas = function(grados,x,y,scale,nombre,valor){
	
	
	this.grados = grados;
	this.x 		= x;
	this.y 		= y;
	this.scale	= scale
	this.nombre = nombre;
	this.valor  = valor;
	
	
}

//Cuadrado
var fotosCircumferencia = function(x, y, width, height,angle,radius,scaleX,scaleY,imagen) {
	
	this.x 		= x;
	this.y 		= y;
	this.width  = width;
	this.height = height;
	this.angle  = angle;
	this.radius = radius;
	this.scaleX = scaleX;
	this.scaleY = scaleY;
	this.imagen = imagen;
	
} // End Object

function Cuadrado(config){
	
	this.x 				= config.x;
	this.y 				= config.y;
	this.angle			= config.angle;
	this.radius			= config.radius;
	this.z				= config.z;
	
	console.log('Entra aqui');

}

var contadorGrados1 = 0;

/* ************************************************* Listado de funciones ************************************************ */

	
// Parsea color a numero
parseColor = function (color, toNumber) {
	
	if (toNumber === true) {
	
		if (typeof color === 'number') {
			return (color | 0); //chop off decimal
		}
		
		if (typeof color === 'string' && color[0] === '#') {
			color = color.slice(1);
		}
		
		
		return window.parseInt(color, 16);
		
	} else {
		
		if (typeof color === 'number') {
			//make sure our hexadecimal number is padded out
			color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
		
		}
	
		return color;
	}

} // End function

// Crea un arco iris de colores
function rainbow(numOfSteps, step) {
    
	// This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distiguishable vibrant markers in Google Maps and other apps.
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    // Adam Cole, 2011-Sept-14
    
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1, g = f, b = 0; break;
        case 1: r = q, g = 1, b = 0; break;
        case 2: r = 0, g = 1, b = f; break;
        case 3: r = 0, g = q, b = 1; break;
        case 4: r = f, g = 0, b = 1; break;
        case 5: r = 1, g = 0, b = q; break;
    }
    
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

// Gris

function grayscale(src) {
	
	var supportsCanvas = !!document.createElement('canvas').getContext;
	
	if (supportsCanvas) {
		
		var canvas = document.createElement('canvas'), 
		context = canvas.getContext('2d'), 
		imageData, px, length, i = 0, gray, 
		img = new Image();
		
		img.src = src;
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0, 0);
			
		imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		px = imageData.data;
		length = px.length;
		
		for (; i < length; i += 4) {
			gray = px[i] * .3 + px[i + 1] * .59 + px[i + 2] * .11;
			px[i] = px[i + 1] = px[i + 2] = gray;
		}
				
		context.putImageData(imageData, 0, 0);
		return canvas.toDataURL();
	} else {
		return src;
	}
}

// Detectar Dispositivo
var detectarDispositivo = function(){
	
	this.info = '';
	
	// Saber si es MOBILE | TABLET | PC
	if (WURFL.is_mobile){
		
		versionMobile = true;		
		this.info = 'mobile';
		
	}else{
		
		versionMobile = false;
		this.info = 'desktop';
		
	}
	
	return this.info;
		
}

/* ***************************************** Listado de objetos ***************************************** */
//Objeto Ball
var Ball = function(radius, color) {
	
	if (radius === undefined) { 
		
		radius = 40; 
	
	}
	
	if (color === undefined) { 
		
		color = "#ff0000"; 
	
	}
		
	this.x = 0;
	this.y = 0;
	this.radius = radius;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = parseColor(color);
	this.lineWidth = 1;


}// End object

// Method object

Ball.prototype.draw = function (context) {
		
		context.save();
		context.translate(this.x, this.y);
		context.scale(this.scaleX, this.scaleY);
		context.lineWidth = this.lineWidth;
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
		context.closePath();
		context.fill();
	
		if (this.lineWidth > 0) {
		
			context.stroke();
		
		}
		
		context.restore();
	

} // Ball method draw

var Ball2 = function(radius, color) {
		
	this.x = 0;
	this.y = 0;
	this.radius = .5;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = parseColor(color);
	this.lineWidth = 1;


}// End object 

Ball2.prototype.draw = function (context) {
	
	context.save();
	context.translate(this.x, this.y);
	context.beginPath();
	context.arc(0,0,1,0,360);
	context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
	
	context.restore();

}


// Cuadrado
var cuadradoGrande = function(x, y, width, height,angle,radius,scaleX,scaleY,alpha,skewX,zpos) {
	
	this.x 		= x;
	this.y 		= y;
	this.width  = width;
	this.height = height;
	this.angle  = angle;
	this.radius = radius;
	this.scaleX = scaleX;
	this.scaleY = scaleY;
	this.alpha  = alpha;
	this.skewX  = skewX;
	this.zpos   = zpos;
	
} // End Object

/*
cuadradoGrande.prototype.draw(context){
	
	context.save();
	context.translate(this.x, this.y);
	context.beginPath();
	context.arc(0,0,1,0,360);
	context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
	
	context.restore();
	
}
*/

// Objeto Imagenes web aplicaciones
var imagenesApplicacion = function(){
	
	this.imgApplicacion = {
			
			0: '',
			1: '',
			2: '',
			3: '',
			4: '',
			5: '',
			6: '',
			7: '',
			8: '',
			9: '',
		   10: '',	
		 
		   
		   
	} // Objeto Application
	
	
	this.imgLetra = {
		// Bellido
		0:{
			img:'ImagenesLetras/Bellido/1.jpg',
			colection:'Bellido',
		},	
	
		1:{
			img:'ImagenesLetras/Bellido/2.jpg',
			colection:'Bellido',
		},
		
		2:{
			img:'ImagenesLetras/Bellido/3.jpg',
			colection:'Bellido',
		},
		
		3:{
			img:'ImagenesLetras/Bellido/4.jpg',
			colection:'Bellido',
		},
		
		4:{
			img:'ImagenesLetras/Bellido/5.jpg',
			colection:'Bellido',
		},
		
		// Berruezo
		
		5:{
			img:'ImagenesLetras/Berruezo/1.jpg',
			colection:'Berruezo',
		},	
	
		6:{
			img:'ImagenesLetras/Berruezo/2.jpg',
			colection:'Berruezo',
		},
		
		7:{
			img:'ImagenesLetras/Berruezo/3.jpg',
			colection:'Berruezo',
		},
		
		8:{
			img:'ImagenesLetras/Berruezo/4.jpg',
			colection:'Berruezo',
		},
		
		9:{
			img:'ImagenesLetras/Berruezo/5.jpg',
			colection:'Berruezo',
		},
		
		10:{
			img:'ImagenesLetras/Berruezo/6.jpg',
			colection:'Berruezo',
		},
		
		11:{
			img:'ImagenesLetras/Berruezo/7.jpg',
			colection:'Berruezo',
		},
		
		12:{
			img:'ImagenesLetras/Berruezo/8.jpg',
			colection:'Berruezo',
		},
		
		13:{
			img:'ImagenesLetras/Berruezo/9.jpg',
			colection:'Berruezo',
		},
		
		14:{
			img:'ImagenesLetras/Berruezo/10.jpg',
			colection:'Berruezo',
		},
		
		// Besston
		
		15:{
			img:'ImagenesLetras/Besston/1.jpg',
			colection:'Besston',
		},
		
		16:{
			img:'ImagenesLetras/Besston/2.jpg',
			colection:'Besston',
		},
		
		17:{
			img:'ImagenesLetras/Besston/3.jpg',
			colection:'Besston',
		},
		
		18:{
			img:'ImagenesLetras/Besston/4.jpg',
			colection:'Besston',
		},
		
		19:{
			img:'ImagenesLetras/Besston/5.jpg',
			colection:'Besston',
		},
		
		20:{
			img:'ImagenesLetras/Besston/6.jpg',
			colection:'Besston',
		},
		
		21:{
			img:'ImagenesLetras/Besston/7.jpg',
			colection:'Besston',
		},
		
		22:{
			img:'ImagenesLetras/Besston/8.jpg',
			colection:'Besston',
		},
		
		23:{
			img:'ImagenesLetras/Besston/9.jpg',
			colection:'Besston',
		},
		
		24:{
			img:'ImagenesLetras/Besston/10.jpg',
			colection:'Besston',
		},
		
		// Grisby
		
		25:{
			img:'ImagenesLetras/Grisby/1.jpg',
			colection:'Grisby',
		},
		
		26:{
			img:'ImagenesLetras/Grisby/2.jpg',
			colection:'Grisby',
		},
		
		27:{
			img:'ImagenesLetras/Grisby/3.jpg',
			colection:'Grisby',
		},
		
		28:{
			img:'ImagenesLetras/Grisby/4.jpg',
			colection:'Grisby',
		},
		
		29:{
			img:'ImagenesLetras/Grisby/5.jpg',
			colection:'Grisby',
		},
		
		30:{
			img:'ImagenesLetras/Grisby/6.jpg',
			colection:'Grisby',
		},
		
		31:{
			img:'ImagenesLetras/Grisby/7.jpg',
			colection:'Grisby',
		},
		
		32:{
			img:'ImagenesLetras/Grisby/8.jpg',
			colection:'Grisby',
		},
		
		33:{
			img:'ImagenesLetras/Grisby/9.jpg',
			colection:'Grisby',
		},
		
		34:{
			img:'ImagenesLetras/Grisby/10.jpg',
			colection:'Grisby',
		},
		
		// Look
		
		35:{
			img:'ImagenesLetras/Look/1.jpg',
			colection:'Look',
		},
		
		36:{
			img:'ImagenesLetras/Look/2.jpg',
			colection:'Look',
		},
		
		// Look & look
		37:{
			img:'ImagenesLetras/Look/3.jpg',
			colection:'Look',
		},
		
		38:{
			img:'ImagenesLetras/Look/4.jpg',
			colection:'Look',
		},
		
		39:{
			img:'ImagenesLetras/Look/5.jpg',
			colection:'Look',
		},
		
		40:{
			img:'ImagenesLetras/Look/6.jpg',
			colection:'Look',
		},
		
		41:{
			img:'ImagenesLetras/Look/7.jpg',
			colection:'Look',
		},
		
		42:{
			img:'ImagenesLetras/Look/8.jpg',
			colection:'Look',
		},
		
		43:{
			img:'ImagenesLetras/Look/9.jpg',
			colection:'Look',
		},
		
		44:{
			img:'ImagenesLetras/Look/10.jpg',
			colection:'Look',
		},
		
		// OderMark
		45:{
			
			img:'ImagenesLetras/OderMark/1.jpg',
			colection:'OderMark',
			
		},
		
		46:{
			
			img:'ImagenesLetras/OderMark/2.jpg',
			colection:'OderMark',
			
		},
		
		47:{
			
			img:'ImagenesLetras/OderMark/3.jpg',
			colection:'OderMark',
			
		},
		
		48:{
			
			img:'ImagenesLetras/OderMark/4.jpg',
			colection:'OderMark',
			
		},
		
		49:{
			
			img:'ImagenesLetras/OderMark/5.jpg',
			colection:'OderMark',
			
		},
		
		50:{
			
			img:'ImagenesLetras/OderMark/6.jpg',
			colection:'OderMark',
			
		},
		
		// Ramos
		
		51: {
			
			img:'ImagenesLetras/Ramos/1.jpg',
			colection:'Ramos',
			
		},
		
		52: {
			
			img:'ImagenesLetras/Ramos/2.jpg',
			colection:'Ramos',
			
		},
		
		53: {
			
			img:'ImagenesLetras/Ramos/3.jpg',
			colection:'Ramos',
			
		},
		
		54: {
			
			img:'ImagenesLetras/Ramos/4.jpg',
			colection:'Ramos',
			
		},
		
		
		55: {
			
			img:'ImagenesLetras/Ramos/5.jpg',
			colection:'Ramos',
			
		},
		
		56: {
			
			img:'ImagenesLetras/Ramos/6.jpg',
			colection:'Ramos',
			
		},
		
		57: {
			
			img:'ImagenesLetras/Ramos/7.jpg',
			colection:'Ramos',
			
		},
		
		58: {
			
			img:'ImagenesLetras/Ramos/8.jpg',
			colection:'Ramos',
			
		},
		
		59: {
			
			img:'ImagenesLetras/Ramos/9.jpg',
			colection:'Ramos',
			
		},
		
		60: {
			
			img:'ImagenesLetras/Ramos/10.jpg',
			colection:'Ramos',
			
		},
		
		// Canali
		
		61: {
			
			img:'ImagenesLetras/Canali/1.jpg',
			colection:'Canali',
			
		},
		
		62: {
			
			img:'ImagenesLetras/Canali/2.jpg',
			colection:'Canali',
			
		},
		
		63: {
			
			img:'ImagenesLetras/Canali/3.jpg',
			colection:'Canali',
			
		},
		
		64: {
			
			img:'ImagenesLetras/Canali/4.jpg',
			colection:'Canali',
			
		},
		
		65: {
			
			img:'ImagenesLetras/Canali/5.jpg',
			colection:'Canali',
			
		},
		
		
		66: {
			
			img:'ImagenesLetras/Canali/6.jpg',
			colection:'Canali',
			
		},
		
		67: {
			
			img:'ImagenesLetras/Canali/7.jpg',
			colection:'Canali',
			
		},
		
		68: {
			
			img:'ImagenesLetras/Canali/8.jpg',
			colection:'Canali',
			
		},
		
		69: {
			
			img:'ImagenesLetras/Canali/9.jpg',
			colection:'Canali',
			
		},
		
		70: {
			
			img:'ImagenesLetras/Canali/10.jpg',
			colection:'Canali',
			
		},
		
		// Sellini
		71: {
			
			img:'ImagenesLetras/Sellini/1.jpg',
			colection:'Sellini',
			
		},
		
		72: {
			
			img:'ImagenesLetras/Sellini/2.jpg',
			colection:'Sellini',
			
		},
		
		73: {
			
			img:'ImagenesLetras/Sellini/3.jpg',
			colection:'Sellini',
			
		},
		
		74: {
			
			img:'ImagenesLetras/Sellini/4.jpg',
			colection:'Sellini',
			
		},
		
		75: {
			
			img:'ImagenesLetras/Sellini/5.jpg',
			colection:'Sellini',
			
		},
		
		76: {
			
			img:'ImagenesLetras/Sellini/6.jpg',
			colection:'Sellini',
			
		},
		
		77: {
			
			img:'ImagenesLetras/Sellini/7.jpg',
			colection:'Sellini',
			
		},
		
		78: {
			
			img:'ImagenesLetras/Sellini/8.jpg',
			colection:'Sellini',
			
		},
		
		79: {
			
			img:'ImagenesLetras/Sellini/9.jpg',
			colection:'Sellini',
			
		},
		
		80: {
			
			img:'ImagenesLetras/Sellini/10.jpg',
			colection:'Sellini',
			
		},
	
		
		
	},
	
	this.imgScroll = {
		
		// Bellido
		0:{
			
			img:'ImagenesScroll/Bellido/1.png',
			collection:'Bellido',
			
		},
	
		1:{
		
			img:'ImagenesScroll/Bellido/2.png',
			collection:'Bellido',
		
		},
	
		2:{
			
			img:'ImagenesScroll/Bellido/3.png',
			collection:'Bellido',
		
		},
	
		3:{
			
			img:'ImagenesScroll/Bellido/4.png',
			collection:'Bellido',
		
		},
	
		4:{
			
			img:'ImagenesScroll/Bellido/5.png',
			collection:'Bellido',
		
		},
	
		// Berruezo
		5:{
			
			img:'ImagenesScroll/Berruezo/1.png',
			collection:'Berruezo',
		
		},
		
		6:{
			
			img:'ImagenesScroll/Berruezo/2.png',
			collection:'Berruezo',
		
		},
		
		7:{
			
			img:'ImagenesScroll/Berruezo/3.png',
			collection:'Berruezo',
		
		},
	
		8:{
			
			img:'ImagenesScroll/Berruezo/4.png',
			collection:'Berruezo',
		
		},	
	
		9:{
			
			img:'ImagenesScroll/Berruezo/5.png',
			collection:'Berruezo',
		
		},		
	
		10:{
			
			img:'ImagenesScroll/Berruezo/6.png',
			collection:'Berruezo',
		
		},	
	
		11:{
			
			img:'ImagenesScroll/Berruezo/7.png',
			collection:'Berruezo',
		
		},
	
		12:{
			
			img:'ImagenesScroll/Berruezo/8.png',
			collection:'Berruezo',
		
		},
	
		13:{
			
			img:'ImagenesScroll/Berruezo/9.png',
			collection:'Berruezo',
		
		},	
	
		14:{
			
			img:'ImagenesScroll/Berruezo/10.png',
			collection:'Berruezo',
		
		},
		
		// Besston
	
		15:{
			
			img:'ImagenesScroll/Besston/1.png',
			collection:'Besston',
		
		},
		
		16:{
			
			img:'ImagenesScroll/Besston/2.png',
			collection:'Besston',
		
		},
	
		17:{
			
			img:'ImagenesScroll/Besston/3.png',
			collection:'Besston',
		
		},	
	
	
		18:{
			
			img:'ImagenesScroll/Besston/4.png',
			collection:'Besston',
		
		},
	
		19:{
			
			img:'ImagenesScroll/Besston/5.png',
			collection:'Besston',
		
		},
	
		20:{
			
			img:'ImagenesScroll/Besston/6.png',
			collection:'Besston',
		
		},
		
		
		21:{
			
			img:'ImagenesScroll/Besston/7.png',
			collection:'Besston',
		
		},
	
		22:{
			
			img:'ImagenesScroll/Besston/8.png',
			collection:'Besston',
		
		},
	
		23:{
			
			img:'ImagenesScroll/Besston/9.png',
			collection:'Besston',
		
		},
		
		24:{
			
			img:'ImagenesScroll/Besston/10.png',
			collection:'Besston',
		
		},
	
		// Grisby
		25:{
			
			img:'ImagenesScroll/Grisby/1.png',
			collection:'Grisby',
		
		},
	
		26:{
			
			img:'ImagenesScroll/Grisby/2.png',
			collection:'Grisby',
		
		},
		
		27:{
			
			img:'ImagenesScroll/Grisby/3.png',
			collection:'Grisby',
		
		},
	
		28:{
			
			img:'ImagenesScroll/Grisby/4.png',
			collection:'Grisby',
		
		},
	
		29:{
			
			img:'ImagenesScroll/Grisby/5.png',
			collection:'Grisby',
		
		},
	
		30:{
			
			img:'ImagenesScroll/Grisby/6.png',
			collection:'Grisby',
		
		},
	
		31:{
			
			img:'ImagenesScroll/Grisby/7.png',
			collection:'Grisby',
		
		},
		
		32:{
			
			img:'ImagenesScroll/Grisby/8.png',
			collection:'Grisby',
		
		},
	
		33:{
			
			img:'ImagenesScroll/Grisby/9.png',
			collection:'Grisby',
		
		},	
	
		34:{
			
			img:'ImagenesScroll/Grisby/10.png',
			collection:'Grisby',
		
		},	
	
		//Look
		35:{
			
			img:'ImagenesScroll/Look/1.png',
			collection:'Look',
		
		},	
	
		36:{
			
			img:'ImagenesScroll/Look/2.png',
			collection:'Look',
		
		},	
	
		37:{
			
			img:'ImagenesScroll/Look/3.png',
			collection:'Look',
		
		},		
		
		38:{
			
			img:'ImagenesScroll/Look/4.png',
			collection:'Look',
		
		},			
	
		39:{
			
			img:'ImagenesScroll/Look/5.png',
			collection:'Look',
		
		},	
		
		40:{
			
			img:'ImagenesScroll/Look/6.png',
			collection:'Look',
		
		},	
		
		41:{
			
			img:'ImagenesScroll/Look/7.png',
			collection:'Look',
		
		},	
		
		42:{
			
			img:'ImagenesScroll/Look/8.png',
			collection:'Look',
		
		},	
		
		43:{
			
			img:'ImagenesScroll/Look/9.png',
			collection:'Look',
		
		},	
		
		44:{
			
			img:'ImagenesScroll/Look/10.png',
			collection:'Look',
		
		},	
		
		// OderMark
		45:{
			
			img:'ImagenesScroll/OderMark/1.png',
			collection:'OderMark',
		
		},	
		
		46:{
			
			img:'ImagenesScroll/OderMark/2.png',
			collection:'OderMark',
		
		},	
		
		47:{
			
			img:'ImagenesScroll/OderMark/3.png',
			collection:'OderMark',
		
		},	
		
		48:{
			
			img:'ImagenesScroll/OderMark/4.png',
			collection:'OderMark',
		
		},
	
		49:{
			
			img:'ImagenesScroll/OderMark/5.png',
			collection:'OderMark',
		
		},
		
	
		50:{
			
			img:'ImagenesScroll/OderMark/6.png',
			collection:'OderMark',
		
		},
		
		// Ramos
		51:{
			
			img:'ImagenesScroll/Ramos/1.png',
			collection:'Ramos',
		
		},
			
		52:{
			
			img:'ImagenesScroll/Ramos/2.png',
			collection:'Ramos',
		
		},
		
		53:{
			
			img:'ImagenesScroll/Ramos/3.png',
			collection:'Ramos',
		
		},
		
		54:{
			
			img:'ImagenesScroll/Ramos/4.png',
			collection:'Ramos',
		
		},
		
		55:{
			
			img:'ImagenesScroll/Ramos/5.png',
			collection:'Ramos',
		
		},
		
		
		56:{
			
			img:'ImagenesScroll/Ramos/6.png',
			collection:'Ramos',
		
		},
		
		57:{
			
			img:'ImagenesScroll/Ramos/7.png',
			collection:'Ramos',
		
		},
		
		58:{
			
			img:'ImagenesScroll/Ramos/8.png',
			collection:'Ramos',
		
		},
		
		59:{
			
			img:'ImagenesScroll/Ramos/9.png',
			collection:'Ramos',
		
		},
		
		60:{
			
			img:'ImagenesScroll/Ramos/10.png',
			collection:'Ramos',
		
		},
		
		// Canali
		
		61:{
			
			img:'ImagenesScroll/Canali/1.png',
			collection:'Canali',
		
		},
		
		62:{
			
			img:'ImagenesScroll/Canali/2.png',
			collection:'Canali',
		
		},
		
		63:{
			
			img:'ImagenesScroll/Canali/3.png',
			collection:'Canali',
		
		},
		
		64:{
			
			img:'ImagenesScroll/Canali/4.png',
			collection:'Canali',
		
		},
		
		65:{
			
			img:'ImagenesScroll/Canali/5.png',
			collection:'Canali',
		
		},
		
		
		66:{
			
			img:'ImagenesScroll/Canali/6.png',
			collection:'Canali',
		
		},
		
		67:{
			
			img:'ImagenesScroll/Canali/7.png',
			collection:'Canali',
		
		},
		
			
		68:{
			
			img:'ImagenesScroll/Canali/8.png',
			collection:'Canali',
		
		},
		
		69:{
			
			img:'ImagenesScroll/Canali/9.png',
			collection:'Canali',
		
		},
		
		70:{
			
			img:'ImagenesScroll/Canali/10.png',
			collection:'Canali',
		
		},
		
		// Sellini
		71:{
			
			img:'ImagenesScroll/Sellini/1.png',
			collection:'Sellini',
		
		},
		
		72:{
			
			img:'ImagenesScroll/Sellini/2.png',
			collection:'Sellini',
		
		},
		
		73:{
			
			img:'ImagenesScroll/Sellini/3.png',
			collection:'Sellini',
		
		},
		
		74:{
			
			img:'ImagenesScroll/Sellini/4.png',
			collection:'Sellini',
		
		},
		
		
		75:{
			
			img:'ImagenesScroll/Sellini/5.png',
			collection:'Sellini',
		
		},
		
		76:{
			
			img:'ImagenesScroll/Sellini/6.png',
			collection:'Sellini',
		
		},
		
		77:{
			
			img:'ImagenesScroll/Sellini/7.png',
			collection:'Sellini',
		
		},
		
		78:{
			
			img:'ImagenesScroll/Sellini/8.png',
			collection:'Sellini',
		
		},
		
		79:{
			
			img:'ImagenesScroll/Sellini/9.png',
			collection:'Sellini',
		
		},
		
		80:{
			
			img:'ImagenesScroll/Sellini/10.png',
			collection:'Sellini',
		
		}
		
	},
	
	this.bigImg = {
			
			// Bellido
			0:{
				
				img:'ImagenesScroll/Bellido/1.png',
				collection:'Bellido',
				
			},
		
			1:{
			
				img:'ImagenesScroll/Bellido/2.png',
				collection:'Bellido',
			
			},
		
			2:{
				
				img:'ImagenesScroll/Bellido/3.png',
				collection:'Bellido',
			
			},
		
			3:{
				
				img:'ImagenesScroll/Bellido/4.png',
				collection:'Bellido',
			
			},
		
			4:{
				
				img:'ImagenesScroll/Bellido/5.png',
				collection:'Bellido',
			
			},
		
			// Berruezo
			5:{
				
				img:'ImagenesScroll/Berruezo/1.png',
				collection:'Berruezo',
			
			},
			
			6:{
				
				img:'ImagenesScroll/Berruezo/2.png',
				collection:'Berruezo',
			
			},
			
			7:{
				
				img:'ImagenesScroll/Berruezo/3.png',
				collection:'Berruezo',
			
			},
		
			8:{
				
				img:'ImagenesScroll/Berruezo/4.png',
				collection:'Berruezo',
			
			},	
		
			9:{
				
				img:'ImagenesScroll/Berruezo/5.png',
				collection:'Berruezo',
			
			},		
		
			10:{
				
				img:'ImagenesScroll/Berruezo/6.png',
				collection:'Berruezo',
			
			},	
		
			11:{
				
				img:'ImagenesScroll/Berruezo/7.png',
				collection:'Berruezo',
			
			},
		
			12:{
				
				img:'ImagenesScroll/Berruezo/8.png',
				collection:'Berruezo',
			
			},
		
			13:{
				
				img:'ImagenesScroll/Berruezo/9.png',
				collection:'Berruezo',
			
			},	
		
			14:{
				
				img:'ImagenesScroll/Berruezo/10.png',
				collection:'Berruezo',
			
			},
			
			// Besston
		
			15:{
				
				img:'ImagenesScroll/Besston/1.png',
				collection:'Besston',
			
			},
			
			16:{
				
				img:'ImagenesScroll/Besston/2.png',
				collection:'Besston',
			
			},
		
			17:{
				
				img:'ImagenesScroll/Besston/3.png',
				collection:'Besston',
			
			},	
		
		
			18:{
				
				img:'ImagenesScroll/Besston/4.png',
				collection:'Besston',
			
			},
		
			19:{
				
				img:'ImagenesScroll/Besston/5.png',
				collection:'Besston',
			
			},
		
			20:{
				
				img:'ImagenesScroll/Besston/6.png',
				collection:'Besston',
			
			},
			
			
			21:{
				
				img:'ImagenesScroll/Besston/7.png',
				collection:'Besston',
			
			},
		
			22:{
				
				img:'ImagenesScroll/Besston/8.png',
				collection:'Besston',
			
			},
		
			23:{
				
				img:'ImagenesScroll/Besston/9.png',
				collection:'Besston',
			
			},
			
			24:{
				
				img:'ImagenesScroll/Besston/10.png',
				collection:'Besston',
			
			},
		
			// Grisby
			25:{
				
				img:'ImagenesScroll/Grisby/1.png',
				collection:'Grisby',
			
			},
		
			26:{
				
				img:'ImagenesScroll/Grisby/2.png',
				collection:'Grisby',
			
			},
			
			27:{
				
				img:'ImagenesScroll/Grisby/3.png',
				collection:'Grisby',
			
			},
		
			28:{
				
				img:'ImagenesScroll/Grisby/4.png',
				collection:'Grisby',
			
			},
		
			29:{
				
				img:'ImagenesScroll/Grisby/5.png',
				collection:'Grisby',
			
			},
		
			30:{
				
				img:'ImagenesScroll/Grisby/6.png',
				collection:'Grisby',
			
			},
		
			31:{
				
				img:'ImagenesScroll/Grisby/7.png',
				collection:'Grisby',
			
			},
			
			32:{
				
				img:'ImagenesScroll/Grisby/8.png',
				collection:'Grisby',
			
			},
		
			33:{
				
				img:'ImagenesScroll/Grisby/9.png',
				collection:'Grisby',
			
			},	
		
			34:{
				
				img:'ImagenesScroll/Grisby/10.png',
				collection:'Grisby',
			
			},	
		
			//Look
			35:{
				
				img:'ImagenesScroll/Look/1.png',
				collection:'Look',
			
			},	
		
			36:{
				
				img:'ImagenesScroll/Look/2.png',
				collection:'Look',
			
			},	
		
			37:{
				
				img:'ImagenesScroll/Look/3.png',
				collection:'Look',
			
			},		
			
			38:{
				
				img:'ImagenesScroll/Look/4.png',
				collection:'Look',
			
			},			
		
			39:{
				
				img:'ImagenesScroll/Look/5.png',
				collection:'Look',
			
			},	
			
			40:{
				
				img:'ImagenesScroll/Look/6.png',
				collection:'Look',
			
			},	
			
			41:{
				
				img:'ImagenesScroll/Look/7.png',
				collection:'Look',
			
			},	
			
			42:{
				
				img:'ImagenesScroll/Look/8.png',
				collection:'Look',
			
			},	
			
			43:{
				
				img:'ImagenesScroll/Look/9.png',
				collection:'Look',
			
			},	
			
			44:{
				
				img:'ImagenesScroll/Look/10.png',
				collection:'Look',
			
			},	
			
			// OderMark
			45:{
				
				img:'ImagenesScroll/OderMark/1.png',
				collection:'OderMark',
			
			},	
			
			46:{
				
				img:'ImagenesScroll/OderMark/2.png',
				collection:'OderMark',
			
			},	
			
			47:{
				
				img:'ImagenesScroll/OderMark/3.png',
				collection:'OderMark',
			
			},	
			
			48:{
				
				img:'ImagenesScroll/OderMark/4.png',
				collection:'OderMark',
			
			},
		
			49:{
				
				img:'ImagenesScroll/OderMark/5.png',
				collection:'OderMark',
			
			},
			
		
			50:{
				
				img:'ImagenesScroll/OderMark/6.png',
				collection:'OderMark',
			
			},
			
			// Ramos
			51:{
				
				img:'ImagenesScroll/Ramos/1.png',
				collection:'Ramos',
			
			},
				
			52:{
				
				img:'ImagenesScroll/Ramos/2.png',
				collection:'Ramos',
			
			},
			
			53:{
				
				img:'ImagenesScroll/Ramos/3.png',
				collection:'Ramos',
			
			},
			
			54:{
				
				img:'ImagenesScroll/Ramos/4.png',
				collection:'Ramos',
			
			},
			
			55:{
				
				img:'ImagenesScroll/Ramos/5.png',
				collection:'Ramos',
			
			},
			
			
			56:{
				
				img:'ImagenesScroll/Ramos/6.png',
				collection:'Ramos',
			
			},
			
			57:{
				
				img:'ImagenesScroll/Ramos/7.png',
				collection:'Ramos',
			
			},
			
			58:{
				
				img:'ImagenesScroll/Ramos/8.png',
				collection:'Ramos',
			
			},
			
			59:{
				
				img:'ImagenesScroll/Ramos/9.png',
				collection:'Ramos',
			
			},
			
			60:{
				
				img:'ImagenesScroll/Ramos/10.png',
				collection:'Ramos',
			
			},
			
			// Canali
			
			61:{
				
				img:'ImagenesScroll/Canali/1.png',
				collection:'Canali',
			
			},
			
			62:{
				
				img:'ImagenesScroll/Canali/2.png',
				collection:'Canali',
			
			},
			
			63:{
				
				img:'ImagenesScroll/Canali/3.png',
				collection:'Canali',
			
			},
			
			64:{
				
				img:'ImagenesScroll/Canali/4.png',
				collection:'Canali',
			
			},
			
			65:{
				
				img:'ImagenesScroll/Canali/5.png',
				collection:'Canali',
			
			},
			
			
			66:{
				
				img:'ImagenesScroll/Canali/6.png',
				collection:'Canali',
			
			},
			
			67:{
				
				img:'ImagenesScroll/Canali/7.png',
				collection:'Canali',
			
			},
			
				
			68:{
				
				img:'ImagenesScroll/Canali/8.png',
				collection:'Canali',
			
			},
			
			69:{
				
				img:'ImagenesScroll/Canali/9.png',
				collection:'Canali',
			
			},
			
			70:{
				
				img:'ImagenesScroll/Canali/10.png',
				collection:'Canali',
			
			},
			
			// Sellini
			71:{
				
				img:'ImagenesScroll/Sellini/1.png',
				collection:'Sellini',
			
			},
			
			72:{
				
				img:'ImagenesScroll/Sellini/2.png',
				collection:'Sellini',
			
			},
			
			73:{
				
				img:'ImagenesScroll/Sellini/3.png',
				collection:'Sellini',
			
			},
			
			74:{
				
				img:'ImagenesScroll/Sellini/4.png',
				collection:'Sellini',
			
			},
			
			
			75:{
				
				img:'ImagenesScroll/Sellini/5.png',
				collection:'Sellini',
			
			},
			
			76:{
				
				img:'ImagenesScroll/Sellini/6.png',
				collection:'Sellini',
			
			},
			
			77:{
				
				img:'ImagenesScroll/Sellini/7.png',
				collection:'Sellini',
			
			},
			
			78:{
				
				img:'ImagenesScroll/Sellini/8.png',
				collection:'Sellini',
			
			},
			
			79:{
				
				img:'ImagenesScroll/Sellini/9.png',
				collection:'Sellini',
			
			},
			
			80:{
				
				img:'ImagenesScroll/Sellini/10.png',
				collection:'Sellini',
			
			}
	
			
			
			
	}
	
	
	
	
	
	
}



// Objeto Proyecto
var objetoProyecto = function(id,nombre,website){
	
	this.id 	 = id;
	this.nombre  = nombre;
	this.website = website; 
	
	this.imagenesListado = {
			
			0:'',
			1:'',
			2:'',
			3:'',
			4:'',
			5:'',
			7:'',
			8:'',
			9:'',
			10:'',
	
	};
	
	this.imagenesMovil = {
			
			0:'',
			
	}
	
	
	this.imagenesDetalle = {
			
			0:'',
			1:'',
			2:'',
			3:'',
			4:'',
			5:'',
			7:'',
			8:'',
			9:'',
			10:'',
			
	}
	
	this.imagenesCabecera = {
			
			0:'',
			1:'',
			2:'',
			3:'',
			4:'',
			5:'',
			7:'',
			8:'',
			9:'',
			10:'',
			
	}
	
	
}// End Object

var triangle = function (x1,y1,x2,y2,x3,y3){
	
	
	
}

var caracteristicas = function(grados,x,y,scale,nombre,valor){
	
	
	this.grados = grados;
	this.x 		= x;
	this.y 		= y;
	this.scale	= scale
	this.nombre = nombre;
	this.valor  = valor;
	
	
}

//Cuadrado
var fotosCircumferencia = function(x, y, width, height,angle,radius,scaleX,scaleY,imagen) {
	
	this.x 		= x;
	this.y 		= y;
	this.width  = width;
	this.height = height;
	this.angle  = angle;
	this.radius = radius;
	this.scaleX = scaleX;
	this.scaleY = scaleY;
	this.imagen = imagen;
	
} // End Object


function Cuadrado(config){
	
	this.x 				= config.x;
	this.y 				= config.y;
	this.angle			= config.angle;
	this.radioX			= config.radioX;
	this.radioY			= config.radioY;
	this.z				= config.z;
	this.width			= config.width;
	this.height			= config.height;
	this.rotation		= config.rotation;
	this.imagen			= config.imagen;
	this.btn			= config.btn;
	this.btnHover		= config.btnHover;
	this.margenX		= config.margenX;
	this.margenY		= config.margenY;
	this.scaleX			= config.scaleX;
	this.scaleY			= config.scaleY;
	this.alpha			= config.alpha;
	
}

Cuadrado.prototype.draw = function (context,over){
	
	var adjRatio = 0;
	var oppRatio = 0;
	var scale    = 0;
	var alpha    = 0;
	var sin 	 = Math.sin( this.angle*(Math.PI/180) );
	var cos		 = Math.cos(this.angle*(Math.PI/180));
	
	adjRatio = this.margenX + this.radioX * cos; // CAH
	oppRatio = this.margenY + this.radioY * sin; // SOH
	
	if (sin >= 0 && sin <= 180 ){
		
		scale = 1 + Math.abs(sin);
		alpha = 1 + Math.abs(sin);
		
	}else{
		
		scale = 1 - Math.abs(sin) / 2;
		alpha = 1 - Math.abs(sin) / 2;
		
		
	}
	
	this.scaleX = scale;
	this.scaleY = scale;
	this.alpha  = alpha;
	this.x		= adjRatio;
	this.y		= oppRatio;
	
	// Guardamos context
	context.save();
	context.translate(adjRatio, oppRatio);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.globalAlpha = alpha;
	// Dibujamos Objetos
	// Dibujamos cuadro

	if (over == 1){
		
		context.drawImage(this.btnHover,-75/2,30,75,15);
		context.fillStyle = '#046799';
	
	}else{
		
		context.drawImage(this.btn,-75/2,30,75,15);
		context.fillStyle = '#02a5e1';
		
	}
	
	context.lineWidth = 2;
	context.fillRect(-83/2, -43/2, 83, 43);
	context.strokeStyle = "#02a5e1"; // line color
	
	// Dibujamos imagen
	context.drawImage(this.imagen,-80/2,-40/2,80,40);
	
	
	/*
	context.beginPath();
				
	// Vertical
	context.lineWidth = 1;
	context.moveTo(-40, 40);
	context.lineTo(-40, 20);
				
	// Horizontal
	context.moveTo(10, 40);
	context.lineTo(-40, 40);
	*/	
				
	// Text
	/*
	context.font = "6pt Arial";
	context.fillStyle = "#333333";
	context.fillText("Front End", -20, 42);
	context.stroke();
	*/
	
	// Restauramos context
	context.restore();
	
}

Cuadrado.prototype.getBounds = function () {
	
	return {
		
		x: this.x - 40,
		y: this.y - 20,
		width: 80,
		height: 40
	
	}
	
}

Cuadrado.prototype.containsPoint = function (rect, x, y) {
	
	return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height);

};

