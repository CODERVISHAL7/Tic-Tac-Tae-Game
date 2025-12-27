console.log("JS connected");

let currentPlayer = "X";
let gameActive = true;
let board = ["","","","","","","","",""];
let xWins = 0;
let oWins = 0;
const winningCombinations = [
    [0,1,2], // row 1
    [3,4,5], // row 2
    [6,7,8], // row 3
    [0,3,6], // column 1
    [1,4,7], // column 2
    [2,5,8], // column 3
    [0,4,8], // diagonal 1
    [2,4,6]  // diagonal 2
];

const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector(".status");
const restartBtn = document.querySelector(".restart");
const xScoreDisplay = document.getElementById("xScore");
const oScoreDisplay = document.getElementById("oScore");

statusText.textContent = `${currentPlayer}'s Turn`;

boxes.forEach((box, index) =>{
    box.addEventListener("click",()=>{

        if(!gameActive || board[index] != "")
            return;

        board[index] = currentPlayer;
        box.textContent = currentPlayer;
        checkWinner();
        if(gameActive){
          currentPlayer = currentPlayer === "X" ? "O" : "X";
           statusText.textContent = `${currentPlayer}'s Turn`;
        }
    });
});

restartBtn.addEventListener("click", () => {
    board = ["","","","","","","","",""];

    boxes.forEach(box => {
        box.textContent = "";
        box.classList.remove("highlight");
    });

    currentPlayer ="X";
    gameActive=true;
    statusText.textContent = `${currentPlayer}'s Turn`;
});

function checkWinner(){
    for(let combo of winningCombinations){
        const [a, b, c] = combo;

        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            boxes[a].classList.add("highlight");
            boxes[b].classList.add("highlight");
            boxes[c].classList.add("highlight");

            if(board[a] === "X"){
                xWins++;
                xScoreDisplay.textContent = xWins;
            }else{
                oWins++;
               oScoreDisplay.textContent = oWins;

            }

            statusText.textContent = `${board[a]} Wins! `;
            gameActive =false;
            return;
        }
    }

    if(!board.includes("")){
        statusText.textContent ="It's a Draw";
        gameActive =false;
    }
}