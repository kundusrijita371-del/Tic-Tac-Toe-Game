let cells=document.querySelectorAll(".cell");
let resetButton=document.getElementById("reset");
let turn0 = true;
let newGameBtn=document.getElementById("newGame");
let msgContainer=document.querySelector(".msg");
let message=document.getElementById("message");
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const checkDraw=()=>{
    let draw=true;
    cells.forEach((cell)=>{
        if(cell.innerText==""){
            draw=false;
        }
    });
    if(draw){
        message.innerText="It's a Draw!";
        msgContainer.classList.remove("hide");
        disableAllCells();
    }
};
const resetGame=()=>{
    cells.forEach((cell)=>{
        cell.innerText="";
        cell.disabled=false;
    });
    turn0=true;
    msgContainer.classList.add("hide");
};
resetButton.addEventListener("click",()=>{
    resetGame();
});
newGameBtn.addEventListener("click",()=>{
    resetGame();
});

cells.forEach((cell)=>{
    cell.addEventListener("click",()=>{
        console.log("Cell clicked");
        if(turn0){
            cell.innerText="X";
            turn0=false;
        }else{
            cell.innerText="O";
            turn0=true;
        }
        cell.disabled=true;
      
       let isWinner = checkWin();
       if(!isWinner){
            checkDraw();
       }
     
    });
});
const disableAllCells=()=>{
    cells.forEach((cell)=>{
        cell.disabled=true;
    });
};
const enableAllCells=()=>{
    cells.forEach((cell)=>{
        cell.disabled=false;
    });
};

const showWinner=(winner)=>{
    message.innerText=`Congratulations! Player ${winner} wins!`;
    msgContainer.classList.remove("hide");
    disableAllCells();
};

const checkWin=() => {
    for(let pattern of winPatterns){
        let pos1=cells[pattern[0]].innerText;
        let pos2=cells[pattern[1]].innerText;
        let pos3=cells[pattern[2]].innerText;
        if(pos1!=""&& pos2!="" && pos3!="" && pos1==pos2 && pos2==pos3){
            console.log("Congratulations!Winner is",pos1);
            showWinner(pos1);
            return true;
        }
    }
    return false;
};
