let squares = $(".ttt-box");
let xs_and_os = $(".xo");
let header = $("h3");
let alertDiv = $("#alert-div");
var winnerBanner = $("#winner-banner");

let playerTurn = -1;
let map = [[0,0,0],[0,0,0],[0,0,0]];
let gameover = false, numOfXO = 0;

for (let i = 0; i < 9; i++){
    squares[i].addEventListener("click", () => {
        if(gameover === false) {
            //if the tile isn't already taken, draw an X or O
            if(map[modulo(i, 3)][Math.floor(i / 3)] === 0){
                if (playerTurn == -1) {
                    xs_and_os[i].classList.add("ttt-x");
                    map[modulo(i, 3)][Math.floor(i / 3)] = playerTurn;
                    header.html("O's turn");
                } else if (playerTurn == 1) {
                    xs_and_os[i].classList.add("ttt-o");
                    map[modulo(i, 3)][Math.floor(i / 3)] = playerTurn;
                    header.html("X's turn");
                }
                playerTurn *= (-1);
            }

            //check if map is full for tie detection
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                    if(map[i][j] == -1 || map[i][j] == 1){
                        numOfXO += 1;
                    }
                }
            }
            
            //win detection
            for (let i = 0; i < 3; i++){
                let rowSum = 0;
                for (let j = 0; j < 3; j++){
                    rowSum += map[i][j];
                }
                if (rowSum === -3) {
                    header.html("X wins!");
                    makeBanner("x");
                    gameover = true;
                } else if (rowSum === 3) {
                    header.html("O wins!");
                    makeBanner("o");
                    gameover = true;
                }
            }
            for (let i = 0; i < 3; i++){
                let colSum = 0;
                for (let j = 0; j < 3; j++){
                    colSum += map[j][i];
                }
                if (colSum === -3) {
                    header.html("X wins!");
                    makeBanner("x");
                    gameover = true;
                } else if (colSum === 3) {
                    header.html("O wins!");
                    makeBanner("o");
                    gameover = true;
                }
            }
            //diagonals
            if(map[0][0] + map[1][1] + map[2][2] === -3){
                header.html("X wins!");
                makeBanner("x");
                gameover = true;
            } else if(map[0][0] + map[1][1] + map[2][2] === 3){
                header.html("O wins!");
                makeBanner("o");
                gameover = true;
            }
            if(map[2][0] + map[1][1] + map[0][2] === -3){
                header.html("X wins!");
                makeBanner("x");
                gameover = true;
            } else if(map[2][0] + map[1][1] + map[0][2] === 3) {
                header.html("O wins!");
                makeBanner("o");
                gameover = true;
            }
            //tie detection - if the board is full (and there is no winner as determined by above code-- see the comment at the end of makeBanner)
            if(numOfXO == 9) {
                header.html("It's a tie!");
                makeBanner(0);
                gameover == true;
            } else {
                numOfXO = 0;
            }
        }
    });
}

function gameReset() {
    map = [[0,0,0],[0,0,0],[0,0,0]];
    for(let i = 0; i < 9; i++){
        xs_and_os[i].classList.remove("ttt-x");
        xs_and_os[i].classList.remove("ttt-o");
        header.html("");
        winnerBanner.remove();
    }
    gameover = false;
    playerTurn = -1;
    header.html("X's turn")
}

function makeBanner(winner){
    switch(winner){
        case "x":
            alertDiv.append('<div class="alert alert-danger" id="winner-banner" role="alert">X wins!</div>');
            break;
        case "o":
            alertDiv.append('<div class="alert alert-primary" id="winner-banner" role="alert">O Wins!</div>');
            break;
        default:
            alertDiv.append(`<div class="alert alert-success" id="winner-banner" role="alert">It's a tie!</div>`);
    }
    winnerBanner = $("#winner-banner");
    numOfXO = 0; //this is to make sure that if the last move is a winning move and the board is full, it won't say it's a tie
}

//for some reason (n % n) returns 0 and undefined??? I don't really know how it works, but this code I wrote fixes it by first checking if the two inputs are equal,
//then if they are, returning 0, and otherwise returning a % b.
function modulo(a, b) {
    if(a == b) {
        return 0;
    }
    return a % b;
}