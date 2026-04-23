let players, currentPlayer, mode, ctx;
const boardMap = []; // maps square index to coordinates

function buildBoardMap() {
  let size=80, num=1;
  for(let r=4;r>=0;r--){
    if((4-r)%2===0){ // even row: left→right
      for(let c=0;c<6;c++){ boardMap[num-1] = {row:r,col:c}; num++; }
    } else { // odd row: right→left
      for(let c=5;c>=0;c--){ boardMap[num-1] = {row:r,col:c}; num++; }
    }
  }
}

function startLadder(selectedMode) {
  const canvas = document.getElementById("ladderCanvas");
  ctx = canvas.getContext("2d");
  mode = selectedMode;
  players = [{pos:0,color:"blue"},{pos:0,color:"green"}];
  currentPlayer = 0;
  buildBoardMap();

  document.getElementById("rollBtn").style.display = "inline";
  document.getElementById("ladderResult").innerText = "";

  drawBoard();
  drawPlayers();
}

function drawBoard() {
  ctx.clearRect(0,0,480,400);
  let size=80;
  for(let i=0;i<30;i++){
    let {row,col} = boardMap[i];
    ctx.fillStyle = (row+col)%2===0 ? "#f9f9f9" : "#cce7ff";
    ctx.fillRect(col*size,row*size,size,size);
    ctx.strokeRect(col*size,row*size,size,size);
    ctx.fillStyle="black";
    ctx.fillText(i+1,col*size+5,row*size+15);
  }
  // Ladder 5→15
  ctx.strokeStyle="brown"; ctx.lineWidth=6;
  ctx.beginPath(); ctx.moveTo(boardMap[4].col*80+40,boardMap[4].row*80+40);
  ctx.lineTo(boardMap[14].col*80+40,boardMap[14].row*80+40); ctx.stroke();
  // Snake 22→10
  ctx.strokeStyle="red"; ctx.lineWidth=4;
  ctx.beginPath(); ctx.moveTo(boardMap[21].col*80+40,boardMap[21].row*80+40);
  ctx.lineTo(boardMap[9].col*80+40,boardMap[9].row*80+40); ctx.stroke();
}

function drawPlayers() {
  players.forEach(p=>{
    let {row,col} = boardMap[p.pos];
    ctx.fillStyle=p.color;
    ctx.beginPath();
    ctx.arc(col*80+40,row*80+40,20,0,Math.PI*2);
    ctx.fill();
  });
}

function animateMove(player, steps, callback) {
  let moveCount = 0;
  function step() {
    if (moveCount < steps) {
      player.pos++;
      if(player.pos>29) player.pos=29;
      drawBoard(); drawPlayers();
      moveCount++;
      setTimeout(step, 300);
    } else {
      // Ladder/Snake logic
      if(player.pos===4) player.pos=14; // 5→15
      if(player.pos===21) player.pos=9; // 22→10
      drawBoard(); drawPlayers();
      callback();
    }
  }
  step();
}

function rollDice() {
  let roll = Math.floor(Math.random()*6)+1;
  document.getElementById("diceImg").src="images/dice"+roll+".png";
  document.getElementById("ladderResult").innerText="Player "+(currentPlayer+1)+" rolled "+roll;

  animateMove(players[currentPlayer], roll, ()=>{
    if(players[currentPlayer].pos>=29){
      players[currentPlayer].pos=29;
      document.getElementById("ladderResult").innerText="Player "+(currentPlayer+1)+" wins!";
      document.getElementById("rollBtn").style.display="none";
    } else {
      currentPlayer = (currentPlayer+1)%2;
      if(mode==="solo" && currentPlayer===1){
        setTimeout(rollDice,1000);
      }
    }
  });
}
