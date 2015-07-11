$(document).ready(function(){
  //positionFooter();
  //$(window).resize(positionFooter);

});

function positionFooter(){
    var padding_top = $("#envuelve_pie").css("padding-top").replace("px", "");
    var page_height = $(document.body).height() - padding_top;
    var window_height = $(window).height();
    var difference = window_height - page_height;
    if (difference < 0)
        difference = 0;

    $("#envuelve_pie").css({
        padding: difference + "px 0 0 0"
    });
}
