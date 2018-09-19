var objeto = "";

function rotar(opcion){
    switch(opcion){
        case "front":removeAll();objeto.style.transform = "rotateX(0deg) rotateY(0deg)";
            break;
        case "left":removeAll();objeto.style.transform = "rotateY(90deg)";
            break;
        case "right":removeAll();objeto.style.transform = "rotateY(-90deg)";
            break;
        case "bottom":removeAll();objeto.style.transform = "rotateX(90deg)";
            break;
        case "top":removeAll();objeto.style.transform = "rotateX(-90deg)";
            break;
        case "back":removeAll();objeto.style.transform = "rotateY(180deg)";
            break;
        case "defecto":removeAll();objeto.style.transform = "rotateX(60deg) rotateZ(-45deg)";
            break;
    }
}

function axis(opcion){
    switch(opcion){
        case "start":removeAll();$(".contenedor_rotacion_cubo").addClass("on");
            break;
        case "stop":removeAll();startOff();
            break;
        case "x":removeAll();$(".contenedor_rotacion_cubo").addClass("onX");
            break;
        case "y":removeAll();$(".contenedor_rotacion_cubo").addClass("onY");
            break;
        case "z":removeAll();$(".contenedor_rotacion_cubo").addClass("onZ");
            break;
    }
}

function removeAll(){
    $(".contenedor_rotacion_cubo").removeClass("off");
    $(".contenedor_rotacion_cubo").removeClass("on");
    $(".contenedor_rotacion_cubo").removeClass("onX");
    $(".contenedor_rotacion_cubo").removeClass("onY");
    $(".contenedor_rotacion_cubo").removeClass("onZ");
}

function startOff(){
    $(".contenedor_rotacion_cubo").addClass("off")
}

$(document).ready(function(){
    $("body").css("height",window.innerHeight);
    $(".contenedor").css("margin-left",(window.innerWidth - $(".contenedor").width()) / 2 +"px" );
    $(".contenedor").css("margin-top",(window.innerHeight - $(".contenedor").height()) / 2 +"px" );
    objeto = document.getElementById("rotarcubo");
    console.log("ready");
});