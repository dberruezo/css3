(function() {
    alert("Hola pepe");
    function rotate(e) {
        alert("apretado");
        elements.each(function(i) {
            var elem = elements.eq(i),
                style = elem.attr("style"),
                value = regEx.exec(style)[0] - 0;

            value = e.data.prev ? value + 40 : value - 40;
            style = style.replace(regEx, value);
            elem.attr("style", style);
        });
    }

    var elements = $(".el"),
        prev = $(".prev"),
        next = $(".next"),
        regEx = /(-?\d+)(?=deg)/;
    $(".prev").click(function(event){
        event.preventDefault();
        alert("Hola");
        rotate();
    });

    $(".next").click(function(){
        rotate();
    });
    /*
    prev.click({prev: true}, rotate);
    next.click({prev: false}, rotate);
    */
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37:
                prev.trigger("click");
                break;
            case 39:
                next.trigger("click");
                break;
        }
    });
})();
