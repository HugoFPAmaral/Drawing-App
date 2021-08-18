$(function(){
    //paint or erase
    var paint = false;
    var paint_erase = "paint";
    //canvas context
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    var container = $("#container");
    //mouse position
    var mouse = {x: 0, y:0};

    // drawing parameters
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap= "round";

    //onload saved work form localStorage
    if(localStorage.getItem("imageCanvas") != null){
        var img = new Image();
        
        //on load draw on coordinates
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        }

        //get data storaged
        img.src = localStorage.getItem("imageCanvas");
    };
   


    //click container
    container.mousedown(function(event){
        paint = true;
        ctx.beginPath();
        
        //position of the mouse on the page
        mouse.x = event.offsetX * canvas.width / canvas.clientWidth | 0;
        mouse.y = event.offsetY * canvas.height / canvas.clientHeight | 0;

        ctx.moveTo(mouse.x, mouse.y);


    })

    container.mousemove(function(event){
        
        //position of the mouse on the page
        mouse.x = event.offsetX * canvas.width / canvas.clientWidth | 0;
        mouse.y = event.offsetY * canvas.height / canvas.clientHeight | 0;

        if(paint){
            if(paint_erase == "paint"){
                //color input
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                //erase color white
                ctx.strokeStyle = "white";
            }

            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })

    //mouse up - not painting anymore
    container.mouseup(function(){
        paint = false;
    })

    //if leave not paiting erasing anymore
    container.mouseleave(function(){
        paint = false;
    })

    //reset button
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    })

    
    //savebutton
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            //save data from canvas -url()
            localStorage.setItem("imageCanvas", canvas.toDataURL());
            
        }else{
            window.alert("Your browser does not support local storage!")
        }

    })

    //erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else{
            paint_erase = "paint";
        }

        $(this).toggleClass("eraseMode");
        
    })

    //change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val())
    })

    //change lineWidth using slider
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });

})