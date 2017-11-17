var selectedWord = "";
var selectedHint = "";
var board = "";
var remainingGuesses = 6;
var words = [{ word: "snake", hint: "It's a reptile"},
             { word: "monkey", hint: "It's a mammal"},
             { word: "beetle", hint: "It's an insect"}];

window.onload = startGame();

var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function startGame(){
    pickWord();
    initBoard();
    updateBoard();
    createLetters();
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].toUppercase();
    selectedHint = words[randomInt].hint;
}

function initBoard()
{
    for (var letter in selectedWord)
    {
        board += '_';
    }
}

function updateBoard(){
    $("#word").empty();
    
    for (var letter of board)
    {
        document.getElementById("word").innerHTML += letter + " ";
    }
    
    $("word").append("<br />");
    $("word").append("<br />");
}

function updateWord(positions, letter) {
    for (var pos of positions) {
        board = replaceAt(board, pos, letter);
    }
    
    updateBoard();
}

function createLetters() {
    for (var letter of alphabet) {
        $("#letters").append("<button class='letter' id='" + letter +"'>" + letter+"</button>");
        $(".letter").click(function(){
            console.log($(this).attr("id"));
        });
    }
}

function checkLetter(letter) {
    var positions = new Array();
    
    for (var i = 0; i < selectedWord.length; i++) {
        console.log(selectedWord);
        if (letter = selectedWord[i]) {
            positions.push(i);
        }
    }
    
    if (positions.length > 0) {
        updateWord(positions, letter);
        
        if(!board.includes('_')){
            endGame(true);
        }
    } else {
        remainingGuesses -= 1;
    }
    
    if (remainingGuesses <= 0){
        endGame(false);
    }
    
    $(".replayBtn").on("click", function() {
        location.reload();
    });
}









$("#letterBtn").click(function(){
                var boxVal = $("#letterBox").val();
                console.log("You pressed the button and it had the value: " + boxVal);
                })



function replaceAt(str, index, value) {
    return str.substr(0,index) + value + str.substr(index + value.length);
}

function updateMain() {
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

function endGame(win) {
    $("#letters").hide();
    
    if (win) {
        $('#won').show();
    }
    else
    {
        $('#lost').show();
    }
}