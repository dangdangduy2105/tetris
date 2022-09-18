let cvs = document.getElementById("tetris");
let ctx = cvs.getContext("2d");

//Draw a square
let sqSize = 20;
function drawSquare(x, y, color){
  ctx.fillStyle = color;
  ctx.fillRect(x*sqSize, y*sqSize, sqSize, sqSize);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x*sqSize, y*sqSize, sqSize, sqSize)
}

//Draw board
let column = 10;
let row = 20;
let cl = "white";

let board = [];
for(let r = 0; r < row; r++){
  board[r] = [];
  for(let c = 0; c < column; c++){
    board[r][c] = cl;
  }
}

function drawBoard(){
  for(let r = 0; r < row; r++){
    for(let c = 0; c < column; c++){
      drawSquare(c, r, cl);
    }
  }
}
drawBoard();

//Create tetris pieces
let Z = [[[0, 0, 0],
          [1, 1, 0],
          [0, 1, 1]],
          
         [[0, 0, 1],
          [0, 1, 1],
          [0, 1, 0]],
         
         [[0, 0, 0],
          [1, 1, 0],
          [0, 1, 1]],
         
         [[0, 0, 1],
          [0, 1, 1],
          [0, 1, 0]]];

let S = [[[0, 0, 0],
          [0, 1, 1],
          [1, 1, 0]], //S
         
          [[0, 1, 0],
           [0, 1, 1],
           [0, 0, 1]],
         
          [[0, 0, 0],
           [0, 1, 1],
           [1, 1, 0]],
         
          [[0, 1, 0],
           [0, 1, 1],
           [0, 0, 1]]];

let J = [[[0, 1, 0],
          [0, 1, 0],
          [1, 1, 0]],
         
         [[1, 0, 0],
          [1, 1, 1],
          [0, 0, 0]],
         
         [[0, 1, 1],
          [0, 1, 0],
          [0, 1, 0]],
         
          [[0, 0, 0],
           [1, 1, 1],
           [0, 0, 1]]];

let T = [[[0, 0, 0],
          [1, 1, 1],
          [0, 1, 0]],
         
         [[0, 1, 0],
          [1, 1, 0],
          [0, 1, 0]],
         
         [[0, 1, 0],
          [1, 1, 1],
          [0, 0, 0]],
         
          [[0, 1, 0],
           [0, 1, 1],
           [0, 1, 0]]];

let L = [[[0, 1, 0],
          [0, 1, 0],
          [0, 1, 1]],
         
         [[0, 0, 0],
          [1, 1, 1],
          [1, 0, 0]],
         
         [[1, 1, 0],
          [0, 1, 0],
          [0, 1, 0]],
         
          [[0, 0, 1],
           [1, 1, 1],
           [0, 0, 0]]];

let I = [[[0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0]],
         
        [[0, 0, 0, 0],
         [1, 1, 1, 1],
         [0, 0, 0, 0],
         [0, 0, 0, 0]],

        [[0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0]],
  
        [[0, 0, 0, 0],
         [1, 1, 1, 1],
         [0, 0, 0, 0],
         [0, 0, 0, 0]]];

let O = [[[0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0]],
        
         [[0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0]],
        
         [[0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0]],
        
         [[0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0]]];
//End - Create piece

//Random pieces
let PIECES = [[Z, "red"], [S, "green"], [J, "blue"], [L, "organe"], [T, "purple"], [I, "lightblue"], [O, "yellow"]]

function randomPieces(){
  let randomNum = Math.floor(Math.random() * PIECES.length);
  return new TetrisPiece(PIECES[randomNum][0], PIECES[randomNum][1]);
}
//End - Random pieces

//Draw piece
// let piece = new TetrisPiece(PIECES[5][0], PIECES[5][1]);
// console.log(piece.type)
// console.log(piece.activePiece)
// console.log(piece.typeIndex)
// console.log(piece.color);
// console.log(piece.Px);
// console.log(piece.Py);

let piece = randomPieces();

function drawPiece(){
  for(let r = 0; r < piece.activePiece.length; r++){
    for(let c = 0; c < piece.activePiece.length; c++){
      if(piece.activePiece[r][c]){
        drawSquare(piece.Px + c, piece.Py + r, piece.color);
      }
    }
  }
}

drawPiece();
//End - Draw piece


function unDrawPiece(){
  for(let r = 0; r < piece.activePiece.length; r++){
    for(let c = 0; c < piece.activePiece.length; c++){
      if(piece.activePiece[r][c]){
        drawSquare(piece.Px + c, piece.Py + r, cl);//change color to white
      }
    }
  }
}
//End - Draw piece

//Piece movements
function lockPiece(){
  for(let r = 0; r < piece.activePiece.length; r++){
    for(let c = 0; c < piece.activePiece.length; c++){
      if(!piece.activePiece[r][c]){
        continue;
      }if(piece.Py + r < 0){// out of top
        alter("game over");
        break;
      }
      // console.log(piece.Py + r);
      // console.log(piece.Px + c);
      board[piece.Py + r][piece.Px + c] = piece.color;
    }
  }
}

function moveDown(){
    if(!isCollision(0, 1, piece)){
      unDrawPiece();
      piece.moveDown();
      drawPiece();
    }else{
      lockPiece();
      piece = randomPieces();
    }
}
setInterval(moveDown, 1000);

function moveRight(){
  if(!isCollision(1, 0, piece)){
    unDrawPiece();
    piece.moveRight();
    drawPiece();
  }
}

function moveLeft(){
  if(!isCollision(-1, 0, piece)){
    unDrawPiece();
    piece.moveLeft();
    drawPiece();
  }
}

function rotate(){
  if(!isCollision(0, 0, piece)){
    unDrawPiece();
    piece.rotate();
    drawPiece();
  }
}
//End - piece movements

//Piece control
document.addEventListener("keydown", controlPiece);

function controlPiece(e){
  if(e.keyCode == 37){
    moveLeft();
  }
  if(e.keyCode == 38){
    rotate();
  }
  if(e.keyCode == 39){
    moveRight();
  }
  if(e.keyCode == 40){
    moveDown();
  }
}

//End - piece control