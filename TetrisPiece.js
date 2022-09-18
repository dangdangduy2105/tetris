class TetrisPiece{

    constructor(type, color){
      this.type = type; //Z, S, J, L, T, I , O;
      this.typeIndex = 0;// 0 1 2 3
      this.activePiece = this.type[this.typeIndex]; //Z[0], Z[1]...
      this.color = color;
      //starting position 
      this.Px = 3;
      this.Py = -2;
    }
    getType(){
      return this.type;
    }
  
    getTypeIndex(){
      return this.typeIndex;
    }
  
    getColor(){
      return this.color;
    }
  
    getX(){
      return this.Px;
    }
  
    getY(){
      return this.Py;
    }
    
    getActivePiece(){
      return this.activePiece;
    }
  
    moveDown(){
      return this.Py++;
    }
  
    moveRight(){
      return this.Px++;
    }
  
    moveLeft(){
      return this.Px--;
    }
    
    rotate(){
      this.typeIndex = (this.typeIndex + 1) % 4;
      this.activePiece = this.type[this.typeIndex];
      return this.activePiece;
    }
  }
  
  //Collision
  function isCollision(x, y, aPiece){
    for(let r = 0; r < aPiece.activePiece.length; r++){
      for(let c = 0; c < aPiece.activePiece.length; c++){
        if(!aPiece.activePiece[r][c]){//if square is not white square -> continue.
          continue;
        }
        
        let newX = aPiece.Px + c + x;
        let newY = aPiece.Py + r + y;
  
        if((newY) < 0){
          continue;
        }
        if(newX < 0 || newX >= column || newY >= row){
          return true; //if newX < 0 -> out of the right wall, > column -> out of the left wall and >= row -> out of the bottom.
        }
        // if(board[newX][newY] != cl){//check if any other piece else.-> if square != white color;
        //   return true;
        // }
      }
    }
  }
  //End - Collision