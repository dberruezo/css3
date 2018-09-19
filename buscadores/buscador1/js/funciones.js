/**
 * Created by david on 6/04/17.
 */
$(function(){
    $('.searchTerm').on("focus blur", function(){
        $(this).parent().toggleClass("expanded collapsed");
        $(this).siblings('.suggestionBox').toggle();
    });
});
