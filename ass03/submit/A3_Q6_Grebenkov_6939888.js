function start() {
    var submitBtn = document.getElementById("submitBtn");
    var clearBtn = document.getElementById("clearBtn");
    submitBtn.addEventListener("click", translate, false);
    clearBtn.addEventListener("click", clearFields, false);
}

function translate() {
    var outputTextArea = document.getElementById("outputTA");
    var inputText = // get rid of uppercase letters 
        document.getElementById("inputTA").value.toLowerCase();
    var tokens = inputText.split(" "); // tokenize
    var tokensLength = tokens.length;

    for (var i = 0; i < tokensLength; i++) {
        printLatinWord(tokens[i]);
    }
    outputTextArea.value += "\n";
}

function printLatinWord(token) {
    var converted = token.substr(1) + token.charAt(0) + "ay";
    var outputTextArea = document.getElementById("outputTA");
    
    outputTextArea.value += converted + " ";
}

function clearFields() {
    var inputTextArea = document.getElementById("inputTA");
    var outputTextArea = document.getElementById("outputTA");
    inputTextArea.value = "";
    outputTextArea.value = "";
}

window.addEventListener("load", start, false);
