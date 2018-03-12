var board; // table body that represents the board
var blankPosition; // [row, column] index array for the blank   
var blankNode; // DOM node for the blank position
var dimension = 4; // board row/col dimension

// creates the board, registers the event listeners,
// and populates the board to start a game 
function start() {
    board = document.getElementById("boardBody");
    document.getElementById("playAgainBtn").addEventListener(
        "click", initBoard, false);
    
    // create the table for the board
    for (var i = 0; i < dimension; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < dimension; j++) {
            var cell = document.createElement("td");
            cell.addEventListener(
                "mousedown", handleCellClick, false);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    
    // initialize the board by populating it with numbers
    initBoard();
}

// initializes the board by randomly populating the  
// table with integers from 1 to 15
function initBoard() {
    // hide the play again button
    document.getElementById("playAgainBtn").setAttribute(
        "style", "display: none;");

    // clear the message paragraph
    document.getElementById("messagePar").innerHTML = "";

    // get a shuffled array of numbers from 0 to 15.
    // (0 indicates the blank cell)
    var boardNumbers = getShuffledArray();
    
    // used to index each cell in boardNumbers
    var cellIndex = 0; 

    for (var row = 0; row < board.rows.length; row++) {
        var rowCells = board.rows[row].cells;

        for (var cell = 0; cell < rowCells.length; cell++) {
            if (boardNumbers[cellIndex] !== 0) {
                rowCells[cell].innerHTML = boardNumbers[cellIndex];
                rowCells[cell].setAttribute("class", "blackCell");
            } else {
                // save the position and node of the blank cell
                // and color it white
                blankPosition = [row, cell];
                blankNode = rowCells[cell];
                blankNode.innerHTML = "";
                blankNode.setAttribute("class", "whiteCell");
            } 
            cellIndex++;
        }
    }
}

// returns true if the game is over (numbers are in order)
function isGameOver() {
    var currNum = 1;
    
    // loop through the table cells, checking at each
    // iteration whether the counter currNum is equal
    // to the value in the cell
    for (var row = 0; row < board.rows.length; row++) {
        var rowCells = board.rows[row].cells;

        for (var cell = 0; cell < rowCells.length; cell++) {
            cellNum = parseInt(rowCells[cell].innerHTML);

            // We ignore the last position since it must 
            // be blank anyways
            if (row === dimension - 1 && cell === dimension-1) {
                continue;
            }
            
            // we return false whenever we find a cell
            // whose number is out of sequence
            if (cellNum !== currNum) {
                return false; 
            }
            currNum++;
        }
    }
    return true;
}

// handles 'mousedown' events for the table cells.
// implements swapping the empty cell with an adjacent one
function handleCellClick(e) {
    // fetch the DOM nodes corresponding to the clicked 
    // cell and its parent row
    var clickedCellNode = e.target;
    var clickedRowNode = clickedCellNode.parentNode;

    // i, j gives us the coordinates of the clicked cell
    var i = clickedRowNode.rowIndex;
    var j = clickedCellNode.cellIndex; 

    // coordinates of the blank cell
    var blankRow = blankPosition[0];
    var blankCell = blankPosition[1];

    // div to display error messages for an invalid move
    var messageDiv = document.getElementById("messageDiv");
    
    // make the move if it's valid
    if ( (i === blankRow && 
         (j === blankCell-1 || j === blankCell+1)) || 
         (j === blankCell && 
         (i === blankRow-1 || i === blankRow+1)) ) {
        // put the clicked number in the current blank node
        // and make it a black cell
        blankNode.innerHTML = clickedCellNode.innerHTML;
        blankNode.setAttribute("class", "blackCell");

        // clear the clicked node to make it blank
        // and make it a white cell
        clickedCellNode.innerHTML = "";
        clickedCellNode.setAttribute("class", "whiteCell");

        // save the node and position of the new blank node
        blankNode = clickedCellNode;
        blankPosition = [i, j];
        messagePar.innerHTML = ""; // clear messages
            
        if (isGameOver()) {
            messagePar.innerHTML = "<strong>You won!</strong><br>";
            // show the play again button
            document.getElementById("playAgainBtn").setAttribute("style", "display: block;");
        }
    } else {
        messagePar.innerHTML ="<strong>Invalid move!</strong><br>" +
            "You must click on a square adjacent to the blank one.";
    }
}

// returns an array with numbers from 0 to 15 
// in random order using the Fisher-Yates Shuffle algorithm
function getShuffledArray() {
    var nums = [];
    for (var i = 0; i <= 15; i++) {
        nums.push(i);
    }
    
    var numsLength = nums.length;
    
    // shuffle with Fisher-Yates
    for (var i = nums.length - 1; i >= 0; i--) {
        var j = randNum(i);
        var tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }

    return nums;
}

// returns a random number between 0 and max
function randNum(max) {
    return Math.floor(Math.random() * max);
}

window.addEventListener("load", start, false);
