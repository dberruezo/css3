$(document).ready(function(){
    var estado = "cerrado";
    $(".bt-menu").click(function(){
        if (estado == "cerrado"){
            main(1);    
        }else if(estado == "abierto"){
            main(0);
        }

        function main(numero){
            if (numero == 1){
              $( "header nav" ).animate({
                left: "+=100%"
              }, 500, function() {
                estado = "abierto";
              });
              $( "#seccion" ).animate({
                left: "+=100%"
              }, 500, function() {
                estado = "abierto";
              });
              estado = "corriendo";     
            }else if(numero == 0){
                $( "header nav" ).animate({
                    left: "-=100%"
                  }, 500, function() {
                    estado = "cerrado";
                  });
                  $( "#seccion" ).animate({
                    left: "-=100%"
                  }, 500, function() {
                    estado = "cerrado";
                  });
                  estado = "corriendo";     
            }    
        }
    });
});

