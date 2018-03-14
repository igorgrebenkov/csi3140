var image; 
var lastClientXY = []; // buffer for last clientX/clientY value
var isMouseDown = false; // true if the mouse button is down

function start() {
    image = document.getElementById("dragImage");
    image.addEventListener(
        "mousedown", 
        function(e) {
            // get initial client X,Y coordinates
            lastClientXY = [e.clientX, e.clientY];
            isMouseDown = true;
        }, 
        false);
    image.addEventListener(
        "mouseup", 
        function() {
            isMouseDown = false;
        },
        false);

    // the mousemove EventListener has to be registered on the
    // document rather than the image; if the EventListener is
    // on the image instead, fast mouse movements can bring
    // the cursor outside the image area, which stops dragging
    // the image. having the EventListener on the document 
    // instead fixes this problem.
    document.addEventListener("mousemove", mouseMove, false);
}

function mouseMove(e) {
    var currX = e.clientX; // current client coordinates
    var currY = e.clientY;
    var lastX = lastClientXY[0]; // last client coordinates
    var lastY = lastClientXY[1]; 

    // we only drag the image if the left mouse btn is down
    if (isMouseDown) {
        // only move if new client X,Y has changed
        if (lastX !== currX && lastY != currY) {
            // get difference between last and current client X,Y
            var diffX = currX - lastX;
            var diffY = currY - lastY;

            // calculate new image position
            var newLeft = diffX + image.offsetLeft;
            var newTop = diffY + image.offsetTop; 
            
            // move image to new position
            image.style.left = newLeft + "px"; 
            image.style.top = newTop + "px"; 
            
            // last client X,Y is now the current X,Y
            lastClientXY = [currX, currY];
        }
    }
}

window.addEventListener("load", start, false);
