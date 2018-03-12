function start() {
    var body = document.getElementById("mainDiv");
    registerListeners(body);
}

// recursively register listeners for each 
// HTML element in the body
function registerListeners(node) {
    if (node === null) {
        return;
    }

    node.addEventListener("mousedown", mouseDown, false);

    for (var i = 0; i < node.children.length; i++) {
        registerListeners(node.children[i]);
    }
}

function mouseDown(e) {
    e.cancelBubble = true;

    if (e.ctrlKey) {
        window.alert(e.target.tagName);
    } 

    if (e.shiftKey) {
        window.alert(e. type);
    }
}

window.addEventListener("load", start, false);
