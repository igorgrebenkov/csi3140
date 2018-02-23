const RACE_LENGTH = 70; // length of the race.
const LOWER = 0;        // index to lower range in enum arrays
const UPPER = 1;        // index to upper range in enum arrays
const MOVE = 2;         // index to actual move in enum arrays

/* 
 * Enum-like structures for moves
 *   First element is lower bound
 *   Second element is upper bound
 *   Third element is the actual move
 */
const tortoiseEnum = {
    FAST_PLOD: [1, 5, 3],
    SLIP: [6, 7, -6],
    SLOW_PLOD: [8, 10, 1]
};

const hareEnum = {
    SLEEP: [1, 2, 0],
    BIG_HOP: [3, 4, 9],
    BIG_SLIP: [5, 5, -12],
    SMALL_HOP: [6, 8, 1],
    SMALL_SLIP: [9, 10, -2]
};

var tortoisePos; // tortoise position
var harePos;     // hare position
var raceCourse;  // race course array
var raceLength;  // length of the race
var numTicks;    // counter for number of ticks in simulation

function start() {
    initRace();

    var startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", startRace, false);
}

function initRace() {
    var raceOuput = document.getElementById("raceOutput");
    tortoisePos = 1;
    harePos = 1;
    numTicks = 0;
}

// runs the simulation
function startRace() {
    var raceOutput = document.getElementById("raceOutput");
    var randomNum; 

    raceOutput.innerHTML = ""; // clear any prior output
    raceOutput.innerHTML = "<p><strong>ON YOUR MARK, GET SET<br>" +
        "BANG!!!<br>AND THEY'RE OFF!!!</strong><p>";
    
    // main loop
    while (true) {
        numTicks++;
        randomNum = getRandomNum();
        moveTortoise(randomNum);    
        moveHare(randomNum);
        printRace();
        
        // check if we have a winner
        if ((tortoisePos + harePos >= RACE_LENGTH * 2) && 
            (tortoisePos === harePos)) {
            raceOutput.innerHTML += 
                "<strong>IT'S A TIE.</strong><br>";
            break;
        } else if (tortoisePos >= RACE_LENGTH) {
            raceOutput.innerHTML += 
                "<strong>TORTOISE WINS!!! YAY!!!</strong><br>";
            break;
        } else if (harePos >= RACE_LENGTH) {
            raceOutput.innerHTML += 
                "<strong>HARE WINS. YUCK!</strong><br>";
            break;
        }
    }
    
    // display stats and reset race
    raceOutput.innerHTML += "<p><strong>Time Elapsed: " 
        + numTicks + " ticks</strong><br>";
    raceOutput.innerHTML += "<strong>Press 'Start Race' " + 
        "to run again.</strong><br></p>";
    initRace(); 
}

function moveTortoise(randNum) {
    if (randNum >= tortoiseEnum.FAST_PLOD[LOWER] && 
        randNum <= tortoiseEnum.FAST_PLOD[UPPER]) {
        // fast plod
        tortoisePos += tortoiseEnum.FAST_PLOD[MOVE];
    } else if (randNum >= tortoiseEnum.SLIP[LOWER] && 
               randNum <= tortoiseEnum.SLIP[UPPER]) {
        // slip
        tortoisePos += tortoiseEnum.SLIP[MOVE];
    } else if (randNum >= tortoiseEnum.SLOW_PLOD[LOWER] && 
               randNum <= tortoiseEnum.SLOW_PLOD[UPPER]) {
        // slow plod
        tortoisePos += tortoiseEnum.SLOW_PLOD[MOVE];
    }
 
    // check for slipping off the course
    if (tortoisePos < 1) {
        tortoisePos = 1;
    }
}

function moveHare(randNum) {
    if (randNum >= hareEnum.SLEEP[LOWER] && 
        randNum <= hareEnum.SLEEP[UPPER]) {
        // sleep
        harePos += hareEnum.SLEEP[MOVE];
    } else if (randNum >= hareEnum.BIG_HOP[LOWER] && 
               randNum <= hareEnum.BIG_HOP[UPPER]) {
        // big hop 
        harePos += hareEnum.BIG_HOP[MOVE];
    } else if (randNum >= hareEnum.BIG_SLIP[LOWER] && 
               randNum <= hareEnum.BIG_SLIP[UPPER]) {
        // big slip
        harePos += hareEnum.BIG_SLIP[MOVE];
    } else if (randNum >= hareEnum.SMALL_HOP[LOWER] && 
               randNum <= hareEnum.SMALL_HOP[UPPER]) {
        // small hop
        harePos += hareEnum.SMALL_HOP[MOVE];
    } else if (randNum >= hareEnum.SMALL_SLIP[LOWER] && 
               randNum <= hareEnum.SMALL_SLIP[UPPER]) {
        // small slip
        harePos += hareEnum.SMALL_SLIP[MOVE];
    }

    // check for slipping off the course
    if (harePos < 1) {
        harePos = 1;
    }
}
    
// prints one iteration of the race
function printRace() {
    var raceOutput = document.getElementById("raceOutput");
    var raceString;
    
    raceString = "<strong>Start|</strong>"; 
    for (var i = 1; i <= RACE_LENGTH; i++) {
        if (tortoisePos === harePos && 
            tortoisePos === i) {
            raceString += "OUCH!!!"
        } else if (i === tortoisePos) {
            raceString += "T";
        } else if (i === harePos) {
            raceString += "H"
        } else {
            raceString += " ";
        }
    }
    raceString += "<strong>|Finish</strong><br>"; 
    raceOutput.innerHTML += raceString;
}

// returns a random integer between 1 and 10
function getRandomNum() {
    return Math.floor(1 + Math.random() * 10);
}

window.addEventListener("load", start, false);
