/**
 * Created by David on 14/03/2016.
 */





Controller.prototype.cssMobile = function(){

    console.log('cuantas veces entra');

    var that   = this;
    var div    = '';
    var start  = false;
    var texto  = 0;

    // Cargamos los estilos para movil | tablet | devices
    file = location.pathname.split( "/" ).pop();
    link = document.createElement( "link" );
    link.href = file.substr( 0, file.lastIndexOf( "/" ) ) + "css/mobile.css";
    link.type  = "text/css";
    link.rel   = "stylesheet";
    link.media = "screen,print";
    document.getElementsByTagName( "head" )[0].appendChild( link );

    // Cargamos el codigo html para movil | tablet | devices
    $('#principal').load('mobile.html', function( response, status, xhr ) {

        console.log('cargado');

        // Cargamos logotipo
        div = '<div class="row">';
        div += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">';
        div += '<img src="http://localhost/javascript/ecommerce/img/logo2.png">';
        div +='</div></div>';

        $('#principal').append(div);

        // Listado de proyectos
        div = '<div class="row">';
        div += '<h1 style="font-size:14px;display:block;margin-left:15px;">Listado de proyectos</h1>';
        div +='</div>';

        $('#principal').append(div);


        console.log('total vectores: '+that.vectorProyectos.length);

        //  Cargamos im�genes proyectos
        for (var i=0; i < that.vectorProyectos.length; i++){

            console.log('i: '+i);

            switch(i){

                case 0:

                    texto  = '<div class="contenedorFotoTexo">';
                    texto += '<h1>eCommerceBarcelona360</h1>';
                    texto += '<h2>2Automoci&oacute;n</h2>';
                    texto += '<p>Prestashop tienda online de importaci&oacute;n de productos de recambios de coches y aplicaci&oacute;n .net para la importaci&oacute;n masiva';
                    texto += 'de datos desde excel.Programaci&oacute;n Front End Html,CSS,Javascript,Php,Microsoft.net</p>';
                    texto += '<p><a href="http://www.2automocion.com">http://www.2automocion.com</a></p>';
                    texto += '<p>Contacto: Borja Vargas</p>';
                    texto += '</div>';

                <!--<p><a href="#" class="leer">Leer m&aacute;s</a></p>-->


                    break;

                case 1:

                    texto  = '<div class="contenedorFotoTexo">';
                    texto += '<h1>eCommerceBarcelona360</h1>';
                    texto += '<h2>2Automoci&oacute;n</h2>';
                    texto += '<p>Prestashop tienda online de importaci&oacute;n de productos de recambios de coches y aplicaci&oacute;n .net para la importaci&oacute;n masiva';
                    texto += 'de datos desde excel.Programaci&oacute;n Front End Html,CSS,Javascript,Php,Microsoft.net</p>';
                    texto += '<p><a href="http://www.2automocion.com">http://www.2automocion.com</a></p>';
                    texto += '<p>Contacto: Borja Vargas</p>';
                    texto += '</div>';

                <!--<p><a href="#" class="leer">Leer m&aacute;s</a></p>-->


                    break;


                case 2:

                    texto  = '<div class="contenedorFotoTexo">';
                    texto += '<h1>eCommerceBarcelona360</h1>';
                    texto += '<h2>2Automoci&oacute;n</h2>';
                    texto += '<p>Prestashop tienda online de importaci&oacute;n de productos de recambios de coches y aplicaci&oacute;n .net para la importaci&oacute;n masiva';
                    texto += 'de datos desde excel.Programaci&oacute;n Front End Html,CSS,Javascript,Php,Microsoft.net</p>';
                    texto += '<p><a href="http://www.2automocion.com">http://www.2automocion.com</a></p>';
                    texto += '<p>Contacto: Borja Vargas</p>';
                    texto += '</div>';

                <!--<p><a href="#" class="leer">Leer m&aacute;s</a></p>-->


                    break;



            }

            if ( i % 3 == 0){

                if (start == false){

                    div = '<br><div class="row">';
                    start = true;

                }else{

                    div += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">'
                    div += '<img src="'+that.vectorProyectos[i].imagenesMovil[0]+'" class="img-resposnive" width="50%" height="50%">';
                    div += texto+'</div></div><br><div class="row">';
                }



            }else{

                if (i < that.vectorProyectos.length - 1){

                    div += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">';
                    div += '<img src="'+that.vectorProyectos[i].imagenesMovil[0]+'" class="img-resposnive" width="50%" height="50%">';
                    div += texto+'</div>';

                }else{

                    div += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">'
                    div += '<img src="'+that.vectorProyectos[i].imagenesMovil[0]+'" class="img-resposnive" width="50%" height="50%">';
                    div += texto+'</div></div>';

                }


            }

        }// End for

        $('#principal').append(div);



        // Cargamos datos de empresa
        div  = '<div id="datosEmpresa">';
        div += '<p>eCommerceBarcelona360.com</p>';
        div += '<p>Vallirana 19</p>';
        div += '<p>08006 Barcelona, Espa&ntilde;a</p>';
        div += '<p>Telf:+34 (93) 217 67 57</p>';
        div += '<p>Movil:615 23 15 33</p>';
        div += '<p>Email: info@ecommercebarcelona360.com</p>';
        div += '<p><a href="http://www.ecommercebarcelona360.com">Web:http://www.ecommercebarcelona360.com</a></p>';
        div += '</div>';

        $('#principal').append(div);





    });



}
