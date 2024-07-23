const displayController =(() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    }
    return {
        renderMessage
    }
})();

const gameBoard = (() =>{
    let gameBoard = ["","","","","","","","",""];

    const render = () => {
        let boardHTML="";
        gameBoard.forEach((square , index)=> {
            boardHTML += `<div class ="square" id="square-${index}"> ${square}</div> `
        })
        document.querySelector("#gameBoard").innerHTML = boardHTML;
        const squares= document.querySelectorAll(".square");
        squares.forEach((square) =>{
            square.addEventListener("click", Game.handleClick);
        })
    }
    const update= (index, valua) => {
        gameboard[index]= value;
        render();
    };

    const getGameboard =() => gameBoard;
    return {
        render,
        update,
        getGameboard
    }

    const createPlayer =(name, mark) => {
        return {
            name,
            mark
        }
    }

    const start =() => {
        players =[
            createPlayer(document.querySelector("#player1").value,"X"),createPlayer(document.querySelector("#player2").value,"O")
        ]

        current playerIndex = 0;
        gameOver =false;
        gameBoard.render();
        const squares= document.querySelectorAll(".square");

        squares.forEach((square)=>{
            square.addEventListener("click", handleClick);
        })
    }

    const handleClick = (event) => {
        if (gameOver){
            return;
        }

        let index = parseInt(event.target.id.split("-")[1]);

        if(gameBoard.getGameboard()[index]!=="")
            return;

        gameBoard.update(index, players[currentPlayerIndex].mark);

        if(checkForWin(gameBoard.getGameboard(),players[currentPlayerIndex].mark)){
            gameOver=true;

            displayController.renderMessage(`${players[currentPlayerIndex].name} wins`)
        }
        else if (checkforTie(gameBoard.getGameboard())){
            gameOver=true;
            displayController.renderMessage("it's a Tie");
        }
        currentPlayerIndex= currentPlayerIndex=== 0 ? 1 : 0;
    }

    const restart =()=>{
        for(let i=0; i<9; i++){
            gameBoard.update(i,"");
        }
        gameBoard.render();
        gameOver=false;
        document.querySelector("#message").innerHTML="";
    }

    return {
        start,
        restart,
        handleClick
    }
})();

function checkForWin (board){
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,5,6]
    ]
    for(let i=0; i<winningCombinations.length; i++){
        const [a,b,c] = winningCombinations[i];

        if(board[a] && board[a]===board[b] && board[a]===board[c]){
            return true ;
        }
    }
    return false;
}

function checkforTie(board){
    return board.every(cell =>cell !=="")
}

const restartButton = document.querySelector("#restartButton");
restartButton.addEventListener("click",()=>{
    Game.restart();
})

const startButton = document.querySelector("#startButton");
restartButton.addEventListener("click",()=>{
    Game.start();
})