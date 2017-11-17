var selectedword = "";
var selectedhint = "";
var board = "";
var remainingGuesses = 6;
var words = ["snake", "monkey", "beetle"];

window.onload = startGame();

var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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
        console.log(selectWord)
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

function startGame(){
    pickWord();
    initBoard();
    updateBoard();
    createLetters()
}

function initBoard()
{
    for (var letter in selectedword)
    {
        board += '_';
    }
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedword = words[randomInt].toUppercase();
}

function updateBoard(){
    $("#word").empty();
    
    for (var letter of board)
    {
        document.getElementById("word").innerHTML += letter + " ";
    }
}

$("#letterBtn").click(function(){
                var boxVal = $("#letterBox").val();
                console.log("You pressed the button and it had the value: " + boxVal);
                })

function updateWord(positions, letter) {
    for (var pos of positions) {
        board = replaceAt(board, pos, letter)
    }
    
    updateBoard()
}

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