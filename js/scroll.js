var my_time;
$(document).ready(function() {
  
    
    $(window).resize(function(){
        console.log("window.innerHeight "+window.innerHeight)
        $("#textpart").css("height",window.innerHeight+"px")
    });
    
    $(window).trigger("resize");
});

